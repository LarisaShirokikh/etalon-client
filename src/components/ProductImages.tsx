"use client";

import Image from "next/image";
import { useState } from "react";

const ProductImages = ({ items }: { items: string[] }) => {
  const [index, setIndex] = useState(0);

  return (
    <div className="p-1">
      <div className="h-[400px] relative">
        <Image
          src={items[index]}
          alt=""
          fill
          sizes="50vw"
          className="object-contain rounded-md"
        />
      </div>
      <div className="flex justify-between gap-2 mt-1">
        {items.map((item: string, i: number) => (
          <div
            className="w-1/4 h-32 relative gap-2 cursor-pointer"
            key={i}
            onClick={() => setIndex(i)}
          >
            <Image
              src={item}
              alt=""
              fill
              sizes="30vw"
              className="object-contain rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
