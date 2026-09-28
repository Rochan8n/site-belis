import { ImageResponse } from "next/og";
import { getBlogPost, getBlogPosts } from "@/content/blog";
import { BLOG_THEMES } from "@/content/blog/themes";

export const dynamic = "force-static";
// Unknown and draft slugs reach GET's explicit 404.
export const dynamicParams = true;
export function generateStaticParams() { return getBlogPosts().map(post => ({ slug: post.slug })); }

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return new Response("Capa não encontrada", { status: 404 });
  const theme = BLOG_THEMES[post.theme];
  const labels = post.theme === "audiovisual" ? ["OBJETIVO", "CAPTAÇÃO", "ENTREGA"] : post.theme === "sites" ? ["OFERTA", "EXPERIÊNCIA", "CONTATO"] : ["ENTRADA", "PROCESSO", "RESULTADO"];
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", background: "#16161a", color: "#e9e5da", padding: "54px 62px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, letterSpacing: 3, borderBottom: "1px solid #74716b", paddingBottom: 24 }}><span>BELIS / CADERNO</span><span style={{ color: theme.accent }}>{theme.label.toLocaleUpperCase("pt-BR")}</span></div>
      <div style={{ display: "flex", flexGrow: 1, alignItems: "center", position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 74, lineHeight: 1.05, fontWeight: 700, letterSpacing: -3, width: 940 }}>
          {post.coverTitle.split("\n").map(line => <div key={line} style={{ display: "flex" }}>{line}</div>)}
        </div>
        <div style={{ display: "flex", position: "absolute", right: 0, bottom: 38, width: 66, height: 66, border: `2px solid ${theme.accent}`, borderRadius: 100, color: theme.accent, alignItems: "center", justifyContent: "center", fontSize: 32 }}>↗</div>
      </div>
      <div style={{ display: "flex", gap: 20, alignItems: "center", borderTop: "1px solid #74716b", paddingTop: 24 }}>
        {labels.map((label, index) => <div key={label} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 17, letterSpacing: 2 }}><span style={{ color: theme.accent }}>0{index + 1}</span><span>{label}</span>{index < 2 && <span style={{ color: "#74716b", marginLeft: 12 }}>→</span>}</div>)}
      </div>
    </div>,
    { width: 1200, height: 630, headers: { "Cache-Control": "public, max-age=0, must-revalidate" } },
  );
}
