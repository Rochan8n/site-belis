import { ArrowDown, Check } from "lucide-react";
import { WebPortfolio } from "./WebPortfolio";
import { WebContact } from "./WebContact";
import { WebNovemberOffer } from "./WebNovemberOffer";
import styles from "./web.module.css";

const included = [
  ["Design para sua empresa", "Identidade visual aplicada a uma página clara, com seus serviços, diferenciais e formas de contato."],
  ["Experiência no celular", "Layout adaptado a celular e computador, com navegação simples e botões fáceis de encontrar."],
  ["Caminho direto ao orçamento", "Chamadas para o WhatsApp e organização do conteúdo para ajudar o visitante a dar o próximo passo."],
  ["Base para aparecer no Google", "Títulos, descrições e estrutura técnica para indexação. Posição no Google depende de trabalho contínuo."],
  ["Medição de contatos", "Configuração de Analytics e eventos de clique, respeitando a escolha de consentimento do visitante."],
  ["Publicação acompanhada", "Revisão dos links, telas e conteúdo antes de colocar o site no ar. Escopo e custos recorrentes definidos na proposta."],
] as const;

const steps = [
  ["Conte o que sua empresa faz", "Envie seu segmento, o site atual (se tiver) e o que precisa apresentar. Não precisa chegar com tudo pronto."],
  ["Receba uma proposta clara", "Você conhece o escopo, o investimento, o prazo e as condições antes de contratar."],
  ["Acompanhe a criação", "Alinhamos a direção visual e desenvolvemos o site com etapas de revisão combinadas."],
  ["Coloque seu site no ar", "Conferimos a experiência no celular e os caminhos de contato antes da publicação."],
] as const;

const faqs = [
  ["Quanto custa criar um site?", "O valor depende da quantidade de páginas, conteúdo e funcionalidades. Conte o que precisa pelo WhatsApp para receber uma proposta com escopo e investimento definidos."],
  ["Quanto tempo leva?", "Um site institucional costuma levar cerca de três semanas. O prazo final depende do escopo, do envio dos materiais e das aprovações, e fica definido na proposta."],
  ["Vocês atendem empresas de qualquer cidade?", "Sim. O atendimento e as etapas do projeto podem ser feitos remotamente para empresas de todo o Brasil."],
  ["Já tenho site. Preciso começar do zero?", "Podemos avaliar o site atual e indicar o que vale manter ou refazer. Envie o endereço e explique o que não está funcionando para seu negócio."],
  ["Preciso ter textos, fotos e domínio?", "Envie o que já tiver. Na conversa inicial, identificamos os materiais que faltam e definimos a necessidade de produção de conteúdo, domínio e hospedagem. Esses itens ficam discriminados na proposta."],
  ["O site garante vendas ou primeiro lugar no Google?", "Não. O site ajuda a apresentar sua empresa e facilitar contatos. Vendas também dependem de público, oferta, tráfego e atendimento; posição no Google não é garantida."],
] as const;

export function WebStudio() {
  return (
    <div className={styles.page}>
      <section className={`${styles.section} ${styles.dark} ${styles.grid} ${styles.hero} ${styles.salesHero}`}>
        <div className={styles.heroHead}>
          <span className={`${styles.eyebrow} ${styles.eyebrowGreen}`}>BELIS · Criação de sites para empresas</span>
          <h1 className={`${styles.h} ${styles.hHero} ${styles.salesTitle}`}>
            Um site profissional.<br /><span className={styles.accent}>Um caminho claro até você.</span>
          </h1>
          <p className={styles.lede}>
            Apresente sua empresa, mostre seus serviços e facilite pedidos de orçamento.
            Criamos sites institucionais e landing pages sob medida, com atendimento direto e remoto para todo o Brasil.
          </p>
          <WebNovemberOffer />
          <div className={styles.heroActions}>
            <WebContact placement="hero" className={styles.ctaBtn}>Pedir orçamento no WhatsApp <i aria-hidden="true">↗</i></WebContact>
            <a className={styles.portfolioJump} href="#portfolio">Ver sites que criamos <ArrowDown size={18} aria-hidden="true" /></a>
          </div>
          <p className={styles.contactHint}>Envie seu segmento e o que precisa. Proposta sem compromisso.</p>
        </div>
        <div className={styles.heroFoot}>
          <div className={styles.metaRow}><span>Design sob medida</span><span>Celular e computador</span><span>Prazo definido na proposta</span></div>
        </div>
      </section>

      <WebPortfolio />

      <section className={`${styles.section} ${styles.paper}`} aria-labelledby="web-included">
        <span className={styles.eyebrow}>O que seu projeto pode incluir</span>
        <h2 id="web-included" className={`${styles.h} ${styles.hBig} ${styles.sectionTitle}`}>Bonito para apresentar.<br />Simples para entrar em contato.</h2>
        <p className={styles.lede}>Definimos juntos o que faz sentido para seu negócio. Você aprova o escopo antes de começarmos.</p>
        <div className={`${styles.cards} ${styles.cardsThree}`}>
          {included.map(([title, description]) => <article className={styles.card} key={title}>
            <Check size={22} aria-hidden="true" /><h3 className={styles.cardName}>{title}</h3><p className={styles.cardDesc}>{description}</p>
          </article>)}
        </div>
        <WebContact placement="scope" className={`${styles.ctaBtn} ${styles.sectionCta}`}>Quero um orçamento para minha empresa <i aria-hidden="true">↗</i></WebContact>
      </section>

      <section className={`${styles.section} ${styles.dark}`} aria-labelledby="web-process">
        <span className={styles.eyebrow}>Do primeiro contato à publicação</span>
        <h2 id="web-process" className={`${styles.h} ${styles.hBig} ${styles.sectionTitle}`}>Você sabe o que acontece<br />em cada etapa.</h2>
        <div className={styles.list}>
          {steps.map(([title, description], index) => <article className={styles.row} key={title}>
            <span className={styles.rowIndex}>0{index + 1}</span><div className={styles.rowBody}><h3 className={styles.rowName}>{title}</h3><p className={styles.rowDesc}>{description}</p></div>
          </article>)}
        </div>
      </section>

      <section className={`${styles.section} ${styles.paper2}`} aria-labelledby="web-faq">
        <h2 id="web-faq" className={`${styles.h} ${styles.hMed}`}>Antes de pedir seu orçamento.</h2>
        <div className={styles.faqList}>{faqs.map(([question, answer]) => <details key={question} className={styles.faqItem}>
          <summary>{question}</summary><p>{answer}</p>
        </details>)}</div>
      </section>

      <section className={`${styles.section} ${styles.dark} ${styles.salesClosing}`}>
        <span className={`${styles.eyebrow} ${styles.eyebrowGreen}`}>Vamos falar sobre seu site</span>
        <h2 className={`${styles.h} ${styles.hBig}`}>Sua empresa tem algo<br />bom para mostrar.</h2>
        <p className={styles.lede}>Conte o que você vende e para quem. A partir disso, montamos uma proposta para seu novo site.</p>
        <WebNovemberOffer />
        <WebContact placement="closing" className={styles.ctaBtn}>Pedir minha proposta <i aria-hidden="true">↗</i></WebContact>
      </section>
    </div>
  );
}
