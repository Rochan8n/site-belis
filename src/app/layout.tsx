import type { Metadata, Viewport } from "next";
import {
  Archivo,
  IBM_Plex_Mono,
  Inter_Tight,
  Red_Hat_Display,
} from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { TransitionCurtain } from "@/components/layout/TransitionCurtain";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

const redHatDisplay = Red_Hat_Display({
  variable: "--font-red-hat-display",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const SITE_URL = "https://belis.agency";
const SITE_NAME = "Belis Agency";
const DEFAULT_TITLE = "Belis Agency | Ativos Digitais de Crescimento";
const DEFAULT_DESCRIPTION =
  "Estratégia, audiovisual, web e software para transformar a percepção da sua empresa, gerar confiança e acelerar o crescimento.";

export const viewport: Viewport = {
  themeColor: "#0a0f1c",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | Belis Agency",
    default: DEFAULT_TITLE,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Digital Growth Services",
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Belis Agency, ativos digitais de crescimento em São Paulo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: SITE_URL,
  },
  other: {
    "msapplication-TileColor": "#0a0f1c",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        legalName: "Belis Agency",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/logo.png`,
          width: 512,
          height: 512,
        },
        image: `${SITE_URL}/images/og-image.jpg`,
        description:
          "Empresa especializada em construir ativos digitais de crescimento com estratégia, audiovisual, web e software para aumentar percepção, confiança e conversão.",
        foundingDate: "2021",
        slogan: "Construímos percepção que sustenta crescimento.",
        knowsAbout: [
          "Produção Audiovisual",
          "Vídeo Institucional",
          "Reels para Instagram",
          "Campanhas Publicitárias",
          "Cobertura de Eventos",
          "Web Design",
          "Landing Pages",
          "Tráfego Pago",
          "Branding",
          "Ativos Digitais de Crescimento",
          "SEO",
          "GEO",
          "AEO",
          "Software sob medida",
        ],
        areaServed: [
          { "@type": "Country", name: "Brasil" },
          { "@type": "City", name: "São Paulo" },
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "São Paulo",
          addressRegion: "SP",
          addressCountry: "BR",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer service",
            telephone: "+55-11-97313-8895",
            email: "Lucas@belis.agency",
            areaServed: "BR",
            availableLanguage: ["Portuguese", "English"],
          },
        ],
        sameAs: ["https://www.instagram.com/belisvideo/"],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#service`,
        name: SITE_NAME,
        url: SITE_URL,
        image: `${SITE_URL}/images/og-image.jpg`,
        priceRange: "$$$",
        telephone: "+55-11-97313-8895",
        email: "Lucas@belis.agency",
        address: {
          "@type": "PostalAddress",
          addressLocality: "São Paulo",
          addressRegion: "SP",
          addressCountry: "BR",
        },
        areaServed: { "@type": "Country", name: "Brasil" },
        serviceType: [
          "Produção Audiovisual",
          "Vídeo Institucional",
          "Web Design",
          "Landing Pages",
          "Software sob medida",
          "Estratégia de marca",
        ],
        parentOrganization: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: DEFAULT_DESCRIPTION,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "pt-BR",
      },
    ],
  };

  return (
    <html
      lang="pt-BR"
      className={`${redHatDisplay.variable} ${interTight.variable} ${archivo.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        {/* ── Performance: Resource Hints ── */}
        {/* Preconnect para YouTube (PortfolioHero background + Testimonials lightbox) */}
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://img.youtube.com" crossOrigin="" />
        {/* DNS-prefetch para subdomínios do YouTube (thumbnails no PortfolioGrid) */}
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        {/* Preconnect para CDN de logos dos clientes */}
        <link rel="preconnect" href="https://belis.agency" crossOrigin="" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans bg-navy text-cream selection:bg-coral selection:text-white antialiased cursor-auto overflow-x-hidden">
        <GoogleAnalytics />
        <SiteChrome>{children}</SiteChrome>
        <TransitionCurtain />
      </body>
    </html>
  );
}
