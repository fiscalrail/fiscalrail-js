import {
  AccountsResource,
  AccountTaxRegimesResource,
  ApiKeysResource,
  BalancesResource,
  CustomersResource,
  EventDestinationsResource,
  EventsResource,
  InvoicePdfsResource,
  InvoiceSeriesResource,
  InvoicesResource,
  PaymentInstructionsResource,
  TaxIdsResource,
  TaxRegimesResource,
} from "./resources.js";
import { Transport, type Fetch } from "./transport.js";

export interface FiscalRailOptions {
  apiKey: string;
  baseUrl?: string;
  timeoutMs?: number;
  maxRetries?: number;
  fetch?: Fetch;
  idempotencyKeyFactory?: () => string;
}

export class FiscalRail {
  readonly accounts: AccountsResource;
  readonly balances: BalancesResource;
  readonly accountTaxRegimes: AccountTaxRegimesResource;
  readonly apiKeys: ApiKeysResource;
  readonly customers: CustomersResource;
  readonly eventDestinations: EventDestinationsResource;
  readonly events: EventsResource;
  readonly invoiceSeries: InvoiceSeriesResource;
  readonly invoices: InvoicesResource;
  readonly invoicePdfs: InvoicePdfsResource;
  readonly paymentInstructions: PaymentInstructionsResource;
  readonly taxIds: TaxIdsResource;
  readonly taxRegimes: TaxRegimesResource;

  constructor(options: FiscalRailOptions) {
    if (!options.apiKey) throw new TypeError("apiKey cannot be empty");
    if ((options.timeoutMs ?? 30_000) <= 0) throw new TypeError("timeoutMs must be positive");
    if (!Number.isInteger(options.maxRetries ?? 2) || (options.maxRetries ?? 2) < 0) {
      throw new TypeError("maxRetries must be a non-negative integer");
    }

    const baseUrl = new URL(options.baseUrl ?? "https://api.fiscalrail.com/v1");
    if (baseUrl.username || baseUrl.password) throw new TypeError("baseUrl cannot contain credentials");

    const transport = new Transport({
      apiKey: options.apiKey,
      baseUrl: baseUrl.toString(),
      timeoutMs: options.timeoutMs ?? 30_000,
      maxRetries: options.maxRetries ?? 2,
      fetch: options.fetch ?? globalThis.fetch.bind(globalThis),
    });
    const idempotencyKeyFactory = options.idempotencyKeyFactory ?? (() => globalThis.crypto.randomUUID());

    this.accounts = new AccountsResource(transport);
    this.balances = new BalancesResource(transport);
    this.accountTaxRegimes = new AccountTaxRegimesResource(transport);
    this.apiKeys = new ApiKeysResource(transport);
    this.customers = new CustomersResource(transport);
    this.eventDestinations = new EventDestinationsResource(transport);
    this.events = new EventsResource(transport);
    this.invoiceSeries = new InvoiceSeriesResource(transport);
    this.invoices = new InvoicesResource(transport, idempotencyKeyFactory);
    this.invoicePdfs = new InvoicePdfsResource(transport);
    this.paymentInstructions = new PaymentInstructionsResource(transport);
    this.taxIds = new TaxIdsResource(transport);
    this.taxRegimes = new TaxRegimesResource(transport);
  }
}
