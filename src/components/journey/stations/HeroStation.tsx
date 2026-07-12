interface HeroStationProps { onContinue: () => void }

export function HeroStation({ onContinue }: HeroStationProps) {
  return (
    <section id="journey-station-0" className="journey-station hero-station" aria-label="O Chamado">
      <div className="hero-kicker">
        <span>ATO I · PARTIDA — O CHAMADO</span>
        <span>PRODUTORA CRIATIVA — SÃO PAULO</span>
        <span>AUDIOVISUAL + SOFTWARE</span>
      </div>
      <div className="hero-copy">
        <h1>Toda empresa que vira referência<br />começa com um chamado.</h1>
        <button className="journey-text-button" onClick={onContinue}>A SUA JORNADA COMEÇA AQUI <span aria-hidden="true">↓</span></button>
        <span className="scroll-hint">SCROLL PARA ATRAVESSAR ↓</span>
      </div>
    </section>
  );
}
