"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  label: string;
  locale: string;
  isMobile?: boolean;
  onClick?: () => void;
};

export default function NavLink({ href, label, locale, isMobile, onClick }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === `/${locale}${href === "/" ? "" : href}`;
  
  return (
    <Link
      href={`/${locale}${href === "/" ? "" : href}`}
      className={`${
        isActive
          ? "text-indigo-600 dark:text-indigo-400 font-medium"
          : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
      } ${isMobile ? "block py-2" : "inline-block"} transition-colors`}
      onClick={onClick}
    >
      {label}
    </Link>
  );
} 