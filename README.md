<a id="top"></a>

<p align="center">
  <img src="brand/assets/banner.svg" alt="Hologram Brand Kit" width="100%">
</p>

# Hologram Brand Kit

<p align="center">
  <a href="brand/README.md">The kit</a> &nbsp;|&nbsp; <a href="brand/tokens">Tokens</a> &nbsp;|&nbsp; <a href="brand/vendor/shadcn-ui">Components</a> &nbsp;|&nbsp; <a href="https://github.com/Hologram-Technologies/hologram-os">Hologram OS</a>
</p>

<p align="center">
  <a href="brand/tokens"><img src="https://img.shields.io/badge/Tokens-W3C%20DTCG-fafafa?style=for-the-badge&labelColor=0a0a0a" alt="W3C DTCG tokens"></a>
  <a href="https://ui.shadcn.com"><img src="https://img.shields.io/badge/Design%20language-shadcn%2Fui-737373?style=for-the-badge&labelColor=0a0a0a" alt="shadcn/ui"></a>
  <a href="https://penpot.app"><img src="https://img.shields.io/badge/Design%20tool-Penpot-1447e6?style=for-the-badge&labelColor=0a0a0a" alt="Penpot"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MPL--2.0%20%2B%20MIT-e7000b?style=for-the-badge&labelColor=0a0a0a" alt="License"></a>
</p>

> **One design language for everything Hologram ships.**
>
> Tokens, components, and themes — the same source of truth in design and in code.

The kit is the [shadcn/ui](https://ui.shadcn.com) design language made Hologram-native: its theme converted to
W3C design tokens that [Penpot](https://penpot.app) imports directly, and its complete component registry
vendored at a pinned commit. Every color is oklch-exact — the conversion is gated
against Chrome's own color engine, so design and code cannot drift.

## Use it

**In Penpot** — open a file → Tokens panel → Import → [`brand/tokens/hologram-tokens.zip`](brand/tokens).
You get the full palette, radius, spacing, and type scales, with light and dark themes.

**In code** — use [`brand/css/hologram-theme.css`](brand/css/hologram-theme.css): standard shadcn CSS variables,
drop-in for any Tailwind/shadcn project. Components live in [`brand/vendor/shadcn-ui`](brand/vendor/shadcn-ui).

**Prefer another neutral?** Eight base-color variants (stone, zinc, slate, mauve, …) are in
[`brand/tokens/variants`](brand/tokens/variants).

## What's inside

```
brand/          the Hologram brand kit — tokens, CSS, scripts, vendored components
everything else Penpot itself (this repo is a fork) — untouched, upstream-mergeable
```

The full map, regeneration commands, and verification gates: [`brand/README.md`](brand/README.md).

## Why a Penpot fork

The brand kit ships with its own design tool. Penpot is the open-source design
platform; keeping it pristine at the root means one `git merge upstream/develop`
keeps the tool current while the kit lives entirely in [`brand/`](brand).

## License

Penpot: [MPL-2.0](LICENSE) · shadcn/ui components: [MIT](brand/vendor/shadcn-ui/LICENSE.md) · © shadcn.

<p align="right">(<a href="#top">back to top</a>)</p>
