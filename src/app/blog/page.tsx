import Image from "next/image";
import Link from "next/link";
import { BlogCatalog } from "@/components/blog/BlogCatalog";
import { BLOG_SITE_URL, getBlogCards, jsonLdString } from "@/content/blog";
import { BLOG_THEME_IDS, BLOG_THEMES, themePath } from "@/content/blog/themes";
import { blogMetadata } from "@/lib/blog-metadata";
import styles from "@/components/blog/blog.module.css";

export const metadata = blogMetadata("Blog Belis: audiovisual, sites e software para empresas", "Guias para contratar vídeos, criar sites e organizar processos. Compare opções, prepare seu briefing e tome decisões melhores para sua empresa.", "/blog");

export default function BlogPage() {
  const posts = getBlogCards();
  const featured = posts[0];
  const schema = {
    "@context": "https://schema.org", "@graph": [
      { "@type": "Blog", "@id": `${BLOG_SITE_URL}/blog#blog`, name: "Blog Belis Agency", url: `${BLOG_SITE_URL}/blog`, inLanguage: "pt-BR", publisher: { "@id": `${BLOG_SITE_URL}/#organization` }, blogPost: posts.map(post => ({ "@type": "BlogPosting", "@id": `${BLOG_SITE_URL}/blog/${post.slug}#article`, headline: post.title, url: `${BLOG_SITE_URL}/blog/${post.slug}` })) },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Início", item: BLOG_SITE_URL }, { "@type": "ListItem", position: 2, name: "Blog", item: `${BLOG_SITE_URL}/blog` }] },
    ],
  };
  return <main id="blog-main" className={styles.container}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(schema) }} />
    <header className={styles.hero}>
      <div className={styles.eyebrow}><span>Caderno Belis / Blog</span><span>Audiovisual · Web · Software</span></div>
      <h1>Antes do próximo investimento, uma decisão melhor.</h1>
      <p>Guias para escolher o projeto certo, comparar propostas e preparar o que sua empresa precisa para avançar.</p>
      <nav className={styles.themes} aria-label="Temas do blog"><Link href="/blog" aria-current="page">Todos os temas</Link>{BLOG_THEME_IDS.map(theme => <Link key={theme} href={themePath(theme)}>{BLOG_THEMES[theme].label}</Link>)}</nav>
    </header>
    {featured && <article className={styles.featured}>
      <Link href={`/blog/${featured.slug}`} className={styles.featuredMedia} tabIndex={-1} aria-hidden="true"><Image src={`/blog/${featured.slug}/capa`} alt={featured.coverAlt} width={1200} height={630} sizes="(max-width: 700px) 90vw, 620px" preload unoptimized /></Link>
      <div className={styles.featuredContent}><span className={styles.sectionLabel}>Comece por aqui / {BLOG_THEMES[featured.theme].label}</span><h2><Link href={`/blog/${featured.slug}`}>{featured.title}</Link></h2><p>{featured.description}</p><span className={styles.meta}>{featured.format} · {featured.readingMinutes} min de leitura</span><Link href={`/blog/${featured.slug}`} className={styles.textLink}>Ler guia ↗</Link></div>
    </article>}
    <BlogCatalog posts={posts} />
  </main>;
}
