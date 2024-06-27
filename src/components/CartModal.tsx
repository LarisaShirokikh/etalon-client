import React from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

const CartModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { cartItems } = useCart();
  const lastItem = cartItems[cartItems.length - 1];

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full mx-4 flex flex-row">
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">
                  Товар добавлен в корзину
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 cursor-pointer"
                >
                  <X />
                </button>
              </div>
              <span className="text-xs text-gray-500 mb-4 block">
                Внимание! Изображения и цвета могут отличаться от реальных, в
                зависимости от цветопередачи и разрешения монитора.
              </span>
              <div className="flex items-center">
                {lastItem && (
                  <>
                    <div className="relative w-48 h-24 mr-4">
                      <Image
                        src={lastItem.images?.[0] || "/product.png"}
                        alt={`${lastItem.title} image`}
                        layout="fill"
                        objectFit="contain"
                        className="rounded-md"
                      />
                    </div>
                    <div>
                      <h3 className="text-xs font-medium">{lastItem.title}</h3>
                      <p className="text-s font-bold">
                        {lastItem.price.discountedPrice} рублей
                      </p>
                    </div>
                  </>
                )}
              </div>
            <div className="flex flex-row justify-center ml-2 p-2 mt-2 gap-2">
              
                <Link href="/cart">
                  <button className="bg-red-500 text-s text-white px-4 py-2 rounded-full hover:bg-red-600 transition">
                    Перейти в корзину
                  </button>
                </Link>
                <button
                  onClick={onClose}
                  className="bg-gray-500 text-s text-white px-4 py-2 rounded-full hover:bg-gray-600 transition"
                >
                  Вернуться в магазин
                </button>
              </div>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
};

export default CartModal;
