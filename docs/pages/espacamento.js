import { code, doDont } from '../utils.js';

const SPACES = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24];
const RADII = [
  { t: 'xs', use: 'Detalhes mínimos' },
  { t: 'sm', use: 'Etiquetas, checkboxes' },
  { t: 'md', use: 'Botões, campos' },
  { t: 'lg', use: 'Cards' },
  { t: 'xl', use: 'Modais, seções' },
  { t: 'full', use: 'Pílulas, avatares' },
];
const PAD_OPTIONS = [3, 4, 6, 8];

export default {
  id: 'espacamento',
  group: 'Fundações',
  title: 'Espaço & Cantos',
  keywords: 'espaçamento spacing padding margin gap raio radius borda',
  lead: 'Espaço vazio não é desperdício: é o que faz uma página respirar. Todos os espaços são múltiplos de 4px, o que dá um ritmo consistente.',
  render: () => `
    <section class="doc-section">
      <h2>Escala de espaços</h2>
      <p>Clique numa barra para copiar o token.</p>
      <div class="space-scale">
        ${SPACES.map((s) => `
          <button class="space-row" data-copy="var(--ds-space-${s})" data-copy-label="Token copiado">
            <code>space-${s}</code>
            <span class="space-bar" style="width: var(--ds-space-${s})"></span>
            <small>${s * 4}px</small>
          </button>`).join('')}
      </div>
    </section>

    <section class="doc-section">
      <h2>Experimente: respiro de um card</h2>
      <p>O mesmo card com espaçamentos internos diferentes. Repare como o maior parece mais "premium".</p>
      <div class="space-try">
        <div class="doc-segmented" role="radiogroup" aria-label="Espaço interno">
          ${PAD_OPTIONS.map((p, i) => `<button role="radio" aria-checked="${i === 2}" data-pad="${p}">space-${p}</button>`).join('')}
        </div>
        <div class="space-try-card" data-card style="padding: var(--ds-space-6)">
          <p class="doc-eyebrow">Plano</p>
          <h3>Profissional</h3>
          <p>Para quem precisa de mais de um site por mês.</p>
        </div>
      </div>
    </section>

    <section class="doc-section">
      <h2>Cantos</h2>
      <p>O "tamanho do arredondado" muda junto com a opção <em>Cantos</em> do Laboratório. Os componentes mantêm a proporção entre si.</p>
      <div class="radius-grid">
        ${RADII.map((r) => `
          <button class="radius-item" data-copy="var(--ds-radius-${r.t})" data-copy-label="Token copiado">
            <span class="radius-box" style="border-radius: var(--ds-radius-${r.t})"></span>
            <code>radius-${r.t}</code>
            <small>${r.use}</small>
          </button>`).join('')}
      </div>
      ${doDont(
        ['Espaço maior entre seções do que dentro delas', 'Elementos dentro de outro com canto menor que o "pai"'],
        ['Valores soltos como 13px ou 22px', 'Misturar cantos retos e muito redondos na mesma tela'],
      )}
      ${code(`
.secao { padding-block: var(--ds-space-20); }
.card  { padding: var(--ds-space-6); border-radius: var(--ds-radius-lg); }
.card button { border-radius: var(--ds-radius-md); } /* menor que o pai */`)}
    </section>`,

  mount(el) {
    const card = el.querySelector('[data-card]');
    el.querySelector('.doc-segmented').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-pad]');
      if (!btn) return;
      el.querySelectorAll('[data-pad]').forEach((b) => b.setAttribute('aria-checked', String(b === btn)));
      card.style.padding = `var(--ds-space-${btn.dataset.pad})`;
    });
  },
};
