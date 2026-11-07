import type { BlogPost } from "../types";

export const orcamentoEngenharia: BlogPost = {
  slug: "quanto-custa-engenharia-reversa",
  title: "Quanto custa engenharia reversa? Como comparar o orçamento da peça",
  seoTitle: "Quanto custa engenharia reversa? Compare o orçamento",
  description: "Saiba o que muda o preço da engenharia reversa: medição, CAD, protótipo, material e validação. Prepare um briefing e compare propostas com o mesmo escopo.",
  theme: "engenharia-reversa", format: "Guia de compra", primaryKeyword: "engenharia reversa preço",
  status: "published", publishedAt: "2026-11-07", updatedAt: "2026-11-07",
  coverTitle: "O preço começa\npelo escopo.",
  coverImage: "/images/blog/2026/quanto-custa-engenharia-reversa.webp",
  coverAlt: "Capa conceitual com tampa mecânica, desenho sem cotas, paquímetro e amostra sobre bancada clara.",
  coverCaption: "Ilustração gerada por IA; desenho conceitual, sem especificação para fabricação.",
  quickAnswer: "O preço da engenharia reversa depende da informação disponível, da complexidade de reconstrução e das entregas: scan, CAD, protótipo, peça final e verificações. Peça orçamento com desenvolvimento separado da fabricação. Sem avaliar a referência e o uso, uma faixa universal de preço pode comparar serviços diferentes e induzir uma decisão errada.",
  introduction: [
    "Uma proposta cobra pelo escaneamento. Outra inclui reconstrução, dois ajustes de montagem e a peça pronta. O total mais baixo pode ser adequado se você precisa apenas da captura, mas insuficiente se o objetivo é voltar a usar um componente. O problema não é o valor: é comparar escopos que não resolvem a mesma necessidade.",
    "A Belis avalia cada projeto antes de definir condições comerciais. Este guia não apresenta uma tabela de preços. Ele mostra como montar uma solicitação comparável, localizar os itens que mais alteram o custo e evitar pagar duas vezes por uma etapa esquecida.",
  ],
  sections: [
    { id: "blocos-do-orcamento", title: "Separe o orçamento em cinco blocos", blocks: [
      { type: "table", caption: "O que conferir na composição da proposta", columns: ["Etapa", "O que pode entrar", "Pergunta de contratação"], rows: [["Levantamento", "Triagem, medição e captura", "Preciso enviar a peça ou o conjunto?"], ["Reconstrução", "CAD, recuperação e adaptações", "Quais arquivos e revisões recebo?"], ["Protótipo", "Amostra para conferir interfaces", "Quem testa e como devolve o resultado?"], ["Fabricação", "Material, processo e acabamento", "Qual revisão será produzida?"], ["Verificação e entrega", "Inspeções, embalagem e transporte", "Quais critérios e despesas estão incluídos?"]] },
      { type: "paragraph", text: "Nem todo trabalho precisa dos cinco blocos. Quem já possui CAD aprovado pode contratar somente fabricação. Quem pretende produzir com outro fornecedor pode precisar de arquivos, sem peça física. Declare o destino final no pedido, para que a proposta cubra a sequência certa e indique expressamente o que será responsabilidade de outra equipe." },
    ] },
    { id: "complexidade", title: "Por que uma peça pequena pode exigir mais trabalho", blocks: [
      { type: "paragraph", text: "Tamanho não descreve sozinho a dificuldade. Uma presilha pequena pode reunir encaixe flexível, regiões quebradas e pouco espaço para medir. Uma tampa grande pode ter poucos detalhes e referências acessíveis. Na avaliação, quantidade de interfaces, curvas, cavidades e estado da amostra ajudam a estimar o esforço de reconstrução." },
      { type: "paragraph", text: "Também pesa a qualidade da informação inicial. Uma amostra íntegra, fotos da montagem e requisitos definidos reduzem dúvidas. Uma peça ausente exige reconstruir mais hipóteses. Se a referência mudar depois do orçamento, o trabalho pode mudar junto. Registre qual versão, amostra e objetivo serviram de base para a proposta." },
      { type: "callout", title: "Comparação ilustrativa", text: "Uma carcaça apenas para exposição e uma carcaça que precisa fechar contra uma vedação podem ter aparência semelhante. A segunda demanda requisitos funcionais próprios. O orçamento precisa refletir essa diferença, mesmo quando o volume externo é quase igual." },
    ] },
    { id: "scan-preco", title: "Preço de escaneamento 3D não é preço do projeto completo", blocks: [
      { type: "paragraph", text: "Ao pesquisar escaneamento 3D preço, confirme se o valor inclui preparação, captura, alinhamento, tratamento e exportação. Depois pergunte o que acontecerá com os dados. Recuperar uma borda quebrada, corrigir uma região deformada e redesenhar um apoio são decisões de projeto, não apenas operações de captura." },
      { type: "paragraph", text: "Não compre uma entrega que sua equipe não consegue aproveitar. Se você receber uma malha e ainda precisar contratar alguém para produzir o CAD, inclua essa etapa na comparação desde o início. Vale pedir uma proposta única ou propostas separadas com responsabilidades e formatos de passagem claramente definidos." },
      { type: "link", label: "Comparar malha, scan e reconstrução CAD", href: "/blog/escaneamento-3d-ou-modelagem-cad" },
    ] },
    { id: "unidade-e-lote", title: "Separe desenvolvimento e custo de repetição", blocks: [
      { type: "paragraph", text: "O primeiro exemplar pode carregar o trabalho de medir, modelar e testar. Uma reposição posterior da mesma revisão aprovada tem outra composição. Isso não significa que toda unidade adicional ficará automaticamente barata: material, tempo de fabricação, acabamento e inspeção continuam existindo. Pergunte como a proposta trata primeiro exemplar, lote e repetição futura." },
      { type: "paragraph", text: "Para comparar cenários, use uma conta simples: desenvolvimento mais protótipos mais fabricação das unidades planejadas mais despesas de entrega e verificação. Depois divida pelo número real de peças aprovadas que pretende usar. Inclua eventuais mudanças de projeto separadamente, para não confundir repetição com uma nova versão." },
      { type: "paragraph", text: "Evite comprar um lote antes de aprovar as interfaces de uma peça inédita. O custo de corrigir uma revisão inteira pode superar a economia aparente do pedido maior. Um protótipo direcionado a um encaixe específico pode resolver a dúvida com menos material, desde que seu objetivo e suas limitações estejam explícitos." },
    ] },
    { id: "comparar-propostas", title: "Sete perguntas que tornam as propostas comparáveis", blocks: [
      { type: "list", ordered: true, items: ["Qual problema e qual referência física estão cobertos?", "Quais formatos de arquivo serão entregues e em quais condições de uso?", "Quantas revisões estão incluídas e o que caracteriza mudança de escopo?", "Há protótipo? Quem faz o teste de montagem e aprova o retorno?", "Qual material, acabamento e processo foram considerados?", "Como serão verificadas as interfaces e demais condições relevantes?", "O total inclui embalagem, transporte, tributos aplicáveis e despesas externas previstas?"] },
      { type: "paragraph", text: "Prazo precisa ter um marco inicial. Recebimento da peça, aprovação do orçamento, pagamento e confirmação do desenho podem acontecer em datas diferentes. Peça também que o tempo de aprovação do cliente seja distinguido do tempo de produção. Um prazo curto não ajuda se depende de uma amostra que ainda não chegou." },
    ] },
    { id: "reduzir-retrabalho", title: "Como melhorar o briefing antes de pedir preço", blocks: [
      { type: "paragraph", text: "Faça um pacote enxuto: fotos de todos os lados, imagem da montagem, medidas aproximadas, aplicação, quantidade e cidade. Marque nas fotos os pontos que precisam encaixar e o que deve ser alterado. Se tiver desenho, arquivo 3D ou uma segunda peça em bom estado, mencione isso antes de enviar materiais grandes." },
      { type: "paragraph", text: "Descreva o resultado esperado em linguagem de uso. Por exemplo: a tampa deve permitir trocar o filtro sem retirar o suporte. Essa informação vale mais que pedir apenas uma peça resistente. O fornecedor consegue então apontar dúvidas, definir verificações e explicar o que condiciona o orçamento. A negociação passa a tratar de um projeto concreto." },
      { type: "link", label: "Solicitar avaliação do seu projeto na Belis", href: "/engenharia-reversa#projeto" },
    ] },
  ],
  faq: [
    { question: "É possível receber orçamento só com fotos?", answer: "Fotos podem permitir uma triagem e revelar o que falta para cotar. Um valor fechado pode depender de medidas, acesso à peça e definição das entregas. Identifique se a proposta é preliminar ou cobre um escopo já confirmado." },
    { question: "A Belis cobra por grama?", answer: "Engenharia reversa reúne etapas além de fabricação. O orçamento depende do projeto e deve distinguir medição, CAD, protótipo e produção quando aplicáveis. Preço por massa não descreve sozinho esse serviço." },
    { question: "Comprar mais unidades elimina o custo de desenvolvimento?", answer: "Não. O desenvolvimento continua existindo, embora possa ser distribuído pelas unidades do pedido. O custo de repetir uma revisão aprovada e o de desenvolver outra precisam ser separados." },
  ],
  sources: [{ title: "Formlabs — Guide to Reverse Engineering", url: "https://formlabs.com/global/blog/reverse-engineering/", note: "Apoia a distinção entre etapas técnicas. A matriz de contratação é editorial da Belis e não reproduz preços do fabricante." }],
  relatedSlugs: ["pecas-fora-de-linha-engenharia-reversa", "materiais-impressao-3d-pecas-funcionais"],
  cta: { heading: "Vamos definir o escopo da sua peça?", text: "Envie aplicação, fotos e quantidade para começar uma avaliação com entregas claras.", label: "Pedir avaliação e orçamento", message: "Olá, Belis! Quero orçamento de engenharia reversa. Peça/aplicação: __. Referências disponíveis: __. Quantidade: __. Entrega desejada (CAD, protótipo ou peça): __. Cidade: __." },
  download: { label: "Baixar matriz para comparar orçamentos", filename: "comparativo-orcamento-engenharia-reversa.txt", title: "Comparação de propostas de engenharia reversa", items: ["Referência e objetivo incluídos", "Medição e captura", "CAD, formatos e condições de uso", "Protótipos e revisões", "Material, processo e acabamento", "Critérios de aceite e responsável", "Custos de desenvolvimento e repetição", "Logística, prazo e início da contagem"] },
};
