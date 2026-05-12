import type { Metadata } from "next";
import { AboutHero } from "@/components/sobre/AboutHero";
import { Timeline } from "@/components/sobre/Timeline";
import { ValuesSection } from "@/components/sobre/ValuesSection";


export const metadata: Metadata = {
  title: "Sobre a Agência - Belis Agency",
  description: "Nós não seguimos tendências. Nós as criamos. Conheça a história e os valores implacáveis da Belis Agency.",
  openGraph: {
    title: "Sobre a Agência - Belis Agency",
    description: "Nós não seguimos tendências. Nós as criamos. Conheça a história e os valores implacáveis da Belis Agency.",
    url: "https://belisagency.com/sobre",
    type: "website",
    locale: "pt_BR",
    siteName: "Belis Agency",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Belis Agency — Produtora Audiovisual e Agência Digital" }],
  },
  alternates: { canonical: "https://belisagency.com/sobre" },
};

export default function SobrePage() {
  return (
    <main className="w-full min-h-screen bg-navy overflow-hidden">
      <AboutHero />
      <Timeline />
      <ValuesSection />

    </main>
  );
}
