"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";

/**
 * GradientBackground — Parallax Orbital (GSAP-only)
 *
 * Cada blob percorre uma órbita elíptica própria enquanto a página
 * é rolada. A posição é calculada no onUpdate do ScrollTrigger via
 * Math.cos/sin, combinada com uma leve onda senoidal de "respiro" idle.
 *
 * Não usa CSS animation no transform para evitar conflito com GSAP.
 * O ticker GSAP adiciona o micro-movimento orgânico independente.
 *
 *  Blob 1 — #00804C  Book Green    órbita horária  H:±22vw  V:±28vh
 *  Blob 2 — #001F3F  Midnight      órbita anti-horária  H:±18vw  V:±22vh
 *  Blob 3 — #00804C  Book Green    órbita horária rápida  H:±14vw  V:±16vh
 */
export function GradientBackground() {
  const blobGreenTopRef = useRef<HTMLDivElement>(null);
  const blobNavyBotRef  = useRef<HTMLDivElement>(null);
  const blobGreenMidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const b1 = blobGreenTopRef.current;
    const b2 = blobNavyBotRef.current;
    const b3 = blobGreenMidRef.current;
    if (!b1 || !b2 || !b3) return;

    const TAU = Math.PI * 2;

    // Estado compartilhado entre scroll e ticker
    let scrollProgress = 0;
    let tickerTime = 0;

    // quickSetters — sem GC pressure por frame
    const setB1 = { x: gsap.quickSetter(b1, "x", "vw"), y: gsap.quickSetter(b1, "y", "vh") };
    const setB2 = { x: gsap.quickSetter(b2, "x", "vw"), y: gsap.quickSetter(b2, "y", "vh") };
    const setB3 = { x: gsap.quickSetter(b3, "x", "vw"), y: gsap.quickSetter(b3, "y", "vh") };

    // Atualizar posição orbital + micro-respiro idle
    const updateBlobs = () => {
      const p = scrollProgress;
      const t = tickerTime;

      // ── Blob 1: órbita grande horária ──
      const a1 = p * TAU;
      const idle1x = Math.sin(t * 0.4)  * 1.8;
      const idle1y = Math.cos(t * 0.3)  * 2.2;
      setB1.x(Math.cos(a1) * 22 + idle1x);
      setB1.y(Math.sin(a1) * 28 + idle1y);

      // ── Blob 2: órbita média anti-horária, fase π ──
      const a2 = -(p * TAU * 0.75) + Math.PI;
      const idle2x = Math.cos(t * 0.35) * 1.5;
      const idle2y = Math.sin(t * 0.28) * 1.8;
      setB2.x(Math.cos(a2) * 18 + idle2x);
      setB2.y(Math.sin(a2) * 22 + idle2y);

      // ── Blob 3: órbita pequena horária rápida, fase +π/2 ──
      const a3 = (p * TAU * 1.4) + Math.PI * 0.5;
      const idle3x = Math.sin(t * 0.5 + 1) * 1.2;
      const idle3y = Math.cos(t * 0.42 + 1) * 1.4;
      setB3.x(Math.cos(a3) * 14 + idle3x);
      setB3.y(Math.sin(a3) * 16 + idle3y);
    };

    // ScrollTrigger atualiza o progresso orbital (só dispara no scroll)
    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        scrollProgress = self.progress;
        updateBlobs();
      },
    });

    // Idle: atualiza apenas a cada 100ms (não precisa ser 60fps)
    const idleInterval = setInterval(() => {
      tickerTime += 0.1;
      updateBlobs();
    }, 100);

    return () => {
      st.kill();
      clearInterval(idleInterval);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* Blob 1 — Book Green, ancora topo-direito */}
      <div
        ref={blobGreenTopRef}
        style={{
          position: "absolute",
          width: "70vw",
          height: "70vw",
          borderRadius: "100%",
          filter: "blur(90px)",
          background: "radial-gradient(circle, #00804C 0%, transparent 68%)",
          top: "-18%",
          right: "-8%",
          opacity: 0.72,
        }}
      />

      {/* Blob 2 — Midnight Mirage, ancora base-esquerda */}
      <div
        ref={blobNavyBotRef}
        style={{
          position: "absolute",
          width: "85vw",
          height: "85vw",
          borderRadius: "100%",
          filter: "blur(100px)",
          background: "radial-gradient(circle, #001F3F 0%, transparent 65%)",
          bottom: "-20%",
          left: "-12%",
          opacity: 0.92,
        }}
      />

      {/* Blob 3 — Book Green, ancora centro */}
      <div
        ref={blobGreenMidRef}
        style={{
          position: "absolute",
          width: "50vw",
          height: "50vw",
          borderRadius: "100%",
          filter: "blur(85px)",
          background: "radial-gradient(circle, #00804C 0%, transparent 65%)",
          top: "35%",
          left: "20%",
          opacity: 0.52,
        }}
      />
    </div>
  );
}
