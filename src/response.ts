export interface ResponseMetadata {
  requestId?: string;
  idempotencyKey?: string;
  idempotentReplayed?: string;
}

export const RESPONSE_METADATA: unique symbol = Symbol("FiscalRail.responseMetadata");

export type WithResponseMetadata<T> = T & { readonly [RESPONSE_METADATA]: ResponseMetadata };

export function getResponseMetadata(value: object): ResponseMetadata | undefined {
  return (value as { [RESPONSE_METADATA]?: ResponseMetadata })[RESPONSE_METADATA];
}

/** @internal */
export function attachResponseMetadata<T>(value: T, metadata: ResponseMetadata): WithResponseMetadata<T> {
  if ((typeof value !== "object" && typeof value !== "function") || value === null) {
    throw new TypeError("FiscalRail JSON responses must be objects");
  }
  Object.defineProperty(value, RESPONSE_METADATA, {
    configurable: false,
    enumerable: false,
    writable: false,
    value: Object.freeze(metadata),
  });
  return value as WithResponseMetadata<T>;
}
