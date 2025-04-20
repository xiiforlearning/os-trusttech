"use client";

import { CommonEventParams, EventCategory, EventName } from "@/types/analytics";

// Stub for analytics implementation
// In a real project, this would be replaced with your actual analytics provider
// (Google Analytics, Plausible, Fathom, etc.)

/**
 * Track a page view
 * @param url The URL that was viewed
 */
export const pageView = (url: string) => {
  // This is just a stub - in production, this would send page view data to your analytics provider
  if (process.env.NODE_ENV === 'development') {
    console.log(`Analytics pageview: ${url}`);
  }

  // Google Analytics example (would require the GA script to be loaded)
  // window.gtag('config', 'GA-MEASUREMENT-ID', {
  //   page_path: url,
  // });

  // Plausible example
  // if (window.plausible) {
  //   window.plausible('pageview', { props: { path: url } });
  // }
};

/**
 * Track an event
 * @param name Event name (can use EventName enum for common events)
 * @param params Event parameters
 */
export const trackEvent = (name: string, params: Record<string, string | number | boolean> = {}) => {
  // This is just a stub - in production, this would send event data to your analytics provider
  if (process.env.NODE_ENV === 'development') {
    console.log(`Analytics event: ${name}`, params);
  }

  // Google Analytics example
  // window.gtag('event', name, params);

  // Plausible example
  // if (window.plausible) {
  //   window.plausible(name, { props: params });
  // }
};

/**
 * Track user interaction with a specific UI element
 * @param elementType The type of element interacted with (button, link, etc)
 * @param action The action performed (click, hover, etc)
 * @param params Additional parameters
 */
export const trackInteraction = (
  elementType: string,
  action: string,
  params: CommonEventParams = {}
) => {
  trackEvent(`${elementType}_${action}`, {
    category: EventCategory.INTERACTION,
    ...params,
  });
};

/**
 * Track form-related events
 * @param action The form action (submit, error, etc)
 * @param formName The name of the form
 * @param params Additional parameters
 */
export const trackForm = (
  action: string,
  formName: string,
  params: CommonEventParams = {}
) => {
  trackEvent(`form_${action}`, {
    category: EventCategory.FORM,
    form_name: formName,
    ...params,
  });
};

/**
 * Track errors that occur in the application
 * @param errorType The type of error
 * @param message Error message
 * @param params Additional parameters
 */
export const trackError = (
  errorType: string,
  message: string,
  params: CommonEventParams = {}
) => {
  trackEvent(`${errorType}_error`, {
    category: EventCategory.ERROR,
    error_message: message,
    ...params,
  });
};

// Analytics hook for pages
export const useAnalytics = (url: string) => {
  if (typeof window !== 'undefined') {
    // Only track page views on the client side
    pageView(url);
  }
}; 