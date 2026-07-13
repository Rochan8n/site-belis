"use client";

import { useEffect, useRef } from "react";
import { BelisBlob, type BelisBlobHandle } from "@/components/journey/BelisBlob";
import { looks } from "@/components/journey/journeyData";
import { gsap } from "@/lib/gsap-init";
import styles from "./sobre.module.css";

export function AboutHero() {
  const containerRef = useRef<HTMLElement>(null);
  const blobRef = useRef<BelisBlobHandle>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let active = true;
    window.customElements.whenDefined("belis-blob-v2").then(() => {
      if (!active) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      blobRef.current?.setLook({
        ...looks[1],
        amp: reduced ? 0.08 : 0.25,
        spin: reduced ? 0 : 0.05,
      });
    });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-about-reveal]",
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.15,
        },
      );
    }, containerRef);

    return () => {
      active = false;
      ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className={styles.hero} aria-labelledby="about-title">
      <div className={styles.dotGrid} aria-hidden="true" />

      <div className={styles.heroTelemetry} data-about-reveal>
        <span><b>04</b> / 006</span>
        <span>ORIGEM · BELIS</span>
        <span>SÃO PAULO · BR</span>
      </div>

      <div className={styles.heroLayout}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow} data-about-reveal>
            <i aria-hidden="true" /> Parceiro de transformação
          </p>
          <h1 id="about-title" data-about-reveal>
            Ajudamos boas empresas a serem percebidas <em>como realmente são.</em>
          </h1>
          <p className={styles.heroLede} data-about-reveal>
            A Belis nasceu no audiovisual e cresceu acompanhando um problema maior: empresas excelentes
            que ainda pareciam comuns por fora. Hoje unimos estratégia, audiovisual, web e software para
            transformar percepção e sustentar crescimento.
          </p>
        </div>

        <div className={styles.blobPanel} data-about-reveal aria-hidden="true">
          <div className={styles.blobCage}>
            <i /><i /><i /><i />
            <BelisBlob ref={blobRef} className={styles.blob} />
          </div>
          <span className={styles.blobLabel}>OBJ. 01 · PERCEPÇÃO</span>
          <span className={styles.blobAxis}>FORMA / FUNÇÃO / CRESCIMENTO</span>
        </div>
      </div>

      <div className={styles.heroFooter} data-about-reveal>
        <span>ESTRATÉGIA · AUDIOVISUAL · WEB · SOFTWARE</span>
        <span>DESDE 2021</span>
      </div>
    </section>
  );
}
