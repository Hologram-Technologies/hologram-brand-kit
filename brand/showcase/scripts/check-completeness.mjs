#!/usr/bin/env node
// Completeness gate: every component in the vendored ui directory must be
// imported somewhere in the showcase source. Fails the build on any miss.
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const uiDir = join(here, "..", "..", "vendor", "shadcn-ui", "registry", "new-york-v4", "ui");
const srcDir = join(here, "..", "src");

const components = readdirSync(uiDir)
  .filter((f) => f.endsWith(".tsx") && !f.startsWith("_"))
  .map((f) => f.replace(".tsx", ""));

const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]);
const source = walk(srcDir).map((f) => readFileSync(f, "utf8")).join("\n");

const missing = components.filter((c) => !source.includes(`ui/${c}"`));
if (missing.length) {
  console.error(`COMPLETENESS GATE FAILED: ${missing.length} of ${components.length} components not imported:\n  ${missing.join("\n  ")}`);
  process.exit(1);
}
console.log(`completeness: ${components.length}/${components.length} vendored components imported`);
