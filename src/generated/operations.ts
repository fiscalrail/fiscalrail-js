/** Generated from FiscalRail's OpenAPI contract. Do not edit. */
export const CONTRACT_VERSION = "1.0.0";

export interface Operation {
  readonly method: string;
  readonly path: string;
  readonly successStatuses: readonly number[];
}

export const OPERATIONS = {
  "retrieveAccount": {
    method: "GET",
    path: "/account",
    successStatuses: [
      200
    ]
  },
  "updateAccount": {
    method: "PATCH",
    path: "/account",
    successStatuses: [
      200
    ]
  },
  "retrieveAccountInvoicing": {
    method: "GET",
    path: "/account/invoicing",
    successStatuses: [
      200
    ]
  },
  "updateAccountInvoicing": {
    method: "PATCH",
    path: "/account/invoicing",
    successStatuses: [
      200
    ]
  },
  "retrieveBalance": {
    method: "GET",
    path: "/account/balance",
    successStatuses: [
      200
    ]
  },
  "retrieveAccountTaxRegime": {
    method: "GET",
    path: "/account/tax-regime",
    successStatuses: [
      200
    ]
  },
  "uploadAccountCertificate": {
    method: "POST",
    path: "/account/tax-regime/es/certificate",
    successStatuses: [
      202
    ]
  },
  "verifyAccountRepresentation": {
    method: "POST",
    path: "/account/tax-regime/es/representation/verify",
    successStatuses: [
      202
    ]
  },
  "verifyAccountSubmission": {
    method: "POST",
    path: "/account/tax-regime/es/submission/verify",
    successStatuses: [
      202
    ]
  },
  "cancelAccountSubmissionChange": {
    method: "DELETE",
    path: "/account/tax-regime/es/submission/pending",
    successStatuses: [
      200
    ]
  },
  "listApiKeys": {
    method: "GET",
    path: "/api-keys",
    successStatuses: [
      200
    ]
  },
  "createApiKey": {
    method: "POST",
    path: "/api-keys",
    successStatuses: [
      201
    ]
  },
  "retrieveApiKey": {
    method: "GET",
    path: "/api-keys/{id}",
    successStatuses: [
      200
    ]
  },
  "deleteApiKey": {
    method: "DELETE",
    path: "/api-keys/{id}",
    successStatuses: [
      204
    ]
  },
  "listEvents": {
    method: "GET",
    path: "/events",
    successStatuses: [
      200
    ]
  },
  "retrieveEvent": {
    method: "GET",
    path: "/events/{id}",
    successStatuses: [
      200
    ]
  },
  "listEventDestinations": {
    method: "GET",
    path: "/event-destinations",
    successStatuses: [
      200
    ]
  },
  "createEventDestination": {
    method: "POST",
    path: "/event-destinations",
    successStatuses: [
      201
    ]
  },
  "retrieveEventDestination": {
    method: "GET",
    path: "/event-destinations/{id}",
    successStatuses: [
      200
    ]
  },
  "updateEventDestination": {
    method: "PATCH",
    path: "/event-destinations/{id}",
    successStatuses: [
      200
    ]
  },
  "deleteEventDestination": {
    method: "DELETE",
    path: "/event-destinations/{id}",
    successStatuses: [
      204
    ]
  },
  "enableEventDestination": {
    method: "POST",
    path: "/event-destinations/{id}/enable",
    successStatuses: [
      200
    ]
  },
  "disableEventDestination": {
    method: "POST",
    path: "/event-destinations/{id}/disable",
    successStatuses: [
      200
    ]
  },
  "listInvoiceSeries": {
    method: "GET",
    path: "/invoice-series",
    successStatuses: [
      200
    ]
  },
  "createInvoiceSeries": {
    method: "POST",
    path: "/invoice-series",
    successStatuses: [
      201
    ]
  },
  "retrieveInvoiceSeries": {
    method: "GET",
    path: "/invoice-series/{id}",
    successStatuses: [
      200
    ]
  },
  "updateInvoiceSeries": {
    method: "PATCH",
    path: "/invoice-series/{id}",
    successStatuses: [
      200
    ]
  },
  "deleteInvoiceSeries": {
    method: "DELETE",
    path: "/invoice-series/{id}",
    successStatuses: [
      204
    ]
  },
  "listPaymentInstructions": {
    method: "GET",
    path: "/payment-instructions",
    successStatuses: [
      200
    ]
  },
  "createPaymentInstruction": {
    method: "POST",
    path: "/payment-instructions",
    successStatuses: [
      201
    ]
  },
  "retrievePaymentInstruction": {
    method: "GET",
    path: "/payment-instructions/{id}",
    successStatuses: [
      200
    ]
  },
  "updatePaymentInstruction": {
    method: "PATCH",
    path: "/payment-instructions/{id}",
    successStatuses: [
      200
    ]
  },
  "deletePaymentInstruction": {
    method: "DELETE",
    path: "/payment-instructions/{id}",
    successStatuses: [
      204
    ]
  },
  "listTaxRegimes": {
    method: "GET",
    path: "/tax-regimes",
    successStatuses: [
      200
    ]
  },
  "retrieveTaxRegime": {
    method: "GET",
    path: "/tax-regimes/{id}",
    successStatuses: [
      200
    ]
  },
  "retrieveTaxId": {
    method: "GET",
    path: "/tax-ids/{id}",
    successStatuses: [
      200
    ]
  },
  "listCustomers": {
    method: "GET",
    path: "/customers",
    successStatuses: [
      200
    ]
  },
  "createCustomer": {
    method: "POST",
    path: "/customers",
    successStatuses: [
      201
    ]
  },
  "retrieveCustomer": {
    method: "GET",
    path: "/customers/{id}",
    successStatuses: [
      200
    ]
  },
  "updateCustomer": {
    method: "PATCH",
    path: "/customers/{id}",
    successStatuses: [
      200
    ]
  },
  "deleteCustomer": {
    method: "DELETE",
    path: "/customers/{id}",
    successStatuses: [
      204
    ]
  },
  "listInvoices": {
    method: "GET",
    path: "/invoices",
    successStatuses: [
      200
    ]
  },
  "issueInvoice": {
    method: "POST",
    path: "/invoices",
    successStatuses: [
      201
    ]
  },
  "retrieveInvoice": {
    method: "GET",
    path: "/invoices/{id}",
    successStatuses: [
      200
    ]
  },
  "amendInvoice": {
    method: "POST",
    path: "/invoices/{invoice_id}/amendments",
    successStatuses: [
      201
    ]
  },
  "retrieveInvoicePdf": {
    method: "GET",
    path: "/invoices/{invoice_id}/pdf",
    successStatuses: [
      200
    ]
  },
  "renderInvoicePdf": {
    method: "POST",
    path: "/invoices/{invoice_id}/pdf",
    successStatuses: [
      200,
      201
    ]
  }
} as const satisfies Record<string, Operation>;

export type OperationId = keyof typeof OPERATIONS;
