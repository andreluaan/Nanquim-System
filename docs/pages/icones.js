import { ICONS, ICON_CATEGORIES, iconSvg } from '../../src/icons/icons.js';
import { code, doDont, escapeHtml } from '../utils.js';

const SIZES = [['sm', 'P · 16'], ['md', 'M · 20'], ['lg', 'G · 24'], ['xl', 'GG · 32']];
const WEIGHTS = [['fina', 'Fina'], ['regular', 'Regular'], ['forte', 'Forte']];
const STROKES = { fina: 1.25, regular: 1.75, forte: 2.25 };

const KEYWORDS = {
  x: 'fechar close sair',
  check: 'ok confirmar feito',
  edit: 'editar lápis caneta',
  trash: 'lixeira excluir apagar deletar',
  copy: 'copiar duplicar',
  search: 'buscar lupa procurar',
  filter: 'filtrar funil',
  refresh: 'atualizar recarregar',
  menu: 'hambúrguer navegação',
  more: 'mais opções reticências',
  sliders: 'configurações ajustes settings',
  home: 'casa início',
  user: 'pessoa perfil conta',
  lock: 'cadeado senha segurança',
  eye: 'ver visualizar olho',
  'log-out': 'sair logout',
  sun: 'sol claro tema',
  moon: 'lua escuro tema',
  mail: 'email e-mail carta',
  phone: 'telefone ligar celular',
  bell: 'sino notificação',
  calendar: 'data agenda',
  clock: 'relógio hora tempo',
  'map-pin': 'local endereço mapa',
  globe: 'mundo site idioma',
  info: 'informação ajuda',
  alert: 'aviso atenção erro',
  heart: 'coração curtir favorito',
  star: 'estrela avaliação favorito',
  image: 'foto imagem galeria',
  cart: 'carrinho compra loja',
  ink: 'gota tinta nanquim marca',
  pen: 'pena caneta nanquim marca',
};

const dsIconTag = (name, size, weight) =>
  `<ds-icon name="${name}"${size === 'md' ? '' : ` size="${size}"`}${weight === 'regular' ? '' : ` weight="${weight}"`}></ds-icon>`;

function segmented(key, options, current) {
  return `
    <div class="doc-segmented" role="radiogroup">
      ${options.map(([id, label]) => `<button role="radio" aria-checked="${id === current}" data-${key}="${id}">${label}</button>`).join('')}
    </div>`;
}

function anatomy() {
  const lines = Array.from({ length: 25 }, (_, i) => i)
    .map((i) => `<path d="M${i} 0V24M0 ${i}H24" />`)
    .join('');
  return `
    <svg class="icon-anatomy-grid" viewBox="-1 -1 26 26" aria-hidden="true">
      <g class="icon-anatomy-lines">${lines}</g>
      <rect class="icon-anatomy-safe" x="2" y="2" width="20" height="20" />
      <g fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${ICONS.ink}</g>
    </svg>`;
}

