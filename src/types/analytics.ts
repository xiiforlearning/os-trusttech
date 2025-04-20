/**
 * Analytics event categories
 */
export enum EventCategory {
  NAVIGATION = "navigation",
  INTERACTION = "interaction",
  FORM = "form",
  MEDIA = "media",
  ECOMMERCE = "ecommerce",
  PERFORMANCE = "performance",
  ERROR = "error",
}

/**
 * Common analytics event names
 * Can be extended as needed for specific application events
 */
export enum EventName {
  // Navigation events
  PAGE_VIEW = "page_view",
  LINK_CLICK = "link_click",
  
  // Interaction events
  BUTTON_CLICK = "button_click",
  TOGGLE = "toggle",
  COPY = "copy",
  SCROLL = "scroll",
  HOVER = "hover",
  
  // Form events
  FORM_START = "form_start",
  FORM_SUBMIT = "form_submit",
  FORM_ERROR = "form_error",
  FORM_FIELD_CHANGE = "form_field_change",
  
  // Media events
  VIDEO_PLAY = "video_play",
  VIDEO_PAUSE = "video_pause",
  VIDEO_COMPLETE = "video_complete",
  AUDIO_PLAY = "audio_play",
  
  // Ecommerce events
  PRODUCT_VIEW = "product_view",
  ADD_TO_CART = "add_to_cart",
  CHECKOUT_START = "checkout_start",
  PURCHASE = "purchase",
  
  // Error events
  CLIENT_ERROR = "client_error",
  API_ERROR = "api_error",
}

/**
 * Common analytics parameters that can be sent with events
 */
export interface CommonEventParams {
  page?: string;
  section?: string;
  element_id?: string;
  element_class?: string;
  element_type?: string;
  value?: number;
  source?: string;
  target?: string;
  duration?: number;
  success?: boolean;
  error_message?: string;
  [key: string]: string | number | boolean | undefined;
} 