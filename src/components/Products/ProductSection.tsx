import { CategoryModel, ICategory } from "@/interface/Category";
import { IProduct } from "@/interface/Product";
import dynamic from "next/dynamic";
import { memo, useMemo } from "react";

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
interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
}

interface ProductSetProps {
  productsData: Product[];
  videosData: Product[]; // Для videosData тип может остаться таким же, если не знаете структуру данных
  categoryData: ICategory[];
}

// Оптимизация через мемоизацию компонента
const ProductSection: React.FC<ProductSetProps> = memo(
  ({ productsData, videosData, categoryData }) => {
    // Мемоизация значений для уменьшения ререндеров
    const productSetElements = useMemo(
      () => (
        <>
          <ProductSet productsData={productsData} videosData={videosData} />
          
        </>
      ),
      [productsData, videosData]
    );

    return (
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1">{productSetElements}</div>
        <div className="flex-1 flex flex-col min-w-96 max-w-104 gap-5">
          <CatalogSet categoryId={"665b2b71845f4980629d7714"} />
          <CategoryList categoryData={categoryData} />
        </div>
      </div>
    );
  }
);

// Мемоизация самого компонента для предотвращения лишних ререндеров
export default memo(ProductSection);
