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
    <div className="py-8 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="flex flex-wrap gap-4 justify-center">
        {categories.map((item) => (
          <Link
            href={`/category/${item.slug}`}
            className="flex-shrink-0"
            key={item._id}
          >
            {/* <div className="relative bg-slate-100 w-full h-48 rounded-lg overflow-hidden">
              <Image
                src={item.images?.[0] || "/category.png"}
                alt={item.name || "Category"}
                layout="fill"
                className="object-cover rounded-lg"
              />
            </div> */}
            <h1 className="bg-blue-50 text-gray-500 py-2 px-4 rounded-full  hover:bg-gray-200 transition-transform duration-300 cursor-pointer">
              {item.name}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
