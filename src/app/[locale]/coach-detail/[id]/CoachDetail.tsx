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
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-20">
        {/* Image */}
        <div className="h-[350px] sm:h-[500px] w-full md:w-auto md:flex-1 row-span-2 relative">
          <Image
            src={
              coachDetail.imageUrl === "" || coachDetail.imageUrl === "undefined" ? "/images/icon_man.png" : coachDetail.imageUrl
            }
            alt={coachDetail.name}
            fill
            className="object-cover object-top rounded-md shadow-lg"
          />
        </div>
        <div className="w-full md:w-auto md:flex-1 px-4 md:px-0">
          {/* Votes */}
          <Badge size="lg">{t("votes", { count: coachDetail.voteCount })}</Badge>

          {/* Name */}
          <div className="flex flex-col gap-4 mt-4 mb-10">
            <p className="text-3xl md:text-5xl font-bold">{coachDetail.name}</p>
            <p className="text-sm max-w-xs">{coachDetail.headline}</p>
          </div>

          {/* Form */}
          <VotingForm coachId={coachDetail.id} className="w-full" />
        </div>
      </div>
      <div className="flex flex-col px-4 md:px-0 md:flex-row gap-10 lg:gap-20 mt-10 md:w-1/2">
        {/* Description */}
        {coachDetail.description.length > 0 && (
          <div className="flex-1 mb-10">
            <p className="text-sm">{truncateText(coachDetail.description, showMore ? 100000 : 300)}</p>
            {coachDetail.description.length > 300 && (
              <Button variant="link" className="text-sm pl-0 " onClick={() => setShowMore(!showMore)}>
                {showMore ? t("showLess") : t("showMore")}
              </Button>
            )}
          </div>
        )}
        {/* Video */}
        {/* {coachDetail.youtubeLink.length > 0 && (
          <div className="flex-1">
            <iframe
              src={coachDetail.youtubeLink}
              className="w-full h-[400px]"
              title="Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )} */}
      </div>
    </div>
  );
};
