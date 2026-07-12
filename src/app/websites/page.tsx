import type { Metadata } from "next";
import { AudienceGrid } from "@/components/solutions/AudienceGrid";
import { CtaBanner } from "@/components/solutions/CtaBanner";
import { ItemGrid } from "@/components/solutions/ItemGrid";
import { ProcessSteps } from "@/components/solutions/ProcessSteps";
import { QualityGrid } from "@/components/solutions/QualityGrid";
import { SolutionHero } from "@/components/solutions/SolutionHero";
import {
  HERO_CTA_LABEL,
  WEB_CTA_HEADING,
  WEB_CTA_LABEL,
  WEB_HERO_SUBCOPY,
  WEB_WHATSAPP_HREF,
  webAudiences,
  webItems,
} from "@/components/solutions/solutionsData";

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
    <main className="relative min-h-screen w-full overflow-hidden bg-navy font-sans text-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webServiceJsonLd) }}
      />
      <SolutionHero
        eyebrow="Websites"
        headline="Sua empresa evoluiu."
        accent="Seu site precisa mostrar isso."
        subcopy={WEB_HERO_SUBCOPY}
        ctaLabel={HERO_CTA_LABEL}
        ctaHref={WEB_WHATSAPP_HREF}
      />
      <ItemGrid category="Websites" items={webItems} />
      <AudienceGrid items={webAudiences} />
      <ProcessSteps />
      <QualityGrid />
      <CtaBanner
        heading={WEB_CTA_HEADING}
        ctaLabel={WEB_CTA_LABEL}
        ctaHref={WEB_WHATSAPP_HREF}
      />
    </main>
  );
}
