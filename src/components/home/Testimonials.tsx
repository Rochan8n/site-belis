"use client";

import Image from "next/image";
import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "@/lib/gsap-init";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  thumbnail: string;
  youtubeId: string;
}

const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Dra. Barbara Goldoni",
    role: "Cirurgiã",
    thumbnail: "/images/barbara.jpg",
    youtubeId: "PQzI3UtDaao",
  },
  {
    id: "t2",
    name: "Dr. Thiago Barbosa",
    role: "Advogado",
    thumbnail: "/images/thiago.jpg",
    youtubeId: "hVu5yhGCVmk",
  },
  {
    id: "t3",
    name: "Dra. Ana Carolina",
    role: "Médica",
    thumbnail: "/images/ana carolina.jpg",
    youtubeId: "JoY-feXnk9c",
  },
];

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".testimonial-header", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
      });

      const cards = gsap.utils.toArray<HTMLElement>(".testimonial-card", sectionRef.current);
      if (cards.length) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.2,
            scrollTrigger: { trigger: cards[0].parentElement, start: "top 80%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Close modal on ESC
  useEffect(() => {
    if (!activeVideo) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveVideo(null);
    };
    window.addEventListener("keydown", handleKey);
    // Prevent body scroll
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [activeVideo]);

  const openVideo = useCallback((youtubeId: string) => {
    setActiveVideo(youtubeId);
  }, []);

  return (
    <>
      <section ref={sectionRef} className="w-full pt-12 sm:pt-16 pb-24 sm:pb-32 relative z-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
          {/* Header */}
          <div className="mb-16 sm:mb-20">
            <span className="testimonial-header inline-block text-xs font-sans font-bold tracking-[0.3em] uppercase text-cream/40 border border-cream/10 rounded-full px-5 py-2 mb-6">
              Depoimentos
            </span>
            <h2 className="testimonial-header text-4xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight text-cream leading-tight max-w-3xl">
              Quem confiou na Belis{" "}
              <span className="text-coral">não voltou atrás.</span>
            </h2>
            <p className="testimonial-header max-w-2xl mt-5 text-cream/50 font-sans font-light text-base sm:text-lg leading-relaxed">
              Resultados falam mais que promessas. Ouça direto de quem investiu em vídeo profissional e viu o retorno.
            </p>
          </div>

          {/* Video Grid — 3 columns on desktop, scroll on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} onPlay={openVideo} />
            ))}
          </div>
        </div>
      </section>

      {/* Video Lightbox Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setActiveVideo(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Fechar vídeo"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Video container — vertical (9:16) for testimonial reels */}
          <div
            className="relative w-[90vw] max-w-[400px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0&modestbranding=1&playsinline=1&vq=hd1080`}
              title="Depoimento"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      )}
    </>
  );
}

function TestimonialCard({
  testimonial,
  onPlay,
}: {
  testimonial: Testimonial;
  onPlay: (id: string) => void;
}) {
  return (
    <div
      className="testimonial-card group relative cursor-pointer"
      onClick={() => onPlay(testimonial.youtubeId)}
    >
      {/* Thumbnail — gradient border + glow */}
      <div
        className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-navy/50"
        style={{
          border: "1px solid rgba(45,212,191,0.25)",
          boxShadow:
            "0 0 18px 2px rgba(45,212,191,0.12), 0 0 60px 8px rgba(45,212,191,0.06)",
        }}
      >
        <Image
          src={testimonial.thumbnail}
          alt={`Depoimento de ${testimonial.name}`}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />

        {/* Play button — glassmorphism */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-16 h-16 sm:w-18 sm:h-18 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
              backdropFilter: "blur(16px) saturate(1.8)",
              WebkitBackdropFilter: "blur(16px) saturate(1.8)",
              border: "1px solid rgba(255,255,255,0.2)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white ml-1">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Name at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-lg font-heading font-bold text-cream tracking-tight">
            {testimonial.name}
          </h3>
          <p className="text-sm font-sans text-cream/50 mt-0.5">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
}
