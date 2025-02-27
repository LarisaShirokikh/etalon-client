"use client";

import { useRouter } from "next/navigation";
import { useState, MouseEvent } from "react";
import Image from "next/image";
import {
  School,
  DoorClosed,
  Snowflake,
  BadgeRussianRuble,
  Trophy,
  PencilRuler,
  Gift,
  Layers,
  DoorOpen,
  GalleryHorizontalEnd,
  PhoneCall,
  Clock3,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface MenuItemProps {
  photo?: string;
  icon?: any; // Lucide icons are React components
  text: string;
  path: string;
  onClick: (event: MouseEvent<HTMLDivElement>, path: string) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  photo,
  icon: Icon,
  text,
  path,
  onClick,
}) => (
  <div
    onClick={(e) => onClick(e, path)}
    className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 transition duration-200 w-full text-left cursor-pointer"
  >
    {photo && (
      <div className="relative h-12 w-12 rounded-md overflow-hidden">
        <Image src={photo} alt={text} layout="fill" objectFit="cover" />
      </div>
    )}
    {Icon && <Icon className="text-gray-500" />}
    <span className="text-sm">{text}</span>
  </div>
);

interface MenuSectionProps {
  title: string;
  children: React.ReactNode;
}

const MenuSection: React.FC<MenuSectionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-4 py-2 text-gray-600 hover:bg-gray-100 transition duration-200"
      >
        <span>{title}</span>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
      {isOpen && (
        <div className="flex flex-col gap-2 px-4 py-1">{children}</div>
      )}
    </div>
  );
};

const MenuDropdown = ({
  showDropdown,
  setShowDropdown,
}: {
  showDropdown: boolean;
  setShowDropdown: (state: boolean) => void;
}) => {
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLDivElement>, path: string) => {
    event.stopPropagation();
    router.push(path);
    setShowDropdown(false);
  };

  if (!showDropdown) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 z-40"
      onClick={() => setShowDropdown(false)}
    >
      <div
        className="absolute top-0 right-0 w-80 max-h-[calc(100vh-20px)] bg-white shadow-lg rounded-bl-xl overflow-y-auto transition-transform transform translate-x-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-2 px-4 py-1">
          {/* Sections */}
          <MenuSection title="Бренды">
            <MenuItem
              photo={"/lab.webp"}
              text="Двери Лабиринт"
              path="/brand/vhodnye-dveri-labirint"
              onClick={handleClick}
            />
            <MenuItem
              photo={"/bun.webp"}
              text="Двери Бункер"
              path="/brand/dveri-bunker"
              onClick={handleClick}
            />
            <MenuItem
              photo={"/arg.webp"}
              text="Двери Аргус"
              path="/brand/vhodnye-dveri-argus"
              onClick={handleClick}
            />
            <MenuItem
              photo={"/ratibor.webp"}
              text="Двери Ратибор"
              path="/brand/vhodnye-dveri-ratibor"
              onClick={handleClick}
            />
            <MenuItem
              photo={"/asd.webp"}
              text="Двери АСД"
              path="/brand/vhodnye-dveri-asd"
              onClick={handleClick}
            />
            <MenuItem
              photo={"/zd.webp"}
              text="Двери Заводские"
              path="/brand/vhodnye-dveri-zd"
              onClick={handleClick}
            />
            <MenuItem
              photo={"/intecron.webp"}
              text="Двери Интекрон"
              path="/brand/vhodnye-dveri-intekron"
              onClick={handleClick}
            />
          </MenuSection>
          <MenuSection title="Категории">
            <MenuItem
              icon={Layers}
              text="Все двери"
              path="/product"
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
              path="/product/dlya-kvartiry"
              onClick={handleClick}
            />
            <MenuItem
              icon={Snowflake}
              text="Белые двери"
              path="/product/belye-dveri"
              onClick={handleClick}
            />
            <MenuItem
              icon={DoorClosed}
              text="Двери с зеркалом"
              path="/product/s-zerkalom"
              onClick={handleClick}
            />
            <MenuItem
              icon={GalleryHorizontalEnd}
              text="Трехконтурные"
              path="/product/3-kontura"
              onClick={handleClick}
            />
            <MenuItem
              icon={BadgeRussianRuble}
              text="Двери бюджет"
              path="/product/dveri-byudzhet"
              onClick={handleClick}
            />
            <MenuItem
              icon={Trophy}
              text="Хиты продаж"
              path="/product/hity-prodazh"
              onClick={handleClick}
            />
            <MenuItem
              icon={Gift}
              text="Акция"
              path="/product/akciya"
              onClick={handleClick}
            />
            <MenuItem
              icon={PencilRuler}
              text="Отделка и доборы"
              path="/service"
              onClick={handleClick}
            />
          </MenuSection>
        </div>
        {/* Footer */}
        <div className="px-6 py-4 border-t text-sm text-gray-500">
          <div className="flex items-center gap-2 mb-1">
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
