import type { Metadata } from "next";
import { WebReveal } from "@/components/solutions/web/WebReveal";
import { WebStudio } from "@/components/solutions/web/WebStudio";

const TITLE = "Sites que Transformam Percepção em Oportunidades";
const DESCRIPTION =
  "Sites institucionais e landing pages preparados para SEO, GEO, AEO, performance e conversão. Transforme sua presença digital em ativo de crescimento.";
const CANONICAL = "https://belis.agency/websites";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: `${TITLE} | Belis Agency`,
    description: DESCRIPTION,
    url: CANONICAL,
    type: "website",
    locale: "pt_BR",
    siteName: "Belis Agency",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Websites e landing pages desenvolvidos pela Belis Agency",
      },
    ],
  },
};

const webServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Criação de websites e landing pages",
  description: DESCRIPTION,
  url: CANONICAL,
  provider: { "@id": "https://belis.agency/#organization" },
  areaServed: { "@type": "Country", name: "Brasil" },
  serviceType: [
    "Site institucional",
    "Landing page",
    "SEO",
    "GEO",
    "AEO",
    "Otimização de conversão",
  ],
};

export default function WebsitesPage() {
  return (
    <main className="relative w-full overflow-hidden bg-navy font-sans text-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webServiceJsonLd) }}
      />
      <WebReveal />
      <WebStudio />
    </main>
  );
}
