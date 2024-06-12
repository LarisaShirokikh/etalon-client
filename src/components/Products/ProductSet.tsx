"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductItem from "./ProductItem";
import ProductItemColor from "./ProductItemColor";

const getRandomProducts = (products: any[], count: number) => {
  const shuffled = products.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const ProductSet = () => {
  const [productSlugs, setProductSlugs] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products", {
          params: { category: "vse-dveri" },
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
  }, []);


  return (
    <div className="grid grid-cols-2 mt-4 gap-1">
      {productSlugs.map((slug, index) =>
        index === 3 ? (
          <ProductItemColor key={slug} slug={slug} />
        ) : (
          <ProductItem key={slug} slug={slug} />
        )
      )}
    </div>
  );
};

export default ProductSet;
