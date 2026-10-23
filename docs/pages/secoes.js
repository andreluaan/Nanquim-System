import { enso } from '../illustrations.js';
import { code, doDont } from '../utils.js';

const BRANDS = [
  ['nanquim', 'Nanquim', { theme: 'nanquim', font: 'editorial', radius: 'suave' }],
  ['terracota', 'Terracota', { theme: 'terracota', font: 'classico', radius: 'arredondado' }],
  ['ardosia', 'Ardósia', { theme: 'ardosia', font: 'moderno', radius: 'suave' }],
  ['aco', 'Aço', { theme: 'aco', font: 'tecnico', radius: 'reto' }],
];

const MODES = [['dark', 'Escuro'], ['light', 'Claro']];

const LINKS = ['Início', 'Projetos', 'Processo', 'Preços', 'Contato'];

const FEATURES = [
  ['pen', 'Identidade visual', 'Logo, cores e tipografia que contam quem você é, prontas para usar em tudo.'],
  ['grid', 'Sites sob medida', 'Páginas rápidas, fáceis de editar e que funcionam bem no celular.'],
  ['image', 'Ilustração', 'Desenhos feitos à mão para dar personalidade ao que é só seu.'],
  ['check-circle', 'Para todo mundo ler', 'Contraste, tamanho de letra e teclado pensados desde o primeiro traço.'],
];

const PLANS = [
  { name: 'Essencial', desc: 'Para quem está começando.', monthly: 89, yearly: 74, features: ['1 site de até 5 páginas', 'Domínio e hospedagem', 'Suporte por e-mail'], missing: ['Ilustrações sob medida'] },
  { name: 'Profissional', desc: 'O mais escolhido por pequenos negócios.', monthly: 189, yearly: 157, featured: true, features: ['Site de até 15 páginas', 'Blog e formulários', 'Suporte prioritário', '2 ilustrações por mês'] },
  { name: 'Estúdio', desc: 'Marca e site cuidados de perto.', monthly: 349, yearly: 290, features: ['Páginas ilimitadas', 'Loja virtual', 'Reunião mensal', 'Ilustrações ilimitadas'] },
];

const TESTIMONIALS = [
  ['A marca nova fez a gente parecer do tamanho que sempre quis ter.', 'Marina Costa', 'Café Aguada'],
  ['O site carrega rápido e meus clientes acham tudo sem me ligar.', 'Rafael Lima', 'Papelaria Traço'],
  ['Pela primeira vez, minha mãe consegue ler o cardápio no celular.', 'Lúcia Pena', 'Cantina Pena'],
];

const navbar = (menuId) => `
  <header class="ds-navbar ds-navbar--sticky">
    <div class="ds-container ds-navbar__inner">
      <a class="ds-navbar__brand" href="#secoes"><ds-icon name="ink"></ds-icon> Ateliê Sumi</a>
      <nav class="ds-navbar__links" aria-label="Principal">
        ${LINKS.map((link, i) => `<a href="#secoes"${i === 0 ? ' aria-current="page"' : ''}>${link}</a>`).join('')}
      </nav>
      <div class="ds-navbar__actions">
        <a class="ds-btn ds-btn--primary ds-btn--sm" href="#secoes">Pedir orçamento</a>
      </div>
      <button class="ds-btn ds-btn--ghost ds-btn--icon ds-navbar__toggle" data-dialog-open="${menuId}" aria-haspopup="dialog" aria-label="Abrir menu"><ds-icon name="menu"></ds-icon></button>
    </div>
  </header>`;

const hero = () => `
  <section class="ds-section ds-hero">
    <div class="ds-container ds-hero__inner">
      <div class="ds-hero__content">
        <p class="ds-hero__eyebrow">Estúdio de identidade e sites</p>
        <h1 class="ds-hero__title">Marcas desenhadas à mão, sites feitos para durar</h1>
        <p class="ds-hero__lead">Criamos a identidade e o site do seu negócio num processo só, do primeiro rascunho ao ar.</p>
        <div class="ds-hero__actions">
          <a class="ds-btn ds-btn--primary ds-btn--lg" href="#secoes">Pedir orçamento</a>
          <a class="ds-btn ds-btn--ghost ds-btn--lg" href="#secoes">Ver projetos <ds-icon name="arrow-right"></ds-icon></a>
        </div>
        <p class="ds-hero__note"><ds-icon name="star"></ds-icon> 4,9 de média em 120 avaliações</p>
      </div>
      <div class="ds-hero__media">${enso({ id: 'ill-enso-hero' })}</div>
    </div>
  </section>`;

