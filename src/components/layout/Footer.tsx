"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-init";
import styles from "./siteChrome.module.css";

const CTA_TEXT = "Sua empresa evoluiu. Vamos fazer mercado perceber.";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-footer-reveal]",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: footerRef.current, start: "top 72%" },
        },
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className={styles.siteFooter}>
      <div className={styles.footerGrid} aria-hidden="true" />
      <div className={styles.footerCage} aria-hidden="true"><i /><i /><i /><i /><b /><b /><b /><b /></div>

      <div className={styles.footerIntro} data-footer-reveal>
        <span><b>05</b> · PRÓXIMA ESTAÇÃO</span>
        <span>DISPONÍVEL PARA NOVOS PROJETOS</span>
      </div>

      <div className={styles.footerCore}>
        <div>
          <h2 data-footer-reveal>{CTA_TEXT}</h2>
        </div>
        <div>
          <p data-footer-reveal>
            Estratégia, imagem, web e software conectados para construir percepção que sustenta crescimento.
          </p>
          <a
            data-footer-reveal
            href="https://wa.me/5511973138895"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerCta}
            data-magnetic
            data-magnetic-text="GO"
          >
            <span><small>CANAL DIRETO</small>INICIAR PROJETO</span>
            <i aria-hidden="true">↗</i>
          </a>
        </div>
      </div>

      <div className={styles.footerWordmark} aria-hidden="true"><span>/</span>BELIS</div>

      <div className={styles.footerMeta} data-footer-reveal>
        <div>
          <a href="https://www.instagram.com/belisvideo/" target="_blank" rel="noopener noreferrer">INSTAGRAM ↗</a>
          <a href="mailto:Lucas@belis.agency">LUCAS@BELIS.AGENCY</a>
        </div>
        <span>23.5505° S · 46.6333° W</span>
        <span>© {new Date().getFullYear()} BELIS · SÃO PAULO</span>
      </div>
    </footer>
  );
}
