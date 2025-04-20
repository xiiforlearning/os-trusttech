"use client";

import { ReactNode, useEffect } from 'react';
import { motion } from 'framer-motion';
import useEventTracking from '@/hooks/useEventTracking';
import { EventName } from '@/types/analytics';

interface AnimatedServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
}

export default function AnimatedServiceCard({ 
  icon, 
  title, 
  description, 
  delay = 0 
}: AnimatedServiceCardProps) {
  const trackEvent = useEventTracking();

  // Track when the card enters the viewport
  const handleViewportEnter = () => {
    trackEvent(EventName.PAGE_VIEW, {
      component: 'service_card',
      title,
      visible: true
    });
  };

  // Track interactions with the card
  const handleHoverStart = () => {
    trackEvent(EventName.HOVER, {
      component: 'service_card',
      title,
      action: 'hover_start'
    });
  };

  const handleHoverEnd = () => {
    trackEvent(EventName.HOVER, {
      component: 'service_card',
      title,
      action: 'hover_end'
    });
  };

  const handleIconClick = () => {
    trackEvent(EventName.BUTTON_CLICK, {
      component: 'service_card_icon',
      title,
      section: 'services'
    });
  };

  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all hover:shadow-xl"
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay, 
        type: "spring", 
        stiffness: 100 
      }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.2 } 
      }}
      onViewportEnter={handleViewportEnter}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
    >
      <motion.div 
        className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6"
        whileHover={{ 
          rotate: [0, -10, 10, -10, 0],
          scale: 1.05,
          transition: { duration: 0.5 }
        }}
        onClick={handleIconClick}
      >
        <div className="w-8 h-8">
          {icon}
        </div>
      </motion.div>
      
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
        {title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400">
        {description}
      </p>

      <motion.div 
        className="w-0 h-1 bg-blue-500 mt-4"
        whileInView={{
          width: "40%",
          transition: { duration: 1, delay: delay + 0.3 }
        }}
        viewport={{ once: true }}
      />
    </motion.div>
  );
} 