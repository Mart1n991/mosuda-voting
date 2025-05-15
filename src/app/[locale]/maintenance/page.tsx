"use client";

import { useTranslations } from "next-intl";
import { InfoForm } from "./InfoForm";
import Image from "next/image";

export default function MaintenancePage() {
  const t = useTranslations("maintenancePage");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-mosuda-green-light gap-5 px-4">
      <div className="w-48 h-20 mx-auto relative">
        <Image src="/images/logo.png" alt="Mosuda Logo" width={192} height={100} />
      </div>
      <h1 className="text-center text-2xl sm:text-4xl font-bold">{t("title")}</h1>
      <p className="text-center">{t("description")}</p>
      <h3 className="text-center text-4xl font-bold">{t("date")}</h3>
      <div className="mt-10 space-y-4">
        <InfoForm className="w-full" />
      </div>
    </main>
  );
}

// This is important - it makes the page static
export const dynamic = "force-static";
