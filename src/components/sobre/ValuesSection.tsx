import styles from "./sobre.module.css";

const values = [
  {
    title: "Nossa Missão",
    label: "Missão",
    desc: "Fazer empresas excelentes serem percebidas com a clareza, a confiança e o valor que já existem dentro delas.",
  },
  {
    title: "Nossa Visão",
    label: "Visão",
    desc: "Construir relações duradouras com empresas que querem alinhar marca, experiência digital e operação à próxima fase do negócio.",
  },
  {
    title: "Como trabalhamos",
    label: "Método",
    desc: "Escutamos antes de propor. Organizamos antes de executar. Cada decisão precisa fortalecer percepção, facilitar uma escolha ou remover um gargalo real.",
  },
];

export function ValuesSection() {
  return (
    <section className={styles.values} aria-labelledby="values-title">
      <div className={styles.valuesHead}>
        <p className={styles.eyebrow}><i aria-hidden="true" /> Princípios operacionais</p>
        <h2 id="values-title">O que orienta <em>cada decisão.</em></h2>
      </div>

      <ol className={styles.valuesGrid}>
        {values.map((value, index) => (
          <li key={value.title}>
            <div className={styles.valueMeta}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span>{value.label}</span>
            </div>
            <h3>{value.title}</h3>
            <p>{value.desc}</p>
            <i className={styles.valueCross} aria-hidden="true" />
          </li>
        ))}
      </ol>

      <div className={styles.valuesFooter}>
        <span>/BELIS</span>
        <span>CLAREZA · PERCEPÇÃO · ESTRUTURA</span>
      </div>
    </section>
  );
}
