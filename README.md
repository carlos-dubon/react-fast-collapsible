# react-fast-collapsible

[![npm version](https://img.shields.io/npm/v/react-fast-collapsible.svg)](https://www.npmjs.com/package/react-fast-collapsible)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/react-fast-collapsible)](https://bundlephobia.com/package/react-fast-collapsible)
[![license](https://img.shields.io/npm/l/react-fast-collapsible.svg)](./LICENSE)

A React collapsible that animates to `height: auto` with plain CSS. No height measuring, no reflows, no dependencies, under 1 kB.

```tsx
import { Collapsible } from "react-fast-collapsible";

<Collapsible open={open}>
  <YourContent />
</Collapsible>;
```

## Why I made this

Pretty much every collapsible library animates height in JavaScript: render the content, read its `scrollHeight`, set an explicit pixel height, then transition to it. The problem is that reading `scrollHeight` forces the browser to recalculate layout on the spot (a [forced reflow](https://gist.github.com/paulirish/5d52fb081b3570c81e3a)), and you do it on every open/close. It works, but it can jank on busy pages, dynamic-height content is a pain, and you're shipping a bunch of JS to do something the browser can already do.

So this does the opposite. It animates a CSS grid row from `0fr` to `1fr` and lets the browser resolve `1fr` to whatever the content actually needs:

```css
display: grid;
grid-template-rows: 0fr; /* closed */
transition: grid-template-rows 300ms;
/* open -> grid-template-rows: 1fr    the row grows to fit */
```

Nothing measures anything. No `scrollHeight`, no reflow, no state, no effects. Content of any height (including content that changes while open) just works. The only JS involved is flipping the `open` boolean, which you were doing anyway.

## Install

```bash
npm i react-fast-collapsible
```

## Usage

It's controlled — you own the `open` boolean, so it plays nicely with whatever state you already have.

```tsx
import { useState } from "react";
import { Collapsible } from "react-fast-collapsible";

export function Example() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen((o) => !o)}>
        {open ? "Hide" : "Show"}
      </button>

      <Collapsible open={open}>
        <p>
          Any content — text, images, lists, dynamic height. No measuring
          required.
        </p>
      </Collapsible>
    </div>
  );
}
```

One gotcha: put padding and margins on the **content** (`innerClassName` / `innerStyle`), not the outer container. The outer element has to be able to collapse all the way to zero.

```tsx
<Collapsible open={open} innerClassName="p-4" innerStyle={{ padding: 16 }}>
  ...
</Collapsible>
```

And if you want to tweak the animation:

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

## Props

| Prop             | Type             | Default  | Notes                                             |
| ---------------- | ---------------- | -------- | ------------------------------------------------- |
| `open`           | `boolean`        | required | Whether the panel is expanded.                    |
| `duration`       | `number`         | `300`    | Animation duration in ms.                         |
| `easing`         | `string`         | `'ease'` | Any CSS timing function.                          |
| `animateOpacity` | `boolean`        | `true`   | Fade content in/out alongside the height.         |
| `innerClassName` | `string`         | —        | Class on the inner wrapper — put padding here.    |
| `innerStyle`     | `CSSProperties`  | —        | Inline style on the inner wrapper.                |
| `className`      | `string`         | —        | Class on the outer (animating) container.         |
| `style`          | `CSSProperties`  | —        | Inline style on the outer container.              |
| `...rest`        | `div` attributes | —        | `id`, `data-*`, `aria-*`, `onTransitionEnd`, etc. |

The `ref` forwards to the outer container.

## Development

pnpm monorepo — the library lives in `packages/react-fast-collapsible`, and there's a Vite demo in `examples/web` that aliases to the source so edits hot-reload.

```bash
pnpm install
pnpm dev     # run the demo
pnpm build   # build the library
```

## License

[MIT](./LICENSE) © Carlos Dubon
