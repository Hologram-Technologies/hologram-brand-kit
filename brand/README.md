# Hologram Brand Kit

The visual foundation of Hologram, seeded from the [shadcn/ui](https://ui.shadcn.com)
design language ("new-york" style, neutral base) and expressed as W3C DTCG design
tokens that Penpot imports natively.

This directory is self-contained. The surrounding repo is a fork of
[penpot/penpot](https://github.com/penpot/penpot) — the tool — and stays
upstream-mergeable: nothing outside `brand/` is modified.

## Layout

```
brand/
  tokens/
    source/shadcn-neutral.json   # snapshot of the shadcn registry (canonical input)
    hologram-tokens.json         # generated DTCG tokens — SOURCE OF TRUTH
    hologram-tokens.zip          # same, packaged for Penpot import
  css/hologram-theme.css         # generated shadcn-compatible CSS variables
  scripts/
    shadcn-to-dtcg.mjs           # registry oklch vars → DTCG tokens (+ correctness gate)
    dtcg-to-css.mjs              # DTCG tokens → CSS vars (+ round-trip parity gate)
```

## Regenerate

```
node scripts/shadcn-to-dtcg.mjs          # rebuild tokens (add --fetch to re-pull registry)
node scripts/dtcg-to-css.mjs --check     # rebuild CSS + verify round-trip parity
```

No dependencies — plain Node. Both scripts carry verification gates:

- **Converter gate** — every core color's oklch→hex conversion is asserted against
  ground truth cross-checked with Chrome's color engine (Tailwind v4 defines its
  palette *in* oklch; v3 hex values are close but wrong).
- **Parity gate** — every emitted CSS variable must equal the direct conversion of
  the original shadcn registry value, both modes.

## Import into Penpot

1. Open a Penpot file → **Tokens** panel → **Tools ⋯ → Import**.
2. Choose `tokens/hologram-tokens.zip`.
3. You get four sets (`core`, `global`, `light`, `dark`) and two themes
   (`light`, `dark`). Activate a theme to switch every bound value at once.

Penpot format notes (verified against this fork's source,
`common/src/app/common/types/tokens_lib.cljc`):

- Multi-set Tokens-Studio-flavored DTCG: named sets + `$themes` + `$metadata`.
- Color values are tinycolor-validated — hex/hex8 work, **oklch does not** (hence
  the conversion). Dark-mode borders are alpha whites (`#ffffff1a`, `#ffffff26`).
- Token names allow hyphens; shadcn's flat names (`primary-foreground`) are kept
  as-is because a DTCG node cannot be both a token and a group.

## Component library (manual leg, in Penpot)

Build core components bound to tokens — never hardcoded values: button
(default / secondary / destructive / outline / ghost / link), input, card, badge,
alert, dialog, tabs, dropdown, avatar, switch, checkbox, table, sidebar shell.
Match shadcn new-york metrics: 36px button height, 14px body text, subtle
shadow, `radius.md` on controls, `radius.lg`/`xl` on surfaces.

Community scaffolds worth reusing (check license before importing):
[Shadcn UI Penpot Version](https://community.penpot.app/t/shadcn-ui-penpot-version/8479) ·
[shadcn library attempt](https://community.penpot.app/t/an-attempt-to-a-shadcn-ui-library-for-penpot/10521)

When done, export the library file to `brand/library/hologram-brand-kit.penpot`
(a build artifact — tokens remain the source of truth).

## Diverging into Hologram identity

Add a new set (e.g. `hologram`) overriding `primary`, `accent`, and fonts, plus a
theme selecting `core + global + hologram + dark`. The shadcn baseline stays
intact as the fallback theme, so parity is always one theme-switch away.

## Attribution

Color system and component anatomy derived from
[shadcn/ui](https://github.com/shadcn-ui/ui) — MIT License, © shadcn.
Fonts referenced: [Geist](https://vercel.com/font) (SIL OFL 1.1).
