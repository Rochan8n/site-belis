"use client";

import { usePathname } from "next/navigation";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { GradientBackground } from "@/components/ui/GradientBackground";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/") {
    return children;
  }

  return (
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
  );
}
