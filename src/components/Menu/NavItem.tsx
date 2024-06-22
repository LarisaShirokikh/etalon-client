"use client";
import { FC, ReactNode } from "react";

interface NavItemProps {
  href?: string;
  onClick?: () => void;
  icon: ReactNode;
}

const NavItem: FC<NavItemProps> = ({ href, onClick, icon }) => {
  if (href) {
    return (
      <a
        href={href}
        className="flex flex-col items-center text-gray-600 hover:text-black"
      >
        {icon}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center text-gray-600 hover:text-black"
    >
      {icon}
    </button>
  );
};

export default NavItem;
