"use client";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "dompurify";
import Skeleton from "@/components/Skeleton";
import Button from "@/components/Button";
import Breadcrumbs from "@/components/BreadCrumbs";
import { ICatalog } from "@/interface/Catalog";
import Pagination from "@/components/Pagination";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const CATALOG_PER_PAGE = 12;

interface CategoryCatalogsProps {
  limit?: number;
  searchParams?: {
    category?: string;
    name?: string;
  };
}

const CategoryCatalogs: React.FC<CategoryCatalogsProps> = ({
  limit = CATALOG_PER_PAGE,
}) => {
  const [catalogs, setCatalogs] = useState<ICatalog[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const slug = pathname?.split("/").pop();

  const memoizedSearchParams = useMemo(
    () => ({
      category: searchParams.get("category"),
      name: searchParams.get("name"),
    }),
    [searchParams.get("category"), searchParams.get("name")]
  );

  useEffect(() => {
    const fetchCatalogs = async () => {
      setLoading(true);
      try {
        if (slug) {
          console.log("category", slug);
          const response = await axios.get(`/api/categories/${slug}/catalogs`, {
            params: {
              limit: limit,
              skip: currentPage * limit,
              category: memoizedSearchParams.category,
              name: memoizedSearchParams.name,
            },
          });
         if (response.data.catalogs.length === 0) {
           const router = useRouter();
           router.push("/404"); // Redirect to 404
           return;
         }
          setCatalogs(response.data.catalogs);
          setTotalPages(Math.ceil(response.data.totalCount / limit));
        }
      } catch (error) {
        console.error("Error fetching catalogs:", error);
      } finally {
        setLoading(false);
      }
    };
    if (slug) {
      fetchCatalogs();
    }
  }, [
    slug,
    currentPage,
    memoizedSearchParams.category,
    memoizedSearchParams.name,
  ]);

  if (!slug) {
    return <div>Loading...</div>;
  }
  if (loading) {
    return <Skeleton />;
  }

  if (catalogs.length === 0) {
    return <div>No catalogs found</div>;
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="px-4 mt-12 mb-12">
      <Breadcrumbs />
      {/* <BrandHeader brand={brand} /> */}
      <div className="grid grid-cols-2 mt-12 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-8">
        {catalogs.map((catalog) => (
          <Link href={`/catalog/${catalog.slug}`} key={catalog._id}>
            <div className="relative bg-slate-100 w-full h-96">
              <Image
                src={
                  catalog.images && catalog.images[0]
                    ? catalog.images[0]
                    : "/catalog.png"
                }
                alt={catalog.name}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover"
              />
            </div>
            <h1 className="mt-2 font-light text-m tracking-wide text-center">
              {catalog.name}
            </h1>
          </Link>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CategoryCatalogs;
