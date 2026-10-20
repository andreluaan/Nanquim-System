import { code, doDont } from '../utils.js';

const SIZES = [
  { t: '6xl', px: 60, use: 'Hero de landing page', display: true },
  { t: '5xl', px: 48, use: 'Título de página', display: true },
  { t: '4xl', px: 36, use: 'Título de seção grande', display: true },
  { t: '3xl', px: 30, use: 'Título de seção', display: true },
  { t: '2xl', px: 24, use: 'Subtítulo', display: true },
  { t: 'xl', px: 20, use: 'Título de card' },
  { t: 'lg', px: 18, use: 'Texto de abertura (lead)' },
  { t: 'md', px: 16, use: 'Texto corrido: o padrão' },
  { t: 'sm', px: 14, use: 'Botões, menus, rótulos' },
  { t: 'xs', px: 12, use: 'Legendas e metadados' },
];

const DEFAULT_SAMPLE = 'Design que se adapta a cada marca';

export default {
  id: 'tipografia',
  group: 'Fundações',
  title: 'Tipografia',
  keywords: 'fonte font texto tamanho type',
  lead: 'Duas famílias: uma com personalidade para títulos e uma neutra para leitura. Tamanhos numa escala fixa, para o texto ter ritmo.',
  render: () => `
    <section class="doc-section">
      <h2>O par de fontes</h2>
      <p>Troque o par no Laboratório e compare. A de títulos dá a "voz" da marca; a de texto precisa ser confortável por parágrafos inteiros.</p>
      <div class="type-pair">
        <div class="type-pair-item">
          <span class="type-pair-aa" style="font-family: var(--ds-font-display)">Aa</span>
          <p class="type-pair-role">Títulos</p>
          <code data-copy="var(--ds-font-display)" data-copy-label="Token copiado">--ds-font-display</code>
        </div>
        <div class="type-pair-item">
          <span class="type-pair-aa" style="font-family: var(--ds-font-body)">Aa</span>
          <p class="type-pair-role">Texto</p>
          <code data-copy="var(--ds-font-body)" data-copy-label="Token copiado">--ds-font-body</code>
        </div>
        <div class="type-pair-item">
          <span class="type-pair-aa" style="font-family: var(--ds-font-mono)">{ }</span>
          <p class="type-pair-role">Código</p>
          <code data-copy="var(--ds-font-mono)" data-copy-label="Token copiado">--ds-font-mono</code>
        </div>
      </div>
    </section>

    <section class="doc-section">
      <h2>Escala de tamanhos</h2>
      <p>Escreva o que quiser na caixa abaixo para ver seu próprio texto em todos os tamanhos.</p>
      <input class="type-input" data-sample value="${DEFAULT_SAMPLE}" aria-label="Texto de exemplo" />
      <div class="type-scale">
        ${SIZES.map((s) => `
          <div class="type-row" data-copy="var(--ds-text-${s.t})" data-copy-label="Token copiado">
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
          <div data-copy="var(--ds-weight-${n})" data-copy-label="Token copiado">
            <span style="font-weight:${w}">Aa</span><small>${n} · ${w}</small>
          </div>`).join('')}
      </div>
    </section>

    <section class="doc-section">
      <h2>Tudo junto</h2>
      <div class="doc-demo type-specimen">
        <p class="doc-eyebrow">Estudo de caso</p>
        <h2>Um site que carrega em menos de um segundo</h2>
        <p class="type-specimen-lead">Como reconstruímos a vitrine de uma loja local e dobramos as vendas online em três meses.</p>
        <p>O texto corrido usa a fonte de leitura, com linhas de no máximo ~70 caracteres e espaço generoso entre elas. Isso cansa menos os olhos, principalmente no fundo escuro.</p>
      </div>
      ${doDont(
        ['Limitar linhas a ~65–75 caracteres', 'Usar no máximo 3 tamanhos por tela', 'Títulos com espaçamento entre letras levemente negativo'],
        ['Texto corrido com a fonte de títulos', 'Usar tamanhos fora da escala (ex.: 17px)', 'Parágrafos inteiros em negrito'],
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
    const input = el.querySelector('[data-sample]');
    const outs = el.querySelectorAll('[data-sample-out]');
    const onInput = () => outs.forEach((o) => (o.textContent = input.value || DEFAULT_SAMPLE));
    input.addEventListener('input', onInput);
    input.addEventListener('click', (e) => e.stopPropagation());
  },
};
