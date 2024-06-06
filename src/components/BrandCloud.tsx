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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {brands.map((brand) => (
          <Link href={`/brand/${brand.slug}`} key={brand.name}>
            <div className="relative w-full h-96 sm:h-40 md:h-48 lg:h-96 flex">
              <Image
                src={
                  brand.images && brand.images[0]
                    ? brand.images[0]
                    : "/brand.png"
                }
                alt={brand.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-4">
              <h3 className="mt-1 font-light text-m tracking-wide text-center">
                {brand.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BrandCloud;
