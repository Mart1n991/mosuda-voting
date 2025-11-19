import { Navbar } from "@/components/Navbar";
import { useTranslations } from "next-intl";
import React from "react";
import { stepList } from "./stepsList";
import IncreaseChanceCard from "@/components/IncreaseChanceCard/IncreaseChanceCard";

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
        <p className="whitespace-pre-line text-center pt-2">{t("subtitle")}</p>
        <div className="grid">
          {stepList.map((stepItem) => (
            <div key={stepItem.id} className="mt-6">
              <IncreaseChanceCard stepItem={stepItem} />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
