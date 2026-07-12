import Link from "next/link";
import { importantProjects } from "../journeyData";
import { TestimonialProof } from "../TestimonialProof";

export function ContactStation() {
  return (
    <section id="journey-station-5" className="journey-station content-station contact-station" aria-label="O Retorno">
      <div className="station-block contact-block">
        <span className="act-kicker">ATO III · RETORNO</span>
        <span className="station-badge">✦ A TRAVESSIA DO LIMIAR</span>
        <h2>O primeiro passo<br />é seu.</h2>
        <p>Você atravessa o limiar com uma mensagem. Do outro lado, um parceiro do roteiro ao deploy — e a versão da sua empresa que o mercado vai admirar.</p>
        <div className="contact-actions">
          <a className="journey-cta primary" href="https://wa.me/5511973138895" target="_blank" rel="noopener noreferrer">DAR O PRIMEIRO PASSO <span aria-hidden="true">→</span></a>
          <Link className="journey-cta" href="/portfolio">PORTFÓLIO ↗</Link>
        </div>
        <p className="projects-line">{importantProjects.join(" · ")}</p>
      </div>
      <TestimonialProof />
      <span className="journey-coordinates">BELIS © 2026 — SÃO PAULO · 23.55°S 46.63°W</span>
    </section>
  );
}
