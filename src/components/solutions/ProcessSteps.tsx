import { processSteps } from "./solutionsData";
import styles from "./solutions.module.css";

export function ProcessSteps() {
  return (
    <section
      aria-labelledby="solutions-process-title"
      className={`${styles.section} ${styles.darkSection} ${styles.gridField}`}
    >
      <div className={styles.sectionShell}>
        <p className={styles.eyebrow}><span aria-hidden="true">✦</span> 03 — Como construímos</p>
        <h2 id="solutions-process-title" className={`${styles.heading} ${styles.sectionTitle}`}>
          Clareza antes<br />de execução.
        </h2>
        <ol className={styles.processList}>
          {processSteps.map((step) => (
            <li key={step.index} className={styles.processStep}>
              <span className={styles.stepIndex}>{step.index}</span>
              <h3>{step.name}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
