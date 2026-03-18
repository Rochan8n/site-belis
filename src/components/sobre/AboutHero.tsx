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

  const text = "Estratégia Audiovisual com Rigor de Engenharia e Visão de Negócios.";

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
      <div className="relative z-10 mx-auto w-full flex flex-col justify-end h-full pt-32 pb-16 sm:pb-24 gap-6">
        <h1 className="text-[7vw] font-heading font-black text-cream mix-blend-difference uppercase tracking-tighter leading-[0.9] w-full flex flex-wrap gap-x-3 sm:gap-x-5 gap-y-2 px-6 sm:px-12 lg:px-24">
          {text.split(" ").map((word, i) => (
            <span key={i} className="inline-block overflow-hidden pt-3 -mt-3 pb-4 sm:-mb-4">
              <span className="char-hero-about inline-block origin-bottom-left will-change-transform">
                {word}
              </span>
            </span>
          ))}
        </h1>
        <p className="text-cream/70 text-base sm:text-lg lg:text-xl font-body max-w-3xl px-6 sm:px-12 lg:px-24 leading-relaxed">
          A Belis não nasceu apenas para filmar. Nasceu para transformar inteligência de mercado em ativos de vídeo que sustentam o crescimento de grandes marcas e profissionais de elite.
        </p>
      </div>
    </section>
  );
}
