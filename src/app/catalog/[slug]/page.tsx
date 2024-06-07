"use client";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "dompurify";
import Skeleton from "@/components/Skeleton";
import Button from "@/components/Button";
import Breadcrumbs from "@/components/BreadCrumbs";
import Pagination from "@/components/Pagination";
import { usePathname, useSearchParams } from "next/navigation";

const PRODUCT_PER_PAGE = 12;

interface CatalogListProps {
  limit?: number;
}

const CatalogProducts: React.FC<CatalogListProps> = ({
  limit = PRODUCT_PER_PAGE,
}) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const slug = pathname?.split("/").pop();


  const memoizedSearchParams = useMemo(
    () => ({
      catalog: searchParams.get("catalog"),
      name: searchParams.get("name"),
    }),
    [searchParams]
  );

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        if (!slug) {
          throw new Error("Slug not found");
        }
        const response = await axios.get(`/api/catalogs/${slug}/products`, {
          params: {
            limit,
            skip: currentPage * limit,
            catalog: memoizedSearchParams.catalog,
            name: memoizedSearchParams.name,
          },
        });
        setProducts(response.data.products);
        setTotalPages(Math.ceil(response.data.totalCount / limit));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [slug, currentPage, memoizedSearchParams, limit]);

  if (!slug) {
    return <div>Loading...</div>;
  }

  if (loading) {
    return <Skeleton />;
  }

  if (products.length === 0) {
    return <div>No products found</div>;
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="mt-12 px-1 sm:px-5">
      <Breadcrumbs />
      <div className="grid grid-cols-2 mt-12 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <Link
            href={`/${product.slug}`}
            className="flex flex-col gap-2 group p-2 bg-white rounded-md"
            key={product._id}
          >
            <div className="relative w-full h-48 overflow-hidden rounded-md">
              <Image
                src={product.images[0] || "/product.png"}
                alt={product.title}
                layout="fill"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-contain w-full h-full group-hover:opacity-75 transition-opacity duration-300"
              />
            </div>
            <div className="flex flex-col gap-2 flex-grow">
              <span className="mt-2 font-light text-m tracking-wide text-center">
                {product.title}
              </span>
              <div className="flex items-center gap-2">
                {product.price.discountedPrice ? (
                  <>
                    <span className="line-through text-gray-500">
                      {product.price.price} рублей
                    </span>
                    <span className="font-semibold text-lg text-gray-700">
                      {product.price.discountedPrice} рублей
                    </span>
                  </>
                ) : (
                  <span className="font-semibold text-lg text-gray-700">
                    {product.price.price} рублей
                  </span>
                )}
              </div>
              {product.additionalInfoSections && (
                <div
                  className="text-sm text-gray-500"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      product.additionalInfoSections.find(
                        (section: any) => section.title === "shortDesc"
                      )?.description || ""
                    ),
                  }}
                ></div>
              )}
              <div className="flex-grow"></div>
              <Button text="Вызвать замерщика" />
            </div>
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

export default CatalogProducts;
