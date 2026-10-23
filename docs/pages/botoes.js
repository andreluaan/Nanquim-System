import { code, doDont, escapeHtml } from '../utils.js';
import { iconSvg as icon } from '../../src/icons/icons.js';

const VARIANTS = [
  { id: 'primary', name: 'Principal', use: 'A ação da tela. Uma por área.' },
  { id: 'secondary', name: 'Secundário', use: 'Importante, mas não o foco.' },
  { id: 'outline', name: 'Contorno', use: 'Mais leve. Bom sobre imagem.' },
  { id: 'ghost', name: 'Fantasma', use: 'Discreto: "Cancelar", ferramentas.' },
  { id: 'soft', name: 'Suave', use: 'A marca sem gritar: filtros.' },
  { id: 'danger', name: 'Perigo', use: 'Sem volta. Peça confirmação.' },
  { id: 'link', name: 'Link', use: 'Dentro do texto: "Saiba mais".' },
];

const SIZES = [
  { id: 'sm', name: 'Pequeno', px: 32 },
  { id: 'md', name: 'Médio', px: 40 },
  { id: 'lg', name: 'Grande', px: 48 },
];

const PLAYGROUND_OPTIONS = {
  variant: VARIANTS.map((v) => [v.id, v.name]),
  size: SIZES.map((s) => [s.id, s.name]),
  icon: [['none', 'Sem ícone'], ['left', 'Esquerda'], ['right', 'Direita'], ['only', 'Só ícone']],
  state: [['normal', 'Normal'], ['loading', 'Carregando'], ['disabled', 'Desativado']],
};

const PLAYGROUND_LABELS = { variant: 'Estilo', size: 'Tamanho', icon: 'Ícone', state: 'Estado' };

function buttonHtml({ variant, size, icon: iconPosition, state, label }, { forCode = false } = {}) {
  const classes = ['ds-btn', `ds-btn--${variant}`];
  if (size !== 'md') classes.push(`ds-btn--${size}`);
  if (iconPosition === 'only') classes.push('ds-btn--icon');

  const attrs = [`class="${classes.join(' ')}"`];
  if (iconPosition === 'only') attrs.push(`aria-label="${escapeHtml(label)}"`);
  if (state === 'loading') attrs.push('aria-busy="true"');
  if (state === 'disabled') attrs.push('disabled');

  const svg = forCode ? '<svg>…</svg>' : icon(iconPosition === 'right' ? 'arrow-right' : 'plus');
  const text = escapeHtml(label);
  const content = {
    none: text,
    left: `${svg} ${text}`,
    right: `${text} ${svg}`,
    only: svg,
  }[iconPosition];

  return `<button ${attrs.join(' ')}>${content}</button>`;
}

function segmented(key, current) {
  return `
    <div class="btn-play-field">
      <span>${PLAYGROUND_LABELS[key]}</span>
      <div class="doc-segmented" role="radiogroup" aria-label="${PLAYGROUND_LABELS[key]}">
        ${PLAYGROUND_OPTIONS[key]
          .map(([id, name]) => `<button role="radio" aria-checked="${id === current}" data-key="${key}" data-value="${id}">${name}</button>`)
          .join('')}
      </div>
    </div>`;
}

const initialState = { variant: 'primary', size: 'md', icon: 'none', state: 'normal', label: 'Começar agora' };

