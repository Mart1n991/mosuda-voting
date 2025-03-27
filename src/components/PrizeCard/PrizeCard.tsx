import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";

interface PrizeCardProps {
  title: string;
  description: string;
  image: string;
  price: string;
  className?: string;
  isFirstPlace?: boolean;
}

export function PrizeCard({ title, description, image, price, className, isFirstPlace }: PrizeCardProps) {
  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden transition-all hover:shadow-lg",
        isFirstPlace && "bg-mosuda-green-light",
        !className && (isFirstPlace ? "h-[500px]" : "h-[400px]"),
        className
      )}
    >
      <div className={cn("relative w-full overflow-hidden", isFirstPlace ? "h-72" : "h-48")}>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader className={cn("flex-1", isFirstPlace ? "py-8" : "py-6")}>
        <CardTitle className={cn("font-bold", isFirstPlace ? "text-3xl" : "text-xl")}>{title}</CardTitle>
        <CardDescription className={cn("font-semibold", isFirstPlace ? "text-3xl text-primary" : "text-lg text-primary")}>
          {price}
        </CardDescription>
      </CardHeader>
      <CardContent className={cn("flex-1", isFirstPlace ? "py-8" : "py-6")}>
        <p className={cn("text-black", isFirstPlace ? "text-lg" : "text-base")}>{description}</p>
      </CardContent>
    </Card>
  );
}
