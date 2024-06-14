import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import ProductItem from "./ProductItem";
import ProductItemColor from "./ProductItemColor";
import VideoItem from "../Video/VideoItem";

interface Product {
  slug: string;
  // Дополнительные поля продукта, если они есть
}

interface ProductSetProps {
  catalogId?: string;
  categoryId?: string;
}

const getRandomProducts = (products: Product[], count: number) => {
  if (!products) {
    return [];
  }

  const shuffled = products.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const ProductSet: React.FC<ProductSetProps> = ({ catalogId, categoryId }) => {
  const [productSlugs, setProductSlugs] = useState<string[]>([]);
  const [videoSlugs, setVideoSlugs] = useState<string[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products", {
          params: { catalogId },
        });
        const videoResponse = await axios.get("/api/video");

        const productsData = response.data.products;
        const videos = videoResponse.data.products;

        const randomProducts = getRandomProducts(productsData, 4);
        const slugs = randomProducts.map((product: Product) => product.slug);
        setProductSlugs(slugs);

        const randomVideo = getRandomProducts(videos, 4);
        const slugsVideo = randomVideo.map((video: Product) => video.slug);
        setVideoSlugs(slugsVideo);
      } catch (error) {
        console.error("Ошибка при загрузке продуктов:", error);
      }
    };

    fetchProducts();
  }, [catalogId, categoryId]);

  return (
    <div className="grid grid-cols-2 mt-4 gap-1">
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
