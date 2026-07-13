"use client";

import { useEffect, useRef } from "react";
import { BelisBlob, type BelisBlobHandle } from "@/components/journey/BelisBlob";
import { looks } from "@/components/journey/journeyData";
import { ContactForm } from "@/components/contato/ContactForm";
import { ContactInfo } from "@/components/contato/ContactInfo";
import { gsap } from "@/lib/gsap-init";
import styles from "@/components/contato/contato.module.css";

export default function ContatoPage() {
  const pageRef = useRef<HTMLElement>(null);
  const blobRef = useRef<BelisBlobHandle>(null);

  useEffect(() => {
    let active = true;
    window.customElements.whenDefined("belis-blob-v2").then(() => {
      if (!active) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      blobRef.current?.setLook({
        ...looks[5],
        amp: reduced ? 0.06 : looks[5].amp,
        spin: reduced ? 0 : looks[5].spin,
      });
    });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-contact-reveal]",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.12,
        },
      );
    }, pageRef);

    return () => {
      active = false;
      ctx.revert();
    };
  }, []);

  return (
    <main ref={pageRef} className={styles.page}>
      <section className={styles.station} aria-labelledby="contact-title">
        <div className={styles.dotGrid} aria-hidden="true" />

        <div className={styles.telemetry} data-contact-reveal>
          <span><b>006</b> / 006</span>
          <span>ESTAÇÃO · CONTATO</span>
          <span>23°33&apos;S · 46°38&apos;W</span>
        </div>

        <div className={styles.stationGrid}>
          <header className={styles.intro}>
            <p className={styles.eyebrow} data-contact-reveal>
              <i aria-hidden="true" /> Próximo passo
            </p>
            <h1 id="contact-title" data-contact-reveal>
              Conte onde sua empresa está. <em>Vamos construir o próximo passo.</em>
            </h1>
            <p className={styles.introCopy} data-contact-reveal>
              Você não precisa chegar com briefing pronto. Um bom projeto começa
              entendendo momento, gargalo e resultado esperado.
            </p>
            <a className={styles.jumpLink} href="#brief" data-contact-reveal>
              INICIAR BRIEF <span aria-hidden="true">↓</span>
            </a>
          </header>

          <div className={styles.blobStage} data-contact-reveal aria-hidden="true">
            <div className={styles.orbit} />
            <div className={styles.cage}>
              <i /><i /><i /><i />
              <BelisBlob ref={blobRef} className={styles.blob} />
            </div>
            <span className={styles.blobStatus}><i /> CANAL ABERTO</span>
            <span className={styles.blobCode}>LOOK 05 · POINT CLOUD</span>
          </div>
        </div>

        <div className={styles.stationFooter} data-contact-reveal>
          <span>RESPOSTA · ATÉ 24H</span>
          <span>SÃO PAULO · BR</span>
        </div>
      </section>

      <section id="brief" className={styles.brief} aria-labelledby="brief-title">
        <header className={styles.briefHead}>
          <div>
            <p className={styles.eyebrow}><i aria-hidden="true" /> Transmissão 01</p>
            <h2 id="brief-title">Uma conversa <em>começa por contexto.</em></h2>
          </div>
          <div className={styles.briefStatus}>
            <span><i /> Sistema disponível</span>
            <span>WHATSAPP · E-MAIL · TELEFONE</span>
          </div>
        </header>

        <div className={styles.contactLayout}>
          <div className={styles.formShell}>
            <div className={styles.panelLabel}>
              <span>INPUT / PROJETO</span><span>05 CAMPOS</span>
            </div>
            <ContactForm />
          </div>

          <aside className={styles.infoShell} aria-label="Canais de contato">
            <div className={styles.panelLabel}>
              <span>OUTPUT / CONVERSA</span><span>SP · BR</span>
            </div>
            <ContactInfo />
          </aside>
        </div>

        <div className={styles.briefFooter} aria-hidden="true">
          <span>/BELIS</span><i /><span>CANAL 006 · ONLINE</span>
        </div>
      </section>
    </main>
  );
}
