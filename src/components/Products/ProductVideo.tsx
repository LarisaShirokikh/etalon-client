"use client";

import { useState } from "react";

const ProductVideo = ({ src }: { src: string }) => {
  const [video, setVideo] = useState(0);

  return (
    <div className="p-1">
      <div className="relative w-full h-full">
        <video
          autoPlay
          playsInline
          muted
          loop
          controls={false}
          preload="auto"
          className="w-full h-full rounded-lg object-cover"
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default ProductVideo;
