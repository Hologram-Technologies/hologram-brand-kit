<p align="center">
  <img src="brand/assets/banner.svg" alt="Hologram Brand System" width="100%">
</p>

# Hologram Brand System

The visual identity of Hologram: logos, color, typography, tokens, and a complete
component library. Brand ground: `#0a0a0a`.

[gethologram.ai](https://gethologram.ai) · [Hologram OS](https://github.com/Hologram-Technologies/hologram-os)

---

## Logo System

### Logomark

| Preview | Name | Download |
|---|---|---|
| <img src="brand/logos/png/logomark/Hologram_Logomark_White_128px.png" width="64"> | Hologram Logomark (White) | [SVG](brand/logos/svg/logomark/Hologram_Logomark_White.svg) · [128](brand/logos/png/logomark/Hologram_Logomark_White_128px.png) · [256](brand/logos/png/logomark/Hologram_Logomark_White_256px.png) · [512](brand/logos/png/logomark/Hologram_Logomark_White_512px.png) |
| <img src="brand/logos/png/logomark/Hologram_Logomark_Black_128px.png" width="64"> | Hologram Logomark (Black) | [SVG](brand/logos/svg/logomark/Hologram_Logomark_Black.svg) · [128](brand/logos/png/logomark/Hologram_Logomark_Black_128px.png) · [256](brand/logos/png/logomark/Hologram_Logomark_Black_256px.png) · [512](brand/logos/png/logomark/Hologram_Logomark_Black_512px.png) |

### Lockup

| Preview | Name | Download |
|---|---|---|
| <img src="brand/logos/png/lockup/Hologram_Lockup_White_512px.png" height="36"> | Hologram Lockup (White) | [SVG](brand/logos/svg/lockup/Hologram_Lockup_White.svg) · [PNG](brand/logos/png/lockup/Hologram_Lockup_White_512px.png) |
| <img src="brand/logos/png/lockup/Hologram_Lockup_Black_512px.png" height="36"> | Hologram Lockup (Black) | [SVG](brand/logos/svg/lockup/Hologram_Lockup_Black.svg) · [PNG](brand/logos/png/lockup/Hologram_Lockup_Black_512px.png) |

The white variant is primary and sits on the brand ground. The black variant is
for light surfaces and print.

---

## Color System

[![Hologram Palette](brand/public/Hologram_Palette.svg)](brand/public/Hologram_Palette.svg)

### Light

Default for documents, print, and light surfaces.

{{LIGHT_TABLE}}

### Dark

Primary mode of the product. Border and input are alpha whites over the ground.

{{DARK_TABLE}}

The full palette, including chart and sidebar roles and eight alternative
neutral bases, lives in [brand/tokens](brand/tokens).

---

## Typography

[![Hologram Typography](brand/public/Hologram_Typography.svg)](brand/public/Hologram_Typography.svg)

| Font | Use | OTF | Web |
|---|---|---|---|
| Geist | Interface, headings, body | [Regular](brand/fonts/otf/Geist-Regular.otf) · [Medium](brand/fonts/otf/Geist-Medium.otf) · [SemiBold](brand/fonts/otf/Geist-SemiBold.otf) · [Bold](brand/fonts/otf/Geist-Bold.otf) | [Regular](brand/fonts/web/Geist-Regular.woff2) · [Medium](brand/fonts/web/Geist-Medium.woff2) · [SemiBold](brand/fonts/web/Geist-SemiBold.woff2) · [Bold](brand/fonts/web/Geist-Bold.woff2) |
| Geist Mono | Code, data, labels | [Regular](brand/fonts/otf/GeistMono-Regular.otf) · [Medium](brand/fonts/otf/GeistMono-Medium.otf) | [Regular](brand/fonts/web/GeistMono-Regular.woff2) · [Medium](brand/fonts/web/GeistMono-Medium.woff2) |

Scale: 12, 14, 16, 18, 20, 24, 30, 36 px. Weights: 400, 500, 600, 700.

---

## Design Tokens

Design tokens (W3C DTCG): [hologram-tokens.json](brand/tokens/hologram-tokens.json) · [import package](brand/tokens/hologram-tokens.zip)
CSS variables for the web: [hologram-theme.css](brand/css/hologram-theme.css)
Alternative neutral bases (stone, zinc, slate, gray, mauve, olive, mist, taupe): [brand/tokens/variants](brand/tokens/variants)

---

## Components

A complete UI component library ships under [brand/vendor](brand/vendor/shadcn-ui),
MIT licensed: 62 core components, charts, blocks, and themes, bound to the same
token source as this document.

---

## License

Brand kit and generators: [MPL-2.0](LICENSE), with the repository it extends.
Fonts: Geist and Geist Mono, [SIL OFL 1.1](brand/fonts/OFL.txt).
Vendored components: [MIT](brand/vendor/shadcn-ui/LICENSE.md).
