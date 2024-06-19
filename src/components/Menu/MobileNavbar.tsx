"use client";
import { Home, Search, Heart, LayoutGrid, CircleUserRound } from "lucide-react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import NavItem from "./NavItem";
import UserDropdown from "./UserDropdown";
import MenuDropdown from "./MenuDropdown";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MobileNavbar = ({ session }: { session: Session | null }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    if (name) {
      router.push(`/search?name=${name}`);
    }
  };

  return (
    <nav className="fixed bottom-0 p-2 w-full bg-white border-t border-gray-200 shadow-lg md:hidden">
      {showSearch && (
        <form
          className="flex items-center justify-between gap-4 bg-gray-100 p-2 rounded-lg flex-1"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            name="name"
            placeholder="Поиск..."
            className="flex-1 bg-transparent outline-none"
          />
          <button className="cursor-pointer">
            <Image src="/search.svg" alt="" width={16} height={16} />
          </button>
        </form>
      )}
      <div className="flex justify-around py-2">
        <NavItem href="/" icon={<Home />} label="Домой" />
        <NavItem
          onClick={() => setShowSearch((prev) => !prev)}
          icon={<Search />}
          label="Поиск"
        />
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
