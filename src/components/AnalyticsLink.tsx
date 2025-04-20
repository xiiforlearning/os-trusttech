"use client";

import { trackEvent } from "@/utils/analytics";
import { EventName } from "@/types/analytics";
import Link from "next/link";
import { ComponentProps, ReactNode } from "react";

interface AnalyticsLinkProps extends ComponentProps<typeof Link> {
  children: ReactNode;
  eventParams?: Record<string, string | number | boolean>;
}

/**
 * Link component that automatically tracks click events for analytics
 */
export default function AnalyticsLink({
  children,
  eventParams = {},
  onClick,
  ...props
}: AnalyticsLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Track the link click
    trackEvent(EventName.LINK_CLICK, {
      href: props.href.toString(),
      ...eventParams,
    });

    // Call the original onClick handler if provided
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Link onClick={handleClick} {...props}>
      {children}
    </Link>
  );
} 