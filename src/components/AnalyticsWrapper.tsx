"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAnalytics } from "@/utils/analytics";
import useNavigationTracking from "@/hooks/useNavigationTracking";

/**
 * Client component for analytics tracking
 * Automatically tracks page views and navigation
 */
export default function AnalyticsWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Basic page view tracking
  useEffect(() => {
    useAnalytics(pathname);
  }, [pathname]);
  
  // Enhanced navigation tracking with performance metrics
  useNavigationTracking({
    app_version: "1.0.0",
    platform: "web"
  });
  
  return <>{children}</>;
} 