export type BlogTheme = "audiovisual" | "sites" | "sistemas";

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "table"; caption: string; columns: string[]; rows: string[][] }
  | { type: "callout"; title: string; text: string }
  | { type: "link"; label: string; href: string };

export interface BlogPost {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  theme: BlogTheme;
  format: "Guia de compra" | "Comparativo" | "Checklist";
  primaryKeyword: string;
  status: "draft" | "published";
  publishedAt: string;
  updatedAt: string;
  coverTitle: string;
  coverAlt: string;
  quickAnswer: string;
  introduction: string[];
  sections: { id: string; title: string; blocks: BlogBlock[] }[];
  faq: { question: string; answer: string }[];
  sources: { title: string; url: string; note: string }[];
  relatedSlugs: string[];
  cta: { heading: string; text: string; label: string; message: string };
  download?: { label: string; filename: string; title: string; items: string[] };
}

// Catalog data is intentionally small. Article bodies stay on the server.
export interface BlogCardData {
  slug: string;
  title: string;
  description: string;
  theme: BlogTheme;
  format: BlogPost["format"];
  publishedAt: string;
  readingMinutes: number;
  coverAlt: string;
}
