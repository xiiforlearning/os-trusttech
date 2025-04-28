"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  FiArrowRight,
  FiCode,
  FiSmartphone,
  FiLayout,
  FiCheckCircle,
  FiGlobe,
  FiUsers,
  FiAward,
  FiStar,
  FiBriefcase,
  FiInfo,
  FiTarget,
  FiCpu,
  FiHeart,
} from "react-icons/fi";
import ParallaxHero from "@/components/ParallaxHero";

// Client-side component to handle theme switching and rendering
export default function HomePageClient({ 
  locale,
  translations
}: { 
  locale: string,
  translations: any
}) {
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    // First check localStorage for theme preference
    const storedTheme = localStorage.getItem("theme");
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (storedTheme === "dark") {
      setIsDarkMode(true);
    } else if (storedTheme === "light") {
      setIsDarkMode(false);
    } else {
      // If no stored preference, check system preference
      setIsDarkMode(darkModeMediaQuery.matches);
    }

    // Listen for changes in dark mode preference
    const handleDarkModeChange = (e: MediaQueryListEvent) => {
      // Only apply media query changes if there's no user preference in localStorage
      if (!localStorage.getItem("theme")) {
        setIsDarkMode(e.matches);
      }
    };

    darkModeMediaQuery.addEventListener('change', handleDarkModeChange);

    // Also check for data-theme attribute on html for system overrides
    const htmlElement = document.documentElement;
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme' || mutation.attributeName === 'class') {
          const isDark = htmlElement.getAttribute('data-theme') === 'dark' || 
                        htmlElement.classList.contains('dark');
          setIsDarkMode(isDark);
        }
      });
    });

    observer.observe(htmlElement, { attributes: true });

    return () => {
      darkModeMediaQuery.removeEventListener('change', handleDarkModeChange);
      observer.disconnect();
    };
  }, []);
  
  // Skip rendering until client-side
  if (!mounted) return null;

  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className={`min-h-screen ${
      isDarkMode 
        ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white" 
        : "bg-gradient-to-b from-white via-gray-50 to-white text-gray-800"
    } transition-colors duration-300`}>
      {/* Hero Section with ParallaxHero component */}
      <ParallaxHero
        title={translations.home.hero.title}
        subtitle={translations.home.hero.subtitle}
        ctaText={translations.home.hero.cta}
        ctaLink={`/${locale}/contact`}
        forcedTheme={isDarkMode}
      />

      {/* Services Overview */}
      <section className="py-24 relative overflow-hidden">
        {/* Background with theme support */}
        <div className={`absolute inset-0 ${
          isDarkMode 
            ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" 
            : "bg-gradient-to-b from-white via-gray-50 to-white"
        }`}></div>
        <div className={`absolute inset-0 bg-[url('/images/grid.svg')] ${
          isDarkMode ? "opacity-[0.05]" : "opacity-[0.02]"
        }`}></div>
        
        {/* Subtle background accents */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute top-1/4 -left-10 w-40 h-40 rounded-full blur-3xl animate-pulse ${
            isDarkMode 
              ? "bg-gradient-to-r from-blue-500/10 to-blue-500/10" 
              : "bg-gradient-to-r from-blue-100/20 to-blue-50/20"
          }`}></div>
          <div className={`absolute bottom-1/4 -right-10 w-40 h-40 rounded-full blur-3xl animate-pulse delay-1000 ${
            isDarkMode 
              ? "bg-gradient-to-r from-indigo-500/10 to-blue-500/10" 
              : "bg-gradient-to-r from-indigo-100/20 to-blue-50/20"
          }`}></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4 ${
              isDarkMode
                ? "bg-blue-500/10 text-blue-400 border-blue-500/10" 
                : "bg-blue-50 text-blue-600 border border-blue-100"
            }`}>
              {translations.home.services.badge || "Services"}
            </span>
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              {translations.home.services.title}
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}>
              {translations.home.services.description}
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { icon: FiCode, title: translations.services.webdev.title, desc: translations.services.webdev.description },
              { icon: FiSmartphone, title: translations.services.mobiledev.title, desc: translations.services.mobiledev.description },
              { icon: FiLayout, title: translations.services.uiux.title, desc: translations.services.uiux.description },
              { icon: FiCheckCircle, title: translations.services.qa.title, desc: translations.services.qa.description }
            ].map((service, index) => (
              <motion.div
                key={index}
                className="group relative"
                variants={fadeInUp}
              >
                {/* Card hover effect */}
                <div className={`absolute inset-0 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300 opacity-0 group-hover:opacity-10 blur-xl ${
                  isDarkMode ? "bg-blue-500/50" : "bg-blue-200"
                }`}></div>
                
                {/* Card */}
                <div className={`relative rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  isDarkMode 
                    ? "bg-gray-800 border-gray-700" 
                    : "bg-white border border-gray-100"
                }`}>
                  {/* Icon container */}
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-white mb-6 transform group-hover:scale-110 transition-transform duration-300 ${
                    isDarkMode 
                      ? "bg-blue-500 shadow-blue-500/20" 
                      : "bg-blue-600 shadow-lg shadow-blue-100"
                  }`}>
                    <service.icon className="w-8 h-8" />
                  </div>
                  
                  {/* Card content */}
                  <h3 className={`text-xl font-bold mb-4 group-hover:text-blue-600 transition-colors ${
                    isDarkMode 
                      ? "text-white group-hover:text-blue-400" 
                      : "text-gray-900 group-hover:text-blue-600"
                  }`}>
                    {service.title}
                  </h3>
                  <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                    {service.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Rest of the sections would go here... */}
        {/* I've truncated the content for brevity, but in the actual component you would include all sections from the original file */}
      </section>

      {/* Featured Projects Section */}
      <section className="py-24 relative">
        <div className={`absolute inset-0 ${
          isDarkMode 
            ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" 
            : "bg-gradient-to-b from-white via-gray-50 to-white"
        }`}></div>
        <div className={`absolute inset-0 bg-[url('/images/grid.svg')] ${
          isDarkMode ? "opacity-[0.05]" : "opacity-[0.02]"
        }`}></div>
        <div className="container mx-auto px-4 md:px-6 relative">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4 ${
              isDarkMode
                ? "bg-blue-500/10 text-blue-400 border-blue-500/10" 
                : "bg-blue-50 text-blue-600 border border-blue-100"
            }`}>
              {translations.home.projects?.badge || "Portfolio"}
            </span>
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              {translations.home.projects?.title || "Featured Projects"}
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}>
              {translations.home.projects?.description || "Explore some of our recent work and successful projects."}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project Card 1 */}
            <motion.div
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className={`absolute inset-0 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300 opacity-0 group-hover:opacity-10 blur ${
                isDarkMode ? "bg-blue-500/20" : "bg-blue-100"
              }`}></div>
              <div className={`relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
                isDarkMode 
                  ? "bg-gray-800 border-gray-700" 
                  : "bg-white border border-gray-100"
              }`}>
                <div className="relative h-48">
                  <div className={`absolute inset-0 ${isDarkMode ? "bg-blue-500" : "bg-blue-600"}`}>
                    <div className={`absolute inset-0 bg-[url('/images/grid.svg')] ${isDarkMode ? "opacity-20" : "opacity-10"}`}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FiCode className="w-16 h-16 text-white/90" />
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className={`text-2xl font-bold mb-4 transition-colors ${
                    isDarkMode 
                      ? "text-white group-hover:text-blue-400" 
                      : "text-gray-900 group-hover:text-blue-600"
                  }`}>{translations.projects?.projects?.tvcom?.title || "Enterprise Dashboard"}</h3>
                  <p className={isDarkMode ? "text-gray-300 mb-6" : "text-gray-600 mb-6"}>
                    {translations.projects?.projects?.tvcom?.description || "A comprehensive analytics dashboard for enterprise clients with real-time data visualization."}
                  </p>
                  <Link
                    href={`/${locale}/projects/enterprise-dashboard`}
                    className={`inline-flex items-center font-semibold group ${
                      isDarkMode 
                        ? "text-blue-400 hover:text-blue-300" 
                        : "text-blue-600 hover:text-blue-700"
                    }`}
                  >
                    {translations.projects?.buttons?.viewLive || "View Project"}
                    <FiArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Project Card 2 */}
            <motion.div
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className={`absolute inset-0 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300 opacity-0 group-hover:opacity-10 blur ${
                isDarkMode ? "bg-purple-500/20" : "bg-purple-100"
              }`}></div>
              <div className={`relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
                isDarkMode 
                  ? "bg-gray-800 border-gray-700" 
                  : "bg-white border border-gray-100"
              }`}>
                <div className="relative h-48">
                  <div className={`absolute inset-0 ${isDarkMode ? "bg-purple-500" : "bg-purple-600"}`}>
                    <div className={`absolute inset-0 bg-[url('/images/grid.svg')] ${isDarkMode ? "opacity-20" : "opacity-10"}`}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FiSmartphone className="w-16 h-16 text-white/90" />
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className={`text-2xl font-bold mb-4 transition-colors ${
                    isDarkMode 
                      ? "text-white group-hover:text-purple-400" 
                      : "text-gray-900 group-hover:text-purple-600"
                  }`}>{translations.projects?.projects?.mias?.title || "Health Tracker"}</h3>
                  <p className={isDarkMode ? "text-gray-300 mb-6" : "text-gray-600 mb-6"}>
                    {translations.projects?.projects?.mias?.description || "A mobile application for tracking health metrics with personalized insights and recommendations."}
                  </p>
                  <Link
                    href={`/${locale}/projects/health-tracker`}
                    className={`inline-flex items-center font-semibold group ${
                      isDarkMode 
                        ? "text-purple-400 hover:text-purple-300" 
                        : "text-purple-600 hover:text-purple-700"
                    }`}
                  >
                    {translations.projects?.buttons?.viewLive || "View Project"}
                    <FiArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Project Card 3 */}
            <motion.div
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className={`absolute inset-0 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300 opacity-0 group-hover:opacity-10 blur ${
                isDarkMode ? "bg-emerald-500/20" : "bg-emerald-100"
              }`}></div>
              <div className={`relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
                isDarkMode 
                  ? "bg-gray-800 border-gray-700" 
                  : "bg-white border border-gray-100"
              }`}>
                <div className="relative h-48">
                  <div className={`absolute inset-0 ${isDarkMode ? "bg-emerald-500" : "bg-emerald-600"}`}>
                    <div className={`absolute inset-0 bg-[url('/images/grid.svg')] ${isDarkMode ? "opacity-20" : "opacity-10"}`}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FiLayout className="w-16 h-16 text-white/90" />
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className={`text-2xl font-bold mb-4 transition-colors ${
                    isDarkMode 
                      ? "text-white group-hover:text-emerald-400" 
                      : "text-gray-900 group-hover:text-emerald-600"
                  }`}>{translations.projects?.projects?.comnet?.title || "Eco Shop Platform"}</h3>
                  <p className={isDarkMode ? "text-gray-300 mb-6" : "text-gray-600 mb-6"}>
                    {translations.projects?.projects?.comnet?.description || "An e-commerce platform focused on sustainable and eco-friendly products with advanced filtering."}
                  </p>
                  <Link
                    href={`/${locale}/projects/eco-shop`}
                    className={`inline-flex items-center font-semibold group ${
                      isDarkMode 
                        ? "text-emerald-400 hover:text-emerald-300" 
                        : "text-emerald-600 hover:text-emerald-700"
                    }`}
                  >
                    {translations.projects?.buttons?.viewLive || "View Project"}
                    <FiArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              href={`/${locale}/projects`}
              className={`inline-flex items-center px-8 py-4 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ${
                isDarkMode 
                  ? "bg-blue-500 hover:bg-blue-600 shadow-blue-500/20" 
                  : "bg-blue-600 hover:bg-blue-700 shadow-blue-200"
              }`}
            >
              {translations.home.projects?.viewAll || "View All Projects"}
              <FiArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-24 relative overflow-hidden">
        <div className={`absolute inset-0 ${
          isDarkMode 
            ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" 
            : "bg-gradient-to-b from-white via-gray-50 to-white"
        }`}></div>
        <div className={`absolute inset-0 bg-[url('/images/grid.svg')] ${
          isDarkMode ? "opacity-[0.05]" : "opacity-[0.02]"
        }`}></div>
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4 ${
                isDarkMode
                  ? "bg-blue-500/10 text-blue-400 border-blue-500/10" 
                  : "bg-blue-50 text-blue-600 border border-blue-100"
              }`}>
                {translations.home.about?.badge || "About Us"}
              </span>
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>
                {translations.home.about?.title || "Who We Are"}
              </h2>
              
              <p className={`text-xl ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              } mb-8`}>
                {translations.home.about?.description || "OS TrustTech is a leading software development company committed to delivering innovative solutions that drive business transformation and growth."}
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="group relative">
                  <div className={`absolute inset-0 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300 opacity-0 group-hover:opacity-10 blur ${
                    isDarkMode ? "bg-blue-500/20" : "bg-blue-100"
                  }`}></div>
                  <div className={`relative rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${
                    isDarkMode 
                      ? "bg-gray-800 border-gray-700" 
                      : "bg-white border border-gray-100"
                  }`}>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white transform group-hover:scale-110 transition-transform duration-300 ${
                          isDarkMode ? "bg-blue-500" : "bg-blue-600"
                        }`}>
                          <FiTarget className="w-6 h-6" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className={`text-xl font-bold mb-2 ${
                          isDarkMode 
                            ? "text-white group-hover:text-blue-400" 
                            : "text-gray-900 group-hover:text-blue-600"
                        } transition-colors`}>{translations.home.about?.cards?.mission?.title || "Our Mission"}</h3>
                        <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                          {translations.home.about?.cards?.mission?.description || "To empower businesses with cutting-edge technology solutions that solve complex challenges and create lasting value."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group relative">
                  <div className={`absolute inset-0 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300 opacity-0 group-hover:opacity-10 blur ${
                    isDarkMode ? "bg-purple-500/20" : "bg-purple-100"
                  }`}></div>
                  <div className={`relative rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${
                    isDarkMode 
                      ? "bg-gray-800 border-gray-700" 
                      : "bg-white border border-gray-100"
                  }`}>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white transform group-hover:scale-110 transition-transform duration-300 ${
                          isDarkMode ? "bg-purple-500" : "bg-purple-600"
                        }`}>
                          <FiInfo className="w-6 h-6" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className={`text-xl font-bold mb-2 ${
                          isDarkMode 
                            ? "text-white group-hover:text-purple-400" 
                            : "text-gray-900 group-hover:text-purple-600"
                        } transition-colors`}>{translations.home.about?.cards?.values?.title || "Our Values"}</h3>
                        <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                          {translations.home.about?.cards?.values?.description || "We prioritize innovation, quality, transparency, and client satisfaction in everything we do."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group relative">
                  <div className={`absolute inset-0 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300 opacity-0 group-hover:opacity-10 blur ${
                    isDarkMode ? "bg-emerald-500/20" : "bg-emerald-100"
                  }`}></div>
                  <div className={`relative rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${
                    isDarkMode 
                      ? "bg-gray-800 border-gray-700" 
                      : "bg-white border border-gray-100"
                  }`}>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white transform group-hover:scale-110 transition-transform duration-300 ${
                          isDarkMode ? "bg-emerald-500" : "bg-emerald-600"
                        }`}>
                          <FiHeart className="w-6 h-6" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className={`text-xl font-bold mb-2 ${
                          isDarkMode 
                            ? "text-white group-hover:text-emerald-400" 
                            : "text-gray-900 group-hover:text-emerald-600"
                        } transition-colors`}>{translations.home.about?.cards?.commitment?.title || "Our Commitment"}</h3>
                        <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                          {translations.home.about?.cards?.commitment?.description || "We're committed to building long-term partnerships and delivering solutions that exceed expectations."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Link
                href={`/${locale}/about`}
                className={`inline-flex items-center px-8 py-4 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ${
                  isDarkMode 
                    ? "bg-blue-500 hover:bg-blue-600 shadow-blue-500/20" 
                    : "bg-blue-600 hover:bg-blue-700 shadow-blue-200"
                }`}
              >
                {translations.home.about?.learnMore || "Learn More About Us"}
                <FiArrowRight className="ml-2" />
              </Link>
            </motion.div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative h-[600px] rounded-2xl overflow-hidden">
                <div className={`absolute inset-0 ${isDarkMode ? "bg-blue-500" : "bg-blue-600"}`}>
                  <div className={`absolute inset-0 bg-[url('/images/grid.svg')] ${isDarkMode ? "opacity-20" : "opacity-10"}`}></div>
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10">
                  <div className="w-24 h-24 rounded-2xl bg-white/10 flex items-center justify-center mb-8 backdrop-blur-sm transform hover:scale-110 transition-transform duration-300">
                    <FiBriefcase className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-4xl font-bold text-white mb-6">{translations.home.about?.excellence?.title || "Years of Excellence"}</h3>
                  <p className="text-xl text-white/90 mb-12">
                    {translations.home.about?.excellence?.description || "With over 5 years in the industry, we've delivered hundreds of successful projects across various sectors."}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-8 w-full max-w-lg">
                    <div className="group relative">
                      <div className="absolute inset-0 bg-white/5 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
                      <div className="relative bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                        <div className="text-4xl font-bold text-white mb-2">20+</div>
                        <div className="text-white/90">{translations.home.about?.excellence?.stats?.team || "Team Members"}</div>
                      </div>
                    </div>
                    <div className="group relative">
                      <div className="absolute inset-0 bg-white/5 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
                      <div className="relative bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                        <div className="text-4xl font-bold text-white mb-2">15+</div>
                        <div className="text-white/90">{translations.home.about?.excellence?.stats?.technologies || "Technologies"}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Innovative Software Solutions Section */}
      <section className="py-24 relative overflow-hidden">
        <div className={`absolute inset-0 ${
          isDarkMode 
            ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" 
            : "bg-gradient-to-b from-white via-gray-50 to-white"
        }`}></div>
        <div className={`absolute inset-0 bg-[url('/images/grid.svg')] ${
          isDarkMode ? "opacity-[0.05]" : "opacity-[0.02]"
        }`}></div>
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4 ${
              isDarkMode
                ? "bg-blue-500/10 text-blue-400 border-blue-500/10" 
                : "bg-blue-50 text-blue-600 border border-blue-100"
            }`}>
              {translations.home.solutions?.badge || "Innovation"}
            </span>
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              {translations.home.solutions?.title || "Innovative Software Solutions"}
            </h2>
            <p className={`text-xl ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}>
              {translations.home.solutions?.description || "We combine cutting-edge technologies with proven methodologies to deliver innovative solutions that drive business growth."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Solution Item 1 */}
            <motion.div
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className={`absolute inset-0 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300 opacity-0 group-hover:opacity-10 blur ${
                isDarkMode ? "bg-blue-500/20" : "bg-blue-100"
              }`}></div>
              <div className={`relative rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${
                isDarkMode 
                  ? "bg-gray-800 border-gray-700" 
                  : "bg-white border border-gray-100"
              }`}>
                <div className="mb-8 w-16 h-16 rounded-xl bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white transform group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className={`text-2xl font-bold mb-4 transition-colors ${
                  isDarkMode 
                    ? "text-white group-hover:text-blue-400" 
                    : "text-gray-900 group-hover:text-blue-600"
                }`}>{translations.home.solutions?.items?.custom?.title || "Custom Software Development"}</h3>
                <p className={isDarkMode ? "text-gray-300 mb-6" : "text-gray-600 mb-6"}>
                  {translations.home.solutions?.items?.custom?.description || "Tailored solutions that address your specific business challenges and requirements."}
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <svg className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {translations.home.solutions?.items?.custom?.features?.[0] || "Enterprise Solutions"}
                  </li>
                </ul>
                <Link
                  href={`/${locale}/services/custom-development`}
                  className={`inline-flex items-center font-semibold group ${
                    isDarkMode 
                      ? "text-blue-400 hover:text-blue-300" 
                      : "text-blue-600 hover:text-blue-700"
                  }`}
                >
                  {translations.home.solutions?.items?.custom?.learnMore || "Learn More"}
                  <FiArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Solution Item 2 */}
            <motion.div
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className={`absolute inset-0 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300 opacity-0 group-hover:opacity-10 blur ${
                isDarkMode ? "bg-purple-500/20" : "bg-purple-100"
              }`}></div>
              <div className={`relative rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${
                isDarkMode 
                  ? "bg-gray-800 border-gray-700" 
                  : "bg-white border border-gray-100"
              }`}>
                <div className="mb-8 w-16 h-16 rounded-xl bg-purple-600 dark:bg-purple-500 flex items-center justify-center text-white transform group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className={`text-2xl font-bold mb-4 transition-colors ${
                  isDarkMode 
                    ? "text-white group-hover:text-purple-400" 
                    : "text-gray-900 group-hover:text-purple-600"
                }`}>{translations.home.solutions?.items?.webMobile?.title || "Web & Mobile Development"}</h3>
                <p className={isDarkMode ? "text-gray-300 mb-6" : "text-gray-600 mb-6"}>
                  {translations.home.solutions?.items?.webMobile?.description || "Cross-platform applications that provide seamless user experiences across all devices."}
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <svg className="w-6 h-6 mr-3 text-purple-600 dark:text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {translations.home.solutions?.items?.webMobile?.features?.[0] || "Progressive Web Apps"}
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <svg className="w-6 h-6 mr-3 text-purple-600 dark:text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {translations.home.solutions?.items?.webMobile?.features?.[1] || "Native Mobile Apps"}
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <svg className="w-6 h-6 mr-3 text-purple-600 dark:text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {translations.home.solutions?.items?.webMobile?.features?.[2] || "Responsive Web Design"}
                  </li>
                </ul>
                <Link
                  href={`/${locale}/services/web-mobile`}
                  className={`inline-flex items-center font-semibold group ${
                    isDarkMode 
                      ? "text-purple-400 hover:text-purple-300" 
                      : "text-purple-600 hover:text-purple-700"
                  }`}
                >
                  {translations.home.solutions?.items?.webMobile?.learnMore || "Learn More"}
                  <FiArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Solution Item 3 */}
            <motion.div
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className={`absolute inset-0 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300 opacity-0 group-hover:opacity-10 blur ${
                isDarkMode ? "bg-emerald-500/20" : "bg-emerald-100"
              }`}></div>
              <div className={`relative rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${
                isDarkMode 
                  ? "bg-gray-800 border-gray-700" 
                  : "bg-white border border-gray-100"
              }`}>
                <div className="mb-8 w-16 h-16 rounded-xl bg-emerald-600 dark:bg-emerald-500 flex items-center justify-center text-white transform group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className={`text-2xl font-bold mb-4 transition-colors ${
                  isDarkMode 
                    ? "text-white group-hover:text-emerald-400" 
                    : "text-gray-900 group-hover:text-emerald-600"
                }`}>{translations.home.solutions?.items?.ai?.title || "AI & Data Analytics"}</h3>
                <p className={isDarkMode ? "text-gray-300 mb-6" : "text-gray-600 mb-6"}>
                  {translations.home.solutions?.items?.ai?.description || "Leverage the power of AI and big data to gain insights and make data-driven decisions."}
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <svg className="w-6 h-6 mr-3 text-emerald-600 dark:text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {translations.home.solutions?.items?.ai?.features?.[0] || "Predictive Analytics"}
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <svg className="w-6 h-6 mr-3 text-emerald-600 dark:text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {translations.home.solutions?.items?.ai?.features?.[1] || "Machine Learning Models"}
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <svg className="w-6 h-6 mr-3 text-emerald-600 dark:text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {translations.home.solutions?.items?.ai?.features?.[2] || "Business Intelligence"}
                  </li>
                </ul>
                <Link
                  href={`/${locale}/services/ai-analytics`}
                  className={`inline-flex items-center font-semibold group ${
                    isDarkMode 
                      ? "text-emerald-400 hover:text-emerald-300" 
                      : "text-emerald-600 hover:text-emerald-700"
                  }`}
                >
                  {translations.home.solutions?.items?.ai?.learnMore || "Learn More"}
                  <FiArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="mt-16 text-center">
            <Link
              href={`/${locale}/services`}
              className={`inline-flex items-center px-8 py-4 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ${
                isDarkMode 
                  ? "bg-blue-500 hover:bg-blue-600 shadow-blue-500/20" 
                  : "bg-blue-600 hover:bg-blue-700 shadow-blue-200"
              }`}
            >
              {translations.home.solutions?.viewAll || "View All Solutions"}
              <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className={`absolute inset-0 ${
          isDarkMode ? "bg-blue-500" : "bg-blue-600"
        }`}></div>
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10 dark:opacity-20"></div>
        <motion.div 
          className="container mx-auto px-4 md:px-6 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {translations.home.cta.title}
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {translations.home.cta.description}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="group inline-flex items-center bg-white hover:bg-gray-50 text-blue-600 text-lg font-medium px-8 py-3 rounded-md shadow-xl shadow-blue-700/20 transition-all duration-300 hover:scale-105"
            >
              {translations.home.hero.cta}
              <FiArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
} 