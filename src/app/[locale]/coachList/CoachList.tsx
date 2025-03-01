"use client";

import { CoachCard } from "@/components/CoachCard";
import { VotingDialog } from "@/components/VotingDialog";
import { CoachProfile } from "@/types/CoachProfile";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

type CoachListProps = {
  coachList: CoachProfile[];
};

export const CoachList = ({ coachList }: CoachListProps) => {
  const t = useTranslations("coachListPage");
  const [isVotingDialogOpen, setIsVotingDialogOpen] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState<CoachProfile | null>(null);

  const handleOpenVotingDialog = (coach: CoachProfile) => {
    setSelectedCoach(coach);
    setIsVotingDialogOpen(true);
  };

  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {coachList ? (
          coachList.map((coachProfile) => (
            <CoachCard
              key={coachProfile.id}
              coachProfile={coachProfile}
              isVotingDialogOpen={isVotingDialogOpen}
              setIsVotingDialogOpen={() => handleOpenVotingDialog(coachProfile)}
            />
          ))
        ) : (
          <h1>{t("coachList.noCoachesFound")}</h1>
        )}
        {selectedCoach && (
          <VotingDialog open={isVotingDialogOpen} onOpenChange={setIsVotingDialogOpen} coachProfile={selectedCoach} />
        )}
      </section>
    </>
  );
};
