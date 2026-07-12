import { processSteps } from "./solutionsData";

export function ProcessSteps() {
  return (
    <section
      aria-labelledby="solutions-process-title"
      className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:px-12 sm:py-32 lg:px-24"
    >
      <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.38em] text-coral sm:text-xs">
        ++ 03 — Como construímos
      </p>
      <h2
        id="solutions-process-title"
        className="mb-14 font-heading text-4xl font-black uppercase leading-none tracking-tight text-cream sm:text-6xl"
      >
        Clareza antes
        <br />
        de execução.
      </h2>
      <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        {processSteps.map((step) => (
          <li key={step.index} className="border-t-2 border-coral/55 pt-5">
            <span className="font-heading text-4xl font-black leading-none text-cream/15">
              {step.index}
            </span>
            <h3 className="mb-2 mt-3 font-heading text-lg font-extrabold uppercase tracking-[0.12em] text-cream">
              {step.name}
            </h3>
            <p className="text-sm font-light leading-relaxed text-cream/55">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
