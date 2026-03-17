"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-init";

export function PortfolioHero() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      // Reveal both title lines from below
      gsap.fromTo(
        ".hero-char",
        { yPercent: 110 },
        {
          yPercent: 0,
          stagger: 0.15,
          duration: 1.1,
          ease: "power4.out",
          delay: 0.3,
        }
      );
      // Subtitle fade
      gsap.fromTo(
        ".hero-sub",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.7 }
      );
      // Scroll indicator pulse
      gsap.to(".scroll-line", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.2,
        ease: "power2.inOut",
        repeat: -1,
        delay: 1.5,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const titleLine1 = "NOSSO";
  const titleLine2 = "ARQUIVO";

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[600px] overflow-hidden bg-navy flex flex-col"
    >
      {/* YouTube Embed — fullscreen background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-navy/70 z-10" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-navy to-transparent z-20" />

        <iframe
          ref={videoRef}
          src="https://www.youtube.com/embed/abG_KLFMwCY?autoplay=1&mute=1&loop=1&playlist=abG_KLFMwCY&controls=0&showinfo=0&rel=0&modestbranding=1&enablejsapi=1&origin=http://localhost:3000&playsinline=1"
          className="absolute w-[150vw] h-[150vh] -top-[25vh] -left-[25vw] border-0"
          allow="autoplay; encrypted-media"
          title="Belis Showreel"
        />
      </div>

      {/* Content — layered on top */}
      <div className="relative z-30 flex flex-col justify-end h-full px-6 sm:px-12 lg:px-24 pb-12 sm:pb-20 w-full">
        {/* Title */}
        <div className="overflow-hidden mb-2">
          <h1 className="font-heading font-black uppercase tracking-tighter leading-[0.85] overflow-hidden">
            {/* Line 1 — cream */}
            <div className="overflow-hidden">
              <div className="hero-char flex will-change-transform">
                {titleLine1.split("").map((char, i) => (
                  <span key={i} className="text-[15vw] sm:text-[13vw] lg:text-[11vw] text-cream">
                    {char}
                  </span>
                ))}
              </div>
            </div>
            {/* Line 2 — coral accent, offset right */}
            <div className="overflow-hidden flex justify-end">
              <div className="hero-char flex will-change-transform">
                {titleLine2.split("").map((char, i) => (
                  <span key={i} className="text-[15vw] sm:text-[13vw] lg:text-[11vw] text-coral">
                    {char}
                  </span>
                ))}
              </div>
            </div>
          </h1>
        </div>

        {/* Subtitle + scroll */}
        <div className="hero-sub flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mt-6">
          <p className="text-cream/60 font-sans font-light text-base sm:text-lg max-w-md leading-relaxed">
            Aqui você não encontra apenas vídeos. Você encontra soluções de negócio 
            traduzidas em imagem e som.
          </p>
          {/* Scroll indicator */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <span className="text-cream/30 font-sans text-[10px] tracking-[0.25em] uppercase">
              Scroll
            </span>
            <div className="w-px h-10 bg-cream/20 relative overflow-hidden">
              <div className="scroll-line absolute inset-0 bg-coral origin-top" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
