"use client";

import { useEffect } from "react";
import { usePageTransition } from "@/components/layout/PageTransition";

export default function Template({ children }: { children: React.ReactNode }) {
  const { animateIn } = usePageTransition();

  useEffect(() => {
    // Reset scroll to top
    window.scrollTo(0, 0);
    // Trigger the enter animation (page slides up, blobs drift out)
    animateIn();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div data-page-content style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
