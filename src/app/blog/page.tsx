import Image from "next/image";
import Link from "next/link";
import { BlogCatalog } from "@/components/blog/BlogCatalog";
import { BLOG_SITE_URL, getBlogCards, jsonLdString } from "@/content/blog";
import { BLOG_THEME_IDS, BLOG_THEMES, themePath } from "@/content/blog/themes";
import { blogMetadata } from "@/lib/blog-metadata";
import styles from "@/components/blog/blog.module.css";

export const metadata = blogMetadata("Blog Belis: engenharia reversa, marcas e negócios", "Guias de engenharia reversa, comunicação visual, audiovisual, sites e software. Compare opções, prepare seu projeto e converse com a Belis.", "/blog");

export default function BlogPage() {
  const posts = getBlogCards();
  const featured = ["engenharia-reversa", "comunicacao-visual"].flatMap(theme => posts.filter(post => post.theme === theme).slice(0, 1));
  const schema = {
    "@context": "https://schema.org", "@graph": [
      { "@type": "Blog", "@id": `${BLOG_SITE_URL}/blog#blog`, name: "Blog Belis Agency", url: `${BLOG_SITE_URL}/blog`, inLanguage: "pt-BR", publisher: { "@id": `${BLOG_SITE_URL}/#organization` }, blogPost: posts.map(post => ({ "@type": "BlogPosting", "@id": `${BLOG_SITE_URL}/blog/${post.slug}#article`, headline: post.title, url: `${BLOG_SITE_URL}/blog/${post.slug}` })) },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Início", item: BLOG_SITE_URL }, { "@type": "ListItem", position: 2, name: "Blog", item: `${BLOG_SITE_URL}/blog` }] },
    ],
  };
  return <main id="blog-main" className={styles.container}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(schema) }} />
    <header className={styles.hero}>
      <div className={styles.eyebrow}><span>Caderno Belis / Blog</span><span>Engenharia · Marcas · Negócios</span></div>
      <h1>Boas decisões.<br />Projetos que tomam forma.</h1>
      <p>Da peça fora de linha ao letreiro da sua marca. Guias para entender possibilidades, comparar propostas e preparar seu próximo projeto.</p>
      <nav className={styles.themes} aria-label="Temas do blog"><Link href="/blog" aria-current="page">Todos os temas</Link>{BLOG_THEME_IDS.map(theme => <Link key={theme} href={themePath(theme)}>{BLOG_THEMES[theme].label}</Link>)}</nav>
    </header>
    <section className={styles.featuredPair} aria-label="Em destaque: engenharia reversa e comunicação visual">
      {featured.map((post, index) => <article className={styles.editorialFeature} key={post.slug}>
        <div className={styles.featuredKicker}><span>0{index + 1} / {BLOG_THEMES[post.theme].label}</span><span>{post.readingMinutes} min</span></div>
        <Link href={`/blog/${post.slug}`} className={styles.featuredMedia} tabIndex={-1} aria-hidden="true"><Image src={post.coverImage ?? `/blog/${post.slug}/capa`} alt={post.coverAlt} width={1200} height={630} sizes="(max-width: 700px) 90vw, 45vw" preload={index === 0} unoptimized={!post.coverImage} /></Link>
        <div className={styles.featuredContent}><h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2><p>{post.description}</p><div className={styles.featuredLinks}><Link href={`/blog/${post.slug}`} className={styles.textLink}>Ler guia ↗</Link><Link href={themePath(post.theme)}>Explorar tema →</Link></div></div>
      </article>)}
    </section>
    <BlogCatalog posts={posts} />
  </main>;
}
