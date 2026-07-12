"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { proofs } from "./journeyData";

export function TestimonialProof() {
  const [active, setActive] = useState<(typeof proofs)[number] | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const openProof = (proof: (typeof proofs)[number]) => {
    openerRef.current = document.activeElement as HTMLElement | null;
    setActive(proof);
  };

  useEffect(() => {
    if (!active) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const handleKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button, iframe");
      if (!focusable?.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", handleKeys);
    return () => {
      window.removeEventListener("keydown", handleKeys);
      document.body.style.overflow = previousOverflow;
      openerRef.current?.focus();
    };
  }, [active]);

  return (
    <>
      <div className="testimonial-proof" aria-label="Depoimentos de clientes">
        <span className="proof-label">HERÓIS QUE JÁ ATRAVESSARAM</span>
        <div className="proof-cards">
          {proofs.map((proof) => (
            <button key={proof.youtubeId} className="proof-card" onClick={() => openProof(proof)} aria-label={`Assistir depoimento de ${proof.name}`}>
              <Image src={proof.image} alt="" fill sizes="88px" />
              <span className="proof-play" aria-hidden="true">▶</span>
              <span><strong>{proof.name}</strong><small>{proof.role}</small></span>
            </button>
          ))}
        </div>
      </div>
      {active && (
        <div ref={dialogRef} className="proof-lightbox" role="dialog" aria-modal="true" aria-label={`Depoimento de ${active.name}`} onMouseDown={(event) => event.target === event.currentTarget && setActive(null)}>
          <div className="proof-video">
            <button ref={closeRef} className="proof-close" onClick={() => setActive(null)} aria-label="Fechar depoimento">FECHAR ×</button>
            <iframe src={`https://www.youtube-nocookie.com/embed/${active.youtubeId}?autoplay=1&rel=0`} title={`Depoimento de ${active.name}`} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
          </div>
        </div>
      )}
    </>
  );
}
