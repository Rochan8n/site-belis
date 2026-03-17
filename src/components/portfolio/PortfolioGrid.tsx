"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap-init";

// ─── Types ───────────────────────────────────────────────────────────────────

interface VideoItem {
  id: number;
  title: string;
  category: string;
  thumb: string;
  youtubeId?: string;
  aspect: "9/16" | "16/9";
  label?: string; // e.g. "Live Now"
}

interface PhotoItem {
  id: number;
  src: string;
  alt: string;
}

// ─── WhatsApp CTA ─────────────────────────────────────────────────────────────

function WhatsAppCTA({ message }: { message: string }) {
  const encoded = encodeURIComponent(message);
  return (
    <a
      href={`https://wa.me/5511911530257?text=${encoded}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-3 bg-[#25D366] text-navy font-sans font-black text-sm uppercase tracking-[0.15em] px-7 py-4 transition-all duration-300 hover:bg-[#20bc5a] hover:scale-[1.03] active:scale-100"
      aria-label="Falar pelo WhatsApp"
    >
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      Quero um projeto assim
      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </a>
  );
}

// ─── Video Lightbox ───────────────────────────────────────────────────────────

function VideoLightbox({ youtubeId, onClose }: { youtubeId: string; onClose: () => void }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] bg-navy/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
      role="dialog" aria-modal="true"
    >
      <button onClick={onClose} className="absolute top-6 right-6 text-cream/50 hover:text-cream transition-colors z-10" aria-label="Fechar">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      <div className="w-full max-w-5xl aspect-video bg-black" onClick={e => e.stopPropagation()}>
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          className="w-full h-full border-0"
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen title="Portfolio video"
        />
      </div>
    </div>
  );
}

// ─── Photo Lightbox ───────────────────────────────────────────────────────────

function PhotoLightbox({ photo, onClose, onPrev, onNext }: {
  photo: PhotoItem; onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
  }, [onClose, onPrev, onNext]);

  return (
    <div className="fixed inset-0 z-[200] bg-navy/97 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8" onClick={onClose} role="dialog" aria-modal="true">
      <button onClick={onClose} className="absolute top-6 right-6 text-cream/50 hover:text-cream transition-colors z-10" aria-label="Fechar">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
      <button onClick={e => { e.stopPropagation(); onPrev(); }} className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-cream/40 hover:text-cream transition-colors z-10" aria-label="Anterior">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
      </button>
      <button onClick={e => { e.stopPropagation(); onNext(); }} className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-cream/40 hover:text-cream transition-colors z-10" aria-label="Próxima">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
      </button>
      <div className="relative w-full max-w-4xl max-h-[85vh] flex items-center justify-center" onClick={e => e.stopPropagation()}>
        <Image src={photo.src} alt={photo.alt} width={1600} height={1067} className="object-contain max-h-[85vh] w-auto max-w-full" sizes="90vw" priority />
      </div>
    </div>
  );
}

// ─── Cinematic Carousel — unified 9:16 / 16:9 showcase ───────────────────────

function CinematicCarousel({
  items, onPlay, bgLabel, aspect = "9/16", initialActive,
}: {
  items: VideoItem[]; onPlay: (id: string) => void;
  bgLabel: string; aspect?: "9/16" | "16/9"; initialActive?: number;
}) {
  const [active, setActive] = useState(initialActive ?? Math.floor(items.length / 2));
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);
  const wasDragged = useRef(false);

  const prev = () => setActive(i => Math.max(0, i - 1));
  const next = () => setActive(i => Math.min(items.length - 1, i + 1));

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    wasDragged.current = false;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    if (Math.abs(delta) > 50) { wasDragged.current = true; delta < 0 ? next() : prev(); }
    dragStartX.current = null;
  };
  const onPointerCancel = () => { dragStartX.current = null; wasDragged.current = false; };

  // Sizing — all differences via scale only (no width change = no layout reflow)
  const is916 = aspect === "9/16";
  const CARD_W = is916 ? "clamp(180px, 18vw, 260px)" : "clamp(260px, 24vw, 380px)";

  function getCardStyle(offset: number): React.CSSProperties {
    const abs = Math.abs(offset);
    const dir = offset > 0 ? 1 : -1;
    if (abs === 0) return { transform: "translateX(0) scale(1.08)", filter: "brightness(1)", zIndex: 20 };
    if (abs === 1) return {
      transform: `translateX(${dir * (is916 ? -10 : -14)}px) scale(${is916 ? 0.63 : 0.72})`,
      filter: "brightness(0.48)", zIndex: 10, opacity: 1,
    };
    return {
      transform: `translateX(${dir * (is916 ? -20 : -24)}px) scale(${is916 ? 0.55 : 0.62})`,
      filter: "brightness(0.28)", zIndex: 5, opacity: 0.65,
    };
  }

  const TRANSITION = [
    "transform 0.85s cubic-bezier(0.34, 1.2, 0.64, 1)",
    "filter 0.75s cubic-bezier(0.16, 1, 0.3, 1)",
    "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
    "box-shadow 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
    "border-color 0.5s ease",
  ].join(", ");

  const currentItem = items[active];

  return (
    <div
      ref={containerRef}
      className="relative w-full flex flex-col items-center justify-center select-none"
      style={{ minHeight: is916 ? "680px" : "500px", overflow: "visible", touchAction: "none" }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onDragStart={(e) => e.preventDefault()}
    >
      {/* ── Giant background text ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04] overflow-hidden" aria-hidden="true">
        <span className="font-heading font-black text-cream leading-none" style={{ fontSize: "30vw" }}>{bgLabel}</span>
      </div>

      {/* ── Stats — Left ── */}
      <div className="absolute left-6 sm:left-10 bottom-16 hidden xl:flex flex-col gap-8 z-30">
        <div className="flex flex-col">
          <span className="font-heading font-black text-5xl text-cream leading-none">{String(items.length).padStart(2, "0")}</span>
          <span className="text-coral font-sans text-[10px] font-black tracking-[0.3em] uppercase mt-1">Categoria</span>
        </div>
        <div className="flex flex-col">
          <span className="font-heading font-black text-5xl text-cream leading-none">45</span>
          <span className="text-coral font-sans text-[10px] font-black tracking-[0.3em] uppercase mt-1">Clipes ativos</span>
        </div>
      </div>

      {/* ── Pagination dots — Right ── */}
      <div className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30" aria-label="Navegação">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Ir para item ${i + 1}`}
            className="transition-all duration-300"
            style={{
              width: i === active ? "10px" : "8px",
              height: i === active ? "10px" : "8px",
              borderRadius: "50%",
              background: i === active ? "var(--color-coral)" : "rgba(246,247,237,0.2)",
              boxShadow: i === active ? "0 0 10px var(--color-coral)" : "none",
            }}
          />
        ))}
      </div>

      {/* ── Carousel ── */}
      <div className="relative w-full flex items-center justify-center px-4">
        <div className="flex items-center gap-3 sm:gap-5 md:gap-8">
          {/* Always render exactly 5 slots (-2..+2) so center card stays centered at edges */}
          {[-2, -1, 0, 1, 2].map((offset) => {
            const i = active + offset;
            const item = items[i];
            const isCenter = offset === 0;
            const cardStyle = getCardStyle(offset);

            // Ghost slot — no real item at this position, keeps layout symmetric
            if (!item) return (
              <div key={`ghost-${offset}`} className="flex flex-col gap-4 flex-none pointer-events-none" style={{ width: CARD_W, opacity: 0 }}>
                <div style={{ width: "100%", aspectRatio: aspect.replace("/", " / ") }} />
                <div className="px-1"><p className="text-[9px]">&nbsp;</p><p className="text-sm">&nbsp;</p></div>
              </div>
            );

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (wasDragged.current) return;
                  if (!isCenter) { setActive(i); return; }
                  if (item.youtubeId) onPlay(item.youtubeId);
                }}
                className="flex flex-col gap-4 flex-none cursor-pointer"
                style={{ width: CARD_W }}
              >
                {/* Card — same DOM width always; visual size only via transform scale */}
                <div
                  className="relative overflow-hidden"
                  style={{
                    width: "100%",
                    aspectRatio: aspect.replace("/", " / "),
                    borderRadius: "12px",
                    border: isCenter ? "2px solid var(--color-coral)" : "1px solid rgba(246,247,237,0.1)",
                    boxShadow: isCenter ? "0 0 40px color-mix(in srgb, var(--color-coral) 40%, transparent)" : "0 0 30px rgba(0,0,0,0.5)",
                    ...cardStyle,
                    transition: TRANSITION,
                  }}
                >
                  {/* Thumbnail */}
                  <Image
                    src={item.thumb}
                    alt={item.title}
                    fill
                    draggable={false}
                    className="object-cover"
                    sizes={is916 ? "300px" : "450px"}
                    unoptimized={item.thumb.startsWith("https://img.youtube")}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0" style={{
                    background: "linear-gradient(to top, rgba(5,5,8,0.95) 0%, transparent 50%, rgba(5,5,8,0.3) 100%)"
                  }} />

                  {/* Center card: top bar + play button + progress */}
                  {isCenter && (
                    <>
                      {/* Top bar */}
                      <div className="absolute top-0 left-0 right-0 flex justify-between items-start p-4">
                        {item.label && (
                          <span className="px-3 py-1 text-[10px] font-black uppercase tracking-tight rounded-full text-white" style={{ background: "var(--color-coral)" }}>
                            {item.label}
                          </span>
                        )}
                        <svg className="w-5 h-5 text-cream/60 ml-auto" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                        </svg>
                      </div>
                      {/* Play button */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                        <button
                          className="flex items-center justify-center rounded-full border border-white/30 transition-transform duration-200 hover:scale-110 active:scale-95"
                          style={{ width: "60px", height: "60px", background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)" }}
                          aria-label="Reproduzir"
                        >
                          <svg className="w-7 h-7 text-white translate-x-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </button>
                        {/* Progress bar */}
                        <div className="w-2/3 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.2)" }}>
                          <div className="h-full rounded-full" style={{ width: "33%", background: "var(--color-coral)" }} />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Side card: small play icon */}
                  {!isCenter && (
                    <div className="absolute bottom-4 left-4">
                      <svg className="w-5 h-5 text-white/50" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                      </svg>
                    </div>
                  )}
                </div>

                {/* Below-card label — always rendered to keep stable height; hidden for center card */}
                <div className="px-1" style={{ opacity: isCenter ? 0 : 1, transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)", pointerEvents: isCenter ? "none" : "auto" }}>
                  <p className="font-sans text-[9px] font-black tracking-[0.2em] uppercase" style={{ color: "rgba(246,247,237,0.4)" }}>
                    {item.category}
                  </p>
                  <p className="font-sans text-sm font-bold text-cream truncate max-w-[160px]">{item.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Center card info below ── */}
      {currentItem && (
        <div className="mt-8 text-center z-10">
          <p className="font-sans text-[10px] font-black tracking-[0.3em] uppercase text-coral mb-1">
            {currentItem.category}
          </p>
          <h3 className="font-heading font-black text-2xl sm:text-3xl text-cream uppercase tracking-tight">
            {currentItem.title}
          </h3>
        </div>
      )}

      {/* ── Drag indicator ── */}
      <div className="mt-8 flex flex-col items-center gap-2 opacity-50 z-10">
        <p className="font-sans text-[10px] font-black tracking-[0.3em] uppercase text-coral">
          Arraste para explorar
        </p>
        <div className="w-px h-10 bg-gradient-to-b from-coral to-transparent" />
      </div>
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────

function SectionHeader({ index, title, subtitle, tag, meta }: {
  index: number; title: string; subtitle: string; tag: string;
  meta: { label: string; value: string }[];
}) {
  return (
    <div className="mb-12 sm:mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
      <div className="flex-1">
        <div className="flex items-center gap-4 mb-5">
          <span className="font-heading font-black text-5xl sm:text-7xl text-cream/10 leading-none select-none">
            {String(index).padStart(2, "0")}
          </span>
          <span className="text-[10px] font-sans font-black tracking-[0.3em] uppercase text-coral border border-coral/30 px-3 py-1">
            {tag}
          </span>
        </div>
        <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tighter text-cream leading-none mb-5">
          {title}
        </h2>
        <p className="font-sans font-light text-cream/55 text-base sm:text-lg max-w-xl leading-relaxed">
          {subtitle}
        </p>
      </div>
      <div className="flex flex-col gap-3 min-w-[220px]">
        {meta.map(({ label, value }) => (
          <div key={label} className="flex items-baseline justify-between border-b border-cream/10 pb-3 last:border-0 last:pb-0">
            <span className="text-cream/40 font-sans text-xs tracking-[0.15em] uppercase">{label}</span>
            <span className="text-cream font-sans text-sm font-medium">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Section Wrapper with scroll-triggered reveal ─────────────────────────────

function TheaterSection({ children, id }: { children: React.ReactNode; id: string }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current!.querySelectorAll(".theater-reveal"),
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.12,
          scrollTrigger: { trigger: ref.current, start: "top 80%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id={id} className="w-full py-24 sm:py-32 border-t border-cream/5 relative">
      {children}
    </section>
  );
}

// ─── Photo Masonry ────────────────────────────────────────────────────────────

function PhotoMasonry({ photos, onOpen }: { photos: PhotoItem[]; onOpen: (i: number) => void }) {
  const col1 = photos.filter((_, i) => i % 3 === 0);
  const col2 = photos.filter((_, i) => i % 3 === 1);
  const col3 = photos.filter((_, i) => i % 3 === 2);

  function Col({ items, topOffset }: { items: PhotoItem[]; topOffset: number }) {
    return (
      <div className="flex flex-col" style={{ marginTop: `${topOffset}px` }}>
        {items.map(photo => {
          const globalIndex = photos.findIndex(p => p.id === photo.id);
          return (
            <div
              key={photo.id}
              onClick={() => onOpen(globalIndex)}
              className="relative overflow-hidden cursor-pointer group mb-3"
              role="button" aria-label={`Ver foto: ${photo.alt}`} tabIndex={0}
            >
              <Image
                src={photo.src} alt={photo.alt} width={800} height={600}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/30 transition-all duration-500 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-7 h-7 text-cream" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"/>
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      <Col items={col1} topOffset={0} />
      <Col items={col2} topOffset={32} />
      <Col items={col3} topOffset={64} />
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const reels: VideoItem[] = [
  { id: 1,  title: "Reel 01",  category: "Reels", thumb: "https://img.youtube.com/vi/zdX9BuSYV6g/maxresdefault.jpg",  youtubeId: "zdX9BuSYV6g",  aspect: "9/16" },
  { id: 2,  title: "Reel 02",  category: "Reels", thumb: "https://img.youtube.com/vi/2sJZiyXJ9hE/maxresdefault.jpg",  youtubeId: "2sJZiyXJ9hE",  aspect: "9/16" },
  { id: 3,  title: "Reel 03",  category: "Reels", thumb: "https://img.youtube.com/vi/-z7L3RkbvRw/maxresdefault.jpg",  youtubeId: "-z7L3RkbvRw",  aspect: "9/16" },
  { id: 4,  title: "Reel 04",  category: "Reels", thumb: "https://img.youtube.com/vi/bwFaHBxRw6Y/maxresdefault.jpg",  youtubeId: "bwFaHBxRw6Y",  aspect: "9/16", label: "Destaque" },
  { id: 5,  title: "Reel 05",  category: "Reels", thumb: "https://img.youtube.com/vi/4PSicx4qZnw/maxresdefault.jpg",  youtubeId: "4PSicx4qZnw",  aspect: "9/16" },
  { id: 6,  title: "Reel 06",  category: "Reels", thumb: "https://img.youtube.com/vi/GneJ-tchPuY/maxresdefault.jpg",  youtubeId: "GneJ-tchPuY",  aspect: "9/16" },
  { id: 7,  title: "Reel 07",  category: "Reels", thumb: "https://img.youtube.com/vi/ssJZv5HwX9c/maxresdefault.jpg",  youtubeId: "ssJZv5HwX9c",  aspect: "9/16" },
  { id: 8,  title: "Reel 08",  category: "Reels", thumb: "https://img.youtube.com/vi/Q7PH8rXWTcY/maxresdefault.jpg",  youtubeId: "Q7PH8rXWTcY",  aspect: "9/16" },
  { id: 9,  title: "Reel 09",  category: "Reels", thumb: "https://img.youtube.com/vi/PBTFBH9SYaE/maxresdefault.jpg",  youtubeId: "PBTFBH9SYaE",  aspect: "9/16" },
  { id: 10, title: "Reel 10",  category: "Reels", thumb: "https://img.youtube.com/vi/-qRKKZ5fKcY/maxresdefault.jpg",  youtubeId: "-qRKKZ5fKcY",  aspect: "9/16" },
  { id: 11, title: "Reel 11",  category: "Reels", thumb: "https://img.youtube.com/vi/dQ4_JbErZGU/maxresdefault.jpg",  youtubeId: "dQ4_JbErZGU",  aspect: "9/16" },
  { id: 12, title: "Reel 12",  category: "Reels", thumb: "https://img.youtube.com/vi/AYCYLCFpfZk/maxresdefault.jpg",  youtubeId: "AYCYLCFpfZk",  aspect: "9/16" },
];

const institucionais: VideoItem[] = [
  { id: 30, title: "Vídeo Institucional 01", category: "Institucional", thumb: "https://img.youtube.com/vi/pIAbhqk_6uo/maxresdefault.jpg",  youtubeId: "pIAbhqk_6uo",  aspect: "16/9" },
  { id: 31, title: "Vídeo Institucional 02", category: "Institucional", thumb: "https://img.youtube.com/vi/poDqajpr4kM/maxresdefault.jpg",  youtubeId: "poDqajpr4kM",  aspect: "16/9" },
  { id: 32, title: "Vídeo Institucional 03", category: "Institucional", thumb: "https://img.youtube.com/vi/lUJQDiXKnRk/maxresdefault.jpg",  youtubeId: "lUJQDiXKnRk",  aspect: "16/9" },
  { id: 33, title: "Vídeo Institucional 04", category: "Institucional", thumb: "https://img.youtube.com/vi/8klx6APtPG8/maxresdefault.jpg",  youtubeId: "8klx6APtPG8",  aspect: "16/9" },
];

const anuncios: VideoItem[] = [
  { id: 40, title: "Anúncio Tráfego Pago 01", category: "Anúncio", thumb: "https://img.youtube.com/vi/7aO6jWnDL-k/maxresdefault.jpg",  youtubeId: "7aO6jWnDL-k",  aspect: "16/9" },
  { id: 41, title: "Anúncio Tráfego Pago 02", category: "Anúncio", thumb: "https://img.youtube.com/vi/lUJQDiXKnRk/maxresdefault.jpg",  youtubeId: "lUJQDiXKnRk",  aspect: "16/9" },
  { id: 42, title: "Anúncio Tráfego Pago 03", category: "Anúncio", thumb: "https://img.youtube.com/vi/4JM-osmNvl0/maxresdefault.jpg",  youtubeId: "4JM-osmNvl0",  aspect: "16/9" },
  { id: 43, title: "Anúncio Tráfego Pago 04", category: "Anúncio", thumb: "https://img.youtube.com/vi/J0sKdzCiMcU/maxresdefault.jpg",  youtubeId: "J0sKdzCiMcU",  aspect: "16/9" },
];

const horizontais: VideoItem[] = [
  { id: 50, title: "Vídeo Horizontal 01", category: "Horizontal", thumb: "https://img.youtube.com/vi/_ku4Cj6S3rs/maxresdefault.jpg",  youtubeId: "_ku4Cj6S3rs",  aspect: "16/9" },
  { id: 51, title: "Vídeo Horizontal 02", category: "Horizontal", thumb: "https://img.youtube.com/vi/4W7T7PkNDLo/maxresdefault.jpg",  youtubeId: "4W7T7PkNDLo",  aspect: "16/9" },
  { id: 52, title: "Vídeo Horizontal 03", category: "Horizontal", thumb: "https://img.youtube.com/vi/trsTJc0Yh1o/maxresdefault.jpg",  youtubeId: "trsTJc0Yh1o",  aspect: "16/9" },
  { id: 53, title: "Vídeo Horizontal 04", category: "Horizontal", thumb: "https://img.youtube.com/vi/AAWtTq5hAcU/maxresdefault.jpg",  youtubeId: "AAWtTq5hAcU",  aspect: "16/9" },
  { id: 54, title: "Vídeo Horizontal 05", category: "Horizontal", thumb: "https://img.youtube.com/vi/tHdaX74fLWQ/maxresdefault.jpg",  youtubeId: "tHdaX74fLWQ",  aspect: "16/9" },
  { id: 55, title: "Vídeo Horizontal 06", category: "Horizontal", thumb: "https://img.youtube.com/vi/lO3InGrOzAU/maxresdefault.jpg",  youtubeId: "lO3InGrOzAU",  aspect: "16/9" },
];

const photos: PhotoItem[] = [
  { id: 1,  src: "/images/portfolio/fotos/DSC00466.jpg",          alt: "Fotografia corporativa 1" },
  { id: 2,  src: "/images/portfolio/fotos/DSC00714.jpg",          alt: "Fotografia corporativa 2" },
  { id: 3,  src: "/images/portfolio/fotos/DSC00836.jpg",          alt: "Fotografia corporativa 3" },
  { id: 4,  src: "/images/portfolio/fotos/DSC00853.jpg",          alt: "Fotografia corporativa 4" },
  { id: 5,  src: "/images/portfolio/fotos/DSC01069-scaled.jpg",   alt: "Fotografia corporativa 5" },
  { id: 6,  src: "/images/portfolio/fotos/DSC01534.jpg",          alt: "Fotografia corporativa 6" },
  { id: 7,  src: "/images/portfolio/fotos/DSC02191.jpg",          alt: "Fotografia corporativa 7" },
  { id: 8,  src: "/images/portfolio/fotos/DSC03847-1-scaled.jpg", alt: "Fotografia corporativa 8" },
  { id: 9,  src: "/images/portfolio/fotos/DSC03992.jpg",          alt: "Fotografia corporativa 9" },
  { id: 10, src: "/images/portfolio/fotos/DSC04060-scaled.jpg",   alt: "Fotografia corporativa 10" },
  { id: 11, src: "/images/portfolio/fotos/DSC04103.jpg",          alt: "Fotografia corporativa 11" },
  { id: 12, src: "/images/portfolio/fotos/DSC07535-scaled.jpg",   alt: "Fotografia corporativa 12" },
  { id: 13, src: "/images/portfolio/fotos/DSC08007-scaled.jpg",   alt: "Fotografia corporativa 13" },
  { id: 14, src: "/images/portfolio/fotos/DSC08434.jpg",          alt: "Fotografia corporativa 14" },
  { id: 15, src: "/images/portfolio/fotos/DSC08866.jpg",          alt: "Fotografia corporativa 15" },
  { id: 16, src: "/images/portfolio/fotos/DSC09575.jpg",          alt: "Fotografia corporativa 16" },
  { id: 17, src: "/images/portfolio/fotos/DSC09702.jpg",          alt: "Fotografia corporativa 17" },
  { id: 18, src: "/images/portfolio/fotos/Still 2025-10-29 153906_1.30.1.jpg", alt: "Fotografia corporativa 18" },
  { id: 19, src: "/images/portfolio/fotos/Untitled_1.57.1.jpg",   alt: "Fotografia corporativa 19" },
];

// ─── Main Export ──────────────────────────────────────────────────────────────

export function PortfolioGrid() {
  const [videoLightbox, setVideoLightbox] = useState<string | null>(null);
  const [photoLightbox, setPhotoLightbox] = useState<number | null>(null);

  const openVideo  = useCallback((id: string) => setVideoLightbox(id), []);
  const closeVideo  = useCallback(() => setVideoLightbox(null), []);
  const openPhoto  = useCallback((i: number) => setPhotoLightbox(i), []);
  const closePhoto  = useCallback(() => setPhotoLightbox(null), []);
  const prevPhoto  = useCallback(() => setPhotoLightbox(i => i !== null ? Math.max(0, i - 1) : null), []);
  const nextPhoto  = useCallback(() => setPhotoLightbox(i => i !== null ? Math.min(photos.length - 1, i + 1) : null), []);

  return (
    <div className="w-full bg-navy relative z-10">

      {/* ── 01 REELS — 3D Showcase ─────────────────────────────────────── */}
      <TheaterSection id="reels">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 theater-reveal">
          <SectionHeader
            index={1}
            tag="Reels Estratégicos"
            title="Retenção e Autoridade Digital"
            subtitle="O feed é, muitas vezes, o primeiro ponto de contato entre sua marca e o mercado. Nossos Reels são projetados com roteiros de alta retenção e ganchos de conversão, transformando o tempo de tela do usuário em reconhecimento de autoridade para o seu negócio."
            meta={[
              { label: "Foco",    value: "Instagram, TikTok, Shorts" },
              { label: "Duração", value: "até 1:30 min" },
              { label: "Formato", value: "Vertical (9:16)" },
              { label: "Prazo",   value: "0 – 7 dias" },
            ]}
          />
        </div>
        {/* 3D Reels carousel — matches code.html design */}
        <div className="theater-reveal py-6">
          <CinematicCarousel items={reels} onPlay={openVideo} bgLabel="REELS" aspect="9/16" initialActive={3} />
        </div>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 mt-6 theater-reveal">
          <WhatsAppCTA message="Olá! Vi os Reels no portfólio da Belis e quero saber mais sobre esse serviço." />
        </div>
      </TheaterSection>

      {/* ── 02 INSTITUCIONAIS ──────────────────────────────────────────── */}
      <TheaterSection id="institucionais">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 theater-reveal">
          <SectionHeader
            index={2}
            tag="Vídeos Institucionais"
            title="Ativos de Credibilidade e Confiança"
            subtitle="A segurança na tomada de decisão é o fator crítico para clientes de alto valor. Produzimos vídeos institucionais que consolidam sua trajetória, estrutura e expertise, servindo como uma ferramenta definitiva de vendas para sites e apresentações comerciais de alto nível."
            meta={[
              { label: "Foco",    value: "YouTube, Sites e Reuniões" },
              { label: "Duração", value: "3:00 – 5:00 min" },
              { label: "Formato", value: "Horizontal e/ou Vertical" },
              { label: "Prazo",   value: "15 – 30 dias" },
            ]}
          />
        </div>
        <div className="theater-reveal">
          <CinematicCarousel items={institucionais} onPlay={openVideo} bgLabel="INST." aspect="16/9" />
        </div>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 mt-12 theater-reveal">
          <WhatsAppCTA message="Olá! Vi os Vídeos Institucionais no portfólio da Belis e quero saber mais sobre esse serviço." />
        </div>
      </TheaterSection>

      {/* ── 03 ANÚNCIOS ────────────────────────────────────────────────── */}
      <TheaterSection id="anuncios">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 theater-reveal">
          <SectionHeader
            index={3}
            tag="Anúncios para Tráfego Pago"
            title="Performance e Conversão em Escala"
            subtitle="Vídeos de anúncios devem ser tratados como investimentos, não custos. Criamos peças curtas, diretas e focadas em métricas, desenhadas especificamente para reduzir o custo por lead e maximizar o retorno sobre o investimento (ROI) em campanhas de tráfego pago."
            meta={[
              { label: "Plataformas", value: "Meta, LinkedIn, Google Ads" },
              { label: "Duração",     value: "até 1:00 min" },
              { label: "Formato",     value: "Vertical e/ou Horizontal" },
              { label: "Prazo",       value: "0 – 7 dias" },
            ]}
          />
        </div>
        <div className="theater-reveal">
          <CinematicCarousel items={anuncios} onPlay={openVideo} bgLabel="ADS" aspect="16/9" />
        </div>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 mt-12 theater-reveal">
          <WhatsAppCTA message="Olá! Vi os Anúncios para Tráfego Pago no portfólio da Belis e quero saber mais sobre esse serviço." />
        </div>
      </TheaterSection>

      {/* ── 04 VÍDEOS HORIZONTAIS ────────────────────────────────────────── */}
      <TheaterSection id="horizontais">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 theater-reveal">
          <SectionHeader
            index={4}
            tag="Vídeos Horizontais"
            title="Conteúdo Horizontal de Alta Produção"
            subtitle="Vídeos no formato wide-screen para YouTube, apresentações, eventos e campanhas de alto impacto. Produções que unem narrativa visual com qualidade cinematográfica para elevar a percepção de valor da sua marca."
            meta={[
              { label: "Plataformas", value: "YouTube, TV, Eventos" },
              { label: "Duração",     value: "1:00 – 10:00 min" },
              { label: "Formato",     value: "Horizontal (16:9)" },
              { label: "Prazo",       value: "7 – 21 dias" },
            ]}
          />
        </div>
        <div className="theater-reveal">
          <CinematicCarousel items={horizontais} onPlay={openVideo} bgLabel="WIDE" aspect="16/9" />
        </div>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 mt-12 theater-reveal">
          <WhatsAppCTA message="Olá! Vi os Vídeos Horizontais no portfólio da Belis e quero saber mais sobre esse serviço." />
        </div>
      </TheaterSection>

      {/* ── 05 FOTOGRAFIAS ─────────────────────────────────────────────── */}
      <TheaterSection id="fotografias">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
          <div className="theater-reveal">
            <SectionHeader
              index={5}
              tag="Fotografia Corporativa"
              title="Posicionamento Visual Premium"
              subtitle="A imagem comunica profissionalismo antes mesmo da primeira palavra ser dita. Nossos retratos executivos e registros de ambiente são pensados para elevar o padrão da sua presença digital, garantindo uma identidade visual coerente e sofisticada em todos os seus canais."
              meta={[
                { label: "Foco",    value: "Perfil, Posts e Site" },
                { label: "Formato", value: "Horizontal e/ou Vertical" },
                { label: "Prazo",   value: "15 – 30 dias" },
              ]}
            />
          </div>
          <div className="theater-reveal">
            <PhotoMasonry photos={photos} onOpen={openPhoto} />
          </div>
          <div className="mt-12 theater-reveal">
            <WhatsAppCTA message="Olá! Vi as Fotografias Corporativas no portfólio da Belis e quero saber mais sobre esse serviço." />
          </div>
        </div>
      </TheaterSection>

      {/* ── Lightboxes ─────────────────────────────────────────────────── */}
      {videoLightbox && <VideoLightbox youtubeId={videoLightbox} onClose={closeVideo} />}
      {photoLightbox !== null && (
        <PhotoLightbox
          photo={photos[photoLightbox]}
          onClose={closePhoto}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
    </div>
  );
}
