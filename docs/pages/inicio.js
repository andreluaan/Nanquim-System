import { code } from '../utils.js';

const GROUPS = [
  ['cores', 'Fundações', 'Cores, tipografia, espaço e cantos, elevação e movimento: as decisões de que todo o resto depende.'],
  ['botoes', 'Componentes', 'Botões, ícones, badges, cards, formulários, carrossel, modal, gaveta e tooltip.'],
  ['estrutura', 'Seções de site', 'Blocos prontos de página: navegação, hero, recursos, preços, depoimentos, perguntas, chamada e rodapé.'],
  ['site-completo', 'Site completo', 'Uma landing inteira montada com as seções, com um visualizador para testar qualquer marca nela.'],
];

const STEPS = [
  ['Escolher a marca', 'No <a href="#site-completo">Site completo</a>, ajuste cor, fonte, cantos, tamanhos e modo vendo o site mudar. O contraste é medido ao lado.'],
  ['Levar o tema', '"Copiar tema" gera um arquivo CSS com a marca. Ele vai para <code>src/themes/</code>, ao lado do tema da casa.'],
  ['Montar a página', 'Cada seção tem o código pronto na página dela. É empilhar navegação, hero, recursos e o que mais o site precisar.'],
  ['Ligar a marca', 'Um atributo no <code>&lt;html&gt;</code> veste o site inteiro. Nenhum componente precisa ser mexido.'],
];

export default {
  id: 'inicio',
  group: 'Começo',
  title: 'Um sistema, várias marcas',
  lead:
    'Esta é a caixa de peças de todos os meus projetos de front-end: cores, letras, espaços, botões, seções de página… ' +
    'Cada peça é desenhada uma vez, documentada aqui e reaproveitada em qualquer site, mudando só a "roupa" da marca.',
  render: () => `
    <div class="doc-callout">
      <span aria-hidden="true">🧪</span>
      <div><strong>Você está vendo o tema Nanquim, a identidade da casa.</strong>
      Abra o <a href="#" data-open-lab>Laboratório de identidade</a> (canto superior direito)
      e troque a paleta para ver esta documentação inteira se adaptar a outra marca.</div>
    </div>

    <section class="doc-section">
      <h2>Como funciona, em 3 camadas</h2>
      <p>Pense numa casa: a estrutura (paredes) é sempre a mesma; o que muda de um cliente para outro é a pintura e a decoração.</p>
      <div class="home-layers">
        <div class="home-layer">
          <span class="home-layer-num">1</span>
          <h3>Primitivos</h3>
          <p>A "caixa de tintas": todas as cores, tamanhos e espaços possíveis, gerados a partir de poucos números, como o tom da marca e a base de 4px.</p>
          <code>--ds-neutral-3</code>
        </div>
        <div class="home-arrow" aria-hidden="true">→</div>
        <div class="home-layer">
          <span class="home-layer-num">2</span>
          <h3>Semânticos</h3>
          <p>Cada tinta ganha uma função: "cor de fundo", "cor do botão principal". Os componentes só conhecem esses nomes.</p>
          <code>--ds-color-surface</code>
        </div>
        <div class="home-arrow" aria-hidden="true">→</div>
        <div class="home-layer home-layer--accent">
          <span class="home-layer-num">3</span>
          <h3>Tema da marca</h3>
          <p>Um arquivo pequeno por cliente que troca as tintas. Vale para a página toda ou só para um pedaço dela.</p>
          <code>data-theme="cliente"</code>
        </div>
      </div>
    </section>

    <section class="doc-section">
      <h2>O que tem dentro</h2>
      <p>As peças vão das menores às maiores: as fundações formam os componentes, os componentes formam as seções, e as seções formam o site.</p>
      <div class="home-cards home-cards--pairs">
        ${GROUPS.map(([id, name, text]) => `<a class="home-card" href="#${id}"><strong>${name}</strong><span>${text}</span></a>`).join('')}
      </div>
    </section>

    <section class="doc-section">
      <h2>Do zero a um site de cliente</h2>
      <ol class="card-anatomy-list">
        ${STEPS.map(([name, text]) => `<li><strong>${name}</strong><span>${text}</span></li>`).join('')}
      </ol>
    </section>

    <section class="doc-section">
      <h2>Feito para qualquer projeto</h2>
      <p>Nada aqui depende de React, Vue ou outro framework. É CSS com variáveis e, para as peças interativas (carrossel, modal, tooltip), Web Components, um padrão nativo do navegador.</p>
      <div class="home-grid">
        ${['HTML puro', 'React', 'Vue', 'Svelte', 'Angular', 'WordPress'].map((f) => `<span class="home-chip">${f}</span>`).join('')}
      </div>
      ${code(`
<!-- 1. importe o sistema: o CSS e, se usar peças interativas, o JS -->
<link rel="stylesheet" href="design-system/src/index.css">
<script type="module" src="design-system/src/index.js"></script>

<!-- 2. escolha a marca, as fontes, os cantos e o modo -->
<html data-theme="nanquim" data-font="editorial" data-radius="suave" data-mode="dark">

<!-- 3. use as peças prontas… -->
<button class="ds-btn ds-btn--primary">Pedir orçamento</button>

<!-- …ou os tokens no seu próprio CSS -->
<style>
  .meu-card {
    background: var(--ds-color-surface);
    padding: var(--ds-space-6);
    border-radius: var(--ds-radius-lg);
  }
</style>

<!-- os mesmos atributos funcionam só num pedaço da página -->
<section class="ds-section" data-theme="terracota" data-mode="light">…</section>`, 'html')}
    </section>

    <section class="doc-section">
      <h2>Por onde começar</h2>
      <div class="home-cards">
        <a class="home-card" href="#cores"><strong>Cores</strong><span>Paletas, significado e contraste</span></a>
        <a class="home-card" href="#tipografia"><strong>Tipografia</strong><span>Fontes e tamanhos</span></a>
        <a class="home-card" href="#botoes"><strong>Botões</strong><span>A primeira peça, com todas as variantes</span></a>
        <a class="home-card" href="#estrutura"><strong>Estrutura da página</strong><span>Como as seções se encaixam</span></a>
        <a class="home-card" href="#site-completo"><strong>Site completo</strong><span>Teste uma marca num site inteiro</span></a>
        <a class="home-card" href="#roadmap"><strong>Roadmap</strong><span>O que vem por aí</span></a>
      </div>
    </section>`,
  mount(el) {
    const handler = (e) => {
      if (e.target.closest('[data-open-lab]')) {
        e.preventDefault();
        document.getElementById('lab-btn').click();
      }
    };
    el.addEventListener('click', handler);
    return () => el.removeEventListener('click', handler);
  },
};
