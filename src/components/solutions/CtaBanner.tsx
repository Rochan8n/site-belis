import { TransitionLink } from "@/components/layout/TransitionLink";
import { EMAIL_HREF, INSTAGRAM_HREF } from "./solutionsData";
import styles from "./solutions.module.css";

type CtaBannerProps = {
  heading: string;
  ctaLabel: string;
  ctaHref: string;
};

export function CtaBanner({ heading, ctaLabel, ctaHref }: CtaBannerProps) {
  return (
    <section
      aria-labelledby="solutions-cta-title"
      className={`${styles.section} ${styles.ctaSection} ${styles.gridField}`}
    >
      <div className={`${styles.sectionShell} ${styles.ctaInner}`}>
        <p className={styles.eyebrow}><span aria-hidden="true">✦</span> Próxima evolução</p>
        <h2 id="solutions-cta-title" className={`${styles.heading} ${styles.ctaTitle}`}>{heading}</h2>
        <a
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.primaryAction}
        >
          {ctaLabel} <span aria-hidden="true">→</span>
        </a>
        <nav
          aria-label="Links complementares"
          className={styles.ctaLinks}
        >
          <TransitionLink href="/">← Home</TransitionLink>
          <a
            href={INSTAGRAM_HREF}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a href={EMAIL_HREF}>
            Lucas@belis.agency
          </a>
        </nav>
        <div className={styles.ctaMeta} aria-hidden="true">
          <span>BELIS © 2026</span>
          <span>SÃO PAULO · BR</span>
        </div>
      </div>
    </section>
  );
}
