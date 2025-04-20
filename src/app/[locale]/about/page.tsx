import { Metadata } from "next";
import Image from "next/image";
import { FiUser, FiTarget, FiAward, FiTrendingUp, FiZap, FiStar, FiTrendingUp as FiGrowth, FiGlobe, FiCode } from "react-icons/fi";

export const metadata: Metadata = {
  title: "About | OS TrustTech",
  description: "Learn about OS TrustTech, our mission, team and company milestones",
};

async function getTranslations(locale: string) {
  const translations = await import(`../../../../public/locales/${locale}/common.json`);
  return translations.default;
}

export default async function AboutPage({ params }: { params: { locale: string } }) {
  // In Next.js 15+, we need to handle params differently
  // Await the params object first, then access the properties
  const resolvedParams = await params;
  const locale = String(resolvedParams.locale || 'en');
  const translations = await getTranslations(locale);

  // Add fallbacks for potentially missing translations
  const aboutTranslations = {
    title: translations.about?.title || "About OS TrustTech",
    description: translations.about?.description || "We're a team of passionate technologists dedicated to crafting innovative software solutions.",
    philosophy: translations.about?.philosophy || "At OS TrustTech, we believe in combining technical excellence with a deep understanding of our clients' business needs. Our solutions are built not just to solve today's challenges, but to adapt and grow with your business tomorrow.",
    guiding_principle: translations.about?.guiding_principle || "Building trust through technology excellence.",
    guiding_principle_label: translations.about?.guiding_principle_label || "Our Guiding Principle",
    core_values: {
      title: translations.about?.core_values?.title || "Our Core Values",
      excellence: {
        title: translations.about?.core_values?.excellence?.title || "Excellence",
        description: translations.about?.core_values?.excellence?.description || "We are committed to delivering the highest quality solutions that exceed expectations."
      },
      innovation: {
        title: translations.about?.core_values?.innovation?.title || "Innovation",
        description: translations.about?.core_values?.innovation?.description || "We embrace new technologies and approaches to solve complex challenges."
      },
      reliability: {
        title: translations.about?.core_values?.reliability?.title || "Reliability",
        description: translations.about?.core_values?.reliability?.description || "Our clients trust us for our consistency, dependability and transparency."
      },
      growth: {
        title: translations.about?.core_values?.growth?.title || "Growth",
        description: translations.about?.core_values?.growth?.description || "We believe in continuous improvement and helping our clients and team grow."
      }
    },
    technology: {
      title: translations.about?.technology?.title || "Our Technology Approach",
      description: translations.about?.technology?.description || "We combine the latest technologies with proven methodologies to deliver exceptional results that stand the test of time.",
      frontend: {
        title: translations.about?.technology?.frontend?.title || "Frontend Development",
        description: translations.about?.technology?.frontend?.description || "We employ modern JavaScript frameworks and responsive design techniques to create fast, intuitive, and engaging user experiences across all devices and platforms.",
        tags: translations.about?.technology?.frontend?.tags || ["Modern Frameworks", "Responsive Design", "Interactive UI"]
      },
      backend: {
        title: translations.about?.technology?.backend?.title || "Backend Development",
        description: translations.about?.technology?.backend?.description || "Our server-side solutions utilize scalable architectures, efficient database design, and robust API development to power high-performance applications.",
        tags: translations.about?.technology?.backend?.tags || ["Scalable Architecture", "Database Optimization", "API Development"]
      },
      cloud: {
        title: translations.about?.technology?.cloud?.title || "Cloud & Infrastructure",
        description: translations.about?.technology?.cloud?.description || "We leverage cloud-native technologies and containerization to create deployments that are secure, scalable, and cost-effective for businesses of all sizes.",
        tags: translations.about?.technology?.cloud?.tags || ["Cloud-Native", "Containerization", "Secure Deployment"]
      },
      practices: {
        title: translations.about?.technology?.practices?.title || "Development Practices",
        description: translations.about?.technology?.practices?.description || "Our workflow incorporates CI/CD pipelines, automated testing, and agile methodologies to ensure quality, reliability, and rapid delivery of solutions.",
        tags: translations.about?.technology?.practices?.tags || ["CI/CD Pipelines", "Automated Testing", "Agile Methodology"]
      }
    },
    mission: {
      title: translations.about?.mission?.title || "Our Mission",
      description: translations.about?.mission?.description || "To deliver high-quality software solutions that drive business growth and technological innovation"
    },
    team: {
      title: translations.about?.team?.title || "Our Team",
      description: translations.about?.team?.description || "Meet the talented professionals behind our success",
      members: translations.about?.team?.members || [
        {
          name: "John Doe",
          role: "CEO & Founder",
          bio: "With over 15 years of experience in tech leadership, John leads our strategic vision and growth.",
        },
        {
          name: "Jane Smith",
          role: "CTO",
          bio: "Jane oversees our technical direction, ensuring we stay at the forefront of technology innovation.",
        },
        {
          name: "Alex Johnson",
          role: "Lead Developer",
          bio: "Alex brings 10 years of expertise in building scalable applications and mentoring development teams.",
        },
        {
          name: "Sarah Williams",
          role: "UX/UI Director",
          bio: "Sarah combines aesthetics with functionality to create intuitive and delightful user experiences.",
        }
      ]
    },
    milestones: {
      title: translations.about?.milestones?.title || "Milestones",
      description: translations.about?.milestones?.description || "Our journey of growth and success",
      items: translations.about?.milestones?.items || [
        {
          year: "2015",
          title: "Company Founded",
          description: "OS TrustTech was established with a vision to create reliable software solutions."
        },
        {
          year: "2017",
          title: "First Major Client",
          description: "Secured our first enterprise client and delivered a successful banking software system."
        },
        {
          year: "2019",
          title: "Team Expansion",
          description: "Grew our team to 25 professionals and opened a new development center."
        },
        {
          year: "2021",
          title: "International Presence",
          description: "Expanded operations to serve international clients across Europe and Asia."
        },
        {
          year: "2023",
          title: "Innovation Award",
          description: "Received the National Innovation Award for our contributions to the tech industry."
        }
      ]
    }
  };

  // Mock milestones data
  const milestones = [
    {
      year: "2015",
      title: "Company Founded",
      description:
        "OS TrustTech was established with a vision to create reliable software solutions.",
      icon: <FiZap className="w-5 h-5" />,
    },
    {
      year: "2017",
      title: "First Major Client",
      description:
        "Secured our first enterprise client and delivered a successful banking software system.",
      icon: <FiTarget className="w-5 h-5" />,
    },
    {
      year: "2019",
      title: "Team Expansion",
      description:
        "Grew our team to 25 professionals and opened a new development center.",
      icon: <FiUser className="w-5 h-5" />,
    },
    {
      year: "2021",
      title: "International Presence",
      description:
        "Expanded operations to serve international clients across Europe and Asia.",
      icon: <FiTrendingUp className="w-5 h-5" />,
    },
    {
      year: "2023",
      title: "Innovation Award",
      description:
        "Received the National Innovation Award for our contributions to the tech industry.",
      icon: <FiAward className="w-5 h-5" />,
    },
  ];

  const coreValues = [
    {
      title: "Excellence",
      description: "We are committed to delivering the highest quality solutions that exceed expectations.",
      icon: <FiStar className="w-6 h-6" />
    },
    {
      title: "Innovation",
      description: "We embrace new technologies and approaches to solve complex challenges.",
      icon: <FiCode className="w-6 h-6" />
    },
    {
      title: "Reliability",
      description: "Our clients trust us for our consistency, dependability and transparency.",
      icon: <FiTarget className="w-6 h-6" />
    },
    {
      title: "Growth",
      description: "We believe in continuous improvement and helping our clients and team grow.",
      icon: <FiGrowth className="w-6 h-6" />
    }
  ];

  return (
    <div>
      {/* About Hero */}
      <div 
        className="h-[50vh] md:h-[60vh] flex items-center bg-gradient-to-br from-blue-700 to-indigo-800"
        style={{ 
          backgroundImage: "url('/images/hero-bg.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              {aboutTranslations.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed drop-shadow-md">
              {aboutTranslations.description}
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Mission Section */}
      <section className="py-24 overflow-hidden" style={{ background: "linear-gradient(to bottom, var(--background), var(--bg-muted))" }}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Mission Statement Side */}
            <div className="w-full lg:w-1/2">
              <div className="max-w-2xl mx-auto lg:mr-0">
                <h2 className="text-4xl md:text-5xl font-bold mb-8" style={{ color: "var(--text-primary)" }}>
                  {aboutTranslations.mission.title}
                </h2>
                
                <div className="space-y-6">
                  <p className="text-xl leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {aboutTranslations.mission.description}
                  </p>
                  
                  <p className="text-xl leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {aboutTranslations.philosophy}
                  </p>
                  
                  <div className="relative mt-12">
                    <blockquote className="text-2xl italic font-medium pl-6 border-l-4" style={{ 
                      color: "var(--accent)",
                      borderColor: "var(--accent)" 
                    }}>
                      {aboutTranslations.guiding_principle}
                      <div className="mt-4 text-lg font-normal" style={{ color: "var(--text-secondary)" }}>— {aboutTranslations.guiding_principle_label}</div>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Core Values Side */}
            <div className="w-full lg:w-1/2 relative">
              {/* Decorative background shape */}
              <div 
                className="absolute -top-10 -right-10 w-64 h-64 rounded-full opacity-10 z-0"
                style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-hover))" }}
              ></div>
              
              <div className="relative z-10 bg-gradient-to-br rounded-xl shadow-xl p-8 overflow-hidden" 
                style={{ 
                  backgroundColor: "var(--bg-card)",
                  boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)"
                }}
              >
                <h3 className="text-2xl font-bold mb-8" style={{ color: "var(--text-primary)" }}>{aboutTranslations.core_values.title}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 rounded-lg transition-all duration-300 hover:shadow-md" 
                    style={{ backgroundColor: "var(--bg-card-hover)" }}>
                    <div className="flex items-start mb-3">
                      <div className="rounded-full p-3 mr-3 flex-shrink-0" 
                        style={{ backgroundColor: "var(--bg-accent-subtle)", color: "var(--accent)" }}>
                        <FiStar className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1" style={{ color: "var(--text-primary)" }}>{aboutTranslations.core_values.excellence.title}</h4>
                        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{aboutTranslations.core_values.excellence.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg transition-all duration-300 hover:shadow-md" 
                    style={{ backgroundColor: "var(--bg-card-hover)" }}>
                    <div className="flex items-start mb-3">
                      <div className="rounded-full p-3 mr-3 flex-shrink-0" 
                        style={{ backgroundColor: "var(--bg-accent-subtle)", color: "var(--accent)" }}>
                        <FiCode className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1" style={{ color: "var(--text-primary)" }}>{aboutTranslations.core_values.innovation.title}</h4>
                        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{aboutTranslations.core_values.innovation.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg transition-all duration-300 hover:shadow-md" 
                    style={{ backgroundColor: "var(--bg-card-hover)" }}>
                    <div className="flex items-start mb-3">
                      <div className="rounded-full p-3 mr-3 flex-shrink-0" 
                        style={{ backgroundColor: "var(--bg-accent-subtle)", color: "var(--accent)" }}>
                        <FiTarget className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1" style={{ color: "var(--text-primary)" }}>{aboutTranslations.core_values.reliability.title}</h4>
                        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{aboutTranslations.core_values.reliability.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg transition-all duration-300 hover:shadow-md" 
                    style={{ backgroundColor: "var(--bg-card-hover)" }}>
                    <div className="flex items-start mb-3">
                      <div className="rounded-full p-3 mr-3 flex-shrink-0" 
                        style={{ backgroundColor: "var(--bg-accent-subtle)", color: "var(--accent)" }}>
                        <FiGrowth className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1" style={{ color: "var(--text-primary)" }}>{aboutTranslations.core_values.growth.title}</h4>
                        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{aboutTranslations.core_values.growth.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-32 relative overflow-hidden" style={{ backgroundColor: "var(--bg-muted)" }}>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-96 opacity-10" 
          style={{ 
            background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
            filter: "blur(60px)"
          }}
        ></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-96 opacity-10" 
          style={{ 
            background: "radial-gradient(circle, var(--accent-hover) 0%, transparent 70%)",
            filter: "blur(60px)"
          }}
        ></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
                {aboutTranslations.technology.title}
              </h2>
              <p className="text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto" style={{ color: "var(--text-secondary)" }}>
                {aboutTranslations.technology.description}
              </p>
            </div>
            
            <div className="p-10 rounded-2xl shadow-xl mx-auto relative z-20" 
              style={{ 
                backgroundColor: "var(--bg-card)",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)"
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="text-left">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6"
                    style={{ backgroundColor: "var(--bg-accent-subtle)" }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent)" }}/>
                      <path d="M8 12L11 15L16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent)" }}/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--accent)" }}>{aboutTranslations.technology.frontend.title}</h3>
                  <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {aboutTranslations.technology.frontend.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {aboutTranslations.technology.frontend.tags.map((tag: string, index: number) => (
                      <span key={index} className="px-4 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: "var(--bg-accent-subtle)", color: "var(--accent)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="text-left">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6"
                    style={{ backgroundColor: "var(--bg-accent-subtle)" }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent)" }}/>
                      <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent)" }}/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--accent)" }}>{aboutTranslations.technology.backend.title}</h3>
                  <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {aboutTranslations.technology.backend.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {aboutTranslations.technology.backend.tags.map((tag: string, index: number) => (
                      <span key={index} className="px-4 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: "var(--bg-accent-subtle)", color: "var(--accent)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="h-px w-full my-12 opacity-20" style={{ backgroundColor: "var(--accent)" }}></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="text-left">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6"
                    style={{ backgroundColor: "var(--bg-accent-subtle)" }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 12H16L14 15H10L8 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent)" }}/>
                      <path d="M5.45 5.11L2 12V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H20C20.5304 20 21.0391 19.7893 21.4142 19.4142C21.7893 19.0391 22 18.5304 22 18V12L18.55 5.11C18.3844 4.77679 18.1292 4.49637 17.813 4.30028C17.4967 4.10419 17.1321 4.0002 16.76 4H7.24C6.86792 4.0002 6.50326 4.10419 6.18704 4.30028C5.87083 4.49637 5.61558 4.77679 5.45 5.11V5.11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent)" }}/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--accent)" }}>{aboutTranslations.technology.cloud.title}</h3>
                  <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {aboutTranslations.technology.cloud.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {aboutTranslations.technology.cloud.tags.map((tag: string, index: number) => (
                      <span key={index} className="px-4 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: "var(--bg-accent-subtle)", color: "var(--accent)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="text-left">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6"
                    style={{ backgroundColor: "var(--bg-accent-subtle)" }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 20V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent)" }}/>
                      <path d="M12 20V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent)" }}/>
                      <path d="M6 20V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent)" }}/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--accent)" }}>{aboutTranslations.technology.practices.title}</h3>
                  <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {aboutTranslations.technology.practices.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {aboutTranslations.technology.practices.tags.map((tag: string, index: number) => (
                      <span key={index} className="px-4 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: "var(--bg-accent-subtle)", color: "var(--accent)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24" style={{ backgroundColor: "var(--background)" }}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
              {aboutTranslations.team.title}
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: "var(--text-secondary)" }}>
              {aboutTranslations.team.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {aboutTranslations.team.members.map((member: { name: string; role: string; bio: string }, index: number) => (
              <div 
                key={index} 
                className="rounded-lg shadow-md overflow-hidden transition-all hover:shadow-xl"
                style={{ backgroundColor: "var(--bg-card)" }}
              >
                <div className="relative h-60 w-full bg-gray-100 dark:bg-gray-700">
                  <Image
                    src={`/images/client-logo-${index + 1}.svg`}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold" style={{ color: "var(--text-primary)" }}>{member.name}</h3>
                  <p className="font-medium text-sm mb-3" style={{ color: "var(--accent)" }}>{member.role}</p>
                  <p style={{ color: "var(--text-secondary)" }}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="py-24" style={{ backgroundColor: "var(--bg-muted)" }}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
              {aboutTranslations.milestones.title}
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: "var(--text-secondary)" }}>
              {aboutTranslations.milestones.description}
            </p>
          </div>

          {/* Alternative Timeline Design */}
          <div className="max-w-5xl mx-auto relative">
            {/* Timeline Backbone */}
            <div 
              className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 md:w-2"
              style={{ 
                background: "linear-gradient(to bottom, var(--accent-hover), var(--accent))",
                transform: "translateX(-50%)"
              }}
            ></div>
            
            <div className="space-y-16">
              {aboutTranslations.milestones.items.map((milestone: { year: string; title: string; description: string }, index: number) => (
                <div 
                  key={index} 
                  className={`relative flex flex-col ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } items-center md:items-start gap-8`}
                >
                  {/* Year Pill - positioned differently based on odd/even */}
                  <div 
                    className={`
                      absolute top-0 left-0 md:static 
                      transform translate-x-6 md:translate-x-0
                      ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}
                    `}
                    style={{ 
                      width: "80px",
                    }}
                  >
                    <div 
                      className="flex items-center justify-center w-16 h-10 rounded-full text-white font-bold shadow-lg transform transition-transform duration-300 hover:scale-110 hover:rotate-3"
                      style={{ 
                        background: "linear-gradient(135deg, var(--accent), var(--accent-hover))",
                        boxShadow: "0 4px 14px rgba(0, 0, 0, 0.15)"
                      }}
                    >
                      {milestone.year}
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div 
                    className="absolute left-0 md:left-1/2 top-0 w-6 h-6 rounded-full z-10 transform -translate-x-2.5 md:-translate-x-3"
                    style={{ 
                      background: "var(--bg-card)",
                      border: "3px solid var(--accent)",
                      boxShadow: "0 0 0 4px var(--bg-muted)"
                    }}
                  ></div>
                  
                  {/* Empty space for alignment - only on md+ */}
                  <div className="hidden md:block md:w-1/2"></div>
                  
                  {/* Content Card */}
                  <div 
                    className="w-full md:w-1/2 ml-10 md:ml-0 pl-6 md:pl-0"
                  >
                    <div 
                      className="rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                      style={{ 
                        backgroundColor: "var(--bg-card)",
                        borderLeft: "4px solid var(--accent)",
                      }}
                    >
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <div 
                            className="rounded-full p-3 mr-4 flex items-center justify-center"
                            style={{ backgroundColor: "var(--bg-accent-subtle)" }}
                          >
                            <div style={{ color: "var(--accent)" }}>
                              {milestones[index].icon}
                            </div>
                          </div>
                          <h3 className="font-bold text-xl" style={{ color: "var(--text-primary)" }}>
                            {milestone.title}
                          </h3>
                        </div>
                        <p style={{ color: "var(--text-secondary)" }} className="leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 