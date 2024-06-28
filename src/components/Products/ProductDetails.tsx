import React, { useContext, useState } from "react";
import Button from "@/components/Button/Button";
import { IProduct } from "@/interface/Product";
import { ShoppingBasket, PencilRuler } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartModal from "@/components/CartModal";

const ProductDetails = ({ item }: { item: IProduct }) => {
  const { addToCart } = useCart();
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = () => {
    console.log("Нажата кнопка 'Добавить в корзину'");
    addToCart(item);
    setShowModal(true);
  };

  const сloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="w-full lg:w-2/3 xl:w-1/2 mx-auto px-4 py-8">
      <h1 className="text-2xl text-gray-800 font-medium">{item.title}</h1>
      <p className="text-gray-500">{item.description}</p>
      <div className="h-[2px] bg-gray-100 my-4" />
      {item.price && (
        <div className="flex items-center gap-4">
          {item.price.price !== item.price.discountedPrice && (
            <h3 className="text-lg text-gray-500 line-through">
              {item.price.price} рублей
            </h3>
          )}
          <h2 className="font-bold text-green-800 text-xl">
            {item.price.discountedPrice} рублей
          </h2>
        </div>
      )}
      <div className="h-[2px] bg-gray-100 my-4" />
      <div className="grid grid-cols-2 gap-4 text-gray-800">
        <div>
          <strong>Конструкция:</strong> {item.design}
        </div>
        <div>
          <strong>Количество контуров:</strong> {item.contours}
        </div>
        <div>
          <strong>Утеплитель:</strong> {item.insulation}
        </div>
        <div>
          <strong>Толщина:</strong> {item.thickness}
        </div>
        <div>
          <strong>Основной замок:</strong> {item.mainLock}
        </div>
        <div>
          <strong>Дополнительный замок:</strong> {item.additionalLock}
        </div>
        <div>
          <strong>Внешняя отделка:</strong> {item.exterior}
        </div>
        <div>
          <strong>Внутренняя отделка:</strong> {item.interior}
        </div>
        <div>
          <strong>Петли:</strong> {item.loops}
        </div>
        <div>
          <strong>Защита:</strong> {item.protection}
        </div>
      </div>
      <div className="h-[2px] bg-gray-100 " />
      <div className="flex justify-between gap-2 items-center my-4">
        <Button text="Вызвать замерщика" className="border-gray-700" />
        <button
          className="flex items-center gap-2 px-2 py-1 bg-gray-500 text-red-50 border rounded-lg hover:bg-red-400 transition-colors"
          onClick={handleAddToCart}
        >
          {<ShoppingBasket size={30}/>}
          <span className="">Добавить в корзину</span>
        </button>
      </div>
      <CartModal isOpen={showModal} onClose={сloseModal} />
    </div>
  );
};

export default ProductDetails;
