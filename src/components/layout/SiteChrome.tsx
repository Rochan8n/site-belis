"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

// Chrome pesado (SmoothScroll/Lenis, Navbar, Footer, PageHud + gsap) fica num
// chunk lazy: a home (/) não renderiza nada disso e assim não baixa esse graph
// no caminho crítico. Demais rotas carregam sob demanda (SSR mantido).
const SiteChromeFull = dynamic(() =>
  import("./SiteChromeFull").then((m) => m.SiteChromeFull),
);

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/") {
    return <>{children}</>;
  }

  return <SiteChromeFull pathname={pathname}>{children}</SiteChromeFull>;
}