const features = () => `
  <section class="ds-section ds-section--alt">
    <div class="ds-container">
      <header class="ds-section__header">
        <p class="ds-section__eyebrow">O que fazemos</p>
        <h2 class="ds-section__title">Tudo que a sua marca precisa para aparecer bem</h2>
      </header>
      <div class="ds-grid" style="--grid-min: 12rem">
        ${FEATURES.map(([icon, title, text]) => `
          <article class="ds-feature">
            <span class="ds-feature__icon"><ds-icon name="${icon}"></ds-icon></span>
            <h3 class="ds-feature__title">${title}</h3>
            <p class="ds-feature__text">${text}</p>
          </article>`).join('')}
      </div>
    </div>
  </section>`;

const pricing = () => `
  <section class="ds-section">
    <div class="ds-container">
      <header class="ds-section__header ds-section__header--center">
        <p class="ds-section__eyebrow">Preços</p>
        <h2 class="ds-section__title">Planos de manutenção do site</h2>
        <p class="ds-section__lead">Sem fidelidade. Troque de plano quando quiser.</p>
        <div class="ds-btn-group" role="group" aria-label="Forma de pagamento" data-billing>
          <button class="ds-btn ds-btn--sm" aria-pressed="true" data-billing-option="monthly">Mensal</button>
          <button class="ds-btn ds-btn--sm" aria-pressed="false" data-billing-option="yearly">Anual · 2 meses grátis</button>
        </div>
      </header>
      <div class="ds-grid" style="--grid-min: 15rem">
        ${PLANS.map((plan) => `
          <article class="ds-plan${plan.featured ? ' ds-plan--featured' : ''}">
            ${plan.featured ? '<span class="ds-plan__badge ds-badge ds-badge--accent ds-badge--solid ds-badge--pill">Mais escolhido</span>' : ''}
            <h3 class="ds-plan__name">${plan.name}</h3>
            <p class="ds-plan__desc">${plan.desc}</p>
            <p class="ds-plan__price">R$ <strong data-monthly="${plan.monthly}" data-yearly="${plan.yearly}">${plan.monthly}</strong> /mês</p>
            <ul class="ds-plan__features">
              ${plan.features.map((item) => `<li><ds-icon name="check"></ds-icon> ${item}</li>`).join('')}
              ${(plan.missing ?? []).map((item) => `<li aria-disabled="true"><ds-icon name="minus"></ds-icon> ${item}</li>`).join('')}
            </ul>
            <a class="ds-btn ${plan.featured ? 'ds-btn--primary' : 'ds-btn--secondary'} ds-btn--block" href="#secoes">Escolher ${plan.name}</a>
          </article>`).join('')}
      </div>
    </div>
  </section>`;

const testimonials = () => `
  <section class="ds-section ds-section--alt">
    <div class="ds-container">
      <header class="ds-section__header">
        <p class="ds-section__eyebrow">Depoimentos</p>
        <h2 class="ds-section__title">Quem já tirou a marca do papel</h2>
      </header>
      <div class="ds-grid">
        ${TESTIMONIALS.map(([quote, name, company]) => `
          <figure class="ds-testimonial">
            <blockquote class="ds-testimonial__quote">${quote}</blockquote>
            <figcaption class="ds-testimonial__author">
              <span class="ds-testimonial__avatar" aria-hidden="true">${name.split(' ').map((part) => part[0]).join('')}</span>
              <span><span class="ds-testimonial__name">${name}</span><span class="ds-testimonial__role">${company}</span></span>
            </figcaption>
          </figure>`).join('')}
      </div>
    </div>
  </section>`;

const cta = () => `
  <section class="ds-section">
    <div class="ds-container">
      <div class="ds-cta">
        <div>
          <h2 class="ds-cta__title">Vamos desenhar a sua marca?</h2>
          <p class="ds-cta__text">Conte sobre o seu negócio e receba uma proposta em até 2 dias úteis.</p>
        </div>
        <div class="ds-cta__actions">
          <a class="ds-btn ds-btn--primary ds-btn--lg" href="#secoes">Pedir orçamento</a>
        </div>
      </div>
    </div>
  </section>`;

