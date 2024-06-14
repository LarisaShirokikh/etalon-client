"use client";
import axios from "axios";
import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import Skeleton from "../Skeleton";
import Link from "next/link";
import { IProduct } from "@/interface/Product";


interface ProductListProps {
  limit?: number;
  categoryId?: string;
  catalogId?: string;
  searchParams?: any;
  slug?: string;
}

const ProductList: React.FC<ProductListProps> = ({
  categoryId,
  catalogId,
  slug,
  searchParams,
}) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver>();

  const lastProductElementRef = useCallback(
    (node: HTMLAnchorElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/products", {
          params: {
            categoryId,
            catalogId,
            slug,
            searchParams,
            page,
          },
        });
        setProducts((prevProducts) => [
          ...prevProducts,
          ...response.data.products,
        ]);
        setHasMore(response.data.products.length > 0);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug, categoryId, catalogId, searchParams, page]);

  if (loading && page === 1) {
    return <Skeleton />;
  }

  if (products.length === 0 && !loading) {
    return <div>No products found</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 p-2 m-2 rounded-lg">
        {products.map((product, index) => {
          if (index === products.length - 1) {
            return (
              <Link
                href={"/" + product.slug}
                key={product._id}
                ref={lastProductElementRef}
                className="w-full rounded-md overflow-hidden bg-white flex flex-col justify-center items-center"
              >
                <div className="relative h-48 w-48">
                  <Image
                    src={product.images?.[0] || "/product.png"}
                    alt={product.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xs text-gray-800 overflow-hidden line-clamp-2">
                    {product.title}
                  </h3>
                  <div className="mt-1 flex">
                    {product.price.discountedPrice ? (
                      <>
                        <span className="text-red-700 text-s">
                          {product.price.discountedPrice} ₽.
                        </span>
                        <span className="block text-gray-500 text-xs line-through">
                          {product.price.price} ₽
                        </span>
                      </>
                    ) : (
                      <span className="text-gray-700 text-s">
                        {product.price.price} ₽.
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          } else {
            return (
              <Link
                href={"/" + product.slug}
                key={product._id}
                className="w-full rounded-md overflow-hidden bg-white flex flex-col justify-center items-center"
              >
                <div className="relative h-48 w-48">
                  <Image
                    src={product.images?.[0] || "/product.png"}
                    alt={product.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xs text-gray-800 overflow-hidden line-clamp-2">
                    {product.title}
                  </h3>
                  <div className="mt-1 flex">
                    {product.price.discountedPrice ? (
                      <>
                        <span className="text-red-700 text-s">
                          {product.price.discountedPrice} ₽.
                        </span>
                        <span className="block text-gray-500 text-xs line-through">
                          {product.price.price} ₽
                        </span>
                      </>
                    ) : (
                      <span className="text-gray-700 text-s">
                        {product.price.price} ₽.
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          }
        })}
      </div>
      {loading && <Skeleton />}
    </div>
  );
};

export default ProductList;
