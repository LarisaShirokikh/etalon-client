"use client";
import { Loader } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Category {
  slug: string;
  name: string;
  images?: string[];
}

interface CategoryListProps {
  categoryData: Category[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categoryData }) => {

  if (!categoryData || categoryData.length === 0) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="py-1 px-1 w-auto md:px-1 lg:px-1 xl:px-2 2xl:px-2">
      <div className="flex overflow-auto no-scrollbar gap-2">
        {categoryData.map((item) => (
          <div className="flex-shrink-0" key={item.name}>
            <Link href={`/category/${item.slug}/catalogs`} passHref>
              <div className="relative rounded-lg overflow-hidden cursor-pointer">
                <div className="relative w-48 h-48">
                  <Image
                    src={item.images?.[0] || "/category-placeholder.png"}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    loading="lazy"
                  />
                </div>
                <h1 className="absolute top-0 left-0  text-gray-800 py-1 px-2 mt-1">
                  {item.name}
                </h1>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
