import type { BlogPost } from "../types";

export const coberturaEventos: BlogPost = {
  slug: "cobertura-audiovisual-eventos-corporativos",
  title: "Cobertura audiovisual de eventos: checklist para contratar",
  seoTitle: "Cobertura audiovisual de eventos: checklist de contratação",
  description: "Planeje a cobertura audiovisual do evento da sua empresa: equipe, momentos essenciais, entrevistas, formatos, prazos e checklist de contratação.",
  theme: "audiovisual",
  format: "Checklist",
  primaryKeyword: "cobertura audiovisual de eventos",
  status: "published",
  publishedAt: "2026-09-28",
  updatedAt: "2026-09-28",
  coverTitle: "O evento acaba.\nO conteúdo fica.",
  coverAlt: "Capa editorial sobre planejamento de cobertura audiovisual, dos momentos do evento às entregas de conteúdo.",
  quickAnswer: "Para contratar cobertura audiovisual, defina o objetivo do conteúdo, os momentos obrigatórios, a duração da cobertura e as entregas. Combine captação de áudio, entrevistas, versões para cada canal e prazos. Aftermovie, gravação integral e transmissão são escopos diferentes.",
  introduction: [
    "O evento tem hora para começar e terminar. Uma fala, uma demonstração ou uma interação relevante pode acontecer uma única vez. A cobertura precisa de um plano que conecte a programação ao conteúdo que a empresa pretende usar depois.",
    "Antes de escolher equipe ou equipamento, decida o que o material deve fazer: registrar, apresentar a experiência, apoiar vendas, comunicar um lançamento ou preparar a próxima edição. Este checklist transforma essas decisões em um briefing de contratação.",
  ],
  sections: [
    {
      id: "definir-entregas",
      title: "Defina as entregas antes de dimensionar a equipe",
      blocks: [
        { type: "paragraph", text: "Cobertura audiovisual é a captação planejada de imagem e som de um evento. O resultado pode ser um filme de melhores momentos, entrevistas, demonstrações ou gravações mais longas. Cada entrega exige escolhas distintas durante a captação. Uma lista genérica de fotos e vídeos não resolve duração, linguagem ou destino dos arquivos." },
        { type: "table", caption: "Entregas diferentes exigem planos diferentes de cobertura", columns: ["Entrega", "Utilidade", "O que combinar"], rows: [["Aftermovie", "Apresentar a experiência e os momentos do evento", "Mensagem, duração, cenas essenciais e trilha"], ["Entrevistas", "Registrar percepções ou explicar um lançamento", "Pessoas, perguntas, local e captação de áudio"], ["Cortes para redes sociais", "Distribuir trechos e mensagens específicas", "Quantidade, proporção, legendas e prazo"], ["Gravação integral", "Preservar uma palestra ou apresentação", "Câmeras, áudio contínuo e cobertura sem interrupções"], ["Transmissão", "Levar a programação a quem está remoto", "Equipe, infraestrutura e operação dedicadas"]] },
        { type: "paragraph", text: "A tabela descreve formatos possíveis, não um pacote padrão da Belis. Fotografia, publicação em tempo real e transmissão devem ser confirmadas no escopo, quando necessárias. Não trate serviços diferentes como itens automaticamente incluídos em uma cobertura de vídeo." },
      ],
    },
    {
      id: "programacao-e-momentos",
      title: "Transforme a programação em prioridades de captação",
      blocks: [
        { type: "paragraph", text: "Envie a programação atualizada e marque os momentos que não podem faltar. Identifique abertura, principais falas, demonstrações, participação do público, presença de parceiros e encerramento. Para cada prioridade, indique horário, local e responsável de contato. Isso ajuda a equipe a se posicionar antes de a ação começar." },
        { type: "paragraph", text: "Se há atividades simultâneas em salas diferentes, uma única pessoa não consegue acompanhá-las integralmente. Decida se ambas precisam de registro contínuo ou se bastam trechos. O número de câmeras não substitui o planejamento de equipe, deslocamento e atenção necessária em cada espaço." },
        { type: "list", items: ["Programação, locais e atividades simultâneas.", "Momentos obrigatórios e possibilidade de alteração de horários.", "Pessoas que serão entrevistadas e quem fará a apresentação.", "Contato da organização e da equipe de som.", "Restrições de circulação, acesso e montagem.", "Plano para mudanças na programação e ambientes externos."] },
        { type: "paragraph", text: "Escolha um ponto de contato que possa resolver decisões durante o evento. A equipe de captação precisa saber quem confirma mudanças e quem localiza os entrevistados. Distribuir essa responsabilidade entre várias pessoas, sem combinar um fluxo, pode fazer a cobertura perder um momento enquanto procura uma resposta." },
      ],
    },
    {
      id: "audio-entrevistas",
      title: "Planeje áudio e entrevistas com antecedência",
      blocks: [
        { type: "paragraph", text: "Imagem de palco com fala incompreensível limita o uso posterior. Confirme como o som será captado e se a equipe pode acessar o sistema do evento. Gravar uma palestra inteira exige continuidade e um plano de áudio próprio; captar trechos para um aftermovie é outra tarefa. Essa diferença deve aparecer no briefing." },
        { type: "paragraph", text: "Reserve um ambiente para entrevistas que não concorra com caixas de som, fluxo de pessoas ou montagem. Prepare perguntas curtas e ligadas ao objetivo do conteúdo. Em um lançamento, por exemplo, a fala pode explicar para quem o produto foi criado e qual problema resolve. Esse exemplo é ilustrativo, não um depoimento de cliente." },
        { type: "callout", title: "Evite depender de entrevistas improvisadas", text: "Liste participantes, organize convites e reserve janelas de horário. A presença da pessoa no evento não garante que ela estará disponível quando a equipe puder gravar." },
        { type: "paragraph", text: "A organização também deve combinar como será informada a captação e verificar as permissões de uso dos materiais conforme o projeto. Não espere a edição para descobrir que uma fala, apresentação ou música não pode ser utilizada na finalidade planejada." },
      ],
    },
    {
      id: "formatos-prazos",
      title: "Combine formatos, revisões e prazo de entrega",
      blocks: [
        { type: "paragraph", text: "Liste cada peça: versão principal, cortes, entrevistas e gravações completas, quando contratadas. Para cada uma, confirme proporção, duração aproximada, legendas e data de entrega. Um resumo vertical e uma gravação integral horizontal cumprem funções diferentes; pedir ambos depois da captação pode exigir material que não foi produzido." },
        { type: "paragraph", text: "Entrega rápida depende de um fluxo preparado. Se há necessidade de publicar no mesmo dia, isso deve ser planejado com edição, aprovações e acesso aos materiais. Não presuma esse prazo por o vídeo ser curto. O cronograma normal de pós-produção também precisa reservar tempo para receber e consolidar ajustes." },
        { type: "list", ordered: true, items: ["Defina entregáveis e prioridade de publicação.", "Escolha quem aprova a primeira versão e reúne os comentários.", "Combine quantidade de rodadas e o que constitui mudança de escopo.", "Confirme como arquivos finais serão disponibilizados.", "Separe prazo de primeira versão, revisão e entrega final."] },
      ],
    },
    {
      id: "usar-conteudo",
      title: "Prepare o uso do conteúdo depois do evento",
      blocks: [
        { type: "paragraph", text: "Um aftermovie pode apoiar a apresentação da próxima edição, enquanto uma entrevista pode responder uma dúvida em uma conversa comercial. Defina esses usos antes de gravar. Assim, a captação pode buscar os detalhes que fazem diferença para cada mensagem, em vez de acumular cenas que parecem bonitas mas não explicam o evento." },
        { type: "paragraph", text: "Monte um calendário de publicação e uma pasta organizada por versão e canal. Confirme se patrocinadores ou parceiros precisam receber peças específicas e se essas entregas foram contratadas. A clareza nessa distribuição reduz a chance de publicar arquivo errado, versão ainda não aprovada ou conteúdo sem contexto." },
        { type: "paragraph", text: "Avalie o resultado conforme a finalidade. Um registro integral deve ser inteligível e completo; um filme de apresentação deve explicar a experiência; uma campanha deve conduzir ao próximo passo. Visualizações e curtidas podem ajudar a observar consumo, mas precisam ser lidas junto da qualidade dos contatos e das ações que o material apoia." },
        { type: "link", label: "Conhecer produções audiovisuais da Belis", href: "/portfolio" },
      ],
    },
  ],
  faq: [
    { question: "Aftermovie inclui todas as palestras?", answer: "Não necessariamente. Aftermovie é uma edição de momentos selecionados. A gravação integral de palestras exige planejamento e contratação específicos." },
    { question: "Uma equipe consegue cobrir salas simultâneas?", answer: "Depende da programação e das entregas. Atividades simultâneas podem exigir equipe adicional ou uma escolha explícita de prioridades." },
    { question: "A cobertura inclui postagem em tempo real?", answer: "Esse serviço precisa estar definido no escopo. Captação, edição rápida, aprovação e publicação são etapas diferentes, com necessidades próprias." },
    { question: "O que enviar para a Belis antes de pedir proposta?", answer: "Informe data, local, duração, programação, momentos obrigatórios, entrevistas e entregas desejadas. Indique também o prazo de uso do conteúdo." },
  ],
  sources: [
    { title: "YouTube: recomendações de codificação de vídeos", url: "https://support.google.com/youtube/answer/1722171?hl=pt-BR", note: "Referência para arquivos destinados ao YouTube; cada canal pode ter requisitos próprios." },
  ],
  relatedSlugs: ["quanto-custa-video-institucional", "site-institucional-ou-landing-page"],
  cta: { heading: "Seu evento já tem um plano de conteúdo?", text: "Envie programação, local e entregas desejadas. Vamos definir o que precisa ser registrado e como o material será usado.", label: "Planejar cobertura do evento", message: "Olá! Li o checklist de cobertura audiovisual da Belis. Quero conversar sobre a programação e as entregas do evento da minha empresa." },
  download: { label: "Baixar checklist de cobertura", filename: "checklist-cobertura-evento.txt", title: "Checklist de cobertura audiovisual de evento", items: ["Objetivo do conteúdo:", "Data, local, duração e horários de montagem:", "Programação e salas simultâneas:", "Momentos que não podem faltar:", "Entrevistados, perguntas e disponibilidade:", "Responsável da organização e contato da equipe de som:", "Restrições e permissões de captação e utilização:", "Entregas: aftermovie, entrevistas, cortes ou gravações integrais:", "Formatos, legendas e prazo de cada entrega:", "Responsável por aprovações e rodadas de revisão:", "Distribuição depois do evento:"] },
};
