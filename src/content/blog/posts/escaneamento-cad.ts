import type { BlogPost } from "../types";

export const escaneamentoCad: BlogPost = {
  slug: "escaneamento-3d-ou-modelagem-cad",
  title: "Escaneamento 3D ou modelagem CAD: o que contratar para sua peça?",
  seoTitle: "Escaneamento 3D ou modelagem CAD: o que contratar?",
  description: "Entenda a diferença entre scan, malha STL e modelo CAD. Saiba qual entrega pedir para reproduzir, adaptar ou fabricar uma peça com engenharia reversa.",
  theme: "engenharia-reversa", format: "Comparativo", primaryKeyword: "escaneamento 3d",
  status: "published", publishedAt: "2026-11-07", updatedAt: "2026-11-07",
  coverTitle: "Capturar a forma.\nReconstruir a função.",
  coverImage: "/images/blog/2026/escaneamento-3d-ou-modelagem-cad.webp",
  coverAlt: "Ilustração de uma carcaça em três representações: peça física, malha verde e sólido claro.",
  coverCaption: "Ilustração gerada por IA: representações conceituais de peça, malha e CAD, sem escala metrológica.",
  quickAnswer: "Contrate escaneamento quando precisa registrar a geometria existente. Inclua reconstrução CAD quando precisa recuperar regiões, alterar medidas, definir encaixes ou preparar um modelo para fabricação. Uma malha STL e um arquivo STEP não são equivalentes; a extensão, sozinha, também não garante um modelo fácil de editar ou uma peça aprovada para uso.",
  introduction: [
    "Você pede um arquivo 3D e recebe algo que abre na tela, mas não serve ao fornecedor que vai produzir a peça. Esse desencontro é evitável quando a contratação começa pelo uso do arquivo, em vez de parar no nome da tecnologia.",
    "Escanear, tratar uma malha, reconstruir o CAD e fabricar são etapas que podem ser contratadas juntas ou separadamente. Este comparativo mostra como escolher a entrega e o que perguntar antes de enviar uma peça para digitalização.",
  ],
  sections: [
    { id: "scan-malha-cad", title: "Scan, malha e CAD: três coisas diferentes", blocks: [
      { type: "paragraph", text: "O escaneamento captura informações da superfície observável. Esses dados podem ser processados em uma malha: uma representação formada por pequenas faces. O CAD permite organizar superfícies e sólidos para trabalhar o projeto. Na engenharia reversa, a captura costuma servir de referência para reconstruir a geometria necessária ao uso pretendido." },
      { type: "table", caption: "Entregas que precisam ser distinguidas na proposta", columns: ["Entrega", "Uso típico", "O que confirmar"], rows: [["Dados de escaneamento", "Registro da superfície", "Cobertura, alinhamento e formato"], ["Malha tratada", "Visualização e alguns fluxos de impressão", "Escala, integridade e regiões reconstruídas"], ["Modelo CAD", "Alteração e preparação do projeto", "Geometria, editabilidade e interfaces"], ["Desenho e inspeção", "Comunicação e verificação de requisitos", "Cotas, critérios e escopo do relatório"]] },
      { type: "paragraph", text: "O orçamento precisa dizer quais dessas entregas estão incluídas. Não presuma que contratar o scanner inclui o trabalho de interpretar a peça, definir sua condição nominal ou conferir uma montagem. Essas tarefas exigem decisões e podem ter tempos muito diferentes da captura." },
    ] },
    { id: "stl-step", title: "STL ou STEP? Comece pelo destino do arquivo", blocks: [
      { type: "paragraph", text: "STL é comum em fluxos de impressão e descreve uma superfície triangulada. STEP é usado para intercâmbio de geometria CAD. Se o próximo fornecedor precisa editar furos ou preparar fabricação, confirme que tipo de sólido ele aceita e quais informações adicionais precisa receber. Mandar o arquivo errado pode transferir reconstrução e custo para a etapa seguinte." },
      { type: "paragraph", text: "Converter uma malha para um sólido não significa recuperar automaticamente o histórico de projeto. A documentação do Autodesk Fusion distingue conversões facetadas, prismáticas e orgânicas. Dependendo do método e da entrada, o resultado pode continuar difícil de alterar. Pergunte se a entrega terá geometria organizada, arquivo nativo editável ou apenas uma conversão de formato." },
      { type: "callout", title: "Teste simples de aceite do arquivo", text: "Combine abrir o arquivo no software de destino, conferir a unidade e medir uma dimensão de referência. Se houver exigência de alteração, teste uma operação representativa, como mudar o diâmetro de um furo. Abrir sem erro não comprova todos esses requisitos." },
    ] },
    { id: "qual-caminho", title: "Escolha o caminho conforme a sua necessidade", blocks: [
      { type: "list", items: ["Preciso registrar a superfície atual: avalie escaneamento e tratamento dos dados.", "Preciso reproduzir uma forma: confirme se a malha atende ao processo e se há regiões a recuperar.", "Preciso mudar encaixes ou espessuras: inclua modelagem e revisão de projeto.", "Preciso cotar fabricação com terceiros: combine formato e documentação com quem receberá os arquivos.", "Preciso verificar conformidade: defina separadamente referências, método e relatório dimensional."] },
      { type: "paragraph", text: "Uma peça simples, composta por poucos planos e furos acessíveis, pode ser reconstruída com instrumentos dimensionais e CAD sem escaneamento completo. Já uma carcaça curva pode se beneficiar da captura de superfície. O método deve resolver o problema com informação suficiente; usar scanner em toda peça não é uma vantagem por si só." },
    ] },
    { id: "condicao-original", title: "O scanner enxerga desgaste, não a intenção do projetista", blocks: [
      { type: "paragraph", text: "Imagine uma carcaça que passou anos apertada por um parafuso e deformou em um apoio. Reproduzir fielmente essa superfície pode conservar o defeito. Antes da reconstrução, marque o que deve ser mantido, corrigido ou investigado. Fotografias da peça montada e acesso às regiões vizinhas ajudam a decidir." },
      { type: "paragraph", text: "Superfícies brilhantes, transparentes, cavidades profundas e áreas sem acesso podem exigir preparação ou métodos complementares. O fornecedor deve explicar como vai tratar as limitações da referência. Não existe justificativa para inventar detalhes internos apenas porque o exterior foi capturado com boa aparência." },
      { type: "paragraph", text: "Informe também restrições de manuseio. Uma peça de coleção pode não admitir revestimento temporário, desmontagem ou marcas de apoio. Definir isso antes evita escolher uma estratégia de medição incompatível com a preservação do objeto." },
    ] },
    { id: "precisao", title: "Precisão de captura não é tolerância da peça final", blocks: [
      { type: "paragraph", text: "A especificação de um equipamento descreve uma capacidade sob determinadas condições. O resultado do projeto também depende de captura, referências de medição, reconstrução e fabricação. Por isso, uma tolerância final precisa ser acordada para as regiões relevantes e verificada por um método apropriado; não deve ser deduzida de um número de catálogo." },
      { type: "paragraph", text: "Liste as interfaces que importam: centro de furos, diâmetro de alojamento, plano de apoio ou espaço para montagem. Pedir a mesma exigência extrema em todas as superfícies pode encarecer o trabalho sem trazer benefício. A discussão deve partir da função de cada região e da forma de conferir o resultado." },
      { type: "link", label: "Entender os fatores do orçamento de engenharia reversa", href: "/blog/quanto-custa-engenharia-reversa" },
    ] },
    { id: "briefing", title: "Briefing mínimo para contratar sem desencontro", blocks: [
      { type: "paragraph", text: "Explique quem usará os arquivos, em qual software ou processo e para fazer o quê. Identifique o que precisa mudar e o que deve permanecer igual. Combine quantidade de revisões, aprovação de regiões reconstruídas e entrega da versão final. Se a montagem será testada por sua equipe, reserve acesso ao conjunto e alguém responsável por dar retorno." },
      { type: "paragraph", text: "Na proposta, procure uma relação concreta de arquivos e serviços: malha tratada, CAD neutro, arquivo nativo, desenho, protótipo ou relatório, conforme necessário. Um item não substitui o outro. A Belis pode avaliar o processo completo ou uma etapa específica a partir das informações da sua peça." },
      { type: "link", label: "Enviar uma referência para avaliação de engenharia reversa", href: "/engenharia-reversa#projeto" },
    ] },
  ],
  faq: [
    { question: "Um STL pode ser transformado em STEP?", answer: "Existem ferramentas de conversão, mas a qualidade e a editabilidade dependem da malha e do método. Um sólido convertido não equivale automaticamente a um projeto reconstruído com superfícies e dimensões adequadas ao uso." },
    { question: "Preciso contratar scan para uma peça simples?", answer: "Nem sempre. Medição dimensional e modelagem podem atender geometrias simples. A escolha deve considerar acesso, forma, requisitos e custo do processo completo." },
    { question: "O scan prova que a nova peça vai encaixar?", answer: "Não sozinho. Montagem envolve reconstrução, folgas e fabricação. Combine a verificação das interfaces e, quando necessário, um protótipo físico antes da aprovação final." },
  ],
  sources: [
    { title: "Autodesk Fusion — Convert a mesh body to a solid body", url: "https://help.autodesk.com/view/fusion360/ENU/?contextId=MESH-CONVERT-TO-SOLID", note: "Documenta diferenças entre métodos de conversão de malhas; não garante a qualidade de um arquivo específico." },
    { title: "Artec 3D — Software for reverse engineering", url: "https://www.artec3d.com/learning-center/best-software-for-reverse-engineering", note: "Referência sobre processamento de dados e reconstrução após a captura 3D." },
  ],
  relatedSlugs: ["pecas-fora-de-linha-engenharia-reversa", "quanto-custa-engenharia-reversa"],
  cta: { heading: "Precisa de scan, CAD ou dos dois?", text: "Conte o que pretende fazer com a peça e os arquivos. A Belis ajuda a definir o escopo da avaliação.", label: "Definir minha entrega 3D", message: "Olá, Belis! Quero avaliar escaneamento e/ou modelagem CAD. Tenho: __. Preciso usar o arquivo para: __. Software ou processo de destino: __. Dimensões aproximadas: __. Cidade: __." },
  download: { label: "Baixar checklist de entrega 3D", filename: "checklist-scan-cad.txt", title: "Briefing de escaneamento e CAD", items: ["Peça e estado da referência", "Uso do arquivo e software de destino", "Formato, unidade e versão", "Regiões a preservar ou reconstruir", "Interfaces e critérios dimensionais", "Restrições de manuseio", "Protótipo e teste de montagem", "Arquivos, revisões e condições de uso"] },
};
