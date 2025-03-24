"use client";

import Image from "next/image";
import { NavItem } from "./NavItem";
import { routes } from "@/constants/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type DesktopNavbarProps = {
  className?: string;
};

export const DesktopNavbar = ({ className }: DesktopNavbarProps) => {
  const pathname = usePathname();
  const t = useTranslations("navbar");

  return (
    <div className={cn("max-w-screen-xl xl:mx-auto flex items-center justify-between px-10 xl:px-0 py-4", className)}>
      <Link href={routes.home}>
        <Image src="/images/logo.png" alt="logo" width={150} height={100} priority />
      </Link>
      <div className="flex items-center gap-4">
        <NavItem href={routes.coach} label={t("coach")} isActive={pathname === routes.coach} />
        <NavItem href={routes.voter} label={t("voter")} isActive={pathname === routes.voter} />
        <NavItem href={routes.sponsors} label={t("sponsors")} isActive={pathname === routes.sponsors} />
        <NavItem href={routes.about} label={t("about")} isActive={pathname === routes.about} />
        <NavItem href={routes.contact} label={t("contact")} isActive={pathname === routes.contact} />
      </div>
    </div>
  );
};
