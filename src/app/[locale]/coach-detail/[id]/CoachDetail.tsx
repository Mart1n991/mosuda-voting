"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VotingForm } from "@/components/VotingForm";
import { CoachProfile } from "@/types/CoachProfile";
import { truncateText } from "@/utils/truncateText";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";

type CoachDetailProps = {
  coachDetail: CoachProfile;
};

export const CoachDetail = ({ coachDetail }: CoachDetailProps) => {
  const t = useTranslations("coachDetailPage");
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="grid grid-cols-[1fr_1fr_150px] grid-rows-[85px_1fr_1fr] gap-10">
      {/* Image */}
      <div className="size-[500px] row-span-2 relative">
        <Image
          src={coachDetail.imageUrl === "" ? "/images/icon_man.png" : coachDetail.imageUrl}
          alt={coachDetail.name}
          fill
          className="object-cover rounded-md shadow-lg"
        />
      </div>
      {/* Name */}
      <div className="flex flex-col gap-4">
        <p className="text-5xl font-bold">{coachDetail.name}</p>
        <p className="text-sm max-w-xs">{coachDetail.headline}</p>
      </div>
      {/* Votes */}
      <div>
        <Badge size="lg">{t("votes", { count: coachDetail.voteCount })}</Badge>
      </div>
      {/* Form */}
      <div className="col-start-2 col-end-4">
        <VotingForm coachId={coachDetail.id} />
      </div>
      {/* Description */}
      <div>
        <p className="text-sm">{truncateText(coachDetail.description, showMore ? 100000 : 300)}</p>
        {coachDetail.description.length > 300 && (
          <Button variant="link" className="text-sm pl-0" onClick={() => setShowMore(!showMore)}>
            {showMore ? t("showLess") : t("showMore")}
          </Button>
        )}
      </div>
      {/* Video */}
      <div className="col-start-2 col-end-4">
        <iframe
          src={coachDetail.youtubeLink}
          className="w-full h-full"
          title="Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};
