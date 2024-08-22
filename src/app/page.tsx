"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ProductItem from "@/components/Products/ProductItem";
import VideoItem from "@/components/Video/VideoItem";
import CatalogItem from "@/components/Catalogs/CatalogItem";
import Link from "next/link";
import CategoryItem from "@/components/CategoryList";
import LoadingSpinner from "@/components/LoadingSpinner";

// Динамический импорт слайдера
const HomeSlider = dynamic(() => import("@/components/HomeSlider"), {
  ssr: false,
});

const getRandomColor = () => {
  const colors = [
    "bg-red-50",
    "bg-green-50",
    "bg-blue-50",
    "bg-yellow-50",
    "bg-purple-50",
    "bg-pink-50",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const fetchAllData = async (page: number) => {
  const [products, videos, catalogs, categories] = await Promise.all([
    axios
      .get(`/api/products?limit=10&page=${page}&randomize=true`)
      .then((res) => res.data.products),
    axios.get("/api/video").then((res) => res.data.products),
    axios
      .get("/api/catalogs", { params: { limit: 6 } })
      .then((res) => res.data.catalogs),
    axios
      .get("/api/categories", { params: { limit: 6 } })
      .then((res) => res.data.categories),
  ]);
  return { products, videos, catalogs, categories: categories || [] };
};

const HomePage = () => {
  const [layoutItems, setLayoutItems] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const loadMoreData = useCallback(async () => {
    if (isFetching || !hasMore) return;

    setIsFetching(true);
    const data = await fetchAllData(page);

    if (data) {
      const { products, videos, catalogs, categories } = data;

      const shuffledProducts = products?.sort(() => Math.random() - 0.5) || [];
      const shuffledVideos = videos?.sort(() => Math.random() - 0.5) || [];

      const newItems: any[] = [];
      let productIndex = 0;
      let videoIndex = 0;

      // Вставляем каталоги и категории
      for (let i = 0; i < catalogs.length; i += 2) {
        const catalogGroup = catalogs.slice(i, i + 2);
        if (catalogGroup.length > 0) {
          newItems.push({
            type: "catalog-group",
            data: catalogGroup,
            color: getRandomColor(),
          });

          for (let j = 0; j < 2; j++) {
            if (productIndex < shuffledProducts.length) {
              newItems.push({
                type: "product",
                data: shuffledProducts[productIndex],
              });
              productIndex++;
            }

            if (j === 1 && videoIndex < shuffledVideos.length) {
              newItems.push({
                type: "video",
                data: shuffledVideos[videoIndex],
              });
              videoIndex++;
            }
          }
        }
      }

      for (let i = 0; i < categories.length; i += 3) {
        const categoryGroup = categories.slice(i, i + 3);
        if (categoryGroup.length > 0) {
          newItems.push({
            type: "category-group",
            data: categoryGroup,
            color: getRandomColor(),
          });
        }
      }

      while (productIndex < shuffledProducts.length) {
        newItems.push({
          type: "product",
          data: shuffledProducts[productIndex],
        });
        productIndex++;
      }

      setLayoutItems((prevItems) => [...prevItems, ...newItems]);
      setPage((prevPage) => prevPage + 1);
      setIsFetching(false);
      setHasMore(products.length > 0);
    }
  }, [isFetching, page, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreData();
        }
      },
      {
        rootMargin: "200px",
      }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loaderRef, loadMoreData, hasMore]);

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <div>
      <HomeSlider />
      <div className="flex flex-col gap-8 p-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {layoutItems.map((item, index) => {
            if (item.type === "catalog-group") {
              return (
                <div
                  key={`catalog-group-${index}`}
                  className={`rounded-lg p-4 ${item.color} col-span-2 lg:col-span-3`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Популярные каталоги</h2>
                    <Link href="/catalogs">
                      <button className="text-sm font-semibold text-gray-700 border border-gray-600 px-2 py-1 rounded-lg hover:bg-gray-50 transition">
                        Все
                      </button>
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {item.data.map((catalog: any) => (
                      <CatalogItem key={catalog.slug} slug={catalog.slug} />
                    ))}
                  </div>
                </div>
              );
            }

            if (item.type === "category-group") {
              return (
                <div
                  key={`category-group-${index}`}
                  className={`rounded-lg p-4 ${item.color} col-span-2 lg:col-span-3`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Популярные категории</h2>
                    <Link href="/categories">
                      <button className="text-sm font-semibold text-gray-700 border border-gray-600 px-2 py-1 rounded-lg hover:bg-gray-50 transition">
                        Все
                      </button>
                    </Link>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {item.data.map((category: any) => (
                      <CategoryItem
                        key={category.slug}
                        slug={category.slug}
                        name={category.name}
                        image={category.images?.[0]}
                      />
                    ))}
                  </div>
                </div>
              );
            }

            if (item.type === "product") {
              return (
                <div
                  key={`product-${item.data.slug}-${index}`}
                  className={`rounded-lg p-2 ${
                    index % 2 === 1 ? getRandomColor() : "bg-white"
                  }`}
                >
                  <ProductItem slug={item.data.slug} />
                </div>
              );
            }

            if (item.type === "video") {
              return (
                <div
                  key={`video-${item.data.slug}-${index}`}
                  className="rounded-lg p-2"
                >
                  <VideoItem slug={item.data.slug} />
                </div>
              );
            }

            return null;
          })}
        </div>
      </div>
      {/* Элемент для отслеживания скролла и подгрузки */}
      <div ref={loaderRef} className="w-full h-4"></div>
      {isFetching && <LoadingSpinner />}
    </div>
  );
};

export default HomePage;
