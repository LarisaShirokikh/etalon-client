import BrandCloud from "@/components/BrandCloud";
import CatalogList from "@/components/CatalogList";
import CategoryList from "@/components/CategoryList";
import ProductList from "@/components/ProductList";
import Skeleton from "@/components/Skeleton";
import Slider from "@/components/Slider";
import WiteList from "@/components/WiteList";
import { Suspense } from "react";


const HomePage = async () => {
  const categoryId = "665b2da0845f4980629d771d";

  return (
    <div>
      <Slider />
        <div className="mt-14">
          {/* <h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12">
            Категории
          </h1> */}
          <Suspense fallback={<Skeleton />}>
            <CategoryList />
          </Suspense>
        </div>
      <div className="mt-14">
        {/* <h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12">
          Наши Бренды
        </h1> */}
        <Suspense fallback={<Skeleton />}>
          <BrandCloud />
        </Suspense>
      </div>

      <div className="mt-24">
        <h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12">
          Белые двери
        </h1>
        <Suspense fallback={<Skeleton />}>
          <WiteList categoryId={categoryId} />
        </Suspense>
      </div>
      <div className="mt-24">
        <h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12">
          Каталоги
        </h1>
        <Suspense fallback={<Skeleton />}>
          <CatalogList />
        </Suspense>
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">Новинки</h1>
        <Suspense fallback={<Skeleton />}>
          <ProductList limit={16} />
        </Suspense>
      </div>
    </div>
  );
};
export default HomePage;
