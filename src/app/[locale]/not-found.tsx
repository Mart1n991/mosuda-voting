"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { routes } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function NotFoundPage() {
  const t = useTranslations("notFoundPage");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-mosuda-green-light">
      <div className="text-center relative">
        <div className="w-48 h-20 mx-auto relative animate-bounce">
          <Image src="/images/logo.png" alt="Mosuda Logo" width={192} height={100} className="animate-pulse" />
        </div>

        <h1 className="text-8xl font-bold mb-4">404</h1>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t("title")}</h2>
        <p className="text-gray-600 mb-8">{t("description")}</p>

        <Link href={routes.home} className={cn(buttonVariants({ variant: "secondary" }), "w-full")}>
          {t("backHome")}
        </Link>
      </div>
    </main>
  );
}

// This is important - it makes the page static
export const dynamic = "force-static";
