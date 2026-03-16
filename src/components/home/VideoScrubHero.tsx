"use client";

import { useRef, useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

/**
 * CanvasScrubHero
 * ────────────────────────────────────────────────────
 * 192 frames JPEG pré-carregados em Image objects.
 * Canvas desenha o frame correspondente ao scroll —
 * idêntico ao que a Apple faz. Zero video seek, 60fps.
 *
 * Frames em: /public/frames/frame_XXXX.jpg  (0001–0192)
 */

const TOTAL_FRAMES = 192;
const BATCH_SIZE = 24;
const FRAME_PATH = (i: number) =>
  `/frames/frame_${String(i).padStart(4, "0")}.jpg`;

/**
 * Loads a single batch of frames (e.g. frames 0-23, 24-47, etc.)
 */
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

/**
 * Progressive frame loader — loads first batch immediately,
 * then remaining batches during idle time to avoid blocking
 * the initial page load with 192 simultaneous HTTP requests.
 */
function preloadFrames(
  onFirstBatch: (images: HTMLImageElement[]) => void
): HTMLImageElement[] {
  const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

  // Load first batch immediately (visible hero frames)
  loadBatch(images, 0, BATCH_SIZE).then(() => {
    onFirstBatch(images);

    // Load remaining batches during idle time
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

export function VideoScrubHero() {
  const outerRef   = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const labelRef   = useRef<HTMLParagraphElement>(null);
  const headRef    = useRef<HTMLHeadingElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const scrollRef  = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [loaded, setLoaded] = useState(false);
  const { lenis } = useSmoothScroll();

  /* ── 1. Pré-carrega frames progressivamente ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const images = preloadFrames((loadedImages) => {
      setLoaded(true);

      // Desenha o primeiro frame imediatamente
      const ctx = canvas.getContext("2d");
      if (ctx && loadedImages[0]) {
        canvas.width  = loadedImages[0].naturalWidth;
        canvas.height = loadedImages[0].naturalHeight;
        ctx.drawImage(loadedImages[0], 0, 0);
      }
    });

    // Guarda referência para uso no scroll (atualiza conforme batches carregam)
    (canvas as HTMLCanvasElement & { _frames?: HTMLImageElement[] })._frames = images;
  }, []);

  /* ── 2. Scrub via Lenis direto ── */
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

      if (frameIndex === lastFrame) return; // sem mudança → não redraw
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

  /* ── 3. Animações de texto ── */
  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    gsap.timeline({
      scrollTrigger: { trigger: outer, start: "top top", end: "40% bottom", scrub: true },
    })
      .to(labelRef.current,  { opacity: 0, y: -24, duration: 0.25 }, 0)
      .to(headRef.current,   { opacity: 0, y: -60, duration: 0.45 }, 0.05)
      .to(subRef.current,    { opacity: 0, y: -30, duration: 0.35 }, 0.12)
      .to(ctaRef.current,    { opacity: 0, y: -20, duration: 0.3  }, 0.18)
      .to(scrollRef.current, { opacity: 0, duration: 0.15         }, 0);

    gsap.fromTo(overlayRef.current,
      { opacity: 0.1 },
      { opacity: 0.55, ease: "none",
        scrollTrigger: { trigger: outer, start: "top top", end: "bottom bottom", scrub: true },
      }
    );

    return () => {
      ScrollTrigger.getAll()
        .filter((st) => st.vars?.trigger === outer)
        .forEach((st) => st.kill());
    };
  }, []);

  return (
    <div ref={outerRef} style={{ height: "400vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050508]">

        {/* Canvas — substitui o <video> */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.4s" }}
        />

        {/* Poster enquanto carrega */}
        {!loaded && (
          <img
            src="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1280&auto=format&fit=crop"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Gradientes */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#050508]/80 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#050508] to-transparent pointer-events-none" />
        <div ref={overlayRef} className="absolute inset-0 bg-[#050508] pointer-events-none" style={{ opacity: 0.1 }} />

        {/* Conteúdo */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p ref={labelRef} className="font-sans text-[9px] sm:text-[10px] font-bold tracking-[0.55em] uppercase text-cream/50 mb-5 sm:mb-7">
            Belis Agency
          </p>
          <h1 ref={headRef} className="font-heading font-black uppercase tracking-tighter leading-[0.82] text-cream" style={{ fontSize: "clamp(3.5rem, 13vw, 11rem)" }}>
            Impacto<br /><span className="text-coral">Digital.</span>
          </h1>
          <p ref={subRef} className="mt-5 sm:mt-7 font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-cream/40 max-w-[260px] sm:max-w-sm leading-relaxed">
            Produção Audiovisual · Marketing · Vendas
          </p>
          <div ref={ctaRef} className="mt-9 sm:mt-11">
            <a href="/contato" className="group inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 border border-coral/70 text-coral font-sans font-bold uppercase tracking-[0.2em] text-xs sm:text-sm hover:bg-coral hover:text-navy hover:border-coral transition-colors duration-300">
              Iniciar Projeto
              <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
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
