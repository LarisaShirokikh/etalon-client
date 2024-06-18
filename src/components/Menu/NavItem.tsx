// components/NavItem.tsx
import Link from "next/link";

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

export default NavItem;
