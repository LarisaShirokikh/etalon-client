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
        const brandsWithSlug = response.data.map((brand: IBrand) => ({
          ...brand,
          src: `/catalogs/${slugify(brand.name)}/products`,
        }));
        setBrands(brandsWithSlug);
        console.log("Fetched brands:", brandsWithSlug);
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
    <div className="py-8 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 justify-items-center">
        {brands.map((brand) => (
          <Link href={`/list?brand=${brand.slug}`} key={brand.name}>
            <div className="relative w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 p-2 hover:scale-110 hover:shadow-lg transition-transform duration-300 cursor-pointer">
              <Image
                src={brand.images?.[0] || "/category.png"}
                alt={brand.name}
                fill
                sizes="20vw"
                className="object-contain"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BrandCloud;
