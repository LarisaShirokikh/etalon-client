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
    onPageChange(pageNumber); // Обновляем текущую страницу
  };

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 0 && pageNumber < totalPages) {
      createPageUrl(pageNumber);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Максимальное количество страниц для отображения

    // Определение диапазона страниц для отображения
    let startPage = currentPage - Math.floor(maxPagesToShow / 2);
    startPage = Math.max(startPage, 0);
    let endPage = startPage + maxPagesToShow - 1;
    if (endPage > totalPages - 1) {
      endPage = totalPages - 1;
      startPage = Math.max(endPage - maxPagesToShow + 1, 0);
    }

    // Добавление кнопок страниц в массив
    for (let i = startPage; i <= endPage; i++) {
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

    // Добавление многоточия, если есть страницы, которые не вошли в отображаемый диапазон
    if (startPage > 0) {
      pageNumbers.unshift(
        <span key="start-ellipsis" className="mx-2">
          ...
        </span>
      );
    }
    if (endPage < totalPages - 1) {
      pageNumbers.push(
        <span key="end-ellipsis" className="mx-2">
          ...
        </span>
      );
    }

    // Добавление общего количества страниц
    pageNumbers.push(
      <span key="total-pages" className="mx-2">
        {totalPages}
      </span>
    );

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
      <div className="flex flex-wrap justify-center items-center gap-2 w-full">
        {renderPageNumbers()}
      </div>
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
