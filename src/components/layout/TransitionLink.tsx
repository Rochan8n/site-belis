"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, type MouseEvent, useCallback } from "react";
import { usePageTransition } from "./PageTransition";

interface TransitionLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function TransitionLink({
  href,
  children,
  className,
  onClick,
  ...rest
}: TransitionLinkProps) {
  const pathname = usePathname();
  const { triggerTransition } = usePageTransition();

  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      const target = typeof href === "string" ? href : href.pathname ?? "";

      // Let external links, anchors, and mailto behave normally
      if (
        target.startsWith("http") ||
        target.startsWith("mailto:") ||
        target.startsWith("#")
      ) {
        return;
      }

      // Skip if same page
      if (target === pathname) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      onClick?.(); // e.g. close mobile drawer
      triggerTransition(target);
    },
    [href, pathname, triggerTransition, onClick]
  );

  return (
    <Link href={href} className={className} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
