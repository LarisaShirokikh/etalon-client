"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import DOMPurify from "dompurify";
import Skeleton from "../Skeleton";
import Link from "next/link";

const PRODUCT_PER_PAGE = 8;

interface ProductListProps {
  limit?: number;
  categoryId?: string;
  catalogId?: string;
  searchParams?: any;
  slug?: string;
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

  if (loading) {
    return <Skeleton />;
  }

  if (products.length === 0) {
    return <div>No products found</div>;
  }

  return (
    <div className="">
      <div className="grid grid-cols-2 m-2 p-2 sm:grid-cols-2 gap-4 p-2 m-2 border rounded-lg">
        {products.map((product: any) => (
          <Link
            href={"/" + product.slug}
            key={product._id}
            className="w-full rounded-md overflow-hidden bg-white flex flex-col justify-center items-center"
          >
            <div className="relative h-48 w-48">
              <Image
                src={product.images[0] || "/product.png"}
                alt={product.title}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xs  text-gray-800 overflow-hidden line-clamp-2">
                {product.title}
              </h3>
              <div className="mt-1 flex">
                {product.price.discountedPrice ? (
                  <>
                    <span className="text-red-700  text-s">
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
        ))}
      </div>
    </div>
  );
};

export default ProductList;
