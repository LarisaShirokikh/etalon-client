import React from "react";
import Image from "next/image";

const SimpleSlider = () => {
  const slide = {
    id: 1,
    imageUrl: "/slice.png",
    altText: "Баннер",
  };

  return (
    <div className="mx-auto p-4 max-w-lg rounded-lg overflow-hidden ">
      <Image
        src={slide.imageUrl}
        alt={slide.altText}
        width={600}
        height={200}
        className="rounded-lg"
        priority
      />
    </div>
  );
};

export default SimpleSlider;
