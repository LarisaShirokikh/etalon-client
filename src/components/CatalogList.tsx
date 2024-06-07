"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Skeleton from "./Skeleton";
import { ICatalog } from "@/interface/Catalog";

const PRODUCT_PER_PAGE = 12;

interface ProductListProps {
  limit?: number;
  searchParams?: {
    category?: string;
    name?: string;
  };
}

const CatalogList: React.FC<ProductListProps> = ({
  limit = PRODUCT_PER_PAGE,
  searchParams = {},
}) => {
  const [catalogs, setCatalogs] = useState<ICatalog[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const memoizedSearchParams = useMemo(() => searchParams, [searchParams]);

  useEffect(() => {
    const fetchCatalogs = async () => {
      try {
        const response = await axios.get("/api/catalogs", {
          params: {
            limit: limit,
            skip: currentPage * limit,
            category: memoizedSearchParams.category,
            name: memoizedSearchParams.name,
          },
        });
        setCatalogs(response.data);
        setTotalPages(Math.ceil(response.data.totalCount / limit));
      } catch (error) {
        console.error("Error fetching catalogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalogs();
  }, [currentPage, limit, memoizedSearchParams]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <Skeleton />;
  }

  if (catalogs.length === 0) {
    return <div>No catalogs found</div>;
  }

  return (
    <div className="px-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4  xl:grid-cols-6  gap-4 md:gap-8">
        {catalogs.map((catalog) => (
          <Link href={`/catalog/${catalog.slug}`} key={catalog.name}>
            <div className="relative bg-slate-100 w-full h-96 sm:h-86 md:h-96 rounded-lg overflow-hidden">
              <Image
                src={
                  catalog.images && catalog.images[0]
                    ? catalog.images[0]
                    : "/catalog.png"
                }
                alt={catalog.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover rounded-lg"
              />
            </div>
            <h1 className="mt-2 font-light text-base sm:text-sm tracking-wide text-center">
              {catalog.name}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CatalogList;
