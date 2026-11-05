"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";
import { curtain, type CurtainPhase } from "./curtainController";

type MotionProps = {
  phase: CurtainPhase;
  rootRef: RefObject<HTMLDivElement | null>;
  panelRef: RefObject<HTMLDivElement | null>;
  glowRef: RefObject<HTMLDivElement | null>;
  markRef: RefObject<HTMLSpanElement | null>;
  subRef: RefObject<HTMLSpanElement | null>;
};

export function TransitionCurtainMotion({ phase, rootRef, panelRef, glowRef, markRef, subRef }: MotionProps) {
  const enterTlRef = useRef<gsap.core.Timeline | null>(null);
  const reducedRef = useRef(false);
  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return () => { enterTlRef.current?.kill(); };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const mark = markRef.current;
    const panel = panelRef.current;
    const sub = subRef.current;
    const glow = glowRef.current;
    if (!mark || !panel || !root) return;
    const letters = mark.querySelectorAll<HTMLElement>("[data-letter]");
    const slash = mark.querySelector<HTMLElement>("[data-slash]");
    const reduced = reducedRef.current;

    const resetPanelHidden = () => {
      // Reset only while the root is invisible — never flash black back on screen.
      gsap.set(panel, {
        yPercent: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        opacity: 1,
      });
      gsap.set([slash, ...Array.from(letters)], { yPercent: 0, opacity: 1, clearProps: "transform" });
      gsap.set(sub, { opacity: 0, y: 0, clearProps: "transform" });
      gsap.set(glow, { opacity: 0, scale: 1, clearProps: "transform" });
    };

    if (phase === "covering") {
      enterTlRef.current?.kill();
      // Allow CSS fade-in again (clears any post-settle inline opacity:0).
      root.style.transition = "";
      root.style.opacity = "";
      root.style.visibility = "";

      gsap.set(panel, {
        yPercent: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        opacity: 1,
      });

      if (reduced) {
        gsap.set([slash, ...Array.from(letters)], { yPercent: 0, opacity: 1 });
        gsap.set(sub, { opacity: 0.5, y: 0 });
        gsap.set(glow, { opacity: 0.45 });
        return;
      }

      const tl = gsap.timeline();
      enterTlRef.current = tl;
      gsap.set(glow, { opacity: 0, scale: 0.96 });
      gsap.set([slash, ...Array.from(letters)], { yPercent: 110, opacity: 1 });
      gsap.set(sub, { opacity: 0, y: 6 });

      // Creamy in — soft expo, short stagger, no snap.
      tl.to(glow, { opacity: 0.48, scale: 1, duration: 0.55, ease: "sine.out" }, 0);
      tl.to(slash, { yPercent: 0, duration: 0.48, ease: "expo.out" }, 0.02);
      tl.to(
        letters,
        { yPercent: 0, duration: 0.52, ease: "expo.out", stagger: 0.03 },
        0.06,
      );
      tl.to(sub, { opacity: 0.5, y: 0, duration: 0.4, ease: "power2.out" }, 0.22);
      return;
    }

    if (phase === "covered") {
      if (enterTlRef.current?.isActive()) {
        // Ease the rest in instead of hard-snapping — keeps the cream.
        enterTlRef.current.timeScale(1.6);
      } else {
        enterTlRef.current = null;
        gsap.set([slash, ...Array.from(letters)], { yPercent: 0, opacity: 1 });
        gsap.set(sub, { opacity: 0.5, y: 0 });
        gsap.set(glow, { opacity: 0.48, scale: 1 });
      }
      return;
    }

    if (phase === "revealing") {
      if (enterTlRef.current) {
        enterTlRef.current.progress(1);
        enterTlRef.current.kill();
        enterTlRef.current = null;
      }

      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        // Instant hide BEFORE idle remounts the panel at y=0 (kills the black flash).
        root.style.transition = "none";
        root.style.opacity = "0";
        root.style.visibility = "hidden";
        root.style.pointerEvents = "none";
        resetPanelHidden();
        curtain.settle();
      };

      if (reduced) {
        const tl = gsap.timeline({ onComplete: finish });
        tl.to(panel, { opacity: 0, duration: 0.18, ease: "power1.out" });
        const safety = window.setTimeout(finish, 300);
        return () => {
          tl.kill();
          window.clearTimeout(safety);
          finish();
        };
      }

      const tl = gsap.timeline({ onComplete: finish });
      // Mark dissolves up softly, then panel lifts with a long creamy ease.
      tl.to(
        letters,
        { yPercent: -108, duration: 0.34, ease: "power2.in", stagger: { each: 0.024, from: "end" } },
        0,
      );
      tl.to(slash, { yPercent: -108, duration: 0.32, ease: "power2.in" }, 0.03);
      tl.to(sub, { opacity: 0, y: -6, duration: 0.24, ease: "power2.in" }, 0);
      tl.to(glow, { opacity: 0, duration: 0.36, ease: "sine.in" }, 0);
      tl.to(
        panel,
        {
          yPercent: -110,
          borderBottomLeftRadius: "20vw",
          borderBottomRightRadius: "20vw",
          duration: 0.62,
          ease: "expo.inOut",
        },
        0.12,
      );
      const safety = window.setTimeout(finish, 1100);
      return () => {
        tl.kill();
        window.clearTimeout(safety);
        finish();
      };
    }

    // idle — panel already reset while root was hidden
    enterTlRef.current?.kill();
    enterTlRef.current = null;
  }, [phase, rootRef, panelRef, glowRef, markRef, subRef]);

  return null;
}
