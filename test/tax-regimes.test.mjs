import assert from "node:assert/strict";
import test from "node:test";

import { irpf, vat } from "../dist/tax-regimes/es.js";

test("exports immutable Spanish tax references", () => {
  assert.deepEqual(vat.general, { tax: "vat", rule: "general" });
  assert.deepEqual(vat.superReduced, { tax: "vat", rule: "super_reduced" });
  assert.deepEqual(irpf.professionals, { tax: "irpf", rule: "professionals" });
  assert.ok(Object.isFrozen(vat.general));
});
