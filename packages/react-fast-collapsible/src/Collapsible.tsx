import { useEffect, useRef, useState } from 'react';
import type { HTMLAttributes } from 'react';

export interface CollapsibleProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  duration?: number;
}

export function Collapsible({ open, duration = 300, children, ...rest }: CollapsibleProps) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    // Read the natural height so we can animate the outer wrapper to it.
    setHeight(el.scrollHeight);
  }, [open, children]);

  return (
    <div
      style={{
        height: open ? height : 0,
        overflow: 'hidden',
        transition: `height ${duration}ms ease`,
      }}
      {...rest}
    >
      <div ref={innerRef}>{children}</div>
    </div>
  );
}
