"use client";

import { CoachProfile } from "@/types/CoachProfile";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { truncateText } from "@/utils/truncateText";
import Link from "next/link";
import { routes } from "@/constants/routes";

type CoachCardProps = {
  coachProfile: CoachProfile;
  isVotingDialogOpen: boolean;
  setIsVotingDialogOpen: (open: boolean) => void;
  place: number;
};

export const CoachCard = ({
  coachProfile,
  setIsVotingDialogOpen,
  place,
}: CoachCardProps) => {
  const t = useTranslations("coachListPage.coachCard");

  return (
    <div className="flex flex-col gap-4 rounded-xl shadow-lg max-w-[350px] h-full transition-transform duration-300 ease-in-out transform hover:-translate-y-1">
      <Link href={routes.coachDetail(coachProfile.id)}>
        <div className="relative w-full h-[250px] cursor-pointer">
          <Image
            src={
              coachProfile.imageUrl === "" ||
              coachProfile.imageUrl === "undefined"
                ? "/images/icon_man.png"
                : coachProfile.imageUrl
            }
            alt={coachProfile.name}
            fill
            className="object-cover rounded-t-xl"
          />
        </div>
      </Link>
      <div className="p-4 sm:p-6 flex flex-col gap-4 flex-grow">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-xs">{t("actualPlacement")}</p>
            <Badge className="bg-amber-400">{t("place", { place })}</Badge>
          </div>
          <h2 className="text-xl font-bold">
            {truncateText(coachProfile.name, 40)}
          </h2>
        </div>

        <div className="flex justify-between items-center mt-auto">
          <Button onClick={() => setIsVotingDialogOpen(true)}>
            {t("voteButton")}
          </Button>
          <Link href={routes.coachDetail(coachProfile.id)}>
            <Button variant="link" className="pr-0">
              {t("moreInfoButton")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
