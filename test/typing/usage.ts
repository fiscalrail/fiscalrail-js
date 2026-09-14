import { FiscalRail, type Customer, type InvoiceIssueParams } from "../../dist/index.js";
import { vat } from "../../dist/tax-regimes/es.js";
import { constructEvent } from "../../dist/webhooks.js";

const client = new FiscalRail({ apiKey: "ak_test" });
const params: InvoiceIssueParams = {
  lines: [{ description: "Consulting", unit_price: "100.00", taxes: [vat.general] }],
};

const customer: Promise<Customer> = client.customers.retrieve("cus_123");
void customer;
void client.accounts.list();
void client.balances.retrieve("acct_123");
void client.accountTaxRegimes.retrieve("acct_123");
void client.apiKeys.list();
void client.eventDestinations.enable("evt_dest_123");
void client.events.list({ types: ["invoice.created"] });
void client.invoiceSeries.list();
void client.invoices.issue(params, { idempotencyKey: "durable" });
void client.invoicePdfs.renderContent("inv_123", { locale: "es" });
void client.paymentInstructions.list();
void client.taxIds.retrieve("tax_id_123");
void client.taxRegimes.list();
void constructEvent("{}", "t=1,v1=deadbeef", "whsec_test");

// @ts-expect-error unsupported locale
void client.invoicePdfs.render("inv_123", { locale: "fr" });
// @ts-expect-error invoice lines are required
void client.invoices.issue({});
