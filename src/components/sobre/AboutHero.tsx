"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap-init";

export function AboutHero() {
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      // Parallax Background Effect
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      // Split Text Stagger Reveal
      gsap.fromTo(
        ".char-hero-about", 
        { yPercent: 120, opacity: 0, rotationZ: 5 }, 
        { 
          yPercent: 0, 
          opacity: 1, 
          rotationZ: 0,
          stagger: 0.04, 
          duration: 1.2, 
          ease: "power4.out" 
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const text = "NÃO SEGUIMOS TENDÊNCIAS. NÓS AS CRIAMOS.";

  return (
    <section ref={containerRef} className="relative w-full h-[80vh] sm:h-screen flex items-center justify-center overflow-hidden bg-navy z-10">
      
      {/* Parallax Background */}
      <div className="absolute inset-0 w-full h-[130%] -top-[15%]" ref={bgRef}>
        <Image
          src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=2000"
          alt="Studio Background"
          fill
          className="object-cover opacity-20 grayscale"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-navy/60 mix-blend-multiply" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 mx-auto w-full flex flex-col justify-end h-full pt-32 pb-16 sm:pb-24">
        <h1 className="text-[12vw] font-heading font-black text-cream mix-blend-difference uppercase tracking-tighter leading-[0.85] w-full flex flex-wrap gap-x-3 sm:gap-x-6 gap-y-2 px-6 sm:px-12 lg:px-24">
          {text.split(" ").map((word, i) => (
            <span key={i} className="inline-block overflow-hidden pb-4 sm:-mb-4">
              <span className="char-hero-about inline-block origin-bottom-left will-change-transform">
                {word}
              </span>
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
}
