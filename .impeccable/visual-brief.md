# Comunicação visual

Target: src/app/comunicacao-visual/page.tsx
Mode: persuade
Scope: página nova dentro da identidade Belis, com superfície mais clara autorizada.

Audience: empresas buscando letreiros, letras caixa e logos personalizados.
Job: escolher uma direção, entender o escopo e conversar sobre orçamento.
Action: WhatsApp contextual, incluindo referência do simulador.
Proof: conceitos ilustrativos declarados; não há portfólio entregue nesta frente.
Constraints: São Paulo + Brasil, criação/produção/envio, instalação a combinar.

Direction: estúdio de amostras de letras, candidato estrutural 3, seed f132dd92.
Comp: .impeccable/mocks/composicao-1.png, selecionada sob direção criativa delegada
no pedido original; escolha comunicada. Não é aprovação individual do usuário.

Inventory:
- Marca, navegação, títulos, texto, CTA: HTML/CSS com Archivo do sistema existente.
- Hero a/B com material e sombra: raster gerado, sem recorte do comp; CSS perspective.
- Controles de materiais do comp: omitidos por materiais não confirmados; substituídos
  por simulador funcional de estilos abaixo da galeria, sem prometer materiais.
- Galeria de fachada/logo/luz/estilo: quatro rasters próprios, layout assimétrico.
- Simulador: HTML com camadas em translateZ, fontes de amostra, luz e rotação.
- Processo, FAQ e fechamento: HTML semântico; details nativo funciona sem JS.
- Ícones: Lucide + WhatsApp de react-icons; nada de glifos decorativos novos.

Unresolved: preços, prazos, frete e instalação por projeto; métricas reais após publicação.

## Background refinement — 2026-11-06

User direction: the page feels monotonous; add the original Belis blob as a
watermark, letters that react to the mouse, neon shapes and neon logos. This
explicitly expands the original comp's quiet background, preserving its layout,
content, photography, conversion links and consumer-facing personalizer.

Motion thesis: lettering extends into the margins of the studio. A restrained
wireframe watermark anchors the brand; outlined letterforms and luminous signs
respond with different movement depths to a visitor exploring each section.
The dark lettering section is the focal composition: monogram, script and arch
in Belis green and warm white. No new brand colors or rainbow treatment.

Budget: one requestAnimationFrame per batch of pointer events; no continuous
animation, new dependency or WebGL context. Decorative layers never receive
pointer input or enter the accessibility tree. Touch and reduced-motion modes
retain the static composition. Offscreen/hidden sections reset the interaction.

The original material-study comp remains the structural reference, seed f132dd92;
the user's new background request supersedes its decoration density.
