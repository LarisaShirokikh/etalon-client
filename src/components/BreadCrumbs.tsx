// components/BreadCrumbs.tsx

import Image from "next/image";
import Link from "next/link";

interface BreadCrumbsProps {
  paths: {
    name: string;
    href: string;
    icon?: string;
  }[];
}

const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ paths }) => {
  return (
    <nav className="flex pt-1 pb-2 p-3 items-center space-x-2 text-sm text-gray-500">
      {paths.map((path, index) => (
        <span key={index} className="flex items-center">
          <Link href={path.href}>
            <div className="flex items-center gap-1 px-2 py-1 bg-gray-200 hover:text-white hover:bg-gray-500 rounded-full transition duration-300">
              {path.icon && (
                <div className="relative">
                  <Image
                    src={path.icon}
                    alt={`${path.name} icon`}
                    width={16}
                    height={16}
                    layout="fixed"
                    className="rounded-full"
                  />
                  <div className="absolute inset-0 rounded-full bg-white opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                </div>
              )}
              {path.name}
            </div>
          </Link>
          {index < paths.length - 1}
        </span>
      ))}
    </nav>
  );
};

export default BreadCrumbs;
