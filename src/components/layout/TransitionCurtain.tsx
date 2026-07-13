"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "@/lib/gsap-init";
import {
  CURTAIN_COVER_NAVIGATION_MS,
  CURTAIN_HOLD_MS,
  curtain,
} from "./curtainController";
import styles from "./transitionCurtain.module.css";

const MARK = "BELIS";
const REVEAL_SAFETY_MS = CURTAIN_HOLD_MS + 1200;

export function TransitionCurtain() {
  const router = useRouter();
  const snapshot = useSyncExternalStore(
    curtain.subscribe,
    curtain.getSnapshot,
    curtain.getSnapshot,
  );
  const { phase, label } = snapshot;

  const active = phase !== "idle";

  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLSpanElement>(null);
  const enterTlRef = useRef<gsap.core.Timeline | null>(null);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (phase !== "covering") return;
    const ready = window.setTimeout(
      () => curtain.covered(),
      CURTAIN_COVER_NAVIGATION_MS,
    );
    return () => window.clearTimeout(ready);
  }, [phase]);

  // Safety: if destination template never calls reveal(), don't leave the site stuck.
  useEffect(() => {
    if (phase !== "covered") return;
    const safety = window.setTimeout(() => {
      if (curtain.getPhase() === "covered") curtain.reveal();
    }, REVEAL_SAFETY_MS);
    return () => window.clearTimeout(safety);
  }, [phase]);

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
  }, [phase]);

  useEffect(() => {
    const setPageInert = (value: boolean) => {
      document.querySelectorAll<HTMLElement>("[data-page-content]").forEach((page) => {
        page.inert = value;
      });
    };

    if (!active) {
      document.body.removeAttribute("aria-busy");
      setPageInert(false);
      return;
    }

    document.body.setAttribute("aria-busy", "true");
    setPageInert(true);
    const observer = new MutationObserver(() => setPageInert(true));
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      document.body.removeAttribute("aria-busy");
      setPageInert(false);
    };
  }, [active]);

  useEffect(() => {
    const interceptInternalLink = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (
        !anchor ||
        anchor.dataset.transitionLink !== undefined ||
        anchor.dataset.noTransition !== undefined ||
        anchor.hasAttribute("download") ||
        (anchor.target && anchor.target !== "_self") ||
        anchor.relList.contains("external")
      ) {
        return;
      }

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      if (
        url.origin !== window.location.origin ||
        url.pathname === window.location.pathname
      ) {
        return;
      }

      event.preventDefault();
      const destination = `${url.pathname}${url.search}${url.hash}`;
      void curtain.cover(destination).then((started) => {
        if (started) router.push(destination);
      });
    };

    document.addEventListener("click", interceptInternalLink);
    return () =>
      document.removeEventListener("click", interceptInternalLink);
  }, [router]);

  const rootClass = [
    styles.curtain,
    active ? styles.covered : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={rootRef} className={rootClass} aria-hidden="true">
      <div ref={panelRef} className={styles.panel}>
        <div ref={glowRef} className={styles.glow} />
        <div className={styles.stage}>
          <span ref={markRef} className={styles.mark}>
            <span className={styles.mask}>
              <s data-slash className={styles.slash}>/</s>
            </span>
            <span className={styles.letters}>
              {MARK.split("").map((ch, i) => (
                <span key={`${ch}-${i}`} className={styles.mask}>
                  <span data-letter className={styles.letter}>
                    {ch}
                  </span>
                </span>
              ))}
            </span>
          </span>
          <span ref={subRef} className={styles.sub}>
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}
