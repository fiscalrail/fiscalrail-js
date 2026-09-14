import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

import openapiTS, { astToString } from "openapi-typescript";
import { parse } from "yaml";

const DEFAULT_CONTRACT = "https://docs.fiscalrail.com/openapi.yml";
const source = process.env.FISCALRAIL_OPENAPI ?? DEFAULT_CONTRACT;
const check = process.argv.includes("--check");
const root = resolve(import.meta.dirname, "..");
const schemaPath = resolve(root, "src/generated/schema.ts");
const operationsPath = resolve(root, "src/generated/operations.ts");

const documentText = await loadText(source);
const document = parse(documentText);
// Defaults describe server behavior; they do not make omitted request fields required.
const schema = astToString(await openapiTS(document, { defaultNonNullable: false }));
const operations = generateOperations(document);

if (check) {
  const stale = [];
  if ((await readFile(schemaPath, "utf8")) !== schema) stale.push("src/generated/schema.ts");
  if ((await readFile(operationsPath, "utf8")) !== operations) stale.push("src/generated/operations.ts");
  if (stale.length > 0) {
    console.error(`Generated contract files are stale: ${stale.join(", ")}`);
    console.error("Run npm run generate and review the result.");
    process.exitCode = 1;
  } else {
    console.log(`Generated contract matches ${source}`);
  }
} else {
  await writeFile(schemaPath, schema);
  await writeFile(operationsPath, operations);
  console.log(`Generated contract from ${source}`);
}

async function loadText(value) {
  if (/^https?:\/\//.test(value)) {
    const response = await fetch(value, { redirect: "error" });
    if (!response.ok) throw new Error(`Could not load OpenAPI contract: HTTP ${response.status}`);
    return response.text();
  }
  return readFile(resolve(root, value), "utf8");
}

function generateOperations(document) {
  const operations = {};
  for (const [path, pathItem] of Object.entries(document.paths ?? {})) {
    for (const method of ["get", "post", "put", "patch", "delete"]) {
      const operation = pathItem[method];
      if (!operation) continue;
      if (!operation.operationId) throw new Error(`${method.toUpperCase()} ${path} has no operationId`);
      operations[operation.operationId] = {
        method: method.toUpperCase(),
        path,
        successStatuses: Object.keys(operation.responses ?? {})
          .filter((status) => /^2\d\d$/.test(status))
          .map(Number),
      };
    }
  }

  const serialized = JSON.stringify(operations, null, 2)
    .replaceAll('"method":', "method:")
    .replaceAll('"path":', "path:")
    .replaceAll('"successStatuses":', "successStatuses:");

  return `/** Generated from FiscalRail's OpenAPI contract. Do not edit. */\n` +
    `export const CONTRACT_VERSION = ${JSON.stringify(document.info?.version ?? "unknown")};\n\n` +
    `export interface Operation {\n` +
    `  readonly method: string;\n` +
    `  readonly path: string;\n` +
    `  readonly successStatuses: readonly number[];\n` +
    `}\n\n` +
    `export const OPERATIONS = ${serialized} as const satisfies Record<string, Operation>;\n\n` +
    `export type OperationId = keyof typeof OPERATIONS;\n`;
}
