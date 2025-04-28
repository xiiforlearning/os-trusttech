import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowRight,
  FiCode,
  FiSmartphone,
  FiLayout,
  FiCheckCircle,
} from "react-icons/fi";
import { PageProps } from "../../../.next/types/app/layout";

// Metadata will be inherited from the locale layout

async function getTranslations(locale: string) {
  const translations = await import(
    `../../../public/locales/${locale}/common.json`
  );
  return translations.default;
}

export default async function HomePage({ params }: PageProps) {
  // In Next.js 15+, we need to handle params differently
  // Await the params object first, then access the properties
  const resolvedParams = await params;
  const locale = String(resolvedParams.locale || "en");
  const translations = await getTranslations(locale);

  // Mock client logos
  const clients = [
    { name: "Company A", logo: "/images/client-logo-1.svg" },
    { name: "Company B", logo: "/images/client-logo-2.svg" },
    { name: "Company C", logo: "/images/client-logo-3.svg" },
    { name: "Company D", logo: "/images/client-logo-4.svg" },
    { name: "Company E", logo: "/images/client-logo-5.svg" },
  ];

  return (
    <div>
      {/* Hero Section with Background Image */}
      <div
        className="relative py-24 px-4 text-center text-white min-h-[80vh] flex items-center justify-center"
        style={{
          backgroundImage: "url('/images/hero-bg.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-4xl mx-auto z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {translations.home.hero.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            {translations.home.hero.subtitle}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center bg-white text-blue-700 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors shadow-lg"
          >
            {translations.home.hero.cta}
            <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </div>

      {/* Services Overview */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {translations.home.services.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {translations.home.services.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Service Card 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                <FiCode className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {translations.services.webdev.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {translations.services.webdev.description}
              </p>
            </div>

            {/* Service Card 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                <FiSmartphone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {translations.services.mobiledev.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {translations.services.mobiledev.description}
              </p>
            </div>

            {/* Service Card 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                <FiLayout className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {translations.services.uiux.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {translations.services.uiux.description}
              </p>
            </div>

            {/* Service Card 4 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                <FiCheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {translations.services.qa.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {translations.services.qa.description}
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium group"
            >
              {translations.home.services.learnMore}
              <span className="ml-2">
                <FiArrowRight />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Section Placeholder */}
      {/* <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {translations.home.interactive.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {translations.home.interactive.description}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="w-full h-[400px] bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center">
              <p className="text-gray-600 dark:text-gray-400">
                {translations.home.interactive.placeholder}
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Clients Section */}

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {translations.home.cta.title}
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {translations.home.cta.description}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center bg-white text-blue-700 hover:bg-blue-50 text-lg font-medium px-8 py-3 rounded-md shadow-lg"
            >
              {translations.home.hero.cta}
              <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
