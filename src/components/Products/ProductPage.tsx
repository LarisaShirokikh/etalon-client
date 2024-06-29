import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from "../Skeleton";
import ProductItem from "./ProductItem";
import ProductPrice from "./ProductPrice";
import { IProduct } from "@/interface/Product";

interface ProductPageProps {
  limit?: number;
  categoryId?: string;
  catalogId?: string;
  searchParams?: any;
  slug?: string;
  filters?: any;
}

const ProductPage: React.FC<ProductPageProps> = ({
  limit = 24,
  categoryId,
  catalogId,
  slug,
  searchParams,
  filters,
}) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [sortOrder, setSortOrder] = useState("price-asc");

  console.log("slug", slug);

  const fetchProducts = async (newPage: number, sortOrder: string) => {
    setLoading(true);
    try {
      const response = await axios.get("/api/products", {
        params: {
          limit,
          categoryId,
          catalogId,
          slug,
          searchParams,
          page: newPage,
          sortOrder,
        },
      });
      if (newPage === 1) {
        setProducts(response.data.products || []); // Ensure response.data.products is not undefined
      } else {
        setProducts((prevProducts) => [
          ...prevProducts,
          ...(response.data.products || []),
        ]);
      }
      setTotalCount(response.data.totalCount || 0); // Ensure response.data.totalCount is defined
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page, sortOrder);
  }, [page, sortOrder]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
  };

  const handleFilterChange = (newSortOrder: string) => {
    setSortOrder(newSortOrder);
    setPage(1);
    setProducts([]);
    fetchProducts(1, newSortOrder);
  };

  if (products.length === 0 && !loading) {
    return <div>No products found</div>;
  }

  return (
    <div>
      <ProductPrice
        onFilterChange={handleFilterChange}
        totalCount={totalCount}
      />
      <div className="grid grid-cols-2 lg:grid-cols-6 md:grid-cols-4 gap-2 rounded-lg">
        {products.map((product) => (
          <ProductItem key={product._id} slug={product.slug} />
        ))}
      </div>
      {loading && <Skeleton />}
      <div className="mt-4 flex justify-center">
        {products.length < totalCount && (
          <button
            className="rounded-lg text-gray-700 p-2 text-sm w-40 hover:bg-gray-100 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-200"
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? "Загрузить..." : "Загрузить еще ..."}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
