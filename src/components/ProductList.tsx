"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import DOMPurify from "dompurify";
import Skeleton from "./Skeleton";
import Button from "./Button";
import Pagination from "./Pagination";

const PRODUCT_PER_PAGE = 8;

interface ProductListProps {
  limit?: number;
  categoryId?: string;
  catalogId?: string;
  searchParams?: any;
  slug?: string
}

const ProductList: React.FC<ProductListProps> = ({
  limit = PRODUCT_PER_PAGE,
  categoryId,
  catalogId,
  slug,
  searchParams,
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/products", {
          params: {
            limit,
            skip: currentPage * limit,
            categoryId,
            catalogId,
            slug,
            searchParams,
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
  }, [slug, currentPage, limit, categoryId, catalogId, searchParams]);

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
    <div className="mt-6 py-4 px-2 md:px-2 lg:px-4 xl:px-4 2xl:px-8">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product: any) => (
          <Link
            href={"/" + product.slug}
            className="flex flex-col gap-2 group  bg-white rounded-md"
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
            {/* <Button text="Вызвать замерщика" /> */}
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

export default ProductList;

