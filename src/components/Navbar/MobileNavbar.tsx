"use client";

import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { IconMenuDeep } from "@tabler/icons-react";
import { routes } from "@/constants/routes";
import { NavItem } from "./NavItem";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CdnImage } from "../CdnImage";

type MobileNavbarProps = {
  className?: string;
};

export const MobileNavbar = ({ className }: MobileNavbarProps) => {
  const pathname = usePathname();
  const t = useTranslations("navbar");

  const pathWithoutLocale = pathname.split("/").slice(2).join("/");

  const isRouteActive = (href: string) => {
    const normalizedHref = href.startsWith("/") ? href.slice(1) : href;
    return pathWithoutLocale === normalizedHref;
  };
  return (
    <div className={className}>
      <Sheet>
        <div className="flex justify-between items-center p-4">
          <CdnImage src="/logo.png" alt="logo" width={120} height={70} />
          <SheetTrigger asChild>
            <IconMenuDeep className="size-5 cursor-pointer" />
          </SheetTrigger>
        </div>
        <SheetContent side="right" className="w-[250px] sm:w-[400px]">
          <SheetHeader className="mb-4">
            <Link href={routes.home} className="flex w-full justify-center">
              <CdnImage src="/logo.png" alt="logo" width={150} height={100} />
            </Link>
            <SheetTitle />
            <SheetDescription />
          </SheetHeader>

          <div className="flex flex-col gap-6">
            <NavItem href={routes.home} label={t("coach")} isActive={isRouteActive(routes.coach) || isRouteActive(routes.home)} />
            <NavItem href={routes.voter} label={t("voter")} isActive={isRouteActive(routes.voter)} />
            <NavItem href={routes.coaches} label={t("competitors")} isActive={isRouteActive(routes.coaches)} />
          </div>
          <SheetClose asChild>
            <Button variant="secondary" className="mt-10 w-full">
              {t("closeMenu")}
            </Button>
          </SheetClose>
        </SheetContent>
      </Sheet>
    </div>
  );
};
