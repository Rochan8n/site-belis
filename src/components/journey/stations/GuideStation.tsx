interface GuideStationProps { onContinue: () => void }

export function GuideStation({ onContinue }: GuideStationProps) {
  return (
    <section id="journey-station-1" className="journey-station content-station" aria-label="Parceiro">
      <div className="station-block guide-block">
        <span className="station-badge">✦ DO FRAME AO SISTEMA</span>
        <h2>Você cuida do negócio.<br />A gente constrói o que te coloca na frente.</h2>
        <p>
          Audiovisual que gera autoridade, site que converte e sistema que escala —
          no mesmo padrão, com o mesmo time. Sem reinventar o funil a cada etapa.
        </p>
        <div className="story-arc" aria-label="Como a Belis trabalha">
          <div><small>HOJE</small><span>Marca invisível, site que não vende, operação travada.</span></div>
          <div><small>COM A BELIS</small><span>Vídeo, web e software no mesmo padrão de entrega.</span></div>
          <div><small>DEPOIS</small><span>A referência que o mercado cita — e escolhe.</span></div>
        </div>
        <button className="journey-cta" onClick={onContinue}>
          VER O QUE ENTREGAMOS <span aria-hidden="true">↓</span>
        </button>
      </div>
    </section>
  );
}
