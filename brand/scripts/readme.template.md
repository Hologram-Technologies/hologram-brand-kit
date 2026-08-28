<p align="center">
  <img src="brand/assets/banner.svg" alt="Hologram Brand System" width="100%">
</p>

# Hologram Brand System

The visual identity of Hologram: logos, color, typography, tokens, and a complete
component library. Warm ground `{{GROUND}}`, one brand accent `{{ACCENT}}`.

[gethologram.ai](https://gethologram.ai) · [Hologram OS](https://github.com/Hologram-Technologies/hologram-os)


## Logo System

### Logomark

| Preview | Name | Download |
|---|---|---|
| <img src="brand/logos/png/logomark/Hologram_Logomark_White_128px.png" width="64"> | Hologram Logomark (White) | [SVG](brand/logos/svg/logomark/Hologram_Logomark_White.svg) · [128](brand/logos/png/logomark/Hologram_Logomark_White_128px.png) · [256](brand/logos/png/logomark/Hologram_Logomark_White_256px.png) · [512](brand/logos/png/logomark/Hologram_Logomark_White_512px.png) |
| <img src="brand/logos/png/logomark/Hologram_Logomark_Black_128px.png" width="64"> | Hologram Logomark (Black) | [SVG](brand/logos/svg/logomark/Hologram_Logomark_Black.svg) · [128](brand/logos/png/logomark/Hologram_Logomark_Black_128px.png) · [256](brand/logos/png/logomark/Hologram_Logomark_Black_256px.png) · [512](brand/logos/png/logomark/Hologram_Logomark_Black_512px.png) |

### Wordmark

| Preview | Name | Download |
|---|---|---|
| <img src="brand/logos/png/wordmark/Hologram_Wordmark_White_1024px.png" height="24"> | Hologram Wordmark (White) | [SVG](brand/logos/svg/wordmark/Hologram_Wordmark_White.svg) · [PNG](brand/logos/png/wordmark/Hologram_Wordmark_White_1024px.png) |
| <img src="brand/logos/png/wordmark/Hologram_Wordmark_Black_1024px.png" height="24"> | Hologram Wordmark (Black) | [SVG](brand/logos/svg/wordmark/Hologram_Wordmark_Black.svg) · [PNG](brand/logos/png/wordmark/Hologram_Wordmark_Black_1024px.png) |

### Lockup

| Preview | Name | Download |
|---|---|---|
| <img src="brand/logos/png/lockup/Hologram_Lockup_White_1024px.png" height="36"> | Hologram Lockup (White) | [SVG](brand/logos/svg/lockup/Hologram_Lockup_White.svg) · [PNG](brand/logos/png/lockup/Hologram_Lockup_White_1024px.png) |
| <img src="brand/logos/png/lockup/Hologram_Lockup_Black_1024px.png" height="36"> | Hologram Lockup (Black) | [SVG](brand/logos/svg/lockup/Hologram_Lockup_Black.svg) · [PNG](brand/logos/png/lockup/Hologram_Lockup_Black_1024px.png) |

The mark is a halftone sphere resolving into an H. The wordmark is set in
Archivo SemiBold, tracked wide, drawn as paths so no font is required. The
white variants are primary and sit on the warm ground; black is for paper
and print.


## Color System

[![Hologram Palette](brand/public/Hologram_Palette.svg)](brand/public/Hologram_Palette.svg)

The brand accent is the only saturated color in the system apart from
destructive, and it appears once per view at most. The accent role itself is
a quiet surface, as the component library expects.

### Dark

The primary mode of the product. A warm near black ground, hairline borders
as alpha whites.

{{DARK_TABLE}}

### Paper

Warm paper for documents, print, and light surfaces.

{{PAPER_TABLE}}

A neutral baseline (the unmodified upstream theme) and eight alternative
neutral bases ship alongside in [brand/tokens](brand/tokens).


## Typography

[![Hologram Typography](brand/public/Hologram_Typography.svg)](brand/public/Hologram_Typography.svg)

| Font | Use | Desktop | Web |
|---|---|---|---|
| Archivo | Display, headlines, wordmark | [Variable](brand/fonts/otf/Archivo-Variable.ttf) | [Medium](brand/fonts/web/Archivo-Medium.woff2) · [SemiBold](brand/fonts/web/Archivo-SemiBold.woff2) · [Bold](brand/fonts/web/Archivo-Bold.woff2) |
| Geist | Interface, body | [Regular](brand/fonts/otf/Geist-Regular.otf) · [Medium](brand/fonts/otf/Geist-Medium.otf) · [SemiBold](brand/fonts/otf/Geist-SemiBold.otf) · [Bold](brand/fonts/otf/Geist-Bold.otf) | [Regular](brand/fonts/web/Geist-Regular.woff2) · [Medium](brand/fonts/web/Geist-Medium.woff2) · [SemiBold](brand/fonts/web/Geist-SemiBold.woff2) · [Bold](brand/fonts/web/Geist-Bold.woff2) |
| Geist Mono | Code, data | [Regular](brand/fonts/otf/GeistMono-Regular.otf) · [Medium](brand/fonts/otf/GeistMono-Medium.otf) | [Regular](brand/fonts/web/GeistMono-Regular.woff2) · [Medium](brand/fonts/web/GeistMono-Medium.woff2) |

Scale: 12, 14, 16, 18, 20, 24, 30, 36, 48, 64 px. Weights: 400, 500, 600, 700.
Display tracks tight at minus 3 percent; spaced caps track at plus 22 percent
and are reserved for the wordmark. Body text never drops below 16px, secondary
text never below 14px, and nothing on any surface is smaller than 14px.


## Components

[![Hologram Library](brand/public/Hologram_Library.png)](https://hologram-technologies.github.io/hologram-brand-kit/)

The entire library, live: [hologram-technologies.github.io/hologram-brand-kit](https://hologram-technologies.github.io/hologram-brand-kit/)

All 61 components of the vendored library render in the brand theme; a build
gate fails if any component is missing from the showcase. Run it locally with
`npm install` and `npm run dev` in [brand/showcase](brand/showcase).

Product specs, user journeys, and live wireframes live in
[brand/product](brand/product); the screens render at
[the screens index](https://hologram-technologies.github.io/hologram-brand-kit/#/screens).

The brand theme for the web: [hologram-warm.css](brand/css/hologram-warm.css),
standard shadcn variable names, drop in and add the `dark` class for the dark
ground. The library source ships under [brand/vendor](brand/vendor/shadcn-ui),
MIT licensed, bound to the same token source as this document. The neutral
baseline theme remains at [hologram-theme.css](brand/css/hologram-theme.css).


## Voice

Short declarative sentences. Say one thing per sentence and stop.
No dashes as punctuation, no emojis, no exclamation marks.
Nothing decorative that does not carry information.


## Design Tokens

Design tokens (W3C DTCG): [hologram-tokens.json](brand/tokens/hologram-tokens.json) · [import package](brand/tokens/hologram-tokens.zip)
CSS variables for the web: [hologram-warm.css](brand/css/hologram-warm.css) · [hologram-theme.css](brand/css/hologram-theme.css)
Alternative neutral bases (stone, zinc, slate, gray, mauve, olive, mist, taupe): [brand/tokens/variants](brand/tokens/variants)


## License

Brand kit and generators: [MPL 2.0](LICENSE), with the repository it extends.
Fonts: Geist and Geist Mono under [SIL OFL 1.1](brand/fonts/OFL.txt), Archivo under [SIL OFL 1.1](brand/fonts/OFL-Archivo.txt).
Vendored components: [MIT](brand/vendor/shadcn-ui/LICENSE.md).
