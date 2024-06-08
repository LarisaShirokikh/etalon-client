"use client";
import Breadcrumbs from "@/components/BreadCrumbs";
import ProductList from "@/components/ProductList";
import { usePathname } from "next/navigation";

function CategoryCatalogsPage() {
  const pathname = usePathname();
  const slug = pathname.split("/")[2];

  console.log("slug", slug);
  return (
    <div className="mt-12 px-1 sm:px-5">
      <Breadcrumbs />
      <ProductList slug={slug} limit={24} />
    </div>
  );
}

export default CategoryCatalogsPage;