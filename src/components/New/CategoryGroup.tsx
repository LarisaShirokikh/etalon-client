import Link from "next/link";
import CategoryItem from "@/components/CategoryList";

const CategoryGroup = ({
  categories,
  color,
}: {
  categories: any[];
  color: string;
}) => {
  return (
    <div className={`rounded-lg p-4 ${color}`}>
      {/* Заголовок
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Популярные категории</h2>
        <Link href="/categories">
          <button className="text-sm font-semibold text-gray-700  px-3 py-1 rounded-lg hover:bg-gray-50 transition">
            Все категории
          </button>
        </Link>
      </div> */}

      {/* Сетка категорий */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category: any) => (
          <CategoryItem
            key={category.slug}
            slug={category.slug}
            name={category.name}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryGroup;
