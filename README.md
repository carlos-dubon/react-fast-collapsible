# react-fast-collapsible

[![npm version](https://img.shields.io/npm/v/react-fast-collapsible.svg)](https://www.npmjs.com/package/react-fast-collapsible)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/react-fast-collapsible)](https://bundlephobia.com/package/react-fast-collapsible)
[![dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg)](https://www.npmjs.com/package/react-fast-collapsible?activeTab=dependencies)
[![license](https://img.shields.io/npm/l/react-fast-collapsible.svg)](./LICENSE)

A tiny, **dependency-free** React collapsible that animates to `height: auto` with **pure CSS** — no JavaScript height measurement, no forced reflows, no layout thrashing.

```tsx
import { Collapsible } from 'react-fast-collapsible';

<Collapsible open={open}>
  <YourContent />
</Collapsible>;
```

## Motivation

Most React collapsible libraries — including the popular [`react-collapsible`](https://www.npmjs.com/package/react-collapsible) — animate height **in JavaScript**:

1. They render the content, then read its `scrollHeight` from the DOM.
2. Reading `scrollHeight` forces the browser to synchronously recalculate layout — a **forced reflow** (a.k.a. _layout thrashing_).
3. They write an explicit pixel height, wait a frame, then transition to the measured value.
4. Every open/close (and often every content or resize change) repeats this measure-then-write dance on the main thread.

It works, but it has real costs: forced reflows are a [well-known performance footgun](https://gist.github.com/paulirish/5d52fb081b3570c81e3a), the animation can jank on busy pages, content whose height changes is awkward to handle, and you ship a chunk of imperative JavaScript to do something the browser can already do natively.

**react-fast-collapsible takes the opposite approach.** It animates a CSS Grid row track from `0fr` to `1fr`:

```css
display: grid;
grid-template-rows: 0fr;             /* closed */
transition: grid-template-rows 300ms;
/* open -> grid-template-rows: 1fr   the row grows to fit the content */
```

The browser animates the track from zero to the content's intrinsic size — **without anyone ever measuring that size in JavaScript.** There is no `scrollHeight` read, so there is no JS-forced reflow. Content of any height (including content that changes) just works, because `1fr` resolves to whatever the content needs. The component holds no state, runs no effects, and ships **zero dependencies**.

The only JavaScript involved is flipping the `open` boolean — which you were already doing.

## Features

- **Zero dependencies**, under 1 kB min+gzip.
- **Pure-CSS** animation to auto height (CSS grid `0fr`/`1fr`).
- **No forced reflows** — nothing reads layout on toggle.
- Handles **content of unknown or dynamic height** automatically.
- **Accessible** — collapsed content is `inert` (out of the tab order and the a11y tree).
- **Unstyled and composable** — bring Tailwind, plain CSS, or inline styles.
- First-class **TypeScript** types, ref forwarding, full `div` prop passthrough.
- **SSR/RSC-safe**, tree-shakeable, ships ESM + CJS.

## Installation

```bash
npm install react-fast-collapsible
# or
pnpm add react-fast-collapsible
# or
yarn add react-fast-collapsible
```

> Peer dependency: `react >= 17`.

## Usage

`Collapsible` is **controlled** — you own the `open` boolean, so it works with any state source.

```tsx
import { useState } from 'react';
import { Collapsible } from 'react-fast-collapsible';

export function Example() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen((o) => !o)}>{open ? 'Hide' : 'Show'}</button>

      <Collapsible open={open}>
        <p>Any content — text, images, lists, dynamic height. No measuring required.</p>
      </Collapsible>
    </div>
  );
}
```

### Padding and styling

Put padding/margins on the **content** via `innerClassName` / `innerStyle`, not on the outer container — the outer element must be able to collapse all the way to zero.

```tsx
<Collapsible open={open} innerStyle={{ padding: 16 }}>
  ...
</Collapsible>
```

With Tailwind:

```tsx
<Collapsible open={open} className="rounded-xl border" innerClassName="p-4 text-sm">
  ...
</Collapsible>
```

### Tuning the animation

```tsx
<Collapsible
  open={open}
  duration={450}
  easing="cubic-bezier(0.22, 1, 0.36, 1)"
  animateOpacity={false}
>
  ...
</Collapsible>
```

## API

| Prop             | Type             | Default  | Description                                                       |
| ---------------- | ---------------- | -------- | ----------------------------------------------------------------- |
| `open`           | `boolean`        | —        | **Required.** Whether the panel is expanded.                      |
| `duration`       | `number`         | `300`    | Animation duration in milliseconds.                               |
| `easing`         | `string`         | `'ease'` | Any CSS `transition-timing-function`.                             |
| `animateOpacity` | `boolean`        | `true`   | Fade the content in/out alongside the height animation.           |
| `innerClassName` | `string`         | —        | Class on the inner content wrapper — **put padding here.**        |
| `innerStyle`     | `CSSProperties`  | —        | Inline style on the inner content wrapper.                        |
| `className`      | `string`         | —        | Class on the outer (animating) container.                         |
| `style`          | `CSSProperties`  | —        | Inline style on the outer container (merged over the defaults).   |
| `...rest`        | `div` attributes | —        | Anything else (`id`, `data-*`, `aria-*`, `onTransitionEnd`, ...). |

The `ref` is forwarded to the outer container.

## How it works

The rendered markup is three nested elements:

```html
<div style="display:grid; grid-template-rows: 0fr -> 1fr; transition">  <!-- animates -->
  <div style="min-height:0; overflow:hidden">                           <!-- clips -->
    <div class="{innerClassName}">{children}</div>                      <!-- your content -->
  </div>
</div>
```

`height: auto` is not animatable, but a grid track sized `1fr` **is** — and it resolves to the content's natural height. `min-height: 0` lets the row shrink below its content size; `overflow: hidden` clips the content while it animates. That is the whole trick.

## Accessibility

When `open` is `false`, the content wrapper receives the [`inert`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inert) attribute, so collapsed content cannot be focused, clicked, or read by assistive technology — and it stays out of the tab order — with no JS focus management and no reflow.

## Browser support

All modern evergreen browsers. The animation relies on animatable `grid-template-rows` (Chrome 107+, Firefox 66+, Safari 16+) and the `inert` attribute (Baseline since 2023). In older browsers it degrades gracefully — the panel still opens and closes, just without the smooth tween / inert behavior.

## Repository

This package is developed in a [pnpm](https://pnpm.io) workspace monorepo:

```
.
├── packages/
│   └── react-fast-collapsible/   # the published library (built with tsdown)
├── examples/
│   └── web/                      # Vite + Tailwind CSS v4 + shadcn/ui + Base UI demo
└── scripts/
    └── copy-readme.mjs           # syncs this README into the package on publish
```

### Development

Requires Node 18+ and pnpm.

```bash
pnpm install          # install all workspaces
pnpm dev              # run the example app (consumes the library source with HMR)
pnpm build            # build the library with tsdown -> packages/react-fast-collapsible/dist
pnpm build:example    # type-check and build the example app
pnpm typecheck        # type-check every workspace
```

The example app under `examples/web` is built with Vite, Tailwind CSS v4, and shadcn/ui components backed by [Base UI](https://base-ui.com) primitives. It aliases `react-fast-collapsible` to the library source, so editing the component hot-reloads instantly in the demo.

### Publishing

This README is the single source of truth: `scripts/copy-readme.mjs` runs in the library's `prepack` step and copies it into the package directory, so the same content ships to npm.

```bash
pnpm build
pnpm release          # pnpm --filter react-fast-collapsible publish
```

## License

[MIT](./LICENSE) © Carlos Dubon
