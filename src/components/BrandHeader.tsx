import React from "react";
import Image from "next/image";
import { IBrand } from "@/interface/Brand";

interface BrandHeaderProps {
  brand: IBrand;
}

const BrandHeader: React.FC<BrandHeaderProps> = ({ brand }) => {
  return (
    <div className="flex mt-12 bg-white p-6 mb-4 items-center gap-4">
      <div className="w-24 h-12 sm:w-48 sm:h-16 flex-shrink-0 relative">
        <Image
          src={brand.images?.[0] || "/brand-placeholder.png"}
          alt={brand.name}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-col justify-center">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">
          {brand.name}
        </h1>
        {/* Дополнительные детали бренда могут быть добавлены здесь */}
      </div>
    </div>
  );
};

export default BrandHeader;
