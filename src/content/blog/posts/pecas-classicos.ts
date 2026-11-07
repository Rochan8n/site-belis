import type { BlogPost } from "../types";

export const pecasClassicos: BlogPost = {
  slug: "pecas-carros-antigos-impressao-3d",
  title: "Peças para carros antigos com impressão 3D: o que avaliar antes de encomendar",
  seoTitle: "Peças para carros antigos: quando usar impressão 3D?",
  description: "Molduras, tampas e acabamentos fora de linha: veja como avaliar peças para carros antigos, preservar referências e planejar encaixe, material e acabamento.",
  theme: "engenharia-reversa", format: "Guia de compra", primaryKeyword: "peças carros antigos",
  status: "published", publishedAt: "2026-11-07", updatedAt: "2026-11-07",
  coverTitle: "Preservar o clássico.\nRecuperar o detalhe.",
  coverImage: "/images/blog/2026/pecas-carros-antigos-impressao-3d.webp",
  coverAlt: "Conceito de interior de carro clássico com dois acabamentos de ventilação sobre bancada.",
  coverCaption: "Imagem conceitual gerada por IA; não identifica veículo de cliente nem peça homologada.",
  quickAnswer: "Impressão 3D pode ser avaliada para molduras, tampas, organizadores e outros componentes não críticos de carros antigos, especialmente quando falta reposição. O projeto precisa considerar a referência, o encaixe, o calor e o acabamento. Não é substituição automática para peças estruturais ou de segurança, e uma réplica visual não comprova desempenho equivalente ao original.",
  introduction: [
    "A restauração chega perto do fim, mas falta uma pequena moldura. A peça usada disponível está ressecada, a importação vende apenas um conjunto e o anúncio não mostra o verso. Nesse cenário, a engenharia reversa pode abrir outro caminho: documentar a referência e desenvolver uma peça que atenda ao objetivo da restauração.",
    "O trabalho começa por uma escolha: preservar a aparência original, melhorar um detalhe funcional ou adaptar um acessório novo? Essas intenções podem exigir projetos diferentes. Defini-las cedo evita que uma solução tecnicamente utilizável desagrade justamente no que importa ao proprietário.",
  ],
  sections: [
    { id: "o-que-avaliar", title: "Quais peças merecem uma primeira avaliação", blocks: [
      { type: "table", caption: "Triagem de aplicações em restauração", columns: ["Aplicação", "Pergunta principal", "Evidência útil"], rows: [["Moldura ou acabamento", "Precisa repetir textura, cor e contorno?", "Fotos próximas e peça de referência"], ["Tampa ou cobertura", "Como abre, fecha e se fixa?", "Imagens da montagem e do verso"], ["Suporte de acessório não crítico", "Que carga recebe e onde fica?", "Medidas, acessório e ambiente"], ["Peça de segurança ou estrutural", "Exige validação especializada?", "Requisitos do sistema e avaliação profissional"]] },
      { type: "paragraph", text: "Essa tabela orienta a conversa, não aprova a fabricação. Mesmo uma peça pequena pode ter função crítica: uma presilha pode reter um acabamento ou interferir em um mecanismo. Descreva sua função real, sem classificá-la apenas pelo tamanho ou pela aparência de plástico." },
    ] },
    { id: "documentar-original", title: "Registre o original antes de desmontar", blocks: [
      { type: "paragraph", text: "Fotografe o conjunto montado, o contorno ao redor e os pontos de fixação acessíveis. Guarde parafusos, molas e fragmentos identificados. Um saco separado para cada conjunto ajuda a não misturar elementos de posições diferentes. Registre também adaptações antigas: nem tudo que está no carro corresponde à configuração de fábrica." },
      { type: "paragraph", text: "Ano, versão e carroceria importam. Uma mudança aparentemente pequena entre versões pode alterar o apoio de uma moldura. Quando possível, compare código e verso da peça, não só a frente. Se você pretende usar uma referência emprestada, informe as condições de preservação e combine o manuseio antes do envio." },
      { type: "paragraph", text: "Há aplicações documentadas de escaneamento em restauração, como o caso Car SOS publicado pela Artec 3D. Isso demonstra um caminho de trabalho com referências físicas, mas não estabelece prazo, preço ou material adequado ao seu carro. Cada projeto precisa do próprio levantamento." },
    ] },
    { id: "encaixe", title: "Teste o encaixe antes da textura e da pintura", blocks: [
      { type: "paragraph", text: "Um acabamento frontal pode parecer perfeito e esconder uma aba deslocada no verso. O primeiro teste deve responder se a peça entra, apoia e se fixa sem forçar componentes vizinhos. Combine quais interfaces serão verificadas e como o carro ou o conjunto ficará disponível para essa etapa." },
      { type: "paragraph", text: "Quando a dúvida está em uma área pequena, pode fazer sentido produzir uma amostra parcial do encaixe. Depois de aprovar as interfaces, avalia-se a peça completa e o acabamento. A amostra parcial reduz a pergunta a resolver; ela não comprova rigidez, aparência ou funcionamento de todas as regiões que ainda não foram fabricadas." },
      { type: "callout", title: "Cenário ilustrativo: adaptação de multimídia", text: "Uma moldura precisa considerar espaço traseiro, cabos, ventilação e acesso aos comandos, além do recorte da tela. Confirme essas condições com o instalador antes de aprovar apenas a imagem da frente." },
    ] },
    { id: "ambiente", title: "Interior, porta-malas e cofre exigem avaliações diferentes", blocks: [
      { type: "paragraph", text: "A palavra automotivo não define um ambiente único. Uma peça escondida no porta-malas e outra exposta ao sol no painel recebem condições distintas. No cofre, temperatura, vibração e contato com fluidos podem mudar completamente a seleção. Informe a posição de instalação e as exposições esperadas desde o briefing." },
      { type: "paragraph", text: "Evite escolher material por uma temperatura isolada vista na internet. A ficha de uma formulação não vale para todos os polímeros com nome semelhante. Desenho, orientação de fabricação, esforço e duração da exposição também precisam entrar na decisão. Quando não houver dados suficientes, a avaliação deve identificar a necessidade de medição ou ensaio." },
      { type: "link", label: "Como escolher materiais para peças funcionais", href: "/blog/materiais-impressao-3d-pecas-funcionais" },
    ] },
    { id: "acabamento", title: "Originalidade visual precisa de referência física", blocks: [
      { type: "paragraph", text: "Preto não é uma especificação completa. Brilho, textura e desgaste das peças vizinhas mudam a percepção. Uma tela de celular ajuda a conversar sobre direção, mas uma amostra comparada sob a luz de uso é uma base melhor para aprovar aparência. Defina se o objetivo é aproximar o conjunto atual ou recuperar uma referência original." },
      { type: "paragraph", text: "Camadas de impressão, linhas de união e marcas de pós-processamento podem ficar visíveis. Peça que a proposta diferencie peça bruta, preparada e acabada. Se houver pintura, confirme como serão protegidos os encaixes e quais superfícies fazem parte da aprovação. O material e o acabamento devem ser avaliados como um conjunto." },
      { type: "paragraph", text: "Também vale decidir como identificar a reprodução no arquivo e no histórico da restauração. Guardar fotos, versão do CAD e descrição do material facilita manutenção futura. Uma alteração funcional deve ser documentada para não ser confundida depois com característica da peça original." },
    ] },
    { id: "pedido", title: "Organize o pedido com o restaurador ou instalador", blocks: [
      { type: "list", items: ["Veículo, ano, versão e posição da peça.", "Fotos da frente, do verso e da instalação.", "Referência física disponível e estado de conservação.", "Objetivo: reprodução visual, recuperação ou adaptação.", "Condições de calor, exposição e contato com produtos.", "Quem fará a montagem e dará retorno sobre o protótipo.", "Quantidade, cidade e acabamento desejado."] },
      { type: "paragraph", text: "Enviar essas informações à Belis permite começar pela peça certa e pelas dúvidas que precisam ser resolvidas. Evite encomendar várias unidades de uma geometria ainda não conferida no veículo. O projeto avança com mais clareza quando proprietário, restaurador e fornecedor aprovam os mesmos critérios." },
      { type: "link", label: "Avaliar uma peça para seu clássico", href: "/engenharia-reversa#projeto" },
    ] },
  ],
  faq: [
    { question: "Dá para copiar a peça do outro lado do carro?", answer: "Ela pode servir de referência, mas espelhar o modelo nem sempre resolve. Fixações, interferências e funções podem mudar entre lados. Confirme a montagem correspondente." },
    { question: "A peça impressa terá o mesmo acabamento da original?", answer: "Isso depende do processo, do pós-processamento e da referência aprovada. Textura e brilho precisam ser discutidos separadamente do encaixe. Não se deve prometer equivalência apenas por um render." },
    { question: "A impressão 3D substitui peças de freio ou direção?", answer: "Este serviço não deve ser tratado como substituição direta de componentes críticos. Esses sistemas exigem requisitos e validação especializada, além do escopo de reproduzir um acabamento." },
  ],
  sources: [{ title: "Artec 3D — Car SOS", url: "https://www.artec3d.com/cases/car-sos", note: "Caso de uso de escaneamento para restauração automotiva. Não é um projeto da Belis nem comprovação de desempenho para outras peças." }],
  relatedSlugs: ["pecas-fora-de-linha-engenharia-reversa", "materiais-impressao-3d-pecas-funcionais"],
  cta: { heading: "Falta uma peça no seu clássico?", text: "Mostre a referência e o local de montagem. Vamos avaliar encaixe, aparência e escopo do projeto.", label: "Conversar sobre minha peça", message: "Olá, Belis! Quero avaliar uma peça para carro antigo. Veículo/ano/versão: __. Peça e posição: __. Objetivo da restauração: __. Referência disponível: __. Cidade: __. Vou anexar fotos." },
  download: { label: "Baixar briefing de peça para restauração", filename: "briefing-peca-carro-antigo.txt", title: "Peça para carro antigo — briefing", items: ["Veículo, ano, versão e código", "Posição e função", "Fotos montada, frente e verso", "Estado da referência", "Originalidade ou adaptação desejada", "Ambiente e exposições", "Material e acabamento a avaliar", "Responsável pelo teste, quantidade e cidade"] },
};
