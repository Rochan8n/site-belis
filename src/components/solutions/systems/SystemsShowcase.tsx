import type { ReactNode } from "react";
import { CreatorStudio } from "./CreatorStudio";
import { MecaproKanban } from "./MecaproKanban";
import styles from "./systems.module.css";

type Block = {
  kicker: string;
  title: string;
  url: string;
  logo: { src: string; alt: string; width: number; height: number };
  stackLabel: string;
  stack: readonly string[];
  render: () => ReactNode;
  caption: string;
  body: ReactNode;
};

const BLOCKS: readonly Block[] = [
  {
    kicker: "Case · SaaS de conteúdo",
    title: "Da ideia ao carrossel pronto pra postar",
    url: "www.creatortools.com.br/generate",
    logo: { src: "/images/systems/creatortools.png", alt: "Creator Tools", width: 512, height: 512 },
    stackLabel: "Feito com",
    stack: ["React", "TypeScript", "Serverless · Vercel", "IA generativa", "Supabase"],
    render: () => <CreatorStudio />,
    caption: "Carousel Studio — clique nos slides pra navegar pela sequência",
    body: (
      <>
        O <strong>Creator Tools</strong> transforma um briefing numa sequência de carrosséis prontos
        pro Instagram. Ele descobre o que está viralizando no nicho, escreve as headlines, monta os
        slides no template da marca e já sugere a legenda — com o custo e o tempo de cada geração na
        frente. O que levava uma tarde inteira vira alguns cliques.
        <br />
        <br />
        Por baixo: a tela é feita em <strong>React com TypeScript</strong>, a geração de texto e imagem
        roda em <strong>funções serverless na Vercel</strong> conversando com modelos de IA, e tudo
        fica guardado no <strong>Supabase</strong>. Rápido porque quase nada fica travado esperando
        servidor.
      </>
    ),
  },
  {
    kicker: "Case · Sistema de operação",
    title: "O pátio da oficina, vivo na tela",
    url: "app.mecapro.com.br/patio",
    logo: { src: "/images/systems/mecapro.webp", alt: "MecaPRO", width: 168, height: 61 },
    stackLabel: "Feito com",
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "WhatsApp API"],
    render: () => <MecaproKanban />,
    caption: "Interface real do MecaPRO — arraste os cards entre as etapas",
    body: (
      <>
        O <strong>MecaPRO</strong> deixa uma oficina saber, num relance, onde está cada carro — do
        orçamento à entrega. O mecânico puxa o próximo serviço sem ninguém mandar, o dono enxerga o
        que está atrasado pela cor da borda, e cada carro que muda de etapa avisa o cliente sozinho.
        Você arrasta o card e o pátio inteiro se reorganiza.
        <br />
        <br />
        Por baixo: a interface é <strong>React com TypeScript</strong>, as regras do negócio rodam num
        servidor <strong>Node.js</strong>, e cada ordem de serviço fica salva com segurança no
        <strong> PostgreSQL</strong>. A <strong>integração com o WhatsApp</strong> avisa o cliente na
        hora certa, sem ninguém digitar mensagem.
      </>
    ),
  },
];

export function SystemsShowcase() {
  return (
    <section aria-labelledby="systems-showcase-title" className={styles.showcase}>
      <div className={styles.shell}>
        <p className={styles.eyebrow}>
          <span aria-hidden="true">✦</span> Prova real — em produção
        </p>
        <h2 id="systems-showcase-title" className={styles.title}>
          Não é maquete.<br />É produto rodando.
        </h2>
        <p className={styles.lede}>
          Dois sistemas que construímos e mantemos em produção, com clientes reais usando todo dia.
          Interaja com os dois aqui embaixo.
        </p>

        <div className={styles.blocks}>
          {BLOCKS.map((b) => (
            <article key={b.title} className={styles.block}>
              <div className={styles.explain}>
                <div className={styles.brandRow}>
                  <span className={styles.logoBadge}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className={styles.logo}
                      src={b.logo.src}
                      alt={b.logo.alt}
                      width={b.logo.width}
                      height={b.logo.height}
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                </div>
                <p className={styles.kicker}>{b.kicker}</p>
                <h3 className={styles.blockTitle}>{b.title}</h3>
                <p className={styles.blockDesc}>{b.body}</p>
                <p className={styles.stackLabel}>{b.stackLabel}</p>
                <ul className={styles.stack}>
                  {b.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.frameWrap}>
                <div className={styles.browser}>
                  <div className={styles.browserBar}>
                    <div className={styles.dots}><i /><i /><i /></div>
                    <span className={styles.url}>{b.url}</span>
                  </div>
                  <div className={styles.viewport}>{b.render()}</div>
                </div>
                <p className={styles.caption}>{b.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
