import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Prize } from "./types";
import { PrizeCard } from "./PrizeCard";

type PrizeCarouselProps = {
  prizes: Prize[];
};

export function PrizeCarousel({ prizes }: PrizeCarouselProps) {
  return (
    <Carousel className="w-full max-w-lg" opts={{ loop: true }}>
      <CarouselContent>
        {prizes.map((prize) => (
          <CarouselItem key={prize.title}>
            <div className="p-1">
              <PrizeCard {...prize} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
