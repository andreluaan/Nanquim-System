import { code, doDont, escapeHtml } from '../utils.js';

const TONES = [
  ['neutral', 'Neutro', 'Categorias e tags.'],
  ['accent', 'Destaque', '"Novo", "Recomendado".'],
  ['success', 'Sucesso', '"Pago", "Online".'],
  ['warning', 'Atenção', '"Pendente", "Expira logo".'],
  ['danger', 'Perigo', '"Atrasado", "Erro".'],
  ['info', 'Info', '"Beta", "Atualizado".'],
];

const APPEARANCES = [['soft', 'Suave'], ['solid', 'Sólida'], ['outline', 'Contorno']];

const PLAYGROUND = {
  tone: TONES.map(([id, name]) => [id, name]),
  appearance: APPEARANCES,
  size: [['md', 'Médio'], ['sm', 'Pequeno']],
  extra: [['none', 'Nada'], ['dot', 'Ponto'], ['icon', 'Ícone']],
  shape: [['default', 'Padrão'], ['pill', 'Pílula']],
};

const LABELS = { tone: 'Tom', appearance: 'Aparência', size: 'Tamanho', extra: 'Extra', shape: 'Formato' };

const initialState = { tone: 'success', appearance: 'soft', size: 'md', extra: 'dot', shape: 'pill', label: 'Online' };

function badgeHtml({ tone, appearance, size, extra, shape, label }) {
  const classes = ['ds-badge'];
  if (tone !== 'neutral') classes.push(`ds-badge--${tone}`);
  if (appearance !== 'soft') classes.push(`ds-badge--${appearance}`);
  if (size === 'sm') classes.push('ds-badge--sm');
  if (shape === 'pill') classes.push('ds-badge--pill');
  if (extra === 'dot') classes.push('ds-badge--dot');
  const iconTag = extra === 'icon' ? '<ds-icon name="check"></ds-icon> ' : '';
  return `<span class="${classes.join(' ')}">${iconTag}${escapeHtml(label)}</span>`;
}

function segmented(key, current) {
  return `
    <div class="btn-play-field">
      <span>${LABELS[key]}</span>
      <div class="doc-segmented" role="radiogroup" aria-label="${LABELS[key]}">
        ${PLAYGROUND[key].map(([id, name]) => `<button role="radio" aria-checked="${id === current}" data-key="${key}" data-value="${id}">${name}</button>`).join('')}
      </div>
    </div>`;
}

const toneClass = (tone) => (tone === 'neutral' ? '' : ` ds-badge--${tone}`);
const appearanceClass = (appearance) => (appearance === 'soft' ? '' : ` ds-badge--${appearance}`);

export default {
  id: 'badges',
  group: 'Componentes',
  title: 'Badges',
  keywords: 'badge etiqueta tag selo status chip rótulo',
  lead: 'Etiquetas de estado ou categoria. A cor reforça; quem fala é o texto.',
  render: () => `
    <section class="doc-section">
      <h2>Monte o seu</h2>
      <p>Combine e copie.</p>
      <div class="btn-play">
        <div class="btn-play-controls">
          ${Object.keys(PLAYGROUND).map((key) => segmented(key, initialState[key])).join('')}
          <label class="btn-play-field">
            <span>Texto</span>
            <input class="btn-play-input" data-label value="${initialState.label}" />
          </label>
        </div>
        <div class="btn-play-preview" data-preview></div>
        <div class="doc-code btn-play-code">
          <div class="doc-code-head"><span>html</span>
            <button class="doc-code-copy" data-code-copy>Copiar</button>
          </div>
          <pre><code data-code></code></pre>
        </div>
      </div>
    </section>

    <section class="doc-section">
      <h2>Tons e aparências</h2>
      <p>Seis tons, três aparências. Suave é o padrão.</p>
      <div class="badge-matrix">
        <span></span>
        ${APPEARANCES.map(([, name]) => `<small>${name}</small>`).join('')}
        <small>Quando usar</small>
        ${TONES.map(([tone, name, use]) => `
          <strong>${name}</strong>
          ${APPEARANCES.map(([appearance]) => `
            <span class="ds-badge${toneClass(tone)}${appearanceClass(appearance)}" data-copy="ds-badge${toneClass(tone)}${appearanceClass(appearance)}" data-copy-label="Classes copiadas">${name}</span>`).join('')}
          <p>${use}</p>`).join('')}
      </div>
    </section>

    <section class="doc-section">
      <h2>Na prática</h2>
      <p>Sempre ao lado do que descrevem.</p>
      <div class="doc-demo badge-examples">
        <table class="badge-table">
          <thead><tr><th>Pedido</th><th>Cliente</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td>#1042</td><td>Ateliê Sumi</td><td><span class="ds-badge ds-badge--success ds-badge--dot">Pago</span></td></tr>
            <tr><td>#1041</td><td>Papelaria Traço</td><td><span class="ds-badge ds-badge--warning ds-badge--dot">Pendente</span></td></tr>
            <tr><td>#1040</td><td>Estúdio Pena</td><td><span class="ds-badge ds-badge--danger ds-badge--dot">Atrasado</span></td></tr>
          </tbody>
        </table>
        <div class="badge-tags">
          <span class="ds-badge ds-badge--pill">Design</span>
          <span class="ds-badge ds-badge--pill">Front-end</span>
          <span class="ds-badge ds-badge--pill">Acessibilidade</span>
          <span class="ds-badge ds-badge--accent ds-badge--solid ds-badge--pill"><ds-icon name="star"></ds-icon> Destaque</span>
          <span class="ds-badge ds-badge--info ds-badge--outline ds-badge--sm">Beta</span>
        </div>
      </div>
      ${doDont(
        ['Uma ou duas palavras', 'Um significado por tom'],
        ['Frases inteiras', 'Usar como botão'],
      )}
      ${code(`
<span class="ds-badge">Design</span>
<span class="ds-badge ds-badge--success ds-badge--dot">Pago</span>
<span class="ds-badge ds-badge--accent ds-badge--solid ds-badge--pill">Novo</span>
<span class="ds-badge ds-badge--info ds-badge--outline ds-badge--sm">Beta</span>`, 'html')}
    </section>`,

  mount(el) {
    const state = { ...initialState };
    const preview = el.querySelector('[data-preview]');
    const codeEl = el.querySelector('[data-code]');
    const copyBtn = el.querySelector('[data-code-copy]');

    const update = () => {
      const markup = badgeHtml(state);
      preview.innerHTML = markup;
      codeEl.textContent = markup;
      copyBtn.dataset.copy = markup;
    };

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

    update();
  },
};
