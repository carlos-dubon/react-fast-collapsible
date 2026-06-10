import type { CSSProperties, HTMLAttributes } from 'react';

export interface CollapsibleProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  duration?: number;
  easing?: string;
}

export function Collapsible({
  open,
  duration = 300,
  easing = 'ease',
  style,
  children,
  ...rest
}: CollapsibleProps) {
  const containerStyle: CSSProperties = {
    display: 'grid',
    gridTemplateRows: open ? '1fr' : '0fr',
    transition: `grid-template-rows ${duration}ms ${easing}`,
    ...style,
  };

  return (
    <div style={containerStyle} {...rest}>
      <div style={{ minHeight: 0, overflow: 'hidden' }}>{children}</div>
    </div>
  );
}
