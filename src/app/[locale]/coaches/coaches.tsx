"use client";

import { CoachCard } from "@/components/CoachCard";
import { VotingDialog } from "@/components/VotingDialog";
import { CoachProfile } from "@/types/CoachProfile";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/Pagination";
import { fetchCoaches } from "./actions";
import { SearchBar } from "@/components/Searchbar";
import { useDebounce } from "@/hooks/useDebounce";
import { Loader2 } from "lucide-react";

type CoachesProps = {
  initialCoachList: CoachProfile[];
  pageSize: number;
  initialPage: number;
  totalCount: number;
};

export const Coaches = ({ initialCoachList, pageSize, initialPage, totalCount }: CoachesProps) => {
  const t = useTranslations("coachListPage");
  const [isVotingDialogOpen, setIsVotingDialogOpen] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState<CoachProfile | null>(null);
  const [coachList, setCoachList] = useState<CoachProfile[]>(initialCoachList);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
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
      const { data: response, error } = await fetchCoaches(pageSize, nextPage, debouncedSearch);
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

  const handlePageChange = async (page: number) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const { data: response, error } = await fetchCoaches(pageSize, page, debouncedSearch);
      if (error) throw new Error(error);
      if (!response) throw new Error("No response from server");

      setCoachList(response.profiles);
      setCurrentPage(page);
      setHasMore(response.profiles.length === pageSize);
      setSearchTotalCount(response.totalCount);
    } catch (error) {
      console.error("Error changing page:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Effect to handle search
  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);
      try {
        const { data: response, error } = await fetchCoaches(pageSize, 1, debouncedSearch);
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

  return (
    <>
      <SearchBar placeholder={t("searchbar.placeholder")} className="mb-10" onSearch={setSearchQuery} isLoading={isLoading} />
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
            />
          ))
        ) : (
          <h1 className="col-span-full text-center">{t("coachList.noCoachesFound")}</h1>
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

        <Pagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          isLoading={isLoading}
          totalPages={Math.ceil(searchTotalCount / pageSize)}
        />
      </div>
    </>
  );
};
