"use client";
import {
  Home,
  Search,
  MessageSquare,
  LayoutGrid,
  ShoppingBasket,
  Menu,
  X,
} from "lucide-react";
import NavItem from "./NavItem";
import MenuDropdown from "./MenuDropdown";
import { useState } from "react";
import SearchBar from "../SearchBar";
import { FaWhatsapp } from "react-icons/fa";




const MobileNavbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };
  

  return (
    <>
      <nav className="fixed bottom-0 p-2 w-full bg-white border-t border-gray-200 shadow-lg md:hidden">
        {showSearch && <SearchBar />}
        <div className="flex justify-around py-2">
          <NavItem href="/" icon={<Home />} label={"Главная"} />
          <NavItem
            onClick={() => setShowSearch((prev) => !prev)}
            icon={<Search />}
            label={"Поиск"}
          />
          <NavItem
            href="https://wa.me/79250217365"
            icon={<FaWhatsapp size={24} target="_blank" />}
            label={"Написать"}
          />
          <NavItem href="/cart" icon={<ShoppingBasket />} label={"Корзина"} />
          <NavItem onClick={toggleMenu} icon={<LayoutGrid />} label={"Меню"} />
        </div>
        {showMenu && <MenuDropdown />}
      </nav>
    </>
  );
};

export default MobileNavbar;
