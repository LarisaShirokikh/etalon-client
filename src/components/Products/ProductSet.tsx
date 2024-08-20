import React, { useMemo } from "react";
import ProductItem from "./ProductItem";
import ProductItemColor from "./ProductItemColor";
import VideoItem from "../Video/VideoItem";
import { IProduct } from "@/interface/Product";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
}

interface ProductSetProps {
  catalogId?: string;
  categoryId?: string;
  productsData: Product[];
  videosData: Product[];
}

const getRandomProducts = (products: Product[] | undefined, count: number) => {
  if (!products || !Array.isArray(products)) {
    return [];
  }

  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const ProductSet: React.FC<ProductSetProps> = ({
  productsData,
  videosData,
}) => {
  const randomProducts = useMemo(
    () => getRandomProducts(productsData, 6),
    [productsData]
  );
  const randomVideos = useMemo(
    () => getRandomProducts(videosData, 6),
    [videosData]
  );

  const productSlugs = randomProducts.map((product: Product) => product.slug);
  const videoSlugs = randomVideos.map((video: Product) => video.slug);

  return (
    <div className="grid grid-cols-2  mt-4 gap-1">
      {productSlugs.slice(0, 2).map((slug) => (
        <ProductItem key={slug} slug={slug} />
      ))}
      {videoSlugs.slice(0, 1).map((slug) => (
        <VideoItem key={slug} slug={slug} />
      ))}
      {productSlugs.slice(2, 3).map((slug) => (
        <ProductItemColor key={slug} slug={slug} />
      ))}
    </div>
  );
};

export default ProductSet;
