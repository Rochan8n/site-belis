"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap-init";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

/* ── Context ── */
interface TransitionContextValue {
  triggerTransition: (href: string) => void;
  animateIn: () => void;
  isTransitioning: boolean;
}

const TransitionCtx = createContext<TransitionContextValue>({
  triggerTransition: () => {},
  animateIn: () => {},
  isTransitioning: false,
});

export const usePageTransition = () => useContext(TransitionCtx);

/* ── Provider + Overlay ── */
export function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { stop, play } = useSmoothScroll();

  const overlayRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const [transitioning, setTransitioning] = useState(false);
  const busyRef = useRef(false);

  /* ── Exit animation (cover page) ── */
  const triggerTransition = useCallback(
    (href: string) => {
      // Skip if same page or already transitioning
      if (href === pathname || busyRef.current) return;
      busyRef.current = true;
      setTransitioning(true);
      stop();

      const overlay = overlayRef.current;
      const b1 = blob1Ref.current;
      const b2 = blob2Ref.current;
      if (!overlay || !b1 || !b2) return;

      const tl = gsap.timeline({
        onComplete: () => {
          router.push(href);
        },
      });

      // Reset blobs to starting position
      tl.set(overlay, { pointerEvents: "all" });
      tl.set(b1, { scale: 0.3, x: "20%", y: "-30%", opacity: 0.8 });
      tl.set(b2, { scale: 0.4, x: "-20%", y: "30%", opacity: 0.9 });

      // Fade in overlay + expand blobs
      tl.to(overlay, { opacity: 1, duration: 0.55, ease: "power2.inOut" }, 0);
      tl.to(
        b1,
        { scale: 1.3, x: "0%", y: "0%", opacity: 1, duration: 0.6, ease: "power2.inOut" },
        0
      );
      tl.to(
        b2,
        { scale: 1.4, x: "0%", y: "0%", opacity: 1, duration: 0.6, ease: "power2.inOut" },
        0.05
      );
    },
    [pathname, router, stop]
  );

  /* ── Enter animation (reveal new page) ── */
  const animateIn = useCallback(() => {
    const overlay = overlayRef.current;
    const b1 = blob1Ref.current;
    const b2 = blob2Ref.current;
    if (!overlay || !b1 || !b2) return;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(overlay, { pointerEvents: "none", opacity: 0 });
        gsap.set([b1, b2], { scale: 0.3, opacity: 0 });
        busyRef.current = false;
        setTransitioning(false);
        play();
      },
    });

    // Blobs expand further + overlay fades out
    tl.to(b1, { scale: 2.2, opacity: 0, duration: 0.6, ease: "power2.in" }, 0);
    tl.to(b2, { scale: 2.4, opacity: 0, duration: 0.6, ease: "power2.in" }, 0.05);
    tl.to(overlay, { opacity: 0, duration: 0.55, ease: "power2.inOut" }, 0.1);
  }, [play]);

  const ctx: TransitionContextValue = {
    triggerTransition,
    animateIn,
    isTransitioning: transitioning,
  };

  return (
    <TransitionCtx.Provider value={ctx}>
      {children}

      {/* Overlay — fixed, covers everything */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="fixed inset-0 overflow-hidden"
        style={{
          zIndex: 1100,
          opacity: 0,
          pointerEvents: "none",
          background: "#050508",
        }}
      >
        {/* Blob 1 — Book Green */}
        <div
          ref={blob1Ref}
          style={{
            position: "absolute",
            width: "80vw",
            height: "80vw",
            borderRadius: "100%",
            filter: "blur(90px)",
            background: "radial-gradient(circle, #00804C 0%, transparent 65%)",
            top: "10%",
            right: "-10%",
            opacity: 0,
            scale: 0.3,
            willChange: "transform, opacity",
          }}
        />

        {/* Blob 2 — Midnight Mirage */}
        <div
          ref={blob2Ref}
          style={{
            position: "absolute",
            width: "90vw",
            height: "90vw",
            borderRadius: "100%",
            filter: "blur(100px)",
            background: "radial-gradient(circle, #001F3F 0%, transparent 60%)",
            bottom: "-5%",
            left: "-15%",
            opacity: 0,
            scale: 0.3,
            willChange: "transform, opacity",
          }}
        />
      </div>
    </TransitionCtx.Provider>
  );
}
