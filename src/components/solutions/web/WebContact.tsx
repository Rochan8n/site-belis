"use client";

import type { AnchorHTMLAttributes } from "react";
import { getAnalyticsConsent, initializeAnalytics } from "@/lib/analytics-consent";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  placement: "header" | "hero" | "portfolio" | "scope" | "closing" | "floating";
};

export const WEB_CONTACT_HREF = `https://wa.me/5511973138895?text=${encodeURIComponent("Olá! Vim pela página de websites da Belis e quero um orçamento para criar ou renovar meu site. Minha empresa atua com: ")}`;

export function WebContact({ placement, children, onClick, ...props }: Props) {
  return <a {...props} href={WEB_CONTACT_HREF} target="_blank" rel="noopener noreferrer" onClick={(event) => {
    if (getAnalyticsConsent() === "granted") {
      initializeAnalytics()?.("event", "websites_whatsapp_click", { page_path: "/websites", cta_placement: placement, service: "websites" });
    }
    onClick?.(event);
  }}>{children}</a>;
}