const footer = () => `
  <footer class="ds-footer">
    <div class="ds-container">
      <div class="ds-footer__inner">
        <div class="ds-footer__brand">
          <a class="ds-navbar__brand" href="#secoes"><ds-icon name="ink"></ds-icon> Ateliê Sumi</a>
          <p>Identidade visual, sites e ilustração para pequenos negócios com personalidade.</p>
          <div class="ds-footer__social">
            ${[['mail', 'E-mail'], ['phone', 'Telefone'], ['map-pin', 'Endereço']].map(([icon, label]) => `<a class="ds-btn ds-btn--ghost ds-btn--icon ds-btn--sm" href="#secoes" aria-label="${label}"><ds-icon name="${icon}"></ds-icon></a>`).join('')}
          </div>
        </div>
        ${[['Estúdio', ['Sobre', 'Processo', 'Projetos']], ['Serviços', ['Identidade', 'Sites', 'Ilustração']], ['Ajuda', ['Contato', 'Perguntas', 'Preços']]].map(([heading, items]) => `
          <nav aria-label="${heading}">
            <h2 class="ds-footer__heading">${heading}</h2>
            <ul class="ds-footer__links">${items.map((item) => `<li><a href="#secoes">${item}</a></li>`).join('')}</ul>
          </nav>`).join('')}
      </div>
      <div class="ds-footer__bottom">
        <p>© 2026 Ateliê Sumi. Feito com o Nanquim System.</p>
        <ul class="ds-footer__links"><li><a href="#secoes">Privacidade</a></li><li><a href="#secoes">Termos</a></li></ul>
      </div>
    </div>
  </footer>`;

const menuDrawer = (id) => `
  <dialog class="ds-dialog ds-dialog--drawer ds-dialog--start" id="${id}" aria-labelledby="${id}-titulo">
    <header class="ds-dialog__header">
      <h2 class="ds-dialog__title" id="${id}-titulo">Ateliê Sumi</h2>
      <button class="ds-btn ds-btn--ghost ds-btn--icon ds-btn--sm" data-dialog-close aria-label="Fechar"><ds-icon name="x"></ds-icon></button>
    </header>
    <div class="ds-dialog__body">
      <nav class="overlay-menu" aria-label="Menu do site">${LINKS.map((link) => `<a href="#secoes">${link}</a>`).join('')}</nav>
    </div>
    <footer class="ds-dialog__footer"><a class="ds-btn ds-btn--primary ds-btn--block" href="#secoes">Pedir orçamento</a></footer>
  </dialog>`;

const frame = (url, content, extraClass = '') => `
  <div class="site-frame ${extraClass}">
    <div class="site-frame-bar" aria-hidden="true"><span class="site-frame-dots"><i></i><i></i><i></i></span><span class="site-frame-url">${url}</span></div>
    <div class="site-frame-page" data-brand-target data-theme="nanquim" data-font="editorial" data-radius="suave" data-mode="dark">${content}</div>
  </div>`;

function segmented(key, options, current, label) {
  return `
    <div class="btn-play-field">
      <span>${label}</span>
      <div class="doc-segmented" role="radiogroup" aria-label="${label}">
        ${options.map(([id, name]) => `<button role="radio" aria-checked="${id === current}" data-key="${key}" data-value="${id}">${name}</button>`).join('')}
      </div>
    </div>`;
}

