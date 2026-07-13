import { qualityItems, STACK_LINE } from "./solutionsData";
import styles from "./solutions.module.css";

export function QualityGrid() {
  return (
    <section
      aria-labelledby="solutions-quality-title"
      className={`${styles.section} ${styles.paperSection} ${styles.paperSecond}`}
    >
      <div className={styles.sectionShell}>
        <p className={`${styles.eyebrow} ${styles.eyebrowInk}`}><span aria-hidden="true">✦</span> 04 — O que sustenta a entrega</p>
        <h2 id="solutions-quality-title" className={`${styles.heading} ${styles.sectionTitle}`}>
          Tecnologia que sustenta<br />sua próxima fase.
        </h2>
        <ul className={styles.qualityList}>
          {qualityItems.map((item, index) => (
            <li key={item.name} className={styles.qualityItem}>
              <span aria-hidden="true" className={styles.panelIndex}>Q{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className={styles.stackLine}>{STACK_LINE}</p>
      </div>
    </section>
  );
}
