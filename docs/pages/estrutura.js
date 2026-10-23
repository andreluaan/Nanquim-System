import { code, doDont } from '../utils.js';
import { frame, mountSiteDemos } from '../site-kit.js';

const PARTS = [
  ['Contêiner', '<code>.ds-container</code>: limita a largura do conteúdo e garante respiro nas laterais. <code>--narrow</code> para textos longos.'],
  ['Seção', '<code>.ds-section</code>: uma faixa da página com espaço em cima e embaixo. <code>--alt</code> troca o fundo para separar uma da outra.'],
  ['Cabeçalho', '<code>.ds-section__header</code>: sobretítulo, título e texto de apoio. <code>--center</code> centraliza.'],
  ['Grade', '<code>.ds-grid</code>: quantas colunas couberem, cada uma com pelo menos <code>--grid-min</code> de largura.'],
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
  lead: 'Toda seção de site é montada sobre as mesmas três peças: um contêiner que segura a largura, uma seção que dá o respiro e uma grade que arruma as colunas.',
  render: () => `
    <section class="doc-section">
      <h2>As três peças</h2>
      <p>Troque a largura da prévia: a grade passa de 3 colunas para 1 sozinha, sem nenhuma regra extra.</p>
      ${frame({ content: demo() })}
      <ol class="card-anatomy-list estrutura-parts">
        ${PARTS.map(([name, text]) => `<li><strong>${name}</strong><span>${text}</span></li>`).join('')}
      </ol>
    </section>

    <section class="doc-section">
      <h2>Responde ao espaço, não à tela</h2>
      <p>As seções usam <strong>container queries</strong>: em vez de perguntar "qual é o tamanho da tela?", cada uma pergunta "quanto espaço eu tenho?". Por isso a mesma seção funciona numa página inteira, numa coluna lateral ou dentro de uma prévia como as desta documentação.</p>
      ${doDont(
        ['Uma <code>ds-section</code> por assunto', 'Alternar <code>--alt</code> para dar ritmo à página', 'Ajustar <code>--grid-min</code> em vez de fixar o número de colunas'],
        ['Seção sem contêiner (o texto encosta na borda)', 'Duas seções seguidas com o mesmo fundo e sem título', 'Grade com colunas de largura fixa em px'],
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
