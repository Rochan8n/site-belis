import { act, cleanup, render } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { BelisBlob } from "../BelisBlob";

vi.mock("next/script", () => ({
  default: ({ src }: { src: string }) => <span data-blob-script data-src={src} />,
}));

beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal("matchMedia", () => ({ matches: false }));
  vi.stubGlobal("requestIdleCallback", (callback: () => void) => window.setTimeout(callback, 1));
  vi.stubGlobal("cancelIdleCallback", window.clearTimeout);
  Object.defineProperty(navigator, "connection", { value: { saveData: false }, configurable: true });
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
  Reflect.deleteProperty(navigator, "connection");
});

describe("BelisBlob progressive loading", () => {
  it("includes the eager poster in server HTML without requiring JavaScript", () => {
    const html = renderToString(<BelisBlob poster="/belis-blob-poster.avif" />);
    expect(html).toContain('src="/belis-blob-poster.avif"');
    expect(html).toContain('loading="eager"');
    expect(html).toContain('width="730"');
    expect(html).toContain('rel="preload"');
    expect(html).toContain('as="image"');
    expect(html).not.toContain("data-blob-script");
  });

  it("loads the renderer automatically without scroll, pointer or load events", async () => {
    const { container } = render(<BelisBlob poster="/belis-blob-poster.avif" />);
    expect(container.querySelector("img")).not.toBeNull();
    expect(container.querySelector("[data-blob-script]")).toBeNull();
    await act(() => vi.advanceTimersByTimeAsync(100));
    expect(container.querySelector("[data-blob-script]")).not.toBeNull();
  });

  it.each(["reduced-motion", "save-data"])("keeps the poster without loading WebGL for %s", async (mode) => {
    if (mode === "reduced-motion") vi.stubGlobal("matchMedia", () => ({ matches: true }));
    else Object.defineProperty(navigator, "connection", { value: { saveData: true }, configurable: true });
    const { container } = render(<BelisBlob poster="/belis-blob-poster.avif" />);
    await act(() => vi.advanceTimersByTimeAsync(5000));
    expect(container.querySelector("img")).not.toBeNull();
    expect(container.querySelector("[data-blob-script]")).toBeNull();
  });

  it("loads automatically when requestIdleCallback is unavailable", async () => {
    vi.stubGlobal("requestIdleCallback", undefined);
    const { container } = render(<BelisBlob poster="/belis-blob-poster.avif" />);
    await act(() => vi.advanceTimersByTimeAsync(100));
    expect(container.querySelector("[data-blob-script]")).not.toBeNull();
  });

  it("cancels pending initialization when navigating away", () => {
    const { unmount } = render(<BelisBlob poster="/belis-blob-poster.avif" />);
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});
