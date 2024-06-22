"use client";
import BreadCrumbs from "@/components/BreadCrumbs";
import BackButton from "@/components/Button/BackButton";
import ProductPage from "@/components/Products/ProductPage";
import Meta from "@/components/Seo/Meta";
import { usePathname } from "next/navigation";
import { paths } from "../page";



function CategoryCatalogsPage() {
  const pathname = usePathname();
  const slug = pathname.split("/")[2];

  return (
    <div className="mt-12 px-1 sm:px-5">
      <Meta pageType="product" />
      <BreadCrumbs paths={paths} />
      {/* <BackButton /> */}
      <ProductPage limit={12} slug={slug}/>
    </div>
  );
}

export default CategoryCatalogsPage;
