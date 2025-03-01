"use client";

import { CoachProfile } from "@/types/CoachProfile";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { truncateText } from "@/utils/truncateText";

type CoachCardProps = {
  coachProfile: CoachProfile;
  isVotingDialogOpen: boolean;
  setIsVotingDialogOpen: (open: boolean) => void;
};

export const CoachCard = ({ coachProfile, setIsVotingDialogOpen }: CoachCardProps) => {
  const t = useTranslations("coachListPage.coachCard");

  const renderImage = () => {
    const imageStyle = "object-cover rounded-t-xl";

    if (!coachProfile.imageUrl) {
      if (coachProfile.gender === 0) {
        return <Image src="/images/icon_woman.png" alt={coachProfile.name} fill className={imageStyle} />;
      }
      return <Image src="/images/icon_man.png" alt={coachProfile.name} fill className={imageStyle} />;
    }

    return <Image src={coachProfile.imageUrl} alt={coachProfile.name} fill className={imageStyle} />;
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl shadow-lg max-w-[350px] h-full transition-transform duration-300 ease-in-out transform hover:-translate-y-1">
      <div className="relative w-full h-[250px] cursor-pointer">{renderImage()}</div>
      <div className="p-4 sm:p-6 flex flex-col gap-4 flex-grow">
        <div className="flex flex-col gap-1">
          <div className="flex gap-4 items-center">
            <p>{t("numberOfVotes")}</p>
            <Badge>{coachProfile.voteCount}</Badge>
          </div>
          <h2 className="text-xl font-bold">{truncateText(coachProfile.name, 40)}</h2>
        </div>

        <div className="flex justify-between items-center mt-auto">
          <Button onClick={() => setIsVotingDialogOpen(true)}>{t("voteButton")}</Button>
          <Button variant="link">{t("moreInfoButton")}</Button>
        </div>
      </div>
    </div>
  );
};
