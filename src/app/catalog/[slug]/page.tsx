"use client";
import Breadcrumbs from "@/components/BreadCrumbs";
import BackButton from "@/components/Button/BackButton";
import ProductList from "@/components/Products/ProductList";
import ProductPage from "@/components/Products/ProductPage";
import Meta from "@/components/Seo/Meta";
import { usePathname } from "next/navigation";

function CategoryCatalogsPage() {
  const pathname = usePathname();
  const slug = pathname.split("/")[2];

  console.log("slug", slug);
  return (
    <div className="mt-12 px-1 sm:px-5">
      <Meta pageType="catalog" />
      <BackButton />
      {/* <Breadcrumbs /> */}
      <ProductPage slug={slug} />
    </div>
  );
}




export default CategoryCatalogsPage;
