#!/usr/bin/env node
// build-brand-assets.mjs — generates the visual layer of the brand system from
// the token source. Emits: logo SVGs, color swatches, palette and typography
// sheets, and the root README (from readme.template.md). Deterministic, no deps.
//
//   node build-brand-assets.mjs
//
// PNG exports are produced separately by render-png.mjs (requires a rasterizer).

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const brand = join(here, "..");
const tokens = JSON.parse(readFileSync(join(brand, "tokens", "hologram-tokens.json"), "utf8"));

// ------------------------------------------------------------------ tokens

function resolveRef(value) {
  const m = /^\{(.+)\}$/.exec(value);
  if (!m) return value;
  let node = tokens;
  for (const p of m[1].split(".")) node = node?.[p];
  if (node?.$value === undefined) throw new Error(`unresolvable ref: ${value}`);
  return resolveRef(node.$value);
}

const SEMANTIC = ["background", "foreground", "card", "popover", "primary",
  "secondary", "muted", "accent", "destructive", "border", "input", "ring"];

function palette(mode) {
  return SEMANTIC.map((name) => {
    const hex = resolveRef(tokens[mode].color[name].$value);
    return { name: `color.${name}`, hex, ...hexParts(hex) };
  });
}

function hexParts(hex) {
  const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);
  const a = hex.length === 9 ? Math.round((parseInt(hex.slice(7, 9), 16) / 255) * 100) : null;
  return { rgb: a === null ? `${r}, ${g}, ${b}` : `${r}, ${g}, ${b}, ${a}%`, alpha: a };
}

// ------------------------------------------------------------------ logos

const MARK = (fg) => `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="166" y="70" width="288" height="288" rx="52" stroke="${fg}" stroke-opacity="0.22" stroke-width="12"/>
  <rect x="118" y="118" width="288" height="288" rx="52" stroke="${fg}" stroke-opacity="0.45" stroke-width="12"/>
  <rect x="70" y="166" width="288" height="288" rx="52" fill="${fg}"/>
</svg>
`;

const LOCKUP = (fg) => `<svg width="640" height="160" viewBox="0 0 640 160" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(28,26) scale(0.2109)">
    <rect x="166" y="70" width="288" height="288" rx="52" stroke="${fg}" stroke-opacity="0.22" stroke-width="14"/>
    <rect x="118" y="118" width="288" height="288" rx="52" stroke="${fg}" stroke-opacity="0.45" stroke-width="14"/>
    <rect x="70" y="166" width="288" height="288" rx="52" fill="${fg}"/>
  </g>
  <text x="160" y="106" font-family="Geist, Inter, 'Segoe UI', system-ui, sans-serif" font-size="64" font-weight="600" letter-spacing="-1.5" fill="${fg}">Hologram</text>
</svg>
`;

function writeLogos() {
  for (const [variant, fg] of [["Black", "#0a0a0a"], ["White", "#fafafa"]]) {
    mkdirSync(join(brand, "logos", "svg", "logomark"), { recursive: true });
    mkdirSync(join(brand, "logos", "svg", "lockup"), { recursive: true });
    writeFileSync(join(brand, "logos", "svg", "logomark", `Hologram_Logomark_${variant}.svg`), MARK(fg));
    writeFileSync(join(brand, "logos", "svg", "lockup", `Hologram_Lockup_${variant}.svg`), LOCKUP(fg));
  }
}

// ------------------------------------------------------------------ swatches

function swatchSvg(hex) {
  const alpha = hex.length === 9;
  const ground = alpha ? `<rect width="48" height="28" rx="8" fill="#0a0a0a"/>\n  ` : "";
  return `<svg width="48" height="28" viewBox="0 0 48 28" xmlns="http://www.w3.org/2000/svg">
  ${ground}<rect width="48" height="28" rx="8" fill="${hex}"/>
  <rect x="0.5" y="0.5" width="47" height="27" rx="7.5" fill="none" stroke="#808080" stroke-opacity="0.4"/>
</svg>
`;
}

function writeSwatches(entries) {
  const dir = join(brand, "colors", "swatches");
  mkdirSync(dir, { recursive: true });
  const seen = new Set();
  for (const { hex } of entries) {
    const id = hex.slice(1);
    if (seen.has(id)) continue;
    seen.add(id);
    writeFileSync(join(dir, `${id}.svg`), swatchSvg(hex));
  }
  return seen;
}

// ------------------------------------------------------------------ sheets

const FONT = "Geist, Inter, 'Segoe UI', system-ui, sans-serif";
const MONO = "'Geist Mono', 'JetBrains Mono', Consolas, monospace";

