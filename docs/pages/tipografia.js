import { code, doDont, copyModeSwitch, mountCopyModeSwitch } from '../utils.js';

const SIZES = [
  { t: '6xl', px: 60, use: 'Hero', display: true },
  { t: '5xl', px: 48, use: 'Título de página', display: true },
  { t: '4xl', px: 36, use: 'Seção grande', display: true },
  { t: '3xl', px: 30, use: 'Seção', display: true },
  { t: '2xl', px: 24, use: 'Subtítulo', display: true },
  { t: 'xl', px: 20, use: 'Título de card' },
  { t: 'lg', px: 18, use: 'Abertura' },
  { t: 'md', px: 16, use: 'Texto corrido' },
  { t: 'sm', px: 14, use: 'Botões e rótulos' },
  { t: 'xs', px: 12, use: 'Legendas' },
];

const DEFAULT_SAMPLE = 'Uma tinta, muitas marcas';

export default {
  id: 'tipografia',
  group: 'Fundações',
  title: 'Tipografia',
  keywords: 'fonte font texto tamanho type',
  lead: 'Uma fonte com voz para títulos, outra calma para ler. Tamanhos em escala fixa.',
  render: () => `
    ${copyModeSwitch()}

    <section class="doc-section">
      <h2>O par de fontes</h2>
      <p>Troque o par no Laboratório para comparar.</p>
      <div class="type-pair">
        <div class="type-pair-item">
          <span class="type-pair-aa" style="font-family: var(--ds-font-display)">Aa</span>
          <p class="type-pair-role">Títulos</p>
          <code data-copy-token="--ds-font-display">--ds-font-display</code>
        </div>
        <div class="type-pair-item">
          <span class="type-pair-aa" style="font-family: var(--ds-font-body)">Aa</span>
          <p class="type-pair-role">Texto</p>
          <code data-copy-token="--ds-font-body">--ds-font-body</code>
        </div>
        <div class="type-pair-item">
          <span class="type-pair-aa" style="font-family: var(--ds-font-mono)">{ }</span>
          <p class="type-pair-role">Código</p>
          <code data-copy-token="--ds-font-mono">--ds-font-mono</code>
        </div>
      </div>
    </section>

    <section class="doc-section">
      <h2>Escala de tamanhos</h2>
      <p>Escreva para testar o seu texto.</p>
      <input class="type-input" data-sample value="${DEFAULT_SAMPLE}" aria-label="Texto de exemplo" />
      <div class="type-scale">
        ${SIZES.map((s) => `
          <div class="type-row" data-copy-token="--ds-text-${s.t}">
            <div class="type-row-meta">
              <code>${s.t}</code>
              <span>${s.px}px</span>
              <small>${s.use}</small>
            </div>
            <p class="type-row-sample" data-sample-out style="font-size: var(--ds-text-${s.t}); ${s.display ? 'font-family: var(--ds-font-display); letter-spacing: var(--ds-tracking-tight); line-height: var(--ds-leading-tight);' : ''}">${DEFAULT_SAMPLE}</p>
          </div>`).join('')}
      </div>
    </section>

    <section class="doc-section">
      <h2>Pesos</h2>
      <div class="type-weights">
        ${[['regular', 400], ['medium', 500], ['semibold', 600], ['bold', 700]].map(([n, w]) => `
          <div data-copy-token="--ds-weight-${n}">
            <span style="font-weight:${w}">Aa</span><small>${n} · ${w}</small>
          </div>`).join('')}
      </div>
    </section>

    <section class="doc-section">
      <h2>Tudo junto</h2>
      <div class="doc-demo type-specimen">
        <p class="doc-eyebrow">Estudo de caso</p>
        <h2>Um site que abre em um segundo</h2>
        <p class="type-specimen-lead">Como a vitrine de uma loja dobrou as vendas em três meses.</p>
        <p>O texto corrido usa a fonte de leitura, com linhas curtas e bom espaço entre elas. Cansa menos os olhos.</p>
      </div>
      ${doDont(
        ['Linhas de até ~70 caracteres', 'No máximo 3 tamanhos por tela'],
        ['Parágrafo na fonte de título', 'Tamanhos fora da escala (17px)'],
      )}
      ${code(`
h1 {
  font-family: var(--ds-font-display);
  font-size: var(--ds-text-5xl);
  letter-spacing: var(--ds-tracking-tight);
}
p { font-size: var(--ds-text-md); line-height: var(--ds-leading-normal); }`)}
    </section>`,

  mount(el) {
    mountCopyModeSwitch(el, '--ds-text-md');
    const input = el.querySelector('[data-sample]');
    const outs = el.querySelectorAll('[data-sample-out]');
    const onInput = () => outs.forEach((o) => (o.textContent = input.value || DEFAULT_SAMPLE));
    input.addEventListener('input', onInput);
    input.addEventListener('click', (e) => e.stopPropagation());
  },
};
