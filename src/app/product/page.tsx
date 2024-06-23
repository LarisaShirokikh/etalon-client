"use client";
import BreadCrumbs from "@/components/BreadCrumbs";
import BackButton from "@/components/Button/BackButton";
import ProductPage from "@/components/Products/ProductPage";
import Meta from "@/components/Seo/Meta";
import { usePathname } from "next/navigation";
import { paths } from "../page";
import { useState } from "react";



function CategoryCatalogsPage() {
  const pathname = usePathname();
  const slug = pathname.split("/")[2];
  const [filters, setFilters] = useState({
    sortOrder: "",
  });

  const handleFilterChange = (sortOrder: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      sortOrder,
    }));
  };

  return (
    <div className="mt-12 px-1 sm:px-2">
      <Meta pageType="product" />
      <BreadCrumbs paths={paths} />
      {/* <BackButton /> */}
      
      <ProductPage limit={12} slug={slug} filters={filters} />
    </div>
  );
}

export default CategoryCatalogsPage;
