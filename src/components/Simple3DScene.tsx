"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import useEventTracking from "@/hooks/useEventTracking";
import { EventName } from "@/types/analytics";

// Dynamically import 3D components with SSR disabled to prevent hydration errors
const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

export default function Simple3DScene() {
  const [mounted, setMounted] = useState(false);
  const trackEvent = useEventTracking();
  
  useEffect(() => {
    setMounted(true);

    // Track when the scene is loaded
    trackEvent(EventName.PAGE_VIEW, {
      component: "3d_scene",
      section: "interactive_scene",
      action: "load"
    });

    return () => {
      // Track when the component unmounts
      trackEvent(EventName.PAGE_VIEW, {
        component: "3d_scene",
        section: "interactive_scene",
        action: "unload"
      });
    };
  }, [trackEvent]);

  return (
    <motion.div 
      className="w-full h-[400px] bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      onViewportEnter={() => {
        trackEvent(EventName.PAGE_VIEW, {
          component: "3d_scene",
          section: "interactive_scene",
          visible: true
        });
      }}
    >
      {mounted ? <Scene3D trackEvent={trackEvent} /> : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </motion.div>
  );
} 