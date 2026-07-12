interface HeroStationProps { onContinue: () => void }

export function HeroStation({ onContinue }: HeroStationProps) {
  return (
    <section id="journey-station-0" className="journey-station hero-station" aria-label="Início">
      <div className="hero-kicker">
        <span>BELIS AGENCY — SÃO PAULO</span>
        <span>ATIVOS DIGITAIS DE CRESCIMENTO</span>
        <span>ESTRATÉGIA + AUDIOVISUAL + WEB + SOFTWARE</span>
      </div>
      <div className="hero-copy">
        <h1>Sua empresa evoluiu.<br />O mercado ainda não percebeu.</h1>
        <button className="journey-text-button" onClick={onContinue}>
          QUERO CONSTRUIR UMA MARCA QUE VENDE ANTES DA REUNIÃO <span aria-hidden="true">↓</span>
        </button>
        <span className="scroll-hint">SCROLL ↓</span>
      </div>
    </section>
  );
}
