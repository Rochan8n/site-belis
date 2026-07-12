import type { Metadata } from "next";
import { AudienceGrid } from "@/components/solutions/AudienceGrid";
import { CtaBanner } from "@/components/solutions/CtaBanner";
import { ItemGrid } from "@/components/solutions/ItemGrid";
import { ProcessSteps } from "@/components/solutions/ProcessSteps";
import { QualityGrid } from "@/components/solutions/QualityGrid";
import { SolutionHero } from "@/components/solutions/SolutionHero";
import {
  HERO_SUBCOPY,
  webAudiences,
  webItems,
} from "@/components/solutions/solutionsData";

const TITLE = "Websites e Landing Pages de Alta Conversão";
const DESCRIPTION =
  "Landing pages, sites institucionais e ecossistemas digitais rápidos, mobile-first e construídos para converter, com direção dedicada da Belis Agency.";
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

export default function WebsitesPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-navy font-sans text-cream">
      <SolutionHero
        eyebrow="Websites"
        headline="Do vídeo que vende"
        accent="à página que converte."
        subcopy={HERO_SUBCOPY}
      />
      <ItemGrid category="Websites" items={webItems} />
      <AudienceGrid items={webAudiences} />
      <ProcessSteps />
      <QualityGrid />
      <CtaBanner />
    </main>
  );
}
