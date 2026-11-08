"use client";

import { useState } from "react";
import { ArrowUpRight, Check, MoveUpRight } from "lucide-react";
import { applications } from "./engineeringContent";
import { EngineeringContact } from "./EngineeringContact";
import { useEngineeringProject } from "./EngineeringProjectContext";
import styles from "./engineering.module.css";

export function EngineeringExplorer() {
  const { application: active, selectApplication } = useEngineeringProject();
  return <div className={styles.explorer}>
    <fieldset className={styles.applicationChoices}>
      <legend className={styles.srOnly}>Escolha uma aplicação</legend>
      {applications.map((item) => <label key={item.id} className={active === item.id ? styles.activeChoice : undefined}>
        <input type="radio" name="engineering-application" value={item.id} checked={active === item.id} onChange={() => selectApplication(item.id)} aria-controls={`application-${item.id}`} />
        <span className={styles.mono}>{item.number}</span><span>{item.label}</span><MoveUpRight size={19} aria-hidden="true" />
      </label>)}
    </fieldset>
    <div aria-live="polite" aria-atomic="true">
      {active === null && <div className={styles.otherApplication}><h3>Seu projeto tem outro ponto de partida?</h3><p>Conte a função da peça e o que você já tem: uma referência, medidas ou um arquivo. Avaliamos o caminho conforme a aplicação.</p><a href="#projeto" className={styles.textLink}>Continuar meu briefing <ArrowUpRight size={18} aria-hidden="true" /></a></div>}
      {applications.map((item) => <div key={item.id} id={`application-${item.id}`} hidden={active !== item.id} className={styles.applicationPanel}>
        <div><h3>{item.title}</h3><p>{item.description}</p><EngineeringContact placement="applications" message={`Olá, Belis! Quero avaliar um projeto de ${item.label.toLowerCase()}. Vim pela página de engenharia reversa.`} className={styles.textLink}>Conversar sobre minha peça <ArrowUpRight size={18} aria-hidden="true" /></EngineeringContact></div>
        <div><ul>{item.items.map((text) => <li key={text}><Check size={17} aria-hidden="true" />{text}</li>)}</ul><p className={styles.applicationNote}>{item.note}</p></div>
      </div>)}
    </div>
  </div>;
}

export function ProjectBrief() {
  const { sector, selectSector } = useEngineeringProject();
  const [service, setService] = useState("Recriar uma peça existente");
  const [part, setPart] = useState("");
  const [details, setDetails] = useState("");
  const message = ["Olá, Belis! Quero avaliar um projeto de engenharia reversa.", `Área: ${sector}.`, `Preciso de: ${service}.`, part.trim() && `Peça / veículo / máquina: ${part.trim()}`, details.trim() && `Detalhes: ${details.trim()}`, "Posso enviar fotos e medidas por aqui."].filter(Boolean).join("\n");
  return <div className={styles.briefForm}>
    <div className={styles.briefRow}>
      <div><label htmlFor="engineering-sector">Seu projeto</label><select id="engineering-sector" value={sector} onChange={(event) => selectSector(event.target.value)}>{applications.map((item) => <option key={item.id}>{item.sector}</option>)}<option>Outro projeto</option></select></div>
      <div><label htmlFor="engineering-service">O que você precisa?</label><select id="engineering-service" value={service} onChange={(event) => setService(event.target.value)}><option>Recriar uma peça existente</option><option>Desenvolver uma peça nova</option><option>Escaneamento 3D</option><option>Modelagem 3D / CAD</option><option>Imprimir um modelo 3D pronto</option><option>Protótipo ou pequeno lote</option></select></div>
    </div>
    <label>Qual é a peça, veículo ou máquina? <span>(opcional)</span><input value={part} onChange={(event) => setPart(event.target.value)} maxLength={160} placeholder="Ex.: difusor de ar de um cupê de 1988" /></label>
    <label>O que precisamos saber? <span>(opcional)</span><textarea value={details} onChange={(event) => setDetails(event.target.value)} maxLength={900} rows={3} placeholder="Medidas, quantidade, temperatura de uso, contato com produtos químicos e cidade de entrega." /></label>
    <EngineeringContact placement="brief" message={message} className={styles.button}>Levar projeto ao WhatsApp <ArrowUpRight size={21} aria-hidden="true" /></EngineeringContact>
    <p className={styles.briefNote}>Você revisa a mensagem antes de enviar. Fotos e arquivos podem ser anexados na conversa.</p>
  </div>;
}
