import type { Metadata } from "next";
import { BelisJourney } from "@/components/journey/BelisJourney";

const HOME_TITLE = "Ativos Digitais para Percepção e Crescimento";
const HOME_DESCRIPTION =
  "A Belis constrói ativos digitais de crescimento com estratégia, audiovisual, web e software para aumentar percepção, confiança e conversão.";

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
        alt: "Belis Agency, ativos digitais para percepção e crescimento",
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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "O que são ativos digitais de crescimento?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "São recursos como conteúdo audiovisual, sites e sistemas criados para aumentar percepção, confiança, conversão e capacidade de escala.",
      },
    },
    {
      "@type": "Question",
      name: "Como a Belis ajuda uma empresa a ser mais percebida pelo mercado?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Belis alinha estratégia, audiovisual, web e software para traduzir a qualidade da empresa em uma presença digital clara, confiável e memorável.",
      },
    },
    {
      "@type": "Question",
      name: "A Belis é uma agência, produtora ou software house?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Belis é uma empresa especializada em construir ativos digitais de crescimento. As competências de estratégia, audiovisual, web e software trabalham de forma integrada.",
      },
    },
    {
      "@type": "Question",
      name: "Quais soluções a Belis desenvolve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Belis desenvolve projetos audiovisuais, sites orientados à conversão e software sob medida para empresas que querem fortalecer percepção e crescer.",
      },
    },
    {
      "@type": "Question",
      name: "Como um projeto audiovisual pode gerar crescimento?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Um projeto audiovisual estratégico comunica a qualidade da empresa, fortalece autoridade e cria uma primeira impressão capaz de aumentar confiança e consideração de compra.",
      },
    },
    {
      "@type": "Question",
      name: "Os sites da Belis são preparados para mecanismos de busca e IAs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim. Os projetos web são preparados para SEO, GEO, AEO, performance, conversão e arquitetura semântica.",
      },
    },
    {
      "@type": "Question",
      name: "O que é software sob medida?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "É uma ferramenta criada para necessidades específicas da operação, com objetivo de eliminar gargalos, organizar processos e preparar a empresa para escalar.",
      },
    },
    {
      "@type": "Question",
      name: "A Belis atende empresas fora de São Paulo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim. A Belis está em São Paulo e atende empresas em todo o Brasil.",
      },
    },
    {
      "@type": "Question",
      name: "É possível contratar audiovisual, web e software no mesmo projeto?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim. As soluções podem ser combinadas para manter estratégia, linguagem e padrão de execução consistentes em toda a transformação digital.",
      },
    },
    {
      "@type": "Question",
      name: "Como começar um projeto com a Belis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O primeiro passo é conversar com a equipe para apresentar o momento da empresa, os gargalos atuais e a percepção que a marca precisa construir.",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <BelisJourney />
    </>
  );
}
