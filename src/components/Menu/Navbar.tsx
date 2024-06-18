// components/Navbar.tsx
import Link from "next/link";
import Image from "next/image";
import { FaPhoneAlt, FaTelegram } from "react-icons/fa";
import SearchBar from "../SearchBar";
import { FaWhatsapp } from "react-icons/fa6";
import { Session } from "next-auth";
import NavMenu from "./NavMenu";
import { signIn } from "next-auth/react";
import NavItem from "./NavItem";
import UserDropdown from "./UserDropdown";
import {
  Home,
  Search,
  Heart,
  LayoutGrid,
  CircleUserRound,
  LogOut,
  MessageCircleQuestion,
  MessageCircleMore,
} from "lucide-react";

const Navbar = ({ session }: { session: Session | null }) => {
  return (
    <div className="sticky top-0 left-0 right-0 z-50 px-2 md:px-8 lg:px-8 xl:px-16 2xl:px-32 relative bg-white">
      {/* MOBILE */}
      <div className="h-20 flex hover:cursor-pointer items-center justify-between md:hidden">
        <Link href="/" className="flex tracking-wide gap-3">
          <Image src="/logo.svg" alt="Логотип" width={200} height={200} />
        </Link>
      </div>
      {/* MOBILE CONTACT */}
      <div className="mb-4 hover:cursor-pointer md:hidden flex flex-col items-center gap-2">
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
            <Image
              src="/map.svg"
              alt="touch"
              width={20}
              height={20}
              color="B51700"
            />
            Москва и МО
          </div>
        </div>
      </div>
      {/* BIGGER SCREENS */}
      <div className="hidden md:flex items-center justify-between h-20">
        {/* LEFT */}
        <div className="flex items-center gap-8 hover:cursor-pointer">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.svg" alt="Логотип" width={300} height={300} />
          </Link>
        </div>
        {/* RIGHT */}
        <div className="flex items-center gap-8 hover:cursor-pointer">
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
              <Image
                src="/map.svg"
                alt="touch"
                width={20}
                height={20}
                color="B51700"
              />
              Москва и МО
            </div>
            {/* {!session?.user && (
              <NavItem
                onClick={() => signIn("yandex")}
                icon={<CircleUserRound />}
                label="Войти"
              />
            )}
            {session?.user && <UserDropdown session={session} />} */}
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <NavMenu />
      </div>
    </div>
  );
};

export default Navbar;
