import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCarouselScroll } from '@/shared/hooks/useCarouselScroll';
import { cn } from '@/shared/lib/utils';

interface HorizontalCarouselProps {
  itemKeys: string[];
  renderItem: (key: string) => React.ReactNode;
  prevLabel: string;
  nextLabel: string;
  itemClassName?: string;
}

export function HorizontalCarousel({
  itemKeys,
  renderItem,
  prevLabel,
  nextLabel,
  itemClassName,
}: HorizontalCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { canScrollPrev, canScrollNext, scrollPrev, scrollNext } =
    useCarouselScroll(scrollRef as React.RefObject<HTMLDivElement>);

  return (
    <div className="relative overflow-hidden">
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {itemKeys.map((key) => (
          <div
            key={key}
            className={cn('min-w-0 flex-none w-full snap-start', itemClassName)}
          >
            {renderItem(key)}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-2 mt-4">
        <Button
          size="icon"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          aria-label={prevLabel}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          onClick={scrollNext}
          disabled={!canScrollNext}
          aria-label={nextLabel}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
