import React from "react";

const gradients = [
  "from-blue-100 to-purple-50",
  "from-green-100 to-blue-50",
  "from-yellow-100 to-red-50",
  "from-pink-100 to-orange-50",
  "from-indigo-100 to-cyan-50",
];

const CustomBanner = () => {

  const randomGradient =
    gradients[Math.floor(Math.random() * gradients.length)];

  return (
    <div
      className={`relative p-6 overflow-hidden rounded-xl bg-gradient-to-br ${randomGradient} text-gray-600 shadow-lg`}
    >
      {/* Фоновая анимация */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full animate-slow-pulse" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white opacity-20 rounded-full animate-bounce" />
      </div>

      {/* Текст баннера */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <h1 className="text-lg font-bold md:text-4xl lg:text-3xl">
          Монтаж и доставка в пределах МКАД
        </h1>
        <p className="mt-2 text-4xl font-bold">1900 рублей</p>
      </div>
    </div>
  );
};


export default CustomBanner;
