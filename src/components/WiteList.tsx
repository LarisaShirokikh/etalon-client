"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import DOMPurify from "dompurify";
import Skeleton from "./Skeleton";
import { ICatalog } from "@/interface/Catalog";
import { useRouter } from "next/router";

interface WiteListProps {
  categoryId: string;
}

const WiteList: React.FC<WiteListProps> = ({ categoryId }) => {
  const [catalogs, setCatalogs] = useState<ICatalog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCatalogs = async () => {
      try {
        const response = await axios.get(
          `/api/catalogs?categoryId=${categoryId}`
        );
        setCatalogs(response.data);
        console.log("Fetched catalogs:", response.data);
      } catch (error) {
        console.error("Error fetching catalogs:", error);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchCatalogs();
    }
  }, [categoryId]);

  if (loading) {
    return <Skeleton />;
  }

  if (catalogs.length === 0) {
    return <div>No catalogs found</div>;
  }

  return (
    <div className="px-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-8">
        {catalogs.map((catalog) => (
          <Link href={`/catalog/${catalog.slug}`} key={catalog.name}>
            <div className="relative bg-slate-100 w-full h-96">
              <Image
                src={
                  catalog.images && catalog.images[0]
                    ? catalog.images[0]
                    : "/catalog.png"
                }
                alt={catalog.name}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover"
              />
            </div>
            <h1 className="mt-2 font-light text-m tracking-wide text-center">
              {catalog.name}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WiteList;
