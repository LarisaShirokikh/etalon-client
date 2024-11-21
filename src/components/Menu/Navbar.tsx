"use client";

import Link from "next/link";
import {
  FaPhoneAlt,
  FaTelegram,
  FaWhatsapp,
  FaBars,
  FaSearch,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import SearchBar from "../SearchBar";
import MenuDropdown from "./MenuDropdown";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`sticky top-0 left-0 right-0 z-50 transition-all ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      {/* Верхний Navbar */}
      <div className="flex items-center justify-between px-4 md:px-8 lg:px-16 h-16">
        {/* Название вместо логотипа */}
        <Link href="/" className="flex items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-wide hover:text-gray-900 transition">
            Двери Эталон
          </h1>
        </Link>

        {/* Поиск */}
        <div className="hidden md:flex flex-1 mx-8">
          {showSearch ? (
            <SearchBar />
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className="text-gray-700 hover:text-gray-900"
            >
              <FaSearch size={20} />
            </button>
          )}
        </div>

        {/* Контакты и меню */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+79260217365"
            className="flex items-center text-gray-700 hover:text-gray-900"
          >
            <FaPhoneAlt size={20} />
            <span className="ml-2">+7 (926) 021 7365</span>
          </a>
          <a
            href="https://t.me/Dveri_Etalon"
            className="text-gray-700 hover:text-gray-900"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTelegram size={20} />
          </a>
          <a
            href="https://wa.me/79260217365"
            className="text-gray-700 hover:text-gray-900"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp size={20} />
          </a>
        </div>

        {/* Бургер-меню */}
        <button
          className="md:hidden text-gray-700 hover:text-gray-900"
          onClick={() => setShowMenu(!showMenu)}
        >
          <FaBars size={24} />
        </button>
      </div>

      {/* Dropdown Menu */}
      <MenuDropdown showDropdown={showMenu} setShowDropdown={setShowMenu} />
    </div>
  );
};

export default Navbar;
