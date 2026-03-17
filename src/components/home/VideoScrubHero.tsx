"use client";

import { useRef, useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const TOTAL_FRAMES = 192;
const BATCH_SIZE = 24;
const FRAME_PATH = (i: number) =>
  `/frames/frame_${String(i).padStart(4, "0")}.jpg`;

function loadBatch(
  images: HTMLImageElement[],
  start: number,
  end: number
): Promise<void> {
  return new Promise((resolve) => {
    let loaded = 0;
    const count = end - start;
    for (let i = start; i < end; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i + 1);
      img.onload = img.onerror = () => {
        images[i] = img;
        if (++loaded === count) resolve();
      };
    }
  });
}

function preloadFrames(
  onFirstBatch: (images: HTMLImageElement[]) => void
): HTMLImageElement[] {
  const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

  loadBatch(images, 0, BATCH_SIZE).then(() => {
    onFirstBatch(images);

    let nextStart = BATCH_SIZE;
    const loadNext = () => {
      if (nextStart >= TOTAL_FRAMES) return;
      const end = Math.min(nextStart + BATCH_SIZE, TOTAL_FRAMES);
      loadBatch(images, nextStart, end).then(() => {
        nextStart = end;
        if (typeof requestIdleCallback !== "undefined") {
          requestIdleCallback(loadNext);
        } else {
          setTimeout(loadNext, 100);
        }
      });
    };

    if (typeof requestIdleCallback !== "undefined") {
      requestIdleCallback(loadNext);
    } else {
      setTimeout(loadNext, 100);
    }
  });

  return images;
}

/* ── Card data ── */
const CARDS = [
  { title: "Vídeo Institucional",        category: "Narrativa de Marca",   result: "Posicionamento de mercado em alto nível" },
  { title: "Campanha de Lançamento",     category: "Vendas · Conversão",   result: "Lançamentos com viabilidade e retorno financeiro" },
  { title: "Conteúdo Premium Recorrente", category: "Consistência Visual", result: "Presença digital que funciona como vitrine de vendas" },
  { title: "Identidade em Motion",       category: "Branding Audiovisual", result: "Identidade visual que transmite autoridade imediata" },
  { title: "Funil de Vendas Visual",     category: "Performance Digital",  result: "Jornada de compra assistida por conteúdo estratégico" },
  { title: "Showreel de Marca",          category: "Percepção Premium",    result: "Produção audiovisual com acabamento cinematográfico" },
];

/* Desktop: 3 left, 3 right, scattered */
const CARD_POSITIONS_DESKTOP = [
  { x: "4%",  y: "12%", rotX: 18, rotY: 25,  rotZ: -4  },
  { x: "8%",  y: "42%", rotX: -12, rotY: 20,  rotZ: 6   },
  { x: "2%",  y: "68%", rotX: 15, rotY: -18, rotZ: -8  },
  { x: "62%", y: "8%",  rotX: -20, rotY: -22, rotZ: 5   },
  { x: "66%", y: "48%", rotX: 14, rotY: -28, rotZ: -3  },
  { x: "58%", y: "72%", rotX: -16, rotY: 20,  rotZ: 7   },
];

/* Mobile: alternating left/right, stacked vertically */
const CARD_POSITIONS_MOBILE = [
  { x: "3%",  y: "2%",  rotX: 10, rotY: 12,  rotZ: -2  },
  { x: "42%", y: "18%", rotX: -8,  rotY: -10, rotZ: 3   },
  { x: "5%",  y: "34%", rotX: 8,  rotY: 14,  rotZ: -4  },
  { x: "40%", y: "50%", rotX: -10, rotY: -12, rotZ: 2   },
  { x: "3%",  y: "66%", rotX: 12, rotY: 10,  rotZ: -3  },
  { x: "44%", y: "80%", rotX: -8,  rotY: -14, rotZ: 4   },
];

