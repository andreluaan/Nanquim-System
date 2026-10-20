import { code } from '../utils.js';

export default {
  id: 'inicio',
  group: 'Começo',
  title: 'Um sistema, várias marcas',
  lead:
    'Esta é a caixa de peças de todos os meus projetos de front-end: cores, letras, espaços, botões, carrosséis… ' +
    'Cada peça é desenhada uma vez, documentada aqui e reaproveitada em qualquer site, mudando só a "roupa" da marca.',
  render: () => `
    <div class="doc-callout">
      <span aria-hidden="true">🧪</span>
      <div><strong>A identidade ainda está sendo definida.</strong>
      Abra o <a href="#" data-open-lab>Laboratório de identidade</a> (canto superior direito),
      teste combinações e veja esta página inteira mudar.</div>
    </div>

    <section class="doc-section">
      <h2>Como funciona, em 3 camadas</h2>
      <p>Pense numa casa: a estrutura (paredes) é sempre a mesma; o que muda de um cliente para outro é a pintura e a decoração.</p>
      <div class="home-layers">
        <div class="home-layer">
          <span class="home-layer-num">1</span>
          <h3>Primitivos</h3>
          <p>A "caixa de tintas": todas as cores, tamanhos e espaços possíveis.</p>
          <code>--ds-neutral-3</code>
        </div>
        <div class="home-arrow" aria-hidden="true">→</div>
        <div class="home-layer">
          <span class="home-layer-num">2</span>
          <h3>Semânticos</h3>
          <p>Cada tinta ganha uma função: "cor de fundo", "cor do botão principal".</p>
          <code>--ds-color-surface</code>
        </div>
        <div class="home-arrow" aria-hidden="true">→</div>
        <div class="home-layer home-layer--accent">
          <span class="home-layer-num">3</span>
          <h3>Tema da marca</h3>
          <p>Um arquivo pequeno por cliente que troca as tintas. Os componentes se adaptam sozinhos.</p>
          <code>data-theme="cliente"</code>
        </div>
      </div>
    </section>

    <section class="doc-section">
      <h2>Feito para qualquer projeto</h2>
      <p>Nada aqui depende de React, Vue ou outro framework. É CSS com variáveis e, para as peças interativas, Web Components, um padrão nativo do navegador.</p>
      <div class="home-grid">
        ${['HTML puro', 'React', 'Vue', 'Svelte', 'Angular', 'WordPress'].map((f) => `<span class="home-chip">${f}</span>`).join('')}
      </div>
      ${code(`
<!-- 1. importe o sistema -->
<link rel="stylesheet" href="design-system/src/index.css">

<!-- 2. escolha a marca, as fontes, os cantos e o modo -->
<html data-theme="grafite" data-font="editorial" data-radius="suave" data-mode="dark">

<!-- 3. use os tokens no seu CSS -->
<style>
  .meu-card {
    background: var(--ds-color-surface);
    padding: var(--ds-space-6);
    border-radius: var(--ds-radius-lg);
  }
</style>`, 'html')}
    </section>

    <section class="doc-section">
      <h2>Por onde começar</h2>
      <div class="home-cards">
        <a class="home-card" href="#cores"><strong>Cores</strong><span>Paletas, significado e contraste</span></a>
        <a class="home-card" href="#tipografia"><strong>Tipografia</strong><span>Fontes e tamanhos</span></a>
        <a class="home-card" href="#espacamento"><strong>Espaço & Cantos</strong><span>O ritmo da página</span></a>
        <a class="home-card" href="#elevacao"><strong>Elevação</strong><span>Camadas e profundidade</span></a>
        <a class="home-card" href="#movimento"><strong>Movimento</strong><span>Animações com propósito</span></a>
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
