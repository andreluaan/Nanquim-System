import { inkDrop, brushStroke, inkWash, enso } from '../illustrations.js';
import { code, doDont } from '../utils.js';

const PLAYGROUND = {
  perView: [['1', '1 por vez'], ['2', '2 por vez'], ['3', '3 por vez']],
  autoplay: [['no', 'Manual'], ['yes', 'Automático']],
  loop: [['no', 'Para no fim'], ['yes', 'Volta ao início']],
  variant: [['default', 'Embaixo'], ['overlay', 'Sobre a imagem']],
};

const LABELS = { perView: 'Slides por vez', autoplay: 'Troca', loop: 'No último slide', variant: 'Controles' };

const initialState = { perView: '1', autoplay: 'no', loop: 'no', variant: 'default' };

const ILLUSTRATIONS = [inkWash, brushStroke, enso, inkDrop];

const DEMO_SLIDES = ['Aguada', 'Pincelada', 'Ensō', 'Gota', 'Aguada', 'Pincelada'];

function carouselHtml({ perView, autoplay, loop, variant }, { forCode = false } = {}) {
  const attrs = ['label="Galeria"'];
  if (perView !== '1') attrs.push(`per-view="${perView}"`);
  if (autoplay === 'yes') attrs.push('autoplay');
  if (loop === 'yes' && autoplay === 'no') attrs.push('loop');
  if (variant === 'overlay') attrs.push('variant="overlay"');

  const slides = DEMO_SLIDES.map((name, i) => forCode
    ? `    <figure><img src="foto-${i + 1}.jpg" alt="${name}"></figure>`
    : `    <figure class="carousel-demo-slide">${ILLUSTRATIONS[i % ILLUSTRATIONS.length]()}<figcaption>${i + 1} · ${name}</figcaption></figure>`);

  return `<ds-carousel ${attrs.join(' ')}>
  <div class="ds-carousel__track">
${slides.join('\n')}
  </div>
</ds-carousel>`;
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

const HERO_SLIDES = [
  ['Estúdio', 'Sites com a sua cara, do traço ao código', 'Identidade, interface e desenvolvimento num processo só.', inkWash],
  ['Processo', 'Uma tinta, doze tons', 'Cada marca nasce de poucas cores e ganha uma escala completa.', brushStroke],
  ['Acessível', 'Bonito para todo mundo ler', 'Contraste medido em cada combinação, foco visível e teclado.', enso],
  ['Contato', 'Vamos tirar a sua ideia do papel?', 'Conte o que precisa e responda em até um dia útil.', inkDrop],
];

const POSTS = [
  ['Cores', 'A aguada como escala de cor', inkWash],
  ['Ilustração', 'O traço que não volta atrás', brushStroke],
  ['Processo', 'Um círculo, uma pincelada', enso],
  ['Tipografia', 'Fontes que combinam com tinta', inkDrop],
  ['Acessibilidade', 'Contraste não é opinião', inkWash],
  ['Componentes', 'Botões que se explicam', brushStroke],
];

const QUOTES = [
  ['O site ficou com a nossa cara e ainda carrega rápido no celular.', 'Marina Sumi', 'Ateliê Sumi'],
  ['Trocar as cores para a nova marca levou uma tarde, não um mês.', 'Rafael Traço', 'Papelaria Traço'],
  ['Clientes mais velhos comentaram que finalmente conseguem ler tudo.', 'Lúcia Pena', 'Estúdio Pena'],
  ['O formulário de orçamento passou a receber o dobro de pedidos.', 'Caio Bico', 'Bico de Pena Arquitetura'],
];

const ATTRIBUTES = [
  ['label', '"Depoimentos"', 'Nome do carrossel, lido por leitores de tela.'],
  ['per-view', '"3"', 'Quantos slides aparecem de uma vez. No celular, vira um slide com a ponta do próximo à mostra.'],
  ['loop', '', 'No último slide, a seta "próximo" volta ao primeiro.'],
  ['autoplay', '"6000"', 'Troca sozinho, no intervalo em milissegundos (padrão: 6000). Já inclui o <code>loop</code>.'],
  ['variant', '"overlay"', 'Setas e indicadores por cima da imagem, para galerias e banners.'],
];

const KEYS = [
  ['←', '→', 'Slide anterior e próximo (com o foco no carrossel)'],
  ['Home', 'End', 'Primeiro e último slide'],
  ['Tab', '', 'Passa pelos links do slide visível, depois pelos controles'],
];

export default {
  id: 'carrossel',
  group: 'Componentes',
  title: 'Carrossel e slides',
  keywords: 'carrossel carousel slider slides banner galeria hero depoimentos autoplay',
  lead: 'Um carrossel mostra vários conteúdos no mesmo espaço, um de cada vez ou em fileira. Arrasta com o dedo ou o mouse, responde ao teclado e para de girar quando você quer ler.',
  render: () => `
    <section class="doc-section">
      <h2>Monte o seu</h2>
      <p>Troque as opções, arraste os slides e veja o código mudar junto.</p>
      <div class="btn-play">
        <div class="btn-play-controls">
          ${Object.keys(PLAYGROUND).map((key) => segmented(key, initialState[key])).join('')}
        </div>
        <div class="btn-play-preview carousel-play-preview" data-preview></div>
        <div class="doc-code btn-play-code">
          <div class="doc-code-head"><span>html</span>
            <button class="doc-code-copy" data-code-copy>Copiar</button>
          </div>
          <pre><code data-code></code></pre>
        </div>
      </div>
    </section>

    <section class="doc-section">
      <h2>Slides de destaque</h2>
      <p>O banner do topo do site: um recado por vez, trocando sozinho. A barrinha do indicador mostra quanto falta para o próximo; passar o mouse ou o foco do teclado pausa a troca.</p>
      <ds-carousel class="carousel-hero" label="Destaques" autoplay="7000">
        <div class="ds-carousel__track">
          ${HERO_SLIDES.map(([eyebrow, title, text, art]) => `
            <article class="carousel-hero-slide">
              <div class="carousel-hero-text">
                <p class="ds-card__eyebrow">${eyebrow}</p>
                <h3 class="carousel-hero-title">${title}</h3>
                <p>${text}</p>
                <div class="btn-example-actions">
                  <a class="ds-btn ds-btn--primary" href="#carrossel">Saiba mais</a>
                  <a class="ds-btn ds-btn--ghost" href="#carrossel">Ver projetos</a>
                </div>
              </div>
              <div class="carousel-hero-art">${art()}</div>
            </article>`).join('')}
        </div>
      </ds-carousel>
    </section>

    <section class="doc-section">
      <h2>Carrossel de cards</h2>
      <p>Uma fileira de cards que não cabem na tela: posts, produtos, projetos. As setas avançam um card por vez e param no fim.</p>
      <ds-carousel class="carousel-cards" label="Posts do blog" per-view="3">
        <div class="ds-carousel__track">
          ${POSTS.map(([eyebrow, title, art]) => `
            <a class="ds-card ds-card--interactive" href="#carrossel">
              <div class="ds-card__media">${art()}</div>
              <div class="ds-card__content">
                <p class="ds-card__eyebrow">${eyebrow}</p>
                <h3 class="ds-card__title">${title}</h3>
              </div>
            </a>`).join('')}
        </div>
      </ds-carousel>
    </section>

    <section class="doc-section">
      <h2>Depoimentos</h2>
      <p>Dois por vez e voltando ao início no fim: quem lê decide o ritmo.</p>
      <ds-carousel label="Depoimentos" per-view="2" loop>
        <div class="ds-carousel__track">
          ${QUOTES.map(([quote, name, company]) => `
            <figure class="ds-card carousel-quote">
              <div class="ds-card__content">
                <blockquote>“${quote}”</blockquote>
                <figcaption class="card-author">
                  <span class="card-avatar">${name.split(' ').map((part) => part[0]).join('')}</span>
                  <span><strong>${name}</strong><br>${company}</span>
                </figcaption>
              </div>
            </figure>`).join('')}
        </div>
      </ds-carousel>
    </section>

    <section class="doc-section">
      <h2>Galeria</h2>
      <p>Com <code>variant="overlay"</code>, setas e indicadores ficam por cima da imagem. Eles têm fundo próprio, então continuam legíveis em qualquer foto.</p>
      <ds-carousel class="carousel-gallery" label="Galeria de ilustrações" variant="overlay" loop>
        <div class="ds-carousel__track">
          ${ILLUSTRATIONS.map((art) => `<figure>${art()}</figure>`).join('')}
        </div>
      </ds-carousel>
    </section>

    <section class="doc-section">
      <h2>Atributos</h2>
      <p>Tudo se configura no próprio HTML, sem escrever JavaScript.</p>
      <div class="doc-demo">
        <table class="badge-table">
          <thead><tr><th>Atributo</th><th>Exemplo</th><th>O que faz</th></tr></thead>
          <tbody>
            ${ATTRIBUTES.map(([name, example, text]) => `<tr><td><code>${name}</code></td><td>${example ? `<code>${example}</code>` : '—'}</td><td>${text}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
      <p>A cada troca, o carrossel avisa a página com o evento <code>ds-slide-change</code>, útil para contar visualizações ou sincronizar uma legenda.</p>
    </section>

    <section class="doc-section">
      <h2>Acessibilidade</h2>
      <p>Carrossel que gira sozinho é um dos padrões mais criticados da web: o texto some antes de terminar de ler. Por isso este:</p>
      <ul class="carousel-a11y">
        <li><ds-icon name="pause"></ds-icon> pausa ao passar o mouse, ao receber o foco do teclado e no botão de pausa;</li>
        <li><ds-icon name="eye"></ds-icon> não gira sozinho para quem pediu <strong>movimento reduzido</strong> no sistema;</li>
        <li><ds-icon name="lock"></ds-icon> tira da ordem do <kbd>Tab</kbd> os slides que estão fora da tela;</li>
        <li><ds-icon name="bell"></ds-icon> anuncia o slide novo ao leitor de tela só quando a troca foi pedida pela pessoa.</li>
      </ul>
      <div class="doc-demo">
        <table class="badge-table">
          <thead><tr><th>Teclas</th><th>O que fazem</th></tr></thead>
          <tbody>
            ${KEYS.map(([a, b, text]) => `<tr><td><kbd>${a}</kbd>${b ? ` <kbd>${b}</kbd>` : ''}</td><td>${text}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
      ${doDont(
        ['Poucos slides (até 5) com um recado claro cada', 'O conteúdo mais importante no primeiro slide', 'Intervalo longo no automático (6 segundos ou mais)'],
        ['Esconder informação essencial nos slides seguintes', 'Trocar sozinho sem botão de pausa', 'Carrossel dentro de carrossel'],
      )}
      ${code(`
<ds-carousel label="Posts do blog" per-view="3">
  <div class="ds-carousel__track">
    <a class="ds-card ds-card--interactive" href="/blog/aguada">…</a>
    <a class="ds-card ds-card--interactive" href="/blog/traco">…</a>
    <a class="ds-card ds-card--interactive" href="/blog/enso">…</a>
  </div>
</ds-carousel>`, 'html')}
    </section>`,

  mount(el) {
    const state = { ...initialState };
    const preview = el.querySelector('[data-preview]');
    const codeEl = el.querySelector('[data-code]');
    const copyBtn = el.querySelector('[data-code-copy]');

    const update = () => {
      preview.innerHTML = carouselHtml(state);
      const markup = carouselHtml(state, { forCode: true });
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

    // Os exemplos apontam para a própria página; evita pular ao topo.
    el.addEventListener('click', (e) => {
      if (e.target.closest('ds-carousel a')) e.preventDefault();
    });

    update();
  },
};
