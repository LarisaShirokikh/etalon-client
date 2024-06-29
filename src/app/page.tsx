"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import BreadCrumbs from "@/components/BreadCrumbs";
import { paths } from "@/utils/path";
import HomeSlider from "@/components/HomeSlider";
import componentData from "@/utils/componentData";

const ProductSection = dynamic(
  () => import("@/components/Products/ProductSection"),
  {
    ssr: false,
  }
);

const HomePage = () => {
  const [components, setComponents] = useState([componentData[0]]);
  const [productsData, setProductsData] = useState([]);
  const [videosData, setVideosData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const [productResponse, videoResponse, categoryResponse] =
        await Promise.all([
          axios.get("/api/products"),
          axios.get("/api/video"),
          axios.get("/api/categories"),
        ]);

      setProductsData(productResponse.data.products);
      setVideosData(videoResponse.data.products);
      setCategoryData(categoryResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.body.offsetHeight - 100;

      if (scrollPosition >= threshold) {
        setComponents((prevComponents) => [
          ...prevComponents,
          componentData[prevComponents.length % componentData.length],
        ]);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
