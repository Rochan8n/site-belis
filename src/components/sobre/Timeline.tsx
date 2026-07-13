"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-init";
import styles from "./sobre.module.css";

const milestones = [
  { year: "2016", title: "Gestão antes da criação", desc: "A formação em Administração pelo Mackenzie e a especialização em Gestão da Qualidade pela USP criaram uma base que continua presente: entender processos, cuidar dos detalhes e entregar com consistência." },
  { year: "2021", title: "A imagem como começo", desc: "A Belis nasce no audiovisual atendendo empresas de setores complexos. Aprendemos cedo que uma boa imagem precisa respeitar a verdade do negócio que representa." },
  { year: "2023", title: "Conteúdo com função", desc: "O vídeo passa a ocupar um papel maior: tornar conhecimento visível, fortalecer autoridade e ajudar clientes a decidir com mais confiança." },
  { year: "2025", title: "Presença conectada", desc: "Estratégia, conteúdo e dados se aproximam. Cada peça começa a fazer parte de uma presença digital coerente, em vez de existir isoladamente." },
  { year: "2026", title: "Ativos digitais de crescimento", desc: "Web e software completam a transformação. A percepção atrai, a experiência converte e a estrutura permite crescer com controle." },
];

export function Timeline() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      containerRef.current?.querySelectorAll<HTMLElement>("[data-timeline-row]").forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className={styles.timeline} aria-labelledby="timeline-title">
      <div className={styles.sectionHead}>
        <div>
          <p className={styles.eyebrow}><i aria-hidden="true" /> Cronologia · 2016—2026</p>
          <h2 id="timeline-title">Como chegamos <em>até aqui.</em></h2>
        </div>
        <p>
          Uma evolução contínua: entender o negócio, tornar sua qualidade visível
          e construir estrutura para sustentar crescimento.
        </p>
      </div>

      <ol className={styles.timelineRail}>
        {milestones.map((milestone, index) => (
          <li key={milestone.year} className={styles.timelineRow} data-timeline-row>
            <span className={styles.timelineIndex}>{String(index + 1).padStart(2, "0")}</span>
            <time dateTime={milestone.year}>{milestone.year}</time>
            <h3>{milestone.title}</h3>
            <p>{milestone.desc}</p>
            <span className={styles.timelineSignal} aria-hidden="true"><i /></span>
          </li>
        ))}
      </ol>

      <div className={styles.timelineFooter} aria-hidden="true">
        <span>FRAME 001</span><i /><span>FRAME 005</span>
      </div>
    </section>
  );
}
