import { forwardRef } from 'react';
import type { CSSProperties, HTMLAttributes } from 'react';

export interface CollapsibleProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  duration?: number;
  easing?: string;
  animateOpacity?: boolean;
  innerClassName?: string;
  innerStyle?: CSSProperties;
}

export const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(function Collapsible(
  {
    open,
    duration = 300,
    easing = 'ease',
    animateOpacity = true,
    innerClassName,
    innerStyle,
    className,
    style,
    children,
    ...rest
  },
  ref,
) {
  const transition = animateOpacity
    ? `grid-template-rows ${duration}ms ${easing}, opacity ${duration}ms ${easing}`
    : `grid-template-rows ${duration}ms ${easing}`;

  const containerStyle: CSSProperties = {
    display: 'grid',
    gridTemplateRows: open ? '1fr' : '0fr',
    transition,
    ...(animateOpacity ? { opacity: open ? 1 : 0 } : null),
    ...style,
  };

  const closedProps: { inert?: boolean } = open ? {} : { inert: true };

  return (
    <div ref={ref} className={className} style={containerStyle} {...rest}>
      <div style={{ minHeight: 0, overflow: 'hidden' }} {...closedProps}>
        <div className={innerClassName} style={innerStyle}>
          {children}
        </div>
      </div>
    </div>
  );
});

Collapsible.displayName = 'Collapsible';
