"use client";
import React, { useState } from "react";
import Image from "next/image";
import { IBrand } from "@/interface/Brand";

interface BrandHeaderProps {
  brand: IBrand;
}

const BrandHeader: React.FC<BrandHeaderProps> = ({ brand }) => {
  const [loaded, setLoaded] = useState(false);

  const handleImageLoaded = () => {
    setLoaded(true);
  };

  return (
    <div className="flex mt-5 bg-white p-2 mb-4 items-center gap-1">
      <div className="w-40 h-40 sm:w-48 sm:h-16 flex-shrink-0 relative">
        <Image
          src={brand.images?.[0] || "/brand-placeholder.png"}
          alt={brand.name}
          layout="fill"
          objectFit="contain"
          className={`rounded-md ${loaded ? "opacity-100" : "opacity-0"}`}
          onLoad={handleImageLoaded}
        />
      </div>
      <div className="flex flex-col justify-center">
        <h1 className="text-xl sm:text-xl font-semibold text-gray-700 mb-2">
          {brand.name}
        </h1>
        {/* Дополнительные детали бренда могут быть добавлены здесь */}
      </div>
    </div>
  );
};

export default BrandHeader;
