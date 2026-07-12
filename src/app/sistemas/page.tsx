import type { Metadata } from "next";
import { AudienceGrid } from "@/components/solutions/AudienceGrid";
import { CtaBanner } from "@/components/solutions/CtaBanner";
import { ItemGrid } from "@/components/solutions/ItemGrid";
import { ProcessSteps } from "@/components/solutions/ProcessSteps";
import { QualityGrid } from "@/components/solutions/QualityGrid";
import { SolutionHero } from "@/components/solutions/SolutionHero";
import {
  HERO_SUBCOPY,
  sysItems,
  systemAudiences,
} from "@/components/solutions/solutionsData";

const TITLE = "Sistemas, SaaS e Software Sob Medida";
const DESCRIPTION =
  "Micro-SaaS, MVPs, sistemas internos, portais, dashboards, automações e integrações desenvolvidos para escalar a operação do seu negócio.";
const CANONICAL = "https://belis.agency/sistemas";

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
        alt: "Sistemas e software sob medida desenvolvidos pela Belis Agency",
      },
    ],
  },
};

export default function SistemasPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-navy font-sans text-cream">
      <SolutionHero
        eyebrow="Sistemas"
        headline="Do vídeo que vende"
        accent="ao sistema que escala."
        subcopy={HERO_SUBCOPY}
      />
      <ItemGrid category="Sistemas" items={sysItems} />
      <AudienceGrid items={systemAudiences} />
      <ProcessSteps />
      <QualityGrid />
      <CtaBanner />
    </main>
  );
}
