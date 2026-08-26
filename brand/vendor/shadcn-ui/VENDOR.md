# Vendored: shadcn/ui registry

Source: https://github.com/shadcn-ui/ui
Pinned commit: `683a5a9b370acdb7785a0529434e6a3b8c7e0441` (2026-08-26)
License: MIT (see LICENSE.md) — © shadcn

Contents (`registry/` = the repo's `apps/v4/registry`, copied verbatim):

- `registry/new-york-v4/ui/` — the 62 canonical UI components (.tsx), the
  classic default style. This is what the Penpot component library mirrors.
- `registry/new-york-v4/{charts,blocks,examples}/` — chart components, page
  blocks (dashboards, sidebars, login), and per-component demos.
- `registry/new-york-v4/{lib,hooks,internal}/` — `cn()` utility, hooks, internals.
- `registry/bases/{radix,base,aria}/` — the full component set per headless
  primitive backend (Radix UI / Base UI / React Aria).
- `registry/styles/` — the 8 named style sheets (luma, lyra, maia, mira, nova,
  rhea, sera, vega).
- `registry/themes.ts`, `base-colors.ts`, `bases.ts`, `fonts.ts`, `icons/`,
  `directory.json` — registry metadata and theme/token definitions.

Refresh procedure:

```
git clone --depth 1 --filter=blob:none --sparse https://github.com/shadcn-ui/ui.git
cd ui && git sparse-checkout set apps/v4/registry
# copy apps/v4/registry over brand/vendor/shadcn-ui/registry, update the
# pinned commit above, then re-run brand/scripts/shadcn-to-dtcg.mjs --fetch
```

Do not edit files under `registry/` — Hologram divergence happens in token sets
and in our own Penpot library, never by patching the vendored source.
