import { Navbar } from "@/components/Navbar";
import { useTranslations } from "next-intl";
import React from "react";
import { stepList } from "./stepsList";
import IncreaseChanceCard from "@/components/IncreaseChanceCard/IncreaseChanceCard";
import { cn } from "@/lib/utils";

export default function IncreaseChancePage() {
  const t = useTranslations("increaseChancePage");

  return (
    <>
      <Navbar />
      <main className="max-w-screen-xl xl:mx-auto my-10 mx-6 flex flex-col items-center">
        <h1 className="text-center text-2xl md:text-4xl font-bold">
          {t.rich("title", {
            section: (chunks) => (
              <span className="underline decoration-mosuda-green-light">
                {chunks}
              </span>
            ),
          })}
        </h1>
        <p className="md:whitespace-pre-line mt-2 text-stone-700 text-center text-sm md:text-base">
          {t("subtitle")}
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10 mb-20">
          {stepList.map((stepItem) => (
            <div
              key={stepItem.id}
              className={cn("mt-6", stepItem.step === 4 && "lg:col-span-2")}
            >
              <IncreaseChanceCard stepItem={stepItem} />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
