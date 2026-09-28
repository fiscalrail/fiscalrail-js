export interface paths {
    "/account": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieve the authenticated account
         * @description Returns the account selected by the API key.
         */
        get: operations["retrieveAccount"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /**
         * Update the authenticated account
         * @description Updates business identity, contact information, or address. Issued invoices retain their immutable supplier snapshot.
         */
        patch: operations["updateAccount"];
        trace?: never;
    };
    "/account/invoicing": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieve invoicing settings
         * @description Returns the selected account's invoicing configuration.
         */
        get: operations["retrieveAccountInvoicing"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /**
         * Update invoicing settings
         * @description Omitted fields remain unchanged. Default series and payment instructions are replaced atomically when supplied. Settings affect PDFs rendered after the update, including older invoices without a cached PDF.
         */
        patch: operations["updateAccountInvoicing"];
        trace?: never;
    };
    "/account/balance": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieve a balance
         * @description Returns the current prepaid balance for a Live account. Test accounts do not have Balance resources. The amount is informational; clients must still handle balance exhaustion when performing a paid operation.
         */
        get: operations["retrieveBalance"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/account/tax-regime": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieve the account tax regime
         * @description Returns the selected account's regime configuration and compliance state.
         */
        get: operations["retrieveAccountTaxRegime"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api-keys": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List API keys
         * @description Returns API keys in reverse chronological ID order. Stored keys never expose their secret.
         */
        get: operations["listApiKeys"];
        put?: never;
        /**
         * Create an API key
         * @description Creates an API key. The secret is returned by this operation only and cannot be retrieved later.
         */
        post: operations["createApiKey"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api-keys/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The opaque ID of the API key. */
                id: components["schemas"]["ApiKeyId"];
            };
            cookie?: never;
        };
        /**
         * Retrieve an API key
         * @description Returns API key metadata. The secret is always null after creation.
         */
        get: operations["retrieveApiKey"];
        put?: never;
        post?: never;
        /**
         * Revoke an API key
         * @description Permanently revokes an API key. Revoking the key used for this request takes effect immediately after the response.
         */
        delete: operations["deleteApiKey"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/events": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List events
         * @description Returns immutable events in reverse chronological ID order.
         */
        get: operations["listEvents"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/events/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The opaque event ID. */
                id: string;
            };
            cookie?: never;
        };
        /** Retrieve an event */
        get: operations["retrieveEvent"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/event-destinations": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List event destinations
         * @description Returns destinations for the authenticated Live or Test account. Signing secrets are null in list responses.
         */
        get: operations["listEventDestinations"];
        put?: never;
        /**
         * Create an event destination
         * @description Creates a webhook endpoint. An account can have at most 20 event destinations.
         */
        post: operations["createEventDestination"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/event-destinations/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The opaque event destination ID. */
                id: string;
            };
            cookie?: never;
        };
        /**
         * Retrieve an event destination
         * @description Returns the destination and its readable signing secret.
         */
        get: operations["retrieveEventDestination"];
        put?: never;
        post?: never;
        /** Delete an event destination */
        delete: operations["deleteEventDestination"];
        options?: never;
        head?: never;
        /** Update an event destination */
        patch: operations["updateEventDestination"];
        trace?: never;
    };
    "/event-destinations/{id}/enable": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Enable an event destination */
        post: operations["enableEventDestination"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/event-destinations/{id}/disable": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Disable an event destination */
        post: operations["disableEventDestination"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/invoice-series": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List invoice series
         * @description Returns invoice series in reverse chronological ID order.
         */
        get: operations["listInvoiceSeries"];
        put?: never;
        /**
         * Create an invoice series
         * @description Creates an invoice-series family. The account's invoice numbering scope applies to every series. The first series is automatically made the account default.
         */
        post: operations["createInvoiceSeries"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/invoice-series/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The opaque ID of the invoice series. */
                id: components["schemas"]["InvoiceSeriesId"];
            };
            cookie?: never;
        };
        /** Retrieve an invoice series */
        get: operations["retrieveInvoiceSeries"];
        put?: never;
        post?: never;
        /**
         * Delete an invoice series
         * @description Deletes an invoice series that has not been used to issue an invoice.
         */
        delete: operations["deleteInvoiceSeries"];
        options?: never;
        head?: never;
        /**
         * Update an invoice series
         * @description Changes the prefix or account operations that use this series by default.
         *     Numbering scope is configured on the account and applies to every series.
         *     The prefix can be changed only before the series has issued its first invoice.
         */
        patch: operations["updateInvoiceSeries"];
        trace?: never;
    };
    "/payment-instructions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List payment instructions
         * @description Returns reusable payment instructions in reverse chronological ID order.
         */
        get: operations["listPaymentInstructions"];
        put?: never;
        /**
         * Create a payment instruction
         * @description Creates a reusable bank-transfer instruction. It is not added to account defaults automatically.
         */
        post: operations["createPaymentInstruction"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/payment-instructions/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The opaque ID of the payment instruction. */
                id: components["schemas"]["PaymentInstructionId"];
            };
            cookie?: never;
        };
        /** Retrieve a payment instruction */
        get: operations["retrievePaymentInstruction"];
        put?: never;
        post?: never;
        /**
         * Delete a payment instruction
         * @description Deletes an instruction that is not configured as an account default. Issued invoices retain their snapshots.
         */
        delete: operations["deletePaymentInstruction"];
        options?: never;
        head?: never;
        /**
         * Update a payment instruction
         * @description Updates future uses of the instruction. Issued invoice snapshots are unaffected.
         */
        patch: operations["updatePaymentInstruction"];
        trace?: never;
    };
    "/tax-regimes": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List tax regimes
         * @description Returns every tax regime currently supported by FiscalRail and its structured tax catalog.
         */
        get: operations["listTaxRegimes"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/tax-regimes/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Tax regime key, such as `es`. */
                id: string;
            };
            cookie?: never;
        };
        /**
         * Retrieve a tax regime
         * @description Returns the regime's supported tax definitions and every effective-dated rule version.
         */
        get: operations["retrieveTaxRegime"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/tax-ids/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description The opaque ID of the Tax ID to retrieve.
                 * @example tax_id_14Vxtqg6oXpAY5WdWoq4wW
                 */
                id: components["parameters"]["TaxIdId"];
            };
            cookie?: never;
        };
        /**
         * Retrieve a Tax ID
         * @description Returns a Tax ID by its opaque ID, including its owner and latest registry-verification status.
         */
        get: operations["retrieveTaxId"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/customers": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List customers
         * @description Returns the account's customers in reverse chronological ID order.
         *     Use only one cursor parameter at a time. `starting_after` moves toward
         *     older customers; `ending_before` moves toward newer customers.
         */
        get: operations["listCustomers"];
        put?: never;
        /**
         * Create a customer
         * @description Creates a customer from its current legal identity, tax ID, and contact details.
         */
        post: operations["createCustomer"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/customers/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The opaque ID of the customer. */
                id: components["parameters"]["CustomerId"];
            };
            cookie?: never;
        };
        /**
         * Retrieve a customer
         * @description Returns a customer by its opaque ID, including its current tax ID and contact details.
         */
        get: operations["retrieveCustomer"];
        put?: never;
        post?: never;
        /**
         * Delete a customer
         * @description Deletes a customer that has not been used by an invoice. A customer
         *     referenced by an invoice cannot be deleted.
         */
        delete: operations["deleteCustomer"];
        options?: never;
        head?: never;
        /**
         * Update a customer
         * @description Partially updates the supplied fields. Omitted top-level and address
         *     fields are left unchanged.
         */
        patch: operations["updateCustomer"];
        trace?: never;
    };
    "/invoices": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List invoices
         * @description Returns issued invoices in reverse chronological ID order. Use only
         *     one cursor parameter at a time.
         */
        get: operations["listInvoices"];
        put?: never;
        /**
         * Issue an invoice
         * @description Atomically validates, numbers and issues an immutable invoice. Omit
         *     `customer` to issue a simplified invoice. For Spanish accounts, its total
         *     including VAT cannot exceed 400.00 EUR. Spanish accounts resolve tax
         *     references from `tax` and `rule`; supplied resolved tax fields are not
         *     authoritative. A Spanish ordinary invoice requires the selected customer
         *     to have an address. Global invoices may snapshot a null customer address.
         *     Supply an optional `Idempotency-Key` to make retries safe.
         */
        post: operations["issueInvoice"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/invoices/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description The opaque ID of the invoice to retrieve.
                 * @example inv_14Vxtqg6oXpAY5WdWoq4wW
                 */
                id: components["parameters"]["InvoiceId"];
            };
            cookie?: never;
        };
        /**
         * Retrieve an invoice
         * @description Returns an issued invoice by its opaque ID. The returned document is an immutable snapshot.
         */
        get: operations["retrieveInvoice"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/invoices/{invoice_id}/amendments": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description The opaque ID of the invoice to amend or void.
                 * @example inv_14Vxtqg6oXpAY5WdWoq4wW
                 */
                invoice_id: components["parameters"]["InvoiceAmendmentInvoiceId"];
            };
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Amend or void an invoice
         * @description Atomically records an amendment and issues the required immutable
         *     documents. Most reasons fully credit the original and optionally issue
         *     a replacement. `issued_by_mistake` creates no invoice and, for Spanish
         *     accounts, sends a VERI*FACTU cancellation record. Supply an optional
         *     `Idempotency-Key` to make retries safe. A document can be amended once;
         *     apply any later amendment to its replacement invoice.
         */
        post: operations["amendInvoice"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/invoices/{invoice_id}/pdf": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description The opaque ID of the invoice whose PDF should be retrieved or rendered.
                 * @example inv_14Vxtqg6oXpAY5WdWoq4wW
                 */
                invoice_id: components["parameters"]["InvoicePdfInvoiceId"];
            };
            cookie?: never;
        };
        /**
         * Retrieve an existing invoice PDF without generating or billing
         * @description Returns JSON metadata by default. Send `Accept: application/pdf` to
         *     download the PDF bytes. This operation never renders or bills; it
         *     returns `404` if no PDF has been generated.
         */
        get: operations["retrieveInvoicePdf"];
        put?: never;
        /**
         * Render an invoice PDF
         * @description Synchronously renders the PDF and charges only when no cached PDF
         *     exists. `Accept-Language` selects `es` or `en` for the first render
         *     request; that locale remains pinned for the invoice PDF. The account
         *     invoice locale is used as fallback. Returns JSON metadata by default; send
         *     `Accept: application/pdf` for PDF bytes. A cached render returns `200`,
         *     while a newly rendered PDF returns `201`.
         */
        post: operations["renderInvoicePdf"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /** @example req_14Vxtqg6oXpAY5WdWoq4wW */
        RequestId: string;
        /**
         * @description Opaque identifier for an account.
         * @example acct_14Vxtqg2nwvPR75TpsGH8N
         */
        AccountId: string;
        /**
         * @description Opaque identifier for a balance.
         * @example bal_14Vxtqg2nwvPR75TpsGH8N
         */
        BalanceId: string;
        /**
         * @description Opaque identifier for an API key.
         * @example acct_key_14Vxtqg6oXpAY5WdWoq4wW
         */
        ApiKeyId: string;
        /**
         * @description Opaque identifier for an invoice series.
         * @example inv_ser_14Vxtqg4QFd6rL8cUoK3sZ
         */
        InvoiceSeriesId: string;
        /**
         * @description Opaque identifier for a payment instruction.
         * @example pay_ins_14Vxtqm9KHu4rP3eZyN8gT
         */
        PaymentInstructionId: string;
        /** @description True when the object belongs to the live environment; false for test data. */
        Live: boolean;
        Account: {
            id: components["schemas"]["AccountId"];
            /**
             * @description String identifying this as an Account object.
             * @constant
             */
            object: "account";
            live: components["schemas"]["Live"];
            /** @description Legal or trading name used when issuing invoices. */
            name: string;
            /** @description The account's current fiscal identifier and verification state. */
            tax_id: components["schemas"]["TaxId"];
            /** @description Contact email, or null when none was supplied. */
            email: string | null;
            /** @description Contact phone number, or null when none was supplied. */
            phone: string | null;
            /** @description Current business address. */
            address: components["schemas"]["Address"];
            /** @description Tax regime key selected for this account. */
            tax_regime: string;
            /** @description IANA timezone used to determine the account's local date. */
            timezone: string;
            /**
             * Format: date-time
             * @description When the account was created.
             */
            created_at: string;
            /**
             * Format: date-time
             * @description When the account was last updated.
             */
            updated_at: string;
        };
        AccountUpdate: {
            /** @description Legal or trading name. */
            name?: string;
            /** @description Contact email; null clears it. */
            email?: string | null;
            /** @description Contact phone number; null clears it. */
            phone?: string | null;
            /** @description Supplier address fields to update; omitted fields remain unchanged. */
            address?: components["schemas"]["AddressUpdate"];
        };
        AccountInvoicing: {
            /**
             * @description String identifying invoicing settings.
             * @constant
             */
            object: "account_invoicing";
            /**
             * InvoiceLocale
             * @description Default PDF language.
             * @enum {string}
             */
            locale: "en" | "es";
            /** @description PDF footer; null removes it. */
            footer: string | null;
            /** @description Invoice numbering scope for every series. */
            numbering_scope: components["schemas"]["AccountInvoiceNumberingScope"];
            /** @description Complete default series assignments. */
            default_series: components["schemas"]["AccountDefaultSeries"];
            /** @description Ordered payment instruction defaults. */
            default_payment_instructions: components["schemas"]["PaymentInstructionId"][];
        };
        AccountInvoicingUpdate: {
            /**
             * InvoiceLocale
             * @description Default PDF language.
             * @enum {string}
             */
            locale?: "en" | "es";
            /** @description PDF footer; null removes it. */
            footer?: string | null;
            /** @description Invoice numbering scope for every series. */
            numbering_scope?: components["schemas"]["AccountInvoiceNumberingScope"];
            /** @description Complete default series assignments. */
            default_series?: components["schemas"]["AccountDefaultSeries"];
            /** @description Ordered payment instruction defaults. */
            default_payment_instructions?: components["schemas"]["PaymentInstructionId"][];
        };
        /** AccountDefaultSeries */
        AccountDefaultSeries: {
            /** @description Series used when invoice issuance omits `series`. */
            invoice: components["schemas"]["InvoiceSeriesId"];
            /** @description Series used for credit notes created by amendments, or null if none is configured. */
            credit_note: components["schemas"]["InvoiceSeriesId"] | null;
            /** @description Series used for replacement invoices created by amendments, or null if none is configured. */
            amendment: components["schemas"]["InvoiceSeriesId"] | null;
        };
        /**
         * AccountInvoiceNumberingScope
         * @description Account uses one sequence per configured series. Customer appends the customer's invoice prefix to generated codes and maintains an independent sequence for each series and customer; customerless invoices use the base sequence.
         * @default account
         * @enum {string}
         */
        AccountInvoiceNumberingScope: "account" | "customer";
        ApiKey: {
            id: components["schemas"]["ApiKeyId"];
            /**
             * @description String identifying this as an API Key object.
             * @constant
             */
            object: "api_key";
            live: components["schemas"]["Live"];
            /** @description Account this key authenticates as. */
            account: components["schemas"]["AccountId"];
            /** @description Human-readable label describing where the key is used. */
            name: string;
            /** @description Last four characters used to identify the key safely. */
            suffix: string;
            /** @description Full secret returned only during creation; null on every later response. */
            secret: string | null;
            /**
             * Format: date-time
             * @description When the API key was created.
             */
            created_at: string;
        };
        ApiKeyCreate: {
            /** @description Human-readable label describing where the key will be used. */
            name: string;
        };
        ApiKeyList: {
            /**
             * @description String identifying this as a list object.
             * @constant
             */
            object: "list";
            /** @description Whether another page exists in the requested direction. */
            has_more: boolean;
            /** @description API keys in this page. */
            data: components["schemas"]["ApiKey"][];
        };
        RelatedObject: {
            /** @description Opaque identifier for the related resource. */
            id: string;
            /** @description API object type of the related resource. */
            object: string;
        } | null;
        Event: {
            /** @description Opaque identifier for the event. */
            id: string;
            /**
             * @description String identifying this as an Event object.
             * @constant
             */
            object: "event";
            live: components["schemas"]["Live"];
            /** @description Account in which the event occurred. */
            account: components["schemas"]["AccountId"];
            /** @description Stable event type used when configuring subscriptions. */
            type: string;
            /**
             * Format: date-time
             * @description When the represented change occurred.
             */
            occurred_at: string;
            /** @description Actor and request that caused the event. */
            actor: components["schemas"]["EventActor"];
            /** @description Reference to the primary resource represented by the event. */
            related_object: components["schemas"]["RelatedObject"];
            /**
             * EventData
             * @description Immutable resource snapshot stored when the event occurred.
             */
            data: {
                /** @description Complete API representation captured for this event. */
                object: {
                    [key: string]: unknown;
                };
                /** @description Previous values of changed properties for update events. */
                previous_attributes?: {
                    [key: string]: unknown;
                };
            };
        };
        AccountTaxRegime: components["schemas"]["GlobalAccountTaxRegime"] | components["schemas"]["SpanishAccountTaxRegime"];
        GlobalAccountTaxRegime: {
            /**
             * @description String identifying this as an Account Tax Regime object.
             * @constant
             */
            object: "account_tax_regime";
            account: components["schemas"]["AccountId"];
            /**
             * @description Identifies the Global tax regime. (enum property replaced by openapi-typescript)
             * @enum {string}
             */
            key: "global";
        };
        SpanishAccountTaxRegime: {
            /**
             * @description String identifying this as an Account Tax Regime object.
             * @constant
             */
            object: "account_tax_regime";
            account: components["schemas"]["AccountId"];
            /**
             * @description Identifies the Spanish tax regime. (enum property replaced by openapi-typescript)
             * @enum {string}
             */
            key: "es";
            /** @description Spanish account-specific configuration and compliance state. */
            es: components["schemas"]["SpanishAccountTaxRegimeDetails"];
        };
        SpanishAccountTaxRegimeDetails: {
            /** @description Current AEAT representation state, or null for a Test account. */
            representation: components["schemas"]["SpanishAccountRepresentation"] | null;
        };
        SpanishAccountRepresentation: {
            /**
             * @description Representation method used for the account.
             * @constant
             */
            kind: "aeat_registered_power";
            /**
             * @description AEAT power for submitting and consulting invoice-registration records through web services.
             * @constant
             */
            power_code: "IZ860";
            /**
             * SpanishAccountRepresentationStatus
             * @description Current result of FiscalRail's live AEAT representation check.
             * @enum {string}
             */
            status: "not_started" | "pending_verification" | "verified" | "revoked" | "invalid";
            /**
             * Format: date-time
             * @description When the power was last successfully verified, or null when never verified.
             */
            verified_at: string | null;
            /**
             * Format: date-time
             * @description When the latest live verification attempt finished, or null before the first completed check.
             */
            last_checked_at: string | null;
        };
        Balance: {
            id: components["schemas"]["BalanceId"];
            /**
             * @description String identifying this as a Balance object.
             * @constant
             */
            object: "balance";
            live: components["schemas"]["Live"];
            /** @description Live account that owns the balance. */
            account: components["schemas"]["AccountId"];
            /** @description Current signed balance in the currency's major unit. This amount is informational and may change before the next paid operation. */
            amount: components["schemas"]["Money"];
            /**
             * BalanceCurrency
             * @description Billing currency for the balance.
             * @enum {string}
             */
            currency: "EUR";
            /**
             * Format: date-time
             * @description When the balance last changed.
             */
            updated_at: string;
        };
        BalanceTransaction: {
            /** @description Opaque identifier for the balance transaction. */
            id: string;
            /**
             * @description String identifying this as a Balance Transaction object.
             * @constant
             */
            object: "balance_transaction";
            live: components["schemas"]["Live"];
            /** @description Account whose balance changed. */
            account: components["schemas"]["AccountId"];
            /**
             * BalanceTransactionKind
             * @description Reason that the account balance changed.
             * @enum {string}
             */
            kind: "usage" | "top_up" | "payment_refund" | "payment_dispute" | "payment_dispute_reversal";
            /** @description Signed amount in euro cents. Credits are positive and debits are negative. */
            amount_cents: number;
            /**
             * Currency
             * @description Billing currency for the amount.
             * @enum {string}
             */
            currency: "EUR";
            /** @description Domain Event that caused a usage debit. Null for top-ups. */
            source_event: string | null;
            /**
             * Format: date-time
             * @description When the balance transaction was created.
             */
            created_at: string;
        };
        EventActor: {
            /**
             * EventActorType
             * @description Kind of actor that caused the event.
             * @enum {string}
             */
            type: "api_key" | "user" | "system";
            /** @description API key or user ID. Null for system events. */
            id: string | null;
            /** @description Request ID for API and dashboard actions. Null for system events. */
            request_id: string | null;
        };
        EventList: {
            /** @constant */
            object: "list";
            has_more: boolean;
            data: components["schemas"]["Event"][];
        };
        EventDestination: {
            /** @description Opaque identifier for the event destination. */
            id: string;
            /**
             * @description String identifying this as an Event Destination object.
             * @constant
             */
            object: "event_destination";
            live: components["schemas"]["Live"];
            /** @description Live or Test account that owns this destination. */
            account: components["schemas"]["AccountId"];
            /** @description Human-readable destination name. */
            name: string;
            /**
             * @description Transport used by this destination. Currently always webhook.
             * @constant
             */
            type: "webhook";
            /**
             * EventDestinationStatus
             * @description Whether matching events are currently delivered.
             * @enum {string}
             */
            status: "enabled" | "disabled";
            /** @description Exact subscribed event types, or a single asterisk for all events. */
            enabled_events: string[];
            /**
             * EventDestinationWebhook
             * @description Webhook-specific URL and signing configuration.
             */
            webhook: {
                /**
                 * Format: uri
                 * @description Public HTTPS endpoint that receives event deliveries.
                 */
                url: string;
                /** @description Readable on create and retrieve; null in list responses. */
                signing_secret: string | null;
            };
            /**
             * EventDestinationDisabledReason
             * @description Why this destination was disabled, or null while enabled.
             * @enum {string|null}
             */
            disabled_reason: "user" | "delivery_failures" | null;
            /**
             * Format: date-time
             * @description When the destination was created.
             */
            created_at: string;
            /**
             * Format: date-time
             * @description When the destination was last updated.
             */
            updated_at: string;
        };
        EventDestinationCreate: {
            /** @description Human-readable destination name. */
            name: string;
            /**
             * Format: uri
             * @description Public HTTPS endpoint that receives deliveries.
             */
            url: string;
            /** @description One to 20 exact event types, or a single asterisk for all events. */
            enabled_events: string[];
        };
        EventDestinationUpdate: {
            /** @description Human-readable destination name. */
            name?: string;
            /**
             * Format: uri
             * @description Public HTTPS endpoint that receives deliveries.
             */
            url?: string;
            /** @description One to 20 exact event types, or a single asterisk for all events. */
            enabled_events?: string[];
        };
        EventDestinationList: {
            /** @constant */
            object: "list";
            has_more: boolean;
            data: components["schemas"]["EventDestination"][];
        };
        InvoiceSeries: {
            id: components["schemas"]["InvoiceSeriesId"];
            /**
             * @description String identifying this as an Invoice Series object.
             * @constant
             */
            object: "invoice_series";
            live: components["schemas"]["Live"];
            /** @description Account that owns the series. */
            account: components["schemas"]["AccountId"];
            /** @description Base prefix used to generate human-readable invoice numbers. */
            prefix: string;
            /** @description Account operations that use this series when no explicit series is supplied. */
            default_for: ("invoice" | "credit_note" | "amendment")[];
            /**
             * Format: date-time
             * @description When the invoice series was created.
             */
            created_at: string;
        };
        InvoiceSeriesCreate: {
            /** @description Series prefix. FiscalRail strips whitespace, converts it to uppercase, and prepends `TEST-` for test accounts. */
            prefix: string;
            /** @description Account operations that should use the new series by default. */
            default_for?: ("invoice" | "credit_note" | "amendment")[];
        };
        InvoiceSeriesUpdate: {
            /** @description New prefix. FiscalRail normalizes it and preserves the required `TEST-` marker for test accounts. It cannot be changed after the series has issued an invoice. */
            prefix?: string;
            /** @description Complete set of defaults assigned to this series. Omitted roles are cleared only when they currently point here. */
            default_for?: ("invoice" | "credit_note" | "amendment")[];
        };
        InvoiceSeriesList: {
            /**
             * @description String identifying this as a list object.
             * @constant
             */
            object: "list";
            /** @description Whether another page exists in the requested direction. */
            has_more: boolean;
            /** @description Invoice series in this page. */
            data: components["schemas"]["InvoiceSeries"][];
        };
        PaymentInstruction: {
            id: components["schemas"]["PaymentInstructionId"];
            /**
             * @description String identifying this as a Payment Instruction object.
             * @constant
             */
            object: "payment_instruction";
            live: components["schemas"]["Live"];
            /** @description Account that owns the instruction. */
            account: components["schemas"]["AccountId"];
            /** @description Internal label used to distinguish reusable instructions. It is not copied onto invoices. */
            label: string;
            /**
             * @description Discriminator for the type-specific instruction object.
             * @constant
             */
            type: "bank_transfer";
            /** @description Bank account to show when this instruction is selected. */
            bank_transfer: components["schemas"]["PaymentInstructionBankTransfer"];
            /**
             * Format: date-time
             * @description When the payment instruction was created.
             */
            created_at: string;
            /**
             * Format: date-time
             * @description When the mutable instruction was last updated.
             */
            updated_at: string;
        };
        PaymentInstructionBankTransfer: {
            /** @description Name of the bank-account beneficiary shown to the payer. */
            beneficiary: string;
            /** @description Valid normalized IBAN without spaces. */
            iban: string;
            /** @description Optional BIC or SWIFT code, normalized to uppercase. */
            bic: string | null;
        };
        PaymentInstructionCreate: {
            /** @description Internal label used to distinguish the instruction. */
            label: string;
            /**
             * @description Creates a bank-transfer instruction.
             * @constant
             */
            type: "bank_transfer";
            /** @description Bank details used when rendering future invoice payment options. */
            bank_transfer: components["schemas"]["PaymentInstructionBankTransferInput"];
        };
        PaymentInstructionUpdate: {
            /** @description New internal label. */
            label?: string;
            /** @description Bank-detail fields to change for future invoice payment options. */
            bank_transfer?: components["schemas"]["PaymentInstructionBankTransferUpdate"];
        };
        PaymentInstructionBankTransferInput: {
            /** @description Name of the bank-account beneficiary. */
            beneficiary: string;
            /** @description IBAN. FiscalRail removes whitespace, uppercases it, and validates its registered country length and check digits. */
            iban: string;
            /** @description Optional BIC or SWIFT code. FiscalRail removes whitespace and uppercases it. */
            bic?: string | null;
        };
        PaymentInstructionBankTransferUpdate: {
            /** @description New beneficiary name. */
            beneficiary?: string;
            /** @description New IBAN to use for future invoices. Its registered country length and check digits are validated. */
            iban?: string;
            /** @description New BIC, or null to clear it. */
            bic?: string | null;
        };
        PaymentInstructionList: {
            /**
             * @description String identifying this as a list object.
             * @constant
             */
            object: "list";
            /** @description Whether another page exists in the requested direction. */
            has_more: boolean;
            /** @description Payment instructions in this page. */
            data: components["schemas"]["PaymentInstruction"][];
        };
        TaxRegime: {
            /**
             * TaxRegimeId
             * @description Stable tax regime key.
             * @enum {string}
             */
            id: "global" | "es";
            /**
             * @description String identifying this as a Tax Regime object.
             * @constant
             */
            object: "tax_regime";
            /** @description Structured taxes supported by the regime. Empty when the regime accepts custom taxes. */
            taxes: components["schemas"]["TaxRegimeTax"][];
        };
        TaxRegimeTax: {
            /** @description Stable tax identifier supplied as `taxes[].tax` during invoice issuance. */
            tax: string;
            /** @description Human-readable tax name. */
            name: string;
            /**
             * TaxEffect
             * @description How the tax affects invoice totals.
             * @enum {string}
             */
            effect: "added" | "withheld";
            /** @description Rate and treatment versions supported for this tax. */
            rules: components["schemas"]["TaxRegimeTaxRule"][];
        };
        TaxRegimeTaxRule: {
            /** @description Stable rule identifier supplied as `taxes[].rule` during invoice issuance. */
            rule: string;
            /** @description Human-readable description used on invoices. */
            description: string;
            /**
             * TaxTreatment
             * @description Legal treatment applied by the rule.
             * @enum {string}
             */
            treatment: "taxable" | "exempt" | "reverse_charge" | "not_subject";
            /** @description Percentage including `%`, or null when a percentage does not apply. */
            rate: string | null;
            /** @description Corresponding tax-authority code when one applies. */
            authority_code: string | null;
            /** @description Source provision supporting this rule when recorded. */
            legal_reference: string | null;
            /**
             * Format: date
             * @description First date on which this rule version applies.
             */
            effective_from: string;
            /**
             * Format: date
             * @description Last date on which this rule version applies, or null when open-ended.
             */
            effective_until: string | null;
        };
        TaxRegimeList: {
            /**
             * @description String identifying this as a list object.
             * @constant
             */
            object: "list";
            /** @description Whether another page exists. Tax regime catalogs are not paginated. */
            has_more: boolean;
            /** @description Tax regimes supported by FiscalRail. */
            data: components["schemas"]["TaxRegime"][];
        };
        /** @example cus_14Vxtqg6oXpAY5WdWoq4wW */
        CustomerId: string;
        /**
         * @description Opaque identifier for a Tax ID.
         * @example tax_id_14Vxtqg6oXpAY5WdWoq4wW
         */
        TaxIdId: string;
        Customer: {
            /** @description Opaque identifier for the customer. */
            id: components["schemas"]["CustomerId"];
            /**
             * @description String identifying this as a Customer object.
             * @constant
             */
            object: "customer";
            live: components["schemas"]["Live"];
            /** @description The customer's legal or trading name. */
            name: string;
            /** @description Prefix used by invoice series with customer numbering. Generated as six unambiguous uppercase letters when omitted during creation. */
            invoice_prefix: string;
            /** @description The customer's current fiscal identifier and verification state. */
            tax_id: components["schemas"]["TaxId"];
            /** @description The customer's billing email, or null when none was supplied. */
            email: string | null;
            /** @description The customer's phone number, or null when none was supplied. */
            phone: string | null;
            /** @description The customer's current billing address, or null when none was supplied. */
            address: components["schemas"]["Address"] | null;
            /**
             * Format: date-time
             * @description When the customer was created, in ISO 8601 format.
             */
            created_at: string;
            /**
             * Format: date-time
             * @description When the customer was last updated, in ISO 8601 format.
             */
            updated_at: string;
        };
        Address: {
            /** @description Primary street address. */
            line_1: string;
            /** @description Additional address information, or null when not supplied. */
            line_2: string | null;
            /** @description City or locality. */
            city: string;
            /** @description Postal or ZIP code. */
            postal_code: string;
            /** @description State, province, or region, or null when not applicable. */
            state: string | null;
            /** @description ISO 3166-1 alpha-2 country code. */
            country: string;
        };
        TaxId: {
            id: components["schemas"]["TaxIdId"];
            /**
             * @description String identifying this as a Tax ID object.
             * @constant
             */
            readonly object: "tax_id";
            live: components["schemas"]["Live"];
            /**
             * @description ISO 3166-1 alpha-2 country associated with the tax ID. It must be
             *     compatible with the selected tax ID type.
             */
            country: string;
            /**
             * TaxIdType
             * @description FiscalRail's normalized fiscal identifier type.
             * @enum {string}
             */
            type: "es_nif" | "eu_vat" | "local";
            /** @description The normalized fiscal identifier value. */
            value: string;
            /** @description The account or customer that owns the Tax ID. */
            owner: components["schemas"]["TaxIdOwner"];
            /** @description The latest registry verification, or null when verification is unavailable. */
            verification: components["schemas"]["TaxIdVerification"] | null;
        };
        TaxIdInput: {
            /** @description ISO 3166-1 alpha-2 country associated with the tax ID. */
            country: string;
            /**
             * TaxIdType
             * @description FiscalRail's normalized fiscal identifier type.
             * @enum {string}
             */
            type: "es_nif" | "eu_vat" | "local";
            /** @description The fiscal identifier value. */
            value: string;
        };
        TaxIdSnapshot: {
            /** @description ISO 3166-1 alpha-2 country associated with the tax ID at issuance. */
            country: string;
            /** @description FiscalRail's normalized fiscal identifier type at issuance. */
            type: string;
            /** @description The normalized fiscal identifier value at issuance. */
            value: string;
        };
        TaxIdOwner: {
            /**
             * PartyType
             * @description The kind of resource that owns the Tax ID.
             * @enum {string}
             */
            type: "account" | "customer";
            /** @description Account or customer ID, according to `type`. */
            id: string;
        };
        TaxIdVerification: {
            /**
             * TaxIdVerificationStatus
             * @description The current state of the latest registry-verification attempt.
             * @enum {string}
             */
            status: "pending" | "completed" | "failed";
            /** @description The registry result, or null while pending or when verification failed. */
            valid: boolean | null;
            /**
             * Format: date-time
             * @description When the verification attempt completed or failed, or null while it is pending.
             */
            completed_at: string | null;
        };
        CustomerList: {
            /**
             * @description String identifying this as a list object.
             * @constant
             */
            object: "list";
            /** @description Whether another page exists in the requested direction. */
            has_more: boolean;
            /** @description Customers in this page. */
            data: components["schemas"]["Customer"][];
        };
        CustomerCreate: {
            /** @description The customer's legal or trading name. */
            name: string;
            /** @description Optional custom invoice prefix. FiscalRail generates six uppercase letters excluding I and O when omitted. */
            invoice_prefix?: string;
            /** @description The customer's fiscal identifier. */
            tax_id: components["schemas"]["TaxIdInput"];
            /** @description The customer's billing email. */
            email?: string | null;
            /** @description The customer's phone number. */
            phone?: string | null;
            /** @description The customer's billing address. Omit it or use null when it is not yet known. */
            address?: components["schemas"]["AddressCreate"] | null;
        };
        CustomerUpdate: {
            /** @description A new legal or trading name. Null values are rejected. */
            name?: string;
            /** @description A new invoice prefix. It cannot be changed after an invoice has been issued to the customer. */
            invoice_prefix?: string;
            /** @description A replacement fiscal identifier. */
            tax_id?: components["schemas"]["TaxIdInput"];
            /** @description A new billing email, or null to clear it. */
            email?: string | null;
            /** @description A new phone number, or null to clear it. */
            phone?: string | null;
            /** @description Address fields to update; omitted fields remain unchanged. Use null to clear the address. */
            address?: components["schemas"]["AddressUpdate"] | null;
        };
        AddressCreate: {
            /** @description Primary street address. */
            line_1: string;
            /** @description Additional address information. */
            line_2?: string | null;
            /** @description City or locality. */
            city: string;
            /** @description Postal or ZIP code. */
            postal_code: string;
            /** @description State, province, or region. */
            state?: string | null;
            /** @description ISO 3166-1 alpha-2 country code. */
            country: string;
        };
        AddressUpdate: {
            /** @description A new primary street address. Null values are rejected. */
            line_1?: string | null;
            /** @description New additional address information, or null to clear it. */
            line_2?: string | null;
            /** @description A new city or locality. Null values are rejected. */
            city?: string | null;
            /** @description A new postal or ZIP code. Null values are rejected. */
            postal_code?: string | null;
            /** @description A new state, province, or region, or null to clear it. */
            state?: string | null;
            /** @description A new ISO 3166-1 alpha-2 country code. Null values are rejected. */
            country?: string | null;
        };
        InvoiceCreate: {
            /**
             * @description Customer to snapshot on the invoice, or null for a simplified invoice.
             *     Spanish simplified invoices cannot exceed 400.00 EUR including VAT.
             */
            customer?: components["schemas"]["CustomerId"] | null;
            /** @description Defaults to the account's default invoice series. */
            series?: string;
            /**
             * Format: date
             * @description Defaults to the account's current local date.
             */
            issue_date?: string;
            /** @description Optional period during which the goods or services were supplied. */
            supply_period?: components["schemas"]["InvoiceSupplyPeriodCreate"];
            /** @description Optional due date and ordered payment-instruction selection for a positive ordinary invoice. Omitted options resolve from the account defaults. Payment terms are rejected when the payable amount is not positive. */
            payment_terms?: components["schemas"]["InvoicePaymentTermsCreate"];
            /** @description Line items to include on the invoice. */
            lines: components["schemas"]["InvoiceLineCreate"][];
        };
        InvoiceLineCreate: {
            /** @description Description of the goods or services supplied. */
            description: string;
            /** @default 1 */
            quantity?: components["schemas"]["DecimalInput"];
            /** @description Price per unit before taxes, as a decimal number or numeric string. */
            unit_price: components["schemas"]["DecimalInput"];
            /** @description Taxes applied to this line. Use regime-defined `tax` and `rule` values when available. */
            taxes: components["schemas"]["TaxReference"][];
        };
        InvoiceSupplyPeriodCreate: {
            /**
             * Format: date
             * @description First calendar date covered by the invoice.
             */
            start_date: string;
            /**
             * Format: date
             * @description Must be on or after `start_date`.
             */
            end_date: string;
        };
        /** @description Collection terms for a positive ordinary invoice. Credit notes and invoices without a positive payable amount must omit effective terms. */
        InvoicePaymentTermsCreate: {
            /**
             * Format: date
             * @description Exact date by which payment is due, or null. FiscalRail does not calculate it from account defaults.
             */
            due_date?: string | null;
            /** @description Ordered payment instruction IDs to snapshot on the invoice. Omit to use account defaults; provide an empty array for no instructions. The first option is preferred. */
            options?: components["schemas"]["PaymentInstructionId"][];
        };
        InvoiceAmendmentCreate: {
            reason: components["schemas"]["InvoiceAmendmentReason"];
            /**
             * @description Final desired invoice after the full reversal. Required for customer
             *     and line or tax corrections, optional for refunds and discounts, and
             *     forbidden for `issued_by_mistake`.
             */
            replacement?: components["schemas"]["InvoiceCreate"];
        };
        TaxReference: {
            /** @description Tax identifier defined by the account's tax regime, such as `vat`. */
            tax: string;
            /** @description Rule identifier defined by the selected tax, such as `general`. */
            rule: string;
            /**
             * TaxEffect
             * @description Required only for custom taxes under the global regime.
             * @enum {string}
             */
            effect?: "added" | "withheld";
            /**
             * TaxTreatment
             * @description Used only for custom taxes under the global regime.
             * @enum {string}
             */
            treatment?: "taxable" | "exempt" | "reverse_charge" | "not_subject";
            /** @description Human-readable tax label. Required only for custom taxes under the global regime. */
            description?: string;
            /** @description Required only for custom taxes under the global regime. */
            rate?: components["schemas"]["DecimalInput"];
            /** @description Optional taxable base override for this tax, as a decimal number or numeric string. */
            taxable_base?: components["schemas"]["DecimalInput"];
        };
        /**
         * DecimalInput
         * @description A finite decimal with at most 18 digits and 6 decimal places, whose absolute value does not exceed 999999999999.999999.
         */
        DecimalInput: number | string;
        /**
         * Money
         * @example 121.00
         */
        Money: string;
        /**
         * Decimal
         * @description A finite decimal represented as a numeric string.
         */
        Decimal: string;
        Invoice: {
            /** @description Opaque identifier for the invoice. */
            id: string;
            /**
             * @description String identifying this as an Invoice object.
             * @constant
             */
            object: "invoice";
            live: components["schemas"]["Live"];
            /** @description Account that issued the invoice. */
            account: string;
            /**
             * InvoiceKind
             * @description Commercial document kind. This is independent from tax-regime rectification codes.
             * @enum {string}
             */
            kind: "invoice" | "credit_note";
            /** @description Human-readable invoice number assigned from the selected series. */
            code: string;
            /** @description Invoice-series family used to number the invoice. */
            series: string;
            /**
             * Format: date
             * @description Legal issue date in ISO 8601 format.
             */
            issue_date: string;
            /** @description Period covered by the invoice, or null when it was not provided. */
            supply_period: components["schemas"]["InvoiceSupplyPeriod"] | null;
            /** @description Invoice corrected by this document, or null when this is not a correction. */
            preceding_invoice: components["schemas"]["InvoiceReference"] | null;
            /**
             * @description ISO 4217 currency code used for every monetary amount.
             * @constant
             */
            currency: "EUR";
            /** @description Immutable snapshot of the supplier at issuance. */
            supplier: components["schemas"]["InvoiceParty"];
            /** @description Immutable customer snapshot, or null for a simplified invoice. */
            customer: components["schemas"]["InvoiceParty"] | null;
            /** @description Immutable due date and ordered payment instructions resolved at issuance. Empty for credit notes and invoices without a positive payable amount. */
            payment_terms: components["schemas"]["InvoicePaymentTerms"];
            /** @description Immutable invoice line items and their resolved taxes. */
            lines: components["schemas"]["InvoiceLine"][];
            /** @description Taxes aggregated across all line items. */
            tax_totals: components["schemas"]["InvoiceTaxTotal"][];
            /** @description Monetary totals calculated for the invoice. */
            totals: components["schemas"]["InvoiceTotals"];
            /**
             * Format: date-time
             * @description When FiscalRail stored the issued invoice, in ISO 8601 format.
             */
            created_at: string;
            /** @description Regime-specific compliance state attached to the invoice. */
            tax_regime: components["schemas"]["InvoiceTaxRegime"];
            /** @description Amendments that connect this invoice to its original, credit note and replacement. */
            amendments: components["schemas"]["InvoiceAmendment"][];
        };
        /**
         * @description Why the original invoice was amended or voided.
         * @enum {string}
         */
        InvoiceAmendmentReason: "refund" | "discount" | "incorrect_customer_details" | "incorrect_lines" | "incorrect_tax" | "customer_identification" | "issued_by_mistake";
        InvoiceAmendment: {
            /** @description Opaque identifier for the amendment. */
            id: string;
            /**
             * @description String identifying this as an Invoice Amendment object.
             * @constant
             */
            object: "invoice_amendment";
            live: components["schemas"]["Live"];
            reason: components["schemas"]["InvoiceAmendmentReason"];
            /** @description Invoice being reversed or voided. */
            original: components["schemas"]["InvoiceReference"];
            /** @description Full credit note, or null for an invoice issued by mistake. */
            credit_note: components["schemas"]["InvoiceReference"] | null;
            /** @description Replacement invoice, or null when the operation is fully refunded, discounted or voided. */
            replacement: components["schemas"]["InvoiceReference"] | null;
            /**
             * Format: date-time
             * @description When FiscalRail recorded the amendment, in ISO 8601 format.
             */
            created_at: string;
        };
        InvoiceReference: {
            /** @description FiscalRail invoice ID, or null when the original document was issued elsewhere. */
            id: string | null;
            /** @description Human-readable invoice number. */
            code: string;
            /**
             * Format: date
             * @description Issue date of the referenced invoice in ISO 8601 format.
             */
            issue_date: string;
        };
        InvoiceSupplyPeriod: {
            /**
             * Format: date
             * @description First calendar date covered by the invoice.
             */
            start_date: string;
            /**
             * Format: date
             * @description Last calendar date covered by the invoice.
             */
            end_date: string;
        };
        InvoicePaymentTerms: {
            /**
             * Format: date
             * @description Exact payment due date, or null when none was supplied.
             */
            due_date: string | null;
            /** @description Ordered immutable payment options resolved from the selected instructions. The first option is preferred. */
            options: components["schemas"]["InvoicePaymentOption"][];
        };
        InvoicePaymentOption: {
            /** @description Mutable source instruction from which this immutable option was resolved. */
            payment_instruction: components["schemas"]["PaymentInstructionId"];
            /**
             * @description Discriminator for the resolved type-specific option.
             * @constant
             */
            type: "bank_transfer";
            /** @description Remittance reference generated from the invoice number. */
            reference: string;
            /** @description Immutable bank-transfer details copied at issuance. */
            bank_transfer: components["schemas"]["PaymentInstructionBankTransfer"];
        };
        InvoiceTaxRegime: components["schemas"]["GlobalInvoiceTaxRegime"] | components["schemas"]["SpanishInvoiceTaxRegime"];
        GlobalInvoiceTaxRegime: {
            /**
             * @description Identifies the global tax regime. (enum property replaced by openapi-typescript)
             * @enum {string}
             */
            key: "global";
        };
        SpanishInvoiceTaxRegime: {
            /**
             * @description Identifies the Spanish tax regime. (enum property replaced by openapi-typescript)
             * @enum {string}
             */
            key: "es";
            /** @description Spanish invoice compliance details. */
            es: components["schemas"]["SpanishInvoiceTaxRegimeDetails"];
        };
        SpanishInvoiceTaxRegimeDetails: {
            /** @description AEAT QR data for the invoice. */
            qr: components["schemas"]["SpanishInvoiceQr"];
            /** @description VERI*FACTU registration state for the invoice. */
            verifactu: components["schemas"]["Verifactu"];
        };
        SpanishInvoiceQr: {
            /** @description Exact content encoded in the invoice's AEAT QR code. */
            content: string;
            /**
             * Format: uri
             * @description Permanent signed URL for the compliant SVG QR image.
             */
            image_url: string;
        };
        Verifactu: {
            /** @description Registration attempts for this invoice, newest first. */
            registrations: components["schemas"]["VerifactuRegistration"][];
        };
        VerifactuRegistration: {
            /** @description Opaque identifier for the VERI*FACTU registration. */
            id: string;
            /**
             * @description String identifying this as a VERI*FACTU registration object.
             * @constant
             */
            object: "verifactu_registration";
            live: components["schemas"]["Live"];
            /** @description Invoice submitted by this registration. */
            invoice: string;
            /**
             * VerifactuRegistrationKind
             * @description Kind of VERI*FACTU record submitted.
             * @enum {string}
             */
            kind: "alta" | "anulacion";
            /**
             * VerifactuRegistrationStatus
             * @description Current submission state reported by FiscalRail or AEAT.
             * @enum {string}
             */
            status: "pending" | "accepted" | "accepted_with_errors" | "rejected";
            /**
             * Format: date-time
             * @description When the registration was last submitted to AEAT, or null before submission.
             */
            submitted_at: string | null;
            /** @description AEAT secure verification code, or null when AEAT has not supplied one. */
            csv: string | null;
            /** @description Structured rejection or submission error, or null when there is no error. */
            error: components["schemas"]["VerifactuRegistrationError"] | null;
        };
        VerifactuRegistrationError: {
            /**
             * VerifactuRegistrationErrorCode
             * @enum {string}
             */
            code: "customer_tax_id_not_registered" | "aeat_registration_error";
            message: string;
            /** VerifactuRegistrationRawError */
            raw: {
                code: string | null;
                message: string | null;
            };
        };
        InvoiceParty: {
            /** @description Resource from which this immutable party snapshot was created. */
            source: components["schemas"]["InvoicePartySource"];
            /** @description Legal or trading name at issuance. */
            name: string;
            /** @description Fiscal identifier at issuance. */
            tax_id: components["schemas"]["TaxIdSnapshot"];
            /** @description Email address at issuance, or null when absent. */
            email: string | null;
            /** @description Phone number at issuance, or null when absent. */
            phone: string | null;
            /** @description Address at issuance, or null when a global invoice was issued without one. */
            address: components["schemas"]["Address"] | null;
        };
        InvoicePartySource: {
            /**
             * PartyType
             * @description Kind of resource from which the party was snapshotted.
             * @enum {string}
             */
            type: "account" | "customer";
            /** @description Account or customer ID, according to `type`. */
            id: string;
        };
        InvoiceLine: {
            /** @description One-based position of the line on the invoice. */
            index: number;
            /** @description Description of the goods or services captured at issuance. */
            description: string;
            /** @description Quantity represented as a decimal string. */
            quantity: components["schemas"]["Decimal"];
            /** @description Price per unit before taxes. */
            unit_price: components["schemas"]["Money"];
            /** @description Line amount before taxes. */
            subtotal: components["schemas"]["Money"];
            /** @description Resolved taxes applied to the line. */
            taxes: components["schemas"]["InvoiceTax"][];
        };
        InvoiceTax: {
            /** @description Stable tax identifier from the invoice's tax regime. */
            tax: string;
            /** @description Stable rule identifier within the tax. */
            rule: string;
            /**
             * TaxEffect
             * @description How this tax affects the invoice total.
             * @enum {string}
             */
            effect: "added" | "withheld";
            /**
             * TaxTreatment
             * @description Fiscal treatment applied to the taxable base.
             * @enum {string}
             */
            treatment: "taxable" | "exempt" | "reverse_charge" | "not_subject";
            /** @description Tax label resolved from the regime catalog or supplied for a custom tax, captured at issuance. */
            description: string;
            /** @description Percentage rate; zero for exempt or reverse-charge taxes, and null for not-subject operations. */
            rate: string | null;
            /** @description Amount on which this tax is calculated. */
            taxable_base: components["schemas"]["Money"];
        };
        InvoiceTaxTotal: components["schemas"]["InvoiceTax"] & {
            /** @description Tax amount aggregated across invoice lines. */
            amount: components["schemas"]["Money"];
        };
        InvoiceTotals: {
            /** @description Sum of line subtotals before taxes. */
            subtotal: components["schemas"]["Money"];
            /** @description Total tax added to the invoice. */
            tax: components["schemas"]["Money"];
            /** @description Subtotal plus taxes added to the invoice. */
            total_with_tax: components["schemas"]["Money"];
            /** @description Total tax withheld from the supplier. */
            withheld_tax: components["schemas"]["Money"];
            /** @description Final amount payable after added and withheld taxes. */
            payable: components["schemas"]["Money"];
        };
        InvoiceList: {
            /**
             * @description String identifying this as a list object.
             * @constant
             */
            object: "list";
            /** @description Whether another page exists in the requested direction. */
            has_more: boolean;
            /** @description Invoices in this page. */
            data: components["schemas"]["Invoice"][];
        };
        InvoicePdf: {
            /** @description Opaque identifier for the generated PDF. */
            id: string;
            /**
             * @description String identifying this as an Invoice PDF object.
             * @constant
             */
            object: "invoice_pdf";
            live: components["schemas"]["Live"];
            /** @description Invoice rendered into this PDF. */
            invoice: string;
            /**
             * InvoicePdfStatus
             * @description Current rendering state.
             * @enum {string}
             */
            status: "rendering" | "ready" | "failed";
            /**
             * InvoiceLocale
             * @description Language pinned when this PDF was first rendered.
             * @enum {string}
             */
            locale: "en" | "es";
            /**
             * Format: date-time
             * @description When rendering completed, or null until the PDF is ready.
             */
            rendered_at: string | null;
            /** @description Temporary unauthenticated download URL, or null until the PDF is ready. */
            url: string | null;
            /**
             * Format: date-time
             * @description When the download URL expires, or null when no URL is available.
             */
            url_expires_at: string | null;
        };
        AuthenticationErrorResponse: {
            /** AuthenticationError */
            error: {
                /** @constant */
                code: "authentication_required";
                message: string;
            };
        };
        InvalidRequestErrorResponse: {
            /** InvalidRequestError */
            error: {
                /**
                 * InvalidRequestErrorCode
                 * @enum {string}
                 */
                code: "invalid_request" | "invalid_idempotency_key";
                message: string;
            };
        };
        IdempotencyConflictErrorResponse: {
            /** IdempotencyConflictError */
            error: {
                /**
                 * IdempotencyConflictErrorCode
                 * @enum {string}
                 */
                code: "idempotency_key_in_use" | "idempotency_key_mismatch";
                message: string;
            };
        };
        ResourceNotFoundErrorResponse: {
            /** ResourceNotFoundError */
            error: {
                /** @constant */
                code: "resource_not_found";
                message: string;
            };
        };
        InvalidResourceErrorResponse: {
            /** InvalidResourceError */
            error: {
                /**
                 * InvalidResourceErrorCode
                 * @enum {string}
                 */
                code: "invalid_account" | "invalid_api_key" | "invalid_invoice_series" | "invalid_payment_instruction";
                message: string;
                details: {
                    field: string;
                    message: string;
                }[];
            };
        };
        InvalidCustomerErrorResponse: {
            /** InvalidCustomerError */
            error: {
                /** @constant */
                code: "invalid_customer";
                message: string;
                details: components["schemas"]["ValidationDetail"][];
            };
        };
        InvalidInvoiceErrorResponse: {
            /** InvalidInvoiceError */
            error: {
                /** @constant */
                code: "invalid_invoice";
                message: string;
                details: components["schemas"]["ValidationDetail"][];
            };
        };
        CustomerNotFoundErrorResponse: {
            /** CustomerNotFoundError */
            error: {
                /** @constant */
                code: "customer_not_found";
                message: string;
            };
        };
        AccountNotConfiguredErrorResponse: {
            /** AccountNotConfiguredError */
            error: {
                /** @constant */
                code: "account_not_configured";
                message: string;
            };
        };
        BalanceExhaustedErrorResponse: {
            /** BalanceExhaustedError */
            error: {
                /** @constant */
                code: "balance_exhausted";
                message: string;
            };
        };
        PdfRenderInProgressErrorResponse: {
            /** PdfRenderInProgressError */
            error: {
                /** @constant */
                code: "pdf_render_in_progress";
                message: string;
            };
        };
        PdfRenderingUnavailableErrorResponse: {
            /** PdfRenderingUnavailableError */
            error: {
                /** @constant */
                code: "pdf_rendering_unavailable";
                message: string;
            };
        };
        ValidationDetail: {
            code: string;
            field: string;
            message: string;
            metadata: Record<string, never>;
        };
    };
    responses: {
        /** @description The idempotency key is already in use or was reused incorrectly. */
        IdempotencyConflict: {
            headers: {
                "Request-Id": components["headers"]["RequestId"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["IdempotencyConflictErrorResponse"];
            };
        };
        /** @description A Customer object. */
        UpdatedCustomer: {
            headers: {
                "Request-Id": components["headers"]["RequestId"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Customer"];
            };
        };
        /** @description The API key is missing, malformed, or unknown. */
        AuthenticationRequired: {
            headers: {
                /** @description Authentication scheme required by the API. */
                "WWW-Authenticate"?: "Bearer";
                "Request-Id": components["headers"]["RequestId"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["AuthenticationErrorResponse"];
            };
        };
        /** @description The request could not be parsed or contains an invalid parameter. */
        InvalidRequest: {
            headers: {
                "Request-Id": components["headers"]["RequestId"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["InvalidRequestErrorResponse"];
            };
        };
        /** @description The account settings are invalid. */
        InvalidAccount: {
            headers: {
                "Request-Id": components["headers"]["RequestId"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["InvalidResourceErrorResponse"];
            };
        };
        /** @description The resource does not exist or belongs to a different account. */
        ResourceNotFound: {
            headers: {
                "Request-Id": components["headers"]["RequestId"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ResourceNotFoundErrorResponse"];
            };
        };
        /** @description The customer is invalid or the requested operation is not allowed. */
        InvalidCustomer: {
            headers: {
                "Request-Id": components["headers"]["RequestId"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["InvalidCustomerErrorResponse"];
            };
        };
        /** @description The API key is invalid. */
        InvalidApiKey: {
            headers: {
                "Request-Id": components["headers"]["RequestId"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["InvalidResourceErrorResponse"];
            };
        };
        /** @description The event destination is invalid or the account has reached its limit. */
        InvalidEventDestination: {
            headers: {
                "Request-Id": components["headers"]["RequestId"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["InvalidResourceErrorResponse"];
            };
        };
        /** @description The invoice series is invalid or cannot be deleted. */
        InvalidInvoiceSeries: {
            headers: {
                "Request-Id": components["headers"]["RequestId"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["InvalidResourceErrorResponse"];
            };
        };
        /** @description The payment instruction is invalid or is still configured as an account default. */
        InvalidPaymentInstruction: {
            headers: {
                "Request-Id": components["headers"]["RequestId"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["InvalidResourceErrorResponse"];
            };
        };
        /** @description The amendment or its replacement invoice is invalid. */
        InvalidInvoiceAmendment: {
            headers: {
                "Request-Id": components["headers"]["RequestId"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["InvalidResourceErrorResponse"] | components["schemas"]["InvalidInvoiceErrorResponse"];
            };
        };
        /** @description The requested customer does not exist in this account. */
        CustomerNotFound: {
            headers: {
                "Request-Id": components["headers"]["RequestId"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["CustomerNotFoundErrorResponse"];
            };
        };
        /** @description The live account does not have enough balance for the operation. */
        BalanceExhausted: {
            headers: {
                "Request-Id": components["headers"]["RequestId"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["BalanceExhaustedErrorResponse"];
            };
        };
        /** @description This invoice PDF is already being rendered. */
        PdfRenderInProgress: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["PdfRenderInProgressErrorResponse"];
            };
        };
        /** @description PDF rendering is temporarily unavailable. */
        PdfRenderingUnavailable: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["PdfRenderingUnavailableErrorResponse"];
            };
        };
    };
    parameters: {
        /**
         * @description A client-generated key that makes an invoice issuance safe to retry.
         *     Keys are scoped to the authenticated account, may contain at most 255
         *     bytes, and must not be reused for another operation or different parameters.
         * @example 2f294ef2-9a60-4c7e-a573-5e18fa8348e2
         */
        IdempotencyKey: string;
        /**
         * @description The opaque ID of the Tax ID to retrieve.
         * @example tax_id_14Vxtqg6oXpAY5WdWoq4wW
         */
        TaxIdId: string;
        /** @description The opaque ID of the customer. */
        CustomerId: components["schemas"]["CustomerId"];
        /**
         * @description The opaque ID of the invoice to retrieve.
         * @example inv_14Vxtqg6oXpAY5WdWoq4wW
         */
        InvoiceId: string;
        /**
         * @description The opaque ID of the invoice whose PDF should be retrieved or rendered.
         * @example inv_14Vxtqg6oXpAY5WdWoq4wW
         */
        InvoicePdfInvoiceId: string;
        /**
         * @description The opaque ID of the invoice to amend or void.
         * @example inv_14Vxtqg6oXpAY5WdWoq4wW
         */
        InvoiceAmendmentInvoiceId: string;
        /**
         * @description Substring to search for in customer ID, name, tax ID, or email.
         *     `%` and `_` are treated literally.
         * @example Acme
         */
        CustomerSearch: string;
        /**
         * @description Exact country filter. The supplied value is uppercased.
         * @example ES
         */
        CustomerCountry: string;
        /**
         * @description Maximum number of resources to return.
         * @example 25
         */
        ListLimit: number;
        /** @description Return API keys older than this API key ID. Cannot be combined with `ending_before`. */
        StartingAfterApiKey: components["schemas"]["ApiKeyId"];
        /** @description Return API keys newer than this API key ID. Cannot be combined with `starting_after`. */
        EndingBeforeApiKey: components["schemas"]["ApiKeyId"];
        /** @description Return invoice series older than this series ID. Cannot be combined with `ending_before`. */
        StartingAfterInvoiceSeries: components["schemas"]["InvoiceSeriesId"];
        /** @description Return invoice series newer than this series ID. Cannot be combined with `starting_after`. */
        EndingBeforeInvoiceSeries: components["schemas"]["InvoiceSeriesId"];
        /** @description Return payment instructions older than this instruction ID. Cannot be combined with `ending_before`. */
        StartingAfterPaymentInstruction: components["schemas"]["PaymentInstructionId"];
        /** @description Return payment instructions newer than this instruction ID. Cannot be combined with `starting_after`. */
        EndingBeforePaymentInstruction: components["schemas"]["PaymentInstructionId"];
        /**
         * @description Return customers older than this customer ID. Cannot be combined with
         *     `ending_before`.
         */
        StartingAfterCustomer: components["schemas"]["CustomerId"];
        /**
         * @description Return customers newer than this customer ID. Cannot be combined with
         *     `starting_after`.
         */
        EndingBeforeCustomer: components["schemas"]["CustomerId"];
        /** @description Substring to search for in invoice ID or invoice number. */
        InvoiceSearch: string;
        /** @description Return only invoices for this customer. */
        InvoiceCustomer: components["schemas"]["CustomerId"];
        /** @description Return invoices issued on or after this date. */
        InvoiceIssueDateFrom: string;
        /** @description Return invoices issued on or before this date. */
        InvoiceIssueDateTo: string;
        /** @description Return invoices older than this invoice ID. */
        StartingAfterInvoice: string;
        /** @description Return invoices newer than this invoice ID. */
        EndingBeforeInvoice: string;
    };
    requestBodies: never;
    headers: {
        /** @description Unique identifier generated by FiscalRail for this request. */
        RequestId: components["schemas"]["RequestId"];
        /**
         * @description Present when returning a previously completed result. Its value is the
         *     Request-Id of the original request whose result is being replayed.
         */
        IdempotentReplayed: components["schemas"]["RequestId"];
    };
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    retrieveAccount: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description An Account object. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Account"];
                };
            };
            401: components["responses"]["AuthenticationRequired"];
        };
    };
    updateAccount: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AccountUpdate"];
            };
        };
        responses: {
            /** @description The updated Account object. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Account"];
                };
            };
            401: components["responses"]["AuthenticationRequired"];
            422: components["responses"]["InvalidAccount"];
        };
    };
    retrieveAccountInvoicing: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Account invoicing settings. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AccountInvoicing"];
                };
            };
            401: components["responses"]["AuthenticationRequired"];
        };
    };
    updateAccountInvoicing: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AccountInvoicingUpdate"];
            };
        };
        responses: {
            /** @description Updated account invoicing settings. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AccountInvoicing"];
                };
            };
            401: components["responses"]["AuthenticationRequired"];
            404: components["responses"]["ResourceNotFound"];
            422: components["responses"]["InvalidAccount"];
        };
    };
    retrieveBalance: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A Balance object. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Balance"];
                };
            };
            401: components["responses"]["AuthenticationRequired"];
            404: components["responses"]["ResourceNotFound"];
        };
    };
    retrieveAccountTaxRegime: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description An Account Tax Regime object. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AccountTaxRegime"];
                };
            };
            401: components["responses"]["AuthenticationRequired"];
        };
    };
    listApiKeys: {
        parameters: {
            query?: {
                /**
                 * @description Maximum number of resources to return.
                 * @example 25
                 */
                limit?: components["parameters"]["ListLimit"];
                /** @description Return API keys older than this API key ID. Cannot be combined with `ending_before`. */
                starting_after?: components["parameters"]["StartingAfterApiKey"];
                /** @description Return API keys newer than this API key ID. Cannot be combined with `starting_after`. */
                ending_before?: components["parameters"]["EndingBeforeApiKey"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A list of API Key objects. */
            200: {
                headers: {
                    "Request-Id": components["headers"]["RequestId"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiKeyList"];
                };
            };
            400: components["responses"]["InvalidRequest"];
            401: components["responses"]["AuthenticationRequired"];
        };
    };
    createApiKey: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ApiKeyCreate"];
            };
        };
        responses: {
            /** @description An API Key object containing its newly issued secret. */
            201: {
                headers: {
                    "Request-Id": components["headers"]["RequestId"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiKey"];
                };
            };
            401: components["responses"]["AuthenticationRequired"];
            422: components["responses"]["InvalidApiKey"];
        };
    };
    retrieveApiKey: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The opaque ID of the API key. */
                id: components["schemas"]["ApiKeyId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description An API Key object. */
            200: {
                headers: {
                    "Request-Id": components["headers"]["RequestId"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiKey"];
                };
            };
            401: components["responses"]["AuthenticationRequired"];
            404: components["responses"]["ResourceNotFound"];
        };
    };
    deleteApiKey: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The opaque ID of the API key. */
                id: components["schemas"]["ApiKeyId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The API key was revoked. The response has no body. */
            204: {
                headers: {
                    "Request-Id": components["headers"]["RequestId"];
                    [name: string]: unknown;
                };
                content?: never;
            };
            401: components["responses"]["AuthenticationRequired"];
            404: components["responses"]["ResourceNotFound"];
        };
    };
    listEvents: {
        parameters: {
            query?: {
                /**
                 * @description Maximum number of resources to return.
                 * @example 25
                 */
                limit?: components["parameters"]["ListLimit"];
                /** @description Return events older than this event ID. */
                starting_after?: string;
                /** @description Return events newer than this event ID. */
                ending_before?: string;
                /** @description Up to 20 exact event types to include. */
                types?: string[];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A list of Event objects. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EventList"];
                };
            };
            400: components["responses"]["InvalidRequest"];
            401: components["responses"]["AuthenticationRequired"];
        };
    };
    retrieveEvent: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The opaque event ID. */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description An Event object including its immutable snapshot. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Event"];
                };
            };
            401: components["responses"]["AuthenticationRequired"];
            404: components["responses"]["ResourceNotFound"];
        };
    };
    listEventDestinations: {
        parameters: {
            query?: {
                /**
                 * @description Maximum number of resources to return.
                 * @example 25
                 */
                limit?: components["parameters"]["ListLimit"];
                /** @description Return destinations older than this destination ID. */
                starting_after?: string;
                /** @description Return destinations newer than this destination ID. */
                ending_before?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A list of Event Destination objects. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EventDestinationList"];
                };
            };
            400: components["responses"]["InvalidRequest"];
            401: components["responses"]["AuthenticationRequired"];
        };
    };
    createEventDestination: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["EventDestinationCreate"];
            };
        };
        responses: {
            /** @description The created Event Destination, including its signing secret. */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EventDestination"];
                };
            };
            401: components["responses"]["AuthenticationRequired"];
            422: components["responses"]["InvalidEventDestination"];
        };
    };
    retrieveEventDestination: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The opaque event destination ID. */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description An Event Destination object. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EventDestination"];
                };
            };
            401: components["responses"]["AuthenticationRequired"];
            404: components["responses"]["ResourceNotFound"];
        };
    };
    deleteEventDestination: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The opaque event destination ID. */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The destination was deleted. */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            401: components["responses"]["AuthenticationRequired"];
            404: components["responses"]["ResourceNotFound"];
        };
    };
    updateEventDestination: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The opaque event destination ID. */
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["EventDestinationUpdate"];
            };
        };
        responses: {
            /** @description The updated Event Destination. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EventDestination"];
                };
            };
            401: components["responses"]["AuthenticationRequired"];
            404: components["responses"]["ResourceNotFound"];
            422: components["responses"]["InvalidEventDestination"];
        };
    };
    enableEventDestination: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The opaque event destination ID. */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The enabled Event Destination. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EventDestination"];
                };
            };
            401: components["responses"]["AuthenticationRequired"];
            404: components["responses"]["ResourceNotFound"];
        };
    };
    disableEventDestination: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The opaque event destination ID. */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The disabled Event Destination. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EventDestination"];
                };
            };
            401: components["responses"]["AuthenticationRequired"];
            404: components["responses"]["ResourceNotFound"];
        };
    };
    listInvoiceSeries: {
        parameters: {
            query?: {
                /**
                 * @description Maximum number of resources to return.
                 * @example 25
                 */
                limit?: components["parameters"]["ListLimit"];
                /** @description Return invoice series older than this series ID. Cannot be combined with `ending_before`. */
                starting_after?: components["parameters"]["StartingAfterInvoiceSeries"];
                /** @description Return invoice series newer than this series ID. Cannot be combined with `starting_after`. */
                ending_before?: components["parameters"]["EndingBeforeInvoiceSeries"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A list of Invoice Series objects. */
            200: {
                headers: {
                    "Request-Id": components["headers"]["RequestId"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InvoiceSeriesList"];
                };
            };
            400: components["responses"]["InvalidRequest"];
            401: components["responses"]["AuthenticationRequired"];
        };
    };
    createInvoiceSeries: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["InvoiceSeriesCreate"];
            };
        };
        responses: {
            /** @description An Invoice Series object. */
            201: {
                headers: {
                    "Request-Id": components["headers"]["RequestId"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InvoiceSeries"];
                };
            };
            401: components["responses"]["AuthenticationRequired"];
            422: components["responses"]["InvalidInvoiceSeries"];
        };
    };
    retrieveInvoiceSeries: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The opaque ID of the invoice series. */
                id: components["schemas"]["InvoiceSeriesId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description An Invoice Series object. */
            200: {
                headers: {
                    "Request-Id": components["headers"]["RequestId"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InvoiceSeries"];
                };
            };
            401: components["responses"]["AuthenticationRequired"];
            404: components["responses"]["ResourceNotFound"];
        };
    };
    deleteInvoiceSeries: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The opaque ID of the invoice series. */
                id: components["schemas"]["InvoiceSeriesId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The invoice series was deleted. The response has no body. */
            204: {
                headers: {
                    "Request-Id": components["headers"]["RequestId"];
                    [name: string]: unknown;
                };
                content?: never;
            };
            401: components["responses"]["AuthenticationRequired"];
            404: components["responses"]["ResourceNotFound"];
            422: components["responses"]["InvalidInvoiceSeries"];
        };
    };
    updateInvoiceSeries: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The opaque ID of the invoice series. */
                id: components["schemas"]["InvoiceSeriesId"];
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["InvoiceSeriesUpdate"];
            };
        };
        responses: {
            /** @description The updated Invoice Series object. */
            200: {
                headers: {
                    "Request-Id": components["headers"]["RequestId"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InvoiceSeries"];
                };
            };
            400: components["responses"]["InvalidRequest"];
            401: components["responses"]["AuthenticationRequired"];
            404: components["responses"]["ResourceNotFound"];
            422: components["responses"]["InvalidInvoiceSeries"];
        };
    };
    listPaymentInstructions: {
        parameters: {
            query?: {
                /**
                 * @description Maximum number of resources to return.
                 * @example 25
                 */
                limit?: components["parameters"]["ListLimit"];
                /** @description Return payment instructions older than this instruction ID. Cannot be combined with `ending_before`. */
                starting_after?: components["parameters"]["StartingAfterPaymentInstruction"];
                /** @description Return payment instructions newer than this instruction ID. Cannot be combined with `starting_after`. */
                ending_before?: components["parameters"]["EndingBeforePaymentInstruction"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A list of Payment Instruction objects. */
            200: {
                headers: {
                    "Request-Id": components["headers"]["RequestId"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PaymentInstructionList"];
                };
            };
            400: components["responses"]["InvalidRequest"];
            401: components["responses"]["AuthenticationRequired"];
        };
    };
    createPaymentInstruction: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PaymentInstructionCreate"];
            };
        };
        responses: {
            /** @description A Payment Instruction object. */
            201: {
                headers: {
                    "Request-Id": components["headers"]["RequestId"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PaymentInstruction"];
                };
            };
            400: components["responses"]["InvalidRequest"];
            401: components["responses"]["AuthenticationRequired"];
            422: components["responses"]["InvalidPaymentInstruction"];
        };
    };
    retrievePaymentInstruction: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The opaque ID of the payment instruction. */
                id: components["schemas"]["PaymentInstructionId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A Payment Instruction object. */
            200: {
                headers: {
                    "Request-Id": components["headers"]["RequestId"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PaymentInstruction"];
                };
            };
            401: components["responses"]["AuthenticationRequired"];
            404: components["responses"]["ResourceNotFound"];
        };
    };
    deletePaymentInstruction: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The opaque ID of the payment instruction. */
                id: components["schemas"]["PaymentInstructionId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The payment instruction was deleted. The response has no body. */
            204: {
                headers: {
                    "Request-Id": components["headers"]["RequestId"];
                    [name: string]: unknown;
                };
                content?: never;
            };
            401: components["responses"]["AuthenticationRequired"];
            404: components["responses"]["ResourceNotFound"];
            422: components["responses"]["InvalidPaymentInstruction"];
        };
    };
    updatePaymentInstruction: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The opaque ID of the payment instruction. */
                id: components["schemas"]["PaymentInstructionId"];
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PaymentInstructionUpdate"];
            };
        };
        responses: {
            /** @description The updated Payment Instruction object. */
            200: {
                headers: {
                    "Request-Id": components["headers"]["RequestId"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PaymentInstruction"];
                };
            };
            400: components["responses"]["InvalidRequest"];
            401: components["responses"]["AuthenticationRequired"];
            404: components["responses"]["ResourceNotFound"];
            422: components["responses"]["InvalidPaymentInstruction"];
        };
    };
    listTaxRegimes: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A list of Tax Regime objects. */
            200: {
                headers: {
                    "Request-Id": components["headers"]["RequestId"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TaxRegimeList"];
                };
            };
        };
    };
    retrieveTaxRegime: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Tax regime key, such as `es`. */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A Tax Regime object. */
            200: {
                headers: {
                    "Request-Id": components["headers"]["RequestId"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TaxRegime"];
                };
            };
            404: components["responses"]["ResourceNotFound"];
        };
    };
    retrieveTaxId: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description The opaque ID of the Tax ID to retrieve.
                 * @example tax_id_14Vxtqg6oXpAY5WdWoq4wW
                 */
                id: components["parameters"]["TaxIdId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A Tax ID object. */
            200: {
                headers: {
                    "Request-Id": components["headers"]["RequestId"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TaxId"];
                };
            };
            401: components["responses"]["AuthenticationRequired"];
            404: components["responses"]["ResourceNotFound"];
        };
    };
    listCustomers: {
        parameters: {
            query?: {
                /**
                 * @description Substring to search for in customer ID, name, tax ID, or email.
                 *     `%` and `_` are treated literally.
                 * @example Acme
                 */
                q?: components["parameters"]["CustomerSearch"];
                /**
                 * @description Exact country filter. The supplied value is uppercased.
                 * @example ES
                 */
                country?: components["parameters"]["CustomerCountry"];
                /**
                 * @description Maximum number of resources to return.
                 * @example 25
                 */
                limit?: components["parameters"]["ListLimit"];
                /**
                 * @description Return customers older than this customer ID. Cannot be combined with
                 *     `ending_before`.
                 */
                starting_after?: components["parameters"]["StartingAfterCustomer"];
                /**
                 * @description Return customers newer than this customer ID. Cannot be combined with
                 *     `starting_after`.
                 */
                ending_before?: components["parameters"]["EndingBeforeCustomer"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A list of Customer objects. */
            200: {
                headers: {
                    "Request-Id": components["headers"]["RequestId"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CustomerList"];
                };
            };
            400: components["responses"]["InvalidRequest"];
            401: components["responses"]["AuthenticationRequired"];
        };
    };
    createCustomer: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CustomerCreate"];
            };
        };
        responses: {
            /** @description A Customer object. */
            201: {
                headers: {
                    "Request-Id": components["headers"]["RequestId"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Customer"];
                };
            };
            401: components["responses"]["AuthenticationRequired"];
            422: components["responses"]["InvalidCustomer"];
        };
    };
    retrieveCustomer: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The opaque ID of the customer. */
                id: components["parameters"]["CustomerId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A Customer object. */
            200: {
                headers: {
                    "Request-Id": components["headers"]["RequestId"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Customer"];
                };
            };
            401: components["responses"]["AuthenticationRequired"];
            404: components["responses"]["ResourceNotFound"];
        };
    };
    deleteCustomer: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The opaque ID of the customer. */
                id: components["parameters"]["CustomerId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The customer was deleted. The response has no body. */
            204: {
                headers: {
                    "Request-Id": components["headers"]["RequestId"];
                    [name: string]: unknown;
                };
                content?: never;
            };
            401: components["responses"]["AuthenticationRequired"];
            404: components["responses"]["ResourceNotFound"];
            422: components["responses"]["InvalidCustomer"];
        };
    };
    updateCustomer: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The opaque ID of the customer. */
                id: components["parameters"]["CustomerId"];
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CustomerUpdate"];
            };
        };
        responses: {
            200: components["responses"]["UpdatedCustomer"];
            401: components["responses"]["AuthenticationRequired"];
            404: components["responses"]["ResourceNotFound"];
            422: components["responses"]["InvalidCustomer"];
        };
    };
    listInvoices: {
        parameters: {
            query?: {
                /** @description Substring to search for in invoice ID or invoice number. */
                q?: components["parameters"]["InvoiceSearch"];
                /** @description Return only invoices for this customer. */
                customer?: components["parameters"]["InvoiceCustomer"];
                /** @description Return invoices issued on or after this date. */
                issue_date_from?: components["parameters"]["InvoiceIssueDateFrom"];
                /** @description Return invoices issued on or before this date. */
                issue_date_to?: components["parameters"]["InvoiceIssueDateTo"];
                /**
                 * @description Maximum number of resources to return.
                 * @example 25
                 */
                limit?: components["parameters"]["ListLimit"];
                /** @description Return invoices older than this invoice ID. */
                starting_after?: components["parameters"]["StartingAfterInvoice"];
                /** @description Return invoices newer than this invoice ID. */
                ending_before?: components["parameters"]["EndingBeforeInvoice"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A list of Invoice objects. */
            200: {
                headers: {
                    "Request-Id": components["headers"]["RequestId"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InvoiceList"];
                };
            };
            400: components["responses"]["InvalidRequest"];
            401: components["responses"]["AuthenticationRequired"];
        };
    };
    issueInvoice: {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description A client-generated key that makes an invoice issuance safe to retry.
                 *     Keys are scoped to the authenticated account, may contain at most 255
                 *     bytes, and must not be reused for another operation or different parameters.
                 * @example 2f294ef2-9a60-4c7e-a573-5e18fa8348e2
                 */
                "Idempotency-Key"?: components["parameters"]["IdempotencyKey"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["InvoiceCreate"];
            };
        };
        responses: {
            /** @description An Invoice object. */
            201: {
                headers: {
                    "Request-Id": components["headers"]["RequestId"];
                    "Idempotent-Replayed": components["headers"]["IdempotentReplayed"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Invoice"];
                };
            };
            400: components["responses"]["InvalidRequest"];
            401: components["responses"]["AuthenticationRequired"];
            402: components["responses"]["BalanceExhausted"];
            404: components["responses"]["CustomerNotFound"];
            409: components["responses"]["IdempotencyConflict"];
            /** @description The invoice is invalid or the account is not configured for issuance. */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InvalidInvoiceErrorResponse"] | components["schemas"]["AccountNotConfiguredErrorResponse"];
                };
            };
        };
    };
    retrieveInvoice: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description The opaque ID of the invoice to retrieve.
                 * @example inv_14Vxtqg6oXpAY5WdWoq4wW
                 */
                id: components["parameters"]["InvoiceId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description An Invoice object. */
            200: {
                headers: {
                    "Request-Id": components["headers"]["RequestId"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Invoice"];
                };
            };
            401: components["responses"]["AuthenticationRequired"];
            404: components["responses"]["ResourceNotFound"];
        };
    };
    amendInvoice: {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description A client-generated key that makes an invoice issuance safe to retry.
                 *     Keys are scoped to the authenticated account, may contain at most 255
                 *     bytes, and must not be reused for another operation or different parameters.
                 * @example 2f294ef2-9a60-4c7e-a573-5e18fa8348e2
                 */
                "Idempotency-Key"?: components["parameters"]["IdempotencyKey"];
            };
            path: {
                /**
                 * @description The opaque ID of the invoice to amend or void.
                 * @example inv_14Vxtqg6oXpAY5WdWoq4wW
                 */
                invoice_id: components["parameters"]["InvoiceAmendmentInvoiceId"];
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["InvoiceAmendmentCreate"];
            };
        };
        responses: {
            /** @description An Invoice Amendment object. */
            201: {
                headers: {
                    "Request-Id": components["headers"]["RequestId"];
                    "Idempotent-Replayed": components["headers"]["IdempotentReplayed"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InvoiceAmendment"];
                };
            };
            400: components["responses"]["InvalidRequest"];
            401: components["responses"]["AuthenticationRequired"];
            402: components["responses"]["BalanceExhausted"];
            404: components["responses"]["ResourceNotFound"];
            409: components["responses"]["IdempotencyConflict"];
            422: components["responses"]["InvalidInvoiceAmendment"];
        };
    };
    retrieveInvoicePdf: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description The opaque ID of the invoice whose PDF should be retrieved or rendered.
                 * @example inv_14Vxtqg6oXpAY5WdWoq4wW
                 */
                invoice_id: components["parameters"]["InvoicePdfInvoiceId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description An Invoice PDF object or the PDF bytes. */
            200: {
                headers: {
                    "Request-Id": components["headers"]["RequestId"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InvoicePdf"];
                    "application/pdf": string;
                };
            };
            401: components["responses"]["AuthenticationRequired"];
            404: components["responses"]["ResourceNotFound"];
        };
    };
    renderInvoicePdf: {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description Preferred language for the first render. Supports Spanish and English; the account's invoice locale is the fallback.
                 * @example es
                 */
                "Accept-Language"?: string;
            };
            path: {
                /**
                 * @description The opaque ID of the invoice whose PDF should be retrieved or rendered.
                 * @example inv_14Vxtqg6oXpAY5WdWoq4wW
                 */
                invoice_id: components["parameters"]["InvoicePdfInvoiceId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A cached Invoice PDF object or the PDF bytes. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InvoicePdf"];
                    "application/pdf": string;
                };
            };
            /** @description A newly rendered Invoice PDF object or the PDF bytes. */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InvoicePdf"];
                    "application/pdf": string;
                };
            };
            401: components["responses"]["AuthenticationRequired"];
            402: components["responses"]["BalanceExhausted"];
            404: components["responses"]["ResourceNotFound"];
            409: components["responses"]["PdfRenderInProgress"];
            503: components["responses"]["PdfRenderingUnavailable"];
        };
    };
}
