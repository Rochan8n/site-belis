import { BLOG_SITE_URL, getBlogPost, getBlogPosts } from "@/content/blog";

export const dynamic = "force-static";
// The published-post lookup also excludes drafts for paths generated at runtime.
export const dynamicParams = true;
export function generateStaticParams() { return getBlogPosts().filter(post => post.download).map(post => ({ slug: post.slug })); }

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post?.download) return new Response("Checklist não encontrado", { status: 404 });
  const resource = post.download;
  const text = [resource.title.toLocaleUpperCase("pt-BR"), "Belis Agency", `${BLOG_SITE_URL}/blog/${post.slug}`, "", "Preencha os campos para preparar seu projeto.", "", ...resource.items.flatMap((item, index) => [`${index + 1}. ${item}`, "", "____________________________________________________________", ""]), "Referência de planejamento. Escopo e condições dependem da proposta do projeto.", "", `Contato: ${BLOG_SITE_URL}/contato`].join("\r\n");
  return new Response(`\uFEFF${text}`, { headers: { "Content-Type": "text/plain; charset=utf-8", "Content-Disposition": `attachment; filename="${resource.filename}"`, "X-Content-Type-Options": "nosniff", "X-Robots-Tag": "noindex", "Cache-Control": "public, max-age=0, must-revalidate" } });
}
