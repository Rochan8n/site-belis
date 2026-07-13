import { SolutionBlob } from "./SolutionBlob";
import styles from "./solutions.module.css";

type SolutionHeroProps = {
  eyebrow: string;
  headline: string;
  accent: string;
  subcopy: string;
  ctaLabel: string;
  ctaHref: string;
};

export function SolutionHero({
  eyebrow,
  headline,
  accent,
  subcopy,
  ctaLabel,
  ctaHref,
}: SolutionHeroProps) {
  return (
    <section
      aria-labelledby="solutions-hero-title"
      className={`${styles.section} ${styles.hero} ${styles.gridField}`}
    >
      <div className={styles.heroHud} aria-hidden="true">
        <span>03 / SYSTEMS</span>
        <span>OPERAÇÃO · AUTOMAÇÃO · DADOS</span>
      </div>

      <div className={styles.heroArtifact} aria-hidden="true">
        <SolutionBlob className={styles.blob} />
      </div>
      <div className={styles.targetFrame} aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>

      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}>
          <span aria-hidden="true">✦</span> {eyebrow} · Escala
        </p>
        <h1 id="solutions-hero-title" className={`${styles.heading} ${styles.heroTitle}`}>
          {headline}
          <br />
          <span className={styles.accent}>{accent}</span>
        </h1>
        <p className={styles.heroLede}>{subcopy}</p>
        <a
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.primaryAction}
        >
          {ctaLabel} <span aria-hidden="true">→</span>
        </a>
      </div>

      <div className={styles.heroFoot} aria-hidden="true">
        <span>SÃO PAULO · 23.55°S 46.63°W</span>
        <span className={styles.progress}>003 / 006 <i><b /></i> SCROLL ↓</span>
      </div>
    </section>
  );
}
