import type { WithResponseMetadata } from "./response.js";
import type { BinaryContent, QueryValue, Transport } from "./transport.js";
import type {
  Account,
  AccountInvoicing,
  AccountInvoicingUpdateParams,
  AccountTaxRegime,
  AccountUpdateParams,
  ApiKey,
  ApiKeyCreateParams,
  Balance,
  Customer,
  CustomerCreateParams,
  CustomerListParams,
  CustomerUpdateParams,
  Event,
  EventDestination,
  EventDestinationCreateParams,
  EventDestinationUpdateParams,
  EventListParams,
  Invoice,
  InvoiceAmendment,
  InvoiceAmendParams,
  InvoiceIssueParams,
  InvoiceListParams,
  InvoicePdf,
  InvoiceSeries,
  InvoiceSeriesCreateParams,
  InvoiceSeriesUpdateParams,
  Page,
  PageParams,
  PaymentInstruction,
  PaymentInstructionCreateParams,
  PaymentInstructionUpdateParams,
  PdfRenderOptions,
  RequestOptions,
  TaxId,
  TaxRegime,
} from "./types.js";

type Result<T> = Promise<WithResponseMetadata<T>>;

abstract class Resource {
  constructor(protected readonly transport: Transport) {}
}

abstract class PaginatedResource extends Resource {
  protected iteratePages<T extends { id: string }>(
    params: Record<string, QueryValue>,
    load: (params: Record<string, QueryValue>) => Promise<Page<T>>,
  ): AsyncGenerator<T> {
    return paginate(params, load);
  }
}

export class AccountsResource extends Resource {
  retrieve(): Result<Account> {
    return this.transport.requestJson("retrieveAccount", { retrySafe: true });
  }

  update(params: AccountUpdateParams): Result<Account> {
    return this.transport.requestJson("updateAccount", { body: params });
  }
}

export class AccountInvoicingResource extends Resource {
  retrieve(): Result<AccountInvoicing> {
    return this.transport.requestJson("retrieveAccountInvoicing", { retrySafe: true });
  }

  update(params: AccountInvoicingUpdateParams): Result<AccountInvoicing> {
    return this.transport.requestJson("updateAccountInvoicing", { body: params });
  }
}

export class BalancesResource extends Resource {
  retrieve(): Result<Balance> {
    return this.transport.requestJson("retrieveBalance", { retrySafe: true });
  }
}

export class AccountTaxRegimesResource extends Resource {
  retrieve(): Result<AccountTaxRegime> {
    return this.transport.requestJson("retrieveAccountTaxRegime", { retrySafe: true });
  }
}

export class ApiKeysResource extends PaginatedResource {
  list(params: PageParams = {}): Result<Page<ApiKey>> {
    return this.transport.requestJson("listApiKeys", { query: { ...params }, retrySafe: true });
  }

  create(params: ApiKeyCreateParams): Result<ApiKey> {
    return this.transport.requestJson("createApiKey", { body: params });
  }

  retrieve(apiKeyId: string): Result<ApiKey> {
    return this.transport.requestJson("retrieveApiKey", { path: { id: apiKeyId }, retrySafe: true });
  }

  delete(apiKeyId: string): Promise<void> {
    return this.transport.requestEmpty("deleteApiKey", { path: { id: apiKeyId } });
  }

  iterate(params: Omit<PageParams, "starting_after" | "ending_before"> = {}): AsyncGenerator<ApiKey> {
    return this.iteratePages({ ...params }, (page) => this.list(page));
  }
}

export class EventsResource extends PaginatedResource {
  list(params: EventListParams = {}): Result<Page<Event>> {
    return this.transport.requestJson("listEvents", { query: { ...params }, retrySafe: true });
  }

  retrieve(eventId: string): Result<Event> {
    return this.transport.requestJson("retrieveEvent", { path: { id: eventId }, retrySafe: true });
  }

  iterate(params: Omit<EventListParams, "starting_after" | "ending_before"> = {}): AsyncGenerator<Event> {
    return this.iteratePages({ ...params }, (page) => this.list(page));
  }
}

export class EventDestinationsResource extends PaginatedResource {
  list(params: PageParams = {}): Result<Page<EventDestination>> {
    return this.transport.requestJson("listEventDestinations", { query: { ...params }, retrySafe: true });
  }

