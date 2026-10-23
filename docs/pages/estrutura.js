import { code, doDont } from '../utils.js';
import { frame, mountSiteDemos } from '../site-kit.js';

const PARTS = [
  ['Contêiner', '<code>.ds-container</code>: limita a largura. <code>--narrow</code> para textos.'],
  ['Seção', '<code>.ds-section</code>: uma faixa com respiro. <code>--alt</code> troca o fundo.'],
  ['Cabeçalho', '<code>.ds-section__header</code>: sobretítulo, título e apoio.'],
  ['Grade', '<code>.ds-grid</code>: quantas colunas couberem, com <code>--grid-min</code>.'],
];

const blocks = (n) => Array.from({ length: n }, (_, i) => `<div class="estrutura-block">Coluna ${i + 1}</div>`).join('');

const demo = () => `
  <section class="ds-section">
    <div class="ds-container">
      <header class="ds-section__header">
        <p class="ds-section__eyebrow">Sobretítulo</p>
        <h2 class="ds-section__title">O título diz o benefício</h2>
        <p class="ds-section__lead">Um texto curto de apoio, de uma ou duas linhas.</p>
      </header>
      <div class="ds-grid">${blocks(3)}</div>
    </div>
  </section>
  <section class="ds-section ds-section--alt ds-section--compact">
    <div class="ds-container">
      <header class="ds-section__header ds-section__header--center">
        <p class="ds-section__eyebrow">Seção alternada</p>
        <h2 class="ds-section__title">Fundo diferente, mesma estrutura</h2>
      </header>
      <div class="ds-grid" style="--grid-min: 10rem">${blocks(4)}</div>
    </div>
  </section>`;

export default {
  id: 'estrutura',
  group: 'Seções de site',
  title: 'Estrutura da página',
  keywords: 'estrutura layout contêiner container seção grade grid colunas largura responsivo container queries',
  lead: 'Três peças por trás de toda seção: contêiner, seção e grade.',
  render: () => `
    <section class="doc-section">
      <h2>As três peças</h2>
      <p>Mude a largura: a grade se ajeita sozinha.</p>
      ${frame({ content: demo() })}
      <ol class="card-anatomy-list estrutura-parts">
        ${PARTS.map(([name, text]) => `<li><strong>${name}</strong><span>${text}</span></li>`).join('')}
      </ol>
    </section>

    <section class="doc-section">
      <h2>Responde ao espaço</h2>
      <p>Com <strong>container queries</strong>, cada seção olha o espaço que tem, não a tela. Funciona igual numa página ou numa coluna.</p>
      ${doDont(
        ['Uma seção por assunto', 'Alternar <code>--alt</code> para dar ritmo'],
        ['Texto encostado na borda', 'Colunas fixas em px'],
      )}
      ${code(`
<section class="ds-section ds-section--alt">
  <div class="ds-container">
    <header class="ds-section__header ds-section__header--center">
      <p class="ds-section__eyebrow">O que fazemos</p>
      <h2 class="ds-section__title">Tudo que a sua marca precisa</h2>
      <p class="ds-section__lead">Texto de apoio.</p>
    </header>
    <div class="ds-grid" style="--grid-min: 14rem">…</div>
  </div>
</section>`, 'html')}
    </section>`,
  mount: (el) => mountSiteDemos(el),
};
