import type { Metadata } from "next";
import { BLOG_SITE_URL } from "@/content/blog";

export function blogMetadata(title: string, description: string, path: string, image = "/images/og-image.jpg"): Metadata {
  const url = `${BLOG_SITE_URL}${path}`;
  return {
    title, description, alternates: { canonical: url, types: { "application/rss+xml": `${BLOG_SITE_URL}/blog/feed.xml` } },
    openGraph: { title: `${title} | Belis Agency`, description, url, type: "website", locale: "pt_BR", siteName: "Belis Agency", images: [{ url: image, width: 1200, height: 630, alt: title }] },
    twitter: { card: "summary_large_image", title: `${title} | Belis Agency`, description, images: [image] },
  };
}