const PIECES = [
  ['Barra de navegação', 'Marca, links e a ação principal. Abaixo de 768px de largura, os links viram um botão de menu que abre uma gaveta.', `
<header class="ds-navbar ds-navbar--sticky">
  <div class="ds-container ds-navbar__inner">
    <a class="ds-navbar__brand" href="/">Ateliê Sumi</a>
    <nav class="ds-navbar__links" aria-label="Principal">
      <a href="/" aria-current="page">Início</a>
      <a href="/projetos">Projetos</a>
    </nav>
    <div class="ds-navbar__actions"><a class="ds-btn ds-btn--primary ds-btn--sm" href="/orcamento">Pedir orçamento</a></div>
    <button class="ds-btn ds-btn--ghost ds-btn--icon ds-navbar__toggle" data-dialog-open="menu" aria-label="Abrir menu">…</button>
  </div>
</header>`],
  ['Hero', 'A primeira dobra: o que você faz, para quem, e o próximo passo. Com <code>ds-hero--center</code>, fica centralizado e sem imagem.', `
<section class="ds-section ds-hero">
  <div class="ds-container ds-hero__inner">
    <div class="ds-hero__content">
      <p class="ds-hero__eyebrow">Estúdio de identidade e sites</p>
      <h1 class="ds-hero__title">Marcas desenhadas à mão</h1>
      <p class="ds-hero__lead">Identidade e site num processo só.</p>
      <div class="ds-hero__actions">…</div>
    </div>
    <div class="ds-hero__media"><img src="capa.jpg" alt=""></div>
  </div>
</section>`],
  ['Seção com recursos', 'Cabeçalho de seção (sobretítulo, título, texto) e uma grade que se ajusta sozinha. <code>--grid-min</code> define a largura mínima de cada coluna.', `
<section class="ds-section ds-section--alt">
  <div class="ds-container">
    <header class="ds-section__header">
      <p class="ds-section__eyebrow">O que fazemos</p>
      <h2 class="ds-section__title">Tudo que a sua marca precisa</h2>
    </header>
    <div class="ds-grid" style="--grid-min: 12rem">
      <article class="ds-feature">
        <span class="ds-feature__icon"><ds-icon name="pen"></ds-icon></span>
        <h3 class="ds-feature__title">Identidade visual</h3>
        <p class="ds-feature__text">Logo, cores e tipografia.</p>
      </article>
    </div>
  </div>
</section>`],
  ['Preços', 'Cada plano é um <code>ds-plan</code>; o recomendado ganha <code>ds-plan--featured</code> e um selo. Itens que o plano não inclui usam <code>aria-disabled="true"</code>.', `
<article class="ds-plan ds-plan--featured">
  <span class="ds-plan__badge ds-badge ds-badge--accent ds-badge--solid ds-badge--pill">Mais escolhido</span>
  <h3 class="ds-plan__name">Profissional</h3>
  <p class="ds-plan__desc">Para pequenos negócios.</p>
  <p class="ds-plan__price">R$ <strong>189</strong> /mês</p>
  <ul class="ds-plan__features">
    <li><ds-icon name="check"></ds-icon> Blog e formulários</li>
    <li aria-disabled="true"><ds-icon name="minus"></ds-icon> Loja virtual</li>
  </ul>
  <a class="ds-btn ds-btn--primary ds-btn--block" href="/assinar">Escolher</a>
</article>`],
  ['Depoimentos', 'Um <code>figure</code> com a citação e quem disse. Em grade ou dentro de um <code>&lt;ds-carousel&gt;</code>.', `
<figure class="ds-testimonial">
  <blockquote class="ds-testimonial__quote">O site carrega rápido.</blockquote>
  <figcaption class="ds-testimonial__author">
    <span class="ds-testimonial__avatar"><img src="rafael.jpg" alt=""></span>
    <span>
      <span class="ds-testimonial__name">Rafael Lima</span>
      <span class="ds-testimonial__role">Papelaria Traço</span>
    </span>
  </figcaption>
</figure>`],
  ['Chamada para ação', 'O último empurrão antes do rodapé: uma frase e um botão.', `
<div class="ds-cta">
  <div>
    <h2 class="ds-cta__title">Vamos desenhar a sua marca?</h2>
    <p class="ds-cta__text">Proposta em até 2 dias úteis.</p>
  </div>
  <div class="ds-cta__actions"><a class="ds-btn ds-btn--primary ds-btn--lg" href="/orcamento">Pedir orçamento</a></div>
</div>`],
  ['Rodapé', 'Marca, colunas de links e a linha final com direitos e termos. Cada coluna é um <code>nav</code> com título.', `
<footer class="ds-footer">
  <div class="ds-container">
    <div class="ds-footer__inner">
      <div class="ds-footer__brand">…</div>
      <nav aria-label="Estúdio">
        <h2 class="ds-footer__heading">Estúdio</h2>
        <ul class="ds-footer__links"><li><a href="/sobre">Sobre</a></li></ul>
      </nav>
    </div>
    <div class="ds-footer__bottom">© 2026 Ateliê Sumi</div>
  </div>
</footer>`],
];

