import Image from "next/image";
import {
  HERO_CTA_LABEL,
  processSteps,
  qualityItems,
  STACK_LINE,
  WEB_CTA_HEADING,
  WEB_CTA_LABEL,
  WEB_HERO_SUBCOPY,
  WEB_WHATSAPP_HREF,
  webAudiences,
  webItems,
} from "../solutionsData";
import { figures, perfBars, stripPhotos, workPhotos } from "./webContent";
import { WebMetricArtifact } from "./WebMetricArtifact";
import styles from "./web.module.css";

function Eyebrow({ label, index }: { label: string; index?: string }) {
  return (
    <span className={styles.eyebrow}>
      <b />
      {index ? <span className={styles.eyebrowGreen}>{index}</span> : null}
      {label}
    </span>
  );
}

function PhotoStrip({
  photos,
  wide = false,
}: {
  photos: readonly string[];
  wide?: boolean;
}) {
  return (
    <div className={styles.strip}>
      {photos.map((src) => (
        <div key={src} className={`${styles.shot} ${wide ? styles.shotWide : ""}`}>
          <Image
            src={src}
            alt=""
            fill
            sizes="(max-width: 900px) 40vw, 18vw"
          />
        </div>
      ))}
    </div>
  );
}

export function WebStudio() {
  return (
    <div className={styles.page}>
      {/* ── 1 · Hero ── */}
      <section className={`${styles.section} ${styles.dark} ${styles.grid} ${styles.hero}`}>
        <div className={styles.heroHead}>
          <Eyebrow label="Belis · Web" index="02" />
          <h1 className={`${styles.h} ${styles.hHero}`}>
            Seu site deveria
            <br />
            trabalhar <span className={styles.accent}>todos os dias.</span>
          </h1>
          <p className={styles.lede}>{WEB_HERO_SUBCOPY}</p>
        </div>
        <div className={styles.heroFoot}>
          <div className={styles.metaRow}>
            <span>Conversão</span>
            <span>SEO · GEO · AEO</span>
            <span>Performance</span>
            <span>Arquitetura semântica</span>
          </div>
          <a className={styles.ctaBtn} href={WEB_WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">
            {HERO_CTA_LABEL} <i>→</i>
          </a>
        </div>
      </section>

      {/* ── 2 · Statement + photo strip ── */}
      <section className={`${styles.section} ${styles.paper}`}>
        <div className={styles.split}>
          <h2 className={`${styles.h} ${styles.hBig}`}>
            De site que apenas apresenta
            <br />
            <span className={styles.muted}>a</span> ativo que atrai e converte.
          </h2>
          <div className={styles.colStack}>
            <Eyebrow label="Fundação" />
            <p className={styles.lede}>
              Seu cliente decide em segundos. Estrutura, copy, velocidade e
              experiência trabalham juntos para tornar visível a qualidade que
              sua empresa levou anos para construir.
            </p>
          </div>
        </div>
        <PhotoStrip photos={stripPhotos} />
      </section>

      {/* ── 3 · Metrics + bars ── */}
      <section className={`${styles.section} ${styles.dark2} ${styles.grid}`}>
        <Eyebrow label="Números" index="—" />
        <div className={styles.metrics} style={{ marginTop: "clamp(28px,4vh,56px)" }}>
          <div className={styles.figures}>
            {figures.map(([num, label]) => (
              <div key={label} className={styles.figure}>
                <span className={styles.figureNum}>{num}</span>
                <span className={styles.figureLabel}>{label}</span>
              </div>
            ))}
          </div>
          <WebMetricArtifact />
          <div className={styles.barsPanel}>
            <div className={styles.bars} aria-hidden="true">
              {perfBars.map((h, i) => (
                <span
                  key={i}
                  className={styles.bar}
                  style={{ height: `${h}%`, animationDelay: `${i * 55}ms` }}
                />
              ))}
            </div>
            <div className={styles.barsLabel}>
              <span>Carregamento</span>
              <span>Interação</span>
              <span>Conversão</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4 · Offerings ── */}
      <section className={`${styles.section} ${styles.paper2}`}>
        <div className={styles.split}>
          <h2 className={`${styles.h} ${styles.hMed}`}>O que construímos</h2>
          <div className={styles.colStack}>
            <Eyebrow label="Escopo" />
            <p className={styles.lede}>
              Cada projeto nasce do negócio e do resultado esperado. Tecnologia
              entra depois da clareza.
            </p>
          </div>
        </div>
        <div className={styles.list}>
          {webItems.map((item, i) => (
            <div key={item.name} className={styles.row}>
              <span className={styles.rowIndex}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className={styles.rowBody}>
                <span className={styles.rowName}>{item.name}</span>
                <span className={styles.rowDesc}>{item.description}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5 · Work photos ── */}
      <section className={`${styles.section} ${styles.dark} ${styles.grid}`}>
        <div className={styles.split}>
          <h2 className={`${styles.h} ${styles.hBig}`}>
            O studio por trás
            <br />
            de presenças que <span className={styles.accent}>vendem.</span>
          </h2>
          <div className={styles.colStack}>
            <Eyebrow label="Portfólio" index="↗" />
            <p className={styles.lede}>
              Marcas que evoluíram e passaram a comunicar, em segundos, a
              autoridade que já entregavam.
            </p>
          </div>
        </div>
        <PhotoStrip photos={workPhotos} wide />
      </section>

      {/* ── 6 · Audiences ── */}
      <section className={`${styles.section} ${styles.paper}`}>
        <Eyebrow label="Para quem" index="—" />
        <h2
          className={`${styles.h} ${styles.hMed}`}
          style={{ marginTop: "clamp(16px,2vh,28px)" }}
        >
          Feito para empresas em movimento.
        </h2>
        <div className={`${styles.cards} ${styles.cardsThree}`}>
          {webAudiences.map((item, i) => (
            <div key={item.name} className={styles.card}>
              <span className={styles.cardTop}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.cardName}>{item.name}</span>
              <span className={styles.cardDesc}>{item.description}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7 · Process ── */}
      <section className={`${styles.section} ${styles.dark2} ${styles.grid}`}>
        <Eyebrow label="Processo" index="04" />
        <h2
          className={`${styles.h} ${styles.hMed}`}
          style={{ marginTop: "clamp(16px,2vh,28px)" }}
        >
          Da clareza ao ativo no ar.
        </h2>
        <div className={styles.list}>
          {processSteps.map((step) => (
            <div key={step.index} className={styles.row}>
              <span className={styles.rowIndex}>{step.index}</span>
              <div className={styles.rowBody}>
                <span className={styles.rowName}>{step.name}</span>
                <span className={styles.rowDesc}>{step.description}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8 · Quality ── */}
      <section className={`${styles.section} ${styles.paper2}`}>
        <Eyebrow label="Fundação técnica" />
        <h2
          className={`${styles.h} ${styles.hMed}`}
          style={{ marginTop: "clamp(16px,2vh,28px)" }}
        >
          Rápido, claro e preparado para evoluir.
        </h2>
        <div className={styles.cards}>
          {qualityItems.map((item) => (
            <div key={item.name} className={styles.card}>
              <span className={styles.cardName}>{item.name}</span>
              <span className={styles.cardDesc}>{item.description}</span>
            </div>
          ))}
        </div>
        <p className={styles.stackLine}>{STACK_LINE}</p>
      </section>

      {/* ── 9 · CTA + wordmark echo ── */}
      <section className={`${styles.section} ${styles.dark} ${styles.grid} ${styles.cta}`}>
        <Eyebrow label="Próximo passo" index="→" />
        <h2 className={`${styles.h} ${styles.hBig}`}>{WEB_CTA_HEADING}</h2>
        <a className={styles.ctaBtn} href={WEB_WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">
          {WEB_CTA_LABEL} <i>→</i>
        </a>
        <div className={styles.wordmark} aria-hidden="true">
          <s>/</s>BELIS
        </div>
        <span className={styles.wordmarkSub}>Web Studio · São Paulo · 2026</span>
      </section>
    </div>
  );
}
