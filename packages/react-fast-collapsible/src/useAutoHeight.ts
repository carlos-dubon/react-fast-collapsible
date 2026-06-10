import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

// Measures an element's natural height so the collapsible can animate to it.
// NOTE: reading scrollHeight forces a synchronous layout on every toggle, and
// we need a ResizeObserver on top to keep up with content that changes size.
export function useAutoHeight(ref: RefObject<HTMLElement | null>, deps: unknown[]) {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    setHeight(el.scrollHeight);

    const observer = new ResizeObserver(() => {
      setHeight(el.scrollHeight);
    });
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return height;
}
