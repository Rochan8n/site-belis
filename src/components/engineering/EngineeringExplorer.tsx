"use client";

import { useState } from "react";
import { ArrowUpRight, Check, MoveUpRight } from "lucide-react";
import { applications } from "./engineeringContent";
import { EngineeringContact } from "./EngineeringContact";
import styles from "./engineering.module.css";

export function EngineeringExplorer() {
  const [active, setActive] = useState<string>(applications[0].id);
  return <div className={styles.explorer}>
    <fieldset className={styles.applicationChoices}>
      <legend className={styles.srOnly}>Escolha uma aplicação</legend>
      {applications.map((item) => <label key={item.id} className={active === item.id ? styles.activeChoice : undefined}>
        <input type="radio" name="engineering-application" value={item.id} checked={active === item.id} onChange={() => setActive(item.id)} aria-controls={`application-${item.id}`} />
        <span className={styles.mono}>{item.number}</span><span>{item.label}</span><MoveUpRight size={19} aria-hidden="true" />
      </label>)}
    </fieldset>
    <div aria-live="polite" aria-atomic="true">
      {applications.map((item) => <div key={item.id} id={`application-${item.id}`} hidden={active !== item.id} className={styles.applicationPanel}>
        <div><h3>{item.title}</h3><p>{item.description}</p><EngineeringContact placement="applications" message={`Olá, Belis! Quero avaliar um projeto de ${item.label.toLowerCase()}. Vim pela página de engenharia reversa.`} className={styles.textLink}>Conversar sobre minha peça <ArrowUpRight size={18} aria-hidden="true" /></EngineeringContact></div>
        <div><ul>{item.items.map((text) => <li key={text}><Check size={17} aria-hidden="true" />{text}</li>)}</ul><p className={styles.applicationNote}>{item.note}</p></div>
      </div>)}
    </div>
  </div>;
}

export function ProjectBrief() {
  const [sector, setSector] = useState("Automotivo — clássicos e raros");
  const [service, setService] = useState("Recriar uma peça existente");
  const [part, setPart] = useState("");
  const [details, setDetails] = useState("");
  const message = ["Olá, Belis! Quero avaliar um projeto de engenharia reversa.", `Área: ${sector}.`, `Preciso de: ${service}.`, part.trim() && `Peça / veículo / máquina: ${part.trim()}`, details.trim() && `Detalhes: ${details.trim()}`, "Posso enviar fotos e medidas por aqui."].filter(Boolean).join("\n");
  return <div className={styles.briefForm}>
    <div className={styles.briefRow}>
      <label>Seu projeto<select value={sector} onChange={(event) => setSector(event.target.value)}><option>Automotivo — clássicos e raros</option><option>Automotivo — performance e custom</option><option>Industrial — máquinas e equipamentos</option><option>Outro projeto</option></select></label>
      <label>O que você precisa?<select value={service} onChange={(event) => setService(event.target.value)}><option>Recriar uma peça existente</option><option>Desenvolver uma peça nova</option><option>Escaneamento 3D</option><option>Modelagem 3D / CAD</option><option>Imprimir um modelo 3D pronto</option><option>Protótipo ou pequeno lote</option></select></label>
    </div>
    <label>Qual é a peça, veículo ou máquina? <span>(opcional)</span><input value={part} onChange={(event) => setPart(event.target.value)} maxLength={160} placeholder="Ex.: difusor de ar de um cupê de 1988" /></label>
    <label>O que precisamos saber? <span>(opcional)</span><textarea value={details} onChange={(event) => setDetails(event.target.value)} maxLength={900} rows={3} placeholder="Medidas, quantidade, temperatura de uso, contato com produtos químicos e cidade de entrega." /></label>
    <EngineeringContact placement="brief" message={message} className={styles.button}>Levar projeto ao WhatsApp <ArrowUpRight size={21} aria-hidden="true" /></EngineeringContact>
    <p className={styles.briefNote}>Você revisa a mensagem antes de enviar. Fotos e arquivos podem ser anexados na conversa.</p>
  </div>;
}
