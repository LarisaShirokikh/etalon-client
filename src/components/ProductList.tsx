"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import DOMPurify from "dompurify";
import Skeleton from "./Skeleton";

interface ProductListProps {
  limit: number;
}

const ProductList: React.FC<ProductListProps> = ({ limit }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
        console.log("Fetched products:", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
                  src={product.images?.url || "/product.png"}
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
            <button className="mt-4 self-center rounded-lg bg-black text-white py-2 px-4 text-sm hover:bg-gray-800 transition-colors">
              Вызвать замерщика
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
