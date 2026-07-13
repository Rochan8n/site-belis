"use client";

import { useEffect, useRef } from "react";
import { BelisBlob, type BelisBlobHandle } from "@/components/journey/BelisBlob";
import { looks } from "@/components/journey/journeyData";

type SolutionBlobProps = {
  className?: string;
};

export function SolutionBlob({ className }: SolutionBlobProps) {
  const blobRef = useRef<BelisBlobHandle>(null);

  useEffect(() => {
    let cancelled = false;
    let frame = 0;

    const applySystemsLook = () => {
      if (cancelled) return;
      frame = window.requestAnimationFrame(() => {
        if (!cancelled) blobRef.current?.setLook(looks[4]);
      });
    };

    if (window.customElements.get("belis-blob-v2")) {
      applySystemsLook();
    } else {
      window.customElements.whenDefined("belis-blob-v2").then(applySystemsLook);
    }

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <BelisBlob
      ref={blobRef}
      className={className}
      aria-hidden="true"
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