export default {
  id: 'icones',
  group: 'Componentes',
  title: 'Ícones',
  keywords: 'ícone icon svg símbolo pictograma',
  lead: 'Pequenos desenhos que explicam uma ação num relance. Todos seguem o mesmo traço, arredondado como o fim de uma linha de pena, para parecerem da mesma família.',
  render: () => `
    <section class="doc-section">
      <h2>Biblioteca</h2>
      <p>${Object.keys(ICONS).length} ícones. Clique em um para ver os detalhes e copiar o código.</p>

      <div class="icon-toolbar">
        <input class="icon-search" type="search" placeholder="Buscar: lixeira, seta, fechar…" data-icon-search aria-label="Buscar ícone" />
        ${segmented('size', SIZES, 'lg')}
        ${segmented('weight', WEIGHTS, 'regular')}
      </div>

      <div class="icon-detail" data-icon-detail>
        <div class="icon-detail-preview" data-detail-preview></div>
        <div class="icon-detail-info">
          <strong data-detail-name></strong>
          <code data-detail-tag></code>
          <div class="icon-detail-actions">
            <button class="ds-btn ds-btn--secondary ds-btn--sm" data-copy-tag>${iconSvg('copy')} Copiar &lt;ds-icon&gt;</button>
            <button class="ds-btn ds-btn--ghost ds-btn--sm" data-copy-svg>${iconSvg('copy')} Copiar SVG</button>
          </div>
        </div>
      </div>

      <div data-icon-library>
        ${Object.entries(ICON_CATEGORIES).map(([category, names]) => `
          <div class="icon-category" data-category>
            <h3>${category}</h3>
            <div class="icon-grid">
              ${names.map((name) => `
                <button class="icon-tile" data-icon="${name}" data-keywords="${name} ${KEYWORDS[name] ?? ''}" title="${name}">
                  <ds-icon name="${name}" size="lg"></ds-icon>
                  <span>${name}</span>
                </button>`).join('')}
            </div>
          </div>`).join('')}
        <p class="icon-empty" data-icon-empty hidden>Nenhum ícone encontrado. Que tal pedir um novo?</p>
      </div>
    </section>

    <section class="doc-section">
      <h2>Anatomia do traço</h2>
      <p>Todo ícone é desenhado numa grade de 24×24, com uma margem de respiro de 2 unidades (área tracejada).
      O traço tem 1.75 de espessura e pontas arredondadas. Essa regra comum faz ícones diferentes parecerem um conjunto.</p>
      <div class="icon-anatomy">
        ${anatomy()}
        <ul class="icon-anatomy-rules">
          <li><strong>Grade 24×24</strong><span>Todos do mesmo tamanho, alinhados ao centro.</span></li>
          <li><strong>Margem de 2</strong><span>Nada encosta na borda; o ícone respira.</span></li>
          <li><strong>Traço de 1.75</strong><span>Fino o bastante para ser elegante, forte o bastante para ser lido em 16px.</span></li>
          <li><strong>Pontas redondas</strong><span>Como o fim de uma linha de pena de nanquim.</span></li>
        </ul>
      </div>
    </section>

    <section class="doc-section">
      <h2>Tamanhos e espessuras</h2>
      <p>O ícone herda a cor do texto ao redor. Use a espessura forte em tamanhos pequenos e a fina em tamanhos grandes, para o traço parecer igual.</p>
      <div class="doc-demo icon-scale">
        <span></span>
        ${SIZES.map(([, label]) => `<small>${label}</small>`).join('')}
        ${WEIGHTS.map(([weight, label]) => `
          <small>${label}</small>
          ${SIZES.map(([size]) => `<ds-icon name="heart" size="${size}" weight="${weight}"></ds-icon>`).join('')}`).join('')}
      </div>
    </section>

    <section class="doc-section">
      <h2>Na prática</h2>
      <p>Dentro de botões, o ícone se ajusta sozinho ao tamanho do texto.</p>
      <div class="doc-demo btn-row">
        <button class="ds-btn ds-btn--primary"><ds-icon name="plus"></ds-icon> Novo projeto</button>
        <button class="ds-btn ds-btn--secondary"><ds-icon name="download"></ds-icon> Baixar PDF</button>
        <button class="ds-btn ds-btn--ghost">Ver mais <ds-icon name="arrow-right"></ds-icon></button>
        <button class="ds-btn ds-btn--outline ds-btn--icon" aria-label="Buscar"><ds-icon name="search"></ds-icon></button>
        <span class="icon-inline"><ds-icon name="map-pin" label="Endereço"></ds-icon> Rua do Nanquim, 24</span>
      </div>
      ${doDont(
        ['Acompanhe o ícone de texto sempre que possível', 'Use <code>label</code> quando o ícone sozinho carrega significado', 'Mantenha o mesmo tamanho dentro de um grupo'],
        ['Misturar ícones de outros conjuntos (traços diferentes)', 'Usar o mesmo ícone para ações diferentes', 'Ícone decorativo com <code>label</code> (polui leitores de tela)'],
      )}
      ${code(`
<!-- 1. uma vez por página -->
<script type="module" src="nanquim/src/index.js"></script>

<!-- 2. use em qualquer lugar -->
<ds-icon name="heart"></ds-icon>
<ds-icon name="search" size="lg" weight="forte"></ds-icon>
<ds-icon name="map-pin" label="Endereço"></ds-icon>  <!-- com significado -->`, 'html')}
      <p class="icon-note">Sem JavaScript? Copie o SVG puro de qualquer ícone na biblioteca acima e cole direto no HTML.</p>
    </section>`,

  mount(el) {
    const state = { size: 'lg', weight: 'regular', selected: 'ink' };
    const tiles = [...el.querySelectorAll('.icon-tile')];
    const preview = el.querySelector('[data-detail-preview]');
    const nameEl = el.querySelector('[data-detail-name]');
    const tagEl = el.querySelector('[data-detail-tag]');
    const copyTag = el.querySelector('[data-copy-tag]');
    const copySvg = el.querySelector('[data-copy-svg]');

    const showDetail = () => {
      const tag = dsIconTag(state.selected, state.size, state.weight);
      preview.innerHTML = `<ds-icon name="${state.selected}" weight="${state.weight}"></ds-icon>`;
      nameEl.textContent = state.selected;
      tagEl.textContent = tag;
      copyTag.dataset.copy = tag;
      copySvg.dataset.copy = iconSvg(state.selected, { strokeWidth: STROKES[state.weight] }).replace(' aria-hidden="true"', '');
      copySvg.dataset.copyLabel = 'SVG copiado';
      tiles.forEach((t) => t.setAttribute('aria-pressed', String(t.dataset.icon === state.selected)));
    };

    const applyStyle = () => {
      el.querySelectorAll('.icon-tile ds-icon').forEach((icon) => {
        icon.setAttribute('size', state.size);
        icon.setAttribute('weight', state.weight);
      });
      showDetail();
    };

    el.querySelector('.icon-toolbar').addEventListener('click', (e) => {
      const option = e.target.closest('[data-size], [data-weight]');
      if (!option) return;
      const key = option.dataset.size ? 'size' : 'weight';
      state[key] = option.dataset[key];
      option.parentElement.querySelectorAll('button').forEach((b) => b.setAttribute('aria-checked', String(b === option)));
      applyStyle();
    });

    el.querySelector('[data-icon-library]').addEventListener('click', (e) => {
      const tile = e.target.closest('.icon-tile');
      if (!tile) return;
      state.selected = tile.dataset.icon;
      showDetail();
    });

    el.querySelector('[data-icon-search]').addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();
      let visible = 0;
      tiles.forEach((tile) => {
        const match = !query || tile.dataset.keywords.toLowerCase().includes(query);
        tile.hidden = !match;
        if (match) visible++;
      });
      el.querySelectorAll('[data-category]').forEach((category) => {
        category.hidden = !category.querySelector('.icon-tile:not([hidden])');
      });
      el.querySelector('[data-icon-empty]').hidden = visible > 0;
    });

    showDetail();
  },
};
