import { studioStats, type trials } from "../journeyData";

type Trial = (typeof trials)[number];
interface TrialStationProps { trial: Trial; onEnter: () => void }

export function TrialStation({ trial, onEnter }: TrialStationProps) {
  return (
    <section
      id={`journey-station-${trial.station}`}
      className={`journey-station content-station trial-station ${trial.theme}`}
      aria-label={`${trial.name}: ${trial.focus}`}
    >
      <div className="station-block trial-block">
        <span className="act-kicker">{trial.name}</span>
        <span className="station-badge">✦ {trial.number} — {trial.focus}</span>
        <h2>{trial.title}</h2>
        <p>{trial.description}</p>
        <div className="before-after">
          <div><small>ANTES</small><span>{trial.before}</span></div>
          <div><small>DEPOIS</small><span>{trial.after}</span></div>
        </div>
        <button className="journey-cta" onClick={onEnter}>
          {trial.cta} <span aria-hidden="true">→</span>
        </button>
      </div>
      <aside className="trial-note">
        <strong>■ {trial.noteTitle}</strong>
        <span>{trial.noteLines[0]}</span>
        <span>{trial.noteLines[1]}</span>
      </aside>
      {trial.station === 2 && (
        <div className="studio-proof">
          <div className="stats">
            {studioStats.map(([value, label]) => (
              <div key={label}><strong>{value}</strong><span>{label}</span></div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
