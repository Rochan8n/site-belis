"use client";

import { useEffect, useRef } from "react";
import {
  CURTAIN_HOLD_MS,
  CURTAIN_REDUCED_HOLD_MS,
  curtain,
} from "@/components/layout/curtainController";

export default function Template({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Direct visits stay still. During route navigation, wait for destination
    // paint and approved /BELIS hold before one universal reveal.
    if (curtain.getPhase() !== "covered") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hold = reduced ? CURTAIN_REDUCED_HOLD_MS : CURTAIN_HOLD_MS;
    let innerFrame = 0;
    let timer = 0;
    const outerFrame = window.requestAnimationFrame(() => {
      innerFrame = window.requestAnimationFrame(() => {
        timer = window.setTimeout(() => curtain.reveal(), hold);
      });
    });

    return () => {
      window.cancelAnimationFrame(outerFrame);
      window.cancelAnimationFrame(innerFrame);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={wrapperRef} data-page-content>
      {children}
    </div>
  );
}
