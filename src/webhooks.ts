import { createHmac, timingSafeEqual } from "node:crypto";

import { WebhookSignatureError } from "./errors.js";
import type { Event } from "./types.js";

export const DEFAULT_TOLERANCE_SECONDS = 300;

export interface WebhookOptions {
  tolerance?: number | null;
  now?: number | Date;
}

export function verifySignature(
  payload: string | Uint8Array,
  signature: string,
  secret: string,
  options: WebhookOptions = {},
): number {
  const { timestamp, signatures } = parseHeader(signature);
  const payloadBytes = typeof payload === "string" ? Buffer.from(payload, "utf8") : Buffer.from(payload);
  const expected = createHmac("sha256", secret)
    .update(String(timestamp), "ascii")
    .update(".", "ascii")
    .update(payloadBytes)
    .digest();

  const matches = signatures.some((candidate) => {
    if (!/^[0-9a-fA-F]{64}$/.test(candidate)) return false;
    return timingSafeEqual(expected, Buffer.from(candidate, "hex"));
  });
  if (!matches) throw new WebhookSignatureError("No matching FiscalRail webhook signature");

  const tolerance = options.tolerance === undefined ? DEFAULT_TOLERANCE_SECONDS : options.tolerance;
  if (tolerance !== null) {
    if (tolerance < 0) throw new TypeError("tolerance cannot be negative");
    const now = options.now instanceof Date ? options.now.getTime() / 1_000 : options.now ?? Date.now() / 1_000;
    if (Math.abs(now - timestamp) > tolerance) {
      throw new WebhookSignatureError("FiscalRail webhook timestamp is outside the allowed tolerance");
    }
  }
  return timestamp;
}

export function constructEvent(
  payload: string | Uint8Array,
  signature: string,
  secret: string,
  options: WebhookOptions = {},
): Event {
  verifySignature(payload, signature, secret, options);
  let decoded: unknown;
  try {
    const text = typeof payload === "string" ? payload : new TextDecoder("utf-8", { fatal: true }).decode(payload);
    decoded = JSON.parse(text) as unknown;
  } catch (cause) {
    throw new WebhookSignatureError("FiscalRail webhook payload is not valid JSON", { cause });
  }
  if (typeof decoded !== "object" || decoded === null || Array.isArray(decoded)) {
    throw new WebhookSignatureError("FiscalRail webhook payload must be a JSON object");
  }
  return decoded as Event;
}

function parseHeader(value: string): { timestamp: number; signatures: string[] } {
  const fields = new Map<string, string[]>();
  for (const item of value.split(",")) {
    const separator = item.indexOf("=");
    if (separator <= 0 || separator === item.length - 1) continue;
    const key = item.slice(0, separator).trim();
    const fieldValue = item.slice(separator + 1).trim();
    fields.set(key, [...(fields.get(key) ?? []), fieldValue]);
  }
  const timestamps = fields.get("t") ?? [];
  const signatures = fields.get("v1") ?? [];
  if (timestamps.length !== 1 || signatures.length === 0 || !/^-?\d+$/.test(timestamps[0]!)) {
    throw new WebhookSignatureError("Malformed FiscalRail-Signature header");
  }
  return { timestamp: Number(timestamps[0]), signatures };
}
