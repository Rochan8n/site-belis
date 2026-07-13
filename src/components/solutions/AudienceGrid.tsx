import type { SolutionItem } from "./solutionsData";
import styles from "./solutions.module.css";

export function AudienceGrid({ items }: { items: readonly SolutionItem[] }) {
  return (
    <section
      aria-labelledby="solutions-audience-title"
      className={`${styles.section} ${styles.paperSection}`}
    >
      <div className={styles.sectionShell}>
        <p className={`${styles.eyebrow} ${styles.eyebrowInk}`}><span aria-hidden="true">✦</span> 02 — O momento certo</p>
        <h2 id="solutions-audience-title" className={`${styles.heading} ${styles.sectionTitle}`}>
          Para empresas que precisam<br />avançar sem improvisar.
        </h2>
        <ul className={`${styles.audienceList} ${items.length === 1 ? styles.singleColumn : ""}`}>
          {items.map((item, index) => (
            <li key={item.name} className={styles.audienceItem}>
              <span aria-hidden="true" className={styles.panelIndex}>0{index + 1}</span>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
