# Changelog

## 0.5.0 — 2026-09-28

- Match the deployed current-account API routes and split invoicing settings into a dedicated resource.
- Use `/tax-ids/{id}` for tax ID retrieval.
- Regenerate response and request types from the updated FiscalRail OpenAPI contract.

## 0.4.0 - 2026-09-14

- Initial JavaScript and TypeScript SDK release.
- Cover all 42 operations in FiscalRail API 1.0.0.
- Add typed resources, automatic pagination, safe retries, PDF downloads,
  structured errors, webhook verification, and Spanish tax helpers.
