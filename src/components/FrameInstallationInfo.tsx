import React from "react";

const DoorFrameInstallation = () => {
  return (
    <div className="mt-12 max-w-3xl mx-auto p-4 text-gray-600">
      <h1 className="mt-12 text-2xl md:text-3xl font-bold mb-4 text-center">
        Обрамление проема после монтажа
      </h1>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg border border-gray-300">
          <h2 className="text-lg font-semibold mb-2">
            Стандартный комплект 150 мм (в пределах МКАДа)
          </h2>
          <p>Установка и доставка: 3500 руб.</p>
        </div>
        <div className="p-4 rounded-lg border border-gray-300">
          <h2 className="text-lg font-semibold mb-2">
            Нестандартный комплект 200 мм (в пределах МКАДа)
          </h2>
          <p>Установка и доставка: 4000 руб.</p>
        </div>
        <div className="p-4 rounded-lg border border-gray-300">
          <h2 className="text-lg font-semibold mb-2">
            Нестандартный комплект от 300 мм (в пределах МКАДа)
          </h2>
          <p>Установка и доставка: 4500 руб.</p>
        </div>
        <div className="p-4 rounded-lg border border-gray-300">
          <h2 className="text-lg font-semibold mb-2">
            Дополнительная установка порога
          </h2>
          <p>Стоимость: 1000 руб.</p>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-lg font-semibold mb-2">Выезд от МКАДа</h2>
        <p>Стоимость: +40 руб./1 км</p>
      </div>
      <div className="mt-12">
        <h2 className="text-lg font-semibold mb-2">
          Распродажа! СТАНДАРТ Комплект добора 150х2200 мм
        </h2>
        <p>Бетон темный: 7000 руб.</p>
        <p>Винорит Алмон 25: 6500 руб.</p>
      </div>
    </div>
  );
};

export default DoorFrameInstallation;
