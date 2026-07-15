"use client";

import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHud } from "@/components/layout/PageHud";

const PAGE_ENDING_ROUTES = ["/portfolio", "/websites", "/sistemas"];

export function SiteChromeFull({
  children,
  pathname,
}: {
  children: React.ReactNode;
  pathname: string;
}) {
  const hasPageEnding = PAGE_ENDING_ROUTES.includes(pathname);

  return (
    <SmoothScroll>
      <NoiseOverlay />
      <Navbar />
      <PageHud />
      {children}
      {!hasPageEnding && <Footer />}
    </SmoothScroll>
  );
}
