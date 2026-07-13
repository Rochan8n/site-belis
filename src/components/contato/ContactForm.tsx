"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap-init";
import styles from "./contato.module.css";

const projectTypes = [
  "Fortalecer minha marca",
  "Projeto audiovisual",
  "Website ou landing page",
  "Sistema sob medida",
  "Ainda não sei",
];

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedType, setSelectedType] = useState(projectTypes[0]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      "Olá! Quero conversar sobre um projeto com a Belis.",
      "",
      `Nome: ${data.get("name")}`,
      `Empresa: ${data.get("company")}`,
      `E-mail: ${data.get("email")}`,
      `Interesse: ${selectedType}`,
      `Desafio: ${data.get("message") || "Prefiro explicar na conversa."}`,
    ].join("\n");

    window.open(
      `https://wa.me/5511973138895?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  useEffect(() => {
    if (!formRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-form-row]",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.07,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 84%",
          },
        },
      );
    }, formRef);

    return () => ctx.revert();
  }, []);

  return (
    <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field} data-form-row>
        <div className={styles.fieldMeta}><span>01</span><span>IDENTIFICAÇÃO</span></div>
        <label htmlFor="name">Como podemos chamar você?</label>
        <input
          type="text"
          id="name"
          name="name"
          autoComplete="name"
          required
          placeholder="Seu nome"
        />
      </div>

      <div className={styles.field} data-form-row>
        <div className={styles.fieldMeta}><span>02</span><span>CANAL DE RETORNO</span></div>
        <label htmlFor="email">Melhor e-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          required
          placeholder="seu@email.com"
        />
      </div>

      <div className={styles.field} data-form-row>
        <div className={styles.fieldMeta}><span>03</span><span>ORGANIZAÇÃO</span></div>
        <label htmlFor="company">Sua empresa</label>
        <input
          type="text"
          id="company"
          name="company"
          autoComplete="organization"
          required
          placeholder="Nome da empresa"
        />
      </div>

      <div className={styles.field} data-form-row>
        <div className={styles.fieldMeta}><span>04</span><span>CONTEXTO</span></div>
        <label htmlFor="message">O que precisa mudar?</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Conte o momento da empresa, o principal desafio e o resultado que você busca."
        />
      </div>

      <fieldset className={styles.projectField} data-form-row>
        <legend>Por onde podemos começar?</legend>
        <div className={styles.typeGrid}>
          {projectTypes.map((type, index) => (
            <label className={styles.typeOption} key={type}>
              <input
                type="radio"
                name="projectType"
                value={type}
                checked={selectedType === type}
                onChange={() => setSelectedType(type)}
              />
              <span className={styles.typeContent}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{type}</strong>
                <i aria-hidden="true" />
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className={styles.submitRow} data-form-row>
        <button type="submit" data-magnetic data-magnetic-text="SEND">
          <span>CONVERSAR SOBRE MEU PROJETO</span>
          <i aria-hidden="true">→</i>
        </button>
        <small>Você será direcionado ao WhatsApp com suas respostas.</small>
      </div>
    </form>
  );
}
