"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import fetchAllData from "@/api/fetchAllData";
import HomeSlider from "@/components/HomeSlider";
import CatalogItem from "@/components/Catalogs/CatalogItem";
import CategoryItem from "@/components/CategoryList";
import ProductItem from "@/components/Products/ProductItem";
import VideoItem from "@/components/Video/VideoItem";

const HomePage = () => {
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const loadData = useCallback(async () => {
    if (isFetching || !hasMore) return;

    setIsFetching(true);
    const data = await fetchAllData(page); // Загружаем данные текущей страницы
    const { products, videos, catalogs, categories } = data;

    if (data) {
      const mixedItems = [
        ...products.map((product: any) => ({ type: "product", data: product })),
        ...categories.map((category: any) => ({
          type: "category",
          data: category,
        })),
        ...catalogs.map((catalog: any) => ({ type: "catalog", data: catalog })),
        ...videos.map((video: any) => ({ type: "video", data: video })),
      ].sort(() => Math.random() - 0.5);

      setItems((prevItems) => [...prevItems, ...mixedItems]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(data.products.length > 0 || data.categories.length > 0);
    }

    setIsFetching(false);
  }, [isFetching, hasMore, page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetching) {
          loadData();
        }
      },
      { rootMargin: "200px" }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loaderRef, loadData, hasMore, isFetching]);

  const renderItem = useCallback((item: any, index: number) => {
    switch (item.type) {
      case "product":
        return (
          <div
            key={index}
            className="group relative rounded-lg bg-white shadow hover:shadow-lg transition"
          >
            <ProductItem slug={item.data.slug} />
          </div>
        );
      case "category":
        return (
          <div
            key={index}
            className="group relativ rounded-lg hover:shadow-lg transition"
          >
            <CategoryItem slug={item.data.slug} name={item.data.name} />
          </div>
        );
      case "catalog":
        return (
          <div
            key={index}
            className="group relative rounded-lg shadow hover:shadow-lg transition"
          >
            <CatalogItem slug={item.data.slug} />
          </div>
        );
      case "video":
        return (
          <div
            key={index}
            className="group relative rounded-lg bg-white text-white hover:shadow-lg transition"
          >
            <VideoItem slug={item.data.slug} />
          </div>
        );
      default:
        return null;
    }
  }, []);

  return (
    <div className="p-4">
      {/* Слайдер */}
      <div className="mb-8">
        <HomeSlider />
      </div>

      {/* Сетка элементов */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        {items.map(renderItem)}
      </div>

      {/* Лоадер для бесконечной прокрутки */}
      <div
        ref={loaderRef}
        className="h-10 flex justify-center items-center mt-8"
      >
        {isFetching && <span>Загрузка...</span>}
      </div>
    </div>
  );
};

export default HomePage;