export function VideoScrubHero() {
  const outerRef   = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const labelRef   = useRef<HTMLParagraphElement>(null);
  const headRef    = useRef<HTMLHeadingElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const scrollRef  = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);

  const [loaded, setLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { lenis } = useSmoothScroll();

  /* ── Detect mobile ── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ── 1. Preload frames ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const images = preloadFrames((loadedImages) => {
      setLoaded(true);
      const ctx = canvas.getContext("2d");
      if (ctx && loadedImages[0]) {
        canvas.width  = loadedImages[0].naturalWidth;
        canvas.height = loadedImages[0].naturalHeight;
        ctx.drawImage(loadedImages[0], 0, 0);
      }
    });

    (canvas as HTMLCanvasElement & { _frames?: HTMLImageElement[] })._frames = images;
  }, []);

  /* ── 2. Scrub via Lenis ── */
  useEffect(() => {
    const outer  = outerRef.current;
    const canvas = canvasRef.current as (HTMLCanvasElement & { _frames?: HTMLImageElement[] }) | null;
    if (!outer || !canvas || !lenis) return;

    let lastFrame = -1;

    const onScroll = ({ scroll }: { scroll: number }) => {
      const frames = canvas._frames;
      if (!frames || frames.length === 0) return;

      const outerTop   = outer.offsetTop;
      const scrollZone = outer.offsetHeight - window.innerHeight;
      if (scrollZone <= 0) return;

      const progress   = Math.max(0, Math.min(1, (scroll - outerTop) / scrollZone));
      const frameIndex = Math.round(progress * (frames.length - 1));

      if (frameIndex === lastFrame) return;
      lastFrame = frameIndex;

      const ctx = canvas.getContext("2d");
      const img = frames[frameIndex];
      if (ctx && img?.complete) {
        ctx.drawImage(img, 0, 0);
      }
    };

    lenis.on("scroll", onScroll);
    return () => lenis.off("scroll", onScroll);
  }, [lenis]);

  /* ── 3. Text fade-out + cards scroll-in animations ── */
  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    // Hero text fade-out (same as before)
    gsap.timeline({
      scrollTrigger: { trigger: outer, start: "top top", end: "40% bottom", scrub: true },
    })
      .to(labelRef.current,  { opacity: 0, y: -24, duration: 0.25 }, 0)
      .to(headRef.current,   { opacity: 0, y: -60, duration: 0.45 }, 0.05)
      .to(subRef.current,    { opacity: 0, y: -30, duration: 0.35 }, 0.12)
      .to(ctaRef.current,    { opacity: 0, y: -20, duration: 0.3  }, 0.18)
      .to(scrollRef.current, { opacity: 0, duration: 0.15         }, 0);

    // Overlay darken
    gsap.fromTo(overlayRef.current,
      { opacity: 0.1 },
      { opacity: 0.55, ease: "none",
        scrollTrigger: { trigger: outer, start: "top top", end: "bottom bottom", scrub: true },
      }
    );

    // Cards container fade-in — starts right after CTA fades
    gsap.fromTo(cardsContainerRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: outer,
          start: "18% top",
          end: "28% top",
          scrub: true,
        },
      }
    );

    // Each card: single continuous timeline (entrance → drift) to avoid overlap stutter
    const mobile = window.innerWidth < 768;
    const positions = mobile ? CARD_POSITIONS_MOBILE : CARD_POSITIONS_DESKTOP;

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const pos = positions[i];
      const stagger = i * (mobile ? 0.02 : 0.03);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outer,
          start: `${20 + stagger * 100}% top`,
          end: "92% top",
          scrub: 1,
        },
      });

      // Phase 1: entrance (0 → 0.5 of timeline)
      tl.fromTo(card,
        {
          y: mobile ? 60 : 120,
          rotateX: pos.rotX * 2,
          rotateY: pos.rotY * 2,
          rotateZ: pos.rotZ * 1.5,
          scale: 0.7,
          filter: "blur(8px)",
          opacity: 0,
        },
        {
          y: 0,
          rotateX: pos.rotX,
          rotateY: pos.rotY,
          rotateZ: pos.rotZ,
          scale: 1,
          filter: "blur(0.3px)",
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        }
      );

      // Phase 2: gentle drift (0.5 → 1.0 of timeline, no overlap)
      tl.to(card, {
        rotateX: pos.rotX + (mobile ? 4 : 8),
        rotateY: pos.rotY - (mobile ? 3 : 6),
        rotateZ: pos.rotZ + 2,
        y: mobile ? -15 : -30,
        duration: 0.5,
        ease: "none",
      });
    });

    return () => {
      ScrollTrigger.getAll()
        .filter((st) => st.vars?.trigger === outer)
        .forEach((st) => st.kill());
    };
  }, []);

  return (
    <div ref={outerRef} style={{ height: "400vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050508]">

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.4s" }}
        />

        {/* Poster while loading */}
        {!loaded && (
          <img
            src="/frames/frame_0001.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Gradients */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#050508]/80 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#050508] to-transparent pointer-events-none" />
        <div ref={overlayRef} className="absolute inset-0 bg-[#050508] pointer-events-none" style={{ opacity: 0.1 }} />

        {/* Text backdrop for readability */}
        <div className="absolute inset-0 pointer-events-none z-[1]"
             style={{ background: 'radial-gradient(ellipse 80% 75% at 50% 48%, rgba(5,5,8,0.75) 0%, rgba(5,5,8,0.35) 50%, transparent 80%)' }} />

        {/* Hero text content */}
        <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center px-6 text-center">
          <p ref={labelRef} className="font-sans text-[9px] sm:text-[10px] font-bold tracking-[0.55em] uppercase text-cream/50 mb-5 sm:mb-7">
            Belis Agency
          </p>
          <h1 ref={headRef} className="font-heading font-black uppercase tracking-tighter leading-[0.82] text-cream" style={{ fontSize: "clamp(3rem, 11vw, 9rem)" }}>
            Vídeos Que<br /><span className="text-coral">Vendem.</span>
          </h1>
          <p ref={subRef} className="mt-5 sm:mt-7 font-sans text-[13px] sm:text-base text-cream/90 max-w-[320px] sm:max-w-lg leading-relaxed text-center">
            Estratégia audiovisual com mentalidade de performance.<br className="hidden sm:block" /> Desenvolvemos ativos em vídeo que sustentam seu posicionamento e aceleram a conversão.
          </p>
          <div ref={ctaRef} className="mt-9 sm:mt-11">
            <a href="/contato" className="group inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 border border-coral/70 text-coral font-sans font-bold uppercase tracking-[0.2em] text-xs sm:text-sm hover:bg-coral hover:text-navy hover:border-coral transition-colors duration-300">
              Iniciar Projeto
              <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>

        {/* 3D Floating Cards — O QUE ENTREGAMOS */}
        <div
          ref={cardsContainerRef}
          className="absolute inset-0 pointer-events-none"
          style={{ perspective: "1200px", opacity: 0 }}
        >
          {CARDS.map((card, i) => {
            const positions = isMobile ? CARD_POSITIONS_MOBILE : CARD_POSITIONS_DESKTOP;
            return (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="absolute pointer-events-auto"
              style={{
                left: positions[i].x,
                top: positions[i].y,
                width: isMobile ? "55vw" : "clamp(240px, 36vw, 408px)",
                transformStyle: "preserve-3d",
                willChange: "transform, filter",
              }}
            >
              <div className="bg-[#050508]/70 backdrop-blur-md border border-cream/[0.12] rounded-2xl p-6 sm:p-7 shadow-2xl shadow-black/40 cursor-default">
                <p className="text-[11px] uppercase tracking-[0.3em] text-coral font-sans font-bold mb-2.5">
                  {card.category}
                </p>
                <h3 className="text-lg sm:text-xl font-heading font-bold text-cream leading-tight mb-2.5">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-cream/60 font-sans leading-relaxed">
                  {card.result}
                </p>
              </div>
            </div>
          );
          })}
        </div>

        {/* Scroll indicator */}
        <div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5">
          <p className="font-sans text-[8px] tracking-[0.5em] uppercase text-cream/25">scroll</p>
          <div className="w-px h-12 bg-gradient-to-b from-cream/30 to-transparent relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-cream/60 animate-[scrollLine_2s_ease-in-out_infinite]" />
          </div>
        </div>

      </div>
    </div>
  );
}
