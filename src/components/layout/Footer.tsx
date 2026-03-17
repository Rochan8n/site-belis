"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap-init";

export function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;
    const ctx = gsap.context(() => {
      // Protect from strict mode duplication
      gsap.set(contentRef.current, { clearProps: "all" });

      gsap.fromTo(contentRef.current, 
        { yPercent: -40 }, 
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom", 
            end: "bottom bottom", 
            scrub: true,
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={containerRef} className="relative w-full overflow-hidden z-0" style={{ background: "rgba(0, 0, 0, 0.65)" }}>
      <div 
        ref={contentRef} 
        className="relative w-full flex flex-col justify-between pt-24 pb-8 px-6 sm:px-12 lg:px-24"
      >
        
        <div className="flex flex-col md:flex-row justify-between w-full max-w-7xl mx-auto items-start gap-16 md:gap-12 md:pl-12">
          
          <div className="flex flex-col gap-6 max-w-xl text-left">
            <h3 className="font-heading font-black text-6xl sm:text-[5vw] text-cream tracking-tighter leading-[0.85]">
              O FIM DA <br/><span className="text-coral">LINHA.</span>
            </h3>
            <p className="text-cream/60 font-sans font-medium text-lg leading-relaxed mt-4">
              Pronto para transformar sua marca com vídeo profissional que vende?
            </p>
            <a 
              href="mailto:Lucas@belis.agency" 
              className="text-coral font-bold font-sans tracking-widest text-sm uppercase mt-6 hover:text-white transition-colors duration-300 w-fit outline-none"
            >
              Lucas@belis.agency
            </a>
          </div>
          
          <div className="flex flex-col items-start md:items-end gap-6 sm:pr-4 lg:pr-12 w-full md:w-auto mt-12 md:mt-0">
            <a 
              href="https://wa.me/5511973138895"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-between w-full md:w-[340px] border border-cream/10 bg-[#050508] p-6 sm:p-8 outline-none transition-colors duration-500 overflow-hidden"
            >
              {/* Brutalist Fill on Hover */}
              <div className="absolute inset-0 bg-coral origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100" />
              
              {/* Content */}
              <div className="relative z-10 flex flex-col items-start gap-1.5 md:items-end md:text-right">
                <span className="font-sans text-[9px] font-bold tracking-[0.25em] uppercase text-coral group-hover:text-navy/60 transition-colors duration-500">
                  Contato Ágil
                </span>
                <span className="font-heading font-black text-2xl uppercase tracking-tighter text-cream group-hover:text-navy transition-colors duration-500 whitespace-nowrap">
                  CHAMAR WHATSAPP
                </span>
              </div>
              
              {/* Arrow */}
              <div className="relative z-10 flex items-center justify-center p-3 rounded-full border border-cream/10 group-hover:border-navy/20 transition-all duration-500 group-hover:-rotate-45 group-hover:bg-navy text-cream group-hover:text-coral md:order-first">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </a>
            
            <a href="https://www.instagram.com/belisvideo/" target="_blank" rel="noopener noreferrer" className="font-sans tracking-[0.2em] text-[10px] sm:text-xs font-bold uppercase text-cream/40 hover:text-coral transition-colors duration-300 outline-none">
              Siga no Instagram
            </a>
          </div>

        </div>
        
        {/* Background Pattern - Fixed duplicate blur overlap */}
        <div className="w-full mt-32 flex items-end justify-center overflow-hidden mix-blend-screen pointer-events-none select-none">
          <h1 className="text-[12vw] sm:text-[14vw] leading-[0.8] font-heading font-black text-cream uppercase opacity-5 whitespace-nowrap">
            Belis Agency
          </h1>
        </div>
        
        {/* Bottom Bar */}
        <div className="w-full mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-cream/30 text-[10px] sm:text-xs font-sans tracking-[0.2em] uppercase pt-8 border-t border-cream/10 mt-8">
          <span>&copy; {new Date().getFullYear()} Belis.</span>
          <span>Feito pra quem recusa o medíocre.</span>
        </div>

      </div>
    </footer>
  );
}
