"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-init";
import styles from "./contato.module.css";

export function ContactInfo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-info-row]",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.09,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 84%",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={styles.contactInfo}>
      <section data-info-row>
        <span className={styles.infoIndex}>01 · PROTOCOLO</span>
        <h3>Uma conversa clara</h3>
        <p>
          Você não precisa chegar com briefing pronto. Conte o momento da empresa e onde sente
          que está perdendo oportunidades. Ajudamos a organizar o próximo passo.
        </p>
        <div className={styles.responseStatus}><i /> Resposta em até 24 horas.</div>
      </section>

      <section data-info-row>
        <span className={styles.infoIndex}>02 · CANAIS DIRETOS</span>
        <h3>Fale direto com a Belis</h3>
        <ul className={styles.channelList}>
          <li><span>E-MAIL</span><a href="mailto:Lucas@belis.agency">Lucas@belis.agency</a></li>
          <li><span>WHATSAPP</span><a href="https://wa.me/5511973138895" target="_blank" rel="noopener noreferrer">(11) 97313-8895</a></li>
          <li><span>TELEFONE</span><a href="tel:+5511973138895">(11) 97313-8895</a></li>
        </ul>
      </section>

      <section data-info-row>
        <span className={styles.infoIndex}>03 · SINAL PÚBLICO</span>
        <h3>Acompanhe nosso trabalho</h3>
        <a className={styles.socialLink} href="https://www.instagram.com/belisvideo/" target="_blank" rel="noopener noreferrer">
          Instagram <span aria-hidden="true">↗</span>
        </a>
      </section>

      <div className={styles.coordinates} data-info-row aria-hidden="true">
        <span>LAT · -23.5505</span>
        <span>LNG · -46.6333</span>
      </div>
    </div>
  );
}
