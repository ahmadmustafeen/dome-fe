"use client";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useEffect, useMemo } from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  /** When provided, renders "Showing X–Y of Z results" */
  totalCount?: number;
  /** Items per page — used only for the summary text */
  pageSize?: number;
}

const MAX_VISIBLE = 5;

/** Shared reusable pagination control used across all tables. */
const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
  totalCount,
  pageSize = 10,
}: PaginationProps) => {
  // Guard: if the current page exceeds total pages (e.g. after delete), reset
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      onPageChange(Math.max(1, totalPages));
    }
  }, [currentPage, totalPages, onPageChange]);

  const pages = useMemo<(number | "...")[]>(() => {
    if (totalPages <= MAX_VISIBLE) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const result: (number | "...")[] = [1];
    const start = Math.max(2, Math.min(currentPage - 1, totalPages - 3));
    const end = Math.min(totalPages - 1, start + 2);
    if (start > 2) {
      result.push("...");
    }
    for (let i = start; i <= end; i++) {
      result.push(i);
    }
    if (end < totalPages - 1) {
      result.push("...");
    }
    result.push(totalPages);
    return result;
  }, [totalPages, currentPage]);

  if (totalPages <= 1 && totalCount == null) {
    return null;
  }

  const from = totalCount != null ? (currentPage - 1) * pageSize + 1 : null;
  const to =
    totalCount != null ? Math.min(currentPage * pageSize, totalCount) : null;

  const base =
    "flex h-8 w-8 items-center justify-center rounded border text-xs font-medium transition-colors";
  const active = `${base} border-primary bg-primary text-white`;
  const normal = `${base} border-gray-300 bg-white text-gray-700 hover:bg-gray-50`;
  const disabled = `${base} border-gray-200 bg-white text-gray-300 cursor-not-allowed`;

  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
      {/* Summary */}
      <p className="text-sm text-gray-500">
        {totalCount != null && from != null && to != null
          ? `Showing ${from}–${to} of ${totalCount}`
          : totalPages > 1
            ? `Page ${currentPage} of ${totalPages}`
            : ""}
      </p>

      {/* Controls */}
      {totalPages > 1 && (
        <div className="flex items-center gap-1">
          {/* First */}
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className={currentPage === 1 ? disabled : normal}
            aria-label="First page"
          >
            <ChevronsLeft className="h-3.5 w-3.5" />
          </button>

          {/* Previous */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={currentPage === 1 ? disabled : normal}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>

          {/* Page numbers + ellipsis */}
          {pages.map((page, idx) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-before-${pages[idx + 1] ?? "end"}`}
                  className="flex h-8 w-6 items-center justify-center text-xs text-gray-400"
                >
                  …
                </span>
              );
            }
            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={page === currentPage ? active : normal}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </button>
            );
          })}

          {/* Next */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={currentPage === totalPages ? disabled : normal}
            aria-label="Next page"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>

          {/* Last */}
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className={currentPage === totalPages ? disabled : normal}
            aria-label="Last page"
          >
            <ChevronsRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

export { Pagination };
