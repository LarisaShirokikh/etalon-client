// CatalogSet.js
import { useEffect, useState } from "react";
import axios from "axios";
import CatalogItem from "./CatalogItem";
import Link from "next/link";

interface CatalogSetProps {
  categoryId: string;
}

const getRandomCatalogs = (catalogs: any[], count: number) => {
  const shuffled = catalogs.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const CatalogSet: React.FC<CatalogSetProps> = ({ categoryId }) => {
  const [catalogSlugs, setCatalogSlugs] = useState<string[]>([]);

  useEffect(() => {
    const fetchCatalogs = async () => {
      try {
        const response = await axios.get("/api/catalogs", {
          params: { category: categoryId },
        });
        const catalogs = response.data.catalogs;
        const randomCatalogs = getRandomCatalogs(catalogs, 4);
        const slugs = randomCatalogs.map(
          (catalog: { slug: any }) => catalog.slug
        );
        setCatalogSlugs(slugs);
      } catch (error) {
        console.error("Error fetching catalog :", error);
      }
    };

    fetchCatalogs();
  }, [categoryId]);

  return (
    <div className="border rounded-lg p-6 m-4 bg-indigo-100">
      <div className="flex justify-between items-center mb-4">
        <span className="text-2xl font-bold text-gray-700">
          Рекомендуем посмотреть
        </span>
        <Link href="/catalogs">
          <button className="text-2xl font-bold text-gray-700 border px-3 py-1 rounded-lg cursor-pointer hover:bg-indigo-200 transition duration-300">
            Все...
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {catalogSlugs.map((slug) => (
          <CatalogItem key={slug} slug={slug} />
        ))}
      </div>
    </div>
  );
};

export default CatalogSet;
