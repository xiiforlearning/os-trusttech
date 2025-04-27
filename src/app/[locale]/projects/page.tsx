import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { PageProps } from "../../../../.next/types/app/layout";
import { p } from "framer-motion/client";

// Add type definitions for translations
interface ProjectCategory {
  id: string;
  label: string;
}

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  link: string;
  githubLink: string;
}

interface ClientTestimonial {
  name: string;
  company: string;
  comment: string;
  image: string;
}

interface TestimonialItem {
  name: string;
  company: string;
  comment: string;
}

export const metadata: Metadata = {
  title: "Projects | OS TrustTech",
  description: "Explore our portfolio of software development projects",
};

async function getTranslations(locale: string) {
  const translations = await import(
    `../../../../public/locales/${locale}/common.json`
  );
  return translations.default;
}

export default async function ProjectsPage({ params }: PageProps) {
  // In Next.js 15+, we need to handle params differently
  const resolvedParams = await params;
  const locale = String(resolvedParams.locale || "en");
  const translations = await getTranslations(locale);

  // Projects translations with fallbacks
  const projectsTranslations = {
    title: translations.projects?.title || "Our Projects",
    description: "Explore our portfolio of successful client projects", // This could be added to translations
    filter: {
      all: translations.projects?.filter?.all || "All",
      web: translations.projects?.filter?.web || "Web",
      mobile: translations.projects?.filter?.mobile || "Mobile",
      design: translations.projects?.filter?.design || "Design",
    },
    categories: {
      web: "Web App",
      mobile: "Mobile App",
      design: "UI/UX Design",
    },
    testimonials: {
      title:
        translations.projects?.testimonials?.title || "Client Testimonials",
      description:
        translations.projects?.testimonials?.description ||
        "What our clients say about working with us",
      items: translations.projects?.testimonials?.items || [
        {
          name: "John Smith",
          company: "ABC Corporation",
          comment:
            "The team at OS TrustTech delivered our project on time and exceeded our expectations. Their technical expertise and communication were exceptional.",
        },
        {
          name: "Sarah Johnson",
          company: "XYZ Industries",
          comment:
            "Working with OS TrustTech was a great experience. They understood our requirements perfectly and built exactly what we needed.",
        },
        {
          name: "Robert Davis",
          company: "Acme Enterprises",
          comment:
            "The mobile app developed by OS TrustTech has transformed our business operations. Their ongoing support has been invaluable.",
        },
      ],
    },
    cta: {
      title:
        translations.projects?.cta?.title || "Ready to start your project?",
      description:
        translations.projects?.cta?.description ||
        "Contact us today to discuss how we can help bring your ideas to life",
      button: translations.projects?.cta?.button || "Get Started",
    },
    projects: {
      tvcom: {
        title:
          translations.projects?.projects?.tvcom?.title ||
          "E-commerce Platform",
        description:
          translations.projects?.projects?.tvcom?.description ||
          "A complete e-commerce solution with customer portal, admin dashboard, and inventory management.",
      },
      mias: {
        title:
          translations.projects?.projects?.mias?.title || "Banking Mobile App",
        description:
          translations.projects?.projects?.mias?.description ||
          "Secure mobile banking application with transaction history, bill payments, and account management.",
      },
      comnet: {
        title:
          translations.projects?.projects?.comnet?.title ||
          "Healthcare Management System",
        description:
          translations.projects?.projects?.comnet?.description ||
          "Comprehensive healthcare platform for patient records, appointment scheduling, and billing.",
      },
      haqq: {
        title:
          translations.projects?.projects?.haqq?.title ||
          "Real Estate Marketplace",
        description:
          translations.projects?.projects?.haqq?.description ||
          "Property listing and search platform with virtual tours and mortgage calculator.",
      },
      tvcomuz: {
        title:
          translations.projects?.projects?.tvcomuz?.title ||
          "Fitness Tracking App",
        description:
          translations.projects?.projects?.tvcomuz?.description ||
          "Mobile fitness tracker with workout plans, progress monitoring, and social features.",
      },
      bt: {
        title:
          translations.projects?.projects?.bt?.title ||
          "Supply Chain Management System",
        description:
          translations.projects?.projects?.bt?.description ||
          "End-to-end supply chain solution with inventory tracking, order management, and analytics.",
      },
    },
    buttons: {
      viewLive: translations.projects?.buttons?.viewLive || "View Live",
      // sourceCode: translations.projects?.buttons?.sourceCode || "Source Code",
    },
  };

  // Mock project data with translations
  const projects: ProjectItem[] = [
    {
      id: "project1",
      title: "TVCOM",
      description: projectsTranslations.projects.tvcom.description,
      image: "/images/tvcom.png",
      category: "mobile",
      technologies: ["React Native", "TypeScript", "Node.js"],
      link: "https://apps.apple.com/uz/app/tvcom/id6479690034",
      githubLink:
        "https://play.google.com/store/apps/details?id=uz.comnet.tvcomstb&hl=en",
    },
    {
      id: "project2",
      title: "Mias transportation",
      description: projectsTranslations.projects.mias.description,
      image: "/images/mias.png",
      category: "mobile",
      technologies: ["React Native", "Redux", "Firebase", "Ruby"],
      link: "https://apps.apple.com/ua/app/mias/id6450757698",
      githubLink: "",
    },
    {
      id: "project3",
      title: "Comnet.uz",
      description: projectsTranslations.projects.comnet.description,
      image: "/images/comnet.png",
      category: "web",
      technologies: ["Next.js", "Express.js", "PostgreSQL"],
      link: "https://comnet.uz/",
      githubLink: "",
    },
    {
      id: "project4",
      title: "Haqq wallet",
      description: projectsTranslations.projects.haqq.description,
      image: "/images/haqq.png",
      category: "mobile",
      technologies: ["React Native", "Zustand", "Firebase", "TypeScript"],
      link: "https://www.haqq.network/wallet",
      githubLink:
        "https://play.google.com/store/apps/details?id=com.haqq.wallet&hl=en",
    },
    {
      id: "project5",
      title: "tvcom.uz",
      description: projectsTranslations.projects.tvcomuz.description,
      image: "/images/tvcom_site.png",
      category: "web",
      technologies: ["Vue", "Node.js"],
      link: "https://tvcom.uz/",
      githubLink: "",
    },
    {
      id: "project6",
      title: "BT Business",
      description: projectsTranslations.projects.bt.description,
      image: "/images/BT.png",
      category: "web",
      technologies: ["Next.js", "Express.js", "PostgreSQL"],
      link: "https://business.bt.com/",
      githubLink: "",
    },
  ];

  const categories: ProjectCategory[] = [
    { id: "all", label: projectsTranslations.filter.all },
    { id: "web", label: projectsTranslations.filter.web },
    { id: "mobile", label: projectsTranslations.filter.mobile },
    { id: "design", label: projectsTranslations.filter.design },
  ];

  // Replace testimonials array with translated content
  const testimonials: ClientTestimonial[] =
    projectsTranslations.testimonials.items.map((item: TestimonialItem) => ({
      name: item.name,
      company: item.company,
      comment: item.comment,
      image: "/images/client-logo-1.svg", // Default image, could be improved with real images
    }));

  return (
    <div>
      {/* Projects Hero */}
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
              {projectsTranslations.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Project Categories */}
      <section
        className="py-8 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        {/* <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-6 py-2 rounded-md transition-colors ${
                  category.id === "all"
                    ? "text-white"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
                style={{
                  backgroundColor:
                    category.id === "all" ? "var(--accent)" : "var(--bg-muted)",
                  color:
                    category.id === "all"
                      ? "var(--accent-foreground)"
                      : "var(--text-secondary)",
                }}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div> */}
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                style={{ backgroundColor: "var(--bg-card)" }}
              >
                <div className="relative h-56 w-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <div
                    className="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: "var(--accent)",
                      color: "var(--accent-foreground)",
                    }}
                  >
                    {project.category === "web"
                      ? projectsTranslations.filter.web
                      : project.category === "mobile"
                      ? projectsTranslations.filter.mobile
                      : projectsTranslations.filter.design}
                  </div>
                </div>
                <div className="p-6">
                  <h3
                    className="text-xl font-semibold mb-3"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="mb-4"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: "var(--bg-muted)",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={project.link}
                      className="flex items-center hover:text-blue-800 dark:hover:text-blue-300"
                      style={{ color: "var(--accent)" }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FiExternalLink className="mr-1" />
                      {project.title == "TVCOM" ||
                      project.title == "Haqq wallet" ||
                      project.title == "Mias transportation"
                        ? "IOS"
                        : ""}
                      {project.title == "TVCOM" ||
                      project.title == "Mias transportation" ||
                      project.title == "Haqq wallet"
                        ? ""
                        : projectsTranslations.buttons.viewLive}
                    </a>
                    {project?.githubLink ? (
                      <a
                        href={project.githubLink}
                        className="flex items-center hover:text-blue-800 dark:hover:text-blue-300"
                        style={{ color: "var(--accent)" }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FiExternalLink className="mr-1" />{" "}
                        {project.title == "TVCOM" ||
                        project.title == "Haqq wallet"
                          ? "ANDROID"
                          : ""}
                        {project.title == "TVCOM" ||
                        project.title == "Haqq wallet"
                          ? ""
                          : projectsTranslations.buttons.viewLive}
                      </a>
                    ) : (
                      <></>
                    )}
                    {/* <a
                      href={project.githubLink}
                      className="flex items-center hover:text-gray-800 dark:hover:text-gray-300"
                      style={{ color: "var(--text-secondary)" }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FiGithub className="mr-1" />{" "}
                      {projectsTranslations.buttons.sourceCode}
                    </a> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      {/* <section className="py-20" style={{ backgroundColor: "var(--bg-muted)" }}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              {projectsTranslations.testimonials.title}
            </h2>
            <p
              className="text-xl max-w-3xl mx-auto"
              style={{ color: "var(--text-secondary)" }}
            >
              {projectsTranslations.testimonials.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="rounded-lg shadow-md p-6"
                style={{ backgroundColor: "var(--bg-card)" }}
              >
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4
                      className="font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {testimonial.name}
                    </h4>
                    <p
                      className="text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {testimonial.company}
                    </p>
                  </div>
                </div>
                <p
                  className="italic"
                  style={{ color: "var(--text-secondary)" }}
                >
                  "{testimonial.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section
        className="py-20 text-white"
        style={{ backgroundColor: "var(--accent)" }}
      >
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {projectsTranslations.cta.title}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            {projectsTranslations.cta.description}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center px-8 py-4 rounded-md text-lg font-medium transition-colors shadow-lg"
            style={{ backgroundColor: "white", color: "var(--accent)" }}
          >
            {projectsTranslations.cta.button}
          </Link>
        </div>
      </section>
    </div>
  );
}
