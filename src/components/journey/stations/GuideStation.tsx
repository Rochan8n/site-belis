interface GuideStationProps { onContinue: () => void }

export function GuideStation({ onContinue }: GuideStationProps) {
  return (
    <section id="journey-station-1" className="journey-station content-station" aria-label="O Guia">
      <div className="station-block guide-block">
        <span className="station-badge">✦ ATO II · INICIAÇÃO — O GUIA</span>
        <h2>Você é o herói.<br />Nós somos o guia.</h2>
        <p>Toda jornada que vira história tem um mentor — quem já andou o caminho, conhece o mapa e entrega a ferramenta que destrava tudo. A Belis não quer o protagonismo. Quer te levar até ele.</p>
        <div className="story-arc" aria-label="A jornada com a Belis">
          <div><small>O ABISMO</small><span>Marca invisível, site que não vende, operação travada.</span></div>
          <div><small>O GUIA</small><span>A Belis entrega o mapa e as ferramentas.</span></div>
          <div><small>O NOVO MUNDO</small><span>Você vira a referência que o mercado cita.</span></div>
        </div>
        <button className="journey-cta" onClick={onContinue}>VER AS PROVAÇÕES <span aria-hidden="true">↓</span></button>
      </div>
    </section>
  );
}
