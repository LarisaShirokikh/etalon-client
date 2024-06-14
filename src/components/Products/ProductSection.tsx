import ProductSet from "../Products/ProductSet";
import CatalogSet from "../Catalogs/CatalogSet";

interface ProductSetProps {
  catalogId?: string;
  categoryId?: string;
}

const ProductSection: React.FC<ProductSetProps> = ({
  catalogId,
  categoryId,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-3">
      <div className="flex-1">
        <ProductSet categoryId={categoryId} catalogId={catalogId} />
      </div>
      <div className="flex-1">
        <ProductSet categoryId={categoryId} catalogId={catalogId} />
      </div>
      <div className="flex-1">
        <CatalogSet categoryId={categoryId} />
      </div>
    </div>
  );
};

export default ProductSection;
