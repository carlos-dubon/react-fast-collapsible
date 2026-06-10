import { useRef } from 'react';
import type { CSSProperties, HTMLAttributes } from 'react';
import { useAutoHeight } from './useAutoHeight';

export interface CollapsibleProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  duration?: number;
}

export function Collapsible({ open, duration = 300, style, children, ...rest }: CollapsibleProps) {
  const innerRef = useRef<HTMLDivElement>(null);
  const height = useAutoHeight(innerRef, [children]);

  const containerStyle: CSSProperties = {
    height: open ? height : 0,
    overflow: 'hidden',
    transition: `height ${duration}ms ease`,
    ...style,
  };

  return (
    <div style={containerStyle} {...rest}>
      <div ref={innerRef}>{children}</div>
    </div>
  );
}
