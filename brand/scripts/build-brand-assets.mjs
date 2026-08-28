#!/usr/bin/env node
// build-brand-assets.mjs — generates the visual layer of the brand system from
// the token source. Emits: color swatches, the palette, typography, and
// component sheets, the repo banner, and the root README (from
// readme.template.md). Deterministic, no deps.
//
//   node build-brand-assets.mjs
//
// Logos are canonical authored assets in brand/logos/svg (the dotted H mark
// and the Archivo wordmark as paths); this script composes them into the
// banner but never regenerates them. PNG exports: render-png.mjs.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
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
  "secondary", "muted", "accent", "destructive", "success",
  "muted-foreground-subtle", "border", "input", "ring"];

function palette(setName) {
  return SEMANTIC.map((name) => {
    const hex = resolveRef(tokens[setName].color[name].$value);
    return { name: `color.${name}`, hex, ...hexParts(hex) };
  });
}

function color(setName, name) {
  return resolveRef(tokens[setName].color[name].$value);
}

function hexParts(hex) {
  const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);
  const a = hex.length === 9 ? Math.round((parseInt(hex.slice(7, 9), 16) / 255) * 100) : null;
  return { rgb: a === null ? `${r}, ${g}, ${b}` : `${r}, ${g}, ${b}, ${a}%`, alpha: a };
}

// ------------------------------------------------------------ contrast gate

function luminance(hex) {
  const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * lin(parseInt(hex.slice(1, 3), 16))
       + 0.7152 * lin(parseInt(hex.slice(3, 5), 16))
       + 0.0722 * lin(parseInt(hex.slice(5, 7), 16));
}

function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

function verifyContrast() {
  const failures = [];
  for (const setName of ["hologram-dark", "hologram-light", "dark", "light"]) {
    const bg = color(setName, "background");
    for (const role of ["foreground", "muted-foreground", "success"]) {
      const c = contrast(color(setName, role), bg);
      if (c < 4.5) failures.push(`${setName}/${role} on background: ${c.toFixed(2)} < 4.5`);
    }
    // The subtle gray is tertiary text by contract: AA-large floor.
    const s = contrast(color(setName, "muted-foreground-subtle"), bg);
    if (s < 3.0) failures.push(`${setName}/muted-foreground-subtle on background: ${s.toFixed(2)} < 3.0`);
  }
  if (failures.length) {
    console.error("WCAG AA GATE FAILED:\n" + failures.join("\n"));
    process.exit(1);
  }
  console.log("contrast: AA passes for body text in all four modes (subtle gray at AA-large)");
}

// --------------------------------------------------------- canonical logo art

const markDots = readFileSync(
  join(brand, "logos", "svg", "logomark", "Hologram_Logomark_White.svg"), "utf8")
  .match(/<circle[^/]*\/>/g).join("\n    ");
const wordmarkPaths = readFileSync(
  join(brand, "logos", "svg", "wordmark", "Hologram_Wordmark_White.svg"), "utf8")
  .match(/<path d="[^"]*"\/>/g).join("\n    ");
const WM_W = 775, WM_CAP = 68.6;   // wordmark natural geometry

// ------------------------------------------------------------------ swatches

function swatchSvg(hex, ground) {
  const alpha = hex.length === 9;
  const under = alpha ? `<rect width="48" height="28" rx="8" fill="${ground}"/>\n  ` : "";
  return `<svg width="48" height="28" viewBox="0 0 48 28" xmlns="http://www.w3.org/2000/svg">
  ${under}<rect width="48" height="28" rx="8" fill="${hex}"/>
  <rect x="0.5" y="0.5" width="47" height="27" rx="7.5" fill="none" stroke="#808080" stroke-opacity="0.4"/>
</svg>
`;
}

function writeSwatches(entries, ground) {
  const dir = join(brand, "colors", "swatches");
  mkdirSync(dir, { recursive: true });
  const seen = new Set();
  for (const { hex } of entries) {
    const id = hex.slice(1);
    if (seen.has(id)) continue;
    seen.add(id);
    writeFileSync(join(dir, `${id}.svg`), swatchSvg(hex, ground));
  }
  return seen;
}

// -------------------------------------------------------------------- sheets

