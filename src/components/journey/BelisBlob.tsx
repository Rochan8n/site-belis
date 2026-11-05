"use client";

import Script from "next/script";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import type {
  BelisBlobLook,
  BelisBlobV2Element,
} from "@/types/custom-elements";

// Keep these small, critical rules with the preview. Importing a shared CSS
// module here made the bundler pull styles from every blob route into the home.
const posterStyles = `
belis-blob-v2[data-poster] { position: relative; }
belis-blob-v2[data-poster] > img {
  position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain;
  pointer-events: none; transition: opacity 250ms ease;
}
belis-blob-v2[data-poster] > canvas { opacity: 0; transition: opacity 250ms ease; }
belis-blob-v2[data-poster][data-rendered="true"] > canvas { opacity: 1; }
belis-blob-v2[data-poster][data-rendered="true"] > img { opacity: 0; }
@media (prefers-reduced-motion: reduce) {
  belis-blob-v2[data-poster] > img, belis-blob-v2[data-poster] > canvas { transition: none; }
}`;

export interface BelisBlobHandle {
  setLook(look: BelisBlobLook): void;
  setBulge(screenX: number, screenY: number, amount: number): void;
  setPulse(amount: number): void;
  enter(onMid?: () => void, onDone?: () => void): void;
  reset(): void;
  getRotationDeg(): number;
}

type BelisBlobProps = React.HTMLAttributes<BelisBlobV2Element> & {
  poster?: string;
};

export const BelisBlob = forwardRef<BelisBlobHandle, BelisBlobProps>(
  function BelisBlob({ poster, className, ...props }, ref) {
    const elementRef = useRef<BelisBlobV2Element>(null);
    const [animate, setAnimate] = useState(!poster);

    useEffect(() => {
      if (!poster) return;
      const connection = (navigator as Navigator & {
        connection?: { saveData?: boolean };
      }).connection;
      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        connection?.saveData
      ) return;

      let frame = 0;
      let idle = 0;
      let timer = 0;
      // Let the server-rendered poster paint before scheduling the optional 3D.
      // No load event, user interaction, or audit-specific delay is required.
      frame = window.requestAnimationFrame(() => {
        frame = window.requestAnimationFrame(() => {
          if (typeof window.requestIdleCallback === "function") {
            idle = window.requestIdleCallback(() => setAnimate(true), { timeout: 1000 });
          } else {
            timer = window.setTimeout(() => setAnimate(true), 0);
          }
        });
      });
      return () => {
        window.cancelAnimationFrame(frame);
        if (idle) window.cancelIdleCallback(idle);
        window.clearTimeout(timer);
      };
    }, [poster]);

    useImperativeHandle(
      ref,
      () => ({
        setLook(look) {
          elementRef.current?.setLook?.(look);
        },
        setBulge(screenX, screenY, amount) {
          elementRef.current?.setBulge?.(screenX, screenY, amount);
        },
        setPulse(amount) {
          elementRef.current?.setPulse?.(amount);
        },
        enter(onMid, onDone) {
          elementRef.current?.enter?.(onMid, onDone);
        },
        reset() {
          elementRef.current?.reset?.();
        },
        getRotationDeg() {
          return elementRef.current?.getRotationDeg?.() ?? 0;
        },
      }),
      [],
    );

    return (
      <>
        {poster && <style href="belis-blob-poster" precedence="default">{posterStyles}</style>}
        {animate && <Script
          id="belis-blob-v2-script"
          src="/belis-blob-v2.min.js?v=progressive-poster"
          strategy="afterInteractive"
        />}
        <belis-blob-v2
          {...props}
          ref={elementRef}
          className={className}
          data-poster={poster ? "true" : undefined}
          aria-hidden="true"
        >
          {/* This pre-encoded local preview needs no client image optimizer. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {poster && <img
            src={poster}
            alt=""
            width={730}
            height={730}
            loading="eager"
            fetchPriority="high"
            decoding="sync"
          />}
        </belis-blob-v2>
      </>
    );
  },
);
