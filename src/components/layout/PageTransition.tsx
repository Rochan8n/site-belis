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
import { gsap, ScrollTrigger } from "@/lib/gsap-init";
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
  const blob3Ref = useRef<HTMLDivElement>(null);
  const [transitioning, setTransitioning] = useState(false);
  const busyRef = useRef(false);

  /* ── Exit animation ── */
  /* 1. Navbar slides up  2. Overlay fades in + blobs drift  3. Navigate */
  const triggerTransition = useCallback(
    (href: string) => {
      if (href === pathname || busyRef.current) return;
      busyRef.current = true;
      setTransitioning(true);
      stop();

      const overlay = overlayRef.current;
      const b1 = blob1Ref.current;
      const b2 = blob2Ref.current;
      const b3 = blob3Ref.current;
      const nav = document.querySelector("nav");
      if (!overlay || !b1 || !b2 || !b3) return;

      const tl = gsap.timeline({
        onComplete: () => {
          router.push(href);
        },
      });

      // 1. Navbar slides up out of view
      if (nav) {
        tl.to(nav, {
          yPercent: -100,
          duration: 0.35,
          ease: "power3.inOut",
        }, 0);
      }

      // 2. Overlay becomes visible
      tl.set(overlay, { pointerEvents: "all" }, 0);
      tl.to(overlay, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut",
      }, 0.1);

      // 3. Blobs drift and scale with organic movement
      // Blob 1 — green, starts top-right, drifts to center-left
      tl.fromTo(b1,
        { scale: 0.4, x: "30vw", y: "-20vh", opacity: 0, rotate: 0 },
        { scale: 1.5, x: "-10vw", y: "10vh", opacity: 0.9, rotate: 45, duration: 0.7, ease: "power2.inOut" },
        0.05
      );
      // Blob 2 — dark blue, starts bottom-left, drifts to center-right
      tl.fromTo(b2,
        { scale: 0.5, x: "-30vw", y: "25vh", opacity: 0, rotate: 0 },
        { scale: 1.6, x: "15vw", y: "-5vh", opacity: 1, rotate: -30, duration: 0.7, ease: "power2.inOut" },
        0.1
      );
      // Blob 3 — green accent, center, expands
      tl.fromTo(b3,
        { scale: 0.2, x: "0vw", y: "0vh", opacity: 0, rotate: 0 },
        { scale: 1.2, x: "-5vw", y: "15vh", opacity: 0.6, rotate: 20, duration: 0.65, ease: "power2.inOut" },
        0.15
      );
    },
    [pathname, router, stop]
  );

  /* ── Enter animation ── */
  /* New page slides up from below while blobs continue drifting out */
  const animateIn = useCallback(() => {
    const overlay = overlayRef.current;
    const b1 = blob1Ref.current;
    const b2 = blob2Ref.current;
    const b3 = blob3Ref.current;
    const nav = document.querySelector("nav");
    // The page content wrapper created in template.tsx
    const pageContent = document.querySelector("[data-page-content]");
    if (!overlay || !b1 || !b2 || !b3) return;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(overlay, { pointerEvents: "none", opacity: 0 });
        gsap.set([b1, b2, b3], { scale: 0.3, opacity: 0, x: 0, y: 0, rotate: 0 });
        // Clear GSAP-set transform on page wrapper to avoid creating a
        // containing block that breaks position:fixed (GSAP pins)
        if (pageContent) {
          gsap.set(pageContent, { clearProps: "all" });
        }
        busyRef.current = false;
        setTransitioning(false);
        play();
        // Force ScrollTrigger to recalculate pin mode now that wrapper
        // transform is gone (switches from relative+transform to fixed)
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      },
    });

    // 1. Page content slides up from below — creamy ease with soft bounce
    if (pageContent) {
      tl.fromTo(pageContent,
        { y: "100vh", opacity: 1 },
        { y: "0vh", duration: 1.1, ease: "back.out(0.7)" },
        0
      );
    }

    // 2. Blobs continue drifting outward and fade (match longer duration)
    tl.to(b1, {
      scale: 2.5, x: "-40vw", y: "30vh", opacity: 0, rotate: 90,
      duration: 0.9, ease: "power2.inOut",
    }, 0);
    tl.to(b2, {
      scale: 2.8, x: "40vw", y: "-30vh", opacity: 0, rotate: -60,
      duration: 0.9, ease: "power2.inOut",
    }, 0.05);
    tl.to(b3, {
      scale: 2.0, x: "20vw", y: "40vh", opacity: 0, rotate: 45,
      duration: 0.85, ease: "power2.inOut",
    }, 0.05);

    // 3. Overlay fades out smoothly
    tl.to(overlay, {
      opacity: 0,
      duration: 0.7,
      ease: "power2.inOut",
    }, 0.2);

    // 4. Navbar slides back in gently
    if (nav) {
      tl.to(nav, {
        yPercent: 0,
        duration: 0.6,
        ease: "power2.out",
      }, 0.5);
    }
  }, [play]);

  const ctx: TransitionContextValue = {
    triggerTransition,
    animateIn,
    isTransitioning: transitioning,
  };

  return (
    <TransitionCtx.Provider value={ctx}>
      {children}

      {/* Transition Overlay — fixed, covers everything */}
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
        {/* Blob 1 — Book Green, large */}
        <div
          ref={blob1Ref}
          style={{
            position: "absolute",
            width: "70vw",
            height: "70vw",
            top: "15%",
            right: "-5%",
            borderRadius: "100%",
            filter: "blur(80px)",
            background: "radial-gradient(circle, #00804C 0%, transparent 65%)",
            opacity: 0,
            willChange: "transform, opacity",
          }}
        />

        {/* Blob 2 — Midnight blue, large */}
        <div
          ref={blob2Ref}
          style={{
            position: "absolute",
            width: "85vw",
            height: "85vw",
            bottom: "5%",
            left: "-10%",
            borderRadius: "100%",
            filter: "blur(100px)",
            background: "radial-gradient(circle, #001F3F 0%, transparent 60%)",
            opacity: 0,
            willChange: "transform, opacity",
          }}
        />

        {/* Blob 3 — Green accent, medium */}
        <div
          ref={blob3Ref}
          style={{
            position: "absolute",
            width: "50vw",
            height: "50vw",
            top: "35%",
            left: "25%",
            borderRadius: "100%",
            filter: "blur(75px)",
            background: "radial-gradient(circle, #00804C 0%, transparent 60%)",
            opacity: 0,
            willChange: "transform, opacity",
          }}
        />
      </div>
    </TransitionCtx.Provider>
  );
}
