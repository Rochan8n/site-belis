"use client";

/**
 * GradientBackground — Static Blobs (Performance Optimized)
 *
 * 3 blobs de gradiente posicionados estaticamente.
 * Sem GSAP, sem ScrollTrigger, sem setInterval.
 * GPU-promoted via will-change: transform para evitar repintura.
 */
export function GradientBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* Blob 1 — Book Green, topo-direito */}
      <div
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
          willChange: "transform",
        }}
      />

      {/* Blob 2 — Midnight Mirage, base-esquerda */}
      <div
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
          willChange: "transform",
        }}
      />

      {/* Blob 3 — Book Green, centro */}
      <div
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
          willChange: "transform",
        }}
      />
    </div>
  );
}
