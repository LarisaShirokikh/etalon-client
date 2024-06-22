"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Slider from "@/components/Slider";
import componentData from "@/utils/componentData";
import SimpleSlider from "@/components/HomeSlider";
import BreadCrumbs from "@/components/BreadCrumbs";
import { Trophy, 
  DoorClosed,
  TvMinimalPlay, 
  Package } from "lucide-react";

// Динамическая загрузка компонентов
const ProductSection = dynamic(
  () => import("@/components/Products/ProductSection")
);
const CatalogSection = dynamic(
  () => import("@/components/Catalogs/CatalogSection")
);

const HomePage = () => {
  const [components, setComponents] = useState(componentData.slice(0, 2));

  const paths = [
    {
      name: "в дом",
      href: "/category/dlya-doma/catalogs",
      icon: "/house-plus.svg",
    },
    {
      name: "новинки",
      href: "/product",
      icon: "/rss.svg",
    },
    {
      name: "хиты",
      href: "/category/hity-prodazh/catalogs",
      icon: "/trophy.svg",
    },
    {
      name: "установки",
      href: "/video",
      icon: "/video.svg",
    },
  ];

//TODO сделать страницу видео

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
      <Slider />
      <div className="md:hidden block">
        <BreadCrumbs paths={paths} />
      </div>
      {components.map((component, index) => (
        <div key={index}>
          {component.type === "ProductSection" && (
            <ProductSection
              catalogId={component.catalogId}
              categoryId={component.categoryId}
            />
          )}
          {component.type === "CatalogSection" && (
            <CatalogSection
              catalogId={component.catalogId}
              categoryId={component.categoryId}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default HomePage;
