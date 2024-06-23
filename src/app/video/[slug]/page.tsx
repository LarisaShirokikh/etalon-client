"use client";

import { paths } from "@/utils/path";
import BreadCrumbs from "@/components/BreadCrumbs";
import FrameInstallationInfo from "@/components/FrameInstallationInfo";
import ProductDetails from "@/components/Products/ProductDetails";
import ProductPage from "@/components/Products/ProductPage";
import ProductVideo from "@/components/Products/ProductVideo";
import ServiceDetails from "@/components/ServiceDetails";
import Skeleton from "@/components/Skeleton";
import { IProductVideo } from "@/interface/ProductVideo";
import axios from "axios";
import { notFound } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const VideoSinglPage = ({ params }: { params: { slug: string } }) => {
  const [video, setVideo] = useState<IProductVideo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/video`, {
          params: { slug: params.slug },
        });

        setVideo(response.data);
      } catch (error) {
        console.error("Error fetching product with video:", error);
        setVideo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.slug]);

  useEffect(() => {
    if (video) {
      console.log("Fetched product with video:", video);
    }
  }, [video]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!video) {
    return notFound();
  }

  return (
    <div className="mt-12 px-1 sm:px-5">
      <BreadCrumbs paths={paths} />
      <div className="px-2 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
        {/* video */}
        <div className="w-full lg:w-1/2 lg:sticky top-20 h-max p-4 lg:p-0">
          <ProductVideo src={video.video[0]} />
        </div>
        {/* TEXTS */}
        <ProductDetails item={video} />
      </div>
      <ServiceDetails />
      <FrameInstallationInfo />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">Новинки</h1>
        <Suspense fallback={<Skeleton />}>
          <ProductPage limit={4} />
        </Suspense>
      </div>
    </div>
  );
};

export default VideoSinglPage;
