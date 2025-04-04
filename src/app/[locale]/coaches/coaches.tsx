"use client";

import { CoachCard } from "@/components/CoachCard";
import { VotingDialog } from "@/components/VotingDialog";
import { CoachProfile } from "@/types/CoachProfile";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { fetchCoaches } from "./actions";

type CoachesProps = {
  initialCoachList: CoachProfile[];
  pageSize: number;
  initialPage: number;
};

export const Coaches = ({ initialCoachList, pageSize, initialPage }: CoachesProps) => {
  const t = useTranslations("coachListPage");
  const [isVotingDialogOpen, setIsVotingDialogOpen] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState<CoachProfile | null>(null);
  const [coachList, setCoachList] = useState<CoachProfile[]>(initialCoachList);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const handleOpenVotingDialog = (coach: CoachProfile) => {
    setSelectedCoach(coach);
    setIsVotingDialogOpen(true);
  };

  const loadMore = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    const nextPage = currentPage + 1;
    try {
      const { data: newCoaches, error } = await fetchCoaches(pageSize, nextPage);
      if (error) throw new Error(error);

      if (newCoaches && newCoaches.length < pageSize) {
        setHasMore(false);
      }
      setCoachList((prev) => [...prev, ...newCoaches]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error("Error loading more coaches:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle page change in pagination
  // const handlePageChange = async (page: number) => {
  //   if (isLoading) return;

  //   setIsLoading(true);
  //   try {
  //     const { data: newCoaches, error } = await fetchCoaches(pageSize, page);
  //     if (error) throw new Error(error);

  //     setCoachList(newCoaches);
  //     setCurrentPage(page);
  //     setHasMore(newCoaches.length === pageSize);
  //   } catch (error) {
  //     console.error("Error changing page:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

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

      <div className="mt-10 flex flex-col items-center gap-4">
        {hasMore && (
          <Button onClick={loadMore} disabled={isLoading} variant="outline" className="w-full max-w-xs">
            {isLoading ? t("pagination.loading") : t("pagination.loadMore")}
          </Button>
        )}

        {/* <Pagination currentPage={currentPage} onPageChange={handlePageChange} isLoading={isLoading} /> */}
      </div>
    </>
  );
};
