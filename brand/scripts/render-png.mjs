#!/usr/bin/env node
// render-png.mjs — rasterizes the logo SVGs to the PNG sizes the README links.
// Requires @resvg/resvg-js (not a repo dependency):
//   npm i @resvg/resvg-js   (anywhere; point NODE_PATH at its node_modules)
//   node render-png.mjs
// Text is rendered with the actual brand fonts from brand/fonts.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

let Resvg;
try {
  ({ Resvg } = await import("@resvg/resvg-js"));
} catch {
  try {
    const { pathToFileURL } = await import("node:url");
    const base = process.env.RESVG_PATH; // .../node_modules/@resvg/resvg-js
    const mod = await import(pathToFileURL(join(base, "index.js")).href);
    Resvg = mod.Resvg ?? mod.default.Resvg;
  } catch {
    console.error("missing @resvg/resvg-js — install it (npm i @resvg/resvg-js) and/or set RESVG_PATH to its package dir; or skip PNG export");
    process.exit(1);
  }
}

const here = dirname(fileURLToPath(import.meta.url));
const brand = join(here, "..");
const fontFiles = ["Geist-Regular.otf", "Geist-Medium.otf", "Geist-SemiBold.otf",
  "Geist-Bold.otf", "GeistMono-Regular.otf", "GeistMono-Medium.otf"]
  .map((f) => join(brand, "fonts", "otf", f));

function render(svgPath, outPath, width) {
  const svg = readFileSync(svgPath, "utf8");
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: width },
    font: { fontFiles, loadSystemFonts: false, defaultFontFamily: "Geist" },
  });
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, resvg.render().asPng());
}

let n = 0;
for (const variant of ["Black", "White"]) {
  for (const size of [128, 256, 512]) {
    render(
      join(brand, "logos", "svg", "logomark", `Hologram_Logomark_${variant}.svg`),
      join(brand, "logos", "png", "logomark", `Hologram_Logomark_${variant}_${size}px.png`),
      size);
    n++;
  }
  for (const kind of ["wordmark", "lockup"]) {
    const Name = kind[0].toUpperCase() + kind.slice(1);
    render(
      join(brand, "logos", "svg", kind, `Hologram_${Name}_${variant}.svg`),
      join(brand, "logos", "png", kind, `Hologram_${Name}_${variant}_1024px.png`),
      1024);
    n++;
  }
}
console.log(`rendered ${n} PNGs (logomark 128/256/512, wordmark 1024, lockup 1024, both variants)`);
