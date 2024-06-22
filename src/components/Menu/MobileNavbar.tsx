"use client";
import { Home, Search, Heart, LayoutGrid, CircleUserRound } from "lucide-react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import NavItem from "./NavItem";
import UserDropdown from "./UserDropdown";
import MenuDropdown from "./MenuDropdown";
import { useState } from "react";
import SearchBar from "../SearchBar";

const MobileNavbar = ({ session }: { session: Session | null }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);


  return (
    <nav className="fixed bottom-0 p-2 w-full bg-white border-t border-gray-200 shadow-lg md:hidden">
      {showSearch && (
        <SearchBar/>
      )}
      <div className="flex justify-around py-2">
        <NavItem href="/" icon={<Home />} />
        <NavItem
          onClick={() => setShowSearch((prev) => !prev)}
          icon={<Search />}
        />
        <NavItem href="/my-favorite" icon={<Heart />} />
        <NavItem
          onClick={() => setShowMenu((prev) => !prev)}
          icon={<LayoutGrid />}
        />
        {!session?.user ? (
          <NavItem
            onClick={() => signIn("yandex")}
            icon={<CircleUserRound />}
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
