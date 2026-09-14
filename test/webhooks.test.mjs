import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import test from "node:test";

import { WebhookSignatureError } from "../dist/index.js";
import { constructEvent, verifySignature } from "../dist/webhooks.js";

const timestamp = 1_788_688_800;
const secret = "whsec_test";

function signature(body, options = {}) {
  const time = options.timestamp ?? timestamp;
  const key = options.secret ?? secret;
  const digest = createHmac("sha256", key).update(`${time}.${body}`).digest("hex");
  return `t=${time},v1=${digest}`;
}

test("verifies the exact body and accepts any matching v1 signature", () => {
  const body = "{\n  \"name\": \"España\"\n}";
  assert.equal(verifySignature(body, `${signature(body)},v1=bad`, secret, { now: timestamp }), timestamp);
  assert.equal(constructEvent(body, `v1=bad,${signature(body)}`, secret, { now: timestamp }).name, "España");
  assert.throws(() => constructEvent(JSON.stringify(JSON.parse(body)), signature(body), secret, { now: timestamp }), WebhookSignatureError);
});

test("enforces timestamp tolerance in both directions", () => {
  for (const delta of [-300, 300]) {
    assert.doesNotThrow(() => verifySignature("{}", signature("{}", { timestamp: timestamp + delta }), secret, { now: timestamp }));
  }
  for (const delta of [-301, 301]) {
    assert.throws(() => verifySignature("{}", signature("{}", { timestamp: timestamp + delta }), secret, { now: timestamp }), WebhookSignatureError);
  }
  assert.doesNotThrow(() => verifySignature("{}", signature("{}", { timestamp: 1 }), secret, { tolerance: null }));
  assert.throws(() => verifySignature("{}", signature("{}"), secret, { tolerance: -1 }), TypeError);
});

test("rejects malformed headers and payloads", () => {
  for (const header of ["", "v1=bad", "t=abc,v1=bad", "t=1,t=1,v1=bad", "t=1,v1="]) {
    assert.throws(() => verifySignature("{}", header, secret, { now: timestamp }), WebhookSignatureError);
  }
  for (const body of ["[]", "null", "broken"]) {
    assert.throws(() => constructEvent(body, signature(body), secret, { now: timestamp }), WebhookSignatureError);
  }
});
