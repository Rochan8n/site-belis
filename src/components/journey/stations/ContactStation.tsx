import { TransitionLink } from "@/components/layout/TransitionLink";
import { TestimonialProof } from "../TestimonialProof";

export function ContactStation() {
  return (
    <section id="journey-station-5" className="journey-station content-station contact-station" aria-label="Contato">
      <div className="station-block contact-block">
        <span className="act-kicker">SUA PRÓXIMA EVOLUÇÃO</span>
        <span className="station-badge">✦ VAMOS CONSTRUIR</span>
        <h2>Sua empresa já evoluiu.<br />Agora a percepção precisa acompanhar.</h2>
        <p>
          Vamos construir uma presença capaz de traduzir sua qualidade,
          fortalecer sua confiança no mercado e sustentar seu crescimento.
        </p>
        <div className="contact-actions">
          <a
            className="journey-cta primary"
            href="https://wa.me/5511973138895"
            target="_blank"
            rel="noopener noreferrer"
          >
            VAMOS CONSTRUIR ISSO JUNTOS <span aria-hidden="true">→</span>
          </a>
          <TransitionLink className="journey-cta" href="/portfolio">PORTFÓLIO ↗</TransitionLink>
        </div>
      </div>
      <TestimonialProof />
      <span className="journey-coordinates">BELIS © 2026 — SÃO PAULO · 23.55°S 46.63°W</span>
    </section>
  );
}
