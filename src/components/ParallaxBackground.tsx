"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export default function ParallaxBackground({ children, className = "" }: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Parallax effects for different shapes
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '70%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const scale1 = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const scale2 = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  
  // Background opacity that decreases as you scroll
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Background that fades as you scroll */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-blue-600 to-indigo-900 dark:from-blue-900 dark:to-indigo-950"
        style={{ opacity: bgOpacity }}
      />
      
      {/* Floating shapes with parallax effect */}
      {/* Large circle */}
      <motion.div 
        className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-blue-400/20 dark:bg-blue-600/20 blur-xl"
        style={{ 
          y: y1,
          scale: scale1,
          rotate: rotate1
        }}
      />
      
      {/* Small circle */}
      <motion.div 
        className="absolute left-[20%] top-[30%] w-32 h-32 rounded-full bg-indigo-300/20 dark:bg-indigo-500/20 blur-md"
        style={{ 
          y: y2,
          scale: scale2,
          rotate: rotate2
        }}
      />
      
      {/* Rectangle */}
      <motion.div 
        className="absolute left-[10%] bottom-[20%] w-64 h-32 bg-purple-400/10 dark:bg-purple-600/10 blur-lg"
        style={{ 
          y: y3,
          rotate: useTransform(scrollYProgress, [0, 1], [0, 20])
        }}
      />
      
      {/* Hexagon shape using clip-path */}
      <motion.div 
        className="absolute right-[15%] bottom-[15%] w-48 h-48 bg-gradient-to-br from-cyan-300/20 to-blue-500/20 dark:from-cyan-500/20 dark:to-blue-700/20 blur-md"
        style={{ 
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          y: useTransform(scrollYProgress, [0, 1], ['0%', '40%']),
          rotate: useTransform(scrollYProgress, [0, 1], [0, -15])
        }}
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.png')] opacity-10 bg-repeat" />
      
      {/* Content container */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
} 