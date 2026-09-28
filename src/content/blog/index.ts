import { automatizarProcessos } from "./posts/automatizar-processos";
import { coberturaEventos } from "./posts/cobertura-eventos";
import { orcamentoLandingPage } from "./posts/orcamento-landing-page";
import { siteOuLandingPage } from "./posts/site-ou-landing-page";
import { softwareProntoOuSobMedida } from "./posts/software-pronto-ou-sob-medida";
import { videoInstitucional } from "./posts/video-institucional";
import { BLOG_THEMES, isBlogTheme } from "./themes";
import type { BlogBlock, BlogCardData, BlogPost, BlogTheme } from "./types";
import { SITE_URL } from "@/config/site";

export const BLOG_SITE_URL = SITE_URL;
export const BLOG_AUTHOR = {
  name: "Belis Agency",
  url: `${BLOG_SITE_URL}/sobre`,
  id: `${BLOG_SITE_URL}/#organization`,
};

const posts: BlogPost[] = [videoInstitucional, siteOuLandingPage, softwareProntoOuSobMedida, coberturaEventos, orcamentoLandingPage, automatizarProcessos];

function blockText(block: BlogBlock): string {
  switch (block.type) {
    case "paragraph": return block.text;
    case "list": return block.items.join(" ");
    case "table": return [block.caption, ...block.columns, ...block.rows.flat()].join(" ");
    case "callout": return `${block.title} ${block.text}`;
    case "link": return block.label;
  }
}

export function wordCount(post: BlogPost): number {
  return [post.quickAnswer, ...post.introduction, ...post.sections.flatMap(section => [section.title, ...section.blocks.map(blockText)]), ...post.faq.flatMap(item => [item.question, item.answer])]
    .join(" ").trim().split(/\s+/u).filter(Boolean).length;
}

export function readingMinutes(post: BlogPost): number {
  return Math.max(1, Math.ceil(wordCount(post) / 220));
}

function assertDate(value: string, slug: string): void {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(value)) || new Date(value).toISOString().slice(0, 10) !== value) {
    throw new Error(`Blog ${slug}: data inválida: ${value}`);
  }
}

// A published post must pass these checks before it can enter any public route.
// Editorial review, source checking and verified claims remain human decisions.
function validatePublishedPosts(inventory: BlogPost[]): void {
  const slugs = new Set<string>();
  const intentions = new Set<string>();
  for (const post of inventory) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug) || slugs.has(post.slug) || ["temas", "politica-editorial", "feed.xml"].includes(post.slug)) {
      throw new Error(`Blog: slug inválido, reservado ou duplicado: ${post.slug}`);
    }
    slugs.add(post.slug);
    if (post.status !== "published") continue;
    const intention = post.primaryKeyword.trim().toLocaleLowerCase("pt-BR");
    if (!intention || intentions.has(intention)) throw new Error(`Blog ${post.slug}: intenção principal ausente ou duplicada`);
    intentions.add(intention);
    if (!isBlogTheme(post.theme)) throw new Error(`Blog ${post.slug}: tema desconhecido`);
    if (post.seoTitle.length < 30 || post.seoTitle.length > 65 || post.description.length < 110 || post.description.length > 170) {
      throw new Error(`Blog ${post.slug}: revisar tamanho de título e descrição`);
    }
    assertDate(post.publishedAt, post.slug);
    assertDate(post.updatedAt, post.slug);
    if (post.updatedAt < post.publishedAt || post.updatedAt > new Date().toISOString().slice(0, 10)) throw new Error(`Blog ${post.slug}: cronologia inválida`);
    if (wordCount(post) < 700 || !post.quickAnswer.trim() || post.sections.length < 3 || !post.faq.length || !post.sources.length || !post.coverAlt.trim()) {
      throw new Error(`Blog ${post.slug}: conteúdo, resposta, FAQ, fontes ou capa incompletos`);
    }
    const sectionIds = new Set<string>();
    for (const section of post.sections) {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(section.id) || sectionIds.has(section.id) || !section.title.trim()) throw new Error(`Blog ${post.slug}: seção inválida ou duplicada`);
      sectionIds.add(section.id);
      for (const block of section.blocks) {
        if (block.type === "table" && (!block.columns.length || !block.rows.length || block.rows.some(row => row.length !== block.columns.length))) throw new Error(`Blog ${post.slug}: tabela com colunas inconsistentes`);
        if (block.type === "link" && (!block.href.startsWith("/") || block.href.startsWith("//"))) throw new Error(`Blog ${post.slug}: link interno inválido`);
      }
    }
    for (const source of post.sources) {
      if (new URL(source.url).protocol !== "https:" || !source.title.trim() || !source.note.trim()) throw new Error(`Blog ${post.slug}: fonte incompleta`);
    }
    if (!post.cta.label.trim() || !post.cta.message.trim()) throw new Error(`Blog ${post.slug}: CTA incompleto`);
    if (post.download && (!/^[a-z0-9-]+\.txt$/.test(post.download.filename) || !post.download.items.length)) throw new Error(`Blog ${post.slug}: download inválido`);
  }
  for (const post of inventory.filter(item => item.status === "published")) {
    for (const slug of post.relatedSlugs) {
      if (slug === post.slug || !inventory.some(item => item.slug === slug && item.status === "published")) throw new Error(`Blog ${post.slug}: relacionado ausente: ${slug}`);
    }
  }
}

