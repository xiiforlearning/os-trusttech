"use client";

import { useCallback } from "react";
import { trackForm } from "@/utils/analytics";
import { CommonEventParams, EventName } from "@/types/analytics";

/**
 * Custom hook for tracking form-related analytics events
 * 
 * @param formName The name of the form to track
 * @param baseParams Base parameters to include with all form events
 * @returns Object with methods for tracking different form events
 * 
 * @example
 * const { trackStart, trackSubmit, trackError, trackFieldChange } = useFormAnalytics("contact_form", { 
 *   section: "contact_page" 
 * });
 * 
 * // Track form start
 * trackStart();
 * 
 * // Track form submission
 * const handleSubmit = (e) => {
 *   e.preventDefault();
 *   try {
 *     // Form submission logic
 *     trackSubmit({ success: true });
 *   } catch (error) {
 *     trackError({ error_message: error.message });
 *   }
 * };
 * 
 * // Track field change
 * const handleFieldChange = (fieldName, value) => {
 *   trackFieldChange({ field_name: fieldName });
 * };
 */
export default function useFormAnalytics(
  formName: string,
  baseParams: CommonEventParams = {}
) {
  // Track form start
  const trackStart = useCallback(
    (additionalParams: CommonEventParams = {}) => {
      trackForm("start", formName, {
        ...baseParams,
        ...additionalParams,
      });
    },
    [formName, baseParams]
  );

  // Track form submission
  const trackSubmit = useCallback(
    (additionalParams: CommonEventParams = {}) => {
      trackForm("submit", formName, {
        success: true,
        ...baseParams,
        ...additionalParams,
      });
    },
    [formName, baseParams]
  );

  // Track form error
  const trackError = useCallback(
    (additionalParams: CommonEventParams = {}) => {
      trackForm("error", formName, {
        success: false,
        ...baseParams,
        ...additionalParams,
      });
    },
    [formName, baseParams]
  );

  // Track form field change
  const trackFieldChange = useCallback(
    (additionalParams: CommonEventParams = {}) => {
      trackForm("field_change", formName, {
        ...baseParams,
        ...additionalParams,
      });
    },
    [formName, baseParams]
  );

  return {
    trackStart,
    trackSubmit,
    trackError,
    trackFieldChange,
  };
} 