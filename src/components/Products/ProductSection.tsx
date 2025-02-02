import { IProduct } from "@/interface/Product";
import { ICategory } from "@/interface/Category";
import dynamic from "next/dynamic";
import { Suspense, memo } from "react";
import LoadingSpinner from "../LoadingSpinner";

const ProductSet = dynamic(() => import("../Products/ProductSet"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});
const CatalogSet = dynamic(() => import("../Catalogs/CatalogSet"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});
const CategoryList = dynamic(() => import("../Category/CategoryItem"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

interface ProductSetProps {
  productsData: IProduct[];
  videosData: IProduct[];
  categoryData: ICategory[];
}

const ProductSection: React.FC<ProductSetProps> = memo(
  ({ productsData, videosData, categoryData }) => {
    return (
      <div className="flex flex-col md:flex-row gap-3 p-4 md:p-8">
        <div className="md:w-2/3">
          <ProductSet productsData={productsData} videosData={videosData} />
        </div>
        <div className="md:w-1/3 flex flex-col gap-5">
          <CatalogSet categoryId="665b2b71845f4980629d7714" />
        </div>
      </div>
    );
  }
);
ProductSection.displayName = "ProductSection";

export default ProductSection;
