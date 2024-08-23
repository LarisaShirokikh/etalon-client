"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import fetchAllData from "@/api/fetchAllData";
import HomeSlider from "@/components/HomeSlider";
import LoadingSpinner from "@/components/LoadingSpinner";
import VideoGroup from "@/components/New/VideoGroup";
import ProductGroup from "@/components/New/ProductGroup";
import CategoryGroup from "@/components/New/CategoryGroup";
import CatalogGroup from "@/components/New/CatalogGroup";
import { getRandomColor } from "@/utils/getRandomColor";

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

      const shuffledProducts = products.sort(() => Math.random() - 0.5);
      const shuffledVideos = videos.sort(() => Math.random() - 0.5);
      const newItems: any[] = [];
      let productIndex = 0;
      let videoIndex = 0;

      for (let i = 0; i < catalogs.length; i += 2) {
        const catalogGroup = catalogs.slice(i, i + 2);
        if (catalogGroup.length > 0) {
          newItems.push({
            type: "catalog-group",
            data: catalogGroup,
            color: getRandomColor(), // Цвет применяется ко всему блоку
          });

          for (let j = 0; j < 5; j++) {
            if (productIndex < shuffledProducts.length) {
              newItems.push({
                type: "product",
                data: shuffledProducts[productIndex],
                color: j === 0 ? getRandomColor() : "bg-white", // Только первая карточка цветная
              });
              productIndex++;
            }

            if (j === 2 && videoIndex < shuffledVideos.length) {
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
          color: "bg-white", // Остальные карточки белые
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
                <CatalogGroup
                  key={index}
                  catalogs={item.data}
                  color={item.color}
                />
              );
            }

            if (item.type === "category-group") {
              return (
                <CategoryGroup
                  key={index}
                  categories={item.data}
                  color={item.color}
                />
              );
            }
            if (item.type === "video") {
              return <VideoGroup key={index} videos={[item.data]} />;
            }

            if (item.type === "product") {
              return (
                <ProductGroup
                  key={index}
                  products={[item.data]}
                  color={item.color} // Цвет задается для группы
                />
              );
            }


            return null;
          })}
        </div>
      </div>
      <div ref={loaderRef} className="w-full h-4"></div>
      {isFetching && <LoadingSpinner />}
    </div>
  );
};

export default HomePage;
