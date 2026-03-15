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
              Pronto para dominar o seu mercado com estética brutalista e engenharia ultrarrápida de precisão?
            </p>
            <a 
              href="mailto:contato@belisagency.com" 
              className="text-coral font-bold font-sans tracking-widest text-sm uppercase mt-6 hover:text-white transition-colors duration-300 w-fit outline-none"
            >
              contato@belisagency.com
            </a>
          </div>
          
          <ul className="flex flex-col gap-6 text-left md:text-right font-sans tracking-[0.2em] text-xs font-bold uppercase text-cream/70 sm:pr-12 lg:pr-24">
            <li><a href="#instagram" className="hover:text-coral transition-colors duration-300 outline-none">Instagram</a></li>
            <li><a href="#linkedin" className="hover:text-coral transition-colors duration-300 outline-none">LinkedIn</a></li>
            <li><a href="#dribbble" className="hover:text-coral transition-colors duration-300 outline-none">Dribbble</a></li>
            <li><a href="#behance" className="hover:text-coral transition-colors duration-300 outline-none">Behance</a></li>
          </ul>

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
          <span>Designed with hate for the average.</span>
        </div>

      </div>
    </footer>
  );
}
