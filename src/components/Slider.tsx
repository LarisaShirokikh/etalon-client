"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

const slides = [
  {
    id: 1,
    img: "/wite.webp",
    url: "/",
  },
  {
    id: 2,
    img: "/issida.webp",
    url: "/",
  },
  {
    id: 3,
    img: "/banner.webp",
    url: "/",
  },
  {
    id: 4,
    img: "/labirint-posle.webp",
    url: "/",
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: sliderRef.current.offsetWidth * current,
        behavior: "smooth",
      });
    }
  }, [current]);

  return (
    <div className="relative h-[300px] overflow-hidden">
      <div
        ref={sliderRef}
        className="flex overflow-x-scroll scrollbar-hide snap-x snap-mandatory"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {slides.map((slide, index) => (
          <Link href={slide.url} key={slide.id} className="snap-start">
            <div
              className={`w-[90vw] h-64 flex-shrink-0 p-2 ${
                current === index ? "scale-100" : "scale-95"
              } transition-transform duration-300`}
            >
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <Image
                  src={slide.img}
                  alt={`Slide ${slide.id}`}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* Slide Indicators */}
      {/* <div className="absolute left-1/2 transform -translate-x-1/2 bottom-4 flex gap-4">
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
      </div> */}
    </div>
  );
};

export default Slider;
