"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-init";

export function PortfolioHero() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".char-hero", 
        { yPercent: 120, opacity: 0, rotateX: 45 }, 
        { 
          yPercent: 0, 
          opacity: 1, 
          rotateX: 0,
          stagger: 0.05, 
          duration: 1.2, 
          ease: "power4.out" 
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const text = "NOSSO ARQUIVO";

  return (
    <section ref={containerRef} className="pt-48 pb-10 sm:pb-20 w-full px-6 sm:px-12 lg:px-24 bg-navy text-cream flex flex-col justify-end min-h-[50vh] z-20 relative">
      <div className="max-w-7xl mx-auto w-full">
        <h1 className="text-6xl sm:text-8xl lg:text-[140px] font-heading font-black uppercase tracking-tighter leading-none flex flex-wrap overflow-hidden">
          {text.split("").map((char, index) => (
            <span key={index} className="inline-block overflow-hidden pb-4">
              <span className="char-hero inline-block origin-bottom will-change-transform">
                {char === " " ? "\u00A0" : char}
              </span>
            </span>
          ))}
        </h1>
        <p className="mt-8 text-cream/70 font-sans font-light text-xl max-w-xl">
          Exploração profunda da nossa engenharia de percepção visual e agressão cinematográfica.
        </p>
      </div>
    </section>
  );
}
