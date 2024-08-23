import Link from "next/link";
import CatalogItem from "@/components/Catalogs/CatalogItem";

const CatalogGroup = ({
  catalogs,
  color,
}: {
  catalogs: any[];
  color: string;
}) => {
  return (
    <div className={`rounded-lg p-4 ${color} col-span-2 lg:col-span-3`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Популярные каталоги</h2>
        <Link href="/catalogs">
          <button className="text-sm font-semibold text-gray-700 border border-gray-600 px-2 py-1 rounded-lg hover:bg-gray-50 transition">
            Все ...
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {catalogs.map((catalog: any) => (
          <CatalogItem key={catalog.slug} slug={catalog.slug} />
        ))}
      </div>
    </div>
  );
};

export default CatalogGroup;
