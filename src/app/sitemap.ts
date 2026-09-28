import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/content/blog";
import { BLOG_THEME_IDS, themePath } from "@/content/blog/themes";
import { SITE_URL } from "@/config/site";

const BASE_URL = SITE_URL;

// Data estática de build evita "lastModified = agora" toda request, que dilui o sinal de
// frescor para o Google. Atualize manualmente quando publicar mudanças relevantes.
const LAST_UPDATED = new Date("2026-07-12");

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getBlogPosts();
  const blogUpdatedAt = posts.reduce((latest, post) => post.updatedAt > latest ? post.updatedAt : latest, "2026-09-28");
  return [
    {
      url: `${BASE_URL}/`,
      lastModified: LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/portfolio`,
      lastModified: LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/websites`,
      lastModified: LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/sistemas`,
      lastModified: LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/contato`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/sobre`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    { url: `${BASE_URL}/blog`, lastModified: new Date(blogUpdatedAt), changeFrequency: "weekly", priority: 0.8 },
    ...BLOG_THEME_IDS.map(theme => ({ url: `${BASE_URL}${themePath(theme)}`, lastModified: new Date(posts.filter(post => post.theme === theme).reduce((latest, post) => post.updatedAt > latest ? post.updatedAt : latest, "2026-09-28")), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...posts.map(post => ({ url: `${BASE_URL}/blog/${post.slug}`, lastModified: new Date(post.updatedAt), changeFrequency: "monthly" as const, priority: 0.7 })),
    { url: `${BASE_URL}/blog/politica-editorial`, lastModified: new Date("2026-09-28"), changeFrequency: "yearly", priority: 0.3 },
  ];
}
