import { SolutionBlob } from "./SolutionBlob";
import { WHATSAPP_HREF } from "./solutionsData";

type SolutionHeroProps = {
  eyebrow: string;
  headline: string;
  accent: string;
  subcopy: string;
};

export function SolutionHero({
  eyebrow,
  headline,
  accent,
  subcopy,
}: SolutionHeroProps) {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden px-6 pb-16 pt-36 text-center sm:px-12 lg:px-24">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 opacity-55 [background-image:linear-gradient(rgba(246,247,237,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(246,247,237,0.04)_1px,transparent_1px)] [background-size:88px_88px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 aspect-square w-[clamp(18.75rem,68vmin,41.25rem)] -translate-x-1/2 -translate-y-[52%] opacity-85"
      >
        <SolutionBlob className="h-full w-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.38em] text-coral sm:text-xs">
          ++ {eyebrow}
        </p>
        <h1 className="font-heading text-[clamp(2.65rem,7.5vw,6rem)] font-black uppercase leading-[0.92] tracking-[-0.025em] text-cream [text-shadow:0_0_60px_rgba(5,5,8,0.95)]">
          {headline}
          <br />
          <span className="text-coral">{accent}</span>
        </h1>
        <p className="mx-auto mb-9 mt-7 max-w-xl text-base font-light leading-relaxed text-cream/60 sm:text-lg">
          {subcopy}
        </p>
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center justify-center gap-3 bg-coral px-7 py-4 text-xs font-bold uppercase tracking-[0.22em] text-navy outline-none transition hover:shadow-[0_0_34px_rgba(116,195,101,0.45)] focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-4 focus-visible:ring-offset-navy sm:px-9"
        >
          Iniciar projeto <span aria-hidden="true">→</span>
        </a>
      </div>

      <span
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.4em] text-cream/30"
      >
        Scroll
      </span>
    </section>
  );
}
