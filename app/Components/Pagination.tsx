import { useState } from "react";

interface PaginationProps {
  offset: number;
  setOffset: (offset: number) => void;
  limit: number;
  totalResults: number;
}

export default function Pagination({
  offset,
  setOffset,
  limit,
  totalResults,
}: PaginationProps) {
  const totalPages = Math.ceil(totalResults / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  return (
    <div className="mt-6 flex flex-col-reverse gap-3  items-center justify-between">
      {/* Results Text */}
      <span className="text-sm text-gray-700 mb-4 sm:mb-0">
        {offset + 1} – {Math.min(offset + limit, totalResults)} of {totalResults} results
      </span>

      {/* Pagination Controls */}
      <div className="flex items-center space-x-2">
        {/* Previous Button */}
        <button
          onClick={() => setOffset(offset - limit)}
          disabled={offset === 0}
          className={`px-2 py-1 rounded-md text-sm ${
            offset === 0 ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-300"
          }`}
        >
          ◀
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setOffset(idx * limit)}
            className={`px-3 py-1 rounded-md text-sm ${
              offset === idx * limit
                ? "bg-[var(--text-secondary)] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } transition-colors`}
          >
            {idx + 1}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => setOffset(offset + limit)}
          disabled={offset + limit >= totalResults}
          className={`px-2 py-1 rounded-md text-sm ${
            offset + limit >= totalResults ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-300"
          }`}
        >
          ▶
        </button>
      </div>
    </div>
  );
}
