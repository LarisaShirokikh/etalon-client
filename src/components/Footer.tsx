import Image from "next/image";
import Link from "next/link";
import {
  FaTelegram,
  FaVk,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-12 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 bg-gray-100 text-sm mt-24">
      <div className="flex flex-col lg:flex-row justify-between">
        {/* Left Section */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4 lg:gap-8">
          <Link href="/">
            <div className="text-lg lg:text-xl tracking-wide font-semibold">
              ДВЕРИ ЭТАЛОН
            </div>
          </Link>
          <p className="text-gray-600">
            Приветствуем вас на нашем сайте. Пожалуйста, обратите внимание, что
            информация, предоставленная здесь, носит исключительно
            информационный характер и не является публичной офертой.
          </p>
          <div className="flex gap-4 items-center">
            <FaEnvelope size={24} className="text-gray-700" />
            <a
              href="mailto:2823577@mail.ru"
              className="flex items-center text-gray-700"
            >
              2823577@mail.ru
            </a>
          </div>
          <div className="flex gap-4 items-center">
            <FaPhoneAlt size={24} className="text-gray-700" />
            <a
              href="tel:+1234567890"
              className="flex items-center text-gray-700"
            >
              +7 (926) 021 7365
            </a>
          </div>
          <div className="flex gap-6">
            <FaTelegram size={24} className="text-gray-700" />
            <FaVk size={24} className="text-gray-700" />
            <FaYoutube size={24} className="text-gray-700" />
          </div>
        </div>
        {/* Right Section */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4 lg:gap-8">
          <h1 className="text-lg lg:text-xl font-semibold">Подписаться</h1>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Email адрес"
              className="p-2 lg:p-4 flex-grow"
            />
            <button className="bg-lama text-white py-2 px-4">Отправить</button>
          </div>
        </div>
      </div>
      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
        <div className="text-sm text-gray-600">
          © 2024 Магазин входных металлических дверей Двери Эталон
        </div>
      </div>
    </footer>
  );
};

export default Footer;
