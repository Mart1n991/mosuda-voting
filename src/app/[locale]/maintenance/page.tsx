"use client";

import { useTranslations } from "next-intl";

export default function MaintenancePage() {
  const t = useTranslations("maintenancePage");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-mosuda-green-light">
      <p>{t("title")}</p>
    </main>
  );
}

// This is important - it makes the page static
export const dynamic = "force-static";
