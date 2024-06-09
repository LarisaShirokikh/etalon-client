"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaPhoneAlt, FaTelegram, FaWhatsapp } from "react-icons/fa";

const Menu = () => {
  const [open, setOpen] = useState(false);

  const handleCloseMenu = () => {
    setOpen(false);
  };

  return (
    <div className="">
      <Image
        src="/menu.svg"
        alt=""
        width={28}
        height={28}
        className="cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className="absolute bg-black text-white left-0 top-20 w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-8 text-xl  z-10">
          <Link href="/category/vse-dveri/catalogs" passHref>
            <p onClick={handleCloseMenu}>Полный каталог дверей</p>
          </Link>
          <Link href="/category/zerkalo/catalogs" passHref>
            <p onClick={handleCloseMenu}>Двери с зеркалом</p>
          </Link>
          <Link href="/category/termorazryv/catalogs" passHref>
            <p onClick={handleCloseMenu}>Двери с терморазрывом</p>
          </Link>
          <Link href="/category/dveri-byudzhet/catalogs" passHref>
            <p onClick={handleCloseMenu}>Распродажа</p>
          </Link>
          <Link href="/service" passHref>
            <p onClick={handleCloseMenu}>Сервисная служба</p>
          </Link>
          <Link href="/service/#dobori" passHref>
            <p onClick={handleCloseMenu}>Доборы</p>
          </Link>
          <a
            href="tel:+79260217365"
            className="flex items-center text-white"
            onClick={handleCloseMenu}
          >
            <FaPhoneAlt size={20} />
            <span className="whitespace-nowrap ml-1">+7 (926) 021 7365</span>
          </a>
          <div className="flex items-center gap-4">
            <a
              href="https://t.me/your_telegram"
              target="_blank"
              className="text-gray-700"
              onClick={handleCloseMenu}
            >
              <FaTelegram size={40} />
            </a>
            <a
              href="https://wa.me/your_whatsapp"
              target="_blank"
              className="text-gray-700"
              onClick={handleCloseMenu}
            >
              <FaWhatsapp size={40} />
            </a>
          </div>
          <span className="ml-1" onClick={handleCloseMenu}>
            с 10:00 до 22:00 Без выходных
          </span>
        </div>
      )}
    </div>
  );
};

export default Menu;
