import { useTranslations } from "next-intl";
import React from "react";
import Image from "next/image";
import { AppStoreButton } from "../AppStoreButton";
import { GooglePlayButton } from "../GooglePlayButton";
import { IconBrandFacebook, IconBrandInstagram } from "@tabler/icons-react";
import Link from "next/link";
export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-stone-200">
      <div className="max-w-screen-xl xl:mx-auto flex flex-col items-center justify-center gap-4 lg:flex-row lg:justify-between lg:items-start px-0 lg:px-10 xl:px-0  py-4">
        <div className="flex flex-col items-center lg:items-start">
          <Image src="/images/logo.png" alt="logo" width={150} height={100} priority />
          <p className="text-sm text-center font-light px-4 mt-2 max-w-md lg:text-left lg:px-0 lg:max-w-xs">
            {t("mosudaDescription")}
          </p>
          <div className="flex gap-4 mt-4">
            <AppStoreButton href="https://apps.apple.com/sk/app/mosuda/id1662260317?l=sk" />
            <GooglePlayButton href="https://play.google.com/store/apps/details?id=com.no_creativity_coach_of_people" />
          </div>
        </div>
        <div className="flex flex-col items-center lg:items-start gap-2">
          <p className="font-bold lg:text-lg">{t("contactUs")}</p>
          <p className="text-sm font-light">
            <a href="mailto:info@mosuda.sk">info@mosuda.sk</a>
          </p>
          <div className="flex gap-2 mt-2">
            <a href="https://www.facebook.com/mosuda.sk" className="p-2 bg-mosuda-green-light rounded-md">
              <IconBrandFacebook className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/mosuda.sk" className="p-2 bg-mosuda-green-light rounded-md">
              <IconBrandInstagram className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center lg:items-start gap-2">
          <p className="font-bold lg:text-lg">{t("company")}</p>
          <Link href="/privacy-policy" className="underline text-sm font-light">
            {t("privacyPolicy")}
          </Link>
          <Link href="/terms-of-service" className="underline text-sm font-light">
            {t("termsOfService")}
          </Link>
        </div>
      </div>

      <div className="mx-auto px-4 bg-mosuda-green-light py-4">
        <p className="text-center text-sm">
          Mosuda &copy; {new Date().getFullYear()} {t("copyright")}
        </p>
        <p className="text-center text-sm">
          {t.rich("createdBy", {
            creator: (chunks) => (
              <a className="underline text-blue-500" href="https://www.linkedin.com/in/javorsky-martin/" target="_blank">
                {chunks}
              </a>
            ),
          })}
        </p>
      </div>
    </footer>
  );
}
