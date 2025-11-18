"use client";

import { CoachCard } from "@/components/CoachCard";
import { VotingDialog } from "@/components/VotingDialog";
import { CoachProfile } from "@/types/CoachProfile";
import { useTranslations } from "next-intl";
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { fetchCoaches } from "./actions";
import { SearchBar } from "@/components/Searchbar";
import { useDebounce } from "@/hooks/useDebounce";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { routes } from "@/constants/routes";
import { getCoachPlacements } from "@/utils/getCoachPlacement";

const VOTING_END_DATE = new Date("2026-02-28T23:59:00");
const now = new Date();
const votingEnded = now > VOTING_END_DATE;

type CoachesProps = {
  initialCoachList: CoachProfile[];
  pageSize: number;
  initialPage: number;
  totalCount: number;
};

export const Coaches = ({
  initialCoachList,
  pageSize,
  initialPage,
  totalCount,
}: CoachesProps) => {
  const t = useTranslations("coachListPage");
  const [isVotingDialogOpen, setIsVotingDialogOpen] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState<CoachProfile | null>(null);
  const [coachList, setCoachList] = useState<CoachProfile[]>(initialCoachList);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchTotalCount, setSearchTotalCount] = useState(totalCount);
  const debouncedSearch = useDebounce(searchQuery, 1000);

  const handleOpenVotingDialog = (coach: CoachProfile) => {
    setSelectedCoach(coach);
    setIsVotingDialogOpen(true);
  };

  const loadMore = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    const nextPage = currentPage + 1;
    try {
      const { data: response, error } = await fetchCoaches(
        pageSize,
        nextPage,
        debouncedSearch
      );
      if (error) throw new Error(error);
      if (!response) throw new Error("No response from server");

      if (response.profiles.length < pageSize) {
        setHasMore(false);
      }
      setCoachList((prev) => [...prev, ...response.profiles]);
      setCurrentPage(nextPage);
      setSearchTotalCount(response.totalCount);
    } catch (error) {
      console.error("Error loading more coaches:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // const handlePageChange = async (page: number) => {
  //   if (isLoading) return;

  //   setIsLoading(true);
  //   try {
  //     const { data: response, error } = await fetchCoaches(pageSize, page, debouncedSearch);
  //     if (error) throw new Error(error);
  //     if (!response) throw new Error("No response from server");

  //     setCoachList(response.profiles);
  //     setCurrentPage(page);
  //     setHasMore(response.profiles.length === pageSize);
  //     setSearchTotalCount(response.totalCount);
  //   } catch (error) {
  //     console.error("Error changing page:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // Effect to handle search
  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);
      try {
        const { data: response, error } = await fetchCoaches(
          pageSize,
          1,
          debouncedSearch
        );
        if (error) throw new Error(error);
        if (!response) throw new Error("No response from server");

        setCoachList(response.profiles);
        setCurrentPage(1);
        setHasMore(response.profiles.length === pageSize);
        setSearchTotalCount(response.totalCount);
      } catch (error) {
        console.error("Error searching coaches:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [debouncedSearch, pageSize]);

  if (votingEnded) {
    redirect(routes.votingEnded);
  }

  const placements = useMemo(() => getCoachPlacements(coachList), [coachList]);

  return (
    <>
      <SearchBar
        placeholder={t("searchbar.placeholder")}
        className="mb-10"
        onSearch={setSearchQuery}
        isLoading={isLoading}
      />
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {isLoading && !coachList.length ? (
          <div className="col-span-full flex justify-center items-center min-h-[200px]">
            <Loader2 className="h-8 w-8 animate-spin text-mosuda-green-dark" />
          </div>
        ) : coachList.length > 0 ? (
          coachList.map((coachProfile) => (
            <CoachCard
              key={coachProfile.id}
              coachProfile={coachProfile}
              isVotingDialogOpen={isVotingDialogOpen}
              setIsVotingDialogOpen={() => handleOpenVotingDialog(coachProfile)}
              place={placements[coachProfile.id]}
            />
          ))
        ) : (
          <h1 className="col-span-full text-center">
            {t("coachList.noCoachesFound")}
          </h1>
        )}
        {selectedCoach && (
          <VotingDialog
            open={isVotingDialogOpen}
            onOpenChange={setIsVotingDialogOpen}
            coachProfile={selectedCoach}
          />
        )}
      </section>

      <div className="mt-10 flex flex-col items-center gap-4">
        {hasMore && (
          <Button
            onClick={loadMore}
            disabled={isLoading}
            className=""
            variant="outline"
          >
            {isLoading ? t("pagination.loading") : t("pagination.loadMore")}
          </Button>
        )}
        {/* {!searchQuery.length && (
          <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            isLoading={isLoading}
            totalPages={Math.ceil(searchTotalCount / pageSize)}
          />
        )} */}
      </div>
    </>
  );
};
