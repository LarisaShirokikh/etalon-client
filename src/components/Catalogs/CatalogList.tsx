"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from "../Skeleton";
import CatalogItem from "./CatalogItem";
import { ICatalog } from "@/interface/Catalog";

interface CatalogListProps {
  limit?: number;
  categoryId?: string;
  catalogId?: string;
  searchParams?: any;
  slug?: string;
}

const CatalogList: React.FC<CatalogListProps> = ({
  limit = 12,
  categoryId,
  catalogId,
  slug,
}) => {
  const [catalogs, setCatalogs] = useState<ICatalog[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);


  useEffect(() => {
    const fetchCatalogs = async (
      
    ) => {
      setLoading(true);
      try {
        const response = await axios.get("/api/catalogs", {
          params: {
            limit,
            skip: currentPage * limit,
            categoryId,
            catalogId,
            slug,
          },
        });
        setCatalogs(response.data.catalogs);
        setTotalPages(Math.ceil(response.data.totalCount / limit));
      } catch (error) {
        console.error("Error fetching catalogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalogs();
  }, [currentPage, limit, categoryId, catalogId, slug]);

  

  // if (loading) {
  //   return <Skeleton />;
  // }

  if (catalogs.length === 0) {
    return <div>No catalogs found</div>;
  }

  return (
    <div className="px-4 mt-12 mb-12">
      <div className="grid grid-cols-2 mt-12 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-8">
        {catalogs.map((catalog) => (
          <CatalogItem key={catalog.slug} slug={catalog.slug} />
        ))}
      </div>
    </div>
  );
};

export default CatalogList;
