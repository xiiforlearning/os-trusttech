"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackEvent, pageView } from "@/utils/analytics";
import { EventName } from "@/types/analytics";

/**
 * Custom hook for tracking navigation and page views
 * 
 * This hook automatically tracks:
 * 1. Page views when the pathname changes
 * 2. Search/query parameter changes
 * 
 * @param additionalParams Additional parameters to send with page view events
 * 
 * @example
 * // Basic usage in a layout component
 * useNavigationTracking();
 * 
 * // With additional parameters
 * useNavigationTracking({
 *   section: "user_dashboard",
 *   user_type: "admin"
 * });
 */
export default function useNavigationTracking(
  additionalParams: Record<string, string | number | boolean> = {}
) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;
    
    // Get the full URL including search params
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    
    // Track the page view
    pageView(url);
    
    // Track as an event to include additional parameters
    trackEvent(EventName.PAGE_VIEW, {
      path: pathname,
      url,
      query_params: searchParams?.toString() || "",
      referrer: document.referrer,
      ...additionalParams
    });
    
    // Track navigation timing metrics if available
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing;
      const navigationStart = timing.navigationStart;
      
      // Wait for page to load completely
      window.addEventListener("load", () => {
        setTimeout(() => {
          const loadTime = timing.loadEventEnd - navigationStart;
          const domContentLoadedTime = timing.domContentLoadedEventEnd - navigationStart;
          
          trackEvent("performance_metrics", {
            category: "performance",
            load_time: loadTime,
            dom_content_loaded_time: domContentLoadedTime,
            url
          });
        }, 0);
      }, { once: true });
    }
  }, [pathname, searchParams, additionalParams]);
} 