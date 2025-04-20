"use client";

import { trackEvent } from "@/utils/analytics";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface AnalyticsButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  eventName: string;
  eventParams?: Record<string, string | number | boolean>;
  className?: string;
}

/**
 * Button component that automatically tracks click events for analytics
 */
export default function AnalyticsButton({
  children,
  eventName,
  eventParams = {},
  onClick,
  className = "",
  ...props
}: AnalyticsButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Track the event
    trackEvent(eventName, eventParams);

    // Call the original onClick handler if provided
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      className={`${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
} 