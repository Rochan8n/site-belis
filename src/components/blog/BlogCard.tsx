import Image from "next/image";
import Link from "next/link";
import { BLOG_THEMES } from "@/content/blog/themes";
import type { BlogCardData } from "@/content/blog/types";
import styles from "./blog.module.css";

export function BlogCard({ post }: { post: BlogCardData }) {
  return <article className={styles.card}>
    <Link href={`/blog/${post.slug}`} className={styles.cardImage} tabIndex={-1} aria-hidden="true">
      <Image src={`/blog/${post.slug}/capa`} alt={post.coverAlt} width={1200} height={630} sizes="(max-width: 700px) 90vw, (max-width: 1000px) 44vw, 360px" unoptimized />
    </Link>
    <div className={styles.cardMeta}><span>{BLOG_THEMES[post.theme].label}</span><span>{post.readingMinutes} min de leitura</span></div>
    <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
    <p>{post.description}</p>
    <Link href={`/blog/${post.slug}`} className={styles.textLink} aria-label={`Ler guia: ${post.title}`}>Ler guia <span aria-hidden="true">↗</span></Link>
  </article>;
}
