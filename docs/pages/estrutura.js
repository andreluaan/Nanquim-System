import { code, doDont } from '../utils.js';
import { frame, mountSiteDemos } from '../site-kit.js';

const PARTS = [
  ['Contêiner', '<code>.ds-container</code>: limita a largura. <code>--narrow</code> para textos.'],
  ['Seção', '<code>.ds-section</code>: uma faixa com respiro. <code>--alt</code> troca o fundo.'],
  ['Cabeçalho', '<code>.ds-section__header</code>: sobretítulo, título e apoio.'],
  ['Grade', '<code>.ds-grid</code>: quantas colunas couberem, com <code>--grid-min</code>.'],
];

const blocks = (n) => Array.from({ length: n }, (_, i) => `<div class="estrutura-block">Coluna ${i + 1}</div>`).join('');

const gridDemo = () => `
  <section class="ds-section ds-section--grid">
    <div class="ds-container">
      <header class="ds-section__header">
        <p class="ds-section__eyebrow">Fundo quadriculado</p>
        <h2 class="ds-section__title">Papel de rascunho atrás do conteúdo</h2>
      </header>
      <div class="ds-grid">${blocks(3)}</div>
    </div>
  </section>`;

const splitDemo = () => `
  <section class="ds-section">
    <div class="ds-container">
      <header class="ds-section__header ds-section__header--split">
        <p class="ds-section__eyebrow">Filosofia</p>
        <h2 class="ds-section__title">Você não precisa acertar de primeira.</h2>
        <div class="ds-section__aside">
          <p>Do primeiro rascunho à marca no ar.</p>
          <a class="ds-btn ds-btn--primary ds-btn--sm" href="#">Ver etapas</a>
        </div>
      </header>
    </div>
  </section>`;

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
  keywords: 'estrutura layout contêiner container seção grade grid colunas largura responsivo container queries quadriculado papel cabeçalho dividido split',
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
      <h2>Fundo quadriculado</h2>
      <p><code>ds-section--grid</code>: papel quadriculado no fundo; o tamanho vem de <code>--grid-cell</code>.</p>
      ${frame({ content: gridDemo() })}
      ${code(`
<section class="ds-section ds-section--grid" style="--grid-cell: 3rem">
  <div class="ds-container">…</div>
</section>`, 'html')}
    </section>

    <section class="doc-section">
      <h2>Cabeçalho dividido</h2>
      <p><code>ds-section__header--split</code>: título à esquerda, texto e ação à direita.</p>
      ${frame({ content: splitDemo() })}
      ${code(`
<header class="ds-section__header ds-section__header--split">
  <p class="ds-section__eyebrow">Filosofia</p>
  <h2 class="ds-section__title">Você não precisa acertar de primeira.</h2>
  <div class="ds-section__aside">
    <p>Do primeiro rascunho à marca no ar.</p>
    <a class="ds-btn ds-btn--primary ds-btn--sm" href="/etapas">Ver etapas</a>
  </div>
</header>`, 'html')}
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
