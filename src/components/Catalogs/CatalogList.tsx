"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import Skeleton from "../Skeleton";

interface CatalogListProps {
  limit?: number;
  categoryId?: string;
  catalogId?: string;
  searchParams?: any;
  slug?: string;
}

const CatalogList: React.FC<CatalogListProps> = ({
  limit = 12,
  categoryId,
  catalogId,
  slug,
}) => {
  const [catalogs, setCatalogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  console.log("catalog list1", categoryId);

  useEffect(() => {
    const fetchCatalogs = async (
      
    ) => {
      setLoading(true);
      try {
        const response = await axios.get("/api/catalogs", {
          params: {
            limit,
            skip: currentPage * limit,
            categoryId,
            catalogId,
            slug,
          },
        });
        console.log("catalog list", response.data);
        setCatalogs(response.data.catalogs);
        setTotalPages(Math.ceil(response.data.totalCount / limit));
      } catch (error) {
        console.error("Error fetching catalogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalogs();
  }, [currentPage, limit, categoryId, catalogId, slug]);

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
    <div className="px-2 mt-12 ">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4  xl:grid-cols-6  gap-2 md:gap-4">
        {catalogs.map((catalog: any) => (
          <Link href={`/catalog/${catalog.slug}`} key={catalog._id}>
            <div className="relative bg-slate-100 w-full h-96 sm:h-86 md:h-96 rounded-lg overflow-hidden">
              <Image
                src={
                  catalog.images && catalog.images[0]
                    ? catalog.images[0]
                    : "/catalog.png"
                }
                alt={catalog.name}
                fill
                object-scale-down
                className=" rounded-lg"
              />
            </div>
            <h1 className="mt-1 font-light text-base sm:text-sm tracking-wide text-center">
              {catalog.name}
            </h1>
          </Link>
        ))}
      </div>
      {/* <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      /> */}
    </div>
  );
};

export default CatalogList;
