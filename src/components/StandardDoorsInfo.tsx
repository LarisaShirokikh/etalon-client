"use client";

import Button from "./Button";

const StandardDoorsInfo = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 text-gray-600">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">
        Все двери стандартных размеров в наличии
      </h1>
      <div className="flex flex-col md:flex-row gap-5 mt-12">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6 md:mb-0">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">По коробу:</h2>
          <p className="text-lg md:text-xl mb-4">960х2050, 880х2050 мм</p>
          <a
            href="/category/vse-dveri/catalogs"
            className="block w-full md:w-auto bg-black text-white text-center py-2 px-4 rounded-lg mb-4 hover:bg-gray-800 transition-colors"
          >
            Перейти в каталог
          </a>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6 md:mb-0">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            Открывание:
          </h2>
          <p className="text-lg md:text-xl mb-4">Петли справа/слева</p>
          <a
            href="/category/vse-dveri/catalogs"
            className="block w-full md:w-auto bg-black text-white text-center py-2 px-4 rounded-lg mb-4 hover:bg-gray-800 transition-colors"
          >
            Перейти в каталог
          </a>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            Не подошел размер?
          </h2>
          <p className="text-lg md:text-xl mb-4">Сделаем под заказ!</p>
          <a
            href="/category/custom-order"
            className="block w-full md:w-auto bg-red-500 text-white text-center py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
          >
            Заказать
          </a>
          {/* <Button
            text="Заказать"
            className="block w-full md:w-auto bg-red-500  text-black text-center py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default StandardDoorsInfo;
