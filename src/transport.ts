import { APIConnectionError, APIError, APITimeoutError, ResponseParseError, apiError } from "./errors.js";
import { OPERATIONS, type OperationId } from "./generated/operations.js";
import { attachResponseMetadata, type WithResponseMetadata } from "./response.js";
import { VERSION } from "./version.js";

export type Fetch = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
export type QueryValue = string | number | boolean | readonly string[] | undefined;

export interface TransportOptions {
  apiKey: string;
  baseUrl: string;
  timeoutMs: number;
  maxRetries: number;
  fetch: Fetch;
  sleep?: (milliseconds: number) => Promise<void>;
}

export interface RequestOptions {
  path?: Record<string, string>;
  body?: unknown;
  query?: Record<string, QueryValue>;
  headers?: Record<string, string>;
  retrySafe?: boolean;
  idempotencyKey?: string;
}

export interface BinaryContent {
  content: Uint8Array;
  contentType?: string;
  requestId?: string;
}

export class Transport {
  readonly #options: TransportOptions;

  constructor(options: TransportOptions) {
    this.#options = options;
  }

  async requestJson<T>(operationId: OperationId, options: RequestOptions = {}): Promise<WithResponseMetadata<T>> {
    return this.#request(operationId, options, async (response) => {
      let data: unknown;
      try {
        data = await response.json();
      } catch (cause) {
        const requestId = header(response, "Request-Id");
        throw new ResponseParseError("FiscalRail returned a non-JSON response", {
          ...(requestId === undefined ? {} : { requestId }),
          ...(options.idempotencyKey === undefined ? {} : { idempotencyKey: options.idempotencyKey }),
          cause,
        });
      }
      if (typeof data !== "object" || data === null || Array.isArray(data)) {
        const requestId = header(response, "Request-Id");
        throw new ResponseParseError("FiscalRail returned a JSON response that is not an object", {
          ...(requestId === undefined ? {} : { requestId }),
          ...(options.idempotencyKey === undefined ? {} : { idempotencyKey: options.idempotencyKey }),
        });
      }
      return attachResponseMetadata(data as T, responseMetadata(response, options.idempotencyKey));
    });
  }

  async requestEmpty(operationId: OperationId, options: RequestOptions = {}): Promise<void> {
    await this.#request(operationId, options, async () => undefined);
  }

  async requestBytes(operationId: OperationId, options: RequestOptions = {}): Promise<BinaryContent> {
    return this.#request(operationId, {
      ...options,
      headers: { Accept: "application/pdf", ...options.headers },
    }, async (response) => {
      let content: Uint8Array;
      try {
        content = new Uint8Array(await response.arrayBuffer());
      } catch (cause) {
        throw new APIConnectionError("Could not read FiscalRail's binary response", { cause });
      }
      const expectedLength = Number(header(response, "Content-Length"));
      if (!header(response, "Content-Encoding") && Number.isFinite(expectedLength) && expectedLength !== content.byteLength) {
        throw new APIConnectionError("FiscalRail returned a truncated binary response");
      }
      const contentType = header(response, "Content-Type");
      const requestId = header(response, "Request-Id");
      return {
        content,
        ...(contentType === undefined ? {} : { contentType }),
        ...(requestId === undefined ? {} : { requestId }),
      };
    });
  }

  async #request<T>(
    operationId: OperationId,
    options: RequestOptions,
    consume: (response: Response) => Promise<T>,
  ): Promise<T> {
    const operation = OPERATIONS[operationId];
    const url = new URL(this.#options.baseUrl.replace(/\/$/, "") + interpolate(operation.path, options.path));
    for (const [key, value] of Object.entries(options.query ?? {})) {
      if (value !== undefined) url.searchParams.set(key, Array.isArray(value) ? value.join(",") : String(value));
    }

    for (let attempt = 0; ; attempt += 1) {
      const controller = new AbortController();
      let timedOut = false;
      const timeout = setTimeout(() => {
        timedOut = true;
        controller.abort();
      }, this.#options.timeoutMs);

      try {
        const response = await this.#options.fetch(url, {
          method: operation.method,
          redirect: "error",
          signal: controller.signal,
          headers: {
            Authorization: `Bearer ${this.#options.apiKey}`,
            Accept: "application/json",
            "User-Agent": `fiscalrail-js/${VERSION}`,
            ...(options.body === undefined ? {} : { "Content-Type": "application/json" }),
            ...(options.idempotencyKey === undefined ? {} : { "Idempotency-Key": options.idempotencyKey }),
            ...options.headers,
          },
          ...(options.body === undefined ? {} : { body: JSON.stringify(options.body) }),
        });

        if ((operation.successStatuses as readonly number[]).includes(response.status)) return await consume(response);

        const retryable = response.status === 408 || response.status === 429 || response.status >= 500;
        if (options.retrySafe && retryable && attempt < this.#options.maxRetries) {
          await this.#wait(retryDelay(attempt, header(response, "Retry-After")));
          continue;
        }

        const body = await readBody(response);
        throw apiError(response.status, header(response, "Request-Id"), body, options.idempotencyKey);
      } catch (error) {
        if (error instanceof APIError || error instanceof ResponseParseError) throw error;
        if (options.retrySafe && attempt < this.#options.maxRetries) {
          await this.#wait(retryDelay(attempt));
          continue;
        }
        if (error instanceof APIConnectionError) throw error;
        const ErrorClass = timedOut ? APITimeoutError : APIConnectionError;
        throw new ErrorClass(
          timedOut ? "Request to FiscalRail timed out" : "Could not connect to FiscalRail",
          { ...(options.idempotencyKey === undefined ? {} : { idempotencyKey: options.idempotencyKey }), cause: error },
        );
      } finally {
        clearTimeout(timeout);
      }
    }
  }

  #wait(milliseconds: number): Promise<void> {
    return (this.#options.sleep ?? defaultSleep)(milliseconds);
  }
}

function interpolate(template: string, values: Record<string, string> = {}): string {
  const result = template.replace(/\{([^}]+)\}/g, (_match, name: string) => {
    const value = values[name];
    if (value === undefined) throw new TypeError(`Missing path parameter: ${name}`);
    return encodeURIComponent(value);
  });
  return result;
}

function responseMetadata(response: Response, idempotencyKey?: string) {
  const requestId = header(response, "Request-Id");
  const idempotentReplayed = header(response, "Idempotent-Replayed");
  return {
    ...(requestId === undefined ? {} : { requestId }),
    ...(idempotencyKey === undefined ? {} : { idempotencyKey }),
    ...(idempotentReplayed === undefined ? {} : { idempotentReplayed }),
  };
}

async function readBody(response: Response): Promise<unknown> {
  const text = await response.text();
  if (text === "") return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

function header(response: Response, name: string): string | undefined {
  return response.headers.get(name) ?? undefined;
}

function retryDelay(attempt: number, retryAfter?: string): number {
  if (retryAfter !== undefined) {
    const seconds = Number(retryAfter);
    if (Number.isFinite(seconds)) return Math.min(Math.max(seconds * 1_000, 0), 30_000);
    const date = Date.parse(retryAfter);
    if (Number.isFinite(date)) return Math.min(Math.max(date - Date.now(), 0), 30_000);
  }
  return Math.min(250 * 2 ** attempt, 30_000);
}

function defaultSleep(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
