"use client";

import { useState } from "react";

const ProductVideo = ({ src }: { src: string }) => {
  const [video, setVideo] = useState(0);
  return (
    <div className="p-1">
      <div className="relative w-full h-full">
        <video
          src={src}
          muted
          loop
          className="w-full h-full rounded-lg object-cover"
        />
      </div>
    </div>
  );
};

export default ProductVideo;
