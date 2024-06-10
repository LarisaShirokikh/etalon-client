"use client";
import Link from "next/link";
import Image from "next/image";
import { FaPhoneAlt, FaTelegram } from "react-icons/fa";
import SearchBar from "./SearchBar";
import Menu from "./Menu";
import { FaWhatsapp } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
  // const [location, setLocation] = useState("");

  // useEffect(() => {
  //   const fetchLocation = async () => {
  //     try {
  //       const response = await axios.get("https://ipapi.co/json/?lang=ru");
  //       setLocation(response.data.city);
  //     } catch (error) {
  //       console.error("Error fetching the location data", error);
  //     }
  //   };

  //   fetchLocation();
  // }, []);

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative bg-white ">
      {/* MOBILE */}
      <div className="h-20 flex items-center justify-between md:hidden">
        <Link href="/" className="flex tracking-wide gap-3">
          <Image src="/logo.png" alt="Логотип" width={200} height={200} />
        </Link>
        <Menu />
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
          <a href="https://t.me/Dveri_Etalon" className="text-gray-700">
            <FaTelegram size={20} color="00A1FE" target="_blank" />
          </a>
          <a href="https://wa.me/+79250217365" className="text-gray-700">
            <FaWhatsapp size={20} color="1EB100" target="_blank" />
          </a>
          {/* {location && ( */}
          <div className="flex items-center gap-2 text-gray-700">
            <span>📍Москва</span>
          </div>
          {/* )} */}
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
            <a href="https://t.me/Dveri_Etalon" className="text-gray-700">
              <FaTelegram size={20} color="00A1FE" target="_blank" />
            </a>
            <a href="https://wa.me/+79250217365" className="text-gray-700">
              <FaWhatsapp size={20} color="1EB100" target="_blank" />
            </a>
            <div className="flex items-center gap-2 text-gray-700">
              <span>📍Москва</span>
            </div>
            {/* {location && ( */}
            {/* )} */}
          </div>
          {/* <Button text="Заказать звонок" /> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
