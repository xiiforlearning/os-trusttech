import { Metadata } from "next";
import Link from "next/link";
import { FiMail, FiPhone, FiMapPin, FiClock } from "react-icons/fi";
import { PageProps } from "../../../../.next/types/app/layout";

// Add interface definitions for translations
interface FaqItem {
  question: string;
  answer: string;
}

export const metadata: Metadata = {
  title: "Contact | OS TrustTech",
  description: "Get in touch with our team for your software development needs",
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

export default async function ContactPage({ params }: PageProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || "en";
  const translations = await getTranslations(locale);

  // Create contact translations object with fallbacks
  const contactTranslations = {
    title: translations.contact?.title || "Contact Us",
    subtitle:
      translations.contact?.subtitle ||
      "We'd love to hear from you. Get in touch with our team.",
    info: {
      title: translations.contact?.info || "Contact Information",
      address: {
        title: translations.contact?.address?.title || "Our Office",
        street:
          translations.contact?.address?.street || "123 Technology Street",
        city: translations.contact?.address?.city || "Tashkent",
        country: translations.contact?.address?.country || "Uzbekistan",
      },
      email: {
        title: "Email",
        value: translations.contact?.email || "contact@ostt.uz",
      },
      phone: {
        title: "Phone",
        value: translations.contact?.phone || "+998 93 593 7536",
      },
      hours: {
        title: translations.contact?.hours?.title || "Business Hours",
        weekdays: `${
          translations.contact?.hours?.weekdays || "Monday - Friday"
        }: ${translations.contact?.hours?.weekdayHours || "9:00 AM - 6:00 PM"}`,
        saturday: `${translations.contact?.hours?.saturday || "Saturday"}: ${
          translations.contact?.hours?.saturdayHours || "10:00 AM - 4:00 PM"
        }`,
        sunday: `${translations.contact?.hours?.sunday || "Sunday"}: ${
          translations.contact?.hours?.sundayHours || "Closed"
        }`,
      },
    },
    form: {
      title: translations.contact?.form?.title || "Send Us a Message",
      name: translations.contact?.form?.name || "Full Name",
      email: translations.contact?.form?.email || "Email Address",
      message: translations.contact?.form?.message || "Your Message",
      submit: translations.contact?.form?.submit || "Send Message",
      namePlaceholder:
        translations.contact?.form?.namePlaceholder || "Your full name",
      emailPlaceholder:
        translations.contact?.form?.emailPlaceholder || "Your email address",
      messagePlaceholder:
        translations.contact?.form?.messagePlaceholder || "Your message",
      phoneNumber: translations.contact?.form?.phoneNumber,
    },
    map: {
      title: translations.contact?.map?.title || "Find Us",
      description:
        translations.contact?.map?.description ||
        "Visit our office or get in touch with us online",
    },
    faq: {
      title: translations.contact?.faq?.title || "Frequently Asked Questions",
      description:
        translations.contact?.faq?.description ||
        "Find answers to commonly asked questions about our services",
      questions: translations.contact?.faq?.questions || [
        {
          question: "What services do you offer?",
          answer:
            "We offer a comprehensive range of software development services including web development, mobile app development, UX/UI design, and cloud solutions.",
        },
        {
          question: "How much does it cost to develop a project?",
          answer:
            "Project costs vary based on requirements, complexity, and timeline. Contact us for a free consultation and quote tailored to your specific needs.",
        },
        {
          question: "How long does it take to complete a project?",
          answer:
            "Development timeframes depend on project scope and complexity. We'll provide a detailed timeline during our initial consultation.",
        },
        {
          question: "Do you provide ongoing maintenance and support?",
          answer:
            "Yes, we offer various maintenance and support packages to ensure your software continues to run smoothly after launch.",
        },
      ],
    },
  };

  return (
    <div>
      {/* Contact Hero */}
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
              {contactTranslations.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              {contactTranslations.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information and Form */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Contact Information */}
            <div className="w-full md:w-1/3">
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: "var(--text-primary)" }}
              >
                {contactTranslations.info.title}
              </h2>

              <div
                className="rounded-lg shadow-md p-6"
                style={{ backgroundColor: "var(--bg-card)" }}
              >
                <div className="space-y-6">
                  {/* <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: "var(--bg-accent-subtle)",
                          color: "var(--accent)",
                        }}
                      >
                        <FiMapPin size={24} />
                      </div>
                    </div>
                    <div>
                      <h3
                        className="text-lg font-semibold mb-1"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {contactTranslations.info.address.title}
                      </h3>
                      <p style={{ color: "var(--text-secondary)" }}>
                        {contactTranslations.info.address.street}
                        <br />
                        {contactTranslations.info.address.city},{" "}
                        {contactTranslations.info.address.country}
                      </p>
                    </div>
                  </div> */}

                  {/* Email */}
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: "var(--bg-accent-subtle)",
                          color: "var(--accent)",
                        }}
                      >
                        <FiMail size={24} />
                      </div>
                    </div>
                    <div>
                      <h3
                        className="text-lg font-semibold mb-1"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {contactTranslations.info.email.title}
                      </h3>
                      <a
                        href={`mailto:${contactTranslations.info.email.value}`}
                        className="hover:text-blue-800 dark:hover:text-blue-300"
                        style={{ color: "var(--accent)" }}
                      >
                        {contactTranslations.info.email.value}
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: "var(--bg-accent-subtle)",
                          color: "var(--accent)",
                        }}
                      >
                        <FiPhone size={24} />
                      </div>
                    </div>
                    <div>
                      <h3
                        className="text-lg font-semibold mb-1"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {contactTranslations.info.phone.title}
                      </h3>
                      <a
                        href={`tel:${contactTranslations.info.phone.value.replace(
                          /\s+/g,
                          ""
                        )}`}
                        className="hover:text-blue-800 dark:hover:text-blue-300"
                        style={{ color: "var(--accent)" }}
                      >
                        {contactTranslations.info.phone.value}
                      </a>
                    </div>
                  </div>

                  {/* Business Hours */}
                  {/* <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: "var(--bg-accent-subtle)",
                          color: "var(--accent)",
                        }}
                      >
                        <FiClock size={24} />
                      </div>
                    </div>
                    <div>
                      <h3
                        className="text-lg font-semibold mb-1"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {contactTranslations.info.hours.title}
                      </h3>
                      <p style={{ color: "var(--text-secondary)" }}>
                        {contactTranslations.info.hours.weekdays}
                        <br />
                        {contactTranslations.info.hours.saturday}
                        <br />
                        {contactTranslations.info.hours.sunday}
                      </p>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="w-full md:w-2/3">
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: "var(--text-primary)" }}
              >
                {contactTranslations.form.title}
              </h2>

              <div
                className="rounded-lg shadow-md p-6"
                style={{ backgroundColor: "var(--bg-card)" }}
              >
                <form action="/api/contact" method="POST" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {contactTranslations.form.name}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder={contactTranslations.form.namePlaceholder}
                        className="w-full px-4 py-2 rounded-md"
                        style={{
                          backgroundColor: "var(--bg-card)",
                          color: "var(--text-primary)",
                          borderWidth: "1px",
                          borderColor: "var(--border)",
                        }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {contactTranslations.form.email}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder={contactTranslations.form.emailPlaceholder}
                        className="w-full px-4 py-2 rounded-md"
                        style={{
                          backgroundColor: "var(--bg-card)",
                          color: "var(--text-primary)",
                          borderWidth: "1px",
                          borderColor: "var(--border)",
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium mb-2"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {contactTranslations.form.phoneNumber}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="+998 90 123 45 67"
                      maxLength={17}
                      className="w-full px-4 py-2 rounded-md"
                      style={{
                        backgroundColor: "var(--bg-card)",
                        color: "var(--text-primary)",
                        borderWidth: "1px",
                        borderColor: "var(--border)",
                      }}
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full md:w-auto px-6 py-3 font-medium rounded-md transition-colors"
                      style={{
                        backgroundColor: "var(--accent)",
                        color: "var(--accent-foreground)",
                      }}
                    >
                      {contactTranslations.form.submit}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      {/* <section className="py-16" style={{ backgroundColor: "var(--bg-muted)" }}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              {contactTranslations.map.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {contactTranslations.map.description}
            </p>
          </div>

          <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto max-w-5xl overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
              <p className="text-lg">
                Map placeholder - Google Maps or other map service would be
                integrated here
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              {contactTranslations.faq.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {contactTranslations.faq.description}
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid gap-6">
            {contactTranslations.faq.questions.map(
              (faq: FaqItem, index: number) => (
                <div
                  key={index}
                  className="rounded-lg shadow-md overflow-hidden"
                  style={{ backgroundColor: "var(--bg-card)" }}
                >
                  <details className="group">
                    <summary
                      className="flex items-center justify-between p-6 cursor-pointer"
                      style={{ color: "var(--text-primary)" }}
                    >
                      <h3 className="text-xl font-medium">{faq.question}</h3>
                      <span className="ml-2 text-gray-500 transition-transform duration-200 group-open:rotate-180">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </span>
                    </summary>
                    <div
                      className="px-6 pb-6"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <p>{faq.answer}</p>
                    </div>
                  </details>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
