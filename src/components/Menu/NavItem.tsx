"use client";
import { FC, ReactNode } from "react";

interface NavItemProps {
  href?: string;
  onClick?: () => void;
  icon: ReactNode;
  label: string;
}

const NavItem: FC<NavItemProps> = ({ href, onClick, icon, label }) => {
  if (href) {
    return (
      <a
        href={href}
        className="flex flex-col items-center text-gray-600 hover:text-gray-800"
      >
        {icon}
        {label}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center text-gray-600 hover:text-gray-800"
    >
      {icon}
      {label}
    </button>
  );
};

export default NavItem;
