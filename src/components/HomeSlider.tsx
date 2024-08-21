import React, { useState, useEffect } from "react";
import Image from "next/image";

const SimpleSlider = () => {
  const [isMobile, setIsMobile] = useState(false);

  const mobileSlide = {
    id: 1,
    imageUrl: "/slice.png",
    altText: "Мобильный баннер",
    width: 600,
    height: 300,
  };

  const desktopSlide = {
    id: 2,
    imageUrl: "/slice1.png",
    altText: "Десктоп баннер",
    width: 1200,
    height: 600,
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);

    // Проверяем размер экрана при первом рендере
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slide = isMobile ? mobileSlide : desktopSlide;

  return (
    <div className="p-6 overflow-hidden rounded-lg">
      <Image
        src={slide.imageUrl}
        alt={slide.altText}
        width={slide.width}
        height={slide.height}
        className="w-full rounded-lg"
        priority // Ускорение загрузки изображения
      />
    </div>
  );
};

export default SimpleSlider;