  create(params: EventDestinationCreateParams): Result<EventDestination> {
    return this.transport.requestJson("createEventDestination", { body: params });
  }

  retrieve(destinationId: string): Result<EventDestination> {
    return this.transport.requestJson("retrieveEventDestination", { path: { id: destinationId }, retrySafe: true });
  }

  update(destinationId: string, params: EventDestinationUpdateParams): Result<EventDestination> {
    return this.transport.requestJson("updateEventDestination", { path: { id: destinationId }, body: params });
  }

  delete(destinationId: string): Promise<void> {
    return this.transport.requestEmpty("deleteEventDestination", { path: { id: destinationId } });
  }

  enable(destinationId: string): Result<EventDestination> {
    return this.transport.requestJson("enableEventDestination", { path: { id: destinationId }, retrySafe: true });
  }

  disable(destinationId: string): Result<EventDestination> {
    return this.transport.requestJson("disableEventDestination", { path: { id: destinationId }, retrySafe: true });
  }

  iterate(params: Omit<PageParams, "starting_after" | "ending_before"> = {}): AsyncGenerator<EventDestination> {
    return this.iteratePages({ ...params }, (page) => this.list(page));
  }
}

export class InvoiceSeriesResource extends PaginatedResource {
  list(params: PageParams = {}): Result<Page<InvoiceSeries>> {
    return this.transport.requestJson("listInvoiceSeries", { query: { ...params }, retrySafe: true });
  }

  create(params: InvoiceSeriesCreateParams): Result<InvoiceSeries> {
    return this.transport.requestJson("createInvoiceSeries", { body: params });
  }

  retrieve(seriesId: string): Result<InvoiceSeries> {
    return this.transport.requestJson("retrieveInvoiceSeries", { path: { id: seriesId }, retrySafe: true });
  }

  update(seriesId: string, params: InvoiceSeriesUpdateParams): Result<InvoiceSeries> {
    return this.transport.requestJson("updateInvoiceSeries", { path: { id: seriesId }, body: params });
  }

  delete(seriesId: string): Promise<void> {
    return this.transport.requestEmpty("deleteInvoiceSeries", { path: { id: seriesId } });
  }

  iterate(params: Omit<PageParams, "starting_after" | "ending_before"> = {}): AsyncGenerator<InvoiceSeries> {
    return this.iteratePages({ ...params }, (page) => this.list(page));
  }
}

export class PaymentInstructionsResource extends PaginatedResource {
  list(params: PageParams = {}): Result<Page<PaymentInstruction>> {
    return this.transport.requestJson("listPaymentInstructions", { query: { ...params }, retrySafe: true });
  }

  create(params: PaymentInstructionCreateParams): Result<PaymentInstruction> {
    return this.transport.requestJson("createPaymentInstruction", { body: params });
  }

  retrieve(instructionId: string): Result<PaymentInstruction> {
    return this.transport.requestJson("retrievePaymentInstruction", { path: { id: instructionId }, retrySafe: true });
  }

  update(instructionId: string, params: PaymentInstructionUpdateParams): Result<PaymentInstruction> {
    return this.transport.requestJson("updatePaymentInstruction", { path: { id: instructionId }, body: params });
  }

  delete(instructionId: string): Promise<void> {
    return this.transport.requestEmpty("deletePaymentInstruction", { path: { id: instructionId } });
  }

  iterate(params: Omit<PageParams, "starting_after" | "ending_before"> = {}): AsyncGenerator<PaymentInstruction> {
    return this.iteratePages({ ...params }, (page) => this.list(page));
  }
}

export class TaxRegimesResource extends Resource {
  list(): Result<Page<TaxRegime>> {
    return this.transport.requestJson("listTaxRegimes", { retrySafe: true });
  }

  retrieve(regimeId: string): Result<TaxRegime> {
    return this.transport.requestJson("retrieveTaxRegime", { path: { id: regimeId }, retrySafe: true });
  }
}

export class TaxIdsResource extends Resource {
  retrieve(taxId: string): Result<TaxId> {
    return this.transport.requestJson("retrieveTaxId", { path: { id: taxId }, retrySafe: true });
  }
}

