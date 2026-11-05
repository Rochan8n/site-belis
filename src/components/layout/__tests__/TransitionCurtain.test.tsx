import { act, cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { TransitionCurtain } from "../TransitionCurtain";
import { curtain, CURTAIN_COVER_NAVIGATION_MS } from "../curtainController";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));
// Model an unavailable/slow optional animation chunk, not the navigation shell.
vi.mock("next/dynamic", () => ({ default: () => () => null }));

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
  cleanup();
  curtain.covered();
  curtain.reveal();
  curtain.settle();
  vi.useRealTimers();
});

it("completes navigation and restores interaction without the animation chunk", async () => {
  const { container } = render(<><div data-page-content>Destination</div><TransitionCurtain /></>);
  const content = container.querySelector<HTMLElement>("[data-page-content]")!;
  const root = container.querySelector<HTMLElement>("[aria-hidden='true']")!;

  for (const destination of ["/websites", "/portfolio"]) {
    let covered: Promise<boolean>;
    act(() => { covered = curtain.cover(destination); });
    expect(content.inert).toBe(true);
    expect(root.style.visibility).not.toBe("hidden");
    await act(() => vi.advanceTimersByTimeAsync(CURTAIN_COVER_NAVIGATION_MS));
    await expect(covered!).resolves.toBe(true);
    act(() => curtain.reveal());
    await act(() => vi.advanceTimersByTimeAsync(1400));
    expect(curtain.getPhase()).toBe("idle");
    expect(content.inert).toBe(false);
    expect(document.body.hasAttribute("aria-busy")).toBe(false);
    expect(root.style.visibility).toBe("hidden");
  }
});
