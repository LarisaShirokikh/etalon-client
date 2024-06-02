"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import DOMPurify from "dompurify";
import Skeleton from "./Skeleton";
import { ICatalog } from "@/interface/Catalog";

const CatalogList = () => {
  const [catalogs, setCatalogs] = useState<ICatalog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCatalogs = async () => {
      try {
        const response = await axios.get("/api/catalogs");
        setCatalogs(response.data);
        console.log("Fetched catalogs:", response.data);
      } catch (error) {
        console.error("Error fetching catalogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalogs();
  }, []);

  if (loading) {
    return <Skeleton />;
  }

  if (catalogs.length === 0) {
    return <div>No catalogs found</div>;
  }

  return (
    <div className="px-4 overflow-x-scroll scrollbar-hide items-center">
      <div className="flex gap-4 md:gap-8">
        {catalogs.map((catalog) => (
          <Link
            href={`/catalog/${catalog.slug}`}
            // className="flex-shrink-0  sm:w-1/2 lg:w-1/4 xl:w-1/6"
            key={catalog._id}
          >
            <div className="relative bg-slate-100 items-center min-w-64 h-96">
              <Image
                src={
                  catalog.images && catalog.images[0]
                    ? catalog.images[0]
                    : "/catalog.png"
                }
                alt={catalog.name}
                fill
                sizes="20vw"
              />
            </div>
            <h1 className="mt-2  font-light text-xl tracking-wide text-center">
              {catalog.name}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CatalogList;
