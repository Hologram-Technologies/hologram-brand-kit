#!/usr/bin/env node
// shadcn-to-dtcg.mjs — convert shadcn/ui theme variables (oklch CSS vars) into
// Penpot-importable DTCG design tokens (Tokens Studio multi-set flavor).
//
// Source of truth: https://ui.shadcn.com/r/colors/neutral.json (cssVarsV4),
// snapshotted at ../tokens/source/shadcn-neutral.json. Re-fetch with --fetch.
//
// Verification gate: shadcn's oklch values are derived from the Tailwind CSS
// palette. The converter asserts that every core color converts back to the
// exact Tailwind hex (±1/255 rounding). A math bug cannot ship silently.
//
// Output: ../tokens/hologram-tokens.json  (import into Penpot: Tokens > Tools > Import)
//
// Usage: node shadcn-to-dtcg.mjs [--fetch]

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const tokensDir = join(here, "..", "tokens");
const sourcePath = join(tokensDir, "source", "shadcn-neutral.json");
const outPath = join(tokensDir, "hologram-tokens.json");

// ---------------------------------------------------------------- oklch → hex

function oklchToRgb(L, C, H) {
  const hr = (H * Math.PI) / 180;
  const a = C * Math.cos(hr);
  const b = C * Math.sin(hr);
  // oklab → LMS (cube roots), then cube
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  // LMS → linear sRGB
  const lin = [
    +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
  // gamma + clamp
  return lin.map((c) => {
    const g = c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
    return Math.max(0, Math.min(255, Math.round(g * 255)));
  });
}

function parseOklch(str) {
  // "oklch(0.577 0.245 27.325)" or "oklch(1 0 0 / 10%)"
  const m = str.match(/^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*(?:\/\s*([\d.]+)%\s*)?\)$/);
  if (!m) throw new Error(`unparseable oklch: ${str}`);
  return { L: +m[1], C: +m[2], H: +m[3], alpha: m[4] !== undefined ? +m[4] / 100 : 1 };
}

export function oklchToHex(str) {
  const { L, C, H, alpha } = parseOklch(str);
  const [r, g, b] = oklchToRgb(L, C, H);
  const h = (n) => n.toString(16).padStart(2, "0");
  const base = `#${h(r)}${h(g)}${h(b)}`;
  return alpha < 1 ? base + h(Math.round(alpha * 255)) : base;
}

// ------------------------------------------- core palette (Tailwind identity)

// Every opaque color shadcn "neutral" uses, with the sRGB hex it must convert
// to. Expected values cross-checked against Chrome's color engine (canvas
// fillStyle round-trip, 2026-08-26) — Tailwind v4 defines the palette IN oklch,
// so v3 hex values are close but not identical. This is the correctness gate.
const CORE = [
  ["white",       "oklch(1 0 0)",                 "#ffffff"],
  ["neutral.50",  "oklch(0.985 0 0)",             "#fafafa"],
  ["neutral.100", "oklch(0.97 0 0)",              "#f5f5f5"],
  ["neutral.200", "oklch(0.922 0 0)",             "#e5e5e5"],
  ["neutral.300", "oklch(0.87 0 0)",              "#d4d4d4"],
  ["neutral.400", "oklch(0.708 0 0)",             "#a1a1a1"],
  ["neutral.500", "oklch(0.556 0 0)",             "#737373"],
  ["neutral.600", "oklch(0.439 0 0)",             "#525252"],
  ["neutral.700", "oklch(0.371 0 0)",             "#404040"],
  ["neutral.800", "oklch(0.269 0 0)",             "#262626"],
  ["neutral.900", "oklch(0.205 0 0)",             "#171717"],
  ["neutral.950", "oklch(0.145 0 0)",             "#0a0a0a"],
  ["red.600",     "oklch(0.577 0.245 27.325)",    "#e7000b"],
  ["red.400",     "oklch(0.704 0.191 22.216)",    "#ff6467"],
  ["blue.700",    "oklch(0.488 0.243 264.376)",   "#1447e6"],
];

