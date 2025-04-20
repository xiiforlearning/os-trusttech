"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { EventName } from '@/types/analytics';
import AnalyticsLink from '@/components/AnalyticsLink';
import useEventTracking from '@/hooks/useEventTracking';

interface ParallaxHeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export default function ParallaxHero({ title, subtitle, ctaText, ctaLink }: ParallaxHeroProps) {
  const [mounted, setMounted] = useState(false);
  const ref = useRef(null);
  const trackEvent = useEventTracking();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Parallax effect on scroll
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  
  // Background particles
  const [particles, setParticles] = useState<{x: number, y: number, size: number, speed: number}[]>([]);
  
  useEffect(() => {
    setMounted(true);
    
    // Create background particles
    const newParticles = Array.from({ length: 50 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 1,
      speed: Math.random() * 0.8 + 0.2
    }));
    
    setParticles(newParticles);

    // Track hero view when component mounts
    trackEvent(EventName.PAGE_VIEW, {
      section: 'hero',
      title
    });
  }, [title, trackEvent]);

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Track when user scrolls 50% through hero section
      if (scrollPosition > windowHeight * 0.5 && scrollPosition < windowHeight) {
        trackEvent(EventName.SCROLL, {
          section: 'hero',
          depth: '50%'
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [trackEvent]);

  if (!mounted) return null;
  
  return (
    <section ref={ref} className="relative h-screen overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800">
      {/* Particles */}
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-white opacity-30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, particle.speed * 100, 0],
          }}
          transition={{
            duration: 10 / particle.speed,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
      
      {/* Geometric shapes for background */}
      <motion.div 
        className="absolute right-[10%] top-[20%] w-32 h-32 bg-white/10 rounded-full blur-sm"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute left-[15%] bottom-[25%] w-24 h-24 bg-white/5 rounded-full blur-md"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute left-[60%] top-[15%] w-40 h-40 bg-white/5 rounded-full blur-md"
        animate={{ y: [0, 25, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Main content */}
      <motion.div 
        style={{ y, opacity }}
        className="container mx-auto px-4 md:px-6 relative z-10 h-full flex flex-col justify-center"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {title}
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-white/90 mb-8"
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
            onHoverStart={() => trackEvent(EventName.HOVER, { 
              element: 'cta_button', 
              section: 'hero',
              text: ctaText 
            })}
          >
            <AnalyticsLink
              href={ctaLink}
              className="inline-flex items-center bg-white text-blue-700 hover:bg-blue-50 text-lg font-medium px-8 py-3 rounded-md shadow-lg transition-all hover:scale-105"
              eventParams={{
                section: 'hero',
                button_text: ctaText,
                destination: ctaLink
              }}
            >
              {ctaText}
              <FiArrowRight className="ml-2" />
            </AnalyticsLink>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Gradient overlay for bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-700 to-transparent"></div>
    </section>
  );
} 