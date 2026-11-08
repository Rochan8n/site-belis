export const ENGINEERING_PATH = "/engenharia-reversa";
export const ENGINEERING_WHATSAPP = "5511973138895";

export function engineeringWhatsAppUrl(message = "Olá, Belis! Vim pela página de engenharia reversa e quero avaliar uma peça sob medida. Podemos conversar?") {
  return `https://wa.me/${ENGINEERING_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

export const applications = [
  {
    id: "classicos", label: "Clássicos & raros", sector: "Automotivo — clássicos e raros", number: "01", title: "Fora de catálogo.\nDe volta ao seu projeto.",
    description: "A peça sumiu do mercado, só existe usada ou custa uma fortuna para importar? Partimos da original, de um fragmento ou do local de montagem para estudar uma nova solução.",
    items: ["Difusores de ar, botões e acabamentos internos", "Molduras de painel e consoles personalizados", "Presilhas, tampas e suportes descontinuados", "Peças de reposição para importados e restaurações"],
    note: "Originalidade onde importa. Ajustes onde o projeto pede.",
  },
  {
    id: "performance", label: "Performance & custom", sector: "Automotivo — performance e custom", number: "02", title: "Seu projeto não veio\ncom peça de prateleira.",
    description: "Carros preparados, swaps e projetos personalizados pedem soluções próprias. Desenvolvemos geometrias para o espaço, a montagem e as condições reais do seu conjunto.",
    items: ["Coletores de admissão, plenums e cornetas sob projeto", "Dutos de ar, caixas de filtro e direcionadores", "Suportes de sensores, instrumentos e eletrônica", "Acabamentos externos e peças para o cofre do motor"],
    note: "Admissão e cofre do motor exigem validação térmica, mecânica e de estanqueidade. Ganhos de potência dependem de ensaios.",
  },
  {
    id: "industria", label: "Indústria & máquinas", sector: "Industrial — máquinas e equipamentos", number: "03", title: "Uma peça pequena.\nUma operação inteira.",
    description: "Máquina antiga, fornecedor distante ou componente fora de linha: avaliamos a fabricação sob demanda para manutenção, adaptação de equipamentos e melhoria de processos.",
    items: ["Guias, espaçadores, carenagens e suportes", "Gabaritos de montagem, posicionamento e inspeção", "Dispositivos para automação e fixação de sensores", "Protótipos funcionais, reposição e pequenos lotes"],
    note: "Material, tolerâncias e esforços definidos conforme a função de cada componente.",
  },
] as const;

export const engineeringFaqs = [
  { question: "Consigo refazer uma peça quebrada ou que não existe mais?", answer: "Podemos avaliar a reconstrução a partir de uma peça original, fragmentos, medidas ou do local onde ela será instalada. Uma foto ajuda na primeira análise; a fabricação pode exigir acesso físico à peça e conferência dos encaixes. Viabilidade, acabamento e fidelidade são alinhados antes da produção." },
  { question: "O nylon com fibra de carbono aguenta 250 °C?", answer: "Não como regra geral. Cada formulação tem uma ficha técnica, e a temperatura de deflexão sob carga (HDT) não equivale à temperatura de uso contínuo. Existem polímeros de engenharia com HDT na faixa de 250 °C, mas isso não garante o desempenho de uma peça nessa temperatura. Para esse cenário, avaliamos o material específico, a carga, o tempo de exposição e os ensaios necessários antes de confirmar a aplicação." },
  { question: "As peças resistem a óleo, combustível e solventes?", answer: "Há materiais com boa resistência a agentes químicos específicos. A escolha depende do produto em contato, concentração, temperatura e duração da exposição. Informe se haverá óleo, graxa, combustível, fluido de limpeza ou outro solvente. Não consideramos nenhum material universalmente resistente a todos eles." },
  { question: "Vocês fazem coletor de admissão e peças para o motor?", answer: "Desenvolvemos projetos de coletores, plenums, cornetas, dutos e componentes para o cofre do motor, sujeitos à avaliação de viabilidade. Temperatura, pressão ou vácuo, vibração, vedação e contato com fluidos fazem parte dessa análise. A peça precisa ser validada no conjunto antes do uso. Não prometemos ganhos de potência sem testes." },
  { question: "Escaneamento e modelagem 3D podem ser contratados separadamente?", answer: "Sim. Podemos trabalhar na digitalização de uma peça, reconstrução de superfícies ou criação de um modelo 3D a partir da sua necessidade. Malha de escaneamento e modelo CAD são entregas diferentes: formato dos arquivos, nível de detalhe e finalidade de uso são definidos na proposta." },
  { question: "Uma única peça compensa mais que importar?", answer: "Pode compensar, principalmente em itens descontinuados, personalizados ou com frete e prazo de importação elevados. O desenvolvimento também tem custo. Comparamos complexidade, quantidade, material e acabamento antes de apresentar uma proposta; economia e prazo não são garantidos sem essa análise." },
  { question: "Qualquer peça pode ser substituída por impressão 3D?", answer: "Não. Cargas, desgaste, impacto e ambiente de trabalho podem exigir metal ou outro processo. Componentes de freio, direção, suspensão e outras funções críticas de segurança não são tratados como reposição direta por uma peça impressa. Cada aplicação exige projeto e validação apropriados." },
  { question: "Como peço orçamento e recebo a peça?", answer: "Envie fotos, medidas aproximadas, quantidade e a cidade de entrega. Para veículos, inclua modelo, ano e modificações; para máquinas, marca, modelo e função da peça. Atendimento a partir de São Paulo, com envio para todo o Brasil. Necessidade de receber a peça original, frete e prazo são combinados na proposta." },
] as const;