function hexDist(a, b) {
  let d = 0;
  for (let i = 1; i < 7; i += 2)
    d = Math.max(d, Math.abs(parseInt(a.slice(i, i + 2), 16) - parseInt(b.slice(i, i + 2), 16)));
  return d;
}

function verifyConverter() {
  const failures = [];
  for (const [name, oklch, expected] of CORE) {
    const got = oklchToHex(oklch);
    if (hexDist(got, expected) > 1) failures.push(`${name}: ${oklch} → ${got}, expected ${expected}`);
  }
  if (failures.length) {
    console.error("CONVERTER VERIFICATION FAILED:\n" + failures.join("\n"));
    process.exit(1);
  }
  console.log(`verify: ${CORE.length}/${CORE.length} core colors match Tailwind ground truth`);
}

// --------------------------------------------------------------------- build

async function loadSource() {
  if (process.argv.includes("--fetch")) {
    const res = await fetch("https://ui.shadcn.com/r/colors/neutral.json");
    if (!res.ok) throw new Error(`registry fetch failed: ${res.status}`);
    const json = await res.json();
    mkdirSync(dirname(sourcePath), { recursive: true });
    writeFileSync(sourcePath, JSON.stringify(json, null, 2));
    console.log("fetched registry → " + sourcePath);
    return json;
  }
  return JSON.parse(readFileSync(sourcePath, "utf8"));
}

// Map an oklch value to a {core.*} reference when it is a palette color,
// otherwise to a raw hex (covers the alpha whites of dark mode).
function semanticValue(oklch) {
  const hit = CORE.find(([, o]) => o === oklch);
  return hit ? `{core.${hit[0]}}` : oklchToHex(oklch);
}

function set(obj, path, value) {
  const parts = path.split(".");
  let node = obj;
  for (const p of parts.slice(0, -1)) node = node[p] ??= {};
  node[parts.at(-1)] = value;
}

function buildSemanticSet(vars, { useCore = true } = {}) {
  const out = {};
  for (const [name, value] of Object.entries(vars)) {
    if (name === "radius") continue; // mode-independent, lives in global
    // Keep shadcn's flat hyphenated names: "primary-foreground" must NOT nest
    // under the "primary" token (a node cannot be both token and group).
    set(out, `color.${name}`,
      { $type: "color", $value: useCore ? semanticValue(value) : oklchToHex(value) });
  }
  return out;
}

function px(n) { return `${n}px`; }

