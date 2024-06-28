"use client";
import {
  Home,
  Search,
  Heart,
  LayoutGrid,
  ShoppingBasket,
  Menu,
  X,
} from "lucide-react";
import NavItem from "./NavItem";
import MenuDropdown from "./MenuDropdown";
import { useState } from "react";
import SearchBar from "../SearchBar";
import { useRouter } from "next/navigation";

type BasketModalProps = {
  onClose: () => void;
};

const BasketModal = ({ onClose }: BasketModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-4 rounded shadow-lg w-3/4 max-w-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X  size={24} />
        </button>
        <h2 className="text-lg font-bold mb-4">Здесь будут сохраненные двери</h2>
        {/* Add your basket items here */}
      </div>
    </div>
  );
};

const MobileNavbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showBasketModal, setShowBasketModal] = useState(false);
  const router = useRouter();

  const handleCheckBasket = () => {
    setShowBasketModal(true);
  };

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };
  const closeBasketModal = () => {
    setShowBasketModal(false);
  };

  return (
    <>
      {showBasketModal && <BasketModal onClose={closeBasketModal} />}
      <nav className="fixed bottom-0 p-2 w-full bg-white border-t border-gray-200 shadow-lg md:hidden">
        {showSearch && <SearchBar />}
        <div className="flex justify-around py-2">
          <NavItem href="/" icon={<Home />} />
          <NavItem
            onClick={() => setShowSearch((prev) => !prev)}
            icon={<Search />}
          />
          <NavItem href="/cart" icon={<ShoppingBasket />} />
          <NavItem onClick={toggleMenu} icon={<LayoutGrid />} />
        </div>
        {showMenu && <MenuDropdown />}
      </nav>
    </>
  );
};

export default MobileNavbar;
