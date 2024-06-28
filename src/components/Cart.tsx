"use client";
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { Trash, Plus, Minus } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

interface FormData {
  name: string;
  phone: string;
  address: string;
  contactMethod: string;
  isAgreed: boolean;
  needMeasurement: boolean;
}

interface FormErrors {
  name?: string;
  phone?: string;
  address?: string;
  contactMethod?: string;
  isAgreed?: string;
}

const Cart = () => {
  const { cartItems, removeFromCart, addToCart, decreaseQuantity, clearCart } =
    useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "+7",
    address: "",
    contactMethod: "phone",
    isAgreed: true,
    needMeasurement: false,
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    let valid = true;
    const errors: FormErrors = {};

    if (!formData.name.trim()) {
      errors.name = "Пожалуйста, введите ваше Ф.И.О.";
      valid = false;
    }

    const phoneRegex = /^\+?\d{11,}$/;
    if (!phoneRegex.test(formData.phone)) {
      errors.phone =
        "Неверный формат номера телефона. Введите номер в формате +7(___)___-__-__";
      valid = false;
    }

    if (!formData.address.trim()) {
      errors.address = "Пожалуйста, введите ваш адрес";
      valid = false;
    }

    if (!formData.contactMethod) {
      errors.contactMethod = "Выберите способ связи";
      valid = false;
    }

    if (!formData.isAgreed) {
      errors.isAgreed = "Вы должны согласиться с политикой конфиденциальности";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post("/api/order", {
        ...formData,
        items: cartItems.map((item) => item._id), // Assuming cartItems have _id property
      });
      if (response.data.success) {
        setIsSubmitted(true);
        clearCart(); // Clear cart after successful submission
      } else {
        toast.error("Ошибка при отправке заказа.");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      toast.error("Ошибка при отправке заказа.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phone" && !/^[\d+]*$/.test(value)) {
      // Если введенный символ не является цифрой или "+", игнорируем его
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleContactMethodChange = (method: string) => {
    setFormData({ ...formData, contactMethod: method });
  };

  const handleAgreementChange = () => {
    setFormData({ ...formData, isAgreed: !formData.isAgreed });
  };

  const handleMeasurementChange = () => {
    setFormData({ ...formData, needMeasurement: !formData.needMeasurement });
  };

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Корзина</h1>
      {isSubmitted ? (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
          Заказ успешно отправлен. Менеджер свяжется с вами в течение 15-20
          минут.
        </div>
      ) : null}
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
        <div className="pt-4">
          <div className="flex justify-between items-center">
            <p className="text-xl font-semibold">
              Общая сумма: {calculateTotal()} рублей
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <input
                type="text"
                placeholder="Ф.И.О."
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 ${
                  formErrors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-500"
                }`}
              />
              {formErrors.name && (
                <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                id="phone"
                placeholder="+7(___)___-__-__"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 ${
                  formErrors.phone
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-500"
                }`}
              />
              {formErrors.phone && (
                <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                id="address"
                placeholder="Адрес"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 ${
                  formErrors.address
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-500"
                }`}
              />
              {formErrors.address && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.address}
                </p>
              )}
            </div>
            <h2 className="text-sm">Способ связи</h2>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="phoneRadio"
                  name="contactMethod"
                  value="phone"
                  checked={formData.contactMethod === "phone"}
                  onChange={() => handleContactMethodChange("phone")}
                  className={`h-4 w-4 ${
                    formErrors.contactMethod
                      ? "text-red-600 border-red-500"
                      : "text-gray-600 border-gray-300"
                  } focus:ring-2 ${
                    formErrors.contactMethod
                      ? "focus:ring-red-500"
                      : "focus:ring-gray-500"
                  }`}
                />
                <label
                  htmlFor="phoneRadio"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Звонок по телефону
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="whatsappRadio"
                  name="contactMethod"
                  value="whatsapp"
                  checked={formData.contactMethod === "whatsapp"}
                  onChange={() => handleContactMethodChange("whatsapp")}
                  className={`h-4 w-4 ${
                    formErrors.contactMethod
                      ? "text-red-600 border-red-500"
                      : "text-gray-600 border-gray-300"
                  } focus:ring-2 ${
                    formErrors.contactMethod
                      ? "focus:ring-red-500"
                      : "focus:ring-gray-500"
                  }`}
                />
                <label
                  htmlFor="whatsappRadio"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Сообщение в WhatsApp
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="telegramRadio"
                  name="contactMethod"
                  value="telegram"
                  checked={formData.contactMethod === "telegram"}
                  onChange={() => handleContactMethodChange("telegram")}
                  className={`h-4 w-4 ${
                    formErrors.contactMethod
                      ? "text-red-600 border-red-500"
                      : "text-gray-600 border-gray-300"
                  } focus:ring-2 ${
                    formErrors.contactMethod
                      ? "focus:ring-red-500"
                      : "focus:ring-gray-500"
                  }`}
                />
                <label
                  htmlFor="telegramRadio"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Сообщение в Telegram
                </label>
              </div>
              {formErrors.contactMethod && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.contactMethod}
                </p>
              )}
            </div>

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="measurement"
                checked={formData.needMeasurement}
                onChange={handleMeasurementChange}
                className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
              />
              <label
                htmlFor="measurement"
                className="ml-2 block text-sm text-gray-700"
              >
                Нужен замер
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="agreement"
                checked={formData.isAgreed}
                onChange={handleAgreementChange}
                className={`h-4 w-4 ${
                  formErrors.isAgreed
                    ? "text-red-600 border-red-500"
                    : "text-gray-600 border-gray-300"
                } rounded focus:ring-2 ${
                  formErrors.isAgreed
                    ? "focus:ring-red-500"
                    : "focus:ring-gray-500"
                }`}
              />
              <label
                htmlFor="agreement"
                className="ml-2 block text-sm text-gray-700"
              >
                Нажимая кнопку отправить заявку вы соглашаетесь с политикой
                конфиденциальности
              </label>
              {formErrors.isAgreed && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.isAgreed}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 rounded-md bg-gray-300 text-gray-700 text-sm font-semibold hover:bg-blue-400 transition-colors"
            >
              Отправить заказ
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Cart;
