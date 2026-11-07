import type { BlogPost } from "../types";

export const materiaisFuncionais: BlogPost = {
  slug: "materiais-impressao-3d-pecas-funcionais",
  title: "Materiais para impressão 3D de peças funcionais: como escolher sem adivinhar",
  seoTitle: "Materiais para impressão 3D de peças funcionais",
  description: "Compare critérios para escolher PETG, ASA e nylon com fibra de carbono. Entenda calor, umidade, carga e testes antes de encomendar uma peça funcional.",
  theme: "engenharia-reversa", format: "Comparativo", primaryKeyword: "materiais impressão 3d peças funcionais",
  status: "published", publishedAt: "2026-11-07", updatedAt: "2026-11-07",
  coverTitle: "Material certo.\nAplicação definida.",
  coverImage: "/images/blog/2026/materiais-impressao-3d-pecas-funcionais.webp",
  coverAlt: "Ilustração de quatro suportes com diferentes cores e texturas de polímeros sobre bases claras.",
  coverCaption: "Imagem gerada por IA para ilustrar materiais; aparência não identifica formulação nem comprova resistência.",
  quickAnswer: "Escolha o material pela combinação de esforço, temperatura, ambiente, precisão e acabamento. PETG, ASA e nylon com fibra de carbono são famílias com formulações diferentes, não níveis universais de qualidade. Peça a identificação do material e um plano de validação proporcional à aplicação. Uma propriedade da ficha técnica não é garantia da peça acabada.",
  introduction: [
    "Qual é o plástico mais resistente? A pergunta fica incompleta sem dizer resistente a quê. Um suporte pode precisar manter posição sob carga, enquanto uma trava precisa flexionar. Uma carcaça pode enfrentar sol e chuva; outra pode ficar perto de uma fonte de calor. Escolher o mesmo material para todas elas ignora o trabalho que cada peça faz.",
    "A decisão também envolve geometria e fabricação. A Belis avalia materiais conforme o projeto e a disponibilidade definida na proposta. Este guia organiza as perguntas para conversar sobre uma peça funcional sem confundir nomes comerciais, números de catálogo e condições reais de uso.",
  ],
  sections: [
    { id: "condicoes-de-uso", title: "Descreva o uso antes de escolher o polímero", blocks: [
      { type: "list", items: ["Carga: onde atua, em que direção e por quanto tempo?", "Movimento: há impacto, vibração, flexão repetida ou atrito?", "Temperatura: qual é a condição normal e qual é o pico?", "Ambiente: sol, água, umidade, poeira ou produtos químicos?", "Montagem: parafusos, insertos, encaixes, apoio e regiões finas?", "Resultado: quais dimensões e funções precisam permanecer estáveis?"] },
      { type: "paragraph", text: "Quando você não tem um valor medido, descreva a situação e indique a incerteza. Perto do motor, por exemplo, é uma informação inicial, mas não substitui a temperatura na posição da peça. Separar dados conhecidos de hipóteses ajuda a definir quais verificações são necessárias antes de selecionar o material." },
    ] },
    { id: "familias", title: "PETG, ASA e nylon com fibra: como comparar", blocks: [
      { type: "table", caption: "Perguntas para avaliar famílias de materiais", columns: ["Família", "Motivo para investigar", "O que não presumir"], rows: [["PETG", "Peças e carcaças em condições compatíveis com a formulação", "Resistência irrestrita a calor ou químicos"], ["ASA", "Aplicações com exposição externa e UV", "Que todo projeto externo dispensa ensaios e boa fixação"], ["Nylon sem carga", "Aplicações que demandam características específicas da poliamida", "Que todas as formulações têm o mesmo comportamento"], ["Nylon com fibra de carbono", "Rigidez e estabilidade conforme ficha do composto", "Que rigidez significa flexibilidade ou resistência a qualquer impacto"]] },
      { type: "paragraph", text: "A documentação da Prusa apresenta o ASA como material voltado também a aplicações externas pela resistência a UV e temperatura. Isso justifica investigá-lo nesse cenário, não aprovar automaticamente um letreiro ou componente automotivo. Cor, formulação, desenho e condição de exposição precisam ser considerados no produto final." },
      { type: "paragraph", text: "A expressão nylon com fibra de carbono também abrange diferentes bases e teores de carga. Não compare duas propostas apenas pela sigla CF. Solicite o nome da formulação e a ficha técnica usada na seleção. Se o fornecedor substituir o material, a alteração deve ser comunicada e avaliada antes de fabricar." },
    ] },
    { id: "temperatura", title: "HDT não é temperatura de uso contínuo", blocks: [
      { type: "paragraph", text: "Temperatura de deflexão térmica, ou HDT, corresponde a um ensaio sob condições especificadas. Ela não autoriza concluir que qualquer peça daquele material pode trabalhar continuamente na mesma temperatura, sob qualquer carga. Tempo, geometria e método de fabricação mudam a pergunta de engenharia que precisa ser respondida." },
      { type: "paragraph", text: "As referências da Polymaker diferenciam compostos e condições de aplicação. Ao avaliar uma peça quente, peça que o requisito seja descrito como uso contínuo, pico, duração e esforço associado. Evite aprovar um material com base em um único número destacado numa página comercial." },
      { type: "callout", title: "Exemplo ilustrativo: tampa e suporte no mesmo ambiente", text: "Uma tampa sem carga e um suporte apertado por parafusos podem compartilhar a temperatura, mas não o mesmo requisito. O suporte precisa manter a função enquanto está solicitado. A aprovação da tampa não valida automaticamente o suporte." },
    ] },
    { id: "umidade-quimicos", title: "Umidade e contato químico precisam entrar no briefing", blocks: [
      { type: "paragraph", text: "O fabricante do PolyMide PA6-CF identifica o material como higroscópico e relaciona a umidade à qualidade e às propriedades das impressões. Essa característica torna relevante saber como o material é preparado e em que condição a peça será avaliada. Não trate a condição seca da ficha e o uso em ambiente úmido como situações automaticamente equivalentes." },
      { type: "paragraph", text: "Para contato químico, informe o produto, a concentração quando conhecida, a temperatura e a duração. Um respingo eventual e uma imersão contínua são cenários distintos. Não use resistência a um produto como prova de compatibilidade com toda uma família de solventes, óleos ou combustíveis. Peças que dependem dessa compatibilidade precisam de evidência específica." },
    ] },
    { id: "projeto-processo", title: "O desenho e a orientação também fazem parte da escolha", blocks: [
      { type: "paragraph", text: "A peça funciona como um conjunto. Regiões estreitas, cantos, fixações e contato com componentes metálicos podem concentrar esforços. Antes de trocar para um material mais caro, verifique se o desenho atende à função. Às vezes, mudar a distribuição de apoio ou uma interface é uma questão mais importante que escolher outra cor ou outra sigla." },
      { type: "paragraph", text: "Registre o processo e a orientação de fabricação da revisão aprovada. Alterações relevantes podem mudar o comportamento da peça e precisam ser consideradas na repetição de um lote. Peça também que acabamento e pós-processamento estejam definidos, sobretudo quando interferem em encaixes ou superfícies funcionais." },
      { type: "link", label: "Como preparar um projeto de engenharia reversa", href: "/blog/pecas-fora-de-linha-engenharia-reversa" },
    ] },
    { id: "validar", title: "Transforme a escolha em um plano de validação", blocks: [
      { type: "paragraph", text: "Defina uma sequência: verificar dimensões e montagem, testar a função e avaliar as condições ambientais relevantes. Os testes devem representar o uso pretendido e ter critérios de aprovação. Uma peça que encaixa na bancada ainda pode não atender ao esforço ou à exposição durante a operação." },
      { type: "paragraph", text: "Documente o que foi testado e o que permanece desconhecido. Se a aplicação for crítica, o escopo pode exigir profissionais e ensaios específicos. Para iniciar com a Belis, envie a função da peça, fotos, dimensões, quantidade e condições de trabalho. O objetivo é selecionar uma solução justificável para aquele caso, não declarar um polímero vencedor em todas as situações." },
      { type: "link", label: "Conversar sobre material e aplicação da sua peça", href: "/engenharia-reversa#projeto" },
    ] },
  ],
  faq: [
    { question: "Nylon com fibra de carbono sempre é melhor?", answer: "Não. O composto precisa atender à função, e maior rigidez não resolve toda necessidade de impacto, flexão, acabamento ou ambiente. Compare formulações e requisitos, não apenas o nome da família." },
    { question: "Um material com HDT alta pode trabalhar nessa temperatura sempre?", answer: "Não se pode concluir isso apenas pela HDT. O ensaio tem condições específicas. Uso contínuo, tempo, carga e geometria precisam ser avaliados para a peça real." },
    { question: "Posso aprovar só um teste de encaixe?", answer: "Ele pode ser suficiente para uma dúvida geométrica, mas não valida automaticamente resistência, vedação, durabilidade ou comportamento térmico. Cada requisito precisa de verificação correspondente." },
  ],
  sources: [
    { title: "Prusa — ASA", url: "https://help.prusa3d.com/article/asa_1809", note: "Referência sobre uso externo e características gerais do ASA; não qualifica uma peça específica." },
    { title: "Polymaker — Custom Tooling", url: "https://wiki.polymaker.com/the-basics/applications/custom-tooling", note: "Exemplos de seleção de compostos para ferramentas. Não se adotam promessas gerais de economia ou temperatura para a Belis." },
    { title: "Polymaker — PolyMide PA6-CF, informações de produto", url: "https://polymaker.com/wp-content/tech-docs/PolyMide_PA6-CF_PIS_EN_V1.5.pdf", note: "Documenta higroscopicidade e cuidados de processamento dessa formulação específica." },
  ],
  relatedSlugs: ["pecas-carros-antigos-impressao-3d", "gabaritos-dispositivos-impressao-3d"],
  cta: { heading: "Qual condição sua peça precisa suportar?", text: "Descreva função, carga, calor e exposição. Vamos avaliar material e projeto juntos.", label: "Avaliar minha aplicação", message: "Olá, Belis! Quero avaliar material para uma peça funcional. Função: __. Carga/movimento: __. Temperatura conhecida: __. Exposição a líquidos/sol: __. Quantidade e cidade: __." },
  download: { label: "Baixar ficha de condições de uso", filename: "ficha-material-peca-funcional.txt", title: "Condições de uso da peça funcional", items: ["Função e consequência de falha", "Carga, direção e duração", "Temperatura contínua e picos", "Sol, umidade e produtos de contato", "Fixações e interfaces", "Formulação e ficha técnica propostas", "Processo e revisão", "Critérios de validação e dados ainda desconhecidos"] },
};
