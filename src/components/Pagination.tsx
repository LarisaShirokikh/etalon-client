"use client";

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
    if (pageNumber >= 0 && pageNumber < totalPages) {
      onPageChange(pageNumber);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const firstPage = 0;
    const secondPage = 1;
    const lastPage = totalPages - 1;
    const penultimatePage = totalPages - 2;

    const shouldShowEllipsis = (index: number) => {
      if (
        index === firstPage ||
        index === secondPage ||
        index === lastPage ||
        index === penultimatePage
      ) {
        return false;
      }
      if (Math.abs(currentPage - index) <= 1) {
        return false;
      }
      return true;
    };

    for (let i = 0; i < totalPages; i++) {
      if (shouldShowEllipsis(i)) {
        if (i === currentPage - 2 || i === currentPage + 2) {
          pageNumbers.push(
            <span key={i} className="text-gray-500">
              ...
            </span>
          );
        }
      } else {
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
    }

    return pageNumbers;
  };

  return (
    <div className="mt-12 flex justify-center items-center gap-2 w-full">
      <button
        className="rounded-md bg-blue-50 text-gray p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-200"
        disabled={currentPage <= 0}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Назад
      </button>
      <div className="flex flex-wrap gap-2">{renderPageNumbers()}</div>
      <button
        className="rounded-md bg-blue-50 text-gray p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-200"
        disabled={currentPage >= totalPages - 1}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Вперед
      </button>
    </div>
  );
};

export default Pagination;
