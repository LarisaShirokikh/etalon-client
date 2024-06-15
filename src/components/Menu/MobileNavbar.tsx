import Link from "next/link";
import React from "react";
import { FaHome, FaSearch, FaPlusSquare, FaBell, FaUser } from "react-icons/fa";
import { IoHeartOutline } from "react-icons/io5";

interface NavItemProps {
  href: string;
  icon: JSX.Element;
   label: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, href}) => {
  return (
    <Link href={href}>
      <div className="flex flex-col items-center text-xs text-gray-600">
        {icon}
        <span className="text-xs mt-1">{label}</span>
      </div>
    </Link>
  );
};

const MobileNavbar: React.FC = () => {
  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 shadow-lg md:hidden">
      <div className="flex justify-around py-2">
        <NavItem href="/" icon={<FaHome />} label="Домой" />
        <NavItem href="/search" icon={<FaSearch />} label="Поиск" />
        <NavItem href="/post" icon={<IoHeartOutline />} label="Избранное" />
        <NavItem
          href="/notifications"
          icon={<FaBell />}
          label="Notifications"
        />
        <NavItem href="/profile" icon={<FaUser />} label="Профиль" />
      </div>
    </nav>
  );
};

export default MobileNavbar;
