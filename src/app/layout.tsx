import type { Metadata } from "next";
import { Red_Hat_Display, Inter_Tight } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { GradientBackground } from "@/components/ui/GradientBackground";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

const redHatDisplay = Red_Hat_Display({
  variable: "--font-red-hat-display",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://belisagency.com"),
  title: {
    template: "%s | Belis Agency",
    default: "Belis Agency | Impacto Digital",
  },
  description: "Agressivo, Premium e Inesquecível. Produção audiovisual e experiências digitais high-ticket para marcas que não seguem tendências, mas as criam.",
  keywords: ["Audiovisual", "Web Design Premium", "Tráfego Pago", "Agência Digital", "Belis Agency"],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Belis Agency",
    title: "Belis Agency | Impacto Digital",
    description: "Agressivo, Premium e Inesquecível. Produção audiovisual e experiências digitais high-ticket para marcas que não seguem tendências, mas as criam.",
    url: "https://belisagency.com",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Belis Agency — Produtora Audiovisual e Agência Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Belis Agency | Impacto Digital",
    description: "Agressivo, Premium e Inesquecível. Produção audiovisual e experiências digitais high-ticket para marcas que não seguem tendências, mas as criam.",
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "COLE_SEU_CODIGO_AQUI",
  },
  alternates: {
    canonical: "https://belisagency.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Belis Agency",
    url: "https://belisagency.com",
    logo: "https://belisagency.com/logo.png",
    description: "Produtora Audiovisual e Agência Digital High-Ticket.",
    sameAs: [
      "https://instagram.com/belisagency",
      "https://linkedin.com/company/belisagency"
    ]
  };

  return (
    <html lang="pt-BR" className={`${redHatDisplay.variable} ${interTight.variable}`}>
      <head>
        {/* ── Performance: Resource Hints ── */}
        {/* Preconnect para YouTube (PortfolioHero background + Testimonials lightbox) */}
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://img.youtube.com" crossOrigin="" />
        {/* DNS-prefetch para subdomínios do YouTube (thumbnails no PortfolioGrid) */}
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        {/* Preconnect para CDN de logos dos clientes */}
        <link rel="preconnect" href="https://belis.agency" crossOrigin="" />
        {/* Preload do primeiro frame do hero (LCP crítico) */}
        {/* eslint-disable-next-line @next/next/no-head-element */}
        <link
          rel="preload"
          as="image"
          href="/frames/frame_0001.jpg"
          fetchPriority="high"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans bg-navy text-cream selection:bg-coral selection:text-white antialiased cursor-auto md:cursor-none overflow-x-hidden">
        <GoogleAnalytics />
        <SmoothScroll>
          <PageTransition>
            {/* Gradient spheres fixas — se movem no scroll via GSAP */}
            <GradientBackground />
            <NoiseOverlay />
            <CustomCursor />
            <Navbar />
            {children}
            <Footer />
          </PageTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}
