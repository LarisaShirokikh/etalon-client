import React, { useCallback, useEffect, useMemo, useState } from "react";
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

const CatalogSet: React.FC<ProductSetProps> = ({  categoryId }) => {
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [bgColor, setBgColor] = useState<string>("");

  const colors = useMemo(
    () => [
      "bg-red-100",
      "bg-green-100",
      "bg-blue-100",
      "bg-yellow-100",
      "bg-lime-100",
      "bg-cyan-100",
      "bg-purple-100",
      "bg-rose-100",
      "bg-violet-100",
    ],
    []
  );

  const getRandomColor = useCallback(() => {
    return colors[Math.floor(Math.random() * colors.length)];
  }, [colors]);

 useEffect(() => {
   const fetchCatalogs = async () => {
     try {
       const response = await axios.get("/api/catalogs", {
         params: { categoryId },
       });
       const catalogsData = response.data.catalogs;
       const randomCatalogs = getRandomCatalogs(catalogsData, 2);
       setCatalogs(randomCatalogs);
       setBgColor(getRandomColor());
     } catch (error) {
       console.error("Ошибка при загрузке каталогов:", error);
     }
   };

   fetchCatalogs();
 }, [categoryId]); 

  return (
    <div className="relative p-2 m-2">
      <div className={`absolute inset-0 ${bgColor} opacity-50 rounded-lg`} />
      <div className="relative p-3">
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
        <div className="grid grid-cols-2 gap-8 ">
          {catalogs.map((catalog) => (
            <CatalogItem key={catalog.slug} slug={catalog.slug} />
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default CatalogSet;
