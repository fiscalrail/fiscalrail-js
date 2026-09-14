export interface ValidationDetail {
  field: string;
  message: string;
  code?: string;
  metadata?: Record<string, unknown>;
}

export class FiscalRailError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = new.target.name;
  }
}

export class WebhookSignatureError extends FiscalRailError {}

export class ResponseParseError extends FiscalRailError {
  readonly requestId: string | undefined;
  readonly idempotencyKey: string | undefined;

  constructor(message: string, options: { requestId?: string; idempotencyKey?: string; cause?: unknown } = {}) {
    super(message, options.cause === undefined ? undefined : { cause: options.cause });
    this.requestId = options.requestId;
    this.idempotencyKey = options.idempotencyKey;
  }
}

export class APIConnectionError extends FiscalRailError {
  readonly idempotencyKey: string | undefined;

  constructor(message: string, options: { idempotencyKey?: string; cause?: unknown } = {}) {
    super(message, options.cause === undefined ? undefined : { cause: options.cause });
    this.idempotencyKey = options.idempotencyKey;
  }
}

export class APITimeoutError extends APIConnectionError {}

export interface APIErrorOptions {
  code: string;
  status: number;
  requestId?: string;
  details?: ValidationDetail[];
  idempotencyKey?: string;
  body?: unknown;
}

export class APIError extends FiscalRailError {
  readonly code: string;
  readonly status: number;
  readonly requestId: string | undefined;
  readonly details: readonly ValidationDetail[];
  readonly idempotencyKey: string | undefined;
  readonly body: unknown;

  constructor(message: string, options: APIErrorOptions) {
    super(options.requestId ? `${message} (request_id: ${options.requestId})` : message);
    this.code = options.code;
    this.status = options.status;
    this.requestId = options.requestId;
    this.details = options.details ?? [];
    this.idempotencyKey = options.idempotencyKey;
    this.body = options.body;
  }
}

export class AuthenticationError extends APIError {}
export class InvalidRequestError extends APIError {}
export class ResourceNotFoundError extends APIError {}
export class InvalidCustomerError extends APIError {}
export class CustomerNotFoundError extends APIError {}
export class InvalidInvoiceError extends APIError {}
export class InvalidInvoiceSeriesError extends APIError {}
export class InvalidPaymentInstructionError extends APIError {}
export class InvalidInvoiceAmendmentError extends APIError {}
export class AccountNotConfiguredError extends APIError {}
export class BalanceExhaustedError extends APIError {}
export class IdempotencyConflictError extends APIError {}
export class PdfRenderInProgressError extends APIError {}
export class PdfRenderingUnavailableError extends APIError {}

const ERROR_CLASSES: Record<string, typeof APIError> = {
  authentication_required: AuthenticationError,
  invalid_request: InvalidRequestError,
  invalid_idempotency_key: InvalidRequestError,
  resource_not_found: ResourceNotFoundError,
  invalid_customer: InvalidCustomerError,
  customer_not_found: CustomerNotFoundError,
  invalid_invoice: InvalidInvoiceError,
  invalid_invoice_series: InvalidInvoiceSeriesError,
  invalid_payment_instruction: InvalidPaymentInstructionError,
  invalid_invoice_amendment: InvalidInvoiceAmendmentError,
  account_not_configured: AccountNotConfiguredError,
  balance_exhausted: BalanceExhaustedError,
  idempotency_key_in_use: IdempotencyConflictError,
  idempotency_key_mismatch: IdempotencyConflictError,
  pdf_render_in_progress: PdfRenderInProgressError,
  pdf_rendering_unavailable: PdfRenderingUnavailableError,
};

/** @internal */
export function apiError(status: number, requestId: string | undefined, body: unknown, idempotencyKey?: string): APIError {
  const raw = isRecord(body) && isRecord(body.error) ? body.error : {};
  const code = typeof raw.code === "string" ? raw.code : `http_${status}`;
  const message = typeof raw.message === "string" ? raw.message : `FiscalRail returned HTTP ${status}`;
  const details = Array.isArray(raw.details)
    ? raw.details.filter(isRecord).map((detail) => ({
        field: typeof detail.field === "string" ? detail.field : "base",
        message: typeof detail.message === "string" ? detail.message : "Invalid value",
        ...(typeof detail.code === "string" ? { code: detail.code } : {}),
        ...(isRecord(detail.metadata) ? { metadata: detail.metadata } : {}),
      }))
    : [];
  const ErrorClass = ERROR_CLASSES[code] ?? APIError;
  return new ErrorClass(message, {
    code,
    status,
    ...(requestId === undefined ? {} : { requestId }),
    details,
    ...(idempotencyKey === undefined ? {} : { idempotencyKey }),
    body,
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
