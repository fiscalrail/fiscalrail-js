# Releasing

Releases publish `@fiscalrail/sdk` to npm through trusted publishing when a
`v*` tag is pushed.

## One-time setup

1. Create the public GitHub repository `fiscalrail/fiscalrail-js`.
2. Create or confirm the `fiscalrail` npm organization.
3. On npm, configure a trusted publisher for package `@fiscalrail/sdk`:
   - Organization or user: `fiscalrail`
   - Repository: `fiscalrail-js`
   - Workflow: `release.yml`
   - Environment: `release`
4. Create the matching `release` environment in GitHub.

No long-lived npm token should be stored in GitHub.

## Release a version

1. Update `package.json` and `CHANGELOG.md`.
2. Run `npm run generate` against the published OpenAPI contract and review the
   generated changes. Update resources and tests for changed operations.
3. Run `npm ci && npm run check`.
4. Commit and push to `main`, then wait for CI.
5. Tag that commit and push the tag, for example:

   ```sh
   git tag -a v0.4.0 -m "Release 0.4.0"
   git push origin v0.4.0
   ```

6. Watch the Release workflow, install the exact published version in a clean
   project, and create a GitHub release from the changelog.

Published versions are immutable. If publication succeeds but verification
later finds a defect, release a new version instead of trying to replace it.
