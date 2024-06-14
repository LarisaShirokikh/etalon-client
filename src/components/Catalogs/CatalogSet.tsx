import React, { useEffect, useState } from "react";
import axios from "axios";
import CatalogItem from "./CatalogItem";
import Link from "next/link";

interface Catalog {
  slug: string;
}

interface ProductSetProps {
  catalogId?: string;
  categoryId?: string;
}

const getRandomCatalogs = (catalogs: Catalog[], count: number) => {
  const shuffled = catalogs.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const CatalogSet: React.FC<ProductSetProps> = ({ catalogId, categoryId }) => {
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
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
        // Попытка получения данных из localStorage
        const response = await axios.get("/api/catalogs", {
          params: { catalogId },
        });
         const catalogsData = response.data.catalogs;
        const randomCatalogs = getRandomCatalogs(catalogsData, 4);
        setCatalogs(randomCatalogs);
        setBgColor(getRandomColor());
      } catch (error) {
        console.error("Ошибка при загрузке каталогов:", error);
      }
    };

    fetchCatalogs();
  }, [categoryId]);

  return (
    <div className={`rounded-lg p-2 m-4 relative overflow-visible`}>
      <div
        className={`absolute rounded-lg top-0 left-0 w-full h-full ${bgColor} opacity-50`}
      />
      <div className="relative z-0">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold text-gray-700">
            Рекомендуем ...
          </span>
          <Link href="/catalog">
            <button className="text-xl font-bold text-gray-700 border border-gray-600 px-3 py-1 rounded-lg cursor-pointer hover:bg-gray-50 transition duration-300">
              Все...
            </button>
          </Link>
        </div>
        <div className="overflow-x-auto sm:overflow-hidden">
          <div className="flex space-x-2 sm:grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {catalogs.map((catalog) => (
              <CatalogItem key={catalog.slug} slug={catalog.slug} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogSet;
