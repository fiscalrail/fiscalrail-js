import assert from "node:assert/strict";
import test from "node:test";

import { readFile } from "node:fs/promises";

import { FiscalRail, InvalidInvoiceError, ResponseParseError, VERSION, getResponseMetadata } from "../dist/index.js";

test("runtime and package versions match", async () => {
  const packageJson = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
  assert.equal(VERSION, packageJson.version);
});

test("sends authenticated requests and exposes response metadata", async () => {
  let request;
  const client = new FiscalRail({ apiKey: "ak_test", fetch: async (input, init) => {
    request = { input, init };
    return Response.json({ id: "cus_123", object: "customer", name: "Acme SL" }, { status: 201, headers: { "Request-Id": "req_123" } });
  } });
  const customer = await client.customers.create({ name: "Acme SL", tax_id: { country: "ES", type: "es_nif", value: "B87654323" } });
  assert.equal(customer.id, "cus_123");
  assert.deepEqual(getResponseMetadata(customer), { requestId: "req_123" });
  assert.equal(JSON.stringify(customer).includes("req_123"), false);
  assert.equal(request.input.href, "https://api.fiscalrail.com/v1/customers");
  assert.equal(request.init.headers.Authorization, "Bearer ak_test");
  assert.equal(request.init.headers["User-Agent"], "fiscalrail-js/0.4.0");
  assert.equal(request.init.redirect, "error");
});

test("invoice issuance preserves its key and body across safe retries", async () => {
  const requests = [];
  const client = new FiscalRail({
    apiKey: "ak_test", maxRetries: 1, idempotencyKeyFactory: () => "idem_test",
    fetch: async (input, init) => {
      requests.push({ input, init });
      if (requests.length === 1) return Response.json({ error: { message: "busy" } }, { status: 503, headers: { "Retry-After": "0" } });
      return Response.json({ id: "inv_123", object: "invoice" }, { status: 201, headers: { "Idempotent-Replayed": "req_original" } });
    },
  });
  const invoice = await client.invoices.issue({ lines: [{ description: "Consulting", unit_price: "75.00", taxes: [{ tax: "vat", rule: "general" }] }] });
  assert.equal(invoice.id, "inv_123");
  assert.equal(requests.length, 2);
  assert.equal(requests[0].init.headers["Idempotency-Key"], "idem_test");
  assert.equal(requests[1].init.headers["Idempotency-Key"], "idem_test");
  assert.equal(requests[0].init.body, requests[1].init.body);
  assert.deepEqual(getResponseMetadata(invoice), { idempotencyKey: "idem_test", idempotentReplayed: "req_original" });
});

test("unsafe mutations are not retried", async () => {
  let requests = 0;
  const client = new FiscalRail({ apiKey: "ak_test", maxRetries: 2, fetch: async () => {
    requests += 1;
    return Response.json({ error: { code: "server_error", message: "down" } }, { status: 503 });
  } });
  await assert.rejects(client.customers.update("cus_123", { email: null }));
  assert.equal(requests, 1);
});

test("exposes typed API errors with validation details", async () => {
  const client = new FiscalRail({ apiKey: "ak_test", maxRetries: 0, fetch: async () => Response.json({ error: {
    code: "invalid_invoice", message: "Invalid invoice",
    details: [{ field: "lines.0.unit_price", message: "is invalid", code: "invalid" }],
  } }, { status: 422, headers: { "Request-Id": "req_error" } }) });
  await assert.rejects(client.invoices.issue({ lines: [] }, { idempotencyKey: "durable" }), (error) => {
    assert.ok(error instanceof InvalidInvoiceError);
    assert.equal(error.requestId, "req_error");
    assert.equal(error.idempotencyKey, "durable");
    assert.equal(error.details[0].field, "lines.0.unit_price");
    return true;
  });
});

test("successful non-JSON responses become parse errors without retries", async () => {
  let requests = 0;
  const client = new FiscalRail({ apiKey: "ak_test", fetch: async () => {
    requests += 1;
    return new Response("<html>", { status: 200, headers: { "Request-Id": "req_bad" } });
  } });
  await assert.rejects(client.accounts.list(), (error) => {
    assert.ok(error instanceof ResponseParseError);
    assert.equal(error.requestId, "req_bad");
    return true;
  });
  assert.equal(requests, 1);
});

test("validates client configuration without exposing the API key", () => {
  assert.throws(() => new FiscalRail({ apiKey: "" }), /apiKey/);
  assert.throws(() => new FiscalRail({ apiKey: "test", timeoutMs: 0 }), /timeoutMs/);
  assert.throws(() => new FiscalRail({ apiKey: "test", maxRetries: -1 }), /maxRetries/);
  assert.throws(() => new FiscalRail({ apiKey: "test", baseUrl: "https://user:password@example.com" }), /credentials/);
  const client = new FiscalRail({ apiKey: "super-secret", fetch: async () => new Response() });
  assert.equal(JSON.stringify(client).includes("super-secret"), false);
});
