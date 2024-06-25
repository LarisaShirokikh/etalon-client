"use client";
import { Home, Search, Heart, LayoutGrid, CircleUserRound, Menu } from "lucide-react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import NavItem from "./NavItem";
import UserDropdown from "./UserDropdown";
import MenuDropdown from "./MenuDropdown";
import { useState } from "react";
import SearchBar from "../SearchBar";
import { useRouter } from "next/navigation";

const MobileNavbar = ({ session }: { session: Session | null }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter();

  const handleFavoriteClick = () => {
    if (session?.user) {
      router.push(`/favorite?name=${session.user.name}`);
    } else {
      signIn("yandex");
    }
  };

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };


  return (
    <nav className="fixed bottom-0 p-2 w-full bg-white border-t border-gray-200 shadow-lg md:hidden">
      {showSearch && <SearchBar />}
      <div className="flex justify-around py-2">
        <NavItem href="/" icon={<Home />} />
        <NavItem
          onClick={() => setShowSearch((prev) => !prev)}
          icon={<Search />}
        />
        <NavItem onClick={handleFavoriteClick} icon={<Heart />} />
        <NavItem onClick={toggleMenu} icon={<LayoutGrid />} />
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
