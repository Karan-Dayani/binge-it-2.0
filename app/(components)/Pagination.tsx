"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { GrPrevious, GrNext } from "react-icons/gr";

export default function Pagination({
  CurrPage,
  totalPages = 500,
}: {
  CurrPage: number;
  totalPages?: number;
}) {
  const searchParams = useSearchParams();
  const pageNumbers = generatePageNumbers(CurrPage, totalPages);

  const getLink = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    return `?${params.toString()}`;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
      {/* Previous Button */}
      <Link
        href={getLink(CurrPage - 1)}
        aria-label="Previous Page"
        className={`flex items-center justify-center w-9 h-9 rounded bg-gray-700 text-white text-sm ${
          CurrPage === 1
            ? "pointer-events-none opacity-50"
            : "hover:bg-gray-600 focus:ring-2 focus:ring-purple-400"
        } transition`}
      >
        <GrPrevious className="size-4" />
      </Link>

      {/* Desktop Full Page Numbers */}
      <div className="hidden md:flex items-center gap-2">
        {pageNumbers.map((page, idx) =>
          page === "..." ? (
            <span
              key={`ellipsis-${idx}`}
              className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm"
            >
              ...
            </span>
          ) : (
            <Link
              key={`page-${page}-${idx}`}
              href={getLink(page as number)}
              aria-label={`Page ${page}`}
              className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium ${
                page === CurrPage
                  ? "bg-accent-primary text-white"
                  : "bg-gray-800 text-white hover:bg-gray-700 focus:ring-2 focus:ring-purple-400"
              } transition`}
            >
              {page}
            </Link>
          )
        )}
      </div>

      {/* Mobile Current Page Only */}
      <div className="md:hidden text-text-primary text-sm font-medium px-3">
        Page {CurrPage} of {totalPages}
      </div>

      {/* Next Button */}
      <Link
        href={getLink(CurrPage + 1)}
        aria-label="Next Page"
        className={`flex items-center justify-center w-9 h-9 rounded bg-gray-700 text-white text-sm ${
          CurrPage === totalPages
            ? "pointer-events-none opacity-50"
            : "hover:bg-gray-600 focus:ring-2 focus:ring-purple-400"
        } transition`}
      >
        <GrNext className="size-4" />
      </Link>
    </div>
  );
}

function generatePageNumbers(
  current: number,
  total: number,
  maxVisible: number = 5
): (number | "...")[] {
  const pages: (number | "...")[] = [];

  const visiblePages = Math.min(maxVisible, total);

  const half = Math.floor(visiblePages / 2);
  let start = Math.max(2, current - half);
  let end = Math.min(total - 1, current + half);

  if (current <= half) {
    start = 2;
    end = visiblePages;
  }

  if (current >= total - half) {
    start = total - visiblePages + 1;
    end = total - 1;
  }

  // Always show first page
  pages.push(1);

  // Ellipsis after first if needed
  if (start > 2) pages.push("...");

  // Core range
  for (let i = start; i <= end; i++) {
    if (i > 1 && i < total) {
      pages.push(i);
    }
  }

  // Ellipsis before last if needed
  if (end < total - 1) pages.push("...");

  // Always show last page
  if (total > 1) pages.push(total);

  return [...new Set(pages)]; // Ensures no duplicates
}
