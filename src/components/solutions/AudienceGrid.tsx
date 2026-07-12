import type { SolutionItem } from "./solutionsData";

export function AudienceGrid({ items }: { items: readonly SolutionItem[] }) {
  return (
    <section
      aria-labelledby="solutions-audience-title"
      className="relative z-10 bg-cream text-navy"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-12 sm:py-32 lg:px-24">
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.38em] text-blue sm:text-xs">
          ++ 02 — O momento certo
        </p>
        <h2
          id="solutions-audience-title"
          className="mb-14 font-heading text-4xl font-black uppercase leading-none tracking-tight sm:text-6xl"
        >
          Para empresas que precisam
          <br />
          avançar sem improvisar.
        </h2>
        <ul className={`grid gap-x-12 ${items.length > 1 ? "md:grid-cols-3" : "max-w-2xl"}`}>
          {items.map((item) => (
            <li key={item.name} className="border-t border-navy/20 py-7">
              <h3 className="mb-2 font-heading text-xl font-extrabold">
                {item.name}
              </h3>
              <p className="text-sm font-normal leading-relaxed text-navy/65">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
