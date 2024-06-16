"use client";
import Link from "next/link";
import {
  Home,
  Search,
  Heart,
  LayoutGrid,
  CircleUserRound,
  LogOut,
} from "lucide-react";
import { Session } from "next-auth";
import { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface NavItemProps {
  href?: string;
  icon: JSX.Element;
  label: string;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, href, onClick }) => {
  return href ? (
    <Link href={href}>
      <div className="flex flex-col items-center text-xs text-gray-600 cursor-pointer">
        {icon}
        <span className="text-xs mt-1">{label}</span>
      </div>
    </Link>
  ) : (
    <div
      className="flex flex-col items-center text-xs text-gray-600 cursor-pointer"
      onClick={onClick}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </div>
  );
};

const MobileNavbar = ({ session }: { session: Session | null }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 shadow-lg md:hidden">
      <div className="flex justify-around py-2">
        <NavItem href="/" icon={<Home />} label="Домой" />
        <NavItem href="/search" icon={<Search />} label="Поиск" />
        <NavItem href="/post" icon={<Heart />} label="Избранное" />
        <NavItem href="/notifications" icon={<LayoutGrid />} label="Меню" />
        {!session?.user && (
          <NavItem
            onClick={() => signIn("yandex")}
            icon={<CircleUserRound />}
            label="Войти"
          />
        )}
        {session?.user && (
          <div className="relative flex items-center">
            <button onClick={() => setShowDropdown((prev) => !prev)}>
              <Image
                src={session.user.image as string}
                alt="avatar"
                width={40}
                height={40}
                className={
                  "rounded-full relative " + (showDropdown ? "z-50" : "")
                }
              />
            </button>
            {showDropdown && (
              <>
                <div
                  onClick={() => setShowDropdown(false)}
                  className="bg-black/10 fixed inset-0 z-40"
                ></div>
                <div className="fixed z-50 bottom-0 right-0 h-96 w-64 bg-white rounded-md text-gray-600  border">
                  <div className="flex items-center gap-4 p-4">
                    <Image
                      src={session.user.image as string}
                      alt="avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold">
                        {session.user.name as string}
                      </span>
                      <span className="text-sm text-gray-600">
                        {session.user.email as string}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => router.push("/my-ads")}
                    className="flex gap-2 px-9 pt-2 block text-start w-full"
                  >
                    <Heart />
                    Избранное
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="flex gap-2 px-9 pt-3 block w-full text-start"
                  >
                    <LogOut /> Выйти
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default MobileNavbar;
