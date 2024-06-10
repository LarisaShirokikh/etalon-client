import BrandCloud from "@/components/BrandCloud";
import CatalogList from "@/components/CatalogList";
import CategoryList from "@/components/CategoryList";
import ProductList from "@/components/ProductList";
import Skeleton from "@/components/Skeleton";
import Form from "@/components/Form";
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
        <h1 className="text-2xl">Новинки</h1>
        </div>
        <Suspense fallback={<Skeleton />}>
          <ProductList limit={8} />
        </Suspense>
        <div className="flex justify-center mt-4">
          <Link href={`/product`}>
            <p className="text-xs border text-gray-500 py-2 px-4 hover:bg-red-50 rounded-full transition-transform duration-300 cursor-pointer">
              смотреть все ... {">"}
            </p>
          </Link>
      </div>

      <div className="mt-12 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">Лучшие двери в квартиру ПИК</h1>
        </div>
        <Suspense fallback={<Skeleton />}>
          <CatalogList limit={12} categoryId={wite} />
        </Suspense>
        <div className="flex justify-center mt-4">
          <Link href={`/category/belye-dveri`}>
            <p className="text-xs border text-gray-500 py-2 px-4 hover:bg-red-50 rounded-full transition-transform duration-300 cursor-pointer">
              смотреть все ... {">"}
            </p>
          </Link>
      </div>

      <div className="mt-12 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">
          Уличные двери с терморазрывом для дачи и в дом
        </h1>
      </div>
        <Suspense fallback={<Skeleton />}>
          <CatalogList limit={6} categoryId={cottege} />
        </Suspense>
        <div className="flex justify-center mt-4">
          <Link href={`/catalog/dlya-doma`}>
            <p className="text-xs border text-gray-500 py-2 px-4 hover:bg-red-50 rounded-full transition-transform duration-300 cursor-pointer">
              смотреть все ... {">"}
            </p>
          </Link>
        </div>
        <div className="mt-12">

        <Form text={"Отправить"} />
        </div>
    </div>
  );
};
export default HomePage;
