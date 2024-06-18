"use client";
import { Home, Search, Heart, LayoutGrid, CircleUserRound } from "lucide-react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import NavItem from "./NavItem";
import UserDropdown from "./UserDropdown";

const MobileNavbar = ({ session }: { session: Session | null }) => {
  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 shadow-lg md:hidden">
      <div className="flex justify-around py-2">
        <NavItem href="/" icon={<Home />} label="Домой" />
        <NavItem href="/search" icon={<Search />} label="Поиск" />
        <NavItem href="/post" icon={<Heart />} label="Избранное" />
        <NavItem href="/notifications" icon={<LayoutGrid />} label="Меню" />
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
    </nav>
  );
};

export default MobileNavbar;
