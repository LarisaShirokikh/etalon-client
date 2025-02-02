"use client";
import BackButton from "@/components/Button/BackButton";
import CatalogList from "@/components/Catalogs/CatalogList";
import Meta from "@/components/Seo/Meta";
import { usePathname } from "next/navigation";
import { paths } from "@/utils/path";
import BreadCrumbs from "@/components/BreadCrumbs";
import CategoryItem from "@/components/Category/CategoryItem";

function CategoryCatalogsPage() {
  const pathname = usePathname();
  const slug = pathname.split("/")[2];

  console.log("slug", slug);
  return (
    <div className="mt-12 px-1 sm:px-5">
      <Meta pageType="catalog" />
      <BackButton />
      <CategoryItem slug={""} name={""} />
      {/* <BreadCrumbs paths={paths} /> */}
      <CatalogList categoryId="665b2b71845f4980629d7714" />
    </div>
  );
}

export default CategoryCatalogsPage;
