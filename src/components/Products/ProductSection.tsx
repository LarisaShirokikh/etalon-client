import ProductSet from "../Products/ProductSet";
import CatalogSet from "../Catalogs/CatalogSet";
import CategoryList from "../CategoryList";

interface ProductSetProps {
  catalogId?: string;
  categoryId?: string;
  productsData: any[];
  videosData: any[];
  categoryData: any[];
}

const ProductSection: React.FC<ProductSetProps> = ({
  catalogId,
  categoryId,
  productsData,
  videosData,
  categoryData,
}) => {
  console.log("ProductSection categoryData:", categoryData);
  return (
    <div className="flex flex-col md:flex-row gap-3">
      <div className="flex-1">
        <ProductSet
          categoryId={categoryId}
          catalogId={catalogId}
          productsData={productsData}
          videosData={videosData}
        />
      </div>
      <div className="flex-1">
        <ProductSet
          categoryId={categoryId}
          catalogId={catalogId}
          productsData={productsData}
          videosData={videosData}
        />
      </div>

      <div className="flex-1 flex flex-col min-w-96 max-w-104 gap-5">
        <CatalogSet categoryId={categoryId} />
        <CategoryList categoryData={categoryData} />
      </div>
    </div>
  );
};


export default ProductSection;
