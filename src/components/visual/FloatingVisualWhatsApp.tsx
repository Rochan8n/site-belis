"use client";

import { useEffect, useState } from "react";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";

export function FloatingVisualWhatsApp() {
  const [studioVisible, setStudioVisible] = useState(false);

  useEffect(() => {
    const studio = document.getElementById("seu-projeto");
    if (!studio) return;
    const observer = new IntersectionObserver(([entry]) => setStudioVisible(entry.isIntersecting));
    observer.observe(studio);
    return () => observer.disconnect();
  }, []);

  // The studio has its own CTA carrying the selected design. Keep it unobstructed.
  return studioVisible ? null : <FloatingWhatsApp service="visual" />;
}
