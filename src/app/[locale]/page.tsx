import { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";
import { PageProps } from "../../../.next/types/app/layout";

// Metadata will be inherited from the locale layout

async function getTranslations(locale: string) {
  const translations = await import(
    `../../../public/locales/${locale}/common.json`
  );
  return translations.default;
}

// Server component
export default async function HomePage({ 
  params 
}: PageProps) {
  // Await the params object first
  const resolvedParams = await params;
  const locale = String(resolvedParams.locale || "en");
  
  // Get translations
  const translations = await getTranslations(locale);
  
  // Render the client component with the translations
  return <HomePageClient locale={locale} translations={translations} />;
}
