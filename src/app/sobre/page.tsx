import type { Metadata } from "next";
import { AboutHero } from "@/components/sobre/AboutHero";
import { Timeline } from "@/components/sobre/Timeline";
import { ValuesSection } from "@/components/sobre/ValuesSection";
import styles from "@/components/sobre/sobre.module.css";

const SOBRE_TITLE = "Sobre a Belis | Estratégia que Constrói Percepção";
const SOBRE_DESCRIPTION =
  "Conheça a Belis, empresa de São Paulo que une estratégia, audiovisual, web e software para transformar percepção e sustentar crescimento.";

export const metadata: Metadata = {
  title: SOBRE_TITLE,
  description: SOBRE_DESCRIPTION,
  openGraph: {
    title: `${SOBRE_TITLE} | Belis Agency`,
    description: SOBRE_DESCRIPTION,
    url: "https://belis.agency/sobre",
    type: "website",
    locale: "pt_BR",
    siteName: "Belis Agency",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Sobre a Belis Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SOBRE_TITLE} | Belis Agency`,
    description: SOBRE_DESCRIPTION,
    images: ["/images/og-image.jpg"],
  },
  alternates: { canonical: "https://belis.agency/sobre" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início", item: "https://belis.agency" },
    { "@type": "ListItem", position: 2, name: "Sobre", item: "https://belis.agency/sobre" },
  ],
};

export default function SobrePage() {
  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <AboutHero />
      <Timeline />
      <ValuesSection />
    </main>
  );
}
