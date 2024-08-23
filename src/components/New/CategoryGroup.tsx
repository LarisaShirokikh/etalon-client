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
    <div className={`rounded-lg p-4 ${color} col-span-2 lg:col-span-3`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Популярные категории</h2>
        <Link href="/categories">
          <button className="text-sm font-semibold text-gray-700 border border-gray-600 px-2 py-1 rounded-lg hover:bg-gray-50 transition">
            Все ...
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {categories.map((category: any) => (
          <CategoryItem
            key={category.slug}
            slug={category.slug}
            name={category.name}
            image={category.images?.[0]}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryGroup;
