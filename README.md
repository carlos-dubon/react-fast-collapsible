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

## Install

```bash
npm i react-fast-collapsible
```

> One gotcha: put padding and margins on the **content** (`innerClassName`), not the outer container. The outer element has to be able to collapse all the way to zero.

```tsx
<Collapsible open={open} innerClassName="p-4">
  ...
</Collapsible>
```

## License

[MIT](./LICENSE)
