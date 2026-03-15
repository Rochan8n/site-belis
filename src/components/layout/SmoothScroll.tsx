"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";
import { LenisContext } from "@/hooks/useSmoothScroll";

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenisInstance = new Lenis({
      autoRaf: false,   // driven pelo GSAP ticker
      lerp: 0.12,       // levemente mais rápido que 0.1 — scroll responsivo
      wheelMultiplier: 1.2,
    });

    // Make setLenis async to prevent synchronous setState in effect linter warnings
    setTimeout(() => {
      setLenis(lenisInstance);
    }, 0);

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenisInstance.on("scroll", ScrollTrigger.update);

    // Provide GSAP's ticker to manually drive Lenis requestAnimationFrame
    const updateLenis = (time: number) => {
      lenisInstance.raf(time * 1000);
    };
    
    gsap.ticker.add(updateLenis);

    // Prevent any lag smoothing which may interfere with scrolling syncing
    gsap.ticker.lagSmoothing(0);

    return () => {
      // Cleanup on unmount
      gsap.ticker.remove(updateLenis);
      lenisInstance.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
};
