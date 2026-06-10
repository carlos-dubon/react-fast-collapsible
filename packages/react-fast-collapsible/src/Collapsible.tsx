import { forwardRef } from 'react';
import type { CSSProperties, HTMLAttributes } from 'react';

export interface CollapsibleProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  duration?: number;
  easing?: string;
  innerClassName?: string;
  innerStyle?: CSSProperties;
}

export const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(function Collapsible(
  {
    open,
    duration = 300,
    easing = 'ease',
    innerClassName,
    innerStyle,
    className,
    style,
    children,
    ...rest
  },
  ref,
) {
  const containerStyle: CSSProperties = {
    display: 'grid',
    gridTemplateRows: open ? '1fr' : '0fr',
    transition: `grid-template-rows ${duration}ms ${easing}`,
    ...style,
  };

  return (
    <div ref={ref} className={className} style={containerStyle} {...rest}>
      <div style={{ minHeight: 0, overflow: 'hidden' }}>
        <div className={innerClassName} style={innerStyle}>
          {children}
        </div>
      </div>
    </div>
  );
});

Collapsible.displayName = 'Collapsible';
