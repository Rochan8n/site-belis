"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-init";

export function ContactInfo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Animate info lines
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".info-line", 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: "power3.out", delay: 0.5 }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col gap-12 sm:gap-16 pt-8 md:pt-0">
      <div className="info-line">
        <h3 className="font-heading font-black text-3xl sm:text-4xl text-cream tracking-tight uppercase mb-4">Contato Direto</h3>
        <p className="font-sans text-cream/70 text-lg leading-relaxed max-w-sm mb-6">
          Preencha o formulário ou entre em contato pelos nossos canais prioritários.
        </p>
        <span className="block font-sans font-bold text-coral uppercase tracking-widest text-sm py-3 border-l-2 border-coral pl-4">
          Respondemos aplicações qualificadas em até 24 horas.
        </span>
      </div>

      <div className="info-line flex flex-col gap-6">
        <h3 className="font-heading font-black text-2xl text-cream tracking-tight uppercase">Infoline</h3>
        <div className="flex flex-col gap-2 font-sans font-bold text-lg text-cream/80">
          <a href="mailto:contato@belisagency.com" className="hover:text-coral transition-colors duration-300 w-fit outline-none">
            contato@belisagency.com
          </a>
          <a href="tel:+5511999999999" className="hover:text-coral transition-colors duration-300 w-fit outline-none">
            +55 11 99999-9999
          </a>
        </div>
      </div>

      <div className="info-line flex flex-col gap-6">
        <h3 className="font-heading font-black text-2xl text-cream tracking-tight uppercase">Redes</h3>
        <ul className="flex flex-col gap-3 font-sans font-bold uppercase tracking-widest text-sm text-cream/70">
          <li>
            <a href="#instagram" data-magnetic data-magnetic-text="GO!" className="hover:text-coral transition-colors duration-300 inline-block outline-none cursor-pointer md:cursor-none">
              Instagram
            </a>
          </li>
          <li>
            <a href="#linkedin" data-magnetic data-magnetic-text="GO!" className="hover:text-coral transition-colors duration-300 inline-block outline-none cursor-pointer md:cursor-none">
              LinkedIn
            </a>
          </li>
          <li>
            <a href="#youtube" data-magnetic data-magnetic-text="GO!" className="hover:text-coral transition-colors duration-300 inline-block outline-none cursor-pointer md:cursor-none">
              YouTube
            </a>
          </li>
        </ul>
      </div>

    </div>
  );
}
