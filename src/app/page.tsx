import BrandCloud from "@/components/BrandCloud";
import CatalogList from "@/components/CatalogList";
import CategoryList from "@/components/CategoryList";
import ProductList from "@/components/ProductList";
import Skeleton from "@/components/Skeleton";
import Slider from "@/components/Slider";
import WiteList from "@/components/WiteList";
import { Suspense } from "react";


const brands = [
  { name: "Labirint", logo: "/labirint.png" },
  { name: "intecron", logo: "/intecron.png" },
  { name: "Asd", logo: "/Asd.png" },
  { name: "zd.png", logo: "/zd.png" },
  { name: "Doormag", logo: "/doormag.webp" },
  { name: "argus.svg", logo: "/argus.svg" },
  // Добавьте больше брендов по необходимости
];

const HomePage = async () => {
  const categoryId = '665b2da0845f4980629d771d';
  
  return (
    <div>
      <Slider />
      <div className="mt-15">
        {/* <h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12">
          Наши Бренды
        </h1> */}
        <Suspense fallback={<Skeleton />}>
          <BrandCloud brands={brands} />
        </Suspense>
      </div>
      
      <div className="mt-20">
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
          <ProductList limit={4} />
        </Suspense>
      </div>
      <div className="mt-24">
        <h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12">
          Категории
        </h1>
        <Suspense fallback={<Skeleton />}>
          <CategoryList />
        </Suspense>
      </div>
    </div>
  );
};
export default HomePage;
