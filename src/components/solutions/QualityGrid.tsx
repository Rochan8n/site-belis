import { qualityItems, STACK_LINE } from "./solutionsData";

export function QualityGrid() {
  return (
    <section
      aria-labelledby="solutions-quality-title"
      className="relative z-10 border-y border-cream/10 bg-[#09090d]"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-12 sm:py-32 lg:px-24">
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.38em] text-coral sm:text-xs">
          ++ 04 — Qualidade &amp; stack
        </p>
        <h2
          id="solutions-quality-title"
          className="mb-14 font-heading text-4xl font-black uppercase leading-none tracking-tight text-cream sm:text-6xl"
        >
          Cinema-grade
          <br />
          também no código.
        </h2>
        <ul className="grid gap-x-12 sm:grid-cols-2">
          {qualityItems.map((item) => (
            <li key={item.name} className="border-t border-cream/15 py-7">
              <h3 className="mb-2 font-heading text-xl font-extrabold text-cream">
                {item.name}
              </h3>
              <p className="text-sm font-light leading-relaxed text-cream/55">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-[10px] font-semibold uppercase leading-loose tracking-[0.22em] text-cream/40 sm:text-xs sm:tracking-[0.28em]">
          {STACK_LINE}
        </p>
      </div>
    </section>
  );
}
