"use client";

import { useId, useMemo, useState } from "react";
import type { BlogCardData } from "@/content/blog/types";
import { BLOG_THEMES } from "@/content/blog/themes";
import { BlogCard } from "./BlogCard";
import styles from "./blog.module.css";

function normalize(value: string): string {
  return value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLocaleLowerCase("pt-BR").trim();
}

export function BlogCatalog({ posts, title = "Guias para sua próxima decisão" }: { posts: BlogCardData[]; title?: string }) {
  const [query, setQuery] = useState("");
  const id = useId();
  const filtered = useMemo(() => {
    const terms = normalize(query).split(/\s+/).filter(Boolean);
    return posts.filter(post => {
      const text = normalize(`${post.title} ${post.description} ${BLOG_THEMES[post.theme].label} ${post.format}`);
      return terms.every(term => text.includes(term));
    });
  }, [posts, query]);
  return <section className={styles.catalog} aria-labelledby={`${id}-heading`}>
    <div className={styles.catalogTop}>
      <div><span className={styles.sectionLabel}>Biblioteca Belis</span><h2 id={`${id}-heading`}>{title}</h2></div>
      <div className={styles.search}>
        <label htmlFor={`${id}-search`}>Buscar nos artigos</label>
        <input type="search" id={`${id}-search`} value={query} onChange={event => setQuery(event.target.value)} placeholder="Ex.: orçamento, site, automação" autoComplete="off" aria-controls={`${id}-results`} />
      </div>
    </div>
    <p className={styles.resultCount} role="status">{filtered.length} {filtered.length === 1 ? "artigo encontrado" : "artigos encontrados"}</p>
    <div id={`${id}-results`} className={styles.grid}>{filtered.map(post => <BlogCard key={post.slug} post={post} />)}</div>
    {!filtered.length && <div className={styles.empty}><p>Nenhum artigo corresponde à busca. Tente outro assunto ou uma palavra mais curta.</p><button type="button" onClick={() => setQuery("")}>Limpar busca</button></div>}
  </section>;
}
