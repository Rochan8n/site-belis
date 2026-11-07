"use client";

import { useEffect, useRef } from "react";
import styles from "./visualAtmosphere.module.css";

type AtmosphereVariant = "hero" | "gallery" | "neon" | "closing";

/** Decorative lettering reacts to the section, without intercepting its controls. */
export function VisualAtmosphere({ variant }: { variant: AtmosphereVariant }) {
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = layer.current;
    const surface = element?.parentElement;
    if (!element || !surface) return;

    const motion = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let visible = false;
    let frame = 0;
    let x = 0;
    let y = 0;

    const reset = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
      element.style.removeProperty("--cursor-x");
      element.style.removeProperty("--cursor-y");
    };
    const move = (event: PointerEvent) => {
      if (!motion.matches || !visible || document.hidden || event.pointerType !== "mouse") return;
      // Coalesce pointer events; no idle animation loop or React renders.
      x = event.clientX;
      y = event.clientY;
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const bounds = surface.getBoundingClientRect();
        const clamp = (value: number) => Math.max(-1, Math.min(1, value));
        element.style.setProperty("--cursor-x", String(clamp((x - bounds.left) / Math.max(bounds.width, 1) * 2 - 1)));
        element.style.setProperty("--cursor-y", String(clamp((y - bounds.top) / Math.max(bounds.height, 1) * 2 - 1)));
        frame = 0;
      });
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) reset();
    });
    observer.observe(element);
    surface.addEventListener("pointermove", move, { passive: true });
    surface.addEventListener("pointerleave", reset);
    motion.addEventListener("change", reset);
    document.addEventListener("visibilitychange", reset);
    window.addEventListener("blur", reset);

    return () => {
      observer.disconnect();
      surface.removeEventListener("pointermove", move);
      surface.removeEventListener("pointerleave", reset);
      motion.removeEventListener("change", reset);
      document.removeEventListener("visibilitychange", reset);
      window.removeEventListener("blur", reset);
      reset();
    };
  }, []);

  return (
    <div ref={layer} className={`${styles.atmosphere} ${styles[variant]}`} data-atmosphere={variant} aria-hidden="true">
      <div className={`${styles.blob} ${styles.piece}`} />
      {variant === "hero" && <>
        <span className={`${styles.heroLetter} ${styles.piece}`}>a</span>
        <svg className={`${styles.heroLoop} ${styles.piece} ${styles.lightTube}`} viewBox="0 0 240 180" fill="none" focusable="false">
          <rect x="18" y="28" width="204" height="124" rx="62" />
        </svg>
      </>}
      {variant === "gallery" && <>
        <span className={`${styles.galleryLetter} ${styles.piece}`}>a</span>
        <span className={`${styles.galleryAmpersand} ${styles.piece}`}>&amp;</span>
      </>}
      {variant === "neon" && <>
        <div className={`${styles.neonArch} ${styles.piece}`}>
          <svg className={styles.lightTube} viewBox="0 0 260 330" fill="none" focusable="false">
            <path d="M34 298V132a96 96 0 0 1 192 0v166H34Z" />
          </svg>
        </div>
        <div className={`${styles.neonMonogram} ${styles.piece}`}>
          <svg className={styles.lightTube} viewBox="0 0 240 260" fill="none" focusable="false">
            <path d="M58 28v190h62a62 62 0 0 0 0-124H89V28H58Zm31 97h31a31 31 0 0 1 0 62H89v-62Z" />
            <circle cx="208" cy="210" r="8" />
          </svg>
        </div>
        <span className={`${styles.neonScript} ${styles.piece}`}>oi</span>
        <svg className={`${styles.neonSpark} ${styles.piece} ${styles.lightTube}`} viewBox="0 0 120 120" fill="none" focusable="false">
          <path d="M60 12c0 32-16 48-48 48 32 0 48 16 48 48 0-32 16-48 48-48-32 0-48-16-48-48Z" />
        </svg>
      </>}
      {variant === "closing" && <svg className={`${styles.closingLoop} ${styles.piece} ${styles.lightTube}`} viewBox="0 0 420 420" fill="none" focusable="false">
        <rect x="42" y="42" width="336" height="336" rx="110" />
      </svg>}
    </div>
  );
}
