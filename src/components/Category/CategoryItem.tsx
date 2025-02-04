"use client";
import Link from "next/link";

interface CategoryItemProps {
  slug: string;
  name: string;
}

const gradients = [
  "from-blue-100 to-purple-50",
  "from-green-100 to-blue-50",
  "from-yellow-100 to-red-50",
  "from-pink-100 to-orange-50",
  "from-indigo-100 to-cyan-50",
];

const CategoryItem: React.FC<CategoryItemProps> = ({ slug, name }) => {
  // Генерация случайного градиента
  const randomGradient =
    gradients[Math.floor(Math.random() * gradients.length)];

  return (
    <Link href={`/category/${slug}/catalogs`} passHref>
      <div
      className={`shadow-m hover:shadow-lg rounded-xl flex items-center justify-center hover:scale-105`}
      >
        {/* Название категории */}
        <h1 className="text-gray-700 px-6 text-m sm:text-m text-center">
          {name}
        </h1>
      </div>
    </Link>
  );
};

export default CategoryItem;
