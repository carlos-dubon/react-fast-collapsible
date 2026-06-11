import type { ComponentProps } from 'react';
import { Slider as SliderPrimitive } from '@base-ui/react/slider';
import { cn } from '@/lib/utils';

function Slider({ className, ...props }: ComponentProps<typeof SliderPrimitive.Root>) {
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={cn('relative flex w-full touch-none select-none items-center', className)}
      {...props}
    >
      <SliderPrimitive.Control className="flex w-full items-center py-1.5">
        <SliderPrimitive.Track className="relative h-1.5 w-full grow rounded-full bg-muted">
          <SliderPrimitive.Indicator className="h-full rounded-full bg-primary" />
          <SliderPrimitive.Thumb className="block size-4 shrink-0 rounded-full border border-primary bg-background shadow-sm outline-none ring-ring/50 transition-[color,box-shadow] focus-visible:ring-4" />
        </SliderPrimitive.Track>
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

export { Slider };
