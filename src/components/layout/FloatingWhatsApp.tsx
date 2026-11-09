"use client";

import type { MouseEventHandler } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { EngineeringContact } from "@/components/engineering/EngineeringContact";
import { WhatsAppLink } from "@/components/visual/WhatsAppLink";
import styles from "./floatingWhatsApp.module.css";

type Props = {
  service?: "visual" | "engineering";
  href?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function FloatingWhatsApp({ service, href = "https://wa.me/5511973138895", onClick }: Props) {
  const props = { className: styles.button, "data-floating-whatsapp": "", onClick };
  const content = <><FaWhatsapp size={28} aria-hidden="true" /><span>Seu projeto começa aqui</span></>;

  if (service === "visual") {
    return <WhatsAppLink {...props} placement="floating" aria-label="Seu projeto começa aqui: converse no WhatsApp sobre comunicação visual">{content}</WhatsAppLink>;
  }
  if (service === "engineering") {
    return <EngineeringContact {...props} placement="floating" aria-label="Seu projeto começa aqui: converse no WhatsApp sobre engenharia reversa">{content}</EngineeringContact>;
  }
  return <a {...props} href={href} target="_blank" rel="noopener noreferrer" aria-label="Seu projeto começa aqui: converse no WhatsApp">{content}</a>;
}
