"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-init";
import styles from "./portfolio.module.css";

export function PortfolioHero() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-line]",
        { yPercent: 110 },
        {
          yPercent: 0,
          stagger: 0.15,
          duration: 1.1,
          ease: "power4.out",
          delay: 0.3,
        }
      );
      gsap.fromTo(
        "[data-hero-detail]",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.7 }
      );
      gsap.fromTo("[data-scroll-line]", {
        scaleX: 0,
        transformOrigin: "left",
      }, {
        scaleX: 1,
        transformOrigin: "left",
        duration: 1.2,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.5,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className={`${styles.hero} ${styles.grid}`}
    >
      <div className={styles.heroMedia}>
        <iframe
          ref={videoRef}
          src={`https://www.youtube.com/embed/abG_KLFMwCY?autoplay=1&mute=1&loop=1&playlist=abG_KLFMwCY&controls=0&showinfo=0&rel=0&modestbranding=1&enablejsapi=1&origin=${process.env.NEXT_PUBLIC_SITE_URL ?? "https://belis.agency"}&playsinline=1`}
          allow="autoplay; encrypted-media"
          title="Belis Showreel"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "max(100vw, calc(100vh * 1.7778))",
            height: "max(100vh, calc(100vw * 0.5625))",
            border: "none",
            pointerEvents: "none",
          }}
        />
      </div>

      <div className={styles.heroContent}>
        <div className={styles.heroHead}>
          <span className={styles.eyebrow} data-hero-detail>
            <span className={styles.eyebrowIndex}>01</span>
            Belis · Audiovisual
          </span>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroLine}>
              <span data-hero-line>Percepção</span>
            </span>
            <span className={`${styles.heroLine} ${styles.accent}`}>
              <span data-hero-line>em movimento.</span>
            </span>
          </h1>
        </div>
        <div className={styles.heroFoot} data-hero-detail>
          <div>
            <p className={styles.lede}>
            Marcas reais traduzidas em imagem, som e histórias que aumentam confiança antes da primeira conversa.
            </p>
            <div className={styles.metaRow} style={{ marginTop: "20px" }}>
              <span>Filmes</span>
              <span>Campanhas</span>
              <span>Conteúdo</span>
              <span>Fotografia</span>
            </div>
          </div>
          <span className={styles.scrollCue}>
            Explorar trabalhos
            <span className={styles.scrollTrack}>
              <span className={styles.scrollLine} data-scroll-line />
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
