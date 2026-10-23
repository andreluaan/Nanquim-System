import { code, doDont, copyModeSwitch, mountCopyModeSwitch } from '../utils.js';

const SPACES = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24];
const RADII = [
  { t: 'xs', use: 'Detalhes' },
  { t: 'sm', use: 'Etiquetas' },
  { t: 'md', use: 'Botões, campos' },
  { t: 'lg', use: 'Cards' },
  { t: 'xl', use: 'Modais' },
  { t: 'full', use: 'Pílulas' },
];
const PAD_OPTIONS = [3, 4, 6, 8];

export default {
  id: 'espacamento',
  group: 'Fundações',
  title: 'Espaço & Cantos',
  keywords: 'espaçamento spacing padding margin gap raio radius borda',
  lead: 'O vazio faz a página respirar. Todo espaço é múltiplo de 4px.',
  render: () => `
    ${copyModeSwitch()}

    <section class="doc-section">
      <h2>Escala de espaços</h2>
      <p>Clique numa barra para copiar.</p>
      <div class="space-scale">
        ${SPACES.map((s) => `
          <button class="space-row" data-copy-token="--ds-space-${s}">
            <code>space-${s}</code>
            <span class="space-bar" style="width: var(--ds-space-${s})"></span>
            <small>${s * 4}px</small>
          </button>`).join('')}
      </div>
    </section>

    <section class="doc-section">
      <h2>Respiro</h2>
      <p>O mesmo card. Mais espaço, mais requinte.</p>
      <div class="space-try">
        <div class="doc-segmented" role="radiogroup" aria-label="Espaço interno">
          ${PAD_OPTIONS.map((p, i) => `<button role="radio" aria-checked="${i === 2}" data-pad="${p}">space-${p}</button>`).join('')}
        </div>
        <div class="space-try-card" data-card style="padding: var(--ds-space-6)">
          <p class="doc-eyebrow">Plano</p>
          <h3>Profissional</h3>
          <p>Mais de um site por mês.</p>
        </div>
      </div>
    </section>

    <section class="doc-section">
      <h2>Cantos</h2>
      <p>Mudam com a opção <em>Cantos</em> do Laboratório, sempre na mesma proporção.</p>
      <div class="radius-grid">
        ${RADII.map((r) => `
          <button class="radius-item" data-copy-token="--ds-radius-${r.t}">
            <span class="radius-box" style="border-radius: var(--ds-radius-${r.t})"></span>
            <code>radius-${r.t}</code>
            <small>${r.use}</small>
          </button>`).join('')}
      </div>
      ${doDont(
        ['Mais espaço entre seções que dentro delas', 'Canto de dentro menor que o de fora'],
        ['Valores soltos (13px, 22px)', 'Misturar reto e muito redondo'],
      )}
      ${code(`
.secao { padding-block: var(--ds-space-20); }
.card  { padding: var(--ds-space-6); border-radius: var(--ds-radius-lg); }
.card button { border-radius: var(--ds-radius-md); } /* menor que o pai */`)}
    </section>`,

  mount(el) {
    mountCopyModeSwitch(el, '--ds-space-4');
    const card = el.querySelector('[data-card]');
    el.querySelector('.space-try .doc-segmented').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-pad]');
      if (!btn) return;
      el.querySelectorAll('[data-pad]').forEach((b) => b.setAttribute('aria-checked', String(b === btn)));
      card.style.padding = `var(--ds-space-${btn.dataset.pad})`;
    });
  },
};
