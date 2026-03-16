"use client";

import { useEffect } from "react";
import { usePageTransition } from "@/components/layout/PageTransition";

export default function Template({ children }: { children: React.ReactNode }) {
  const { animateIn } = usePageTransition();

  useEffect(() => {
    // Reset scroll to top
    window.scrollTo(0, 0);
    // Reveal the new page (curtain enter animation)
    animateIn();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <>{children}</>;
}
