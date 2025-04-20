"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface WordProps {
  text: string;
  delay?: number;
  className?: string;
  highlightWords?: string[];
}

const HighlightedWord = ({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) => {
  return (
    <motion.span
      className={`text-blue-600 dark:text-blue-400 font-semibold ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay, 
        type: "spring",
        stiffness: 60 
      }}
    >
      {text}{' '}
    </motion.span>
  );
};

const RegularWord = ({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) => {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay, 
        type: "spring",
        stiffness: 70 
      }}
    >
      {text}{' '}
    </motion.span>
  );
};

export default function AnimatedTextReveal({ text, className = "", delay = 0, highlightWords = [] }: WordProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);
  
  useEffect(() => {
    if (isInView && !hasAnimated) {
      controls.start("visible");
      setHasAnimated(true);
    }
  }, [isInView, controls, hasAnimated]);

  // Split text into words
  const words = text.split(' ');
  
  return (
    <div ref={ref} className={className}>
      {words.map((word, index) => {
        const isHighlighted = highlightWords.includes(word);
        const wordDelay = delay + (index * 0.07); // Stagger the animation
        
        return isHighlighted ? (
          <HighlightedWord 
            key={index} 
            text={word} 
            delay={isInView ? wordDelay : 0} 
          />
        ) : (
          <RegularWord 
            key={index} 
            text={word} 
            delay={isInView ? wordDelay : 0} 
          />
        );
      })}
    </div>
  );
} 