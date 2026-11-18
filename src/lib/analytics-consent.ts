import { analyticsPageLocation, analyticsReferrer } from "./analytics-page";

export type AnalyticsConsent = "unknown" | "granted" | "denied";
const STORAGE_KEY = "belis_analytics_consent";
const CHANGE_EVENT = "belis:analytics-consent";
let sessionChoice: AnalyticsConsent = "unknown";
const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
export const analyticsEnabled = Boolean(measurementId && /^G-[A-Z0-9]+$/.test(measurementId));
const configuredTags = new Set<string>();
let pageContext: { page_location: string; page_referrer: string; page_title: string } | undefined;
let lastPageView: string | undefined;
type AnalyticsWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };

export function initializeAnalytics(): AnalyticsWindow["gtag"] {
  if (!analyticsEnabled || !measurementId || getAnalyticsConsent() !== "granted") return undefined;
  const analyticsWindow = window as AnalyticsWindow;
  analyticsWindow.dataLayer ??= [];
  // gtag's command queue expects the native Arguments object.
  // eslint-disable-next-line prefer-rest-params
  analyticsWindow.gtag ??= function () { analyticsWindow.dataLayer?.push(arguments); };
  const location = analyticsPageLocation(window.location.href);
  const previous = pageContext;
  pageContext = {
    page_location: location,
    page_referrer: previous && previous.page_location !== location
      ? new URL(previous.page_location).origin + new URL(previous.page_location).pathname
      : previous?.page_referrer ?? analyticsReferrer(document.referrer),
    page_title: document.title,
  };
  if (!configuredTags.has(measurementId)) {
    analyticsWindow.gtag("consent", "default", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
    analyticsWindow.gtag("js", new Date());
    analyticsWindow.gtag("set", pageContext);
    analyticsWindow.gtag("config", measurementId, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false });
    configuredTags.add(measurementId);
  } else if (previous?.page_location !== location || previous?.page_title !== pageContext.page_title) {
    // Keep subsequent events on the current, sanitized URL after SPA navigation.
    analyticsWindow.gtag("set", pageContext);
  }
  return analyticsWindow.gtag;
}

export function trackPageView(): void {
  const gtag = initializeAnalytics();
  if (!gtag || !pageContext || lastPageView === pageContext.page_location) return;
  gtag("event", "page_view", { ...pageContext, page_path: window.location.pathname });
  lastPageView = pageContext.page_location;
}

export function getAnalyticsConsent(): AnalyticsConsent {
  if (typeof window === "undefined") return "unknown";
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (value === "granted" || value === "denied") return value;
    return "unknown";
  } catch {
    // Private browsing can block storage. A choice still works for this page.
  }
  return sessionChoice;
}

export function subscribeAnalyticsConsent(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

export function serverAnalyticsConsent(): AnalyticsConsent { return "unknown"; }

export function setAnalyticsConsent(value: Exclude<AnalyticsConsent, "unknown">): void {
  sessionChoice = value;
  try { window.localStorage.setItem(STORAGE_KEY, value); } catch { /* Use the session choice when storage is blocked. */ }
  if (measurementId) Object.assign(window, { [`ga-disable-${measurementId}`]: value !== "granted" });
  const analyticsWindow = window as AnalyticsWindow;
  analyticsWindow.gtag?.("consent", "update", { analytics_storage: value, ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
  if (value === "denied") {
    for (const cookie of document.cookie.split(";")) {
      const name = cookie.split("=")[0].trim();
      if (!/^_ga(?:_|$)/.test(name)) continue;
      const domains = ["", window.location.hostname, `.${window.location.hostname}`, ".belis.agency"];
      for (const domain of domains) document.cookie = `${name}=; Max-Age=0; Path=/;${domain ? ` Domain=${domain};` : ""}`;
    }
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

type BlogEvent = "blog_cta_impression" | "blog_cta_click" | "blog_popup_impression" | "blog_popup_dismiss" | "blog_read_progress" | "blog_share" | "blog_download";
export type BlogPlacement = "top" | "middle" | "bottom" | "sidebar" | "floating" | "popup" | "download" | "share" | "article";

// Only editorial identifiers enter Analytics; never the WhatsApp message or URL query.
export function trackBlogEvent(name: BlogEvent, slug: string, theme: string, placement: BlogPlacement, progress?: number): void {
  if (getAnalyticsConsent() !== "granted") return;
  initializeAnalytics()?.("event", name, {
    post_slug: slug, content_theme: theme, cta_placement: placement,
    ...(progress === undefined ? {} : { read_progress: progress }),
  });
}
