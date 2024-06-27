"use client";
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { Trash, Plus, Minus } from "lucide-react";

const Cart = () => {
  const { cartItems, removeFromCart, addToCart, decreaseQuantity, clearCart } =
    useCart();
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.quantity * item.price.discountedPrice;
    }, 0);
  };

  const handleDecreaseQuantity = (productId: string) => {
    const updatedItem = cartItems.find((item) => item._id === productId);
    if (updatedItem && updatedItem.quantity > 1) {
      decreaseQuantity(updatedItem as any); // Type assertion to avoid ts-ignore
    } else {
      removeFromCart(productId);
    }
  };

  const handleIncreaseQuantity = (productId: string) => {
    const updatedItem = cartItems.find((item) => item._id === productId);
    if (updatedItem) {
      addToCart(updatedItem as any); // Type assertion to avoid ts-ignore
    }
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement order submission logic here
    console.log("Order details:", orderDetails);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Корзина</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Ваша корзина пуста</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Изображение
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Название
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Цена
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Количество
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Сумма
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Управление
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <tr key={item._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-12 h-12 relative">
                      <Image
                        src={item.images?.[0] || "/product.png"}
                        alt={`${item.title} image`}
                        layout="fill"
                        objectFit="contain"
                        className="rounded-md"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.price.discountedPrice} рублей
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <button
                        onClick={() => handleDecreaseQuantity(item._id)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() => handleIncreaseQuantity(item._id)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.quantity * item.price.discountedPrice} рублей
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {cartItems.length > 0 && (
        <form onSubmit={handleOrderSubmit} className="mt-8">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Имя
            </label>
            <input
              type="text"
              name="name"
              value={orderDetails.name}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Телефон
            </label>
            <input
              type="text"
              name="phone"
              value={orderDetails.phone}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Адрес
            </label>
            <input
              type="text"
              name="address"
              value={orderDetails.address}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xl font-semibold">
              Общая сумма: {calculateTotal()} рублей
            </p>
          </div>
          <button
            type="submit"
            className="bg-blue-400 text-white px-4 py-2 rounded-full hover:bg-blue-500 transition ml-4"
          >
            Оформить заказ
          </button>
        </form>
      )}
    </div>
  );
};

export default Cart;
