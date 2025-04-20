"use client";

import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface FloatingObjectsProps {
  count?: number;
  className?: string;
}

// Shapes to render
const shapes = [
  // Circle
  <div key="circle" className="w-full h-full rounded-full bg-gradient-to-r from-blue-400/20 to-indigo-500/20" />,
  
  // Square
  <div key="square" className="w-full h-full rounded-lg bg-gradient-to-r from-purple-400/20 to-pink-500/20" />,
  
  // Triangle (CSS triangle)
  <div 
    key="triangle" 
    className="w-full h-full" 
    style={{ 
      clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
      background: "linear-gradient(to right, rgba(236, 72, 153, 0.2), rgba(124, 58, 237, 0.2))" 
    }} 
  />,
  
  // Hexagon
  <div 
    key="hexagon" 
    className="w-full h-full" 
    style={{ 
      clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
      background: "linear-gradient(to right, rgba(6, 182, 212, 0.2), rgba(16, 185, 129, 0.2))" 
    }} 
  />,
  
  // Star
  <div 
    key="star" 
    className="w-full h-full" 
    style={{ 
      clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
      background: "linear-gradient(to right, rgba(245, 158, 11, 0.2), rgba(239, 68, 68, 0.2))" 
    }} 
  />
];

// Generate random position, size, and animation
const generateRandomObject = (index: number, containerWidth: number, containerHeight: number) => {
  const minSize = 40;
  const maxSize = 120;
  const size = Math.floor(Math.random() * (maxSize - minSize)) + minSize;
  
  const xPos = Math.random() * (containerWidth - size);
  const yPos = Math.random() * (containerHeight - size);
  
  const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
  
  const duration = Math.random() * 10 + 10; // Between 10 and 20 seconds
  const delay = Math.random() * 2;
  
  return {
    id: index,
    x: xPos,
    y: yPos,
    size,
    shape: randomShape,
    duration,
    delay
  };
};

export default function FloatingObjects({ count = 8, className = "" }: FloatingObjectsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [objects, setObjects] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);
  
  // Mouse position for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring animations for mouse movement
  const springConfig = { stiffness: 50, damping: 30 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);
  
  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      mouseX.set((e.clientX - centerX) * 0.1);
      mouseY.set((e.clientY - centerY) * 0.1);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);
  
  // Generate objects once mounted
  useEffect(() => {
    if (!containerRef.current) return;
    
    const containerWidth = containerRef.current.offsetWidth;
    const containerHeight = containerRef.current.offsetHeight;
    
    const newObjects = Array.from({ length: count }).map((_, index) => 
      generateRandomObject(index, containerWidth, containerHeight)
    );
    
    setObjects(newObjects);
    setMounted(true);
  }, [count]);
  
  if (!mounted) return null;
  
  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {objects.map((obj) => (
        <motion.div
          key={obj.id}
          className="absolute"
          style={{
            x: obj.x,
            y: obj.y,
            width: obj.size,
            height: obj.size,
            opacity: 0.7,
            zIndex: 0
          }}
          animate={{
            x: [obj.x - 40, obj.x + 40, obj.x],
            y: [obj.y + 30, obj.y - 30, obj.y],
            rotate: [0, 360],
          }}
          transition={{
            duration: obj.duration,
            delay: obj.delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          drag
          dragConstraints={containerRef}
          whileDrag={{ zIndex: 10, opacity: 1, scale: 1.1 }}
          whileHover={{ scale: 1.1, opacity: 1 }}
        >
          <motion.div 
            style={{ 
              x: smoothMouseX,
              y: smoothMouseY,
              rotateX: smoothMouseY,
              rotateY: smoothMouseX,
              transformStyle: "preserve-3d", 
              transformPerspective: 800
            }}
            className="w-full h-full"
          >
            {obj.shape}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
} 