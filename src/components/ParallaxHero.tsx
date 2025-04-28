"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiMousePointer, FiChevronDown } from 'react-icons/fi';
import { EventName } from '@/types/analytics';
import AnalyticsLink from '@/components/AnalyticsLink';
import useEventTracking from '@/hooks/useEventTracking';

interface ParallaxHeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  forcedTheme?: boolean; // true for dark, false for light, undefined for auto
}

export default function ParallaxHero({ title, subtitle, ctaText, ctaLink, forcedTheme }: ParallaxHeroProps) {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const ref = useRef(null);
  const contentRef = useRef(null);
  const trackEvent = useEventTracking();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Parallax effect on scroll - optimized with fewer transform points
  const y = useTransform(scrollYProgress, [0, 0.5], ['0%', '20%'], { 
    clamp: true 
  });
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.5], { 
    clamp: true 
  });
  
  // Reduce number of particles for better performance
  const [particles, setParticles] = useState<{x: number, y: number, size: number, speed: number}[]>([]);
  
  useEffect(() => {
    setMounted(true);
    
    // Create background particles - reduced quantity
    const newParticles = Array.from({ length: 25 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1, // Reduced size variation
      speed: Math.random() * 0.6 + 0.2 // Lower speed
    }));
    
    setParticles(newParticles);

    // Track hero view when component mounts
    trackEvent(EventName.PAGE_VIEW, {
      section: 'hero',
      title
    });

    // If forcedTheme is provided, use it
    if (forcedTheme !== undefined) {
      setIsDarkMode(forcedTheme);
      return;
    }

    // Check for dark mode preference
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);

    // Listen for changes in dark mode preference
    const handleDarkModeChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
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
  }, [title, trackEvent, forcedTheme]);

  // Update isDarkMode when forcedTheme prop changes
  useEffect(() => {
    if (forcedTheme !== undefined) {
      setIsDarkMode(forcedTheme);
    }
  }, [forcedTheme]);

  // Optimized scroll tracking with throttling
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let lastScrollTime = 0;
    
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime < 200) return; // Throttle to 200ms
      
      lastScrollTime = now;
      clearTimeout(timeout);
      
      timeout = setTimeout(() => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Track when user scrolls 50% through hero section
        if (scrollPosition > windowHeight * 0.5 && scrollPosition < windowHeight) {
          trackEvent(EventName.SCROLL, {
            section: 'hero',
            depth: '50%'
          });
        }
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, [trackEvent]);

  // Optimized mouse parallax effect with throttling
  useEffect(() => {
    let lastMoveTime = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastMoveTime < 50) return; // Throttle to 50ms
      
      lastMoveTime = now;
      
      // Reduce the multiplier to make movement more subtle
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 10,
        y: (e.clientY / window.innerHeight - 0.5) * 10,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!mounted) return null;
  
  return (
    <section 
      ref={ref} 
      className={`relative h-screen overflow-hidden will-change-transform ${
        isDarkMode 
          ? "bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900" 
          : "bg-gradient-to-br from-white via-blue-50 to-indigo-100"
      }`}
    >
      {/* Additional smooth gradient overlay for better blending */}
      <div className={`absolute inset-0 ${
        isDarkMode 
          ? "bg-gradient-radial from-blue-800/30 via-transparent to-transparent" 
          : "bg-gradient-radial from-blue-50/50 via-transparent to-transparent"
      }`}></div>

      {/* Animated background mesh - simplified for better performance */}
      <div 
        className={`absolute inset-0 ${isDarkMode ? 'opacity-20' : 'opacity-10'}`}
        style={{
          backgroundImage: isDarkMode
            ? `radial-gradient(circle at 4px 4px, rgba(255,255,255,0.15) 2px, transparent 0)`
            : `radial-gradient(circle at 4px 4px, rgba(59,130,246,0.1) 2px, transparent 0)`,
          backgroundSize: '60px 60px', // Increased size for fewer dots
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
          transition: 'transform 0.3s cubic-bezier(0.2, 0, 0.3, 1)', // Smoother easing
        }}
      />

      {/* Render only a subset of particles - using will-change for better GPU acceleration */}
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full will-change-transform ${
            isDarkMode 
              ? "bg-gradient-to-r from-indigo-300/10 to-blue-200/10 opacity-20" 
              : "bg-gradient-to-r from-blue-400/10 to-indigo-500/10 opacity-15"
          }`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            filter: 'blur(1px)',
            transform: `translate(${mousePosition.x * (particle.speed * 0.3)}px, ${mousePosition.y * (particle.speed * 0.3)}px)`,
          }}
          animate={{
            y: [0, particle.speed * 40, 0], // Smoother, gentler movement
          }}
          transition={{
            duration: 20 / particle.speed, // Slower animation for smoother feel
            repeat: Infinity,
            ease: "easeInOut", // Changed to easeInOut for smoother transitions
            repeatType: "mirror"
          }}
        />
      ))}

      {/* Reduced number of floating tech icons */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className={`absolute top-[30%] right-[25%] text-4xl ${
            isDarkMode ? "text-white/20" : "text-blue-600/20"
          }`}
          animate={{
            y: [0, -10, 0], // Reduced movement
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)` }}
        >
          ⚛️
        </motion.div>
        <motion.div
          className={`absolute top-[60%] right-[30%] text-4xl ${
            isDarkMode ? "text-white/20" : "text-blue-600/20"
          }`}
          animate={{
            y: [0, 10, 0], // Reduced movement
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)` }}
        >
          💻
        </motion.div>
      </div>

      {/* Reduced number of geometric shapes with simpler animations */}
      <motion.div 
        className="absolute right-[10%] top-[20%] w-32 h-32 rounded-full will-change-transform"
        style={{
          background: isDarkMode
            ? 'linear-gradient(225deg, rgba(255,255,255,0.15), rgba(79, 70, 229, 0.1))'
            : 'linear-gradient(225deg, rgba(255,255,255,0.9), rgba(219, 234, 254, 0.6))',
          backdropFilter: 'blur(10px)',
          border: isDarkMode
            ? '1px solid rgba(255,255,255,0.1)'
            : '1px solid rgba(255,255,255,0.5)',
          boxShadow: isDarkMode
            ? '0 8px 32px rgba(0, 0, 0, 0.2)'
            : '0 8px 32px rgba(30, 64, 175, 0.15)',
          transform: `translate(${mousePosition.x * 0.15}px, ${mousePosition.y * 0.15}px)`,
        }}
        animate={{ 
          y: [0, 15, 0], // Reduced movement
        }}
        transition={{ 
          y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        }}
      />
      <motion.div 
        className="absolute left-[60%] top-[15%] w-40 h-40 rounded-full will-change-transform"
        style={{
          background: isDarkMode
            ? 'linear-gradient(225deg, rgba(79, 70, 229, 0.15), rgba(255,255,255,0.05))'
            : 'linear-gradient(225deg, rgba(219, 234, 254, 0.7), rgba(255,255,255,0.4))',
          backdropFilter: 'blur(10px)',
          border: isDarkMode
            ? '1px solid rgba(79, 70, 229, 0.2)'
            : '1px solid rgba(219, 234, 254, 0.5)',
          boxShadow: isDarkMode
            ? '0 8px 32px rgba(79, 70, 229, 0.1)'
            : '0 8px 32px rgba(30, 64, 175, 0.1)',
          transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
        }}
        animate={{ 
          y: [0, 20, 0], // Reduced movement
        }}
        transition={{ 
          y: { duration: 10, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Content with optimized transformations */}
      <motion.div 
        className="relative h-full flex flex-col items-center justify-center text-center px-4 will-change-transform"
        style={{
          y,
          opacity,
        }}
        ref={contentRef}
      >
        <div className="max-w-5xl mx-auto">
          <motion.h1 
            className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 ${
              isDarkMode ? "text-white" : "text-blue-950"
            }`}
            style={{
              textShadow: isDarkMode 
                ? '0 0 30px rgba(255,255,255,0.15)' 
                : '0 0 30px rgba(30, 64, 175, 0.1)',
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {title}
          </motion.h1>
          
          <motion.p 
            className={`text-xl md:text-2xl mb-8 ${
              isDarkMode ? "text-white/90" : "text-blue-950/80"
            }`}
            style={{
              textShadow: isDarkMode 
                ? '0 0 20px rgba(255,255,255,0.2)' 
                : '0 0 20px rgba(30, 64, 175, 0.1)',
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {subtitle}
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-6"
          >
            <AnalyticsLink
              href={ctaLink}
              className={`group relative inline-flex items-center text-lg font-medium px-8 py-3 rounded-md transition-all duration-300 hover:scale-105 overflow-hidden ${
                isDarkMode 
                  ? "bg-gradient-to-r from-white via-white to-blue-50 text-blue-700 hover:from-blue-50 hover:via-white hover:to-white shadow-[0_0_20px_rgba(255,255,255,0.3)]" 
                  : "bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 shadow-[0_0_20px_rgba(30,64,175,0.3)]"
              }`}
              eventParams={{
                section: 'hero',
                button_text: ctaText,
                destination: ctaLink
              }}
            >
              <span className="relative z-10">{ctaText}</span>
              <FiArrowRight className="relative z-10 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  isDarkMode 
                    ? "bg-gradient-to-r from-blue-50 to-white" 
                    : "bg-gradient-to-r from-blue-700 to-indigo-800"
                }`}
              />
            </AnalyticsLink>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Simplified gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none">
        <div className={`absolute inset-0 ${
          isDarkMode 
            ? "bg-gradient-to-t from-blue-900 via-blue-900/30 to-transparent" 
            : "bg-gradient-to-t from-blue-100 via-blue-50/30 to-transparent"
        } opacity-80`} />
      </div>
    </section>
  );
} 