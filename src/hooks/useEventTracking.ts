"use client";

import { trackEvent } from "@/utils/analytics";
import { useCallback } from "react";

/**
 * Hook for tracking events in any component
 * 
 * @example
 * const trackEvent = useEventTracking();
 * 
 * // Later in your component
 * const handleClick = () => {
 *   trackEvent("button_click", { buttonType: "primary", location: "hero" });
 * };
 */
export default function useEventTracking() {
  const track = useCallback(
    (eventName: string, eventParams: Record<string, string | number | boolean> = {}) => {
      trackEvent(eventName, eventParams);
    },
    []
  );

  return track;
} 