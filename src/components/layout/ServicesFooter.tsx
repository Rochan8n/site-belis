import { ServiceLinks } from "./ServiceLinks";
import styles from "./servicesFooter.module.css";

export function ServicesFooter() {
  return (
    <footer className={styles.footer}>
      <nav aria-label="Serviços Belis">
        <p>Conheça mais serviços da Belis</p>
        <div className={styles.links}><ServiceLinks /></div>
      </nav>
    </footer>
  );
}
