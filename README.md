# FiscalRail JavaScript SDK

The official Node.js client for issuing and managing immutable invoices through
FiscalRail. Written in TypeScript and published as ESM JavaScript with complete
type declarations. Requires Node.js 20 or later.

## Install

```sh
npm install @fiscalrail/sdk
```

## Issue an invoice

```ts
import { FiscalRail } from "@fiscalrail/sdk";
import { vat, irpf } from "@fiscalrail/sdk/tax-regimes/es";

const fiscalrail = new FiscalRail({
  apiKey: process.env.FISCALRAIL_API_KEY!,
});

const invoice = await fiscalrail.invoices.issue({
  customer: "cus_...",
  lines: [
    {
      description: "Consulting services",
      quantity: "8",
      unit_price: "75.00",
      taxes: [vat.general, irpf.professionals],
    },
  ],
});

const pdf = await fiscalrail.invoicePdfs.renderContent(invoice.id, { locale: "en" });
await import("node:fs/promises").then(({ writeFile }) => writeFile(`${invoice.code}.pdf`, pdf.content));
```

JavaScript uses the same package and API; TypeScript is not required. The API
key is explicit and is never read automatically from process configuration. Its
Test or Live prefix selects the environment.

Do not use the SDK in browser-delivered code. Doing so would expose the client's
secret API key. Call FiscalRail from a trusted server runtime.

## Idempotency and retries

Invoice issuance and amendments generate an idempotency key when none is
supplied. Every retry within that SDK call reuses the same key and serialized
body. Durable jobs should create and persist a key before the first attempt:

```ts
const invoice = await fiscalrail.invoices.issue(params, {
  idempotencyKey: savedJobKey,
});
```

A new call without a supplied key gets a new key. Never reuse a key for a
different operation or payload.

By default, the SDK makes at most two retries for connection failures, timeouts,
HTTP 408/429, and 5xx responses, only for safe reads and operations the API makes
safe to retry. Ordinary create, update, and delete calls are not retried. Numeric
and HTTP-date `Retry-After` values are honored up to 30 seconds. Set
`maxRetries: 0` to disable retries.

## Resources

| Resource | Methods |
| --- | --- |
| `accounts` | `retrieve`, `update` |
| `accountInvoicing` | `retrieve`, `update` |
| `balances` | `retrieve()` |
| `accountTaxRegimes` | `retrieve()` |
| `apiKeys` | `list`, `create`, `retrieve`, `delete`, `iterate` |
| `customers` | `list`, `create`, `retrieve`, `update`, `delete`, `iterate` |
| `eventDestinations` | `list`, `create`, `retrieve`, `update`, `delete`, `enable`, `disable`, `iterate` |
| `events` | `list`, `retrieve`, `iterate` |
| `invoiceSeries` | `list`, `create`, `retrieve`, `update`, `delete`, `iterate` |
| `invoices` | `list`, `issue`, `retrieve`, `amend`, `iterate` |
| `invoicePdfs` | `retrieve`, `render`, `retrieveContent`, `renderContent` |
| `paymentInstructions` | `list`, `create`, `retrieve`, `update`, `delete`, `iterate` |
| `taxIds` | `retrieve` |
| `taxRegimes` | `list`, `retrieve` |

List methods retrieve one page. `iterate` is an async iterator that fetches
later pages lazily while preserving filters:

```ts
for await (const invoice of fiscalrail.invoices.iterate({ customer: "cus_..." })) {
  console.log(invoice.code);
}
```

## Response metadata

Successful JSON objects retain request metadata without adding enumerable API
fields:

```ts
import { getResponseMetadata } from "@fiscalrail/sdk";

const metadata = getResponseMetadata(invoice);
console.log(metadata?.requestId);
console.log(metadata?.idempotencyKey);
console.log(metadata?.idempotentReplayed);
```

PDF content returns `{ content, contentType, requestId }`; `content` is a
`Uint8Array`.

## Webhooks

Verify the exact raw request body before parsing or processing it:

```ts
import { constructEvent } from "@fiscalrail/sdk/webhooks";

const event = constructEvent(rawBody, signatureHeader, signingSecret);
```

The verifier uses constant-time HMAC comparison, accepts multiple `v1`
signatures, and enforces a five-minute timestamp tolerance in both directions.
It throws `WebhookSignatureError` when verification or decoding fails.

## Errors

```ts
import { APIConnectionError, APIError, InvalidInvoiceError } from "@fiscalrail/sdk";

try {
  await fiscalrail.invoices.issue(params, { idempotencyKey: savedJobKey });
} catch (error) {
  if (error instanceof InvalidInvoiceError) {
    for (const detail of error.details) console.error(detail.field, detail.message);
  } else if (error instanceof APIConnectionError) {
    console.error("Outcome may be uncertain", error.idempotencyKey);
  } else if (error instanceof APIError) {
    console.error(error.code, error.status, error.requestId);
  }
}
```

API errors retain the code, HTTP status, request ID, validation details, raw
body, and idempotency key. Known API codes have dedicated subclasses; unknown
codes remain `APIError`.

## Configuration

```ts
const fiscalrail = new FiscalRail({
  apiKey: secret,
  baseUrl: "https://api.fiscalrail.com/v1",
  timeoutMs: 30_000,
  maxRetries: 2,
  fetch: instrumentedFetch,
});
```

Inject `fetch` for proxy, TLS, testing, or observability behavior. Disable
adapter-level retries so requests are not retried twice.

## Development

```sh
npm ci
npm run test
npm run test:types
npm run check:generated
npm run pack:check
```

Contract generation defaults to the current published OpenAPI document. To use
a local checkout:

```sh
FISCALRAIL_OPENAPI=../../whack/config/fiscal_rail/api.oas.yml npm run generate
FISCALRAIL_OPENAPI=../../whack/config/fiscal_rail/api.oas.yml npm run check:generated
```

The generator owns `src/generated`. Resource methods, transport behavior,
errors, pagination, PDFs, webhook verification, and tax conveniences remain
handwritten. See [RELEASING.md](RELEASING.md) for the publication checklist.


## Spanish AEAT submission

Use a Live Spanish account key. Upload a `.p12`/`.pfx` file (up to 128 KiB),
including its private key, using native multipart upload. Omit the password for
an unprotected bundle. The certificate's issuer NIF must match the account.

```typescript
import { readFile } from "node:fs/promises";

const setup = await client.accountTaxRegimes.es.uploadCertificate({
  certificate_file: new Blob([await readFile("issuer.p12")]),
  certificate_password: process.env.CERTIFICATE_PASSWORD ?? "",
});
const current = await client.accountTaxRegimes.retrieve();
// For key === "es", inspect current.es.pending_submission and current.es.submission.ready.
await client.accountTaxRegimes.es.verifySubmission(); // retry the pending or active check
await client.accountTaxRegimes.es.cancelSubmissionChange();
await client.accountTaxRegimes.es.verifyRepresentation(); // after granting AEAT authority
```

Each mutation above is a separate operation; choose the one needed. Upload and
verification return the account setup while AEAT checks run asynchronously.
Poll the generic account tax-regime resource for pending verification status,
error code and the active setup's readiness. A working setup remains active until
a replacement verifies; failed checks retain the pending certificate for retry.
Cancelling removes only the pending change. Uploads are not automatically retried.
The ES mutations use `/account/tax-regime/es/...`; reads use `/account/tax-regime`.
