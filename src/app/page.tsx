import BrandCloud from "@/components/BrandCloud";
import CatalogList from "@/components/CatalogList";
import CategoryList from "@/components/CategoryList";
import ProductList from "@/components/ProductList";
import Skeleton from "@/components/Skeleton";
import Link from "next/link";
import { Suspense } from "react";

const HomePage = async () => {
  const wite = "665b2da0845f4980629d771d";
  const cottege = "665b2bc8845f4980629d7717";

  return (
    <div>
      {/* <Slider /> */}
      <div className="mt-1">
        <Suspense fallback={<Skeleton />}>
          <CategoryList />
        </Suspense>
      </div>

      <div className="mt-12 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <div className="flex justify-between text-gray-700">
          <h1 className="text-2xl">Новинки</h1>
          <Link href={`/product`}>
            <p className="text-xs hover:bg-blue-50 rounded-full transition-transform duration-300 cursor-pointer">
              смотреть все ... {">"}
            </p>
          </Link>
        </div>
        <Suspense fallback={<Skeleton />}>
          <ProductList limit={8} />
        </Suspense>
      </div>
      <div className="mt-12">
        <div className="flex justify-between text-gray-700 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12">
          <h1 className="text-2xl">Лучшие двери в квартиру ПИК</h1>
          <Link href={`/catalog`}>
            <p className="text-xs hover:bg-blue-50 rounded-full transition-transform duration-300 cursor-pointer">
              смотреть все ... {">"}
            </p>
          </Link>
        </div>
        <Suspense fallback={<Skeleton />}>
          <CatalogList limit={12} categoryId={wite} />
        </Suspense>
      </div>
      <div className="mt-12">
        <div className="flex justify-between text-gray-700 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12">
          <h1 className="text-2xl">
            Уличные двери с терморазрывом для дачи и в дом
          </h1>
          <Link href={`/catalog`}>
            <p className="text-xs hover:bg-blue-50 rounded-full transition-transform duration-300 cursor-pointer">
              смотреть все ... {">"}
            </p>
          </Link>
        </div>
        <Suspense fallback={<Skeleton />}>
          <CatalogList limit={6} categoryId={cottege} />
        </Suspense>
      </div>
    </div>
  );
};
export default HomePage;
