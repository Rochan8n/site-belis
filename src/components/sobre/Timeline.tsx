"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap-init";
import clsx from "clsx";

const milestones = [
  { year: "2016", title: "O Rigor Acadêmico e Gestão", desc: "Conclusão da formação em Administração (Mackenzie) e especialização em Gestão de Engenharia da Qualidade (USP). Este período consolidou a visão de processos e eficiência operacional que hoje diferencia a entrega técnica da Belis." },
  { year: "2021", title: "Fundamentos e Mercado", desc: "Transição estratégica para o audiovisual. Início da operação focada em setores de alta complexidade, como indústria, logística e o setor automotivo, onde a precisão é mandatória." },
  { year: "2023", title: "Ativos de Performance", desc: "Consolidação da metodologia Belis. O vídeo deixa de ser uma peça criativa isolada para se tornar um ativo financeiro estratégico, focado em ROI e autoridade para médias e grandes empresas." },
  { year: "2025", title: "Inteligência e Escala", desc: "Integração de tecnologia de ponta e análise de dados. Desenvolvimento de ecossistemas de conteúdo que sustentam o posicionamento digital de profissionais de elite e marcas corporativas." },
  { year: "2026", title: "Expansão e Social Commerce", desc: "Lançamento da vertical focada em TikTok Shops e vendas em tempo real. A união definitiva entre a estética cinematográfica e a conversão direta de alta escala." },
];

export function Timeline() {
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return;
    
    const ctx = gsap.context(() => {
      // 1. Line Growth Animation - Animated Scrub from 0 to 100%
      gsap.fromTo(lineRef.current, 
        { scaleY: 0 }, 
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 1, // Smooth following 
          }
        }
      );

      // 2. Milestones Reveal Animation based on intersection
      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        const isLeft = i % 2 === 0;
        
        gsap.fromTo(item, 
          { 
            opacity: 0, 
            xPercent: isLeft ? -15 : 15,
            y: 30
          }, 
          {
            opacity: 1,
            xPercent: 0,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 60%", // Triggers when the milestone reaches 60% of viewport
              toggleActions: "play none none reverse"
            }
          }
        );
      });

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full py-32 sm:py-48 bg-cream text-navy relative overflow-hidden z-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
        
        <h2 className="text-4xl sm:text-6xl font-heading font-black text-center uppercase tracking-tight mb-32">
          Nossa <span className="text-coral">História.</span>
        </h2>

        {/* Timeline Core */}
        <div className="relative w-full max-w-4xl mx-auto flex flex-col gap-24 sm:gap-32">
          
          {/* Central Line Background Track*/}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-[2px] bg-navy/10 transform sm:-translate-x-1/2"></div>
          
          {/* Central Line Animated Fill */}
          <div 
            ref={lineRef}
            className="absolute left-[23px] sm:left-1/2 top-0 bottom-0 w-[4px] bg-coral transform sm:-translate-x-1/2 origin-top scale-y-0"
          ></div>

          {milestones.map((m, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div 
                key={i} 
                ref={(el) => { itemsRef.current[i] = el; }}
                className={clsx(
                  "relative flex flex-col sm:flex-row items-start sm:items-center w-full group",
                  isLeft ? "sm:justify-start" : "sm:justify-end"
                )}
              >
                {/* Milestone Intersection Node */}
                <div 
                  className="absolute left-[25px] sm:left-1/2 w-4 h-4 bg-navy rounded-full transform -translate-x-1/2 mt-2 sm:mt-0 transition-transform duration-500 group-hover:scale-150 group-hover:bg-coral border-[3px] border-cream z-10"
                />

                {/* Content Box */}
                <div className={clsx(
                  "pl-16 sm:pl-0 sm:w-5/12 flex flex-col gap-2",
                  isLeft ? "sm:pr-16 sm:text-right sm:items-end" : "sm:pl-16 sm:text-left sm:items-start"
                )}>
                  <span className="text-coral font-heading font-black text-5xl sm:text-7xl opacity-90">{m.year}</span>
                  <h3 className="text-xl sm:text-2xl font-bold font-sans uppercase tracking-widest">{m.title}</h3>
                  <p className="text-navy/70 font-sans text-sm sm:text-base leading-relaxed max-w-sm mt-2">{m.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
