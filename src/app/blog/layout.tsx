import Link from "next/link";
import styles from "@/components/blog/blog.module.css";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <div className={styles.shell}>
    <a className={styles.skip} href="#blog-main">Pular para o conteúdo</a>
    <header className={styles.header}>
      <Link href="/" className={styles.brand} aria-label="Belis: início">BELIS</Link>
      <nav aria-label="Navegação principal">
        <Link href="/portfolio">Portfólio</Link><Link href="/websites">Sites</Link><Link href="/sistemas">Sistemas</Link><Link href="/blog">Blog</Link><Link href="/contato">Contato</Link>
      </nav>
    </header>
    {children}
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <Link href="/" className={styles.brand}>BELIS</Link>
        <p>Audiovisual, sites e software para apresentar sua empresa e organizar sua próxima etapa.</p>
      </div>
      <nav aria-label="Links do blog">
        <Link href="/blog">Todos os artigos</Link><Link href="/blog/politica-editorial">Política editorial</Link><Link href="/sobre">Sobre a Belis</Link><a href="/blog/feed.xml">RSS</a><Link href="/contato">Conversar sobre um projeto</Link>
      </nav>
      <small>© {new Date().getFullYear()} BELIS AGENCY · SÃO PAULO</small>
    </footer>
  </div>;
}