// -------------------------------------------------- hologram layer (the brand)
//
// Measured from the live brand surfaces (2026-08-26): gethologram.ai ground
// oklch(0.19 0.004 60), foreground oklch(0.97 0.002 60), muted foreground
// oklch(0.72 0.004 60), accent #E93B01 (shared with groq.com, whose paper is
// #F3F3EE with ink #302B28). oklch values go through the SAME verified
// converter as the baseline; hex anchors are used verbatim.
const HOLOGRAM = {
  dark: {
    "background":           "oklch(0.19 0.004 60)",
    "foreground":           "oklch(0.97 0.002 60)",
    "card":                 "oklch(0.23 0.004 60)",
    "card-foreground":      "oklch(0.97 0.002 60)",
    "popover":              "oklch(0.23 0.004 60)",
    "popover-foreground":   "oklch(0.97 0.002 60)",
    "primary":              "oklch(0.922 0.004 60)",
    "primary-foreground":   "oklch(0.23 0.004 60)",
    "secondary":            "oklch(0.27 0.004 60)",
    "secondary-foreground": "oklch(0.97 0.002 60)",
    "muted":                "oklch(0.27 0.004 60)",
    "muted-foreground":     "oklch(0.72 0.004 60)",
    "accent":               "oklch(0.27 0.004 60)",
    "accent-foreground":    "oklch(0.97 0.002 60)",
    "brand":                "#e93b01",
    "brand-foreground":     "#ffffff",
    "destructive":          "oklch(0.704 0.191 22.216)",
    "border":               "oklch(1 0 0 / 10%)",
    "input":                "oklch(1 0 0 / 15%)",
    "ring":                 "oklch(0.556 0.004 60)",
    "chart-1":              "#e93b01",
    "chart-2":              "oklch(0.87 0.004 60)",
    "chart-3":              "oklch(0.708 0.004 60)",
    "chart-4":              "oklch(0.556 0.004 60)",
    "chart-5":              "oklch(0.439 0.004 60)",
    "sidebar":              "oklch(0.23 0.004 60)",
    "sidebar-foreground":   "oklch(0.97 0.002 60)",
    "sidebar-primary":      "#e93b01",
    "sidebar-primary-foreground": "#ffffff",
    "sidebar-accent":       "oklch(0.27 0.004 60)",
    "sidebar-accent-foreground": "oklch(0.97 0.002 60)",
    "sidebar-border":       "oklch(1 0 0 / 10%)",
    "sidebar-ring":         "oklch(0.556 0.004 60)",
  },
  light: {
    "background":           "#f3f3ee",
    "foreground":           "#302b28",
    "card":                 "#ffffff",
    "card-foreground":      "#302b28",
    "popover":              "#ffffff",
    "popover-foreground":   "#302b28",
    "primary":              "#302b28",
    "primary-foreground":   "#f3f3ee",
    "secondary":            "#eae9e1",
    "secondary-foreground": "#302b28",
    "muted":                "#eae9e1",
    "muted-foreground":     "#6b6660",
    "accent":               "#e0dfd6",
    "accent-foreground":    "#302b28",
    "brand":                "#e93b01",
    "brand-foreground":     "#ffffff",
    "destructive":          "oklch(0.577 0.245 27.325)",
    "border":               "#deddd4",
    "input":                "#deddd4",
    "ring":                 "#a8a399",
    "chart-1":              "#e93b01",
    "chart-2":              "#302b28",
    "chart-3":              "#6b6660",
    "chart-4":              "#a8a399",
    "chart-5":              "#deddd4",
    "sidebar":              "#eae9e1",
    "sidebar-foreground":   "#302b28",
    "sidebar-primary":      "#e93b01",
    "sidebar-primary-foreground": "#ffffff",
    "sidebar-accent":       "#e0dfd6",
    "sidebar-accent-foreground": "#302b28",
    "sidebar-border":       "#deddd4",
    "sidebar-ring":         "#a8a399",
  },
};

function buildHologramSet(vars) {
  const out = {};
  for (const [name, value] of Object.entries(vars)) {
    const hex = value.startsWith("oklch") ? oklchToHex(value) : value;
    set(out, `color.${name}`, { $type: "color", $value: hex });
  }
  return out;
}

