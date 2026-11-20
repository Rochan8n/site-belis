"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";
import styles from "./webBlobs.module.css";

const MotionContext = createContext({ paused: false, toggle: () => {} });

export function WebBlobMotion({ children, className }: { children: ReactNode; className: string }) {
  const [paused, setPaused] = useState(false);
  return (
    <MotionContext.Provider value={{ paused, toggle: () => setPaused(value => !value) }}>
      <div className={className}>{children}</div>
    </MotionContext.Provider>
  );
}

export function WebBlobToggle() {
  const { paused, toggle } = useContext(MotionContext);
  const Icon = paused ? Play : Pause;
  return (
    <button className={styles.toggle} type="button" onClick={toggle}>
      <Icon size={15} aria-hidden="true" />
      {paused ? "Retomar animação" : "Pausar animação"}
    </button>
  );
}

type Placement = "hero" | "scope" | "process" | "closing";

export function WebBlob({ placement }: { placement: Placement }) {
  const { paused } = useContext(MotionContext);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const art = ref.current;
    const section = art?.closest("section");
    if (!art || !section || paused) return;

    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const mouse = window.matchMedia("(hover: hover) and (pointer: fine)");
    let inView = false;
    let frame = 0;
    let x = 0;
    let y = 0;

    const center = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
      art.style.removeProperty("--pointer-x");
      art.style.removeProperty("--pointer-y");
    };

    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x = event.clientX;
      y = event.clientY;
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const box = section.getBoundingClientRect();
        art.style.setProperty("--pointer-x", String(2 * (x - box.left) / box.width - 1));
        art.style.setProperty("--pointer-y", String(2 * (y - box.top) / box.height - 1));
        frame = 0;
      });
    };

    const sync = () => {
      const running = inView && motion.matches && !document.hidden;
      art.toggleAttribute("data-moving", running);
      if (running && mouse.matches) {
        section.addEventListener("pointermove", move, { passive: true });
        section.addEventListener("pointerleave", center);
      } else {
        section.removeEventListener("pointermove", move);
        section.removeEventListener("pointerleave", center);
        center();
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    observer.observe(art);
    motion.addEventListener("change", sync);
    mouse.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", sync);
      mouse.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      inView = false;
      sync();
    };
  }, [paused]);

  return (
    <div ref={ref} className={`${styles.art} ${styles[placement]}`} data-web-blob={placement} aria-hidden="true">
      <span className={styles.form} />
    </div>
  );
}
