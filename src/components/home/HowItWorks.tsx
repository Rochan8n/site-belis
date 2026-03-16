"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";

const steps = [
  {
    number: "01",
    title: "Briefing Estratégico",
    description:
      "Entendemos seu negócio, objetivo e público-alvo. Nada de fórmula pronta — cada projeto começa com estratégia.",
  },
  {
    number: "02",
    title: "Roteiro + Planejamento",
    description:
      "Criamos o roteiro focado em conversão, com storyboard e cronograma definidos antes de ligar a câmera.",
  },
  {
    number: "03",
    title: "Produção Premium",
    description:
      "Filmagem com equipamento cinema-grade, direção criativa dedicada e equipe profissional no set.",
  },
  {
    number: "04",
    title: "Edição Cinematográfica",
    description:
      "Pós-produção com color grading, motion graphics e trilha sonora. Padrão de excelência em cada frame.",
  },
  {
    number: "05",
    title: "Entrega + Otimização",
    description:
      "Entregamos editado e otimizado para cada plataforma — Instagram, YouTube, site, ads. Pronto pra vender.",
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;

      // Calculate how far we need to scroll horizontally
      const getScrollAmount = () => track.scrollWidth - window.innerWidth;

      // Horizontal scroll driven by vertical scrolling (pinned)
      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Animated line fill (scaleX grows as we scroll)
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${getScrollAmount()}`,
              scrub: 1,
            },
          }
        );
      }

      // Each item fades in as it enters viewport
      itemsRef.current.forEach((item) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              containerAnimation: tween,
              start: "left 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Refresh on resize
      ScrollTrigger.addEventListener("refreshInit", () => {
        gsap.set(track, { x: 0 });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full z-20 overflow-hidden bg-[#050508]"
    >
      {/* Horizontal scrolling track */}
      <div
        ref={trackRef}
        className="flex items-center h-screen will-change-transform"
        style={{ width: `${steps.length * 45 + 30}vw` }}
      >
        {/* Header (first panel) */}
        <div className="flex-shrink-0 w-[40vw] sm:w-[35vw] h-full flex flex-col justify-center px-8 sm:px-16 lg:px-24">
          <span className="inline-block text-xs font-sans font-bold tracking-[0.3em] uppercase text-cream/40 border border-cream/10 rounded-full px-5 py-2 mb-6 w-fit">
            Como Funciona
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight text-cream leading-[1.05]">
            Do briefing à entrega.{" "}
            <span className="text-coral">Simples, rápido e premium.</span>
          </h2>
          <p className="mt-5 text-cream/50 font-sans font-light text-sm sm:text-lg leading-relaxed max-w-md">
            Nosso processo foi desenhado pra você focar no seu negócio enquanto
            a gente cuida de tudo.
          </p>
        </div>

        {/* Timeline area */}
        <div className="relative flex-shrink-0 flex items-center" style={{ width: `${steps.length * 40}vw`, paddingRight: "10vw" }}>
          {/* Horizontal line — background track */}
          <div
            className="absolute left-0 right-0 h-[2px] bg-cream/10"
            style={{ top: "50%" }}
          />
          {/* Horizontal line — animated coral fill */}
          <div
            ref={lineRef}
            className="absolute left-0 right-0 h-[4px] bg-coral origin-left scale-x-0"
            style={{ top: "calc(50% - 1px)" }}
          />

          {/* Steps */}
          <div className="relative flex w-full">
            {steps.map((step, i) => {
              const isTop = i % 2 === 0;
              return (
                <div
                  key={step.number}
                  ref={(el) => { itemsRef.current[i] = el; }}
                  className="flex-1 relative flex flex-col items-center"
                >
                  {/* Content — alternates above/below the line */}
                  <div
                    className={`flex flex-col items-center text-center px-4 sm:px-6 ${
                      isTop
                        ? "absolute bottom-[calc(50%+28px)]"
                        : "absolute top-[calc(50%+28px)]"
                    }`}
                  >
                    <span className="text-coral font-heading font-black text-5xl sm:text-7xl opacity-90">
                      {step.number}
                    </span>
                    <h3 className="text-lg sm:text-2xl font-bold font-sans uppercase tracking-widest text-cream mt-2">
                      {step.title}
                    </h3>
                    <p className="text-cream/50 font-sans text-xs sm:text-sm leading-relaxed max-w-[240px] mt-2">
                      {step.description}
                    </p>
                  </div>

                  {/* Node dot on the line */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-cream rounded-full border-[3px] border-[#050508] z-10 transition-transform duration-500 hover:scale-150 hover:bg-coral"
                    style={{ top: "calc(50% - 8px)" }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
