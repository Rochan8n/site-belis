import type { SolutionItem } from "./solutionsData";

type ItemGridProps = {
  category: string;
  items: readonly SolutionItem[];
};

export function ItemGrid({ category, items }: ItemGridProps) {
  return (
    <section
      aria-labelledby="solutions-items-title"
      className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:px-12 sm:py-32 lg:px-24"
    >
      <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.38em] text-coral sm:text-xs">
        ++ 01 — O que muda
      </p>
      <h2
        id="solutions-items-title"
        className="mb-14 font-heading text-4xl font-black uppercase leading-none tracking-tight text-cream sm:text-6xl"
      >
        Soluções diferentes,
        <br />
        uma transformação coerente.
      </h2>

      <div className="grid gap-8 lg:grid-cols-[0.7fr_2fr] lg:gap-20">
        <h3 className="border-b border-coral/40 pb-4 font-heading text-sm font-extrabold uppercase tracking-[0.3em] text-cream/50 lg:self-start">
          {category}
        </h3>
        <ol className="grid border-t border-cream/15 sm:grid-cols-2">
          {items.map((item, index) => (
            <li
              key={item.name}
              className="grid grid-cols-[2.75rem_1fr] gap-3 border-b border-cream/15 py-7 sm:odd:pr-8 sm:even:border-l sm:even:pl-8"
            >
              <span
                aria-hidden="true"
                className="font-heading text-sm font-black text-coral/70"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h4 className="mb-2 font-heading text-xl font-extrabold text-cream">
                  {item.name}
                </h4>
                <p className="text-sm font-light leading-relaxed text-cream/55">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
