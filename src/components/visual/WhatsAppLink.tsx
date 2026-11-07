"use client";

import type { AnchorHTMLAttributes } from "react";
import { getAnalyticsConsent, initializeAnalytics } from "@/lib/analytics-consent";
import { visualWhatsAppUrl } from "./visualContent";

type Placement = "header" | "hero" | "gallery" | "studio" | "process" | "faq" | "closing" | "floating";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  placement: Placement;
  message?: string;
  projectType?: string;
};

export function WhatsAppLink({ placement, message, projectType, onClick, ...props }: Props) {
  return (
    <a
      {...props}
      href={visualWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      data-whatsapp-placement={placement}
      onClick={(event) => {
        // Track intent, not a confirmed lead. Never send custom text or location.
        if (getAnalyticsConsent() === "granted") {
          initializeAnalytics()?.("event", "visual_whatsapp_click", {
            page_path: "/comunicacao-visual",
            cta_placement: placement,
            ...(projectType ? { project_type: projectType } : {}),
          });
        }
        onClick?.(event);
      }}
    />
  );
}
