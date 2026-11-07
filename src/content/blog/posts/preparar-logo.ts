import type { BlogPost } from "../types";

export const prepararLogo: BlogPost = {
  slug: "como-preparar-logo-letreiro-3d",
  title: "Como preparar seu logo para um letreiro 3D: arquivos, medidas e aprovação",
  seoTitle: "Como preparar seu logo para um letreiro 3D",
  description: "Saiba quais arquivos e medidas enviar para transformar seu logo em letreiro 3D. Organize vetor, cores, parede e aprovação antes de começar a fabricação.",
  theme: "comunicacao-visual", format: "Checklist", primaryKeyword: "logo em vetor para letreiro",
  status: "published", publishedAt: "2026-11-07", updatedAt: "2026-11-07",
  coverTitle: "Do arquivo\npara o espaço.",
  coverImage: "/images/blog/2026/como-preparar-logo-letreiro-3d.webp",
  coverAlt: "Ilustração de um símbolo B plano em um cartão ao lado do mesmo símbolo verde em relevo.",
  coverCaption: "Imagem conceitual gerada por IA: passagem da identidade gráfica para um objeto físico.",
  quickAnswer: "Envie o logo em vetor quando disponível, uma imagem de referência, dimensões desejadas e fotos do local. Confirme texto, proporções, cores e eventuais adaptações antes de fabricar. Um PDF pode conter apenas uma imagem, e trocar a extensão de um PNG não cria um vetor. Se só tiver imagem, comece a avaliação com ela e esclareça a preparação necessária.",
  introduction: [
    "Você tem o logo salvo no celular, mas o fornecedor pede o arquivo original. Isso não precisa interromper o projeto. O primeiro passo é descobrir o que existe e qual parte ainda precisa ser preparada. Uma conversa clara nessa fase reduz alterações de fonte, proporção e medidas depois da aprovação.",
    "Transformar identidade gráfica em objeto envolve mais que dar espessura ao desenho. O letreiro terá frente, lateral, fixação e, em alguns casos, iluminação. Este checklist ajuda a reunir arquivos e informações para que a proposta considere essa passagem do digital para o físico.",
  ],
  sections: [
    { id: "vetor", title: "Vetor e imagem: por que a diferença importa", blocks: [
      { type: "paragraph", text: "Uma imagem raster, como JPEG ou PNG, é formada por pixels. Um desenho vetorial descreve formas e curvas. Para um logo que será adaptado de tamanho e preparado para fabricação, contornos vetoriais podem fornecer uma base mais adequada. A documentação da Adobe explica essa diferença e o comportamento ao ampliar os arquivos." },
      { type: "paragraph", text: "Formatos como SVG, AI e EPS são comuns em fluxos de identidade visual. PDF também pode ser útil, mas a extensão não garante que o conteúdo seja vetorial. Um PDF com uma fotografia do cartão continua sendo uma imagem. Renomear o arquivo não altera essa característica." },
      { type: "table", caption: "O que você tem e como começar", columns: ["Material disponível", "Próximo passo", "Cuidado"], rows: [["Arquivo vetorial original", "Enviar junto com referência visual", "Confirmar versão correta e fontes"], ["PDF da identidade", "Pedir verificação do conteúdo", "Pode conter imagens e vetores juntos"], ["PNG ou JPEG em boa qualidade", "Usar na triagem e avaliar reconstrução", "Não presumir que está pronto para fabricar"], ["Foto de placa ou cartão", "Buscar original com o designer", "Perspectiva e baixa definição podem alterar formas"]] },
    ] },
    { id: "arquivo-certo", title: "Escolha a versão correta da marca", blocks: [
      { type: "paragraph", text: "Muitas empresas têm assinatura horizontal, vertical, símbolo isolado e versões com slogan. Envie a opção desejada e diga se aceita avaliar outra composição. Misturar partes de versões diferentes pode mudar proporções e espaçamento sem que isso fique evidente em uma conversa por mensagens." },
      { type: "paragraph", text: "Confira texto, acentos, caixa alta e baixa e informação secundária. Se o arquivo depende de uma fonte, peça ao responsável pela identidade uma versão com contornos ou as orientações adequadas de entrega. Inclua uma imagem de referência do resultado correto para facilitar a conferência visual quando o arquivo for aberto." },
      { type: "paragraph", text: "Se houver manual de marca, envie as páginas relevantes: cores, proporções, margens e versões permitidas. Você não precisa mandar um acervo inteiro para iniciar a avaliação. Um conjunto pequeno e identificado costuma ser mais útil que várias pastas sem indicação de qual arquivo está aprovado." },
    ] },
    { id: "adaptacao", title: "Detalhes do logo podem precisar de ajuste no objeto", blocks: [
      { type: "paragraph", text: "Traços finos, recortes estreitos, pequenos elementos separados e curvas complexas precisam ser avaliados na dimensão final. Uma adaptação pode ser necessária para construção, montagem ou iluminação. Isso deve aparecer na proposta e na prévia, com indicação do que mudou, antes de a peça entrar em produção." },
      { type: "paragraph", text: "Não aprove uma simplificação apenas porque ela facilitou o processo. Compare com a identidade e observe se o reconhecimento foi preservado. Às vezes, mudar escala ou construção atende melhor que modificar o símbolo. Quando houver um designer responsável pela marca, inclua-o nessa decisão." },
      { type: "callout", title: "Exemplo ilustrativo: assinatura com slogan", text: "O nome pode funcionar em relevo enquanto o texto menor exige outra solução ou precisa sair da composição. Tratar todos os elementos como letras iguais pode prejudicar leitura e montagem. Aprove a hierarquia do conjunto, não cada parte isolada." },
    ] },
    { id: "medidas", title: "Informe medidas do conjunto e do espaço", blocks: [
      { type: "paragraph", text: "Diga se a medida corresponde à largura do logo inteiro ou a uma letra. Inclua a área disponível, altura desejada e elementos próximos. Evite pedir um logo de determinado tamanho sem unidade ou sem explicar qual direção foi medida. Registre também margens que precisam permanecer livres." },
      { type: "paragraph", text: "Uma foto com medida de referência ajuda a montar uma prévia proporcional. Fotos inclinadas e lentes muito abertas podem distorcer a percepção. Para decisões finais de montagem, combine quem confirma as dimensões no local. A imagem serve para orientar composição, mas não substitui toda medição necessária." },
      { type: "link", label: "Planejar tamanho e posição do logo na recepção", href: "/blog/logotipo-3d-parede-recepcao" },
    ] },
    { id: "cores-efeitos", title: "Separe cor, material e efeito de luz", blocks: [
      { type: "paragraph", text: "Informe a cor de referência, o brilho desejado e se haverá diferença entre frente e lateral. Um tom metálico na imagem não define automaticamente um material metálico. Se a proposta usar uma aparência aproximada, isso precisa ficar claro. Para exigência de cor precisa, combine amostra e condição de aprovação." },
      { type: "paragraph", text: "Se houver iluminação, envie referência e explique se deseja luz na frente, atrás ou em outra região. A aparência acesa pode diferir da apagada. A equipe precisa avaliar espaço e construção para o efeito. Escolher uma opção no personalizador comunica preferência, mas ainda não produz um arquivo aprovado para fabricar." },
      { type: "link", label: "Comparar materiais e construções de letra caixa", href: "/blog/letra-caixa-3d-ou-acrilico" },
    ] },
    { id: "aprovar", title: "Use uma aprovação única e identificada", blocks: [
      { type: "list", ordered: true, items: ["Confirme o texto e a versão do logo.", "Confira largura, altura, profundidade e posição previstas.", "Revise todas as adaptações de forma e espaçamento.", "Aprove material, cor, textura e efeito de luz conforme a proposta.", "Confirme superfície, fixação e responsabilidades de montagem.", "Registre qual arquivo ou revisão está aprovado e a data da decisão."] },
      { type: "paragraph", text: "Depois de aprovar, envie qualquer mudança como uma revisão explícita. Uma nova imagem solta no meio da conversa pode gerar dúvida sobre o que deve ser produzido. Se houver prazo de inauguração, inclua o tempo de conferir e aprovar no cronograma. Produção e decisão do cliente são etapas diferentes." },
      { type: "paragraph", text: "Para começar com a Belis, mande o arquivo disponível, foto do local, medida aproximada e cidade. Se faltarem informações, identifique as lacunas. A avaliação pode então separar preparação da arte, projeto da peça e fabricação, com próximos passos concretos para transformar sua marca em um objeto." },
      { type: "link", label: "Enviar sua ideia de letreiro para a Belis", href: "/comunicacao-visual" },
    ] },
  ],
  faq: [
    { question: "Só tenho o logo em PNG. Posso pedir orçamento?", answer: "Sim, ele pode servir para começar a avaliação. A equipe deve verificar qualidade e necessidade de reconstruir contornos. Confirme se a preparação do arquivo está incluída na proposta." },
    { question: "PDF sempre é vetor?", answer: "Não. PDF pode conter imagens, vetores ou ambos. É necessário verificar o conteúdo; a extensão sozinha não comprova que a arte está pronta para o uso pretendido." },
    { question: "Posso mudar a fonte depois de aprovar?", answer: "Uma alteração deve ser comunicada como revisão e pode afetar projeto, custo e prazo, especialmente após iniciar fabricação. Confirme a nova versão antes de seguir." },
  ],
  sources: [
    { title: "Adobe — Raster and vector", url: "https://www.adobe.com/learn/photoshop/web/raster-vector", note: "Referência para a diferença entre pixels e formas vetoriais ao dimensionar uma identidade gráfica." },
    { title: "Adobe — Vector files", url: "https://www.adobe.com/creativecloud/file-types/image/vector.html", note: "Contexto sobre formatos e uso de arquivos vetoriais. A aprovação de fabricação continua sendo uma etapa própria." },
  ],
  relatedSlugs: ["quanto-custa-letreiro-personalizado", "logotipo-3d-parede-recepcao"],
  cta: { heading: "Seu logo está pronto para ganhar volume?", text: "Mande o arquivo que você tem e uma foto do espaço. Vamos avaliar a preparação necessária.", label: "Avaliar meu logo para letreiro", message: "Olá, Belis! Quero transformar meu logo em letreiro 3D. Arquivo disponível: __. Largura desejada: __. Local de uso: __. Preferência de acabamento/luz: __. Cidade: __. Vou anexar os arquivos e fotos." },
  download: { label: "Baixar checklist de arquivos e aprovação", filename: "checklist-logo-letreiro-3d.txt", title: "Do logo ao letreiro — arquivos e aprovação", items: ["Arquivo original e imagem de referência", "Versão da marca, texto e acentos", "Manual, cores e margens", "Largura, altura e foto do local", "Adaptações explicitamente aprovadas", "Material, textura e iluminação", "Montagem e responsabilidades", "Arquivo/revisão final e data de aprovação"] },
};
