import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { isNovemberOfferActive, NovemberOffer } from "../NovemberOffer";

afterEach(() => { cleanup(); vi.useRealTimers(); });

describe("November offer", () => {
  it.each([
    ["2026-11-01T02:59:59Z", false],
    ["2026-11-01T03:00:00Z", true],
    ["2026-12-01T02:59:59Z", true],
    ["2026-12-01T03:00:00Z", false],
    ["2027-11-17T12:00:00Z", false],
  ])("uses the São Paulo validity window at %s", (date, expected) => {
    expect(isNovemberOfferActive(Date.parse(date))).toBe(expected);
  });

  it("removes the offer at expiry even when the visitor leaves the page open", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-12-01T02:59:59Z"));
    render(<NovemberOffer />);
    expect(screen.getByText("Novembro: 30% de desconto")).toBeInTheDocument();
    act(() => { vi.advanceTimersByTime(1000); });
    expect(screen.queryByText("Novembro: 30% de desconto")).not.toBeInTheDocument();
  });
});
