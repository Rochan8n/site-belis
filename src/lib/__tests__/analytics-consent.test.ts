import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

type AnalyticsTestWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void; "ga-disable-G-BELISQA"?: boolean };
const analyticsWindow = window as AnalyticsTestWindow;
const commands = () => (analyticsWindow.dataLayer || []).map(item => Array.from(item as ArrayLike<unknown>));

beforeEach(() => {
  vi.resetModules();
  vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "G-BELISQA");
  localStorage.clear();
  window.history.replaceState(null, "", "/");
  delete analyticsWindow.dataLayer;
  delete analyticsWindow.gtag;
  delete analyticsWindow["ga-disable-G-BELISQA"];
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
  localStorage.clear();
});

describe("analytics consent and blog attribution", () => {
  it("queues no analytics before a visitor accepts", async () => {
    const analytics = await import("../analytics-consent");
    analytics.trackBlogEvent("blog_cta_click", "guia", "sites", "top");
    expect(analytics.getAnalyticsConsent()).toBe("unknown");
    expect(analytics.initializeAnalytics()).toBeUndefined();
    expect(analyticsWindow.dataLayer).toBeUndefined();
  });

  it("preserves gtag command format and impressions while the script loads", async () => {
    const analytics = await import("../analytics-consent");
    analytics.setAnalyticsConsent("granted");
    analytics.trackBlogEvent("blog_cta_impression", "guia", "sites", "top");
    analytics.trackBlogEvent("blog_cta_click", "guia", "sites", "middle");
    expect(Object.prototype.toString.call(analyticsWindow.dataLayer?.[0])).toBe("[object Arguments]");
    expect(commands().map(command => command[0])).toEqual(["consent", "js", "set", "config", "event", "event"]);
    expect(commands()[3]).toEqual(["config", "G-BELISQA", { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false }]);
    expect(commands()[5]).toEqual(["event", "blog_cta_click", { post_slug: "guia", content_theme: "sites", cta_placement: "middle" }]);
  });

  it("stops blog events, disables GA and removes GA cookies after refusal", async () => {
    const analytics = await import("../analytics-consent");
    analytics.setAnalyticsConsent("granted");
    analytics.initializeAnalytics();
    document.cookie = "_ga=QA; Path=/";
    document.cookie = "_ga_BELISQA=QA; Path=/";
    document.cookie = "essential=keep; Path=/";
    analytics.setAnalyticsConsent("denied");
    const before = commands().length;
    analytics.trackBlogEvent("blog_download", "guia", "sites", "download");
    expect(commands()).toHaveLength(before);
    expect(analyticsWindow["ga-disable-G-BELISQA"]).toBe(true);
    expect(commands().at(-1)).toEqual(["consent", "update", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" }]);
    expect(document.cookie).not.toMatch(/(?:^|;\s*)_ga(?:_|=)/);
    expect(document.cookie).toContain("essential=keep");
    document.cookie = "essential=; Max-Age=0; Path=/";
  });

  it("allows a changed choice without sending config twice", async () => {
    const analytics = await import("../analytics-consent");
    analytics.setAnalyticsConsent("granted");
    analytics.initializeAnalytics();
    analytics.setAnalyticsConsent("denied");
    analytics.setAnalyticsConsent("granted");
    analytics.trackBlogEvent("blog_read_progress", "guia", "sites", "article", 50);
    expect(analyticsWindow["ga-disable-G-BELISQA"]).toBe(false);
    expect(commands().filter(command => command[0] === "config")).toHaveLength(1);
    expect(commands().at(-2)?.[2]).toEqual({ analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
    expect(commands().at(-1)?.[2]).toEqual({ post_slug: "guia", content_theme: "sites", cta_placement: "article", read_progress: 50 });
  });

  it("keeps a session choice when browser storage is blocked", async () => {
    const analytics = await import("../analytics-consent");
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new Error("Storage blocked"); });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("Storage blocked"); });
    analytics.setAnalyticsConsent("granted");
    expect(analytics.getAnalyticsConsent()).toBe("granted");
    analytics.setAnalyticsConsent("denied");
    expect(analytics.getAnalyticsConsent()).toBe("denied");
  });

  it("resets consent when a stored preference is removed", async () => {
    const analytics = await import("../analytics-consent");
    analytics.setAnalyticsConsent("granted");
    localStorage.removeItem("belis_analytics_consent");
    expect(analytics.getAnalyticsConsent()).toBe("unknown");
  });

  it("keeps conversion UI usable when a measurement ID is invalid", async () => {
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "invalid");
    const analytics = await import("../analytics-consent");
    expect(analytics.analyticsEnabled).toBe(false);
    analytics.setAnalyticsConsent("granted");
    expect(analytics.initializeAnalytics()).toBeUndefined();
  });

  it("preserves paid attribution after consent and queues one page view before script readiness", async () => {
    window.history.replaceState(null, "", "/comunicacao-visual?gclid=QA-click_123&utm_source=google&utm_medium=cpc&email=private%40example.com#studio");
    const analytics = await import("../analytics-consent");
    analytics.trackPageView();
    expect(analyticsWindow.dataLayer).toBeUndefined();
    analytics.setAnalyticsConsent("granted");
    analytics.trackPageView();
    analytics.trackPageView(); // React StrictMode / remount / script onReady.
    analytics.initializeAnalytics();
    const pageViews = commands().filter(command => command[1] === "page_view");
    expect(pageViews).toHaveLength(1);
    const payload = pageViews[0][2] as { page_location: string };
    const url = new URL(payload.page_location);
    expect(url.searchParams.get("gclid")).toBe("QA-click_123");
    expect(url.searchParams.get("utm_source")).toBe("google");
    expect(url.searchParams.get("utm_medium")).toBe("cpc");
    expect(url.searchParams.has("email")).toBe(false);
    expect(url.hash).toBe("");
    expect(commands().find(command => command[0] === "set")?.[1]).toEqual(expect.objectContaining({ page_location: url.href }));
    expect(JSON.stringify(commands())).not.toContain("private");
  });

  it("updates the event context and referrer on SPA navigation without carrying click IDs to the next URL", async () => {
    window.history.replaceState(null, "", "/comunicacao-visual?gclid=QA-click");
    const analytics = await import("../analytics-consent");
    analytics.setAnalyticsConsent("granted");
    analytics.trackPageView();
    window.history.pushState(null, "", "/blog?email=private%40example.com");
    analytics.trackPageView();
    expect(commands().at(-2)).toEqual(["set", expect.objectContaining({
      page_location: `${window.location.origin}/blog`,
      page_referrer: `${window.location.origin}/comunicacao-visual`,
    })]);
    expect(commands().filter(command => command[1] === "page_view")).toHaveLength(2);
    window.history.pushState(null, "", "/comunicacao-visual?gclid=QA-click");
    analytics.trackPageView();
    expect(commands().filter(command => command[1] === "page_view")).toHaveLength(3);
    analytics.setAnalyticsConsent("denied");
    const count = commands().length;
    window.history.pushState(null, "", "/outro");
    analytics.trackPageView();
    expect(commands()).toHaveLength(count);
  });
});
