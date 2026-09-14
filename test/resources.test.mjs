import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { OPERATIONS } from "../dist/generated/operations.js";
import { FiscalRail } from "../dist/index.js";

test("handwritten resources cover every generated OpenAPI operation", async () => {
  const source = await readFile(new URL("../src/resources.ts", import.meta.url), "utf8");
  const wrapped = new Set([...source.matchAll(/request(?:Json|Empty|Bytes)\("([A-Za-z0-9]+)"/g)].map((match) => match[1]));
  assert.deepEqual([...wrapped].sort(), Object.keys(OPERATIONS).sort());
  assert.equal(wrapped.size, 42);
});

test("automatic pagination preserves filters and advances the cursor", async () => {
  const urls = [];
  const client = new FiscalRail({ apiKey: "ak_test", fetch: async (input) => {
    urls.push(input.href);
    return Response.json(urls.length === 1
      ? { object: "list", has_more: true, data: [{ id: "cus_1" }] }
      : { object: "list", has_more: false, data: [{ id: "cus_2" }] });
  } });
  const ids = [];
  for await (const customer of client.customers.iterate({ country: "ES", limit: 1 })) ids.push(customer.id);
  assert.deepEqual(ids, ["cus_1", "cus_2"]);
  assert.equal(new URL(urls[0]).searchParams.get("country"), "ES");
  assert.equal(new URL(urls[1]).searchParams.get("starting_after"), "cus_1");
});

test("serializes event types as a comma-separated query value", async () => {
  let url;
  const client = new FiscalRail({ apiKey: "ak_test", fetch: async (input) => {
    url = input;
    return Response.json({ object: "list", has_more: false, data: [] });
  } });
  await client.events.list({ types: ["invoice.created", "invoice.amended"] });
  assert.equal(url.searchParams.get("types"), "invoice.created,invoice.amended");
});

test("downloads PDF bytes and sends render locale", async () => {
  let request;
  const bytes = new Uint8Array([0x25, 0x50, 0x44, 0x46]);
  const client = new FiscalRail({ apiKey: "ak_test", fetch: async (input, init) => {
    request = { input, init };
    return new Response(bytes, { status: 201, headers: { "Content-Type": "application/pdf", "Request-Id": "req_pdf" } });
  } });
  const pdf = await client.invoicePdfs.renderContent("inv_123", { locale: "es" });
  assert.deepEqual(pdf.content, bytes);
  assert.equal(pdf.contentType, "application/pdf");
  assert.equal(pdf.requestId, "req_pdf");
  assert.equal(request.input.pathname, "/v1/invoices/inv_123/pdf");
  assert.equal(request.init.method, "POST");
  assert.equal(request.init.headers.Accept, "application/pdf");
  assert.equal(request.init.headers["Accept-Language"], "es");
});

test("retries a premature PDF body failure", async () => {
  let attempts = 0;
  const client = new FiscalRail({ apiKey: "ak_test", maxRetries: 1, fetch: async () => {
    attempts += 1;
    if (attempts === 1) {
      const body = new ReadableStream({ start(controller) {
        controller.enqueue(new Uint8Array([0x25, 0x50]));
        controller.error(new Error("premature EOF"));
      } });
      return new Response(body, { status: 200, headers: { "Content-Type": "application/pdf" } });
    }
    return new Response(new Uint8Array([0x25, 0x50, 0x44, 0x46]), { status: 200 });
  } });
  const pdf = await client.invoicePdfs.retrieveContent("inv_123");
  assert.equal(pdf.content.byteLength, 4);
  assert.equal(attempts, 2);
});

test("uses the exact tax ID route", async () => {
  let path;
  const client = new FiscalRail({ apiKey: "ak_test", fetch: async (input) => {
    path = input.pathname;
    return Response.json({ id: "tax_id_123", object: "tax_id" });
  } });
  await client.taxIds.retrieve("tax_id_123");
  assert.equal(path, "/v1/tax_ids/tax_id_123");
});
