"use client";

import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Prize } from "./types";
import { PrizeCard } from "./PrizeCard";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type PrizeCarouselProps = {
  prizes: Prize[];
  className?: string;
};

export function PrizeCarousel({ prizes, className }: PrizeCarouselProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (!carouselApi) return;

    const interval = setInterval(() => {
      carouselApi.scrollNext();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [carouselApi]);

  return (
    <Carousel className={cn("w-full max-w-lg", className)} opts={{ loop: true }} setApi={setCarouselApi}>
      <CarouselContent>
        {prizes.map((prize) => (
          <CarouselItem key={prize.title}>
            <div className="p-1">
              <PrizeCard {...prize} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex" />
      <CarouselNext className="hidden sm:flex" />
    </Carousel>
  );
}
