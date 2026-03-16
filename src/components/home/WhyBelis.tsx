"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap-init";

const pillars = [
  {
    title: "Direção Personalizada",
    description:
      "Cada projeto tem um diretor dedicado do briefing à entrega. Sem fórmulas genéricas — sua marca recebe atenção exclusiva.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Comunicação Eficaz",
    description:
      "Atualizações em tempo real e acesso direto à equipe criativa. Você acompanha cada etapa sem surpresas.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Entrega Rápida",
    description:
      "Prazos que respeitam a urgência do seu negócio. Produção ágil sem sacrificar a qualidade cinematográfica.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Profissionalismo",
    description:
      "Equipamentos cinema-grade, equipe experiente e processos testados em +150 projetos entregues.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function WhyBelis() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(".why-header", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
      });

      // Image reveal
      gsap.from(".why-image", {
        scrollTrigger: { trigger: ".why-image", start: "top 80%" },
        x: -60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      // Glass cards stagger
      const cards = gsap.utils.toArray<HTMLElement>(".glass-card", sectionRef.current);
      if (cards.length) {
        gsap.fromTo(cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: { trigger: cards[0].parentElement, start: "top 85%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 z-20 overflow-hidden"
    >
      {/* Ambient glow behind section */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(116,195,101,0.06) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Image with liquid glass overlay */}
          <div className="why-image relative">
            {/* Main image */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="/images/why-belis.jpg"
                alt="Equipe Belis Agency em ação — produção audiovisual profissional"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Liquid glass overlay at bottom */}
              <div
                className="absolute inset-x-0 bottom-0 h-1/3"
                style={{
                  background: "linear-gradient(to top, rgba(5,5,8,0.9) 0%, rgba(5,5,8,0) 100%)",
                }}
              />
            </div>

            {/* Floating liquid glass stat card */}
            <div
              className="absolute -bottom-6 -right-4 sm:right-4 z-10 px-6 py-5 rounded-2xl"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                backdropFilter: "blur(24px) saturate(1.8)",
                WebkitBackdropFilter: "blur(24px) saturate(1.8)",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              <span className="text-4xl sm:text-5xl font-heading font-black text-coral tracking-tight">+150</span>
              <p className="text-cream/60 text-sm font-sans mt-1">projetos entregues<br />com excelência</p>
            </div>
          </div>

          {/* Right — Content */}
          <div>
            <span className="why-header inline-block text-xs font-sans font-bold tracking-[0.3em] uppercase text-cream/40 border border-cream/10 rounded-full px-5 py-2 mb-6">
              Por Que A Belis?
            </span>

            <h2 className="why-header text-4xl sm:text-5xl lg:text-[3.5rem] font-heading font-black tracking-tight text-cream leading-[1.05] mb-5">
              Não somos apenas uma produtora.{" "}
              <span className="text-coral">Somos o seu departamento de vídeo.</span>
            </h2>

            <p className="why-header text-cream/50 font-sans font-light text-base sm:text-lg leading-relaxed mb-10">
              Pensamos em como alavancar suas vendas com estratégias audiovisuais eficazes e comprovadas. Cada entrega é pensada para gerar resultado — não apenas "conteúdo bonito".
            </p>

            {/* Glass cards grid */}
            <div className="glass-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="glass-card group relative rounded-xl px-5 py-5 transition-all duration-500 hover:scale-[1.02]"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
                    backdropFilter: "blur(20px) saturate(1.6)",
                    WebkitBackdropFilter: "blur(20px) saturate(1.6)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
                  }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: "radial-gradient(circle at 50% 50%, rgba(116,195,101,0.08) 0%, transparent 70%)",
                    }}
                  />

                  {/* Liquid glass shine line at top */}
                  <div
                    className="absolute inset-x-0 top-0 h-px rounded-t-xl opacity-60"
                    style={{
                      background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 30%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.2) 70%, transparent 100%)",
                    }}
                  />

                  <div className="relative z-10 flex items-start gap-4">
                    {/* Icon with liquid glass circle */}
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-coral"
                      style={{
                        background: "linear-gradient(135deg, rgba(116,195,101,0.15) 0%, rgba(116,195,101,0.05) 100%)",
                        border: "1px solid rgba(116,195,101,0.2)",
                        boxShadow: "0 2px 12px rgba(116,195,101,0.1)",
                      }}
                    >
                      {pillar.icon}
                    </div>

                    <div>
                      <h3 className="text-base font-heading font-bold text-cream tracking-tight mb-1.5">
                        {pillar.title}
                      </h3>
                      <p className="text-sm font-sans text-cream/45 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
