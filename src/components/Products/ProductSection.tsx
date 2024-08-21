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
const CategoryList = dynamic(() => import("../CategoryList"), {
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
      <div className="flex flex-col md:flex-row gap-3">
        <Suspense fallback={<LoadingSpinner />}>
          <ProductSet productsData={productsData} videosData={videosData} />
        </Suspense>
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
