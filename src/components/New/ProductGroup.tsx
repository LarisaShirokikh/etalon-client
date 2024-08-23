// src/components/New/ProductGroup.tsx
import React from "react";
import ProductItem from "@/components/Products/ProductItem";

interface ProductGroupProps {
  products: any[];
  color: string;
}

const ProductGroup: React.FC<ProductGroupProps> = ({ products, color }) => {
  return (
    <div className={`rounded-lg p-2 ${color}`}>
      {products.map((product) => (
        <ProductItem key={product.slug} slug={product.slug} />
      ))}
    </div>
  );
};

export default ProductGroup;
