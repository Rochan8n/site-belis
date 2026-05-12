import type { MetadataRoute } from "next";

const BASE_URL = "https://belis.agency";

// Data estática de build evita "lastModified = agora" toda request, que dilui o sinal de
// frescor para o Google. Atualize manualmente quando publicar mudanças relevantes.
const LAST_UPDATED = new Date("2026-05-11");

export default function sitemap(): MetadataRoute.Sitemap {
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
  ];
}
