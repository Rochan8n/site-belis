"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { getAnalyticsConsent, serverAnalyticsConsent, subscribeAnalyticsConsent, trackBlogEvent, type BlogPlacement } from "@/lib/analytics-consent";
import styles from "./blog.module.css";

export interface BlogOfferProps {
  slug: string;
  theme: string;
  heading: string;
  text: string;
  label: string;
  href: string;
}

export function BlogCta({ slug, theme, heading, text, label, href, placement, dismissible = false }: BlogOfferProps & { placement: BlogPlacement; dismissible?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const [dismissed, setDismissed] = useState(false);
  const consent = useSyncExternalStore(subscribeAnalyticsConsent, getAnalyticsConsent, serverAnalyticsConsent);
  useEffect(() => {
    if (consent !== "granted" || !ref.current || dismissed || !window.IntersectionObserver) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        trackBlogEvent("blog_cta_impression", slug, theme, placement);
        observer.disconnect();
      }
    }, { threshold: .5 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [slug, theme, placement, dismissed, consent]);
  if (dismissed) return null;
  return <aside ref={ref} className={styles.cta} data-placement={placement} aria-label="Converse sobre seu projeto">
    {dismissible && <button type="button" className={styles.dismiss} onClick={() => setDismissed(true)}>Ocultar sugestão</button>}
    <h3>{heading}</h3><p>{text}</p>
    <a className={styles.button} href={href} target="_blank" rel="noopener noreferrer" data-blog-cta={placement} onClick={() => {
      trackBlogEvent("blog_cta_click", slug, theme, placement);
      window.dispatchEvent(new CustomEvent("belis:blog-cta", { detail: slug }));
    }}>{label}<span aria-hidden="true">↗</span></a>
  </aside>;
}
