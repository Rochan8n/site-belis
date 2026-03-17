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

  const text = "ENQUANTO VOCÊ PENSA SEU CONCORRENTE FECHA";

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
        
        {/* Brutalist WhatsApp Button */}
        <a 
          href="https://wa.me/5511973138895"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-between w-full sm:w-[500px] border border-navy/20 bg-navy p-6 sm:p-8 outline-none transition-colors duration-500 overflow-hidden cursor-pointer md:cursor-none"
          data-magnetic
          data-magnetic-text="GO!"
        >
          {/* Brutalist Fill on Hover */}
          <div className="absolute inset-0 bg-cream origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100" />
          
          {/* Content */}
          <div className="relative z-10 flex flex-col items-start gap-1.5 text-left">
            <span className="font-sans text-[9px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-coral group-hover:text-navy/60 transition-colors duration-500">
              Contato Direto
            </span>
            <span className="font-heading font-black text-2xl sm:text-4xl uppercase tracking-tighter text-cream group-hover:text-navy transition-colors duration-500 whitespace-nowrap">
              WHATSAPP
            </span>
          </div>
          
          {/* Arrow */}
          <div className="relative z-10 flex items-center justify-center p-3 sm:p-4 rounded-full border border-cream/20 group-hover:border-navy/20 transition-all duration-500 group-hover:-rotate-45 group-hover:bg-navy text-cream group-hover:text-coral ml-4">
             <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
        </a>

      </div>
    </section>
  );
}
