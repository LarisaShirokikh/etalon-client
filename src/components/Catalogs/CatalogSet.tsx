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
  const [bgColor, setBgColor] = useState<string>("");

  const colors = [
    "bg-red-100",
    "bg-green-100",
    "bg-blue-100",
    "bg-yellow-100",
    "bg-lime-100",
    "bg-cyan-100",
    "bg-purple-100",
    "bg-rose-100",
    "bg-violet-100",
  ];

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

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
         setBgColor(getRandomColor());
      } catch (error) {
        console.error("Error fetching catalog :", error);
      }
    };

    fetchCatalogs();
  }, [categoryId]);

  return (
    <div className={`border rounded-lg p-2 m-4 relative overflow-visible`}>
      <div
        className={`absolute top-0 left-0 w-full h-full ${bgColor} opacity-50`}
      />
      <div className="relative z-0">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold text-gray-700">
            Рекомендуем ...
          </span>
          <Link href="/catalogs">
            <button className="text-xl font-bold text-gray-700 border border-gray-700 px-3 py-1 rounded-lg cursor-pointer hover:bg-indigo-200 transition duration-300">
              Все...
            </button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <div className="flex space-x-2 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {catalogSlugs.map((slug) => (
              <CatalogItem key={slug} slug={slug} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogSet;
