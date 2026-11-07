import type { Metadata, Viewport } from "next";
import { EngineeringLanding } from "@/components/engineering/EngineeringLanding";
import { SITE_URL } from "@/config/site";

const title = "Engenharia Reversa e Impressão 3D Automotiva e Industrial";
const description = "Peças sob medida para carros clássicos, performance e máquinas. Escaneamento 3D, modelagem CAD e impressão em nylon com fibra de carbono. Fale com a Belis.";
const url = `${SITE_URL}/engenharia-reversa`;
const image = "/images/engenharia-reversa/og-engenharia-reversa.jpg";

export const viewport: Viewport = { themeColor: "#101412", colorScheme: "dark" };
export const metadata: Metadata = {
  title, description, alternates: { canonical: url },
  openGraph: { title: `${title} | Belis`, description, url, type: "website", siteName: "Belis Agency", locale: "pt_BR", images: [{ url: image, width: 1200, height: 630, alt: "Conceito de coletor de admissão — engenharia reversa Belis" }] },
  twitter: { card: "summary_large_image", title: `${title} | Belis`, description, images: [image] },
};

const structuredData = {
  "@context": "https://schema.org", "@graph": [
    { "@type": "WebPage", "@id": `${url}#webpage`, url, name: title, description, inLanguage: "pt-BR", isPartOf: { "@id": `${SITE_URL}/#website` }, about: { "@id": `${url}#service` }, breadcrumb: { "@id": `${url}#breadcrumb` } },
    { "@type": "Service", "@id": `${url}#service`, name: "Engenharia reversa e fabricação de peças sob medida", url, description, serviceType: ["Engenharia reversa", "Escaneamento 3D", "Modelagem 3D e CAD", "Impressão 3D de peças automotivas e industriais", "Prototipagem e pequenos lotes"], provider: { "@id": `${SITE_URL}/#organization` }, areaServed: { "@type": "Country", name: "Brasil" } },
    { "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Belis", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Engenharia reversa", item: url }] },
  ],
};

export default function EngenhariaReversaPage() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} /><EngineeringLanding /></>;
}
