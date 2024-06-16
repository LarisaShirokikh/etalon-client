"use client";

import { useState } from "react";
import Image from "next/image";

const DoorTrimsInfo = () => {
  const [isBefore, setIsBefore] = useState(true);

  const trimSets = [
    {
      name: "Комплект телескопического погонажа Белый софт",
      image:
        "https://labirintdoors.ru/images/009/145/317/9145317/380x507no_crop/dobory-white.jpg",
      price: "8500 руб.",
    },
    {
      name: "Комплект телескопического погонажа Сандал белый",
      image:
        "https://labirintdoors.ru/images/009/145/365/9145365/380x507no_crop/dobory-sandal.jpg",
      price: "8500 руб.",
    },
    {
      name: "Комплект телескопического погонажа Капучино 853-2 (Крем софт)",
      image:
        "https://labirintdoors.ru/images/009/156/999/9156999/380x507no_crop/dobory-cappucino.jpg",
      price: "8500 руб.",
    },
    {
      name: "Комплект телескопического погонажа Белое дерево",
      image:
        "https://labirintdoors.ru/images/009/157/015/9157015/380x507no_crop/dobory-beloederevo.jpg",
      price: "7500 руб.",
    },
    {
      name: "Комплект телескопического погонажа Грей софт",
      image:
        "https://labirintdoors.ru/images/009/145/375/9145375/380x507no_crop/dobory-grey.jpg",
      price: "8500 руб.",
    },
    {
      name: "Комплект телескопического погонажа Графит софт",
      image:
        "https://labirintdoors.ru/images/009/145/677/9145677/380x507no_crop/dobory-graphite.jpg",
      price: "8500 руб.",
    },
    {
      name: "Комплект телескопического погонажа Бетон светлый",
      image:
        "https://labirintdoors.ru/images/009/145/791/9145791/380x507no_crop/dobory-betonsvetly.jpg",
      price: "7500 руб.",
    },
    {
      name: "Комплект телескопического погонажа Черный кварц",
      image:
        "https://labirintdoors.ru/images/009/145/335/9145335/380x507no_crop/dobory-kvarz.jpg",
      price: "8500 руб.",
    },
    {
      name: "Комплект телескопического погонажа Венге",
      image:
        "https://labirintdoors.ru/images/009/145/871/9145871/380x507no_crop/dobory-venge.jpg",
      price: "7500 руб.",
    },
    {
      name: "Комплект телескопического погонажа Орех бренди",
      image:
        "https://labirintdoors.ru/images/009/439/456/9439456/380x507no_crop/dobory-brendi.jpg",
      price: "8500 руб.",
    },
    {
      name: "Комплект телескопического погонажа Беленый дуб",
      image:
        "https://labirintdoors.ru/images/009/146/606/9146606/380x507no_crop/dobory-belenydub.jpg",
      price: "7500 руб.",
    },
    {
      name: "Комплект телескопического погонажа Грунт под покраску",
      image:
        "https://labirintdoors.ru/images/009/157/002/9157002/380x507no_crop/dobory-podpokrasky.jpg",
      price: "10000 руб.",
    },
    {
      name: "Комплект телескопического погонажа Белый рельеф софт",
      image:
        "https://labirintdoors.ru/images/009/524/291/9524291/380x507no_crop/dobory-reliefwhite.jpg",
      price: "9000 руб.",
    },
    {
      name: "Комплект телескопического погонажа Серый рельеф софт",
      image:
        "https://labirintdoors.ru/images/009/524/300/9524300/380x507no_crop/dobory-reliefgrey.jpg",
      price: "9000 руб.",
    },
    {
      name: "Комплект телескопического погонажа RAL 9003 Эмаль",
      image:
        "https://labirintdoors.ru/images/009/146/644/9146644/380x507no_crop/dobory-RAL9003.jpg",
      price: "12000 руб.",
    },
  ];

  const handleMouseDown = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: { clientX: number }) => {
    const divider = document.querySelector(".divider") as HTMLElement;
    const container = document.querySelector(".image-container") as HTMLElement;
    if (container) {
      const offsetX = e.clientX - container.getBoundingClientRect().left;
      const containerWidth = container.offsetWidth;
      let percentage = (offsetX / containerWidth) * 100;

      if (percentage < 0) percentage = 0;
      if (percentage > 100) percentage = 100;

      divider.style.left = `${percentage}%`;
      container.style.setProperty("--percentage", `${percentage}%`);
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="mt-12 max-w-3xl mx-auto p-4 text-gray-600">
      <h1 className="mt-12 text-2xl md:text-3xl font-bold mb-4 text-center">
        Доборы для входных дверей
      </h1>
      <p className="mt-12 text-lg md:text-xl mb-4">
        Доборы для входных дверей играют ключевую роль в завершающем этапе
        монтажа и обеспечивают не только эстетическое завершение, но и
        функциональные преимущества. Вот как они вносят значимый вклад в общий
        комфорт и безопасность вашего дома:
        <br />
        <br />
        <strong>Декоративное завершение:</strong> Доборы представляют собой
        декоративные элементы из МДФ (массива древесных волокон), которые
        устанавливаются вокруг металлического короба входной двери. Они создают
        завершенный и стильный внешний вид, придают двери элегантность и
        завершенность.
        <br />
        <br />
        <strong>Скрытие монтажного шва:</strong> Одна из важных функций доборов
        - это закрытие монтажного шва между коробом двери и стеной. Это
        позволяет сделать установленную дверь более привлекательной визуально,
        скрывая неровности и пространство между дверным коробом и стеной.
        <br />
        <br />
        <strong>Герметизация и изоляция:</strong> Установка доборов помогает
        герметизировать пространство между стеной и дверным коробом. Это важно
        для минимизации вероятности сквозняков, проникновения неприятных запахов
        извне и увеличения шумоизоляции в помещении.
        <br />
        <br />
        <strong>Защита от внешних факторов:</strong> Доборы также могут служить
        дополнительной защитой от внешних факторов, таких как пыль, грязь, влага
        и даже насекомые. Они помогают создать более плотное и надежное
        соединение между дверным коробом и стеной, что способствует сохранению
        чистоты и безопасности внутри помещения.
        <br />
        <br />
        <strong>Улучшение энергоэффективности:</strong> Плотное закрытие
        монтажного шва с помощью доборов также может способствовать улучшению
        энергоэффективности помещения. Это помогает снизить теплопотери через
        пространство между дверью и стеной, что в конечном итоге может
        сэкономить энергию и снизить расходы на отопление или кондиционирование
        воздуха.
        <br />
        <br />В целом, доборы для входных дверей не только придают вашему дому
        эстетическую привлекательность и завершенность, но и обеспечивают
        функциональные преимущества, повышая комфорт, безопасность и
        энергоэффективность вашего жилища.
      </p>

      <div className="relative image-container h-64 md:max-w-full md:h-96 overflow-hidden">
        <div className="image-wrapper">
          <Image
            src="/labirint-do.webp"
            alt="Before"
            fill
            className={`absolute top-0 left-0 before-image`}
            style={{
              clipPath: `polygon(0 0, var(--percentage) 0, var(--percentage) 100%, 0 100%)`,
              transition: "clip-path 0.2s ease-out",
            }}
          />
          <Image
            src="/labirint-posle.webp"
            alt="After"
            fill
            className={`absolute top-0 left-0 after-image`}
            style={{
              clipPath: `polygon(var(--percentage) 0, 100% 0, 100% 100%, var(--percentage) 100%)`,
              transition: "clip-path 0.2s ease-out",
            }}
          />
        </div>
        <div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 bg-white cursor-ew-resize divider"
          style={{
            height: "100%",
            width: "4px", // Установка ширины разделителя
            zIndex: "10",
            transition: "left 0.2s ease-out",
          }}
          onMouseDown={handleMouseDown}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border border-gray-700"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gray-700 rounded-full"></div>
        </div>
      </div>

      <h2 className="mt-12 text-xl text-center md:text-2xl font-semibold mb-4">
        Телескопический погонаж
      </h2>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trimSets.map((set, index) => (
          <div key={index} className=" p-4 rounded-lg ">
            <img src={set.image} alt={set.name} className="w-full mb-2" />
            <h3 className="text-lg font-semibold mb-2">{set.name}</h3>
            <p className="text-gray-800">{set.price}</p>
          </div>
        ))}
      </div>
      <h2 className="mt-12 text-xl md:text-2xl font-semibold mb-4">Важно!</h2>
      <p className="text-lg md:text-xl mb-4">
        Перед установкой необходимо проверить цвет добора и внутренней панели, в
        зависимости от партии пленки оттенок может отличаться.
      </p>
    </div>
  );
};
export default DoorTrimsInfo;
