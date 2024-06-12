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


  console.log("catalog slug", slug)
  useEffect(() => {
    const fetchCatalog = async () => {
      setLoading(true);
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
        console.log("setCatalog", response.data);
        setCatalog(response.data);
      } catch (error) {
        console.error("Error fetching catalog:", error);
      } 
    };

    fetchCatalog();
  }, [productId, categoryId, catalogId, slug, searchParams]);

  if (!catalog) {
    return <div>No catalog found</div>;
  }
 console.log("catalog1", catalog);
  return (
    <Link href={`/${catalog.slug}`}>
      <div className="w-full p-1 rounded-md overflow-hidden bg-white flex flex-col justify-center items-center">
        <div className="relative h-32 w-16">
          <Image
            src={
              catalog.images && catalog.images[0]
                ? catalog.images[0]
                : "/catalog.png"
            }
            alt={catalog.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
            // objectFit="cover"
            className="rounded-md"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xs text-gray-800 overflow-hidden line-clamp-2">
            {catalog.name}
          </h3>
          <div className="mt-1 flex">
            <span className="text-gray-700 text-s">от {catalog.price} ₽.</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CatalogItem;
