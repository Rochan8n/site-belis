import Link from "next/link";
import {
  CTA_HEADING,
  EMAIL_HREF,
  INSTAGRAM_HREF,
  WHATSAPP_HREF,
} from "./solutionsData";

export function CtaBanner() {
  return (
    <section
      aria-labelledby="solutions-cta-title"
      className="relative z-10 bg-coral px-6 py-20 text-center text-navy sm:px-12 sm:py-28 lg:px-24"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center">
        <h2
          id="solutions-cta-title"
          className="mb-9 max-w-5xl font-heading text-[clamp(2.35rem,6vw,4.75rem)] font-black uppercase leading-[0.95] tracking-tight"
        >
          {CTA_HEADING}
        </h2>
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-14 items-center justify-center gap-3 bg-navy px-9 py-5 text-xs font-bold uppercase tracking-[0.24em] text-coral outline-none transition hover:shadow-[0_12px_40px_rgba(5,5,8,0.4)] focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-4 focus-visible:ring-offset-coral sm:px-11 sm:text-sm"
        >
          WhatsApp <span aria-hidden="true">→</span>
        </a>
        <nav
          aria-label="Links complementares"
          className="mt-14 flex flex-wrap justify-center gap-x-6 gap-y-4 text-[10px] font-bold uppercase tracking-[0.22em] text-navy/60"
        >
          <Link href="/" className="outline-none transition hover:text-navy focus-visible:text-navy">
            ← Home
          </Link>
          <a
            href={INSTAGRAM_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="outline-none transition hover:text-navy focus-visible:text-navy"
          >
            Instagram
          </a>
          <a
            href={EMAIL_HREF}
            className="outline-none transition hover:text-navy focus-visible:text-navy"
          >
            Lucas@belis.agency
          </a>
        </nav>
      </div>
    </section>
  );
}
