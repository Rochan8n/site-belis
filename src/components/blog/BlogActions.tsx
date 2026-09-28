"use client";

import { useState } from "react";
import { trackBlogEvent } from "@/lib/analytics-consent";
import styles from "./blog.module.css";

export function BlogShare({ slug, theme, title, url }: { slug: string; theme: string; title: string; url: string }) {
  const [status, setStatus] = useState("");
  return <div className={styles.share}>
    <button type="button" onClick={async () => {
      try {
        await navigator.clipboard.writeText(url);
        setStatus("Link copiado.");
        trackBlogEvent("blog_share", slug, theme, "share");
      } catch { setStatus("Não foi possível copiar. Use o endereço desta página ou compartilhe pelo WhatsApp."); }
    }}>Copiar link</button>
    <a href={`https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`} target="_blank" rel="noopener noreferrer" onClick={() => trackBlogEvent("blog_share", slug, theme, "share")}>Compartilhar no WhatsApp</a>
    <span role="status">{status}</span>
  </div>;
}

export function BlogDownload({ slug, theme, label }: { slug: string; theme: string; label: string }) {
  return <aside className={styles.download}>
    <a href={`/blog/${slug}/checklist`} download onClick={() => trackBlogEvent("blog_download", slug, theme, "download")}>{label} ↓</a>
    <p>Arquivo de texto para preencher. Download direto, sem cadastro.</p>
  </aside>;
}
