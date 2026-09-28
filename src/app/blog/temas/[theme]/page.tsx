import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCatalog } from "@/components/blog/BlogCatalog";
import { BLOG_SITE_URL, getBlogCards, jsonLdString } from "@/content/blog";
import { BLOG_THEMES, BLOG_THEME_IDS, isBlogTheme, themePath } from "@/content/blog/themes";
import { blogMetadata } from "@/lib/blog-metadata";
import styles from "@/components/blog/blog.module.css";

// Keep unknown themes on the normal notFound path rather than a static fallback.
export const dynamicParams = true;
export function generateStaticParams() { return BLOG_THEME_IDS.map(theme => ({ theme })); }

export async function generateMetadata({ params }: { params: Promise<{ theme: string }> }) {
  const { theme } = await params;
  if (!isBlogTheme(theme)) notFound();
  const info = BLOG_THEMES[theme];
  return blogMetadata(info.title, info.description, themePath(theme));
}

export default async function BlogThemePage({ params }: { params: Promise<{ theme: string }> }) {
  const { theme } = await params;
  if (!isBlogTheme(theme)) notFound();
  const info = BLOG_THEMES[theme];
  const posts = getBlogCards(theme);
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "CollectionPage", name: info.title, description: info.description, url: `${BLOG_SITE_URL}${themePath(theme)}`, isPartOf: { "@id": `${BLOG_SITE_URL}/blog#blog` }, mainEntity: { "@type": "ItemList", itemListElement: posts.map((post, index) => ({ "@type": "ListItem", position: index + 1, name: post.title, url: `${BLOG_SITE_URL}/blog/${post.slug}` })) } },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Início", item: BLOG_SITE_URL }, { "@type": "ListItem", position: 2, name: "Blog", item: `${BLOG_SITE_URL}/blog` }, { "@type": "ListItem", position: 3, name: info.label, item: `${BLOG_SITE_URL}${themePath(theme)}` }] },
  ] };
  return <main id="blog-main" className={styles.container}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(schema) }} />
    <nav className={styles.breadcrumbs} aria-label="Caminho da página"><ol><li><Link href="/">Início</Link></li><li><Link href="/blog">Blog</Link></li><li aria-current="page">{info.label}</li></ol></nav>
    <header className={styles.hero}>
      <div className={styles.eyebrow}><span>Caderno Belis / {info.label}</span><span>Guias para empresas</span></div>
      <h1>{info.title}</h1><p>{info.description}</p>
      <nav className={styles.themes} aria-label="Temas do blog"><Link href="/blog">Todos os temas</Link>{BLOG_THEME_IDS.map(id => <Link key={id} href={themePath(id)} aria-current={id === theme ? "page" : undefined}>{BLOG_THEMES[id].label}</Link>)}</nav>
    </header>
    <BlogCatalog posts={posts} title={`Guias de ${info.label.toLocaleLowerCase("pt-BR")}`} />
    <aside className={styles.cta}><h2>Do planejamento ao projeto.</h2><p>Conheça a atuação da Belis e converse sobre o que sua empresa precisa.</p><Link className={styles.button} href={info.servicePath}>{info.serviceLabel} ↗</Link></aside>
  </main>;
}
