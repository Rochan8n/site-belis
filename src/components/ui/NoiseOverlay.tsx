"use client";

export function NoiseOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.04]">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="premium-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#premium-noise)" />
      </svg>
    </div>
  );
}
