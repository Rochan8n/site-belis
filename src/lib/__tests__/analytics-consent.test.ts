import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

type AnalyticsTestWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void; "ga-disable-G-BELISQA"?: boolean };
const analyticsWindow = window as AnalyticsTestWindow;
const commands = () => (analyticsWindow.dataLayer || []).map(item => Array.from(item as ArrayLike<unknown>));

beforeEach(() => {
  vi.resetModules();
  vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "G-BELISQA");
  localStorage.clear();
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
    expect(commands().map(command => command[0])).toEqual(["consent", "js", "config", "event", "event"]);
    expect(commands()[2]).toEqual(["config", "G-BELISQA", { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false }]);
    expect(commands()[4]).toEqual(["event", "blog_cta_click", { post_slug: "guia", content_theme: "sites", cta_placement: "middle" }]);
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
});
