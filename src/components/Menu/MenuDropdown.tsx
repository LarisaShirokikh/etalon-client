"use client";
import { useRouter } from "next/navigation";
import { useState, MouseEvent } from "react";
import {
  School,
  DoorClosed,
  Snowflake,
  BadgeRussianRuble,
  Trophy,
  PencilRuler,
  Gift,
  DoorOpen,
  GalleryHorizontalEnd,
  PhoneCall,
  Clock3,
  LucideIcon,
} from "lucide-react";

interface MenuItemProps {
  icon: LucideIcon;
  text: string;
  path: string;
  onClick: (event: MouseEvent<HTMLButtonElement>, path: string) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon: Icon,
  text,
  path,
  onClick,
}) => (
  <button
    onClick={(e) => onClick(e, path)}
    className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 transition-colors duration-200"
  >
    <Icon className="text-gray-500" />
    {text}
  </button>
);

const MenuDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(true);
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLButtonElement>, path: string) => {
    event.stopPropagation();
    router.push(path);
    setShowDropdown(false);
  };

  if (!showDropdown) return null;

  return (
    <div className="relative flex items-center">
      <div
        onClick={() => setShowDropdown(false)}
        className="bg-black/40 fixed inset-0 z-40 transition-opacity duration-300 ease-in-out"
      ></div>
      <div className="fixed z-50 bottom-0 left-0 w-full max-w-xs bg-white rounded-t-xl text-gray-600 shadow-lg border overflow-y-auto transition-transform transform translate-y-0">
        <div className="px-6 py-4 border-b text-lg font-semibold text-gray-700">
          
          {/* Бренды */}
        </div>
        <div className="flex flex-col gap-2 px-6 py-4">
          <MenuItem
            icon={School}
            text="Все двери"
            path="/category/vse-dveri/catalogs"
            onClick={handleClick}
          />
          <MenuItem
            icon={School}
            text="Двери в дом"
            path="/category/dlya-doma/catalogs"
            onClick={handleClick}
          />
          <MenuItem
            icon={DoorOpen}
            text="Двери в квартиру"
            path="/category/dlya-kvartiry/catalogs"
            onClick={handleClick}
          />
          <MenuItem
            icon={Snowflake}
            text="Белые двери"
            path="/category/belye-dveri/catalogs"
            onClick={handleClick}
          />
          <MenuItem
            icon={DoorClosed}
            text="Двери с зеркалом"
            path="/category/s-zerkalom/catalogs"
            onClick={handleClick}
          />
          <MenuItem
            icon={GalleryHorizontalEnd}
            text="Трехконтурные"
            path="/category/3-kontura/catalogs"
            onClick={handleClick}
          />
          <MenuItem
            icon={BadgeRussianRuble}
            text="Двери бюджет"
            path="/category/dveri-byudzhet/catalogs"
            onClick={handleClick}
          />
          <MenuItem
            icon={Trophy}
            text="Хиты продаж"
            path="/category/hity-prodazh/catalogs"
            onClick={handleClick}
          />
          <MenuItem
            icon={Gift}
            text="Акция"
            path="/category/akciya/catalogs"
            onClick={handleClick}
          />
          <MenuItem
            icon={PencilRuler}
            text="Отделка и доборы"
            path="/service"
            onClick={handleClick}
          />
        </div>
        <div className="px-6 py-4 border-t text-sm text-gray-500">
          <div className="flex items-center gap-2 mb-2">
            <PhoneCall className="text-gray-500" />
            <a href="tel:+79260217365" className="hover:underline">
              +7 (926) 021 7365
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Clock3 className="text-gray-500" />
            Без выходных с 9.00 до 22.00
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDropdown;
