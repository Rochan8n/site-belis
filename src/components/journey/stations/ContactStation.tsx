import Link from "next/link";
import { importantProjects } from "../journeyData";
import { TestimonialProof } from "../TestimonialProof";

export function ContactStation() {
  return (
    <section id="journey-station-5" className="journey-station content-station contact-station" aria-label="Contato">
      <div className="station-block contact-block">
        <span className="act-kicker">PRÓXIMO PASSO</span>
        <span className="station-badge">✦ VAMOS CONVERSAR</span>
        <h2>Pronto para a versão<br />que o mercado respeita?</h2>
        <p>
          Manda uma mensagem. Do outro lado, um time do roteiro ao deploy —
          audiovisual, web e software no mesmo padrão.
        </p>
        <div className="contact-actions">
          <a
            className="journey-cta primary"
            href="https://wa.me/5511973138895"
            target="_blank"
            rel="noopener noreferrer"
          >
            FALAR NO WHATSAPP <span aria-hidden="true">→</span>
          </a>
          <Link className="journey-cta" href="/portfolio">PORTFÓLIO ↗</Link>
        </div>
        <p className="projects-line">{importantProjects.join(" · ")}</p>
      </div>
      <TestimonialProof />
      <span className="journey-coordinates">BELIS © 2026 — SÃO PAULO · 23.55°S 46.63°W</span>
    </section>
  );
}
