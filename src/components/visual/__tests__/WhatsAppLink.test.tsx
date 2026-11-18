import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { WhatsAppLink } from "../WhatsAppLink";

const analytics = vi.hoisted(() => ({ consent: "unknown", event: vi.fn(), initialize: vi.fn() }));
vi.mock("@/lib/analytics-consent", () => ({
  getAnalyticsConsent: () => analytics.consent,
  initializeAnalytics: () => { analytics.initialize(); return analytics.event; },
}));

beforeEach(() => { analytics.consent = "unknown"; vi.clearAllMocks(); });
afterEach(cleanup);

describe("WhatsApp intent tracking", () => {
  it.each(["unknown", "denied"])("keeps the WhatsApp destination usable without tracking when consent is %s", consent => {
    analytics.consent = consent;
    render(<WhatsAppLink placement="hero" onClick={event => event.preventDefault()}>Orçamento</WhatsAppLink>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", expect.stringContaining("https://wa.me/5511973138895?text="));
    fireEvent.click(link);
    expect(analytics.initialize).not.toHaveBeenCalled();
    expect(analytics.event).not.toHaveBeenCalled();
  });

  it("sends one placement event without the custom message, number or client text", () => {
    analytics.consent = "granted";
    render(<WhatsAppLink placement="studio" projectType="fachada" message="Nome privado, endereço privado" onClick={event => event.preventDefault()}>Orçamento</WhatsAppLink>);
    fireEvent.click(screen.getByRole("link"));
    expect(analytics.event).toHaveBeenCalledExactlyOnceWith("event", "visual_whatsapp_click", {
      page_path: "/comunicacao-visual", cta_placement: "studio", project_type: "fachada",
    });
  });
});