export default {
  id: 'botoes',
  group: 'Componentes',
  title: 'Botões',
  keywords: 'botão button cta ação clique',
  lead: 'Convidam a agir. Quanto mais cheio, mais importante.',
  render: () => `
    <section class="doc-section">
      <h2>Monte o seu</h2>
      <p>Escolha e copie.</p>
      <div class="btn-play">
        <div class="btn-play-controls">
          ${Object.keys(PLAYGROUND_OPTIONS).map((key) => segmented(key, initialState[key])).join('')}
          <label class="btn-play-field">
            <span>Texto</span>
            <input class="btn-play-input" data-label value="${initialState.label}" />
          </label>
        </div>
        <div class="btn-play-preview" data-preview>${buttonHtml(initialState)}</div>
        <div class="doc-code btn-play-code">
          <div class="doc-code-head"><span>html</span>
            <button class="doc-code-copy" data-code-copy>Copiar</button>
          </div>
          <pre><code data-code>${escapeHtml(buttonHtml(initialState, { forCode: true }))}</code></pre>
        </div>
      </div>
    </section>

    <section class="doc-section">
      <h2>Estilos</h2>
      <p>Do mais forte ao mais discreto. Teste com o mouse e com <kbd>Tab</kbd>.</p>
      <div class="btn-variants">
        ${VARIANTS.map((v) => `
          <div class="btn-variant">
            <div class="btn-variant-demo">
              <button class="ds-btn ds-btn--${v.id}">${v.name}</button>
            </div>
            <div class="btn-variant-info">
              <strong>${v.name}</strong>
              <p>${v.use}</p>
              <code data-copy="ds-btn ds-btn--${v.id}" data-copy-label="Classes copiadas">.ds-btn--${v.id}</code>
            </div>
          </div>`).join('')}
      </div>
    </section>

    <section class="doc-section">
      <h2>Tamanhos</h2>
      <p>Médio é o padrão. Pequeno em tabelas, grande na chamada principal.</p>
      <div class="doc-demo btn-row">
        ${SIZES.map((s) => `<button class="ds-btn ds-btn--primary${s.id === 'md' ? '' : ` ds-btn--${s.id}`}">${s.name} · ${s.px}px</button>`).join('')}
      </div>
    </section>

    <section class="doc-section">
      <h2>Com ícones</h2>
      <p>À esquerda descreve, à direita aponta. Só ícone pede <code>aria-label</code>.</p>
      <div class="doc-demo btn-row">
        <button class="ds-btn ds-btn--primary">${icon('plus')} Novo projeto</button>
        <button class="ds-btn ds-btn--secondary">${icon('download')} Baixar</button>
        <button class="ds-btn ds-btn--ghost">Continuar ${icon('arrow-right')}</button>
        <span class="btn-divider" aria-hidden="true"></span>
        <button class="ds-btn ds-btn--ghost ds-btn--icon" aria-label="Curtir">${icon('heart')}</button>
        <button class="ds-btn ds-btn--outline ds-btn--icon" aria-label="Compartilhar">${icon('share')}</button>
        <button class="ds-btn ds-btn--soft ds-btn--icon" aria-label="Configurações">${icon('sliders')}</button>
      </div>
    </section>

    <section class="doc-section">
      <h2>Estados</h2>
      <p>Clique em "Salvar": carrega sem mudar de tamanho.</p>
      <div class="doc-demo btn-row">
        <button class="ds-btn ds-btn--primary" data-fake-save>${icon('check')} Salvar</button>
        <button class="ds-btn ds-btn--secondary" aria-busy="true">Carregando</button>
        <button class="ds-btn ds-btn--primary" disabled>Desativado</button>
      </div>
    </section>

    <section class="doc-section">
      <h2>Grupo</h2>
      <p>Opções lado a lado.</p>
      <div class="doc-demo btn-row">
        <div class="ds-btn-group" role="group" aria-label="Período">
          <button class="ds-btn ds-btn--outline">Dia</button>
          <button class="ds-btn ds-btn--outline">Semana</button>
          <button class="ds-btn ds-btn--outline">Mês</button>
        </div>
        <div class="ds-btn-group" role="group" aria-label="Ações">
          <button class="ds-btn ds-btn--secondary ds-btn--icon" aria-label="Editar">${icon('edit')}</button>
          <button class="ds-btn ds-btn--secondary ds-btn--icon" aria-label="Compartilhar">${icon('share')}</button>
          <button class="ds-btn ds-btn--secondary ds-btn--icon" aria-label="Excluir">${icon('trash')}</button>
        </div>
      </div>
    </section>

    <section class="doc-section">
      <h2>Hierarquia</h2>
      <p>Um principal, o resto discreto.</p>
      <div class="btn-example">
        <div>
          <strong>Excluir este projeto?</strong>
          <p>Todos os arquivos serão apagados. Essa ação não pode ser desfeita.</p>
        </div>
        <div class="btn-example-actions">
          <button class="ds-btn ds-btn--ghost">Cancelar</button>
          <button class="ds-btn ds-btn--danger">${icon('trash')} Excluir projeto</button>
        </div>
      </div>
      ${doDont(
        ['Verbos claros: "Salvar", não "OK"', 'Um principal por área'],
        ['Principais competindo', 'Só ícone sem <code>aria-label</code>'],
      )}
      ${code(`
<button class="ds-btn ds-btn--primary">Começar agora</button>
<button class="ds-btn ds-btn--ghost ds-btn--sm">Cancelar</button>
<a class="ds-btn ds-btn--link" href="/sobre">Saiba mais</a>
<button class="ds-btn ds-btn--primary" aria-busy="true">Enviando</button>`, 'html')}
    </section>`,

  mount(el) {
    const state = { ...initialState };
    const preview = el.querySelector('[data-preview]');
    const codeEl = el.querySelector('[data-code]');
    const copyBtn = el.querySelector('[data-code-copy]');

    const update = () => {
      preview.innerHTML = buttonHtml(state);
      const markup = buttonHtml(state, { forCode: true });
      codeEl.textContent = markup;
      copyBtn.dataset.copy = markup;
    };
    update();

    el.querySelector('.btn-play-controls').addEventListener('click', (e) => {
      const option = e.target.closest('[data-key]');
      if (!option) return;
      state[option.dataset.key] = option.dataset.value;
      el.querySelectorAll(`[data-key="${option.dataset.key}"]`).forEach((b) => b.setAttribute('aria-checked', String(b === option)));
      update();
    });

    el.querySelector('[data-label]').addEventListener('input', (e) => {
      state.label = e.target.value || ' ';
      update();
    });

    const saveBtn = el.querySelector('[data-fake-save]');
    saveBtn.addEventListener('click', () => {
      saveBtn.setAttribute('aria-busy', 'true');
      setTimeout(() => saveBtn.removeAttribute('aria-busy'), 1500);
    });
  },
};
