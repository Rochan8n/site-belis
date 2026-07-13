"use client";

import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import {
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
  useCallback,
} from "react";
import { curtain } from "./curtainController";

type TransitionLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
  children: ReactNode;
};

export function TransitionLink({
  href,
  children,
  className,
  onClick,
  replace,
  scroll,
  ...rest
}: TransitionLinkProps) {
  const router = useRouter();

  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      const anchor = e.currentTarget;
      if (
        anchor.hasAttribute("download") ||
        (anchor.target && anchor.target !== "_self") ||
        anchor.relList.contains("external")
      ) {
        return;
      }

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      // External protocols, downloads, modifier clicks, anchors and same-route
      // query changes retain native/Next.js behavior.
      if (
        url.origin !== window.location.origin ||
        url.pathname === window.location.pathname
      ) {
        return;
      }

      e.preventDefault();
      const destination = `${url.pathname}${url.search}${url.hash}`;
      void curtain.cover(destination).then((started) => {
        if (!started) return;
        const options = scroll === undefined ? undefined : { scroll };
        if (replace) router.replace(destination, options);
        else router.push(destination, options);
      });
    },
    [onClick, replace, router, scroll],
  );

  return (
    <Link
      href={href}
      className={className}
      onClick={handleClick}
      replace={replace}
      scroll={scroll}
      {...rest}
      data-transition-link
    >
      {children}
    </Link>
  );
}
