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
  const [loaded, setLoaded] = useState(false);

  const handleImageLoaded = () => {
    setLoaded(true);
  };

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
      <div className="p-2 rounded-lg bg-white flex flex-col justify-center items-center">
        <div className="relative h-64 w-48">
          <Image
            src={
              catalog.images && catalog.images[0]
                ? catalog.images[0]
                : "/catalog.png"
            }
            alt={catalog.name}
            layout="fill"
            objectFit="contain"
            className={`rounded-md ${loaded ? "opacity-100" : "opacity-0"}`}
            onLoad={handleImageLoaded}
          />
          {/* Placeholder для изображения, пока оно загружается */}
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/placeholder.png"
                alt="Placeholder"
                className="h-full w-full object-contain rounded-md"
              />
            </div>
          )}
        </div>
        <div className="p-2">
          <h3 className="text-sm sm:text-xs md:text-sm text-gray-800 overflow-hidden line-clamp-1">
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
