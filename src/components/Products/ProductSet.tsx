// ProductSet.js
import { useEffect, useState } from "react";
import axios from "axios";
import ProductItem from "./ProductItem";
import ProductItemColor from "./ProductItemColor";
import VideoItem from "../Video/VideoItem";

interface ProductSetProps {
  limit?: number;
  categoryId?: string;
  catalogId?: string;
  searchParams?: any;
  slug?: string;
}

const getRandomProducts = (products: any, count: number) => {
  const shuffled = products.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const ProductSet: React.FC<ProductSetProps> = ({ catalogId }) => {
  const [productSlugs, setProductSlugs] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products", {
          params: { catalogId },
        });
        const products = response.data.products;
        const randomProducts = getRandomProducts(products, 4);
        const slugs = randomProducts.map(
          (product: { slug: any }) => product.slug
        );
        setProductSlugs(slugs);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [catalogId]);

  return (
    <div className="grid grid-cols-2 mt-4 gap-1">
      {productSlugs.map((slug, index) => {
        if (index === 2) {
          return (
            <VideoItem
              key={slug}
              src="/test.mp4"
              onNext={() => console.log("Next video")}
            />
          );
        } else if (index === 3) {
          return <ProductItemColor key={slug} slug={slug} />;
        } else {
          return <ProductItem key={slug} slug={slug} />;
        }
      })}
    </div>
  );
};

export default ProductSet;
