"use client";

import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Prize } from "./types";
import { PrizeCard } from "./PrizeCard";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type PrizeCarouselProps = {
  prizes: Prize[];
  className?: string;
};

export function PrizeCarousel({ prizes, className }: PrizeCarouselProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!carouselApi) return;

    // Start autoplay
    const startAutoplay = () => {
      if (intervalRef.current) return; // already running
      intervalRef.current = setInterval(() => {
        carouselApi.scrollNext();
      }, 3000);
    };

    // Stop autoplay
    const stopAutoplay = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    if (!isHovered) startAutoplay();
    else stopAutoplay();

    return () => stopAutoplay();
  }, [carouselApi, isHovered]);

  return (
    <div
      className={cn("w-full max-w-lg", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Carousel className={cn("w-full max-w-lg", className)} opts={{ loop: true }} setApi={setCarouselApi}>
        <CarouselContent>
          {prizes.map((prize) => (
            <CarouselItem key={prize.id}>
              <div className="p-1">
                <PrizeCard {...prize} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
}
