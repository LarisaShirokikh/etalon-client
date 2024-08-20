import { CategoryModel, ICategory } from "@/interface/Category";
import { IProduct } from "@/interface/Product";
import dynamic from "next/dynamic";
import { memo } from "react";

// Динамический импорт компонентов
const ProductSet = dynamic(() => import("../Products/ProductSet"), {
  ssr: false,
});
const CatalogSet = dynamic(() => import("../Catalogs/CatalogSet"), {
  ssr: false,
});
const CategoryList = dynamic(() => import("../CategoryList"), {
  ssr: false,
});

interface ProductSetProps {
  productsData: IProduct[];
  videosData: IProduct[]; 
  categoryData: ICategory[];
}

const ProductSection: React.FC<ProductSetProps> = memo(
  ({ productsData, videosData, categoryData }) => {
    return (
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1">
          <ProductSet productsData={productsData} videosData={videosData} />
        </div>
        <div className="flex-1 flex flex-col min-w-96 max-w-104 gap-5">
          <CatalogSet categoryId={"665b2b71845f4980629d7714"} />
          <CategoryList categoryData={categoryData} />
        </div>
      </div>
    );
  }
);
ProductSection.displayName = "ProductSection";

export default ProductSection;
