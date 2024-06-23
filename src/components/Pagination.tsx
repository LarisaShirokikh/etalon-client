import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (pageNumber: number) => {
    onPageChange(pageNumber); // Pass the 0-based index back to parent component
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 0; i < totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`rounded-md p-2 text-sm w-8 ${
            i === currentPage
              ? "bg-blue-50 text-gray-700"
              : "bg-white text-gray-700"
          } cursor-pointer`}
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
      <div className="flex flex-wrap gap-2">{renderPageNumbers()}</div>
      <button
        className="rounded-md bg-blue-50 text-gray p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-200"
        disabled={currentPage >= totalPages - 1}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Загрузить еще
      </button>
    </div>
  );
};

export default Pagination;
