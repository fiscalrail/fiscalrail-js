import type { components } from "./generated/schema.js";

export type Account = components["schemas"]["Account"];
export type AccountInvoicing = components["schemas"]["AccountInvoicing"];
export type AccountInvoicingUpdateParams = components["schemas"]["AccountInvoicingUpdate"];
export type AccountUpdateParams = components["schemas"]["AccountUpdate"];
export type AccountTaxRegime = components["schemas"]["AccountTaxRegime"];
export type ApiKey = components["schemas"]["ApiKey"];
export type ApiKeyCreateParams = components["schemas"]["ApiKeyCreate"];
export type Balance = components["schemas"]["Balance"];
export type Customer = components["schemas"]["Customer"];
export type CustomerCreateParams = components["schemas"]["CustomerCreate"];
export type CustomerUpdateParams = components["schemas"]["CustomerUpdate"];
export type Event = components["schemas"]["Event"];
export type EventDestination = components["schemas"]["EventDestination"];
export type EventDestinationCreateParams = components["schemas"]["EventDestinationCreate"];
export type EventDestinationUpdateParams = components["schemas"]["EventDestinationUpdate"];
export type Invoice = components["schemas"]["Invoice"];
export type InvoiceAmendment = components["schemas"]["InvoiceAmendment"];
export type InvoiceAmendParams = components["schemas"]["InvoiceAmendmentCreate"];
export type InvoiceIssueParams = components["schemas"]["InvoiceCreate"];
export type InvoicePdf = components["schemas"]["InvoicePdf"];
export type InvoiceSeries = components["schemas"]["InvoiceSeries"];
export type InvoiceSeriesCreateParams = components["schemas"]["InvoiceSeriesCreate"];
export type InvoiceSeriesUpdateParams = components["schemas"]["InvoiceSeriesUpdate"];
export type PaymentInstruction = components["schemas"]["PaymentInstruction"];
export type PaymentInstructionCreateParams = components["schemas"]["PaymentInstructionCreate"];
export type PaymentInstructionUpdateParams = components["schemas"]["PaymentInstructionUpdate"];
export type TaxId = components["schemas"]["TaxId"];
export type TaxReference = components["schemas"]["TaxReference"];
export type TaxRegime = components["schemas"]["TaxRegime"];

export interface Page<T> {
  object: "list";
  has_more: boolean;
  data: T[];
}

export interface PageParams {
  limit?: number;
  starting_after?: string;
  ending_before?: string;
}

export interface CustomerListParams extends PageParams {
  q?: string;
  country?: string;
}

export interface EventListParams extends PageParams {
  types?: readonly string[];
}

export interface InvoiceListParams extends PageParams {
  q?: string;
  customer?: string;
  issue_date_from?: string;
  issue_date_to?: string;
}

export interface RequestOptions {
  idempotencyKey?: string;
}

export interface PdfRenderOptions {
  locale?: "en" | "es";
}

export type SpanishAccountTaxRegime = components["schemas"]["SpanishAccountTaxRegime"];
export type SpanishAccountSubmission = components["schemas"]["SpanishAccountSubmission"];
export type SpanishPendingSubmission = components["schemas"]["SpanishPendingSubmission"];
export interface CertificateUploadParams {
  certificate_file: Blob;
  certificate_password?: string;
}
