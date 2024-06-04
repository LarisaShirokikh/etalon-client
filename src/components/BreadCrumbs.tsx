"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Breadcrumbs = () => {
  const pathname = usePathname();

  type BreadcrumbItem = {
    breadcrumb: string;
    href: string;
  };

  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

  useEffect(() => {
    if (pathname) {
      const pathArray = pathname.split("/").filter((path: any) => path);
      const breadcrumbsArray = pathArray.map((path: any, index: number) => {
        const href = "/" + pathArray.slice(0, index + 1).join("/");
        return { breadcrumb: decodeURIComponent(path), href };
      });
      setBreadcrumbs(breadcrumbsArray);
    }
  }, [pathname]);

   const translations: { [key: string]: string } = {
     home: "Главная",
     catalog: "Каталог",
     vhodnye: "Входные",
     dveri: "Двери",
     labirint: "Лабиринт",
     line: "Лайн",
     white: "Белые",
   };

   // Функция для преобразования пути в человеко-понятный формат на русском языке
   const formatBreadcrumb = (breadcrumb: string) => {
     // Разделяем путь по дефисам и преобразуем каждое слово
     const words = breadcrumb.split("-");
     const formattedWords = words.map((word) => {
       // Делаем первую букву слова заглавной, а остальные строчными
       return (
         translations[word.toLowerCase()] ||
         word.charAt(0).toUpperCase() + word.slice(1)
       );
     });
     // Соединяем слова обратно в строку с пробелами
     return formattedWords.join(" ");
   };

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex space-x-2">
        <li>
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-800 bg-gray-100 py-2 px-4 rounded-full hover:bg-gray-200 transition-transform duration-300"
          >
            Главная
          </Link>
          {breadcrumbs.length > 0 && <span className="mx-2">/</span>}
        </li>
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.href} className="flex items-center">
            <Link
              href={crumb.href}
              className="text-gray-600 hover:text-gray-800 bg-gray-100 py-2 px-4 rounded-full hover:bg-gray-200 transition-transform duration-300"
            >
              {formatBreadcrumb(crumb.breadcrumb)}
            </Link>
            {index < breadcrumbs.length - 1 && <span className="mx-2">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