validatePublishedPosts(posts);

export function getBlogPosts(theme?: BlogTheme): BlogPost[] {
  return posts.filter(post => post.status === "published" && (!theme || post.theme === theme))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return posts.find(post => post.status === "published" && post.slug === slug);
}

export function getBlogCards(theme?: BlogTheme): BlogCardData[] {
  return getBlogPosts(theme).map(post => ({ slug: post.slug, title: post.title, description: post.description, theme: post.theme, format: post.format, publishedAt: post.publishedAt, readingMinutes: readingMinutes(post), coverAlt: post.coverAlt }));
}

export function getRelatedPosts(post: BlogPost): BlogCardData[] {
  const cards = getBlogCards();
  return post.relatedSlugs.flatMap(slug => cards.filter(card => card.slug === slug));
}

export function blogPath(slug: string): string { return `/blog/${slug}`; }
export function coverPath(slug: string): string { return `${blogPath(slug)}/capa`; }
export function whatsappHref(post: BlogPost): string { return `https://wa.me/5511973138895?text=${encodeURIComponent(`${post.cta.message}\nOrigem: ${BLOG_SITE_URL}${blogPath(post.slug)}`)}`; }

export function formatBlogDate(value: string): string {
  return new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${value}T12:00:00Z`));
}

export function articleJsonLd(post: BlogPost) {
  const url = `${BLOG_SITE_URL}${blogPath(post.slug)}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting", "@id": `${url}#article`, headline: post.title, description: post.description,
        mainEntityOfPage: { "@type": "WebPage", "@id": url }, url,
        datePublished: `${post.publishedAt}T12:00:00-03:00`, dateModified: `${post.updatedAt}T12:00:00-03:00`,
        inLanguage: "pt-BR", articleSection: BLOG_THEMES[post.theme].label,
        author: { "@type": "Organization", "@id": BLOG_AUTHOR.id, name: BLOG_AUTHOR.name, url: BLOG_AUTHOR.url },
        publisher: { "@id": BLOG_AUTHOR.id }, isPartOf: { "@id": `${BLOG_SITE_URL}/blog#blog` },
        image: { "@type": "ImageObject", url: `${BLOG_SITE_URL}${coverPath(post.slug)}`, width: 1200, height: 630, caption: post.coverAlt },
        wordCount: wordCount(post), citation: post.sources.map(source => source.url),
      },
      {
        "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: BLOG_SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${BLOG_SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: BLOG_THEMES[post.theme].label, item: `${BLOG_SITE_URL}/blog/temas/${post.theme}` },
          { "@type": "ListItem", position: 4, name: post.title, item: url },
        ],
      },
      {
        "@type": "FAQPage", "@id": `${url}#perguntas-frequentes`,
        mainEntity: post.faq.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })),
      },
    ],
  };
}

export function jsonLdString(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
