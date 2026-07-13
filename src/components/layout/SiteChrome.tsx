"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHud } from "@/components/layout/PageHud";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hasPageEnding = ["/portfolio", "/websites", "/sistemas"].includes(pathname);

  useEffect(() => {
    document.body.classList.toggle("md:cursor-none", pathname !== "/");

    return () => {
      document.body.classList.remove("md:cursor-none");
    };
  }, [pathname]);

  if (pathname === "/") {
    return children;
  }

  return (
    <SmoothScroll>
      <NoiseOverlay />
      <CustomCursor />
      <Navbar />
      <PageHud />
      {children}
      {!hasPageEnding && <Footer />}
    </SmoothScroll>
  );
}
