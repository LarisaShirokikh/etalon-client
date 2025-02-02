"use client";

import BackButton from "@/components/Button/BackButton";
import Meta from "@/components/Seo/Meta";
import { usePathname } from "next/navigation";
import CategoryList from "@/components/Category/CategoryItem";
import CategoryItem from "@/components/Category/CategoryItem";

function CategoryPage() {
  const pathname = usePathname();
  const slug = pathname.split("/")[2];

  console.log("slug", slug);
  return (
    <div className="mt-12 px-1 sm:px-1">
      <Meta pageType="category" />
      <BackButton />
      <CategoryItem slug={""} name={""} />
      {/* <BreadCrumbs paths={paths} /> */}
      <CategoryList slug={""} name={""} />
    </div>
  );
}

export default CategoryPage;
