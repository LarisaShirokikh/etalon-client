"use client";
import Breadcrumbs from "@/components/BreadCrumbs";
import Pagination from "@/components/Pagination";
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
      {/* <Pagination/> */}
    </div>
  );
}

export default CategoryCatalogsPage;