const DISPLAY = "Archivo, Geist, 'Segoe UI', system-ui, sans-serif";
const FONT = "Geist, Inter, 'Segoe UI', system-ui, sans-serif";
const MONO = "'Geist Mono', 'JetBrains Mono', Consolas, monospace";

const G = {                                   // the warm ground, from tokens
  bg: () => color("hologram-dark", "background"),
  card: () => color("hologram-dark", "card"),
  fg: () => color("hologram-dark", "foreground"),
  muted: () => color("hologram-dark", "muted-foreground"),
  accent: () => color("hologram-dark", "accent"),
};

function frame(w, h) {
  return `<rect width="${w}" height="${h}" rx="16" fill="${G.bg()}"/>
  <rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" rx="15.5" fill="none" stroke="#ffffff" stroke-opacity="0.1"/>`;
}

function paletteSheet(dark, light) {
  const row = (e, x, y) => `
    <rect x="${x}" y="${y}" width="44" height="26" rx="8" fill="${G.card()}"/>
    <rect x="${x}" y="${y}" width="44" height="26" rx="8" fill="${e.hex}" stroke="#808080" stroke-opacity="0.35"/>
    <text x="${x + 60}" y="${y + 18}" font-family="${MONO}" font-size="14" fill="${G.muted()}">${e.name}</text>
    <text x="${x + 244}" y="${y + 18}" font-family="${MONO}" font-size="14" fill="#7d7a77">${e.hex}</text>`;
  const col = (entries, x) => entries.map((e, i) => row(e, x, 96 + i * 40)).join("");
  const h = 96 + SEMANTIC.length * 40 + 32;
  return `<svg width="880" height="${h}" viewBox="0 0 880 ${h}" xmlns="http://www.w3.org/2000/svg">
  ${frame(880, h)}
  <text x="48" y="56" font-family="${FONT}" font-size="22" font-weight="600" fill="${G.fg()}">Color</text>
  <text x="48" y="80" font-family="${FONT}" font-size="14" fill="#7d7a77">Dark</text>
  <text x="472" y="80" font-family="${FONT}" font-size="14" fill="#7d7a77">Paper</text>
  <path d="M440 48V${h - 32}" stroke="#ffffff" stroke-opacity="0.08"/>
  ${col(dark, 48)}
  ${col(light, 472)}
</svg>
`;
}

function typographySheet() {
  const sizes = Object.values(tokens.global.font.size)
    .map((v) => parseInt(v.$value)).join(" ");
  return `<svg width="880" height="440" viewBox="0 0 880 440" xmlns="http://www.w3.org/2000/svg">
  ${frame(880, 440)}
  <text x="48" y="56" font-family="${FONT}" font-size="22" font-weight="600" fill="${G.fg()}">Typography</text>
  <text x="48" y="150" font-family="${DISPLAY}" font-size="64" font-weight="600" letter-spacing="-1.9" fill="${G.fg()}">Hologram</text>
  <text x="48" y="184" font-family="${FONT}" font-size="15" fill="${G.muted()}">Archivo · display and headlines · tracking tight</text>
  <text x="48" y="248" font-family="${FONT}" font-size="20" fill="${G.fg()}">Geist carries the interface and body copy.</text>
  <text x="48" y="278" font-family="${FONT}" font-size="15" fill="${G.muted()}">Geist · interface and body · 16px floor</text>
  <text x="48" y="336" font-family="${MONO}" font-size="17" fill="${G.fg()}">Geist Mono · const kit = "hologram"</text>
  <path d="M48 372H832" stroke="#ffffff" stroke-opacity="0.08"/>
  <text x="48" y="404" font-family="${MONO}" font-size="14" fill="#7d7a77">scale ${sizes} · weights 400 to 700 · nothing below 14</text>
</svg>
`;
}

