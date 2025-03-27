import { useTranslations } from "next-intl";
import { PrizeCard } from "./PrizeCard";

export function PrizeCards() {
  const t = useTranslations("homePage");

  const prizes = [
    {
      title: t("secondPlace"),
      description: t("prize2Description"),
      image: "/images/prizes/second-place.jpg",
      price: "5 000 €",
    },
    {
      title: t("firstPlace"),
      description: t("prize1Description"),
      image: "/images/prizes/first-place.jpg",
      price: "10 000 €",
      isFirstPlace: true,
    },
    {
      title: t("thirdPlace"),
      description: t("prize3Description"),
      image: "/images/prizes/third-place.jpg",
      price: "2 500 €",
    },
  ];
  return (
    <div className="container mx-auto px-0 sm:px-4 py-10">
      {/* Mobile view: First place on top */}
      <div className="sm:hidden grid grid-cols-1 gap-6">
        <PrizeCard {...prizes[1]} className="h-[500px]" />
        <PrizeCard {...prizes[0]} />
        <PrizeCard {...prizes[2]} />
      </div>

      {/* Desktop view: First place in middle */}
      <div className="hidden md:grid md:grid-cols-3 md:gap-6">
        <PrizeCard {...prizes[0]} />
        <PrizeCard {...prizes[1]} className="h-[500px]" />
        <PrizeCard {...prizes[2]} />
      </div>

      {/* Tablet view: First place on top, second and third in one row */}
      <div className="hidden sm:block md:hidden">
        <PrizeCard {...prizes[1]} className="h-[500px]" />
        <div className="grid grid-cols-2 gap-6 mt-6">
          <PrizeCard {...prizes[0]} />
          <PrizeCard {...prizes[2]} />
        </div>
      </div>
    </div>
  );
}
