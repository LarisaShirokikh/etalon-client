import BrandCloud from "@/components/BrandCloud";
import CatalogList from "@/components/CatalogList";
import CategoryList from "@/components/CategoryList";
import ProductList from "@/components/ProductList";
import Skeleton from "@/components/Skeleton";
import Slider from "@/components/Slider";
import { Suspense } from "react";

const HomePage = async () => {
  const categoryId = "665b2da0845f4980629d771d";

  return (
    <div>
      {/* <Slider /> */}
      <div className="mt-5">
        <Suspense fallback={<Skeleton />}>
          <CategoryList />
        </Suspense>
      </div>
      <div className="mt-5">
        <Suspense fallback={<Skeleton />}>
          <BrandCloud />
        </Suspense>
      </div>

      <div className="mt-5">
        <h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12">
          Белые двери
        </h1>
        <Suspense fallback={<Skeleton />}>
          <CatalogList limit={6} categoryId={categoryId} />
        </Suspense>
      </div>
      <div className="mt-24">
        <h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12">
          Каталоги
        </h1>
        <Suspense fallback={<Skeleton />}>
          <CatalogList limit={12} />
        </Suspense>
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">Новинки</h1>
        <Suspense fallback={<Skeleton />}>
          <ProductList limit={12} />
        </Suspense>
      </div>
    </div>
  );
};
export default HomePage;
