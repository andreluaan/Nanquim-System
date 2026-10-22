# Nanquim System — regras para o Claude

Nanquim System: design system pessoal do André, agnóstico de framework, usado para brandizar sites de clientes.
Processo contínuo: componentes e variantes são adicionados aos poucos, junto com o usuário.

## Arquitetura (3 camadas de tokens, prefixo `--ds-`)
1. **Primitivos** `src/tokens/primitives.css`: escalas OKLCH de 12 passos (croma dos neutros × `--ds-neutral-tint`, 1 no escuro e 1.8 no claro) (`--ds-neutral-1..12`, `--ds-accent-1..12`) geradas a partir de `--ds-neutral-hue/--ds-neutral-chroma/--ds-accent-hue/--ds-accent-chroma/--ds-accent-lightness`; espaço (`--ds-space-N`, base 4px), raio (`--ds-radius-xs..xl|full` × `--ds-radius-factor`), tipo (`--ds-text-xs..6xl`, `--ds-font-display|body|mono`), movimento (`--ds-duration-*`, `--ds-ease-*`), z-index.
2. **Semânticos** `src/tokens/semantic.css`: `--ds-color-bg|surface|surface-raised|surface-hover|surface-active`, `border-subtle|border|border-strong`, `text|text-muted|text-subtle`, `accent|accent-hover|accent-soft|accent-border|accent-text|on-accent`, `focus`, `--ds-focus-ring`, status `success|warning|danger|info` (+`-soft`, `-border`, `-text`), `--ds-shadow-sm|md|lg`.
3. **Temas** `src/themes/` (`nanquim.css` é o padrão): selecionados por atributos no `<html>`: `data-theme`, `data-font` (editorial|moderno|classico|tecnico), `data-radius` (reto|suave|arredondado), `data-mode` (dark|light). Marca de cliente = copiar `_marca-exemplo.css`.

## Regras de código
- **Prioridade: legibilidade.** Nomes que se explicam sozinhos, código padronizado (uma propriedade por linha em CSS, 2 espaços, aspas simples em JS), comentários só quando explicam um *porquê* não óbvio. Nada de banners ou comentários que repetem o código.
- Componentes usam **apenas tokens semânticos** (nunca primitivos, nunca hex solto, nunca px fora da escala).
- Sem framework: CSS puro + Web Components (custom elements) para o que for interativo. Classes de componente com prefixo `ds-`.
- Estilo da casa: escuro, minimalista, sóbrio. **Sem glow/neon**; profundidade vem de superfícies em camadas + `--ds-shadow-*` + bordas sutis.
- Acessibilidade: foco visível (`--ds-focus-ring`), contraste ≥ 4.5 em texto, respeitar `prefers-reduced-motion` (já zera as durações).
- Textos da documentação em português, para leigos: "o que é", "quando usar", demo interativa, faça/evite, código copiável.

## Documentação (`docs/`)
- `npm run dev` (Vite). Shell em `docs/main.js`; páginas em `docs/pages/<id>.js` exportando `{ id, group, title, lead, keywords, render(), mount?(el), rerenderOnThemeChange? }`; registrar em `docs/registry.js`.
- Helpers em `docs/utils.js`: `code()`, `doDont()`, `copy()`, `contrast()`; ícones em `docs/icons.js` (`icon(nome)`); controle segmentado `.doc-segmented`. Qualquer elemento com `data-copy="..."` copia ao clicar.
- Para medir contraste via JS, ligar `data-print` no `<html>` antes (senão as transições distorcem as cores).
- CSS: shell em `docs/docs.css` (prefixo `doc-`/`lab-`), páginas em `docs/pages.css`.
- Ao concluir um item, atualizar `docs/pages/roadmap.js` e este arquivo.

## Adicionando um componente (checklist)
1. `src/components/<nome>/<nome>.css` (+ `<nome>.js` se interativo), importado em `src/index.css`.
2. Variantes via modificadores (`ds-btn--ghost`) ou atributos (`variant="ghost"`), tamanhos `sm|md|lg`, estados hover/active/focus/disabled.
3. Página em `docs/pages/`, grupo "Componentes", com seção por variante.
4. Testar em todas as paletas e nos dois modos pelo Laboratório.

## Git
- Commits em português, no formato `tipo(escopo): resumo` (feat, fix, docs, refactor, style, chore), com corpo explicando o que e por quê.
- **Nunca** adicionar `Co-Authored-By` nem qualquer assinatura do Claude em commits ou PRs.

## Diário do processo (OBRIGATÓRIO a cada etapa concluída)
O usuário quer a evolução documentada (memória do projeto + matéria-prima para LinkedIn).
1. Com o dev server rodando: `npm run prints -- <etapa>` → `diario/prints/AAAA-MM-DD_<etapa>/`. Ao criar páginas novas, adicionar os prints delas em `SHOTS` (`scripts/prints.mjs`).
2. Criar `diario/NNN-<etapa>.md` a partir de `diario/_modelo.md`: contexto, o que foi feito, decisões com o porquê, problemas e soluções, antes/depois, aprendizados e uma "ideia de post" curta.
3. Atualizar a linha do tempo em `diario/README.md`.
- A URL aceita `?theme=&font=&radius=&mode=` (e `?lab` para abrir o Laboratório, `?print` sem animações).

## Estado atual
- Feito: fundações (cores, tipografia, espaço & cantos, elevação, movimento), Laboratório de identidade, botões (`ds-btn`).
- Documentação publicada: https://andreluaan.github.io/Nanquim-System/ (GitHub Pages, branch main).
- Identidade da casa: **tema Nanquim** (`src/themes/nanquim.css`), padrão sem `data-theme`. Escuro = tinta (neutros matiz 265, destaque marfim); claro = papel (neutros matiz 85, destaque tinta). As outras paletas em `house.css` ficam como alternativas e exemplos de rebrand.
- Página de abertura da documentação: `apresentacao` (conceito). Ilustrações em SVG em `docs/illustrations.js`.
- Próximo: set de ícones próprio.
