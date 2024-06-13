"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Skeleton from "../Skeleton";
import Link from "next/link";

interface ProductItemProps {
  productId?: string;
  color?: string;
  categoryId?: string;
  catalogId?: string;
  slug?: string;
  searchParams?: any;
}

const ProductItem: React.FC<ProductItemProps> = ({
  productId,
  color,
  categoryId,
  catalogId,
  slug,
  searchParams,
}) => {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) {
        console.error("No slug provided");
        return;
      }

      try {
        const response = await axios.get(`/api/products`, {
          params: {
            categoryId,
            productId,
            catalogId,
            slug,
            searchParams,
          },
        });
        
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } 
    };

    fetchProduct();
  }, [productId, categoryId, catalogId, slug, searchParams]);

  

  if (!product) {
    return (
      <div>
        <Skeleton />
      </div>
    );
  }

  return (
    <Link href={`/${product.slug}`}>
      <div className="w-full  rounded-md overflow-hidden bg-white flex flex-col justify-center items-center">
        <div className="relative h-48 w-48">
          <Image
            src={product.images[0] || "/product.png"}
            alt={product.title}
            layout="fill"
            // objectFit="cover"
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
                <span className="text-green-800 font-bold text-s">
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
      </div>
    </Link>
  );
};

export default ProductItem;
