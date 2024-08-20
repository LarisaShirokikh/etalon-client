"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import BreadCrumbs from "@/components/BreadCrumbs";
import { paths } from "@/utils/path";
import componentData from "@/utils/componentData";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import { Section } from "lucide-react";
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

const fetchProducts = async () => {
  const { data } = await axios.get("/api/products");
  return data.products;
};

const fetchVideos = async () => {
  const { data } = await axios.get("/api/video");
  return data.products;
};

const fetchCategories = async () => {
  const { data } = await axios.get("/api/categories");
  return data;
};

const HomePage = () => {
  const [components, setComponents] = useState([componentData[0]]);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const {
    data: productsData = [],
    isLoading: productsLoading,
    error: productsError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  const {
    data: videosData = [],
    isLoading: videosLoading,
    error: videosError,
  } = useQuery({
    queryKey: ["videos"],
    queryFn: fetchVideos,
  });
  const {
    data: categoryData = [],
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  useEffect(() => {
    const handleScroll = debounce(() => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.body.offsetHeight - 100;

      if (scrollPosition >= threshold) {
        setComponents((prevComponents) => [
          ...prevComponents,
          componentData[prevComponents.length % componentData.length],
        ]);
      }
    }, 200);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (productsLoading || videosLoading || categoriesLoading)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  if (productsError || videosError || categoriesError)
    return <div>Error loading data...</div>;

  return (
    <div>
      <HomeSlider />
      <div className="md:hidden block">
        <BreadCrumbs paths={paths} />
      </div>
      {components.map((component, index) => (
        <ProductSection
          key={index}
          productsData={productsData}
          videosData={videosData}
          categoryData={categoryData}
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
