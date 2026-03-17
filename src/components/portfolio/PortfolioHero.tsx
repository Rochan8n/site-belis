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
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Global dim */}
        <div className="absolute inset-0 bg-navy/55 z-10" />
        {/* Heavy gradient at the bottom — readable text area */}
        <div className="absolute inset-x-0 bottom-0 h-[75%] bg-gradient-to-t from-navy via-navy/80 to-transparent z-20" />

        {/* iframe — covers viewport at any aspect ratio */}
        <iframe
          ref={videoRef}
          src={`https://www.youtube.com/embed/abG_KLFMwCY?autoplay=1&mute=1&loop=1&playlist=abG_KLFMwCY&controls=0&showinfo=0&rel=0&modestbranding=1&enablejsapi=1&origin=${process.env.NEXT_PUBLIC_SITE_URL ?? "https://belisagency.com"}&playsinline=1`}
          allow="autoplay; encrypted-media"
          title="Belis Showreel"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "max(100vw, calc(100vh * 1.7778))",
            height: "max(100vh, calc(100vw * 0.5625))",
            border: "none",
            pointerEvents: "none",
          }}
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
