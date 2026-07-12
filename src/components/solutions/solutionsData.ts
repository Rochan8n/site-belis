export type SolutionItem = {
  readonly name: string;
  readonly description: string;
};

export type ProcessStep = SolutionItem & {
  readonly index: string;
};

export const webItems = [
  {
    name: "Landing pages de alta conversão",
    description:
      "Uma mensagem clara, um próximo passo evidente. Estrutura, copy e velocidade para transformar interesse em conversa.",
  },
  {
    name: "Sites institucionais / brand sites",
    description:
      "Uma presença digital capaz de transmitir, em segundos, a qualidade que sua empresa levou anos para construir.",
  },
  {
    name: "Ecossistemas digitais",
    description:
      "Páginas, conteúdo e integrações trabalhando juntos para atrair, explicar e converter.",
  },
] as const satisfies readonly SolutionItem[];

export const sysItems = [
  {
    name: "Micro-SaaS / MVPs",
    description:
      "Transforme uma boa ideia em produto utilizável, valide com clientes reais e invista com mais segurança.",
  },
  {
    name: "SaaS completo",
    description:
      "Produto digital preparado para receber clientes, cobrar, organizar dados e evoluir sem perder controle.",
  },
  {
    name: "ERP & sistemas internos",
    description: "Processos organizados ao redor da sua operação, sem adaptar sua empresa a um software genérico.",
  },
  {
    name: "Portais do cliente",
    description: "Mais autonomia para o cliente, menos tarefas repetitivas para sua equipe.",
  },
  {
    name: "Dashboards & automações",
    description: "Decisões mais rápidas, menos trabalho manual e uma visão clara do que acontece na operação.",
  },
  {
    name: "Integrações",
    description: "CRM, WhatsApp, pagamentos e outras ferramentas conectadas em um fluxo confiável.",
  },
] as const satisfies readonly SolutionItem[];

export const webAudiences = [
  {
    name: "Empresas cuja presença ficou para trás",
    description:
      "A operação evoluiu, mas o site ainda transmite uma versão antiga do negócio.",
  },
  {
    name: "Marcas que recebem visitas, mas poucos contatos",
    description:
      "Quando a proposta não fica clara e o próximo passo exige esforço, bons clientes vão embora.",
  },
  {
    name: "Lançamentos e campanhas",
    description:
      "Uma página focada na oferta, alinhada à campanha e preparada para medir cada oportunidade.",
  },
] as const satisfies readonly SolutionItem[];

export const systemAudiences = [
  {
    name: "Empresas crescendo além dos próprios processos",
    description:
      "Quando vender mais também significa criar mais planilhas, mensagens e retrabalho, a operação precisa evoluir.",
  },
  {
    name: "Negócios presos em planilhas",
    description:
      "Um sistema interno reúne informações, reduz erros e devolve tempo para sua equipe cuidar do que importa.",
  },
  {
    name: "Fundadores com uma ideia de produto",
    description:
      "Da ideia ao primeiro produto funcional, com escopo claro para aprender rápido e crescer com segurança.",
  },
] as const satisfies readonly SolutionItem[];

export const processSteps = [
  {
    index: "01",
    name: "Entendimento",
    description:
      "Começamos pelo negócio, pelo cliente e pelo resultado esperado. Tecnologia entra depois da clareza.",
  },
  {
    index: "02",
    name: "Direção",
    description:
      "Organizamos conteúdo, fluxo e solução em um protótipo que você consegue avaliar antes da construção.",
  },
  {
    index: "03",
    name: "Construção",
    description:
      "Entregas visíveis, decisões compartilhadas e comunicação direta durante todo o projeto.",
  },
  {
    index: "04",
    name: "Evolução",
    description:
      "Publicamos, acompanhamos e evoluímos. Um ativo digital começa a provar valor quando encontra o mercado.",
  },
] as const satisfies readonly ProcessStep[];

export const qualityItems = [
  {
    name: "Velocidade que protege oportunidades",
    description:
      "Carregamento rápido para reduzir abandono e criar uma experiência confiável desde o primeiro acesso.",
  },
  {
    name: "Experiência pensada para o celular",
    description: "Sua empresa precisa causar uma boa impressão na tela que o cliente mais usa.",
  },
  {
    name: "Base pronta para evoluir",
    description:
      "Tecnologia manutenível para adicionar novas etapas sem reconstruir tudo a cada mudança.",
  },
  {
    name: "Segurança e dados",
    description:
      "Acessos, permissões e backups fazem parte da fundação de cada sistema.",
  },
] as const satisfies readonly SolutionItem[];

export const STACK_LINE =
  "Tecnologia escolhida para cada desafio · Next.js · React · Node · PostgreSQL · integrações via API";

export const WEB_HERO_SUBCOPY =
  "Seu cliente decide em segundos se vale a pena continuar. Criamos sites que tornam sua qualidade visível, explicam seu valor e conduzem a próxima conversa.";

export const SYS_HERO_SUBCOPY =
  "Se cada novo cliente cria mais trabalho manual, sua operação ainda não está pronta para escalar. Criamos software sob medida para devolver controle e capacidade de crescimento.";

export const WEB_CTA_HEADING = "Seu site pode começar a trabalhar pela sua próxima venda.";
export const SYS_CTA_HEADING = "Sua empresa pode crescer sem multiplicar o caos.";

export const WEB_CTA_LABEL = "Quero melhorar minha presença";
export const SYS_CTA_LABEL = "Quero destravar minha operação";
export const HERO_CTA_LABEL = "Quero conversar sobre meu projeto";

const wa = (text: string) =>
  `https://wa.me/5511973138895?text=${encodeURIComponent(text)}`;

export const WEB_WHATSAPP_HREF = wa(
  "Olá! Meu site não representa mais a empresa que construí. Quero conversar sobre uma nova presença digital com a Belis.",
);
export const SYS_WHATSAPP_HREF = wa(
  "Olá! Quero eliminar gargalos da minha operação e entender como um sistema sob medida pode ajudar.",
);

export const INSTAGRAM_HREF = "https://www.instagram.com/belisvideo/";
export const EMAIL_HREF = "mailto:Lucas@belis.agency";
