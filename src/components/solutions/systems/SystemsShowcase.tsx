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
    url: "creatortools.com.br",
    logo: { src: "/images/systems/creatortools.png", alt: "Creator Tools", width: 512, height: 512 },
    stackLabel: "Feito com",
    stack: ["React", "TypeScript", "Serverless · Vercel", "IA generativa", "Supabase"],
    render: () => <CreatorStudio />,
    caption: "Explore o menu. Cada seção mostra uma tela real do Creator Tools",
    body: (
      <>
        Quem produz conteúdo sabe quanto tempo existe entre ter uma boa ideia e publicar. O
        <strong> Creator Tools</strong> encurta esse caminho: você parte de um tema ou briefing e
        recebe o carrossel montado, com roteiro, headlines, imagens e legenda. O sistema também ajuda
        a encontrar assuntos em alta e mantém cada slide dentro da identidade da marca. Assim, sobra
        mais tempo para decidir o que vale dizer e menos para começar tudo do zero.
        <br />
        <br />
        Para essa experiência continuar rápida mesmo durante gerações mais longas, construímos a
        interface em <strong>React com TypeScript</strong>, distribuímos o processamento em
        <strong> funções serverless na Vercel</strong> e organizamos projetos, versões e arquivos no
        <strong> Supabase</strong>. Tecnologia presente, mas sem atrapalhar o fluxo de criação.
      </>
    ),
  },
  {
    kicker: "Case · Sistema de operação",
    title: "O pátio da oficina, vivo na tela",
    url: "mecapro.com.br",
    logo: { src: "/images/systems/mecapro.webp", alt: "MecaPRO", width: 168, height: 61 },
    stackLabel: "Feito com",
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "WhatsApp API"],
    render: () => <MecaproKanban />,
    caption: "Interface real do MecaPRO. Arraste os cards entre as etapas",
    body: (
      <>
        Oficina cheia exige informação clara. O <strong>MecaPRO</strong> reúne cada carro, orçamento
        e ordem de serviço num pátio digital que toda equipe consegue acompanhar. O mecânico pode
        falar pelo WhatsApp para abrir uma OS e incluir peças, enquanto o sistema organiza os dados,
        consulta fornecedores e compara cotações. Da entrada à entrega, o dono sabe o que está
        parado, o que precisa de atenção e qual serviço vem depois.
        <br />
        <br />
        A interface em <strong>React com TypeScript</strong> conversa com uma estrutura em
        <strong> Node.js e PostgreSQL</strong>, preparada para manter histórico, estoque, financeiro
        e ordens de serviço no mesmo lugar. Com o <strong>WhatsApp integrado</strong>, equipe,
        fornecedores e clientes recebem as informações certas sem depender de recados soltos.
      </>
    ),
  },
];

export function SystemsShowcase() {
  return (
    <section aria-labelledby="systems-showcase-title" className={styles.showcase}>
      <div className={styles.shell}>
        <p className={styles.eyebrow}>
          <span aria-hidden="true">✦</span> Prova real · em produção
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
                    <a
                      className={styles.url}
                      href={`https://${b.url}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {b.url}
                    </a>
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
