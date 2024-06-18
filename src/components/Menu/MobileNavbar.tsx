"use client";
import { Home, Search, Heart, LayoutGrid, CircleUserRound } from "lucide-react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import NavItem from "./NavItem";
import UserDropdown from "./UserDropdown";
import MenuDropdown from "./MenuDropdown";
import { useState } from "react";

const MobileNavbar = ({ session }: { session: Session | null }) => {
    const [showMenu, setShowMenu] = useState(false);
  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 shadow-lg md:hidden">
      <div className="flex justify-around py-2">
        <NavItem href="/" icon={<Home />} label="Домой" />
        <NavItem href="/search" icon={<Search />} label="Поиск" />
        <NavItem href="/my-favorite" icon={<Heart />} label="Избранное" />
        <NavItem
          onClick={() => setShowMenu((prev) => !prev)}
          icon={<LayoutGrid />}
          label="Меню"
        />
        {!session?.user ? (
          <NavItem
            onClick={() => signIn("yandex")}
            icon={<CircleUserRound />}
            label="Войти"
          />
        ) : (
          <UserDropdown session={session} />
        )}
      </div>
      {showMenu && <MenuDropdown />}
    </nav>
  );
};

export default MobileNavbar;
