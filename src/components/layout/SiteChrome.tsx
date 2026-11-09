"use client";

import { useParams, usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { ENGINEERING_SERVICE, VISUAL_SERVICE } from "@/config/site";
import { FloatingWhatsApp } from "./FloatingWhatsApp";

// Chrome pesado (SmoothScroll/Lenis, Navbar, Footer, PageHud + gsap) fica num
// chunk lazy: a home (/) não renderiza nada disso e assim não baixa esse graph
// no caminho crítico. Demais rotas carregam sob demanda (SSR mantido).
const SiteChromeFull = dynamic(() =>
  import("./SiteChromeFull").then((m) => m.SiteChromeFull),
);

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { slug } = useParams<{ slug?: string }>();
  const isVisual = pathname === VISUAL_SERVICE.href;
  const isEngineering = pathname === ENGINEERING_SERVICE.href;
  const isBlog = pathname === "/blog" || pathname.startsWith("/blog/");
  const usesCustomChrome = pathname === "/" || isVisual || isEngineering || isBlog;
  // The studio and articles supply the same control with their own context.
  const hasLocalWhatsApp = isVisual || (isBlog && typeof slug === "string");

  return (
    <>
      {usesCustomChrome ? children : <SiteChromeFull pathname={pathname}>{children}</SiteChromeFull>}
      {!hasLocalWhatsApp && <FloatingWhatsApp service={isEngineering ? "engineering" : undefined} />}
    </>
  );
}
