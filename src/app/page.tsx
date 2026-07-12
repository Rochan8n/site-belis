import type { Metadata } from "next";
import { BelisJourney } from "@/components/journey/BelisJourney";

const HOME_TITLE = "Do Frame ao Sistema — Audiovisual, Web e Software";
const HOME_DESCRIPTION =
  "Da produção audiovisual ao website que converte e ao sistema que escala. +150 projetos, primeira versão em até 7 dias. Belis Agency — São Paulo.";

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
        alt: "Belis Agency — Do Frame ao Sistema",
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
