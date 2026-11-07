"use client";

import type { AnchorHTMLAttributes } from "react";
import { getAnalyticsConsent, initializeAnalytics } from "@/lib/analytics-consent";
import { ENGINEERING_PATH, engineeringWhatsAppUrl } from "./engineeringContent";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  placement: "header" | "hero" | "applications" | "process" | "brief" | "direct" | "footer";
  message?: string;
};

export function EngineeringContact({ placement, message, onClick, ...props }: Props) {
  return <a {...props} href={engineeringWhatsAppUrl(message)} target="_blank" rel="noopener noreferrer" data-engineering-contact={placement} onClick={(event) => {
    // Track contact intent only. Project descriptions never enter analytics.
    if (getAnalyticsConsent() === "granted") {
      initializeAnalytics()?.("event", "engineering_whatsapp_click", { page_path: ENGINEERING_PATH, cta_placement: placement });
    }
    onClick?.(event);
  }} />;
}
