"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import {
  CURTAIN_COVER_NAVIGATION_MS,
  CURTAIN_HOLD_MS,
  curtain,
} from "./curtainController";
import styles from "./transitionCurtain.module.css";

// Navigation-only motion stays out of the landing page initial bundle.
const TransitionCurtainMotion = dynamic(
  () => import("./TransitionCurtainMotion")
    .then((module) => module.TransitionCurtainMotion)
    .catch((error: unknown) => {
      console.warn("Transition animation unavailable; continuing with CSS cover.", error);
      return function MotionUnavailable() { return null; };
    }),
  { ssr: false },
);

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
  useEffect(() => {
    if (phase !== "covering") return;
    // The basic cover works even while the optional motion chunk is loading.
    const root = rootRef.current;
    if (root) {
      ["transition", "opacity", "visibility", "pointer-events"].forEach((property) =>
        root.style.removeProperty(property),
      );
    }
    const ready = window.setTimeout(
      () => curtain.covered(),
      CURTAIN_COVER_NAVIGATION_MS,
    );
    return () => window.clearTimeout(ready);
  }, [phase]);

  // Navigation must finish even if the optional animation chunk fails to load.
  useEffect(() => {
    if (phase !== "revealing") return;
    const safety = window.setTimeout(() => {
      const root = rootRef.current;
      if (root) {
        root.style.transition = "none";
        root.style.opacity = "0";
        root.style.visibility = "hidden";
        root.style.pointerEvents = "none";
      }
      curtain.settle();
    }, 1400);
    return () => window.clearTimeout(safety);
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
      {active && <TransitionCurtainMotion
        phase={phase}
        rootRef={rootRef}
        panelRef={panelRef}
        glowRef={glowRef}
        markRef={markRef}
        subRef={subRef}
      />}
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
