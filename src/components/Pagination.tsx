import React from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
  count: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  hasNext,
  hasPrevious,
  onPageChange,
  count,
}: PaginationProps) {
  const totalPages = Math.ceil(count / 20);

  const generatePageNumbers = () => {
    const pages = [];
    const range = 2;

    for (let i = currentPage - range; i < currentPage; i++) {
      if (i > 0) pages.push(i);
    }

    pages.push(currentPage);

    for (let i = currentPage + 1; i <= currentPage + range; i++) {
      if (i <= totalPages) pages.push(i);
    }

    return pages;
  };

  const pages = generatePageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevious}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {pages.map((page, index) => (
        <React.Fragment key={page}>
          {index === 0 && page > 1 && <span className="px-3 py-1">٠٠٠</span>}

          <button
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-lg ${
              page === currentPage
                ? "bg-[#67B37D] text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {page}
          </button>

          {index === pages.length - 1 && page < totalPages && (
            <span className="px-3 py-1">٠٠٠</span>
          )}
        </React.Fragment>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
    </div>
  );
}
