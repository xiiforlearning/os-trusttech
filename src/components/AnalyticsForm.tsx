"use client";

import { trackForm } from "@/utils/analytics";
import { CommonEventParams } from "@/types/analytics";
import { FormEvent, ReactNode, useState } from "react";

interface AnalyticsFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  formName: string;
  formParams?: CommonEventParams;
  onSubmitSuccess?: (data: any) => void;
  onSubmitError?: (error: any) => void;
}

/**
 * Form component that automatically tracks form events for analytics
 */
export default function AnalyticsForm({
  children,
  formName,
  formParams = {},
  onSubmit,
  onSubmitSuccess,
  onSubmitError,
  ...props
}: AnalyticsFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Track form submission start
    trackForm("start", formName, {
      ...formParams,
    });

    try {
      // Execute original onSubmit if provided
      if (onSubmit) {
        onSubmit(e);
      }

      // If we have a form element, collect the form data
      const formData = new FormData(e.currentTarget);
      const formObject = Object.fromEntries(formData.entries());

      // Track successful form submission
      trackForm("submit", formName, {
        success: true,
        ...formParams,
      });

      // Call success handler if provided
      if (onSubmitSuccess) {
        onSubmitSuccess(formObject);
      }
    } catch (error) {
      // Track form submission error
      trackForm("error", formName, {
        success: false,
        error_message: error instanceof Error ? error.message : String(error),
        ...formParams,
      });

      // Call error handler if provided
      if (onSubmitError) {
        onSubmitError(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} {...props}>
      {children}
    </form>
  );
} 