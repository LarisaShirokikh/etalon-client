import Link from "next/link";
import Menu from "./Menu";
import Image from "next/image";
import SearchBar from "./SearchBar";
import { FaPhoneAlt, FaTelegram, FaVk } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      {/* MOBILE */}
      <div className="h-20 flex items-center justify-between md:hidden">
        <Link href="/">
          <div className="text-2xl tracking-wide">Двери Эталон</div>
        </Link>
        <Menu />
      </div>
      {/* BIGGER SCREENS */}
      <div className="hidden md:flex items-center justify-between gap-8 h-full">
        {/* LEFT */}
        <div className="w-1/3 xl:w-1/2 flex items-center gap-12">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.svg" alt="" width={24} height={24} />
            <div className="text-2xl tracking-wide">Двери Эталон</div>
          </Link>
          <div className="hidden xl:flex gap-4 flex-wrap">
            <Link href="/">Все двери</Link>
            <Link href="/">Сервисная служба</Link>
            <Link href="/">О нас</Link>
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-2/3 xl:w-1/2 flex items-center justify-end gap-8">
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+1234567890"
              className="flex items-center text-gray-700"
            >
              <FaPhoneAlt size={20} />
              <span className="whitespace-nowrap">+7 (926) 021 7365</span>
            </a>
            <a href="https://t.me/your_telegram" className="text-gray-700">
              <FaTelegram size={20} />
            </a>
            <a href="https://vk.com/your_vk" className="text-gray-700">
              <FaVk size={20} />
            </a>
          </div>
          <SearchBar />
          <button className="hidden md:flex bg-lama text-white py-2 px-4 rounded-md">
            Заказать звонок
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
