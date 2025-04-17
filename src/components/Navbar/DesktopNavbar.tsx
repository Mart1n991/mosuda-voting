"use client";

import { NavItem } from "./NavItem";
import { routes } from "@/constants/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import Image from "next/image";

type DesktopNavbarProps = {
  className?: string;
};

export const DesktopNavbar = ({ className }: DesktopNavbarProps) => {
  const pathname = usePathname();
  const t = useTranslations("navbar");

  const pathWithoutLocale = pathname.split("/").slice(2).join("/");

  const isRouteActive = (href: string) => {
    const normalizedHref = href.startsWith("/") ? href.slice(1) : href;
    return pathWithoutLocale === normalizedHref;
  };

  return (
    <div className={cn("max-w-screen-xl xl:mx-auto flex items-center justify-between px-10 xl:px-0 py-4", className)}>
      <Link href={routes.home}>
        <Image src="/images/logo.png" alt="logo" width={150} height={100} priority />
      </Link>
      <div className="flex items-center gap-4">
        <NavItem href={routes.home} label={t("coach")} isActive={isRouteActive(routes.coach) || isRouteActive(routes.home)} />
        <NavItem href={routes.voter} label={t("voter")} isActive={isRouteActive(routes.voter)} />
        <NavItem href={routes.coaches} label={t("competitors")} isActive={isRouteActive(routes.coaches)} />
      </div>
    </div>
  );
};
