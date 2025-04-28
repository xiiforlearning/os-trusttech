"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiMapPin, FiMail, FiPhone } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

type FooterProps = {
  translations: any;
  locale?: string;
};

const Footer = ({ translations, locale }: FooterProps) => {
  const [currentLocale, setCurrentLocale] = useState(locale || "en");
  const pathname = usePathname();

  // Get theme context
  let themeContext;
  try {
    themeContext = useTheme();
  } catch (error) {
    // Theme context not available
  }

  useEffect(() => {
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
  }, [pathname, locale]);

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <div className="relative h-8 w-8 mr-2">
                <div className="absolute inset-0 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                  OS
                </div>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                TrustTech
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {translations.footer.description}
            </p>
            {/* <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                aria-label="Twitter"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                aria-label="LinkedIn"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                aria-label="GitHub"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div> */}
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
              {/* {translations.nav.home} */}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${currentLocale}`}
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  {translations.nav.home}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${currentLocale}/about`}
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  {translations.nav.about}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${currentLocale}/services`}
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  {translations.nav.services}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${currentLocale}/projects`}
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  {translations.nav.projects}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${currentLocale}/contact`}
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  {translations.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
              {translations.services.title}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${currentLocale}/services`}
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  {translations.services.webdev.title}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${currentLocale}/services`}
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  {translations.services.mobiledev.title}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${currentLocale}/services`}
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  {translations.services.uiux.title}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${currentLocale}/services`}
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  {translations.services.qa.title}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
              {translations.contact.title}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FiMapPin className="mt-1 mr-3 w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">
                  {translations.contact.address.street},{" "}
                  {translations.contact.address.city},{" "}
                  {translations.contact.address.country}
                </span>
              </li>
              <li className="flex items-center">
                <FiMail className="mr-3 w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                <a
                  href="mailto:contact@ostt.uz"
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  contact@ostt.uz
                </a>
              </li>
              <li className="flex items-center">
                <FiPhone className="mr-3 w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                <a
                  href="tel:+998935937536"
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  +998 93 593 7536
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {translations.footer.rights}
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              {/* <Link
                href={`/${currentLocale}/privacy-policy`}
                className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm"
              >
                {translations.footer.privacy}
              </Link>
              <Link
                href={`/${currentLocale}/terms-of-service`}
                className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm"
              >
                {translations.footer.terms}
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