function componentsSheet() {
  const p = (set, x, w) => {
    const c = (n) => color(set, n);
    const paper = set === "hologram-light";
    const label = paper ? "Paper" : "Dark";
    const hairline = paper ? c("border") : "#ffffff1a";
    return `
  <rect x="${x}" y="48" width="${w}" height="264" rx="12" fill="${c("background")}"/>
  <rect x="${x + 0.5}" y="48.5" width="${w - 1}" height="263" rx="11.5" fill="none" stroke="${hairline}"/>
  <text x="${x + 32}" y="88" font-family="${FONT}" font-size="14" fill="${c("muted-foreground")}">${label}</text>
  <rect x="${x + 32}" y="108" width="150" height="44" rx="10" fill="${c("accent")}"/>
  <text x="${x + 107}" y="136" font-family="${FONT}" font-size="16" font-weight="600" fill="${c("accent-foreground")}" text-anchor="middle">Get started</text>
  <rect x="${x + 206}" y="108" width="150" height="44" rx="10" fill="${c("secondary")}"/>
  <text x="${x + 281}" y="136" font-family="${FONT}" font-size="16" font-weight="500" fill="${c("secondary-foreground")}" text-anchor="middle">Learn more</text>
  <rect x="${x + 32}" y="176" width="324" height="52" rx="10" fill="${paper ? c("card") : "#ffffff26"}" stroke="${paper ? c("input") : "none"}"/>
  <text x="${x + 52}" y="207" font-family="${FONT}" font-size="16" fill="${c("muted-foreground")}">you@uor.foundation</text>
  <rect x="${x + 32}" y="252" width="324" height="1" fill="${hairline}"/>
  <text x="${x + 32}" y="286" font-family="${FONT}" font-size="16" fill="${c("foreground")}">Cards sit on hairlines, not shadows.</text>`;
  };
  return `<svg width="880" height="360" viewBox="0 0 880 360" xmlns="http://www.w3.org/2000/svg">
  ${frame(880, 360)}
  ${p("hologram-dark", 36, 400)}
  ${p("hologram-light", 448, 400)}
  <text x="36" y="340" font-family="${MONO}" font-size="14" fill="#7d7a77">every value above is a token · accent appears once per view</text>
</svg>
`;
}

// -------------------------------------------------------------------- banner

function banner() {
  const scale = 64 / WM_CAP;                       // wordmark cap height 64
  const wmW = WM_W * scale;
  const markSize = 176, markX = 128, cy = 200;
  const textX = markX + markSize + 96;
  return `<svg width="1600" height="400" viewBox="0 0 1600 400" xmlns="http://www.w3.org/2000/svg">
  ${frame(1600, 400)}
  <g fill="${G.fg()}" transform="translate(${markX + markSize / 2},${cy - 14}) scale(${(markSize / 208).toFixed(4)})">
    ${markDots}
  </g>
  <g fill="${G.fg()}" transform="translate(${textX},${cy + 10}) scale(${scale.toFixed(4)})">
    ${wordmarkPaths}
  </g>
  <rect x="${textX}" y="${cy + 58}" width="56" height="6" rx="3" fill="${G.accent()}"/>
  <text x="${textX + 76}" y="${cy + 64}" font-family="${FONT}" font-size="20" fill="${G.muted()}">The brand system</text>
</svg>
`;
}

// ------------------------------------------------------------------- README

function table(entries) {
  const lines = ["| | Token | Hex | RGB |", "|---|---|---|---|"];
  for (const e of entries)
    lines.push(`| ![${e.hex}](brand/colors/swatches/${e.hex.slice(1)}.svg) | \`${e.name}\` | \`${e.hex}\` | ${e.rgb} |`);
  return lines.join("\n");
}

function writeReadme(dark, light) {
  const tpl = readFileSync(join(here, "readme.template.md"), "utf8");
  const out = tpl
    .replaceAll("{{DARK_TABLE}}", table(dark))
    .replaceAll("{{PAPER_TABLE}}", table(light))
    .replaceAll("{{ACCENT}}", color("hologram-dark", "accent"))
    .replaceAll("{{GROUND}}", color("hologram-dark", "background"));
  writeFileSync(join(brand, "..", "README.md"), out);
}

// --------------------------------------------------------------------- main

verifyContrast();
const dark = palette("hologram-dark");
const light = palette("hologram-light");
const swatches = writeSwatches([...dark, ...light], G.bg());
mkdirSync(join(brand, "public"), { recursive: true });
writeFileSync(join(brand, "public", "Hologram_Palette.svg"), paletteSheet(dark, light));
writeFileSync(join(brand, "public", "Hologram_Typography.svg"), typographySheet());
writeFileSync(join(brand, "public", "Hologram_Components.svg"), componentsSheet());
writeFileSync(join(brand, "assets", "banner.svg"), banner());
writeReadme(dark, light);
console.log(`swatches: ${swatches.size} · sheets: 3 · banner · README written`);
