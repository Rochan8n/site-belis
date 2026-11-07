import type { BlogPost } from "../types";

export const pecasForaDeLinha: BlogPost = {
  slug: "pecas-fora-de-linha-engenharia-reversa",
  title: "Peça fora de linha: quando a engenharia reversa vale a pena?",
  seoTitle: "Peça fora de linha: quando usar engenharia reversa?",
  description: "Peça quebrada ou sem fornecedor? Entenda quando a engenharia reversa faz sentido, o que enviar para avaliação e como validar uma reposição sob medida.",
  theme: "engenharia-reversa", format: "Guia de compra", primaryKeyword: "engenharia reversa de peças",
  status: "published", publishedAt: "2026-11-07", updatedAt: "2026-11-07",
  coverTitle: "A peça saiu de linha.\nO projeto pode continuar.",
  coverImage: "/images/blog/2026/pecas-fora-de-linha-engenharia-reversa.webp",
  coverAlt: "Conceito de um difusor automotivo danificado ao lado de uma nova versão, sobre bancada com paquímetro.",
  coverCaption: "Ilustração gerada por IA: cenário de reconstrução de peça, sem representar trabalho entregue pela Belis.",
  quickAnswer: "A engenharia reversa merece avaliação quando a peça não está disponível, há uma referência recuperável e o custo de desenvolver e validar a reposição faz sentido. O trabalho pode incluir medição, reconstrução CAD, protótipo e fabricação. A decisão depende da função, do ambiente e do risco de falha; copiar a aparência não comprova que a peça funciona.",
  introduction: [
    "Uma tampa trincada pode impedir o fechamento de uma máquina. Uma moldura ausente pode deixar a restauração de um carro incompleta. Em ambos os casos, buscar o código original continua sendo um bom primeiro passo. Mas, quando o fornecedor encerrou a linha ou só vende um conjunto inteiro, desenvolver a peça passa a ser uma alternativa a comparar.",
    "O ponto de partida não é escolher uma impressora. É entender o que precisa voltar a funcionar e quais evidências existem para reconstruir o componente. Este guia ajuda a separar um projeto viável de uma cópia que parece correta, mas gera outro problema na montagem.",
  ],
  sections: [
    { id: "repor-ou-reconstruir", title: "Antes de reconstruir, compare três caminhos", blocks: [
      { type: "paragraph", text: "Comprar uma peça original disponível costuma reduzir a incerteza sobre geometria e aplicação, embora estado de conservação e procedência ainda precisem ser conferidos. Reparar a peça existente pode preservar detalhes difíceis de reproduzir. Desenvolver uma nova versão oferece liberdade de adaptação, mas acrescenta etapas de projeto e teste. Nenhuma dessas opções vence em todos os cenários." },
      { type: "table", caption: "Como comparar alternativas para uma peça indisponível", columns: ["Caminho", "Quando investigar", "O que conferir"], rows: [["Original ou equivalente", "Existe oferta compatível", "Código, estado, prazo e montagem"], ["Reparo", "Dano localizado e material recuperável", "Causa da falha e durabilidade do reparo"], ["Engenharia reversa", "Sem oferta adequada ou necessidade de adaptação", "Referências, desenvolvimento, fabricação e validação"]] },
      { type: "paragraph", text: "Inclua na comparação o tempo gasto com tentativas. Comprar três peças parecidas sem confirmar as interfaces pode custar mais que medir corretamente uma vez. Por outro lado, modelar um item barato e disponível pode ser um investimento desnecessário. Peça que cada alternativa seja comparada pelo conjunto de despesas e pelo risco de retrabalho." },
    ] },
    { id: "referencia-disponivel", title: "O que fazer se a peça estiver quebrada ou incompleta", blocks: [
      { type: "paragraph", text: "Guarde os fragmentos e registre o conjunto antes da desmontagem. A posição de uma aba quebrada, a marca deixada por um parafuso e a peça vizinha podem explicar como o componente era fixado. Não lixe, cole ou corte a referência sem combinar com quem fará a avaliação: essas intervenções podem apagar informações úteis." },
      { type: "paragraph", text: "Uma região ausente exige uma hipótese de reconstrução. Ela pode ser apoiada por outra unidade, uma peça simétrica, desenhos ou medidas do alojamento. Simetria precisa ser conferida; lados direito e esquerdo podem ter fixações diferentes. Fotos ajudam na triagem, mas não substituem automaticamente medidas confiáveis para encaixes." },
      { type: "callout", title: "Exemplo ilustrativo: a tampa que não fecha", text: "Uma tampa pode parecer deformada quando o problema real é uma dobradiça desalinhada. Avaliar somente a tampa repete a falha. Envie imagens do conjunto aberto, fechado e dos pontos de apoio, além da peça isolada." },
    ] },
    { id: "processo", title: "Da referência ao primeiro teste de montagem", blocks: [
      { type: "list", ordered: true, items: ["Triagem: identificar função, tamanho, estado, quantidade e ambiente de uso.", "Medição: escolher escaneamento, instrumentos dimensionais ou combinação dos métodos.", "Reconstrução: definir superfícies, espessuras, encaixes e regiões a recuperar no CAD.", "Protótipo: testar as interfaces antes de investir no acabamento ou no lote.", "Validação: registrar montagem e ensaios adequados à aplicação, com critérios de aceite.", "Produção: fabricar a revisão aprovada e manter identificação para pedidos futuros."] },
      { type: "paragraph", text: "O escaneamento registra a superfície disponível. Se a peça está desgastada, o desgaste também pode aparecer na captura. A reconstrução precisa distinguir o que pertence ao projeto do que surgiu com o uso. Para aprofundar a diferença entre as entregas, consulte o comparativo de scan e CAD." },
      { type: "link", label: "Escaneamento 3D ou modelagem CAD: qual entrega contratar?", href: "/blog/escaneamento-3d-ou-modelagem-cad" },
    ] },
    { id: "viabilidade", title: "A conta inclui desenvolvimento, não só material", blocks: [
      { type: "paragraph", text: "Uma peça pequena pode exigir várias horas de medição e ajustes. Uma peça maior e geometricamente simples pode demandar menos reconstrução, mas mais fabricação. Por isso, preço por grama não compara projetos de engenharia reversa. Separe o investimento inicial em desenho e testes do custo de repetir uma peça aprovada." },
      { type: "paragraph", text: "Para uma única unidade, compare o total com reparo, original ou substituição do conjunto. Para compras recorrentes, pergunte sobre reposições, guarda dos arquivos e controle de versão. Não divida um custo de desenvolvimento por um lote imaginário: use a quantidade que sua operação realmente tem intenção de adquirir." },
      { type: "paragraph", text: "O processo de fabricação também precisa ser escolhido depois de entender a aplicação. Impressão 3D pode ser adequada a protótipos e certas peças finais; outras situações pedem usinagem, outro processo ou a manutenção da solução original. A proposta deve deixar claro qual etapa a Belis assume e quais verificações ficam com o contratante." },
    ] },
    { id: "criterios-de-aceite", title: "Defina como a reposição será aprovada", blocks: [
      { type: "paragraph", text: "Escreva o que será observado: encaixe sem forçar, alinhamento, passagem de cabos, acesso de ferramenta, abertura e fechamento ou aparência. Um teste de montagem confirma aspectos geométricos. Resistência, vida útil, vedação e comportamento térmico exigem avaliações próprias quando relevantes. A aprovação de uma foto não cobre todas essas condições." },
      { type: "paragraph", text: "Componentes de freio, direção, retenção de ocupantes e outras funções críticas não devem ser tratados como reposições diretas obtidas por impressão. Informe a função real desde o primeiro contato. Uma avaliação pode concluir que o projeto exige engenharia especializada, ensaios específicos ou que não cabe no escopo do serviço." },
    ] },
    { id: "enviar-avaliacao", title: "O que enviar para a Belis avaliar sua peça", blocks: [
      { type: "list", items: ["Fotos da peça inteira, do dano e do local onde ela trabalha.", "Medidas aproximadas e código, modelo ou aplicação conhecida.", "Descrição do que a peça faz e de como ela falhou.", "Calor, carga, vibração, líquidos e exposição ao sol, quando existirem.", "Quantidade, cidade e necessidade de arquivo, protótipo ou peça final.", "Disponibilidade da referência física e de acesso ao conjunto para testar."] },
      { type: "paragraph", text: "Com esse material, a conversa começa pela viabilidade e pelo escopo. Se você ainda não sabe o material original, diga isso. Uma lacuna identificada é mais útil que uma suposição apresentada como certeza. O próximo passo é definir o que precisa ser medido e qual entrega resolverá o problema." },
      { type: "link", label: "Conhecer o serviço de engenharia reversa da Belis", href: "/engenharia-reversa" },
    ] },
  ],
  faq: [
    { question: "Dá para refazer uma peça sem o original inteiro?", answer: "Pode ser possível, dependendo dos fragmentos, das peças vizinhas e de outras referências. Regiões ausentes precisam ser reconstruídas e conferidas. A viabilidade só fica clara após avaliar o material disponível." },
    { question: "Toda peça reconstruída pode ser impressa em 3D?", answer: "Não. Geometria, material, esforços e ambiente determinam o processo. A solução pode exigir outra fabricação ou não ser adequada ao escopo oferecido." },
    { question: "O orçamento inclui os arquivos CAD?", answer: "Isso deve constar da proposta. Malha de escaneamento, modelo CAD, desenho e peça física são entregas diferentes. Confirme formatos, revisões e condições de uso antes de contratar." },
  ],
  sources: [{ title: "Formlabs — Guide to Reverse Engineering", url: "https://formlabs.com/global/blog/reverse-engineering/", note: "Referência para o fluxo entre peça física, reconstrução digital e prototipagem. Casos do fabricante não são resultados da Belis." }],
  relatedSlugs: ["escaneamento-3d-ou-modelagem-cad", "quanto-custa-engenharia-reversa"],
  cta: { heading: "Sua peça saiu de linha?", text: "Envie fotos, medidas aproximadas e aplicação. A Belis avalia o caminho para reconstruir sua referência.", label: "Avaliar minha peça", message: "Olá, Belis! Tenho uma peça fora de linha e quero avaliar engenharia reversa. Aplicação: __. Medidas aproximadas: __. Quantidade: __. Cidade: __. Vou anexar fotos da peça e da montagem." },
  download: { label: "Baixar checklist de avaliação da peça", filename: "checklist-peca-fora-de-linha.txt", title: "Avaliação de peça fora de linha", items: ["Aplicação, modelo e código conhecido", "Função e descrição do dano", "Fotos da peça e do conjunto", "Dimensões aproximadas", "Temperatura, carga, líquidos e exposição", "Quantidade e cidade", "Referência física disponível", "Entrega desejada e critério de aprovação"] },
};
