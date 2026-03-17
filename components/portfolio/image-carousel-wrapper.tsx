"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface ImageCarouselWrapperProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wraps a group of image elements (from rehype-image-carousel) in a Carousel.
 * Each child is wrapped in CarouselItem so only one shows at a time.
 */
export function ImageCarouselWrapper({
  children,
  className,
}: ImageCarouselWrapperProps) {
  const items = Array.isArray(children) ? children : [children];

  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      className={cn("my-6 w-full", className)}
    >
      <CarouselContent className="-ml-2 sm:-ml-4">
        {items.map((child, index) => (
          <CarouselItem
            key={index}
            className="pl-2 sm:pl-4 basis-full min-w-0"
          >
            {child}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2 sm:left-4" />
      <CarouselNext className="right-2 sm:right-4" />
    </Carousel>
  );
}
