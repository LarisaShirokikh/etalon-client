"use client";
import BackButton from "@/components/Button/BackButton";
import ProductList from "@/components/Products/ProductList";
import Meta from "@/components/Seo/Meta";
import { Metadata } from "next";
import { usePathname } from "next/navigation";



function CategoryCatalogsPage() {
  const pathname = usePathname();
  const slug = pathname.split("/")[2];

  console.log("slug", slug);
  return (
    <div className="mt-12 px-1 sm:px-5">
      <Meta pageType="product" />
      <BackButton />
      {/* <Breadcrumbs /> */}
      <ProductList slug={slug} limit={24} />
      {/* <Pagination/> */}
    </div>
  );
}

export default CategoryCatalogsPage;
