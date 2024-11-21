
import CatalogItem from "@/components/Catalogs/CatalogItem";

const CatalogGroup = ({
  catalogs,
  color,
}: {
  catalogs: any[];
  color: string;
}) => {
  return (
    <div className={`rounded-lg p-4 m-4${color} col-span-2 lg:col-span-3`}>
      
      <div className="flex flex-wrap justify-start gap-4">
        {catalogs.map((catalog: any) => (
          <div
            key={catalog.slug}
            className="flex-1 min-w-[200px] max-w-[300px]"
          >
            <CatalogItem slug={catalog.slug} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatalogGroup;
