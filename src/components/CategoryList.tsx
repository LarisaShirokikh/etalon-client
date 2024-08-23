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
      <div className="card-base">
        <div className="card-image-container">
          <Image
            src={image || "/category-placeholder.png"}
            alt={name}
            layout="fill"
            className="card-image"
            loading="lazy"
          />
          {/* Имя категории поверх изображения */}
          <div className="card-title-overlay">
            <h1 className="text-sm sm:text-base">{name}</h1>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryItem;
