"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Slider from "@/components/Slider";
import componentData from "@/utils/componentData"; // Убедитесь, что путь правильный
import NavMenu from "@/components/Menu/NavMenu";

// Динамическая загрузка компонентов
const ProductSection = dynamic(
  () => import("@/components/Products/ProductSection")
);
const CatalogSection = dynamic(
  () => import("@/components/Catalogs/CatalogSection")
);

const HomePage = () => {
  const [components, setComponents] = useState(componentData.slice(0, 2)); // Начальная загрузка двух компонентов

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.body.offsetHeight - 100;

      if (scrollPosition >= threshold) {
        setComponents((prevComponents) => [
          ...prevComponents,
          componentData[prevComponents.length % componentData.length], // Циклически добавляем компоненты
        ]);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [components]);

  return (
    <div>
      
      <Slider />
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
