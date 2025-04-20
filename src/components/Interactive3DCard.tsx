"use client";

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Interactive3DCardProps {
  imageUrl: string;
  title: string;
  description: string;
  delay?: number;
}

export default function Interactive3DCard({ 
  imageUrl, 
  title, 
  description, 
  delay = 0 
}: Interactive3DCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Mouse position values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring animations for smoother movement
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { 
    stiffness: 300, 
    damping: 30 
  });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { 
    stiffness: 300, 
    damping: 30 
  });

  // Transform values for subtle parallax on the image and content
  const imageX = useTransform(x, [-100, 100], [-15, 15]);
  const imageY = useTransform(y, [-100, 100], [-15, 15]);
  const contentX = useTransform(x, [-100, 100], [-7, 7]);
  const contentY = useTransform(y, [-100, 100], [-7, 7]);

  // Handle mouse movement
  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  return (
    <motion.div 
      ref={ref}
      className="w-full h-[400px] relative rounded-xl overflow-hidden shadow-xl bg-white dark:bg-gray-800 group perspective-1000"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transition: hovered ? undefined : "transform 0.5s ease",
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8, 
        delay, 
        type: "spring", 
        stiffness: 70 
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        x.set(0);
        y.set(0);
      }}
    >
      {/* Glowing gradient background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Image with parallax effect */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ 
          x: imageX,
          y: imageY,
          transformStyle: "preserve-3d",
          transform: "translateZ(40px)",
        }}
      >
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transform-gpu transition-all duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </motion.div>
      
      {/* Content with parallax effect */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 p-6 z-10 text-white"
        style={{ 
          x: contentX,
          y: contentY,
          transformStyle: "preserve-3d",
          transform: "translateZ(60px)",
        }}
      >
        <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">{title}</h3>
        <p className="text-white/90 text-sm line-clamp-3 drop-shadow-md">{description}</p>
        
        <motion.div 
          className="mt-4 flex items-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: delay + 0.2 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="h-1 w-6 bg-blue-500 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 24 }}
            transition={{ delay: delay + 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          />
          <motion.div 
            className="h-1 w-4 bg-white/70 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 16 }}
            transition={{ delay: delay + 0.4, duration: 0.5 }}
            viewport={{ once: true }}
          />
        </motion.div>
      </motion.div>
      
      {/* Shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-tr from-white via-white to-transparent bg-[length:200%_200%] animate-sheen pointer-events-none" />
    </motion.div>
  );
} 