export default {
  id: 'secoes',
  group: 'Componentes',
  title: 'Seções de site',
  keywords: 'seções landing page site navbar menu hero banner recursos preços planos depoimentos chamada cta rodapé footer',
  lead: 'Blocos de página prontos: barra de navegação, hero, recursos, preços, depoimentos, chamada e rodapé. Juntos, viram uma landing page inteira; com outra marca, viram outro site.',
  render: () => `
    <section class="doc-section">
      <h2>Uma página inteira</h2>
      <p>O site fictício do <strong>Ateliê Sumi</strong>, montado só com peças do Nanquim. Troque a marca: só a página de exemplo muda, o resto da documentação fica igual.</p>
      <div class="btn-play-controls site-controls">
        ${segmented('brand', BRANDS.map(([id, name]) => [id, name]), 'nanquim', 'Marca')}
        ${segmented('mode', MODES, 'dark', 'Modo')}
      </div>
      ${frame('ateliesumi.com.br', navbar('sumi-menu') + hero() + features() + pricing() + testimonials() + cta() + footer() + menuDrawer('sumi-menu'), 'site-frame--full')}
    </section>

    <section class="doc-section">
      <h2>Mesma seção, qualquer largura</h2>
      <p>As seções se ajustam à <strong>largura que têm</strong>, não à da tela (<em>container queries</em>). Por isso a mesma página funciona no celular, numa coluna estreita ou numa prévia como esta. Toque no menu para abrir a gaveta.</p>
      <div class="site-narrow">
        ${frame('ateliesumi.com.br', navbar('sumi-menu-celular') + hero() + features() + pricing() + menuDrawer('sumi-menu-celular'), 'site-frame--phone')}
        <ul class="carousel-a11y">
          <li><ds-icon name="menu"></ds-icon> os links da barra viram um botão de menu;</li>
          <li><ds-icon name="grid"></ds-icon> as grades passam de várias colunas para uma;</li>
          <li><ds-icon name="image"></ds-icon> a imagem do hero desce para baixo do texto;</li>
          <li><ds-icon name="edit"></ds-icon> o título diminui junto com a largura.</li>
        </ul>
      </div>
    </section>

    <section class="doc-section">
      <h2>As peças</h2>
      <p>Toda seção usa <code>ds-section</code> + <code>ds-container</code>. <code>ds-section--alt</code> alterna o fundo para separar uma seção da outra.</p>
      ${PIECES.map(([title, text, markup]) => `
        <h3>${title}</h3>
        <p>${text}</p>
        ${code(markup, 'html')}`).join('')}
      ${doDont(
        ['Uma ação principal por seção', 'Alternar <code>ds-section--alt</code> para dar ritmo à página', 'Título de seção que diz o benefício, não o nome da seção'],
        ['Hero com três botões do mesmo peso', 'Mais de 4 planos lado a lado', 'Rodapé repetindo o menu inteiro sem organizar'],
      )}
    </section>`,

  mount(el) {
    const targets = el.querySelectorAll('[data-brand-target]');
    const applyBrand = (key, value) => {
      const settings = key === 'brand' ? BRANDS.find(([id]) => id === value)[2] : { mode: value };
      targets.forEach((target) => Object.assign(target.dataset, settings));
    };

    const select = (option) => {
      el.querySelectorAll(`[data-key="${option.dataset.key}"]`).forEach((b) => b.setAttribute('aria-checked', String(b === option)));
      applyBrand(option.dataset.key, option.dataset.value);
    };

    el.querySelector('.site-controls').addEventListener('click', (e) => {
      const option = e.target.closest('[data-key]');
      if (option) select(option);
    });

    // ?marca=terracota&modo=light já abre o exemplo assim: serve para links diretos e para os prints do diário.
    const params = new URLSearchParams(location.search);
    [['brand', params.get('marca')], ['mode', params.get('modo')]].forEach(([key, value]) => {
      const option = value && el.querySelector(`[data-key="${key}"][data-value="${CSS.escape(value)}"]`);
      if (option) select(option);
    });

    el.addEventListener('click', (e) => {
      const billing = e.target.closest('[data-billing-option]');
      if (billing) {
        const section = billing.closest('.ds-section');
        section.querySelectorAll('[data-billing-option]').forEach((b) => b.setAttribute('aria-pressed', String(b === billing)));
        section.querySelectorAll('[data-monthly]').forEach((price) => {
          price.textContent = price.dataset[billing.dataset.billingOption];
        });
      }
      // Os links do site de exemplo apontam para esta página; evita pular ao topo.
      if (e.target.closest('.site-frame a')) e.preventDefault();
    });

    return () => el.querySelectorAll('dialog[open]').forEach((d) => d.close());
  },
};
