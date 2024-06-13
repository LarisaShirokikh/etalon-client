"use client";
import BrandCloud from "@/components/BrandCloud";
import CatalogList from "@/components/Catalogs/CatalogList";
import CategoryList from "@/components/CategoryList";
import Skeleton from "@/components/Skeleton";
import Form from "@/components/Form";
import Link from "next/link";
import { Suspense, useState, useEffect } from "react";
import InfoCom from "@/components/InfoCom";
import ProductSet from "@/components/Products/ProductSet";
import ProductSection from "@/components/Products/ProductSection";
import CatalogSection from "@/components/Catalogs/CatalogSection";

const HomePage = () => {
  const wite = "665b2da0845f4980629d771d";
  const cottege = "665b2bc8845f4980629d7717";
  const brue = "665b4315845f4980629d773c";
  const line = "665c680c517f618c930fba0e";

  const [productSections, setProductSections] = useState([0]);

  const loadMoreSections = () => {
    setProductSections((prevSections) => [
      ...prevSections,
      prevSections.length,
    ]);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 500
      ) {
        setTimeout(loadMoreSections, 1000);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <ProductSection />
      <CatalogSection />
      <ProductSection />

      {/* {productSections.map((section) => (
        <ProductSection key={section} />
      ))} */}
    </div>
  );
};

export default HomePage;
