"use client";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Skeleton from "../Skeleton";
import { IProduct } from "@/interface/Product";
import ProductItem from "./ProductItem";

interface ProductListProps {
  limit?: number;
  categoryId?: string;
  catalogId?: string;
  searchParams?: any;
  slug?: string;
}

const ProductList: React.FC<ProductListProps> = ({
  limit = 24,
  categoryId,
  catalogId,
  slug,
  searchParams,
}) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/products", {
          params: {
            limit,
            categoryId,
            catalogId,
            slug,
            searchParams,
            page,
          },
        });
        setProducts((prevProducts) => [
          ...prevProducts,
          ...response.data.products,
        ]);
        setHasMore(response.data.products.length > 0);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug, categoryId, catalogId, searchParams, page, limit]);

  const lastProductElementRef = (node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  };

  if (products.length === 0 && !loading) {
    return <div>No products found</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-6 md:grid-cols-4 gap-4 p-2 m-2 rounded-lg">
        {products.map((product, index) => {
          if (products.length === index + 1) {
            return (
              <div ref={lastProductElementRef} key={product._id}>
                <ProductItem key={product._id} slug={product.slug} />
              </div>
            );
          } else {
            return <ProductItem key={product._id} slug={product.slug} />;
          }
        })}
      </div>
      {loading && <Skeleton />}
    </div>
  );
};

export default ProductList;
