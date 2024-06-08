"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import Skeleton from "@/components/Skeleton";
import { ICatalog } from "@/interface/Catalog";
import Breadcrumbs from "@/components/BreadCrumbs";
import BrandHeader from "@/components/BrandHeader";
import { IBrand } from "@/interface/Brand";

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
      <Breadcrumbs />
      <BrandHeader brand={brand} />
      <div className="grid grid-cols-2 mt-12 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-8">
        {catalogs.map((catalog) => (
          <Link href={`/catalog/${catalog.slug}`} key={catalog._id}>
            <div className="relative bg-slate-100 w-full h-96">
              <Image
                src={
                  catalog.images && catalog.images[0]
                    ? catalog.images[0]
                    : "/catalog.png"
                }
                alt={catalog.name}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover"
              />
            </div>
            <h1 className="mt-2 font-light text-m tracking-wide text-center">
              {catalog.name}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;
