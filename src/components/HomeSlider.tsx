import React, { useState, useEffect } from "react";
import Image from "next/image";

const SimpleSlider = () => {
  const [isMobile, setIsMobile] = useState(false);

  const mobileSlide = {
    id: 1,
    imageUrl: "/slice.png",
    altText: "Мобильный баннер",
    width: 600, // Укажите ширину для мобильного баннера
    height: 300, // Укажите высоту для мобильного баннера
  };

  const desktopSlide = {
    id: 2,
    imageUrl: "/slice1.png",
    altText: "Десктоп баннер",
    width: 1200, // Укажите ширину для десктопного баннера
    height: 600, // Укажите высоту для десктопного баннера
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Проверяем размер экрана при первом рендере
    handleResize();

    // Добавляем обработчик события изменения размера окна
    window.addEventListener("resize", handleResize);

    // Удаляем обработчик события при размонтировании компонента
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
      />
    </div>
  );
};

export default SimpleSlider;
