import type { Metadata } from "next";
import { BelisJourney } from "@/components/journey/BelisJourney";

const HOME_TITLE = "Produtora Audiovisual em São Paulo — Vídeos que Vendem";
const HOME_DESCRIPTION =
  "+150 projetos entregues e primeira versão em até 7 dias. Vídeo institucional, reels, campanhas, cobertura de eventos, web design e tráfego pago para empresas que querem resultado.";

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  openGraph: {
    title: `${HOME_TITLE} | Belis Agency`,
    description: HOME_DESCRIPTION,
    url: "https://belis.agency",
    type: "website",
    locale: "pt_BR",
    siteName: "Belis Agency",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Belis Agency — Produtora Audiovisual em São Paulo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${HOME_TITLE} | Belis Agency`,
    description: HOME_DESCRIPTION,
    images: ["/images/og-image.jpg"],
  },
  alternates: { canonical: "https://belis.agency" },
};

export default function Home() {
  return <BelisJourney />;
}
