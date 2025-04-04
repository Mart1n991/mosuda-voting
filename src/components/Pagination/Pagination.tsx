import { useTranslations } from "next-intl";
import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

type PaginationProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
  totalPages: number;
};

export function Pagination({ currentPage, onPageChange, isLoading, totalPages }: PaginationProps) {
  const t = useTranslations("coachListPage.pagination");
  const maxVisiblePages = 5;

  const handlePageClick = (page: number) => {
    if (page < 1 || page > totalPages || isLoading) return;
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const halfMaxPages = Math.floor(maxVisiblePages / 2);

    // Always show first page
    pages.push(
      <PaginationItem key={1}>
        <PaginationLink
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handlePageClick(1);
          }}
          isActive={currentPage === 1}
          className={isLoading ? "pointer-events-none opacity-50" : ""}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    // Calculate start and end of visible pages
    let startPage = Math.max(2, currentPage - halfMaxPages);
    let endPage = Math.min(totalPages - 1, currentPage + halfMaxPages);

    // Adjust start and end if we're near the beginning or end
    if (currentPage <= halfMaxPages) {
      startPage = 2;
      endPage = maxVisiblePages;
    } else if (currentPage > totalPages - halfMaxPages) {
      startPage = totalPages - maxVisiblePages + 1;
      endPage = totalPages - 1;
    }

    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pages.push(
        <PaginationItem key="ellipsis1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Add visible page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageClick(i);
            }}
            isActive={currentPage === i}
            className={isLoading ? "pointer-events-none opacity-50" : ""}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pages.push(
        <PaginationItem key="ellipsis2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Always show last page if there is more than one page
    if (totalPages > 1) {
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageClick(totalPages);
            }}
            isActive={currentPage === totalPages}
            className={isLoading ? "pointer-events-none opacity-50" : ""}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <ShadcnPagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageClick(currentPage - 1);
            }}
            className={isLoading ? "pointer-events-none opacity-50" : ""}
            aria-label={t("previousPage")}
            label=""
          />
        </PaginationItem>

        {renderPageNumbers()}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageClick(currentPage + 1);
            }}
            className={isLoading ? "pointer-events-none opacity-50" : ""}
            aria-label={t("nextPage")}
            label=""
          />
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  );
}
