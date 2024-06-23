"use client";


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

// This function gets called at build time


const SinglePage = ({ params }: { params: { slug: string } }) => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products`, {
          params: { slug: params.slug },
        });

        setProduct(response.data);
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
    <div className="mt-12 px-1 sm:px-5">
      <Meta pageType="product" />
      <BreadCrumbs paths={paths} />
      <div className="px-2 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
        {/* IMG */}
        <div className="w-full lg:w-1/2 lg:sticky top-20 h-max p-4 lg:p-0">
          <ProductImages items={product.images || []} />
        </div>
        {/* TEXTS */}
        <ProductDetails item={product} />
      </div>
      <ServiceDetails />
      <FrameInstallationInfo />
      <div className="mt-24 px-1 md:px-2">
        <h1 className="text-xl">Рекомендуем посмотреть</h1>
        <Suspense fallback={<Skeleton />}>
          <ProductPage limit={6} />
        </Suspense>
      </div>
    </div>
  );
};

export default SinglePage;
