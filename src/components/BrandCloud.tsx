"use client";

import Image from "next/image";
import Link from "next/link";

const BrandCloud = ({
  brands,
}: {
  brands: { name: string; logo: string; src: string }[];
}) => {
  return (
    <div className="py-8 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 justify-items-center">
        {brands.map((brand) => (
          <Link href={brand.src} key={brand.name}>
            <div className="relative w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 p-2 hover:scale-110 hover:shadow-lg transition-transform duration-300 cursor-pointer">
              <Image
                src={brand.logo}
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
