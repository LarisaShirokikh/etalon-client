import Image from "next/image";
import Link from "next/link";
import {
  FaTelegram,
  FaVk,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
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
              href="mailto:2081837@gmail.ru"
              className="flex items-center text-gray-700"
            >
              2823577@mail.ru
            </a>
          </div>
          <div className="flex gap-4 items-center">
            <FaPhoneAlt size={24} className="text-gray-700" />
            <a
              href="tel:+79260217365"
              className="flex items-center text-gray-700"
            >
              +7 (926) 021 7365
            </a>
          </div>
          <div className="flex gap-6 mb-4">
            <a href="https://t.me/Dveri_Etalon" className="text-gray-700">
              <FaTelegram size={24} target="_blank" />
            </a>
            <a href="https://wa.me/+79260217365" className="text-gray-700">
              <FaWhatsapp size={24} target="_blank" />
            </a>
            {/* <a href="https://vk.com/your_vk" className="text-gray-700">
              <FaVk size={24} target="_blank" />
            </a>
            <a href="https://vk.com/your_vk" className="text-gray-700">
              <FaYoutube size={24} target="_blank" />
            </a> */}
          </div>
        </div>
        {/* Right Section */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4 lg:gap-8">
          
        </div>
      </div>
      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
        <div className="text-sm text-gray-600 mb-5">
          © 2024 Двери Эталон. Магазин входных металлических дверей.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
