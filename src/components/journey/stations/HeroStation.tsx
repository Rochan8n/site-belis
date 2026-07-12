interface HeroStationProps { onContinue: () => void }

export function HeroStation({ onContinue }: HeroStationProps) {
  return (
    <section id="journey-station-0" className="journey-station hero-station" aria-label="Início">
      <div className="hero-kicker">
        <span>BELIS AGENCY — SÃO PAULO</span>
        <span>PRODUTORA CRIATIVA</span>
        <span>AUDIOVISUAL + SOFTWARE</span>
      </div>
      <div className="hero-copy">
        <h1>Sua empresa já entrega.<br />Falta a presença que fecha.</h1>
        <button className="journey-text-button" onClick={onContinue}>
          VER O QUE MUDA <span aria-hidden="true">↓</span>
        </button>
        <span className="scroll-hint">SCROLL ↓</span>
      </div>
    </section>
  );
}
