import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogCta, type BlogOfferProps } from "@/components/blog/BlogCta";
import { BlogExperience } from "@/components/blog/BlogExperience";
import { BlogDownload, BlogShare } from "@/components/blog/BlogActions";
import { articleJsonLd, BLOG_AUTHOR, BLOG_SITE_URL, blogPath, coverPath, formatBlogDate, getBlogPost, getBlogPosts, getRelatedPosts, jsonLdString, readingMinutes, whatsappHref } from "@/content/blog";
import { BLOG_THEMES, themePath } from "@/content/blog/themes";
import type { BlogBlock } from "@/content/blog/types";
import { blogMetadata } from "@/lib/blog-metadata";
import styles from "@/components/blog/blog.module.css";

// Known posts are prerendered; unknown or draft slugs use the explicit notFound guard.
export const dynamicParams = true;
export function generateStaticParams() { return getBlogPosts().map(post => ({ slug: post.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  const metadata = blogMetadata(post.seoTitle, post.description, blogPath(slug), coverPath(slug));
  return { ...metadata, authors: [{ name: BLOG_AUTHOR.name, url: BLOG_AUTHOR.url }], openGraph: { ...metadata.openGraph, type: "article", publishedTime: `${post.publishedAt}T12:00:00-03:00`, modifiedTime: `${post.updatedAt}T12:00:00-03:00`, authors: [BLOG_AUTHOR.url], section: BLOG_THEMES[post.theme].label, images: [{ url: coverPath(slug), width: 1200, height: 630, alt: post.coverAlt, type: "image/png" }] } };
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "paragraph": return <p>{block.text}</p>;
    case "list": return block.ordered ? <ol>{block.items.map(item => <li key={item}>{item}</li>)}</ol> : <ul>{block.items.map(item => <li key={item}>{item}</li>)}</ul>;
    case "callout": return <aside className={styles.callout}><h3>{block.title}</h3><p>{block.text}</p></aside>;
    case "link": return <p><Link href={block.href} className={styles.textLink}>{block.label} ↗</Link></p>;
    case "table": return <div className={styles.tableWrap} tabIndex={0} role="region" aria-label={block.caption}><table><caption>{block.caption}</caption><thead><tr>{block.columns.map(column => <th key={column} scope="col">{column}</th>)}</tr></thead><tbody>{block.rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>;
  }
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  const theme = BLOG_THEMES[post.theme];
  const url = `${BLOG_SITE_URL}${blogPath(slug)}`;
  const offer: BlogOfferProps = { slug, theme: post.theme, ...post.cta, href: whatsappHref(post) };
  return <main id="blog-main" className={styles.container}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(articleJsonLd(post)) }} />
    <BlogExperience {...offer} />
    <nav className={styles.breadcrumbs} aria-label="Caminho do artigo"><ol><li><Link href="/">Início</Link></li><li><Link href="/blog">Blog</Link></li><li><Link href={themePath(post.theme)}>{theme.label}</Link></li><li aria-current="page">{post.title}</li></ol></nav>
    <article>
      <header className={styles.articleHeader}>
        <span className={styles.sectionLabel}>{theme.label} / {post.format}</span>
        <h1>{post.title}</h1><p>{post.description}</p>
        <div className={styles.meta}><span>Por <Link href="/sobre">{BLOG_AUTHOR.name}</Link></span><time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time><span>{readingMinutes(post)} min de leitura</span>{post.updatedAt !== post.publishedAt && <span>Atualizado em <time dateTime={post.updatedAt}>{formatBlogDate(post.updatedAt)}</time></span>}</div>
        <BlogShare slug={slug} theme={post.theme} title={post.title} url={url} />
      </header>
      <Image className={styles.articleCover} src={coverPath(slug)} alt={post.coverAlt} width={1200} height={630} sizes="(max-width: 1000px) 90vw, 960px" preload unoptimized />
      <div className={styles.articleLayout}>
        <aside className={styles.sidebar}>
          <nav className={styles.toc} aria-label="Índice do artigo"><p>Neste guia</p><ol>{post.sections.map(section => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}<li><a href="#perguntas-frequentes">Perguntas frequentes</a></li><li><a href="#fontes">Fontes e referências</a></li></ol></nav>
          <BlogCta {...offer} placement="sidebar" dismissible />
        </aside>
        <div id="blog-article-body" className={styles.articleBody}>
          <aside className={styles.quickAnswer} aria-labelledby="resposta-rapida"><h2 id="resposta-rapida">Resposta rápida</h2><p>{post.quickAnswer}</p></aside>
          <BlogCta {...offer} placement="top" />
          {post.introduction.map(text => <p key={text}>{text}</p>)}
          {post.sections.map((section, index) => <section id={section.id} key={section.id}>
            <h2>{section.title}</h2>{section.blocks.map((block, blockIndex) => <Block key={blockIndex} block={block} />)}
            {index === 1 && <BlogCta {...offer} placement="middle" />}
          </section>)}
          {post.download && <BlogDownload slug={slug} theme={post.theme} label={post.download.label} />}
          <section id="perguntas-frequentes" className={styles.faq}><h2>Perguntas frequentes</h2>{post.faq.map(item => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</section>
          <section id="fontes" className={styles.sources}><h2>Fontes e referências</h2><p>Orientações de contratação são conteúdo editorial da Belis. As referências abaixo apoiam os pontos técnicos indicados.</p><ul>{post.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title} ↗</a><small>{source.note}</small></li>)}</ul></section>
          <aside className={styles.author}><p><strong>{BLOG_AUTHOR.name}</strong> publica guias sobre audiovisual, sites e software para ajudar empresas a planejar seus projetos.</p><Link className={styles.textLink} href="/sobre">Sobre a Belis</Link>{" · "}<Link className={styles.textLink} href="/blog/politica-editorial">Política editorial</Link></aside>
          <BlogCta {...offer} placement="bottom" />
          <p><Link className={styles.textLink} href={theme.servicePath}>{theme.serviceLabel} ↗</Link></p>
        </div>
      </div>
    </article>
    <section className={styles.related} aria-labelledby="related-heading"><h2 id="related-heading">Continue sua decisão</h2><div className={styles.grid}>{getRelatedPosts(post).map(related => <BlogCard key={related.slug} post={related} />)}</div></section>
  </main>;
}
