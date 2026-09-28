"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { analyticsEnabled, getAnalyticsConsent, serverAnalyticsConsent, subscribeAnalyticsConsent, trackBlogEvent } from "@/lib/analytics-consent";
import type { BlogOfferProps } from "./BlogCta";
import styles from "./blog.module.css";

const POPUP_INTERVAL = 14 * 24 * 60 * 60 * 1000;

export function BlogExperience(offer: BlogOfferProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const bar = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [barDismissed, setBarDismissed] = useState(false);
  const consent = useSyncExternalStore(subscribeAnalyticsConsent, getAnalyticsConsent, serverAnalyticsConsent);
  const consentPending = analyticsEnabled && consent === "unknown";

  useEffect(() => {
    const element = dialog.current;
    let frame = 0;
    let readProgress = 0;
    let engagedSeconds = 0;
    let shown = false;
    let converted = false;
    const milestones = new Set<number>();
    const storageKey = "belis_blog_offer_seen_at";
    try {
      const seenAt = Number(window.localStorage.getItem(storageKey));
      shown = seenAt > 0 && Date.now() - seenAt < POPUP_INTERVAL;
    } catch { shown = true; } // Frequency control must work before an offer can open.
    const update = () => {
      frame = 0;
      const body = document.getElementById("blog-article-body");
      if (!body) return;
      const top = window.scrollY + body.getBoundingClientRect().top;
      const length = Math.max(1, body.offsetHeight - window.innerHeight);
      readProgress = Math.min(1, Math.max(0, (window.scrollY - top) / length));
      setProgress(readProgress);
      for (const mark of [25, 50, 75, 100]) {
        if (readProgress * 100 >= mark && !milestones.has(mark) && getAnalyticsConsent() === "granted") {
          milestones.add(mark);
          trackBlogEvent("blog_read_progress", offer.slug, offer.theme, "article", mark);
        }
      }
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    const onCta = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== offer.slug) return;
      converted = true;
      try { window.localStorage.setItem(storageKey, String(Date.now())); } catch { /* The active page still suppresses its offer. */ }
      element?.close();
    };
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") engagedSeconds += 5;
      if (shown || converted || document.visibilityState !== "visible" || engagedSeconds < 55 || readProgress < .4 || (analyticsEnabled && getAnalyticsConsent() === "unknown")) return;
      if (!element || typeof element.showModal !== "function" || document.querySelector("dialog[open]")) return;
      try { window.localStorage.setItem(storageKey, String(Date.now())); } catch { shown = true; return; }
      shown = true;
      element.showModal();
      trackBlogEvent("blog_popup_impression", offer.slug, offer.theme, "popup");
    }, 5000);
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("belis:blog-cta", onCta);
    return () => {
      window.clearInterval(timer);
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("belis:blog-cta", onCta);
      element?.close();
    };
  }, [offer.slug, offer.theme]);

  const showBar = progress >= .2 && !barDismissed && !consentPending;
  useEffect(() => {
    if (consent !== "granted" || !showBar || !bar.current || !window.IntersectionObserver) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        trackBlogEvent("blog_cta_impression", offer.slug, offer.theme, "mobile");
        observer.disconnect();
      }
    });
    observer.observe(bar.current);
    return () => observer.disconnect();
  }, [showBar, offer.slug, offer.theme, consent]);

  const click = (placement: "mobile" | "popup") => {
    trackBlogEvent("blog_cta_click", offer.slug, offer.theme, placement);
    window.dispatchEvent(new CustomEvent("belis:blog-cta", { detail: offer.slug }));
  };

  return <>
    <div className={styles.progress} aria-hidden="true"><span style={{ transform: `scaleX(${progress})` }} /></div>
    {showBar && <aside ref={bar} className={styles.mobileBar} aria-label="Contato com a Belis">
      <a href={offer.href} target="_blank" rel="noopener noreferrer" onClick={() => click("mobile")}>{offer.label} ↗</a>
      <button type="button" className={styles.dismiss} onClick={() => setBarDismissed(true)} aria-label="Ocultar barra de contato">Fechar</button>
    </aside>}
    <dialog ref={dialog} className={styles.dialog} aria-labelledby="blog-offer-title" onCancel={() => trackBlogEvent("blog_popup_dismiss", offer.slug, offer.theme, "popup")}>
      <button type="button" className={styles.dismiss} autoFocus onClick={() => { dialog.current?.close(); trackBlogEvent("blog_popup_dismiss", offer.slug, offer.theme, "popup"); }}>Continuar lendo</button>
      <h2 id="blog-offer-title">{offer.heading}</h2><p>{offer.text}</p>
      <a className={styles.button} href={offer.href} target="_blank" rel="noopener noreferrer" onClick={() => click("popup")}>{offer.label} ↗</a>
    </dialog>
  </>;
}
