"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination = ({
  currentPage,
  totalPages,
  hasPrev,
  hasNext,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
  onPageChange: (page: number) => void;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    router.push(`${pathname}?${params.toString()}`);
    onPageChange(pageNumber); // Update the current page
  };

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 0 && pageNumber < totalPages) {
      createPageUrl(pageNumber);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 0; i < totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`rounded-md p-2 text-sm ${
            i === currentPage ? "bg-blue-50 text-gray" : "bg-white text-black"
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i + 1}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="mt-12 flex justify-center items-center gap-2 w-full">
      <button
        className="rounded-md bg-blue-50 text-gray p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-black-20"
        disabled={!hasPrev}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Назад
      </button>
      {renderPageNumbers()}
      <button
        className="rounded-md bg-blue-50 text-gray p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-black-20"
        disabled={!hasNext}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Вперед
      </button>
    </div>
  );
};

export default Pagination;
