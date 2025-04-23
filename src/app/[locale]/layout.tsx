import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import ClientThemeWrapper from "@/components/ClientThemeWrapper";
import AnalyticsWrapper from "@/components/AnalyticsWrapper";
import { PageProps } from "../../../.next/types/app/layout";

// This is needed to use server components with translation files
async function getTranslations(locale: string) {
  try {
    const translations = await import(
      `../../../public/locales/${locale}/common.json`
    );
    return translations.default;
  } catch (error) {
    notFound();
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  // Await the params object first
  const resolvedParams = await params;
  const locale = String(resolvedParams.locale || "en");

  // Get the translations based on the locale
  const translations = await getTranslations(locale);

  return {
    title: "OS TrustTech",
    description: "Innovative Software Development Company based in Uzbekistan",
    alternates: {
      canonical: "/",
      languages: {
        "en-US": "/en",
        "ru-RU": "/ru",
        "uz-UZ": "/uz",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Await the params object first
  const resolvedParams = await params;
  const locale = String(resolvedParams.locale || "en");

  // Get translations for the navbar and footer
  const translations = await getTranslations(locale);

  return (
    <html lang={locale} suppressHydrationWarning className="light">
      <body
        className="bg-white text-gray-900 accent-indigo-600"
        suppressHydrationWarning
      >
        <ClientThemeWrapper>
          <AnalyticsWrapper>
            <Navbar translations={translations} locale={locale} />
            <main className="min-h-screen pt-16">{children}</main>
            <Footer translations={translations} locale={locale} />
          </AnalyticsWrapper>
        </ClientThemeWrapper>
      </body>
    </html>
  );
}
