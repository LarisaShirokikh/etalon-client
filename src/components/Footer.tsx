import Link from "next/link";
import { FaTelegram, FaPhoneAlt, FaEnvelope, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-8 px-4 md:px-12 lg:px-16 xl:px-24 bg-gray-100 text-sm mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="flex flex-col gap-4 lg:gap-6">
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
            <FaEnvelope
              size={24}
              className="text-gray-700"
              style={{ minWidth: "24px" }}
            />
            <a
              href="mailto:2081837@gmail.ru"
              className="flex items-center text-gray-700"
            >
              2823577@mail.ru
            </a>
          </div>
          <div className="flex gap-4 items-center">
            <FaPhoneAlt
              size={24}
              className="text-gray-700"
              style={{ minWidth: "24px" }}
            />
            <a
              href="tel:+79260217365"
              className="flex items-center text-gray-700"
            >
              +7 (926) 021 7365
            </a>
          </div>
          <div className="flex gap-6 mb-4">
            <a href="https://t.me/Dveri_Etalon" className="text-gray-700">
              <FaTelegram size={24} style={{ minWidth: "24px" }} />
            </a>
            <a href="https://wa.me/+79260217365" className="text-gray-700">
              <FaWhatsapp size={24} style={{ minWidth: "24px" }} />
            </a>
          </div>
        </div>
        {/* Right Section */}
        <div className="flex flex-col gap-4 lg:gap-6">
          {/* Другие элементы */}
        </div>
      </div>
      {/* Bottom Section */}
      <div className="footer flex flex-col md:flex-row items-center justify-between gap-4 mt-8 pb-16 md:pb-0">
        <div className="text-sm text-gray-600">
          © 2024 Двери Эталон. Магазин входных металлических дверей.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
