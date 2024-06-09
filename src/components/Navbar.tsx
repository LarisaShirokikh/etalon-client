import Link from "next/link";
import Image from "next/image";
import { FaPhoneAlt, FaTelegram,  } from "react-icons/fa";
import SearchBar from "./SearchBar";
import Menu from "./Menu";
import { FaWhatsapp } from "react-icons/fa6";

const Navbar = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative bg-white ">
      {/* MOBILE */}
      <div className="h-20 flex items-center justify-between md:hidden">
        <Link href="/" className="flex tracking-wide gap-3">
          <Image src="/logo.png" alt="Логотип" width={200} height={200} />
        </Link>
        <Menu />
        {/* <Link href="/">
          <div className="text-2xl tracking-wide">Двери Эталон</div>
        </Link> */}
      </div>
      {/* MOBILE CONTACT */}
      <div className="mb-4 md:hidden flex flex-col items-center gap-2 ">
        <div className="flex items-center gap-4">
          <a
            href="tel:+79260217365"
            className="flex items-center text-gray-700"
          >
            <FaPhoneAlt size={20} />
            <span className="whitespace-nowrap ml-1">+7 (926) 021 7365</span>
          </a>
          <a href="https://t.me/your_telegram" className="text-gray-700">
            <FaTelegram size={20} color="00A1FE" />
          </a>
          <a href="https://wa.me/your_whatsapp" className="text-gray-700">
            <FaWhatsapp size={20} color="1EB100" />
          </a>
        </div>
        {/* <Button text="Заказать звонок" /> */}
      </div>
      {/* BIGGER SCREENS */}
      <div className="hidden md:flex items-center justify-between h-20">
        {/* LEFT */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Логотип" width={300} height={300} />
            {/* <div className="text-2xl tracking-wide">Двери Эталон</div> */}
          </Link>
          <div className="hidden lg:flex gap-6">
            {/* <Link href="/">Все двери</Link> */}
            <Link href="/service">Сервисная служба</Link>
          </div>
        </div>
        {/* RIGHT */}
        <div className="flex items-center gap-8">
          <SearchBar />
          <div className="flex items-center gap-4">
            <a
              href="tel:+79260217365"
              className="flex items-center text-gray-700"
            >
              <FaPhoneAlt size={20} />
              <span className="whitespace-nowrap ml-1">+7 (926) 021 7365</span>
            </a>
            <a href="https://t.me/your_telegram" className="text-gray-700">
              <FaTelegram size={20} color="00A1FE" />
            </a>
            <a href="https://wa.me/your_whatsapp" className="text-gray-700">
              <FaWhatsapp size={20} color="1EB100" />
            </a>
          </div>
          {/* <Button text="Заказать звонок" /> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
