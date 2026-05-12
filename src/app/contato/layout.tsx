import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato - Belis Agency",
  description: "Vamos construir o seu império digital. Aplique para ser um cliente Belis Agency.",
  openGraph: {
    title: "Contato - Belis Agency",
    description: "Vamos construir o seu império digital. Aplique para ser um cliente Belis Agency.",
    url: "https://belisagency.com/contato",
    type: "website",
    locale: "pt_BR",
    siteName: "Belis Agency",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Belis Agency — Produtora Audiovisual e Agência Digital" }],
  },
  alternates: { canonical: "https://belisagency.com/contato" },
};

export default function ContatoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
