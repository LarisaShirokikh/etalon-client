"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Skeleton from "./Skeleton";
import { IBrand } from "@/interface/Brand";
import { slugify } from "@/utils/slugify";

const BrandCloud = () => {
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get("/api/brands");
        setBrands(response.data);
        console.log("Fetched brands:", response.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  if (loading) {
    return <Skeleton />;
  }

  if (brands.length === 0) {
    return <div>No brands found</div>;
  }

  return (
    <div className="py-8 px-4 sm:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="flex flex-wrap gap-6 justify-center">
        {brands.map((brand) => (
          <Link
            href={`/brand/${brand.slug}`}
            key={brand.name}
            className="inline-flex flex-col items-center"
          >
            <div className="relative inline-block w-auto max-w-xs p-2  rounded-md">
              <Image
                src={
                  brand.images && brand.images[0]
                    ? brand.images[0]
                    : "/brand.png"
                }
                alt={brand.name}
                layout="responsive"
                width={500}
                height={300}
                objectFit="contain"
                className="rounded-md"
              />
            </div>
            <div className="p-2 text-center">
              <h3 className="mt-2 font-light text-m tracking-wide">
                {brand.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
      <style jsx>{`
        @media screen and (max-width: 640px) {
          .inline-block {
            max-width: 100%;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default BrandCloud;
