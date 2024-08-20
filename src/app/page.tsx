"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import BreadCrumbs from "@/components/BreadCrumbs";
import { paths } from "@/utils/path";
import componentData from "@/utils/componentData";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import LoadingSpinner from "@/components/LoadingSpinner";

const ProductSection = dynamic(
  () => import("@/components/Products/ProductSection"),
  {
    ssr: false,
  }
);
const HomeSlider = dynamic(() => import("@/components/HomeSlider"), {
  ssr: false,
});

const fetchAllData = async () => {
  const [products, videos, categories] = await Promise.all([
    axios.get("/api/products").then((res) => res.data.products),
    axios.get("/api/video").then((res) => res.data.products),
    axios.get("/api/categories").then((res) => res.data),
  ]);
  return { products, videos, categories };
};

const HomePage = () => {
  const [components, setComponents] = useState([componentData[0]]);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["homePageData"],
    queryFn: fetchAllData,
  });

  const handleScroll = useCallback(
    debounce(() => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.body.offsetHeight - 100;

      if (scrollPosition >= threshold) {
        setComponents((prevComponents) => [
          ...prevComponents,
          componentData[prevComponents.length % componentData.length],
        ]);
      }
    }, 200),
    []
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error loading data...</div>;

  const products = data?.products || [];
  const videos = data?.videos || [];
  const categories = data?.categories || [];

  return (
    <div>
      <HomeSlider />
      <div className="md:hidden block">
        <BreadCrumbs paths={paths} />
      </div>
      {components.map((component, index) => (
        <ProductSection
          key={index}
          productsData={products}
          videosData={videos}
          categoryData={categories}
        />
      ))}
      <div
        ref={loaderRef}
        style={{ height: "20px", backgroundColor: "transparent" }}
      />
    </div>
  );
};

export default HomePage;
