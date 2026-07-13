"use client";

import { useEffect, useRef } from "react";
import { BelisBlob, type BelisBlobHandle } from "@/components/journey/BelisBlob";
import { looks } from "@/components/journey/journeyData";
import styles from "./web.module.css";

export function WebMetricArtifact() {
  const blobRef = useRef<BelisBlobHandle>(null);

  useEffect(() => {
    let cancelled = false;
    let frame = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const applyWebLook = () => {
      if (cancelled) return;
      frame = window.requestAnimationFrame(() => {
        if (cancelled) return;
        blobRef.current?.setLook(
          reducedMotion.matches
            ? { ...looks[3], amp: 0, spin: 0 }
            : looks[3],
        );
      });
    };

    if (window.customElements.get("belis-blob-v2")) {
      applyWebLook();
    } else {
      window.customElements.whenDefined("belis-blob-v2").then(applyWebLook);
    }
    reducedMotion.addEventListener("change", applyWebLook);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      reducedMotion.removeEventListener("change", applyWebLook);
    };
  }, []);

  return (
    <div className={styles.metricArtifact} aria-hidden="true">
      <BelisBlob ref={blobRef} className={styles.metricBlob} />
      <div className={styles.metricCage}>
        <i />
        <i />
        <i />
        <i />
        <b />
        <b />
        <b />
        <b />
      </div>
      <div className={styles.metricArtifactTop}>
        <span>LOOK / 03</span>
        <span>WIRE · WEB</span>
      </div>
      <div className={styles.metricArtifactBottom}>
        <span>SEMANTIC MESH</span>
        <span>02 / 006</span>
      </div>
    </div>
  );
}
