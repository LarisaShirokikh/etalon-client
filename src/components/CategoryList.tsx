"use client";

import Link from "next/link";
import Skeleton from "./Skeleton";
import { useEffect, useState } from "react";
import axios from "axios";
import { ICategory } from "@/interface/Category";
import Image from "next/image";

const CategoryList = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <Skeleton />;
  }

  if (categories.length === 0) {
    return <div>No categories found</div>;
  }

  return (
    <div className="py-1 px-1 md:px-1 lg:px-1 xl:px-2 2xl:px-2">
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {categories.map((item) => (
          <div
            className="flex-shrink-0 "
            key={item.name}
          >
            {item.url ? (
              <div
                
                className="relative rounded-lg overflow-hidden"
                
                rel="noopener noreferrer"
              >
                <div className="relative w-48 h-48">
                  <Image
                    src={item.images?.[0] || "/category-placeholder.png"}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <h1 className="absolute top-0 left-0  text-gray-500 py-1 px-2 rounded-lg mt-1 cursor-pointer">
                  {item.name}
                </h1>
              </div>
            ) : (
              <Link href={`/category/${item.slug}/catalogs`} passHref>
                <div className=" relative rounded-lg overflow-hidden">
                  <div className="relative w-48 h-48">
                    <Image
                      src={item.images?.[0] || "/category-placeholder.png"}
                      alt={item.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <h1 className="absolute top-0 left-0  text-gray-700 py-1 px-2  mt-1 cursor-pointer">
                    {item.name}
                  </h1>
                </div>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
