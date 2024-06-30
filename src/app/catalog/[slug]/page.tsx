"use client";
import { paths } from "@/utils/path";
import BreadCrumbs from "@/components/BreadCrumbs";
import BackButton from "@/components/Button/BackButton";
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
      <BreadCrumbs paths={paths} />
      <BackButton />
      <ProductPage slug={slug} />
    </div>
  );
}




export default CategoryCatalogsPage;
