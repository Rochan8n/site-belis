import type { Metadata } from "next";

const CONTATO_TITLE = "Contato | Vamos Construir seu Próximo Passo";
const CONTATO_DESCRIPTION =
  "Converse com a Belis sobre percepção de marca, audiovisual, website ou software sob medida. Conte seu momento e receba resposta em até 24 horas.";

export const metadata: Metadata = {
  title: CONTATO_TITLE,
  description: CONTATO_DESCRIPTION,
  openGraph: {
    title: `${CONTATO_TITLE} | Belis Agency`,
    description: CONTATO_DESCRIPTION,
    url: "https://belis.agency/contato",
    type: "website",
    locale: "pt_BR",
    siteName: "Belis Agency",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Contato Belis Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${CONTATO_TITLE} | Belis Agency`,
    description: CONTATO_DESCRIPTION,
    images: ["/images/og-image.jpg"],
  },
  alternates: { canonical: "https://belis.agency/contato" },
};

const contatoJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: "https://belis.agency" },
        { "@type": "ListItem", position: 2, name: "Contato", item: "https://belis.agency/contato" },
      ],
    },
    {
      "@type": "ContactPage",
      name: CONTATO_TITLE,
      url: "https://belis.agency/contato",
      description: CONTATO_DESCRIPTION,
      isPartOf: { "@id": "https://belis.agency/#website" },
      about: { "@id": "https://belis.agency/#organization" },
    },
  ],
};

export default function ContatoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contatoJsonLd) }}
      />
      {children}
    </>
  );
}
