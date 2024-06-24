"use client";
import BreadCrumbs from "@/components/BreadCrumbs";
import BackButton from "@/components/Button/BackButton";
import { useSearchParams } from "next/navigation";
import ProductPage from "@/components/Products/ProductPage";
import Meta from "@/components/Seo/Meta";
import { paths } from "@/utils/path";
import { useState } from "react";

function FavoriteProductPage() {
    const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const [filters, setFilters] = useState({
    sortOrder: "",
  });

  const userName = name !== null ? name : undefined;

  const handleFilterChange = (sortOrder: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      sortOrder,
    }));
  };

  return (
    <div className="mt-12 px-1 sm:px-2">
      <Meta pageType="product" />
      <BackButton />
      <BreadCrumbs paths={paths} />

      <ProductPage limit={12} name={userName} filters={filters} />
    </div>
  );
}

export default FavoriteProductPage;
