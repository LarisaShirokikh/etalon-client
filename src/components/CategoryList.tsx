"use client";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "./Skeleton";
import { useEffect, useState } from "react";
import axios from "axios";
import { ICategory } from "@/interface/Category";

const CategoryList = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        setCategories(response.data);
       // console.log("Fetched categories:", response.data);
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
    <div className="px-4 overflow-x-scroll scrollbar-hide">
      <div className="grid grid-cols-3 gap-4 md:grid-cols-6 lg:grid-cols-10">
        {categories.map((item) => (
          <Link
            href={`/list?cat=${item.slug}`}
            className="flex-shrink-0"
            key={item._id}
          >
            <div className="relative bg-slate-100 w-full h-48 rounded-lg overflow-hidden">
              <Image
                src={item.images?.[0] || "/category.png"}
                alt={item.name || "Category"}
                layout="fill"
                className="object-cover rounded-lg"
              />
            </div>
            <h1 className="mt-4 font-light text-center text-lg tracking-wide">
              {item.name}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