function paletteSheet(light, dark) {
  const row = (e, x, y, labelFill) => `
    <rect x="${x}" y="${y}" width="44" height="26" rx="8" fill="#0a0a0a"/>
    <rect x="${x}" y="${y}" width="44" height="26" rx="8" fill="${e.hex}" stroke="#808080" stroke-opacity="0.35"/>
    <text x="${x + 60}" y="${y + 18}" font-family="${MONO}" font-size="14" fill="${labelFill}">${e.name.padEnd(18)}</text>
    <text x="${x + 244}" y="${y + 18}" font-family="${MONO}" font-size="14" fill="#737373">${e.hex}</text>`;
  const col = (entries, x) => entries.map((e, i) => row(e, x, 96 + i * 40, "#a1a1a1")).join("");
  const h = 96 + SEMANTIC.length * 40 + 32;
  return `<svg width="880" height="${h}" viewBox="0 0 880 ${h}" xmlns="http://www.w3.org/2000/svg">
  <rect width="880" height="${h}" rx="16" fill="#0a0a0a"/>
  <rect x="0.5" y="0.5" width="879" height="${h - 1}" rx="15.5" fill="none" stroke="#ffffff" stroke-opacity="0.1"/>
  <text x="48" y="56" font-family="${FONT}" font-size="22" font-weight="600" fill="#fafafa">Color</text>
  <text x="48" y="80" font-family="${FONT}" font-size="14" fill="#737373">Light</text>
  <text x="472" y="80" font-family="${FONT}" font-size="14" fill="#737373">Dark</text>
  <path d="M440 48V${h - 32}" stroke="#ffffff" stroke-opacity="0.08"/>
  ${col(light, 48)}
  ${col(dark, 472)}
</svg>
`;
}

function typographySheet() {
  const sizes = Object.entries(tokens.global.font.size)
    .map(([k, v]) => `${k} ${parseInt(v.$value)}`).join(" · ");
  return `<svg width="880" height="360" viewBox="0 0 880 360" xmlns="http://www.w3.org/2000/svg">
  <rect width="880" height="360" rx="16" fill="#0a0a0a"/>
  <rect x="0.5" y="0.5" width="879" height="359" rx="15.5" fill="none" stroke="#ffffff" stroke-opacity="0.1"/>
  <text x="48" y="56" font-family="${FONT}" font-size="22" font-weight="600" fill="#fafafa">Typography</text>
  <text x="48" y="128" font-family="${FONT}" font-size="44" font-weight="600" letter-spacing="-1" fill="#fafafa">Geist</text>
  <text x="48" y="164" font-family="${FONT}" font-size="18" fill="#a1a1a1">The quick brown fox jumps over the lazy dog</text>
  <text x="48" y="230" font-family="${MONO}" font-size="36" fill="#fafafa">Geist Mono</text>
  <text x="48" y="264" font-family="${MONO}" font-size="16" fill="#a1a1a1">0123456789 {}[]() =&gt; const kit = "hologram"</text>
  <path d="M48 296H832" stroke="#ffffff" stroke-opacity="0.08"/>
  <text x="48" y="326" font-family="${MONO}" font-size="13" fill="#737373">scale ${sizes} px · weights 400 500 600 700</text>
</svg>
`;
}

// ------------------------------------------------------------------ README

function table(entries) {
  const lines = ["| | Token | Hex | RGB |", "|---|---|---|---|"];
  for (const e of entries)
    lines.push(`| ![${e.hex}](brand/colors/swatches/${e.hex.slice(1)}.svg) | \`${e.name}\` | \`${e.hex}\` | ${e.rgb} |`);
  return lines.join("\n");
}

function writeReadme(light, dark) {
  const tpl = readFileSync(join(here, "readme.template.md"), "utf8");
  const out = tpl
    .replaceAll("{{LIGHT_TABLE}}", table(light))
    .replaceAll("{{DARK_TABLE}}", table(dark));
  writeFileSync(join(brand, "..", "README.md"), out);
}

// ------------------------------------------------------------------ main

const light = palette("light");
const dark = palette("dark");
writeLogos();
const swatches = writeSwatches([...light, ...dark]);
mkdirSync(join(brand, "public"), { recursive: true });
writeFileSync(join(brand, "public", "Hologram_Palette.svg"), paletteSheet(light, dark));
writeFileSync(join(brand, "public", "Hologram_Typography.svg"), typographySheet());
writeReadme(light, dark);
console.log(`logos: 4 · swatches: ${swatches.size} · sheets: 2 · README written`);
