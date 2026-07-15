import type { Metadata } from "next";
import { AudienceGrid } from "@/components/solutions/AudienceGrid";
import { CtaBanner } from "@/components/solutions/CtaBanner";
import { ItemGrid } from "@/components/solutions/ItemGrid";
import { ProcessSteps } from "@/components/solutions/ProcessSteps";
import { QualityGrid } from "@/components/solutions/QualityGrid";
import { SolutionHero } from "@/components/solutions/SolutionHero";
import { SystemsShowcase } from "@/components/solutions/systems/SystemsShowcase";
import styles from "@/components/solutions/solutions.module.css";
import {
  HERO_CTA_LABEL,
  SYS_CTA_HEADING,
  SYS_CTA_LABEL,
  SYS_HERO_SUBCOPY,
  SYS_WHATSAPP_HREF,
  sysItems,
  systemAudiences,
} from "@/components/solutions/solutionsData";

const TITLE = "Software Sob Medida para Eliminar Gargalos";
const DESCRIPTION =
  "Sistemas, SaaS, portais e automações criados para reduzir trabalho manual, organizar processos e preparar sua empresa para escalar.";
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

const softwareServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Desenvolvimento de software sob medida",
  description: DESCRIPTION,
  url: CANONICAL,
  provider: { "@id": "https://belis.agency/#organization" },
  areaServed: { "@type": "Country", name: "Brasil" },
  serviceType: [
    "Software sob medida",
    "Sistemas internos",
    "SaaS",
    "MVP",
    "Portais",
    "Automações",
    "Integrações",
  ],
};

export default function SistemasPage() {
  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareServiceJsonLd) }}
      />
      <SolutionHero
        eyebrow="Sistemas"
        headline="Crescer não deveria"
        accent="multiplicar o trabalho."
        subcopy={SYS_HERO_SUBCOPY}
        ctaLabel={HERO_CTA_LABEL}
        ctaHref={SYS_WHATSAPP_HREF}
      />
      <ItemGrid category="Sistemas" items={sysItems} />
      <SystemsShowcase />
      <AudienceGrid items={systemAudiences} />
      <ProcessSteps />
      <QualityGrid />
      <CtaBanner
        heading={SYS_CTA_HEADING}
        ctaLabel={SYS_CTA_LABEL}
        ctaHref={SYS_WHATSAPP_HREF}
      />
    </main>
  );
}
