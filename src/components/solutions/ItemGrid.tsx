import type { SolutionItem } from "./solutionsData";
import styles from "./solutions.module.css";

type ItemGridProps = {
  category: string;
  items: readonly SolutionItem[];
};

export function ItemGrid({ category, items }: ItemGridProps) {
  return (
    <section
      aria-labelledby="solutions-items-title"
      className={`${styles.section} ${styles.darkSection} ${styles.gridField}`}
    >
      <div className={styles.sectionShell}>
        <p className={styles.eyebrow}><span aria-hidden="true">✦</span> 01 — O que muda</p>
        <h2 id="solutions-items-title" className={`${styles.heading} ${styles.sectionTitle}`}>
          Soluções diferentes,<br />uma transformação coerente.
        </h2>

        <div className={styles.itemLayout}>
          <h3 className={styles.category}>{category}</h3>
          <ol className={styles.itemList}>
          {items.map((item, index) => (
            <li key={item.name} className={styles.itemRow}>
              <span aria-hidden="true" className={styles.rowIndex}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className={styles.rowBody}>
                <h4>{item.name}</h4>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
