"use client";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import axios from "axios";

interface ButtonProps {
  text: string;
}

interface FormData {
  name: string;
  phone: string;
  address: string;
  contactMethod: string;
  isAgreed: boolean;
}

const Button: React.FC<ButtonProps> = ({ text }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    address: "",
    contactMethod: "phone",
    isAgreed: true,
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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
    <div>
      <button
        className="mt-2 mb-2 self-center rounded-lg border border-black bg-transparent text-black py-2 px-4 text-sm hover:bg-black hover:text-white transition-colors"
        onClick={handleOpenModal}
      >
        {text}
      </button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {isSubmitted ? (
          <div>
            <p>Заявка успешно отправлена!</p>
            <button
              onClick={handleCloseModal}
              className="mt-2 self-center rounded-lg border border-black bg-transparent text-black py-2 px-4 text-sm hover:bg-black hover:text-white transition-colors"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 className="text-lg font-bold mb-4">Записаться на замер</h2>
            <h2 className="text-sm mb-4">Специалист приедет в удобное время</h2>
            <div className="mt-4 flex items-center justify-between gap-4 bg-gray-50 p-2 rounded-md flex-1">
              <input
                type="text"
                placeholder="Ф.И.О."
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="flex-1 bg-transparent outline-none"
              />
            </div>
            <div className="mt-4 flex items-center justify-between gap-4 bg-gray-50 p-2 rounded-md flex-1">
              <input
                type="text"
                id="phone"
                placeholder="+7(___)___-__-__"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="flex-1 bg-transparent outline-none"
              />
            </div>
            <div className="mt-4 flex items-center justify-between gap-4 bg-gray-50 p-2 rounded-md flex-1">
              <input
                type="text"
                id="address"
                placeholder="Адрес"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="flex-1 bg-transparent outline-none"
              />
            </div>
            <h2 className="mt-4 text-sm mb-4">Способ связи</h2>
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="phoneRadio"
                  name="contactMethod"
                  value="phone"
                  checked={formData.contactMethod === "phone"}
                  onChange={() => handleContactMethodChange("phone")}
                  className="h-4 w-4 text-black focus:ring-black-500 border-black-300"
                />
                <label
                  htmlFor="phoneRadio"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Звонок по телефону
                </label>
              </div>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="whatsappRadio"
                  name="contactMethod"
                  value="whatsapp"
                  checked={formData.contactMethod === "whatsapp"}
                  onChange={() => handleContactMethodChange("whatsapp")}
                  className="h-4 w-4 text-black focus:ring-black-500 border-gray-300"
                />
                <label
                  htmlFor="whatsappRadio"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Сообщение в WhatsApp
                </label>
              </div>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="telegramRadio"
                  name="contactMethod"
                  value="telegram"
                  checked={formData.contactMethod === "telegram"}
                  onChange={() => handleContactMethodChange("telegram")}
                  className="h-4 w-4 text-black-600 focus:ring-black-500 border-gray-300"
                />
                <label
                  htmlFor="telegramRadio"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Сообщение в Telegram
                </label>
              </div>
            </div>
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="agreement"
                checked={formData.isAgreed}
                onChange={handleAgreementChange}
                className="h-4 w-4 text-black-600 focus:ring-black-500 border-gray-300 rounded"
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
              className="mt-2 self-center rounded-lg border border-black bg-transparent text-black py-2 px-4 text-sm hover:bg-black hover:text-white transition-colors"
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
      </Modal>
    </div>
  );
};

export default Button;
