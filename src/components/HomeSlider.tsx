import React, { useState, useEffect } from "react";
import Image from "next/image";

const SimpleSlider = () => {
  const [isMobile, setIsMobile] = useState(false);

  const mobileSlide = {
    id: 1,
    imageUrl: "/slice.png",
    altText: "Мобильный баннер",
  };

  const desktopSlide = {
    id: 2,
    imageUrl: "/slice1.png",
    altText: "Десктоп баннер",
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check screen size on initial render
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slide = isMobile ? mobileSlide : desktopSlide;

  return (
    <div className="p-6 overflow-hidden rounded-lg">
      <img
        src={slide.imageUrl}
        alt={slide.altText}
        className="w-full rounded-lg"
      />
    </div>
  );
};

export default SimpleSlider;
