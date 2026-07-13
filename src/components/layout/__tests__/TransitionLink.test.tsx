import type { AnchorHTMLAttributes, ReactNode } from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TransitionLink } from "../TransitionLink";

const mocks = vi.hoisted(() => ({
  cover: vi.fn(),
  push: vi.fn(),
  replace: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mocks.push, replace: mocks.replace }),
}));

vi.mock("../curtainController", () => ({
  curtain: { cover: mocks.cover },
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    replace: _replace,
    scroll: _scroll,
    children,
    ...props
  }: AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    replace?: boolean;
    scroll?: boolean;
    children: ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

beforeEach(() => {
  mocks.cover.mockReset();
  mocks.push.mockReset();
  mocks.replace.mockReset();
  window.history.replaceState({}, "", "/");
});

describe("TransitionLink", () => {
  it("waits for the curtain to cover before pushing an internal route", async () => {
    let finishCover: (started: boolean) => void = () => undefined;
    mocks.cover.mockReturnValue(
      new Promise<boolean>((resolve) => {
        finishCover = resolve;
      }),
    );

    const user = userEvent.setup();
    render(<TransitionLink href="/websites">Websites</TransitionLink>);

    await user.click(screen.getByRole("link", { name: "Websites" }));

    expect(mocks.cover).toHaveBeenCalledWith("/websites");
    expect(mocks.push).not.toHaveBeenCalled();

    await act(async () => finishCover(true));

    await waitFor(() => expect(mocks.push).toHaveBeenCalledWith("/websites", undefined));
  });

  it("preserves replace, scroll, query and hash after cover", async () => {
    mocks.cover.mockResolvedValue(true);
    const user = userEvent.setup();

    render(
      <TransitionLink href="/contato?via=nav#form" replace scroll={false}>
        Contato
      </TransitionLink>,
    );

    await user.click(screen.getByRole("link", { name: "Contato" }));

    await waitFor(() =>
      expect(mocks.replace).toHaveBeenCalledWith("/contato?via=nav#form", {
        scroll: false,
      }),
    );
    expect(mocks.push).not.toHaveBeenCalled();
  });

  it("does not navigate when another transition already owns the curtain", async () => {
    mocks.cover.mockResolvedValue(false);
    const user = userEvent.setup();
    render(<TransitionLink href="/portfolio">Portfolio</TransitionLink>);

    await user.click(screen.getByRole("link", { name: "Portfolio" }));

    await waitFor(() => expect(mocks.cover).toHaveBeenCalledWith("/portfolio"));
    expect(mocks.push).not.toHaveBeenCalled();
    expect(mocks.replace).not.toHaveBeenCalled();
  });

  it("respects a consumer click cancellation", async () => {
    const user = userEvent.setup();
    render(
      <TransitionLink href="/sobre" onClick={(event) => event.preventDefault()}>
        Sobre
      </TransitionLink>,
    );

    await user.click(screen.getByRole("link", { name: "Sobre" }));

    expect(mocks.cover).not.toHaveBeenCalled();
    expect(mocks.push).not.toHaveBeenCalled();
  });
});
