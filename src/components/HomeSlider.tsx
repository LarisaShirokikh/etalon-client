import React from "react";
import Image from "next/image";

const ResponsiveBanner = () => {
  const banner = {
    imageUrl: "/slice.webp", // Универсальное изображение
    altText: "Адаптивный баннер",
    blurDataURL: "data:image/jpeg;base64,...",
  };

  return (
    <div className="p-6 overflow-hidden rounded-lg">
      <Image
        src={banner.imageUrl}
        alt={banner.altText}
        layout="responsive" // Автоматически подстраивает изображение под размеры контейнера
        width={1200} // Базовая ширина изображения для десктопа
        height={600} // Базовая высота изображения для десктопа
        className="w-full rounded-lg"
        priority // Высокий приоритет для загрузки баннера
        sizes="(max-width: 768px) 100vw, 50vw" // Установка размеров для адаптивной загрузки
        placeholder="blur"
        blurDataURL={banner.blurDataURL} // Размытие до полной загрузки изображения
      />
    </div>
  );
};

export default ResponsiveBanner;
