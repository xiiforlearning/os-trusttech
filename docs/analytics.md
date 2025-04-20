# Analytics System Documentation

This document explains how to use the analytics system in this application.

## Overview

The analytics system provides a way to track user interactions with the application, such as page views, button clicks, form submissions, and more. It is designed to be platform-agnostic, so it can work with any analytics provider (Google Analytics, Plausible, Fathom, etc.) with minimal changes.

Currently, the implementation is a stub that logs events to the console in development mode. In production, you would replace these stubs with calls to your actual analytics provider.

## Basic Usage

### Tracking Page Views

Page views are automatically tracked using the `AnalyticsWrapper` component in the layout file. No additional configuration is needed.

### Tracking Events

To track events, use the `trackEvent` function:

```tsx
import { trackEvent } from "@/utils/analytics";
import { EventName } from "@/types/analytics";

// Track a simple event
trackEvent(EventName.BUTTON_CLICK, { buttonId: "submit-button" });

// Track a custom event
trackEvent("custom_event", { 
  category: "user",
  action: "profile_update",
  value: 1
});
```

### Analytics Components

For convenience, we provide several components that automatically track events:

#### AnalyticsButton

```tsx
import AnalyticsButton from "@/components/AnalyticsButton";

<AnalyticsButton 
  eventName="signup_click"
  eventParams={{ location: "header", variant: "primary" }}
  onClick={() => console.log("Button clicked")}
  className="btn btn-primary"
>
  Sign Up
</AnalyticsButton>
```

#### AnalyticsLink

```tsx
import AnalyticsLink from "@/components/AnalyticsLink";

<AnalyticsLink 
  href="/contact"
  eventParams={{ location: "footer", section: "support" }}
>
  Contact Support
</AnalyticsLink>
```

#### AnalyticsForm

```tsx
import AnalyticsForm from "@/components/AnalyticsForm";

<AnalyticsForm
  formName="contact_form"
  formParams={{ location: "contact_page" }}
  onSubmitSuccess={(data) => console.log("Form submitted", data)}
  onSubmitError={(error) => console.error("Form error", error)}
>
  <input type="text" name="name" />
  <input type="email" name="email" />
  <button type="submit">Submit</button>
</AnalyticsForm>
```

### Custom Hooks

#### useEventTracking

For tracking events within components:

```tsx
import useEventTracking from "@/hooks/useEventTracking";

function MyComponent() {
  const trackEvent = useEventTracking();
  
  const handleClick = () => {
    // Some logic
    trackEvent("feature_toggle", { feature: "darkMode", enabled: true });
  };
  
  return <button onClick={handleClick}>Toggle Feature</button>;
}
```

## Helper Functions

For common tracking patterns, you can use these helper functions:

### trackInteraction

```tsx
import { trackInteraction } from "@/utils/analytics";

trackInteraction("button", "click", { 
  element_id: "signup-button",
  section: "header" 
});
```

### trackForm

```tsx
import { trackForm } from "@/utils/analytics";

trackForm("submit", "newsletter_signup", { 
  success: true,
  source: "blog_sidebar" 
});
```

### trackError

```tsx
import { trackError } from "@/utils/analytics";

try {
  // Some code that might throw
} catch (error) {
  trackError("api", error.message, { 
    endpoint: "/api/users",
    method: "POST" 
  });
}
```

## Event Types

For consistency, we provide enums for event categories and common event names in `src/types/analytics.ts`. You can extend these enums with application-specific events as needed.

## Production Setup

To set up analytics in production:

1. Choose an analytics provider (Google Analytics, Plausible, etc.)
2. Follow their installation instructions to add their tracking script to your application
3. Modify the implementation in `src/utils/analytics.ts` to call your provider's API

For example, with Google Analytics:

```tsx
export const pageView = (url: string) => {
  window.gtag('config', 'YOUR-GA-ID', {
    page_path: url,
  });
};

export const trackEvent = (name: string, params = {}) => {
  window.gtag('event', name, params);
};
```

Or with Plausible:

```tsx
export const pageView = (url: string) => {
  if (window.plausible) {
    window.plausible('pageview', { props: { path: url } });
  }
};

export const trackEvent = (name: string, params = {}) => {
  if (window.plausible) {
    window.plausible(name, { props: params });
  }
};
``` 