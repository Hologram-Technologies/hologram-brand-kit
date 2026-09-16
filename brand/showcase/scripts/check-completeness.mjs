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

// ---- product gate: every registered screen belongs to a complete spec ----
import { existsSync } from "node:fs";
const productDir = join(here, "..", "..", "product");
const registry = readFileSync(join(srcDir, "screens", "index.ts"), "utf8");
const entries = [...registry.matchAll(/feature:\s*"([^"]+)",\s*screen:\s*"([^"]+)"/g)]
  .map((m) => ({ feature: m[1], screen: m[2] }));
const failures = [];
for (const { feature, screen } of entries) {
  const specPath = join(productDir, feature, "spec.md");
  if (!existsSync(specPath)) {
    failures.push(`${feature}: missing brand/product/${feature}/spec.md`);
    continue;
  }
  const spec = readFileSync(specPath, "utf8");
  if (!spec.includes(`/screens/${feature}/${screen}`))
    failures.push(`${feature}/${screen}: registered in code but not referenced by the spec`);
  if (process.env.HOLO_SHOOTING !== "1" &&
      !existsSync(join(productDir, feature, "screens", `${screen}.png`)))
    failures.push(`${feature}/${screen}: screenshot missing (run scripts/shoot-screens.mjs)`);
}
if (failures.length) {
  console.error("PRODUCT GATE FAILED:\n  " + failures.join("\n  "));
  process.exit(1);
}
console.log(`product: ${entries.length} screens, every one specced${process.env.HOLO_SHOOTING === "1" ? " (image check deferred)" : " and shot"}`);
