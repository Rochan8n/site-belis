import Link from "next/link";
import styles from "@/components/blog/blog.module.css";

export default function BlogNotFound() {
  return <main id="blog-main" className={styles.container}><header className={styles.hero}><span className={styles.sectionLabel}>Blog / 404</span><h1>Artigo não encontrado.</h1><p>Este endereço não corresponde a um guia publicado. Explore os temas disponíveis no blog.</p></header><p><Link className={styles.button} href="/blog">Ver artigos publicados ↗</Link></p></main>;
}
