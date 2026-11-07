# Referências dos efeitos de letras

Pesquisa em 6 de novembro de 2026. Escopo: ampliar o personalizador de consumidor
final para 18 fontes, 15 efeitos e 25 cores. Não é editor CAD nem aprovação de fabricação.

## Fontes primárias consultadas

- [LetraMaker](https://letramaker.comunicacao3d.com/): interface pública consultada
  nesta conversa, com Face Acrílico, Retroiluminado, LED Duplo, Letra Curva,
  Vazado Paramétrico, Neon LED e Organic. Referência de famílias construtivas;
  nenhum modelo, imagem ou código extraído.
- [Additive Machines — letras com borda iluminada](https://additivemachines.com.au/blogs/featured-signage-projects/3d-printed-halo-illuminated-channel-letters):
  caso fabricado combinando PETG opaco e translúcido, com fechamento difusor.
  Demonstra que separar regiões que bloqueiam e transmitem luz é uma construção real.
- [Sygns — letras](https://www.sygns.com/products/letters): apresenta iluminação
  frontal, lateral, traseira e total; inclui corpo impresso em PETG com face difusora.
  As variantes laterais/totais mostradas pelo fabricante também usam acrílico;
  isso não prova automaticamente a mesma execução por impressão.
- [FormaKit3D — letra iluminada](https://formakit3d.com/en/tools/sign/): documentação
  de corpos ocos, tampas difusoras e passagem de cabos. Ressalta que traços estreitos
  precisam de ajuste para comportar paredes e iluminação.

## Dez efeitos adicionados

As construções abaixo são direções propostas pela Belis a partir dos princípios
pesquisados. Não são dez produtos já fabricados e validados pela Belis.

| Efeito | Construção a estudar | O que a prévia representa |
| --- | --- | --- |
| Lateral translúcida | Frente opaca; lateral difusora; reforços e fechamento opacos | Corpo lateral claro, frente sólida |
| Faixa de luz | Anel difusor entre dois segmentos opacos | Faixa central ao longo da profundidade |
| Duas faixas de luz | Dois anéis difusores separados por corpo opaco | Duas faixas laterais separadas |
| Meia lateral de luz | Parte traseira difusora e parte frontal opaca | Metade da profundidade iluminada |
| Luz por inteiro | Frente e lateral difusoras com estrutura interna adequada | Frente e lateral luminosas |
| Pontos de luz | Face perfurada sobre difusor contínuo | Luz passando pelos pequenos vazados |
| Frente ripada | Face com frisos e aberturas sobre difusor | Luz entre frisos verticais |
| Luz emoldurada | Frente difusora recuada dentro de borda opaca elevada | Centro iluminado, borda sólida |
| Relevo bicolor | Corpo e frente em cores diferentes, impressos ou montados separadamente | Contraste entre face e lateral |
| Borda elevada | Frente com ressalto perimetral em outra cor | Contorno físico destacado, sem luz |

Faixas centrais, duplas, meia lateral, padrões da face e detalhes de relevo são
adaptações propostas, não reproduções comprovadas dos casos das fontes. A estratégia
pode usar peças separadas com encaixes e montagem; não exige assumir impressora
multimaterial. O método final depende de tamanho, desenho, equipamento e material.

## Limites que continuam no projeto real

- Ajustar espessura e largura dos traços; fontes finas, letras pequenas, pontos e
  frisos podem precisar de redesenho. Nem toda combinação pode ser produzida igual à tela.
- Ensaiar amostra de corpo opaco + difusor: vazamento de luz, uniformidade, pontos
  de LED, encaixe e aparência durante o dia. Translucidez não equivale a transparência.
- Dimensionar espaço de iluminação, dissipação, cabos, fonte e acesso para manutenção.
- Definir material e acabamento pela aplicação. Uso externo, exposição ao sol,
  vedação, fixação e instalação não são garantidos pela prévia.
- “Prata”, “cobre” e “champagne” são nomes de cores de referência; não prometem metal.

## Implementação visual

Catálogo em `src/components/visual/signCatalog.ts`. A prévia usa 24 planos de texto
para representar profundidade; intervalos de planos translúcidos distinguem as
faixas. Miniaturas usam 12 planos. Máscaras representam os vazados da face sobre
uma camada difusora; não são arquivos fabricáveis. Não há renderização contínua.

Efeitos laterais abrem no ângulo lateral; iluminação seleciona ambiente noturno,
mas o visitante pode alternar o ambiente. As cores de luz são aproximações claras
da paleta escolhida, não códigos de LED especificados.

O catálogo tem rolagem própria para manter prévia e ação próximas. As fontes são
auto-hospedadas e suas amostras são ativadas 700px antes da seção entrar na tela.
O CTA transfere texto, nome da fonte, efeito e cor; não envia a mensagem sozinho.
