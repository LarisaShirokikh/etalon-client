import ProductSet from "../Products/ProductSet";
import CatalogSet from "../Catalogs/CatalogSet";
import { useMediaQuery } from "@react-hook/media-query";

interface ProductSetProps {
  catalogId?: string;
  categoryId?: string;
  productsData: any[];
  videosData: any[];
}

const ProductSection: React.FC<ProductSetProps> = ({
  catalogId,
  categoryId,
  productsData,
  videosData,
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
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
      
        <div className="flex-1">
          <CatalogSet categoryId={categoryId} />
        </div>
      
    </div>
  );
};


export default ProductSection;
