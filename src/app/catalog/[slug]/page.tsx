"use client";
import Breadcrumbs from "@/components/BreadCrumbs";
import ProductList from "@/components/Products/ProductList";
import ProductPage from "@/components/Products/ProductPage";
import { usePathname } from "next/navigation";

function CategoryCatalogsPage() {
  const pathname = usePathname();
  const slug = pathname.split("/")[2];

  console.log("slug", slug);
  return (
    <div className="mt-12 px-1 sm:px-5">
      <Breadcrumbs />
      <ProductPage slug={slug} />
    </div>
  );
}

export default CategoryCatalogsPage;
