"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import BreadCrumbs from "@/components/BreadCrumbs";
import BackButton from "@/components/Button/BackButton";
import FrameInstallationInfo from "@/components/FrameInstallationInfo";
import ProductDetails from "@/components/Products/ProductDetails";
import ProductImages from "@/components/Products/ProductImages";
import ProductPage from "@/components/Products/ProductPage";
import Meta from "@/components/Seo/Meta";
import ServiceDetails from "@/components/ServiceDetails";
import Skeleton from "@/components/Skeleton";
import { IProduct } from "@/interface/Product";
import axios from "axios";
import { notFound } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { paths } from "@/utils/path";

const SinglePage = ({ params }: { params: { slug: string } }) => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [catalogName, setCatalogName] = useState<string | null>(null);
  const [catalogSlug, setCatalogSlug] = useState<string | null>(null);
  const [brandName, setBrandName] = useState<string | null>(null);
  const [brandSlug, setBrandSlug] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products`, {
          params: { slug: params.slug },
        });
        setProduct(response.data);
        if (response.data.catalog && response.data.catalog.length > 0) {
          const catalogResponse = await axios.get(`/api/catalogs`, {
            params: { catalogId: response.data.catalog },
          });
          const catalogData = catalogResponse.data;
          setCatalogName(catalogData.name);
          setCatalogSlug(catalogData.slug);

          // Fetch the brand based on the catalog data
          if (catalogData.brand) {
            const brandResponse = await axios.get(`/api/brands`, {
              params: { brandId: catalogData.brand },
            });

            const brandData = brandResponse.data;
            setBrandName(brandData.name);
            setBrandSlug(brandData.slug);
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.slug]);

  useEffect(() => {
    if (product) {
      console.log("Fetched product:", product);
    }
  }, [product]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return notFound();
  }

  return (
    <div className="mt-5 px-3 sm:px-5">
      <Meta pageType="product" />
      <BackButton />
      <div className="top-2 px-2 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
        {/* IMG */}
        <div className="w-full lg:w-1/2 lg:sticky top-20 h-max p-4 lg:p-0">
          <ProductImages items={product.images || []} />
          <div className="flex items-center gap-1 p-3 justify-center ">
            {brandName && brandSlug && (
              <div>
                <Link href={`/brand/${brandSlug}`}>
                  <div className="flex text-xs items-center gap-1 px-2 py-2 cursor-pointer bg-gray-200 hover:text-white hover:bg-gray-500 rounded-full transition duration-300">
                    {brandName}
                    <ChevronRight />
                  </div>
                </Link>
              </div>
            )}
            {catalogName && catalogSlug && (
              <div>
                <Link href={`/catalog/${catalogSlug}`}>
                  <div className="flex text-xs items-center gap-1 px-2 py-2 cursor-pointer bg-gray-200 hover:text-white hover:bg-gray-500 rounded-full transition duration-300">
                    {catalogName}
                    <ChevronRight />
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
        {/* TEXTS */}
        <ProductDetails item={product} />
      </div>
      <ServiceDetails />
      <FrameInstallationInfo />

      <h1 className="text-xl mt-14 p-3">Рекомендуем посмотреть</h1>
      <Suspense fallback={<Skeleton />}>
        <ProductPage limit={6} />
      </Suspense>
    </div>
  );
};

export default SinglePage;
