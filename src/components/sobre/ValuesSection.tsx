"use client";

// Framer Motion removido — efeito hover idêntico implementado com CSS transition nativo.
// Ganho: ~50KB do bundle eliminados. Visual 100% idêntico ao original.

const values = [
  {
    title: "Nossa Missão",
    desc: "Construir presença e operação que vendem: audiovisual que gera autoridade, páginas que convertem e sistemas que escalam — com rigor técnico e foco em resultado de negócio.",
    bgcolor: "bg-navy",
    textColor: "text-cream",
    style: {},
  },
  {
    title: "Nossa Visão",
    desc: "Ser o parceiro do frame ao sistema para marcas que não aceitam mediocridade — estética cinematográfica a serviço de conversão e escala.",
    bgcolor: "",
    textColor: "text-cream",
    style: { backgroundColor: "#001f3f" },
  },
  {
    title: "Diferencial Estratégico",
    desc: "Liderança com Administração (Mackenzie) e Gestão de Engenharia da Qualidade (USP). Cada entrega — vídeo, site ou software — passa por controle de qualidade focado em resultado, não em vanity metrics.",
    bgcolor: "",
    textColor: "text-cream",
    style: { backgroundColor: "#44403C" },
  }
];

export function ValuesSection() {
  return (
    <section className="w-full bg-navy relative z-20 border-t border-cream/10">
      <div className="grid grid-cols-1 lg:grid-cols-3 w-full min-h-[60vh] lg:min-h-0">
        {values.map((v, i) => (
          // Substituição do motion.div por div com CSS — hover via grupo Tailwind
          <div
            key={i}
            className={`flex flex-col justify-between p-12 sm:p-16 lg:p-20 border-b lg:border-b-0 lg:border-r border-cream/10 last:border-r-0 ${v.bgcolor} ${v.textColor} group cursor-crosshair h-full`}
            style={v.style}
          >
            <div className="mb-24 lg:mb-48">
              <span className="text-sm font-sans font-bold tracking-[0.3em] uppercase opacity-50 block mb-6 transition-opacity duration-300 group-hover:opacity-100">
                0{(i + 1)}
              </span>
              <h3 className="text-4xl sm:text-5xl font-heading font-black uppercase tracking-tight leading-none">
                {v.title}
              </h3>
            </div>

            {/*
              Substituição do motion.p (variants idle/hover: y 20→0, opacity 0.7→1).
              CSS transition nativo é mais performático — roda na GPU sem overhead JS.
              Efeito final idêntico ao Framer Motion original.
            */}
            <p className="text-lg font-sans font-medium leading-relaxed max-w-sm opacity-70 translate-y-5 transition-[opacity,transform] duration-[400ms] ease-out group-hover:opacity-100 group-hover:translate-y-0">
              {v.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
