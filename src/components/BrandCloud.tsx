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
        // const brandsWithSlug = response.data.map((brand: IBrand) => {
        //   const slug = slugify(brand.name);
        //   return {
        //     ...brand,
        //     slug: slug,
        //     src: `/brands/${slug}/catalogs`,
        //   };
        // });
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
    <div className="py-8 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="flex flex-wrap gap-4 justify-center">
        {brands.map((brand) => (
          <Link href={`/brands/${brand.slug}`} key={brand.name}>
            <div className="bg-gray-100 text-gray-800 py-2 px-4 rounded-full  hover:bg-gray-200 transition-transform duration-300 cursor-pointer">
              {brand.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BrandCloud;
