"use client";

import Script from "next/script";
import { forwardRef, useImperativeHandle, useRef } from "react";
import type {
  BelisBlobLook,
  BelisBlobV2Element,
} from "@/types/custom-elements";

export interface BelisBlobHandle {
  setLook(look: BelisBlobLook): void;
  setBulge(screenX: number, screenY: number, amount: number): void;
  setPulse(amount: number): void;
  enter(onMid?: () => void, onDone?: () => void): void;
  reset(): void;
  getRotationDeg(): number;
}

type BelisBlobProps = React.HTMLAttributes<BelisBlobV2Element>;

export const BelisBlob = forwardRef<BelisBlobHandle, BelisBlobProps>(
  function BelisBlob(props, ref) {
    const elementRef = useRef<BelisBlobV2Element>(null);

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
        <Script
          id="belis-blob-v2-script"
          src="/belis-blob-v2.min.js?v=smooth-hover-gpu"
          strategy="afterInteractive"
        />
        <belis-blob-v2 {...props} ref={elementRef} aria-hidden="true" />
      </>
    );
  },
);
