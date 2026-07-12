interface GuideStationProps { onContinue: () => void }

export function GuideStation({ onContinue }: GuideStationProps) {
  return (
    <section id="journey-station-1" className="journey-station content-station" aria-label="Parceiro">
      <div className="station-block guide-block">
        <span className="station-badge">✦ PERCEPÇÃO QUE GERA CRESCIMENTO</span>
        <h2>Enquanto você faz sua empresa crescer por dentro,<br />nós fazemos o mercado enxergar esse crescimento por fora.</h2>
        <p>
          Seus clientes decidem em segundos se sua empresa transmite confiança.
          Construímos essa percepção porque ela influencia preço, confiança e vendas.
        </p>
        <div className="story-arc" aria-label="Como a Belis trabalha">
          <div><small>HOJE</small><span>Uma empresa melhor do que sua presença digital demonstra.</span></div>
          <div><small>COM A BELIS</small><span>Estratégia, audiovisual, web e software alinhados à sua evolução.</span></div>
          <div><small>DEPOIS</small><span>Uma marca percebida, lembrada e escolhida pelo mercado.</span></div>
        </div>
        <button className="journey-cta" onClick={onContinue}>
          CONHECER OS ATIVOS DE CRESCIMENTO <span aria-hidden="true">↓</span>
        </button>
      </div>
    </section>
  );
}
