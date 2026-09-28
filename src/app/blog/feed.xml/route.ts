import { BLOG_SITE_URL, getBlogPosts } from "@/content/blog";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

export function GET() {
  const posts = getBlogPosts();
  const items = posts.map(post => {
    const url = `${BLOG_SITE_URL}/blog/${post.slug}`;
    return `<item><title>${escapeXml(post.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><description>${escapeXml(post.description)}</description><category>${escapeXml(post.theme)}</category><pubDate>${new Date(`${post.publishedAt}T12:00:00-03:00`).toUTCString()}</pubDate></item>`;
  }).join("");
  const lastUpdated = posts.reduce((latest, post) => post.updatedAt > latest ? post.updatedAt : latest, "2026-09-28");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Blog Belis Agency</title><link>${BLOG_SITE_URL}/blog</link><description>Guias de audiovisual, sites e software para empresas.</description><language>pt-BR</language><lastBuildDate>${new Date(`${lastUpdated}T12:00:00-03:00`).toUTCString()}</lastBuildDate><atom:link href="${BLOG_SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "X-Content-Type-Options": "nosniff", "Cache-Control": "public, max-age=0, must-revalidate" } });
}
