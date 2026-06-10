# TODO

Rough plan for react-fast-collapsible.

- [x] Set up the monorepo (pnpm workspaces, shared tsconfig)
- [x] Build the Collapsible component
- [ ] Animate to auto height without measuring in JS
- [ ] Forward ref + spread div props
- [ ] Opacity fade option
- [ ] Accessibility: inert when collapsed
- [ ] tsdown build (ESM + CJS + types)
- [ ] Example app to play with the props
- [ ] Write the README
- [ ] Publish to npm

Ideas / open questions:
- Measuring scrollHeight works but forces a reflow on every toggle. Is there a
  pure-CSS way to animate to height:auto? Look into the grid 0fr/1fr trick.
- The ResizeObserver keeps height in sync with dynamic content, but it's a lot
  of machinery for something the browser could do natively. Try the grid pivot.
