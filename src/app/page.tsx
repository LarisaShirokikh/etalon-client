"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Slider from "@/components/Slider";
import componentData from "@/utils/componentData";
import BreadCrumbs from "@/components/BreadCrumbs";
import { paths } from "@/utils/path";
import HomeSlider from "@/components/HomeSlider";
import axios from "axios";

const ProductSection = dynamic(
  () => import("@/components/Products/ProductSection")
);
const CatalogSection = dynamic(
  () => import("@/components/Catalogs/CatalogSection")
);

const HomePage = () => {
  const [components, setComponents] = useState(componentData.slice(0, 2));
  const [productsData, setProductsData] = useState([]);
  const [videosData, setVideosData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/products");
        const videoResponse = await axios.get("/api/video");
        setProductsData(response.data.products);
        setVideosData(videoResponse.data.products);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    };
    fetchData();
  }, []);

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
  }, [components]);

  return (
    <div>
      <HomeSlider />
      <div className="md:hidden block">
        <BreadCrumbs paths={paths} />
      </div>
      {components.map((component, index) => (
        <div key={index}>
          {component.type === "ProductSection" && (
            <ProductSection
              catalogId={component.catalogId}
              categoryId={component.categoryId}
              productsData={productsData}
              videosData={videosData}
            />
          )}
          {component.type === "CatalogSection" && (
            <ProductSection
              catalogId={component.catalogId}
              categoryId={component.categoryId}
              productsData={productsData}
              videosData={videosData}
            />
          )}
          {/* {component.type === "CatalogSection" && (
            <CatalogSection
              catalogId={component.catalogId}
              categoryId={component.categoryId}
            />
          )} */}
        </div>
      ))}
    </div>
  );
};

export default HomePage;
