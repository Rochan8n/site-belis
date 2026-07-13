"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

// Chrome pesado (SmoothScroll/Lenis, CustomCursor, Navbar, Footer, PageHud +
// gsap) fica num chunk lazy: a home (/) não renderiza nada disso e assim não
// baixa esse graph no caminho crítico. Demais rotas carregam sob demanda (SSR
// mantido).
const SiteChromeFull = dynamic(() =>
  import("./SiteChromeFull").then((m) => m.SiteChromeFull),
);

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    document.body.classList.toggle("md:cursor-none", pathname !== "/");

    return () => {
      document.body.classList.remove("md:cursor-none");
    };
  }, [pathname]);

  if (pathname === "/") {
    return <>{children}</>;
  }

  return <SiteChromeFull pathname={pathname}>{children}</SiteChromeFull>;
}
