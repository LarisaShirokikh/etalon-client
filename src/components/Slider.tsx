"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    title: "Профессиональный монтаж с гарантией!",
    description: "Привезем и установим в 1 день!",
    img: "/wite.webp",
    url: "/",
  },
  {
    id: 2,
    title: "Новая коллекция входных дверей ISSIDA",
    description: "Цены от 52300 руб!",
    img: "/issida.webp",
    url: "/",
  },
  {
    id: 3,
    title: "Подберем отделку двери под ваш интерьер",
    description: "Скидка на доборы!",
    img: "/wite.webp",
    url: "/",
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[300px] overflow-hidden">
      <div
        className="w-max h-full flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide) => (
          <Link href={slide.url} key={slide.id} className="w-screen h-full">
            <div
              className="w-full h-full flex flex-col xl:flex-row gap-16"
              style={{
                backgroundImage: `url(${slide.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Text Container */}
              <div className="flex flex-col items-center justify-center gap-8 w-full h-full text-center p-4 bg-black bg-opacity-50">
                <h2 className="text-white text-l lg:text-2xl 2xl:text-2xl">
                  {slide.description}
                </h2>
                <h1 className="text-white text-3xl lg:text-4xl 2xl:text-8xl font-semibold">
                  {slide.title}
                </h1>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* Slide Indicators */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-4 flex gap-4">
        {slides.map((slide, index) => (
          <div
            className={`w-3 h-3 rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center transition-transform duration-300 ${
              current === index ? "scale-150" : ""
            }`}
            key={slide.id}
            onClick={() => setCurrent(index)}
          >
            {current === index && (
              <div className="w-[6px] h-[6px] bg-gray-600 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
