"use client";

import { useState } from "react";
import Breadcrumbs from "./BreadCrumbs";

const ServiceDetails = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className=" mt-12 max-w-4xl mx-auto p-4">
      <Breadcrumbs />
      <h1 className="mt-12 text-2xl md:text-3xl text-gray-700 font-bold mb-4 text-center">
        Сервисная служба компании Двери Эталон
      </h1>
      <p className="text-center text-gray-700 mb-6">
        Вы можете доверять нам, мы отлично делаем свою работу!
      </p>
      {/* <button
        onClick={() => setOpen(!open)}
        className="w-full md:w-auto bg-black text-white py-2 px-4 rounded-lg mb-4 hover:bg-gray-800 transition-colors"
      >
        {open ? "Скрыть детали" : "Показать детали"}
      </button> */}

      <div className="bg-gray-100 p-6 rounded-lg text-gray-600">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">
          Установка и доставка
        </h2>
        <ul className="space-y-2">
          <li className="flex justify-between border-b py-2">
            <span>Стандарт</span>
            <span className="font-semibold">3900 руб.</span>
          </li>
          <li className="flex justify-between border-b py-2">
            <span>Пакет Улица (Термо двери)</span>
            <span className="font-semibold">4500 руб.</span>
          </li>
          <li className="flex justify-between border-b py-2">
            <span>Под заказ (Заказная модель)</span>
            <span className="font-semibold">5000 руб.</span>
          </li>
        </ul>
        <h3 className="text-lg md:text-xl font-medium mt-6 mb-2">
          В стоимость входит:
        </h3>
        <ul className="list-disc list-inside space-y-1 pl-4">
          <li>Монтаж входной двери в готовый стандартный проем</li>
          <li>Доставка до подъезда (в пределах МКАД, далее +40 руб./1 км)</li>
          <li>Разгрузка и подъем двери на грузовом лифте</li>
          <li>Регулировка замков</li>
          <li>Уборка строительного мусора</li>
          <li>Бесплатное гарантийное обслуживание 1 год</li>
        </ul>
      </div>
    </div>
  );
};

export default ServiceDetails;
