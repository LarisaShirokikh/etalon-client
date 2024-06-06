"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import DOMPurify from "dompurify";
import Skeleton from "./Skeleton";
import Button from "./Button";
import Pagination from "./Pagination";

const PRODUCT_PER_PAGE = 8;

interface ProductListProps {
  limit?: number;
  searchParams?: {
    category?: string;
    name?: string;
  };
}

const ProductList: React.FC<ProductListProps> = ({
  limit = PRODUCT_PER_PAGE,
  searchParams = {},
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  // Use useMemo to avoid recreating searchParams on every render
  const memoizedSearchParams = useMemo(
    () => searchParams,
    [searchParams.category, searchParams.name]
  );

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/products", {
          params: {
            limit: limit,
            skip: currentPage * limit,
            category: memoizedSearchParams.category,
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
  }, [currentPage, limit, memoizedSearchParams]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <Skeleton />;
  }

  if (products.length === 0) {
    return <div>No products found</div>;
  }

  return (
    <div className="mt-12 px-1 sm:px-5">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product: any) => (
          <Link
            href={"/" + product.slug}
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
              {product.images[0]?.items && (
                <Image
                  src={product.images[0].url || "/product.png"}
                  alt=""
                  fill
                  sizes="25vw"
                  className="absolute inset-0 object-cover rounded-md"
                />
              )}
            </div>
            <div className="flex flex-col gap-2 flex-grow">
              <span className="mt-2 font-light text-m tracking-wide text-center">
                {product.title}
              </span>
              <div className="flex flex-col items-center gap-1 sm:flex-row sm:justify-center sm:gap-2">
                {product.price.discountedPrice ? (
                  <>
                    <span className="line-through text-gray-500 text-sm sm:text-base">
                      {product.price.price}
                    </span>
                    <span className="font-semibold text-lg text-gray-700">
                      {product.price.discountedPrice} рублей
                    </span>
                  </>
                ) : (
                  <span className="font-semibold text-lg text-gray-700">
                    {product.price.price}
                  </span>
                )}
              </div>
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
            <Button text="Вызвать замерщика" />
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

export default ProductList;