function main(source) {
  verifyConverter();
  const { light, dark } = source.cssVarsV4;

  const core = {};
  for (const [name, oklch] of CORE)
    set(core, `core.${name}`, { $type: "color", $value: oklchToHex(oklch) });

  // --radius: 0.625rem = 10px; shadcn derives sm/md/lg/xl from it in CSS calc.
  const radiusBase = parseFloat(light.radius) * 16;
  const global = {
    radius: {
      sm: { $type: "borderRadius", $value: px(radiusBase - 4) },
      md: { $type: "borderRadius", $value: px(radiusBase - 2) },
      lg: { $type: "borderRadius", $value: px(radiusBase) },
      xl: { $type: "borderRadius", $value: px(radiusBase + 4) },
    },
    spacing: Object.fromEntries(
      [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16].map((n) => [
        String(n), { $type: "spacing", $value: px(n * 4) },
      ])),
    font: {
      family: {
        sans: { $type: "fontFamilies", $value: "Geist, Inter, sans-serif" },
        display: { $type: "fontFamilies", $value: "Archivo, Geist, sans-serif" },
        mono: { $type: "fontFamilies", $value: "Geist Mono, JetBrains Mono, monospace" },
      },
      size: Object.fromEntries(Object.entries(
        { xs: 12, sm: 14, base: 16, lg: 18, xl: 20, "2xl": 24, "3xl": 30, "4xl": 36, "5xl": 48, "6xl": 64 },
      ).map(([k, v]) => [k, { $type: "fontSizes", $value: px(v) }])),
      weight: Object.fromEntries(Object.entries(
        { normal: 400, medium: 500, semibold: 600, bold: 700 },
      ).map(([k, v]) => [k, { $type: "fontWeights", $value: String(v) }])),
      tracking: {
        display: { $type: "letterSpacing", $value: "-0.03em" },
        normal: { $type: "letterSpacing", $value: "0em" },
        caps: { $type: "letterSpacing", $value: "0.22em" },
      },
    },
  };

  const tokens = {
    core: core.core,
    global,
    light: buildSemanticSet(light),
    dark: buildSemanticSet(dark),
    "hologram-dark": buildHologramSet(HOLOGRAM.dark),
    "hologram-light": buildHologramSet(HOLOGRAM.light),
    $themes: [
      {
        name: "hologram-dark",
        description: "Hologram brand, warm dark ground (primary)",
        selectedTokenSets: { core: "enabled", global: "enabled", "hologram-dark": "enabled" },
      },
      {
        name: "hologram-light",
        description: "Hologram brand, warm paper",
        selectedTokenSets: { core: "enabled", global: "enabled", "hologram-light": "enabled" },
      },
      {
        name: "light",
        description: "neutral baseline, light",
        selectedTokenSets: { core: "enabled", global: "enabled", light: "enabled" },
      },
      {
        name: "dark",
        description: "neutral baseline, dark",
        selectedTokenSets: { core: "enabled", global: "enabled", dark: "enabled" },
      },
    ],
    $metadata: { tokenSetOrder: ["core", "global", "hologram-dark", "hologram-light", "light", "dark"] },
  };

  writeFileSync(outPath, JSON.stringify(tokens, null, 2));
  const count = JSON.stringify(tokens).match(/\$type/g).length;
  console.log(`wrote ${outPath} (${count} tokens, sets incl hologram-dark hologram-light)`);
  buildVariants(global);
}

// Every other shadcn base color (stone, zinc, mauve, …) becomes a standalone
// variant token file: same global set, semantic colors as raw hex.
function buildVariants(global) {
  const colorsDir = join(tokensDir, "source", "colors");
  const variantsDir = join(tokensDir, "variants");
  mkdirSync(variantsDir, { recursive: true });
  const names = readdirSync(colorsDir)
    .filter((f) => f.endsWith(".json") && f !== "neutral.json")
    .map((f) => f.replace(".json", ""));
  for (const name of names) {
    const { cssVarsV4 } = JSON.parse(readFileSync(join(colorsDir, `${name}.json`), "utf8"));
    const tokens = {
      global,
      light: buildSemanticSet(cssVarsV4.light, { useCore: false }),
      dark: buildSemanticSet(cssVarsV4.dark, { useCore: false }),
      $themes: ["light", "dark"].map((mode) => ({
        name: mode,
        description: `shadcn/ui ${mode} mode (${name} base)`,
        selectedTokenSets: { global: "enabled", [mode]: "enabled" },
      })),
      $metadata: { tokenSetOrder: ["global", "light", "dark"] },
    };
    writeFileSync(join(variantsDir, `hologram-tokens-${name}.json`),
      JSON.stringify(tokens, null, 2));
  }
  console.log(`wrote ${names.length} variants (${names.join(", ")}) → tokens/variants/`);
}

import { pathToFileURL } from "node:url";
if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  main(await loadSource());
}
