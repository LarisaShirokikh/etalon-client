"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "@/components/Products/ProductList";
import CatalogList from "@/components/Catalogs/CatalogList";
import BackButton from "@/components/Button/BackButton";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("name");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [catalogs, setCatalogs] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (query) {
        try {
          const response = await axios.get(`/api/search`, {
            params: { name: query },
          });
          const { products, categories, catalogs } = response.data;
          setProducts(products);
          setCategories(categories);
          setCatalogs(catalogs);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="p-4">
        <BackButton/>
      <h1 className="text-2xl pt-4 mb-4">Результаты поиска для "{query}"</h1>

      {products.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl mb-2">Продукты</h2>
          <ProductList/>
        </div>
      )}

      {categories.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl mb-2">Категории</h2>
          <ul className="list-disc pl-5">
            {categories.map((category) => (
              <li key={category._id}>{category.name}</li>
            ))}
          </ul>
        </div>
      )}

      {catalogs.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl mb-2">Каталоги</h2>
          <CatalogList/>
        </div>
      )}

      {products.length === 0 &&
        categories.length === 0 &&
        catalogs.length === 0 && (
          <div className="text-gray-500">Результатов не найдено.</div>
        )}
    </div>
  );
};

export default SearchPage;
