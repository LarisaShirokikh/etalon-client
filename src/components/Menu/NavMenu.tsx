"use client";
import Link from "next/link";
import { useState } from "react";

const NavMenu = () => {
  return (
    <div className="sticky z-50 top-20 bg-white text-gray-700 w-full h-12 flex flex-row items-center justify-center gap-8 text-m">
      <Link href="/service" passHref>
        <p className="cursor-pointer hover:text-white hover:bg-gray-700 rounded-full px-4 py-2 transition duration-300">
          сервис
        </p>
      </Link>
      <Link href="/catalog" passHref>
        <p className="cursor-pointer hover:text-white hover:bg-gray-700 rounded-full px-4 py-2 transition duration-300">
          каталоги
        </p>
      </Link>
      <Link href="/product" passHref>
        <p className="cursor-pointer hover:text-white hover:bg-gray-700 rounded-full px-4 py-2 transition duration-300">
          двери
        </p>
      </Link>
      <Link href="/category/zerkalo/catalogs" passHref>
        <p className="xs:hidden cursor-pointer hover:text-white hover:bg-gray-700 rounded-full px-4 py-2 transition duration-300">
          с зеркалом
        </p>
      </Link>
      <Link href="/category/termorazryv/catalogs" passHref>
        <p className="xs:hidden cursor-pointer hover:text-white hover:bg-gray-700 rounded-full px-4 py-2 transition duration-300">
          терморазрыв
        </p>
      </Link>
      <Link href="/category/dveri-byudzhet/catalogs" passHref>
        <p className="xs:hidden cursor-pointer hover:text-white hover:bg-gray-700 rounded-full px-4 py-2 transition duration-300">
          акция
        </p>
      </Link>
    </div>
  );
};

export default NavMenu;