export class CustomersResource extends PaginatedResource {
  list(params: CustomerListParams = {}): Result<Page<Customer>> {
    return this.transport.requestJson("listCustomers", { query: { ...params }, retrySafe: true });
  }

  create(params: CustomerCreateParams): Result<Customer> {
    return this.transport.requestJson("createCustomer", { body: params });
  }

  retrieve(customerId: string): Result<Customer> {
    return this.transport.requestJson("retrieveCustomer", { path: { id: customerId }, retrySafe: true });
  }

  update(customerId: string, params: CustomerUpdateParams): Result<Customer> {
    return this.transport.requestJson("updateCustomer", { path: { id: customerId }, body: params });
  }

  delete(customerId: string): Promise<void> {
    return this.transport.requestEmpty("deleteCustomer", { path: { id: customerId } });
  }

  iterate(params: Omit<CustomerListParams, "starting_after" | "ending_before"> = {}): AsyncGenerator<Customer> {
    return this.iteratePages({ ...params }, (page) => this.list(page));
  }
}

export class InvoicesResource extends PaginatedResource {
  constructor(transport: Transport, private readonly createIdempotencyKey: () => string) {
    super(transport);
  }

  list(params: InvoiceListParams = {}): Result<Page<Invoice>> {
    return this.transport.requestJson("listInvoices", { query: { ...params }, retrySafe: true });
  }

  issue(params: InvoiceIssueParams, options: RequestOptions = {}): Result<Invoice> {
    const idempotencyKey = this.idempotencyKey(options);
    return this.transport.requestJson("issueInvoice", { body: params, idempotencyKey, retrySafe: true });
  }

  retrieve(invoiceId: string): Result<Invoice> {
    return this.transport.requestJson("retrieveInvoice", { path: { id: invoiceId }, retrySafe: true });
  }

  amend(invoiceId: string, params: InvoiceAmendParams, options: RequestOptions = {}): Result<InvoiceAmendment> {
    const idempotencyKey = this.idempotencyKey(options);
    return this.transport.requestJson("amendInvoice", {
      path: { invoice_id: invoiceId },
      body: params,
      idempotencyKey,
      retrySafe: true,
    });
  }

  iterate(params: Omit<InvoiceListParams, "starting_after" | "ending_before"> = {}): AsyncGenerator<Invoice> {
    return this.iteratePages({ ...params }, (page) => this.list(page));
  }

  private idempotencyKey(options: RequestOptions): string {
    const key = options.idempotencyKey ?? this.createIdempotencyKey();
    if (key.length === 0) throw new TypeError("idempotencyKey cannot be empty");
    return key;
  }
}

export class InvoicePdfsResource extends Resource {
  retrieve(invoiceId: string): Result<InvoicePdf> {
    return this.transport.requestJson("retrieveInvoicePdf", { path: { invoice_id: invoiceId }, retrySafe: true });
  }

  retrieveContent(invoiceId: string): Promise<BinaryContent> {
    return this.transport.requestBytes("retrieveInvoicePdf", { path: { invoice_id: invoiceId }, retrySafe: true });
  }

  render(invoiceId: string, options: PdfRenderOptions = {}): Result<InvoicePdf> {
    return this.transport.requestJson("renderInvoicePdf", {
      path: { invoice_id: invoiceId },
      headers: options.locale === undefined ? {} : { "Accept-Language": options.locale },
      retrySafe: true,
    });
  }

  renderContent(invoiceId: string, options: PdfRenderOptions = {}): Promise<BinaryContent> {
    return this.transport.requestBytes("renderInvoicePdf", {
      path: { invoice_id: invoiceId },
      headers: options.locale === undefined ? {} : { "Accept-Language": options.locale },
      retrySafe: true,
    });
  }
}

async function* paginate<T extends { id: string }>(
  params: Record<string, QueryValue>,
  load: (params: Record<string, QueryValue>) => Promise<Page<T>>,
): AsyncGenerator<T> {
  let startingAfter: string | undefined;
  do {
    const page = await load({ ...params, limit: params.limit ?? 100, ...(startingAfter ? { starting_after: startingAfter } : {}) });
    yield* page.data;
    if (!page.has_more || page.data.length === 0) return;
    startingAfter = page.data.at(-1)!.id;
  } while (true);
}
