"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Skeleton from "../Skeleton";
import Link from "next/link";

interface CatalogItemProps {
  productId?: string;
  color?: string;
  categoryId?: string;
  catalogId?: string;
  slug?: string;
  searchParams?: any;
}

const CatalogItem: React.FC<CatalogItemProps> = ({
  productId,
  color,
  categoryId,
  catalogId,
  slug,
  searchParams,
}) => {
  const [catalog, setCatalog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const response = await axios.get(`/api/catalogs`, {
          params: {
            categoryId,
            productId,
            catalogId,
            slug,
            searchParams,
          },
        });
        
        setCatalog(response.data);
      } catch (error) {
        console.error("Error fetching catalog:", error);
      }
    };

    fetchCatalog();
  }, [productId, categoryId, catalogId, slug, searchParams]);

  if (!catalog) {
    return (
      <div>
        <Skeleton />
      </div>
    );
  }

  return (
    <Link href={`/catalog/${catalog.slug}`}>
      <div className="w-48 p-2 rounded-lg overflow-hidden bg-white flex flex-col justify-center items-center">
        <div className="relative h-48 w-24 sm:h-32 sm:w-32 md:h-40 md:w-24">
          <Image
            src={
              catalog.images && catalog.images[0]
                ? catalog.images[0]
                : "/catalog.png"
            }
            alt={catalog.name}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <div className="p-2">
          <h3 className="text-sm sm:text-xs md:text-sm text-gray-800 overflow-hidden line-clamp-2">
            {catalog.name}
          </h3>
          <div className="flex">
            <span className="text-green-800 font-bold text-sm">
              от {catalog.price} ₽.
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CatalogItem;
