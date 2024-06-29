import ProductSet from "../Products/ProductSet";
import CatalogSet from "../Catalogs/CatalogSet";
import CategoryList from "../CategoryList";

interface ProductSetProps {
  
  productsData: any[];
  videosData: any[];
  categoryData: any[];
}

const ProductSection: React.FC<ProductSetProps> = ({
  
  productsData,
  videosData,
  categoryData,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-3">
      <div className="flex-1">
        <ProductSet
          
          productsData={productsData}
          videosData={videosData}
        />
      </div>
      <div className="flex-1">
        <ProductSet
          
          productsData={productsData}
          videosData={videosData}
        />
      </div>

      <div className="flex-1 flex flex-col min-w-96 max-w-104 gap-5">
        <CatalogSet categoryId={'665b2b71845f4980629d7714'} />
        <CategoryList categoryData={categoryData} />
      </div>
    </div>
  );
};


export default ProductSection;
