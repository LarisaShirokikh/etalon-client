// ProductSet.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import ProductItem from "./ProductItem";
import ProductItemColor from "./ProductItemColor";
import VideoItem from "../Video/VideoItem";

interface Product {
  slug: string;
}

interface ProductSetProps {
  limit?: number;
  categoryId?: string;
  catalogId?: string;
  catalogIdVideo?: string;
  searchParams?: any;
  slug?: string;
}

const getRandomProducts = (products: Product[] | undefined, count: number) => {
  if (!products) {
    return []; // Возвращаем пустой массив, если products не определён
  }

  const shuffled = products.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const ProductSet: React.FC<ProductSetProps> = ({
  catalogId,
  catalogIdVideo,
}) => {
  const [productSlugs, setProductSlugs] = useState<string[]>([]);
  const [videoSlugs, setVideoSlugs] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products", {
          params: { catalogId },
        });
        const videoResponse = await axios.get("/api/video", {
          params: { catalogIdVideo },
        });

        const products = response.data.products;
        const videos = videoResponse.data.products;

        const randomProducts = getRandomProducts(products, 4);
        const slugs = randomProducts.map((product) => product.slug);
        setProductSlugs(slugs);

        const randomVideo = getRandomProducts(videos, 4);
        const slugsVideo = randomVideo.map((video) => video.slug);
        setVideoSlugs(slugsVideo);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [catalogId, catalogIdVideo]);

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
      {/* {productSlugs.slice(3).map((slug) => (
        <ProductItem key={slug} slug={slug} />
      ))} */}
    </div>
  );
};

export default ProductSet;
