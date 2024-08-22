"use client";
import Link from "next/link";
import Image from "next/image";

interface CategoryItemProps {
  slug: string;
  name: string;
  image?: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ slug, name, image }) => {
  return (
    <Link href={`/category/${slug}/catalogs`} passHref>
      <div className="relative rounded-lg overflow-hidden cursor-pointer hover:shadow-xl duration-300 p-3 transform hover:scale-105">
        <div className=" w-full h-32 sm:h-40 rounded-lg overflow-hidden">
          <Image
            src={image || "/category-placeholder.png"}
            alt={name}
            layout="fill"
            objectFit="cover"
            loading="lazy"
            className="rounded-lg transition-transform duration-500 ease-in-out hover:scale-110"
          />
          {/* Имя категории поверх изображения */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <h1 className="text-center text-white font-semibold text-sm sm:text-base">
              {name}
            </h1>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryItem;
