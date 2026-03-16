"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap-init";

export function CTASection() {
  const containerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      // Find elements correctly scoped
      const words = gsap.utils.toArray<HTMLElement>(".cta-word", containerRef.current);
      
      // Clear props to prevent React StrictMode duplicates locking up
      gsap.set(words, { clearProps: "all" });

      gsap.fromTo(words, 
        { yPercent: 120, rotationZ: 5, opacity: 0 }, 
        {
          yPercent: 0,
          rotationZ: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const text = "SUA MARCA MERECE SER LEMBRADA";

  return (
    <section ref={containerRef} className="relative w-full py-32 sm:py-48 bg-coral text-navy z-20 overflow-hidden">
      <div className="w-full px-6 sm:px-12 lg:px-24 flex flex-col items-center text-center">
        
        {/* Massive Staggering Text - Fixed height box to prevent layout shift blurring */}
        <h2 className="text-[12vw] sm:text-[8vw] lg:text-[110px] font-heading font-black uppercase tracking-tighter leading-[0.85] mb-16 sm:mb-24 flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-4 max-w-[100vw]">
          {text.split(" ").map((word, i) => (
            <span key={i} className="inline-block overflow-hidden py-2 px-1">
              <span className="cta-word inline-block origin-bottom-left will-change-transform">
                {word}
              </span>
            </span>
          ))}
        </h2>
        
        {/* Constant magnetic wrapper - removed fake shadow-2xl preventing blurred bleeding */}
        <button 
          data-magnetic 
          data-magnetic-text="GO!"
          className="group relative px-10 sm:px-16 py-6 sm:py-8 overflow-hidden bg-navy text-cream font-sans font-bold uppercase tracking-widest text-sm sm:text-base outline-none cursor-pointer md:cursor-none transition-transform hover:scale-105 duration-300 rounded-sm"
        >
          <span className="relative z-10 pointer-events-none transition-colors duration-500 group-hover:text-coral">QUERO MEU ORÇAMENTO</span>
          <div className="absolute inset-0 bg-cream transform scale-y-0 origin-bottom transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-y-100 z-0"></div>
        </button>

      </div>
    </section>
  );
}
