"use client";

import BackButton from "@/components/Button/BackButton";
import CatalogList from "@/components/Catalogs/CatalogList";
import Meta from "@/components/Seo/Meta";
import { usePathname } from "next/navigation";

function CategoryCatalogsPage() {
  const pathname = usePathname();
  const slug = pathname.split("/")[2];

  console.log("slug", slug);
  return (
    <div className="mt-12 px-1 sm:px-1">
      <Meta pageType="category" />
      <BackButton />
      {/* <Breadcrumbs /> */}
      <CatalogList slug={slug} limit={24} />
    </div>
  );
}

export default CategoryCatalogsPage;
