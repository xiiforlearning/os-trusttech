"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import NavLink from "@/components/NavLink";
import { useTheme } from "@/context/ThemeContext";
import { FiMenu, FiX, FiMoon, FiSun, FiGlobe } from "react-icons/fi";

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

type NavbarProps = {
  translations: any;
  locale?: string;
};

const Navbar = ({ translations, locale = "en" }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentLocale, setCurrentLocale] = useState(locale);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname();

  // Try to use ThemeContext if available, otherwise provide fallback functionality
  let themeContextValue: ThemeContextType | undefined;
  try {
    themeContextValue = useTheme();
  } catch (error) {
    // Theme context not available, will use local state instead
    themeContextValue = undefined;
  }

  // Use context values if available, otherwise use local state
  const contextIsDarkMode = themeContextValue?.isDarkMode;
  const contextToggleTheme = themeContextValue?.toggleTheme;

  // Local toggleTheme function as fallback
  const localToggleTheme = () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev;
      if (typeof window !== "undefined") {
        if (newTheme) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
      return newTheme;
    });
  };

  // Use context methods if available, otherwise use local methods
  const actualIsDarkMode =
    contextIsDarkMode !== undefined ? contextIsDarkMode : isDarkMode;
  const toggleTheme = contextToggleTheme || localToggleTheme;

  useEffect(() => {
    setMounted(true);
    // Set initial locale from prop
    if (locale) {
      setCurrentLocale(locale);
    } else {
      // Extract locale from pathname (en, ru, uz) as fallback
      const pathLocale = pathname.split("/")[1];
      if (pathLocale === "en" || pathLocale === "ru" || pathLocale === "uz") {
        setCurrentLocale(pathLocale);
      }
    }

    // Initialize with light mode when using local state
    if (!themeContextValue && typeof window !== "undefined") {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, [pathname, themeContextValue, locale]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const toggleLangDropdown = () => setIsLangDropdownOpen(!isLangDropdownOpen);
  const closeLangDropdown = () => setIsLangDropdownOpen(false);

  // Extract the current route without the locale prefix
  const getRouteWithoutLocale = () => {
    const pathParts = pathname.split("/");
    if (pathParts.length > 2) {
      return "/" + pathParts.slice(2).join("/");
    }
    return "/";
  };

  const currentRoute = getRouteWithoutLocale();

  const navLinks = [
    { href: "/", label: translations.nav.home },
    { href: "/about", label: translations.nav.about },
    { href: "/services", label: translations.nav.services },
    { href: "/projects", label: translations.nav.projects },
    { href: "/contact", label: translations.nav.contact },
  ];

  if (!mounted) {
    return <div className="h-16 w-full"></div>; // Placeholder with same height to prevent layout shift
  }

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm py-4 fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href={`/${currentLocale}`} className="flex items-center">
            <div className="relative h-8 w-8 mr-2">
              <div className="absolute inset-0 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                OS
              </div>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              TrustTech
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                locale={currentLocale}
              />
            ))}
          </div>

          {/* Controls: Language & Theme */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <button
                className="flex items-center text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                onClick={toggleLangDropdown}
                aria-expanded={isLangDropdownOpen}
              >
                <FiGlobe className="mr-1" />
                <span className="uppercase">{currentLocale}</span>
              </button>
              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-26 bg-white dark:bg-gray-800 rounded shadow-lg py-1 z-10">
                  <Link
                    href={`/en${currentRoute}`}
                    className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700  ${
                      currentLocale === "en"
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                    onClick={closeLangDropdown}
                  >
                    English
                  </Link>
                  <Link
                    href={`/ru${currentRoute}`}
                    className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      currentLocale === "ru"
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                    onClick={closeLangDropdown}
                  >
                    Русский
                  </Link>
                  <Link
                    href={`/uz${currentRoute}`}
                    className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      currentLocale === "uz"
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                    onClick={closeLangDropdown}
                  >
                    O'zbekcha
                  </Link>
                </div>
              )}
            </div>

            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              {actualIsDarkMode ? (
                <FiSun className="w-5 h-5" />
              ) : (
                <FiMoon className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="text-gray-700 dark:text-gray-300"
            >
              {actualIsDarkMode ? (
                <FiSun className="w-5 h-5" />
              ) : (
                <FiMoon className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={toggleMenu}
              aria-label="Toggle menu"
              className="text-gray-700 dark:text-gray-300"
            >
              {isOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden pt-4 pb-2 px-4 bg-white dark:bg-gray-900">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                locale={currentLocale}
                isMobile
                onClick={closeMenu}
              />
            ))}
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700 mt-2">
              <div className="flex space-x-4 py-2">
                <Link
                  href={`/en${currentRoute}`}
                  className={`${
                    currentLocale === "en"
                      ? "text-indigo-600 dark:text-indigo-400 font-medium"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                  onClick={closeMenu}
                >
                  English
                </Link>
                <Link
                  href={`/ru${currentRoute}`}
                  className={`${
                    currentLocale === "ru"
                      ? "text-indigo-600 dark:text-indigo-400 font-medium"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                  onClick={closeMenu}
                >
                  Русский
                </Link>
                <Link
                  href={`/uz${currentRoute}`}
                  className={`${
                    currentLocale === "uz"
                      ? "text-indigo-600 dark:text-indigo-400 font-medium"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                  onClick={closeMenu}
                >
                  O'zbekcha
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
