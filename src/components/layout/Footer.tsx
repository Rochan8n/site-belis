"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap-init";

// ─── Fluid SVG Wordmark ───────────────────────────────────────────────────────
function BelisWordmark() {
  return (
    <svg
      viewBox="0 0 1440 220"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className="w-full h-auto select-none pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="50%"
        y="88%"
        textAnchor="middle"
        dominantBaseline="auto"
        fontFamily="var(--font-heading), 'Barlow Condensed', sans-serif"
        fontWeight="900"
        fontSize="200"
        letterSpacing="-6"
        fill="currentColor"
        className="uppercase"
      >
        BELIS AGENCY
      </text>
    </svg>
  );
}

const CTA_TEXT = "FALE COM A PRODUTORA QUE REALMENTE ENTENDE DE NEGÓCIOS";

export function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaWordsRef = useRef<HTMLSpanElement[]>([]);
  const ctaBtnRef = useRef<HTMLAnchorElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  const collectWord = (el: HTMLSpanElement | null, i: number) => {
    if (el) ctaWordsRef.current[i] = el;
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const words = ctaWordsRef.current;
      const btn = ctaBtnRef.current;
      const wordmark = wordmarkRef.current;
      const meta = metaRef.current;

      if (words.length) {
        gsap.set(words, { clearProps: "all" });
        gsap.fromTo(
          words,
          { yPercent: 120, rotationZ: 4, opacity: 0 },
          {
            yPercent: 0,
            rotationZ: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",
            stagger: 0.07,
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
          }
        );
      }

      if (btn) {
        gsap.set(btn, { clearProps: "all" });
        gsap.fromTo(
          btn,
          { yPercent: 50, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            delay: 0.4,
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
          }
        );
      }

      // Wordmark: slow parallax upward
      if (wordmark) {
        gsap.fromTo(
          wordmark,
          { yPercent: 25 },
          {
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom bottom",
              scrub: 1.5,
            },
          }
        );
      }

      if (meta) {
        gsap.set(meta, { clearProps: "all" });
        gsap.fromTo(
          meta,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.6,
            scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col overflow-hidden bg-coral"
    >
      {/* ── CTA zone ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 sm:px-12 lg:px-24 pt-24 sm:pt-32 pb-12">
        
        {/* Eyebrow label */}
        <span className="inline-block text-[10px] font-sans font-bold tracking-[0.3em] uppercase text-navy/50 border border-navy/20 px-5 py-2 mb-12">
          Pronto para crescer
        </span>

        {/* Massive headline */}
        <h2 className="text-[11vw] sm:text-[7.5vw] lg:text-[100px] font-heading font-black uppercase tracking-tighter leading-[0.85] mb-14 sm:mb-20 flex flex-wrap justify-center gap-x-4 sm:gap-x-5 gap-y-3 max-w-[95vw] text-center text-navy">
          {CTA_TEXT.split(" ").map((word, i) => (
            <span key={i} className="inline-block overflow-hidden py-2 px-1">
              <span
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ref={(el) => collectWord(el as any, i)}
                className="cta-word inline-block origin-bottom-left will-change-transform"
              >
                {word}
              </span>
            </span>
          ))}
        </h2>

        {/* WhatsApp CTA — dark on green */}
        <a
          ref={ctaBtnRef}
          href="https://wa.me/5511973138895"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-between w-full sm:w-[500px] bg-navy p-6 sm:p-8 outline-none transition-colors duration-500 overflow-hidden cursor-pointer md:cursor-none"
          data-magnetic
          data-magnetic-text="GO!"
        >
          {/* Cream fill on hover */}
          <div className="absolute inset-0 bg-cream origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100" />

          <div className="relative z-10 flex flex-col items-start gap-1.5 text-left">
            <span className="font-sans text-[9px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-coral group-hover:text-navy/50 transition-colors duration-500">
              Contato Direto
            </span>
            <span className="font-heading font-black text-2xl sm:text-4xl uppercase tracking-tighter text-cream group-hover:text-navy transition-colors duration-500 whitespace-nowrap">
              WHATSAPP
            </span>
          </div>

          <div className="relative z-10 flex items-center justify-center p-3 sm:p-4 border border-cream/20 group-hover:border-navy/20 transition-all duration-500 group-hover:-rotate-45 text-cream group-hover:text-coral ml-4">
            <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </a>
      </div>

      {/* ── Brand anchor zone ────────────────────────────────────────────── */}
      <div className="relative z-10 w-full flex flex-col justify-end">
        {/* Meta row — navy text on green */}
        <div
          ref={metaRef}
          className="w-full px-6 sm:px-12 lg:px-24 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8"
        >
          <div className="flex flex-row gap-8">
            <a
              href="https://www.instagram.com/belisvideo/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[10px] font-bold tracking-[0.25em] uppercase text-navy/50 hover:text-navy transition-colors duration-300 outline-none"
            >
              Instagram
            </a>
            <a
              href="mailto:Lucas@belis.agency"
              className="font-sans text-[10px] font-bold tracking-[0.25em] uppercase text-navy/50 hover:text-navy transition-colors duration-300 outline-none"
            >
              Lucas@belis.agency
            </a>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-1 text-navy/40 text-[10px] font-sans tracking-[0.2em] uppercase">
            <span>© {new Date().getFullYear()} Belis.</span>
            <span>Feito pra quem recusa o medíocre.</span>
          </div>
        </div>

        {/* Wordmark — navy on green, ultra-low opacity */}
        <div ref={wordmarkRef} className="w-full text-navy/[0.12]">
          <BelisWordmark />
        </div>
      </div>
    </footer>
  );
}
