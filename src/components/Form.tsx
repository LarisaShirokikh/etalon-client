"use client";
import React, { useState } from "react";
import axios from "axios";

interface ButtonProps {
  text: string;
  className?: string;
  href?: string;
}

interface FormData {
  name: string;
  phone: string;
  address: string;
  contactMethod: string;
  isAgreed: boolean;
}

const Button: React.FC<ButtonProps> = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "+7",
    address: "",
    contactMethod: "phone",
    isAgreed: true,
  });

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const phoneRegex = /^\+?\d{11,}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert(
        "Неверный формат номера телефона. Введите номер в формате +7(___)___-__-__"
      );
      return;
    }
    try {
      const response = await axios.post("/api/contact", formData);
      if (response.data.success) {
        setIsSubmitted(true);
      } else {
        // Обработка ошибки
        alert("Ошибка при отправке данных.");
      }
    } catch (error) {
      // Обработка ошибки сети или других ошибок
      console.error("Ошибка:", error);
    }
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/labirint-posle.webp')" }}
    >
      <div className="max-w-md w-full mx-auto p-6 bg-white shadow-lg rounded-lg bg-opacity-90">
        <div>
          {isSubmitted ? (
            <div className="text-center">
              <p className="text-lg font-semibold text-green-600">
                Заявка успешно отправлена!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-lg font-bold">Записаться на замер</h2>
              <p className="text-sm">Специалист приедет в удобное время</p>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Ф.И.О."
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  id="phone"
                  placeholder="+7(___)___-__-__"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  id="address"
                  placeholder="Адрес"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <h2 className="text-sm mt-4">Способ связи</h2>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="phoneRadio"
                    name="contactMethod"
                    value="phone"
                    checked={formData.contactMethod === "phone"}
                    onChange={() => handleContactMethodChange("phone")}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
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
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
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
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label
                    htmlFor="telegramRadio"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Сообщение в Telegram
                  </label>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="agreement"
                  checked={formData.isAgreed}
                  onChange={handleAgreementChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="agreement"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Нажимая кнопку отправить заявку вы соглашаетесь с политикой
                  конфиденциальности
                </label>
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 rounded-md bg-red-100 text-gray-700 text-sm font-semibold hover:bg-red-300 transition-colors"
              >
                Отправить заявку
              </button>
              <p className="text-xs mt-4 text-gray-600">
                Стоимость замера 1000 рублей, затем компенсируется при заказе (в
                пределах МКАДа). Выезд от МКАДа оплачивается дополнительно +40
                руб./1 км.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Button;
