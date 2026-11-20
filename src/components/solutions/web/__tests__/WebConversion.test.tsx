import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { WebContact } from "../WebContact";
import { WebNovemberOffer } from "../WebNovemberOffer";

const analytics = vi.hoisted(() => ({ consent: "unknown", event: vi.fn() }));
vi.mock("@/lib/analytics-consent", () => ({
  getAnalyticsConsent: () => analytics.consent,
  initializeAnalytics: () => analytics.event,
}));
beforeEach(() => { analytics.consent = "unknown"; vi.clearAllMocks(); });
afterEach(() => { cleanup(); vi.useRealTimers(); });

describe("websites campaign conversion", () => {
  it.each(["unknown", "denied"])("keeps contact available without tracking for %s consent", (consent) => {
    analytics.consent = consent;
    render(<WebContact placement="hero" onClick={event => event.preventDefault()}>Orçamento</WebContact>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", expect.stringContaining("https://wa.me/5511973138895?text="));
    fireEvent.click(link);
    expect(analytics.event).not.toHaveBeenCalled();
  });
  it("separates websites intent from visual intent and sends no customer text", () => {
    analytics.consent = "granted";
    render(<WebContact placement="hero" onClick={event => event.preventDefault()}>Orçamento</WebContact>);
    fireEvent.click(screen.getByRole("link"));
    expect(analytics.event).toHaveBeenCalledExactlyOnceWith("event", "websites_whatsapp_click", {
      page_path: "/websites", cta_placement: "hero", service: "websites",
    });
  });
  it("expires the websites discount at midnight São Paulo after November 30", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-12-01T02:59:59Z"));
    render(<WebNovemberOffer />);
    expect(screen.getByRole("complementary", { name: "Oferta de novembro" })).toBeInTheDocument();
    act(() => { vi.advanceTimersByTime(1000); });
    expect(screen.queryByRole("complementary", { name: "Oferta de novembro" })).not.toBeInTheDocument();
  });
});
