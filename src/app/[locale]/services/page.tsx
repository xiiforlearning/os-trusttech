import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowRight,
  FiCode,
  FiSmartphone,
  FiLayout,
  FiCheckCircle,
  FiDatabase,
  FiServer,
  FiShield,
  FiRefreshCw,
} from "react-icons/fi";
import { PageProps } from "../../../../.next/types/app/layout";

// Add these type definitions after imports and before metadata
interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

interface ServiceFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  image: string;
}

export const metadata: Metadata = {
  title: "Services | OS TrustTech",
  description: "Explore our range of software development and IT services",
};

async function getTranslations(locale: string) {
  try {
    const translations = await import(
      `../../../../public/locales/${locale}/common.json`
    );
    return translations.default;
  } catch (error) {
    console.error(`Error loading translations for locale ${locale}:`, error);
    // Fall back to English
    const fallbackTranslations = await import(
      `../../../../public/locales/en/common.json`
    );
    return fallbackTranslations.default;
  }
}

export default async function ServicesPage({ params }: PageProps) {
  // Get the locale from params - no need to await, direct access is fine
  const resolvedParams = await params;
  const locale = String(resolvedParams.locale || "en");
  const translations = await getTranslations(locale);

  console.log(`Services page loaded with locale: ${locale}`);

  // Services translations with fallbacks
  const servicesTranslations = {
    title: translations.services?.title || "Our Services",
    hero: {
      title: translations.services?.hero?.title || "Our Services",
      description:
        translations.services?.hero?.description ||
        "Comprehensive software solutions tailored to your business needs",
    },
    offer: {
      title: translations.services?.offer?.title || "What We Offer",
      description:
        translations.services?.offer?.description ||
        "End-to-end solutions for all your software development needs",
    },
    core: {
      title: translations.services?.core?.title || "Our Core Services",
      description:
        translations.services?.core?.description ||
        "Detailed look at our primary service offerings",
    },
    process: {
      title: translations.services?.process?.title || "Our Development Process",
      description:
        translations.services?.process?.description ||
        "A systematic approach to ensure project success",
      steps: translations.services?.process?.steps || [
        {
          step: "01",
          title: "Discovery",
          description:
            "We learn about your business, goals, and project requirements",
        },
        {
          step: "02",
          title: "Planning",
          description:
            "Creating a roadmap with timelines, features, and deliverables",
        },
        {
          step: "03",
          title: "Design",
          description:
            "Crafting user experience and visual design of your solution",
        },
        {
          step: "04",
          title: "Development",
          description: "Building your solution with clean, maintainable code",
        },
        {
          step: "05",
          title: "Testing",
          description:
            "Rigorous quality assurance to ensure everything works perfectly",
        },
        {
          step: "06",
          title: "Deployment",
          description:
            "Launching your solution and providing continued support",
        },
      ],
    },
    cta: {
      title:
        translations.services?.cta?.title || "Ready to start your project?",
      description:
        translations.services?.cta?.description ||
        "Contact us today to discuss how we can help bring your ideas to life",
      button: translations.services?.cta?.button || "Get in Touch",
    },
  };

  // Extended services data with translations
  const services = [
    {
      id: "webdev",
      title: translations.services?.webdev?.title || "Web Development",
      description:
        translations.services?.webdev?.description ||
        "Custom websites and web applications built with the latest technologies",
      icon: <FiCode className="w-8 h-8" />,
      features: translations.services?.webdev?.features || [
        "Responsive web applications",
        "Progressive Web Apps (PWA)",
        "E-commerce platforms",
        "Custom CMS solutions",
        "API development and integration",
      ],
      image: "/images/hero-bg.svg",
    },
    {
      id: "mobiledev",
      title:
        translations.services?.mobiledev?.title ||
        "Mobile Application Development",
      description:
        translations.services?.mobiledev?.description ||
        "Native and cross-platform mobile apps for iOS and Android",
      icon: <FiSmartphone className="w-8 h-8" />,
      features: translations.services?.mobiledev?.features || [
        "Native iOS development",
        "Native Android development",
        "Cross-platform (React Native, Flutter)",
        "Mobile app redesign and optimization",
        "App Store submission assistance",
      ],
      image: "/images/hero-bg.svg",
    },
    {
      id: "uiux",
      title: translations.services?.uiux?.title || "UI/UX Design",
      description:
        translations.services?.uiux?.description ||
        "User-centered design that enhances user experience and satisfaction",
      icon: <FiLayout className="w-8 h-8" />,
      features: translations.services?.uiux?.features || [
        "User research and personas",
        "Information architecture",
        "Wireframing and prototyping",
        "Visual design and branding",
        "Usability testing",
      ],
      image: "/images/hero-bg.svg",
    },
    {
      id: "qa",
      title: translations.services?.qa?.title || "QA & Testing",
      description:
        translations.services?.qa?.description ||
        "Comprehensive testing to ensure your software is bug-free and reliable",
      icon: <FiCheckCircle className="w-8 h-8" />,
      features: translations.services?.qa?.features || [
        "Manual testing",
        "Automated testing",
        "Performance testing",
        "Security testing",
        "QA process implementation",
      ],
      image: "/images/hero-bg.svg",
    },
    {
      id: "database",
      title: translations.services?.database?.title || "Database Solutions",
      description:
        translations.services?.database?.description ||
        "Efficient data storage and management solutions for your business",
      icon: <FiDatabase className="w-8 h-8" />,
      features: translations.services?.database?.features || [
        "Database design and modeling",
        "SQL and NoSQL implementations",
        "Data migration and integration",
        "Database performance optimization",
        "Backup and recovery solutions",
      ],
      image: "/images/hero-bg.svg",
    },
    {
      id: "devops",
      title: translations.services?.devops?.title || "DevOps & Cloud",
      description:
        translations.services?.devops?.description ||
        "Streamline your development and operational processes",
      icon: <FiServer className="w-8 h-8" />,
      features: translations.services?.devops?.features || [
        "CI/CD pipeline setup",
        "Container orchestration (Docker, Kubernetes)",
        "Cloud migration (AWS, Azure, GCP)",
        "Infrastructure as Code",
        "Monitoring and logging solutions",
      ],
      image: "/images/hero-bg.svg",
    },
    {
      id: "security",
      title: translations.services?.security?.title || "Cybersecurity",
      description:
        translations.services?.security?.description ||
        "Protect your digital assets with robust security measures",
      icon: <FiShield className="w-8 h-8" />,
      features: translations.services?.security?.features || [
        "Security assessment and auditing",
        "Penetration testing",
        "Security implementation",
        "Compliance consulting (GDPR, HIPAA)",
        "Security training for teams",
      ],
      image: "/images/hero-bg.svg",
    },
    {
      id: "maintenance",
      title:
        translations.services?.maintenance?.title || "Maintenance & Support",
      description:
        translations.services?.maintenance?.description ||
        "Ensure your software continues to run smoothly",
      icon: <FiRefreshCw className="w-8 h-8" />,
      features: translations.services?.maintenance?.features || [
        "24/7 technical support",
        "Regular updates and patches",
        "Performance monitoring",
        "Bug fixing and troubleshooting",
        "System health checks",
      ],
      image: "/images/hero-bg.svg",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative py-24"
        style={{
          backgroundImage: "url('/images/hero-bg.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gray-900 opacity-20"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {servicesTranslations.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              {servicesTranslations.hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {servicesTranslations.offer.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {servicesTranslations.offer.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2 mt-4">
                  {service.features
                    .slice(0, 3)
                    .map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-blue-600 dark:text-blue-400 mr-2">
                          •
                        </span>
                        <span className="text-gray-600 dark:text-gray-400 text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services Sections - alternating layout */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {servicesTranslations.core.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {servicesTranslations.core.description}
            </p>
          </div>

          {services.slice(0, 4).map((service, index) => (
            <div
              key={service.id}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center mb-20 last:mb-0`}
            >
              <div className="w-full md:w-1/2 p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">
                        •
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full md:w-1/2 p-6">
                <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Development Process */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {servicesTranslations.process.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {servicesTranslations.process.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {servicesTranslations.process.steps.map(
              (process: ProcessStep, index: number) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 relative overflow-hidden"
                >
                  <div className="text-5xl font-bold text-blue-100 dark:text-blue-900 absolute right-4 top-4 opacity-60">
                    {process.step}
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      {process.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {process.description}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {servicesTranslations.cta.title}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            {servicesTranslations.cta.description}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-md text-lg font-medium transition-colors shadow-lg"
          >
            {servicesTranslations.cta.button} <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
