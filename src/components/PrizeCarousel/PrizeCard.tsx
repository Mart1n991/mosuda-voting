import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";
import { Prize } from "./types";
import { Badge } from "../ui/badge";
import Image from "next/image";

type PrizeCardProps = Prize;

export function PrizeCard({ title, description, image, className, place }: PrizeCardProps) {
  return (
    <Card className={cn("flex flex-col border-none shadow-lg", className)}>
      <div className="relative w-full h-[300px] border-b-4 border-mosuda-green-light">
        <Image src={image} alt={title} fill className="object-cover rounded-t-lg" />
      </div>
      <CardHeader className="flex-1">
        <div>
          <Badge size="lg">{place}</Badge>
        </div>
        <CardTitle className="text-xl md:text-3xl font-bold">{title}</CardTitle>
        <CardDescription />
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-black text-sm md:text-base">{description}</p>
      </CardContent>
    </Card>
  );
}
