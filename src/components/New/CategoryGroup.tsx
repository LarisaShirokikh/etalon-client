import Link from "next/link";
import CategoryItem from "@/components/Category/CategoryItem";

const CategoryGroup = ({
  categories,
  color,
}: {
  categories: any[];
  color: string;
}) => {
  return (
    <div className={`rounded-lg p-4 ${color}`}>
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
