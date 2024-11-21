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
        className={`relative w-full h-full rounded-lg shadow-md hover:shadow-lg bg-gradient-to-br ${randomGradient} flex items-center justify-center transition-transform transform hover:scale-105`}
      >
        {/* Название категории */}
        <h1 className="text-gray-500 px-6 text-xl sm:text-xl font-bold text-center ">
          {name}
        </h1>
      </div>
    </Link>
  );
};

export default CategoryItem;
