"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from "@/components/Skeleton";
import { ICatalog } from "@/interface/Catalog";
import BrandHeader from "@/components/BrandHeader";
import { IBrand } from "@/interface/Brand";
import Meta from "@/components/Seo/Meta";
import BreadCrumbs from "@/components/BreadCrumbs";
import { paths } from "@/utils/path";
import BackButton from "@/components/Button/BackButton";
import CatalogItem from "@/components/Catalogs/CatalogItem";
import CategoryItem from "@/components/Category/CategoryItem";

const CatalogPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const [catalogs, setCatalogs] = useState<ICatalog[]>([]);
  const [brand, setBrand] = useState<IBrand | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCatalogsAndBrand = async () => {
      try {
        const [catalogResponse, brandResponse] = await Promise.all([
          axios.get(`/api/brands/${slug}/catalogs`),
          axios.get(`/api/brands/${slug}`),
        ]);

        setCatalogs(catalogResponse.data);
        setBrand(brandResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalogsAndBrand();
  }, [slug]);

  if (loading) {
    return <Skeleton />;
  }

  if (!brand) {
    return <div>No brand found</div>;
  }

  if (catalogs.length === 0) {
    return <div>No catalogs found</div>;
  }

  return (
    <div className="px-4 mt-12 mb-12">
      <Meta pageType="brend" />
      <BackButton />
      <CategoryItem slug={""} name={""} />
      {/* <BreadCrumbs paths={paths} /> */}
      <BrandHeader brand={brand} />
      <div className="grid grid-cols-2 mt-12 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-8">
        {catalogs.map((catalog) => (
          <CatalogItem key={catalog.slug} slug={catalog.slug} />
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;
