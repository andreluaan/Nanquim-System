// Conteúdo do site de exemplo (Ateliê Sumi) e a moldura de navegador usada nas páginas de "Seções de site".
import { enso, inkLandscape, inkDrop, brushStroke, inkWash } from './illustrations.js';

export const LINKS = ['Início', 'Projetos', 'Processo', 'Preços', 'Contato'];

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
  ['Trocamos as cores para a marca nova numa tarde, não num mês.', 'Caio Bico', 'Bico de Pena Arquitetura'],
];

const QUESTIONS = [
  ['Quanto tempo leva um projeto?', 'Uma identidade leva de 3 a 4 semanas; um site, de 4 a 6. Você acompanha cada etapa e aprova antes de seguirmos.'],
  ['Eu mesmo consigo editar o site depois?', 'Sim. Textos, fotos e preços ficam num painel simples, e gravamos um vídeo curto mostrando como fazer.'],
  ['Vocês fazem só o site, sem a identidade?', 'Fazemos. Se você já tem uma marca, partimos dela e montamos o site com as suas cores e fontes.'],
  ['Como funciona o pagamento?', 'Metade para começar e metade na entrega, no Pix ou no cartão em até 6 vezes.'],
];

const initials = (name) => name.split(' ').map((part) => part[0]).join('');

const brand = (editorial = false) => editorial
  ? '<a class="ds-navbar__brand" href="#">sumi.</a>'
  : '<a class="ds-navbar__brand" href="#"><ds-icon name="ink"></ds-icon> Ateliê Sumi</a>';

export const navbar = ({ menuId = 'sumi-menu', sticky = true, action = true, editorial = false } = {}) => `
  <header class="ds-navbar${sticky ? ' ds-navbar--sticky' : ''}${editorial ? ' ds-navbar--editorial' : ''}">
    <div class="ds-container ds-navbar__inner">
      ${brand(editorial)}
      <nav class="ds-navbar__links" aria-label="Principal">
        ${LINKS.map((link, i) => `<a href="#"${i === 0 ? ' aria-current="page"' : ''}>${link}</a>`).join('')}
      </nav>
      ${action ? '<div class="ds-navbar__actions"><a class="ds-btn ds-btn--primary ds-btn--sm" href="#">Pedir orçamento</a></div>' : ''}
      <button class="ds-btn ds-btn--ghost ds-btn--icon ds-navbar__toggle" data-dialog-open="${menuId}" aria-haspopup="dialog" aria-label="Abrir menu"><ds-icon name="menu"></ds-icon></button>
    </div>
  </header>
  ${menuDrawer(menuId)}`;

export const menuDrawer = (id) => `
  <dialog class="ds-dialog ds-dialog--drawer ds-dialog--start" id="${id}" aria-labelledby="${id}-titulo">
    <header class="ds-dialog__header">
      <h2 class="ds-dialog__title" id="${id}-titulo">Ateliê Sumi</h2>
      <button class="ds-btn ds-btn--ghost ds-btn--icon ds-btn--sm" data-dialog-close aria-label="Fechar"><ds-icon name="x"></ds-icon></button>
    </header>
    <div class="ds-dialog__body">
      <nav class="overlay-menu" aria-label="Menu do site">${LINKS.map((link) => `<a href="#">${link}</a>`).join('')}</nav>
    </div>
    <footer class="ds-dialog__footer"><a class="ds-btn ds-btn--primary ds-btn--block" href="#">Pedir orçamento</a></footer>
  </dialog>`;

export const hero = ({ center = false, id = 'ill-enso-hero' } = {}) => `
  <section class="ds-section ds-hero${center ? ' ds-hero--center' : ''}">
    <div class="ds-container ds-hero__inner">
      <div class="ds-hero__content">
        <p class="ds-hero__eyebrow">Estúdio de identidade e sites</p>
        <h1 class="ds-hero__title">Marcas desenhadas à mão, sites feitos para durar</h1>
        <p class="ds-hero__lead">Criamos a identidade e o site do seu negócio num processo só, do primeiro rascunho ao ar.</p>
        <div class="ds-hero__actions">
          <a class="ds-btn ds-btn--primary ds-btn--lg" href="#">Pedir orçamento</a>
          <a class="ds-btn ds-btn--ghost ds-btn--lg" href="#">Ver projetos <ds-icon name="arrow-right"></ds-icon></a>
        </div>
        <p class="ds-hero__note"><ds-icon name="star"></ds-icon> 4,9 de média em 120 avaliações</p>
      </div>
      ${center ? '' : `<div class="ds-hero__media">${enso({ id })}</div>`}
    </div>
  </section>`;

const sectionHeader = (eyebrow, title, { lead = '', center = false, extra = '' } = {}) => `
  <header class="ds-section__header${center ? ' ds-section__header--center' : ''}">
    <p class="ds-section__eyebrow">${eyebrow}</p>
    <h2 class="ds-section__title">${title}</h2>
    ${lead ? `<p class="ds-section__lead">${lead}</p>` : ''}
    ${extra}
  </header>`;

export const features = ({ alt = true } = {}) => `
  <section class="ds-section${alt ? ' ds-section--alt' : ''}">
    <div class="ds-container">
      ${sectionHeader('O que fazemos', 'Tudo que a sua marca precisa para aparecer bem')}
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

const billingToggle = `
  <div class="ds-btn-group" role="group" aria-label="Forma de pagamento">
    <button class="ds-btn ds-btn--sm" aria-pressed="true" data-billing-option="monthly">Mensal</button>
    <button class="ds-btn ds-btn--sm" aria-pressed="false" data-billing-option="yearly">Anual · 2 meses grátis</button>
  </div>`;

export const plan = (item) => `
  <article class="ds-plan${item.featured ? ' ds-plan--featured' : ''}">
    ${item.featured ? '<span class="ds-plan__badge ds-badge ds-badge--accent ds-badge--solid ds-badge--pill">Mais escolhido</span>' : ''}
    <h3 class="ds-plan__name">${item.name}</h3>
    <p class="ds-plan__desc">${item.desc}</p>
    <p class="ds-plan__price">R$ <strong data-monthly="${item.monthly}" data-yearly="${item.yearly}">${item.monthly}</strong> /mês</p>
    <ul class="ds-plan__features">
      ${item.features.map((feature) => `<li><ds-icon name="check"></ds-icon> ${feature}</li>`).join('')}
      ${(item.missing ?? []).map((feature) => `<li aria-disabled="true"><ds-icon name="minus"></ds-icon> ${feature}</li>`).join('')}
    </ul>
    <a class="ds-btn ${item.featured ? 'ds-btn--primary' : 'ds-btn--secondary'} ds-btn--block" href="#">Escolher ${item.name}</a>
  </article>`;

export const pricing = ({ alt = false } = {}) => `
  <section class="ds-section${alt ? ' ds-section--alt' : ''}">
    <div class="ds-container">
      ${sectionHeader('Preços', 'Planos de manutenção do site', { lead: 'Sem fidelidade. Troque de plano quando quiser.', center: true, extra: billingToggle })}
      <div class="ds-grid" style="--grid-min: 15rem">${PLANS.map(plan).join('')}</div>
    </div>
  </section>`;

export const testimonial = ([quote, name, company]) => `
  <figure class="ds-testimonial">
    <blockquote class="ds-testimonial__quote">${quote}</blockquote>
    <figcaption class="ds-testimonial__author">
      <span class="ds-testimonial__avatar" aria-hidden="true">${initials(name)}</span>
      <span><span class="ds-testimonial__name">${name}</span><span class="ds-testimonial__role">${company}</span></span>
    </figcaption>
  </figure>`;

export const testimonials = ({ alt = true, carousel = false } = {}) => `
  <section class="ds-section${alt ? ' ds-section--alt' : ''}">
    <div class="ds-container">
      ${sectionHeader('Depoimentos', 'Quem já tirou a marca do papel')}
      ${carousel
        ? `<ds-carousel label="Depoimentos" per-view="2" loop><div class="ds-carousel__track">${TESTIMONIALS.map(testimonial).join('')}</div></ds-carousel>`
        : `<div class="ds-grid">${TESTIMONIALS.slice(0, 3).map(testimonial).join('')}</div>`}
    </div>
  </section>`;

export const faq = ({ alt = false } = {}) => `
  <section class="ds-section${alt ? ' ds-section--alt' : ''}">
    <div class="ds-container ds-container--narrow">
      ${sectionHeader('Dúvidas', 'Perguntas frequentes', { center: true })}
      <div class="ds-faq">
        ${QUESTIONS.map(([question, answer], i) => `
          <details class="ds-faq__item"${i === 0 ? ' open' : ''}>
            <summary class="ds-faq__question">${question}</summary>
            <div class="ds-faq__answer"><p>${answer}</p></div>
          </details>`).join('')}
      </div>
    </div>
  </section>`;

export const cta = () => `
  <section class="ds-section">
    <div class="ds-container">
      <div class="ds-cta">
        <div>
          <h2 class="ds-cta__title">Vamos desenhar a sua marca?</h2>
          <p class="ds-cta__text">Conte sobre o seu negócio e receba uma proposta em até 2 dias úteis.</p>
        </div>
        <div class="ds-cta__actions">
          <a class="ds-btn ds-btn--ghost ds-btn--lg" href="#">Falar no WhatsApp</a>
          <a class="ds-btn ds-btn--primary ds-btn--lg" href="#">Pedir orçamento</a>
        </div>
      </div>
    </div>
  </section>`;

export const footer = ({ wordmark = false } = {}) => `
  <footer class="ds-footer">
    <div class="ds-container">
      <div class="ds-footer__inner">
        <div class="ds-footer__brand">
          ${brand()}
          <p>Identidade visual, sites e ilustração para pequenos negócios com personalidade.</p>
          <div class="ds-footer__social">
            ${[['mail', 'E-mail'], ['phone', 'Telefone'], ['map-pin', 'Endereço']].map(([icon, label]) => `<a class="ds-btn ds-btn--ghost ds-btn--icon ds-btn--sm" href="#" aria-label="${label}"><ds-icon name="${icon}"></ds-icon></a>`).join('')}
          </div>
        </div>
        ${[['Estúdio', ['Sobre', 'Processo', 'Projetos']], ['Serviços', ['Identidade', 'Sites', 'Ilustração']], ['Ajuda', ['Contato', 'Perguntas', 'Preços']]].map(([heading, items]) => `
          <nav aria-label="${heading}">
            <h2 class="ds-footer__heading">${heading}</h2>
            <ul class="ds-footer__links">${items.map((item) => `<li><a href="#">${item}</a></li>`).join('')}</ul>
          </nav>`).join('')}
      </div>
      <div class="ds-footer__bottom">
        <p>© 2026 Ateliê Sumi. Feito com o Nanquim System.</p>
        <ul class="ds-footer__links"><li><a href="#">Privacidade</a></li><li><a href="#">Termos</a></li></ul>
      </div>
      ${wordmark ? '<p class="ds-footer__wordmark" aria-hidden="true">sumi.</p>' : ''}
    </div>
  </footer>`;

export const heroEditorial = ({ id = 'ill-landscape-hero' } = {}) => `
  <section class="ds-section ds-hero ds-hero--editorial">
    <div class="ds-container ds-hero__inner">
      <div class="ds-hero__content">
        <p class="ds-hero__eyebrow">Ateliê de nanquim · desde 2014</p>
        <h1 class="ds-hero__title">sumi.</h1>
        <div class="ds-hero__meta">
          <p><strong>Identidade</strong> Marcas desenhadas à mão, uma tinta de cada vez.</p>
          <p><strong>Sites</strong> Feitos para durar e para todo mundo ler.</p>
        </div>
        <div class="ds-hero__actions">
          <a class="ds-btn ds-btn--primary ds-btn--lg" href="#">Pedir orçamento</a>
          <a class="ds-btn ds-btn--link" href="#">Ver projetos <ds-icon name="arrow-right"></ds-icon></a>
        </div>
      </div>
      <div class="ds-hero__media">
        ${inkLandscape({ id })}
        <a class="ds-hero__corner" href="#" aria-label="Ver projetos"><ds-icon name="arrow-right"></ds-icon></a>
      </div>
      <p class="ds-hero__vertical">Materiais de criação<br>Coleção 2026</p>
    </div>
  </section>`;

export const statement = ({ alt = false } = {}) => `
  <section class="ds-section${alt ? ' ds-section--alt' : ''}">
    <div class="ds-container">
      <p class="ds-statement__label">(Manifesto)</p>
      <p class="ds-statement">Desenhamos marcas com <em>uma tinta só</em>. <span>O resto é ritmo, silêncio e um traço que não volta atrás.</span></p>
    </div>
  </section>`;

const SERVICES = [
  ['Identidade visual', 'Logo, cores e letras que contam quem você é.'],
  ['Sites sob medida', 'Rápidos, fáceis de editar e bons no celular.'],
  ['Ilustração', 'Desenhos à mão para o que é só seu.'],
  ['Acessibilidade', 'Contraste e teclado desde o primeiro traço.'],
];

export const services = ({ alt = false } = {}) => `
  <section class="ds-section${alt ? ' ds-section--alt' : ''}">
    <div class="ds-container">
      ${sectionHeader('Serviços', 'O que fazemos')}
      <ol class="ds-index">
        ${SERVICES.map(([title, text], i) => `
          <li class="ds-index__item">
            <span class="ds-index__number">0${i + 1}</span>
            <h3 class="ds-index__title">${title}</h3>
            <p class="ds-index__text">${text}</p>
            <ds-icon class="ds-index__icon" name="arrow-right"></ds-icon>
          </li>`).join('')}
      </ol>
    </div>
  </section>`;

const WORKS = [
  [inkWash, 'Café Aguada', 'Identidade · 2026'],
  [inkDrop, 'Papelaria Traço', 'Site · 2025'],
  [brushStroke, 'Cantina Pena', 'Cardápio · 2025'],
  [() => enso({ id: 'ill-enso-work' }), 'Bico de Pena', 'Identidade e site · 2024'],
];

export const works = ({ alt = true } = {}) => `
  <section class="ds-section${alt ? ' ds-section--alt' : ''}">
    <div class="ds-container">
      ${sectionHeader('Projetos', 'Trabalhos recentes')}
      <div class="ds-works">
        ${WORKS.map(([art, title, tags], i) => `
          <a class="ds-work" href="#">
            <div class="ds-work__media">${art()}</div>
            <div class="ds-work__meta">
              <span class="ds-work__number">0${i + 1}</span>
              <h3 class="ds-work__title">${title}</h3>
              <span class="ds-work__tags">${tags}</span>
            </div>
          </a>`).join('')}
      </div>
    </div>
  </section>`;

export const stats = ({ alt = false } = {}) => `
  <section class="ds-section ds-section--compact${alt ? ' ds-section--alt' : ''}">
    <div class="ds-container">
      <dl class="ds-stats">
        ${[['Anos de estúdio', '12'], ['Marcas desenhadas', '340'], ['Média de avaliação', '4,9<small>/5</small>'], ['Prazo de um site', '6<small> sem.</small>']].map(([label, value]) => `
          <div class="ds-stats__item"><dt class="ds-stats__label">${label}</dt><dd class="ds-stats__value">${value}</dd></div>`).join('')}
      </dl>
    </div>
  </section>`;

export const TEMPLATES = [['editorial', 'Editorial'], ['classico', 'Clássico']];

export const fullSite = (menuId, template = 'editorial') => template === 'classico'
  ? navbar({ menuId }) + hero() + features() + pricing() + testimonials() + faq() + cta() + footer()
  : navbar({ menuId, editorial: true }) + heroEditorial() + statement() + services() + works() + stats()
    + testimonials({ alt: true, carousel: true }) + pricing() + faq({ alt: true }) + cta() + footer({ wordmark: true });

export const WIDTHS = [['full', 'Computador'], ['768', 'Tablet'], ['390', 'Celular']];

export const frame = ({ content, url = 'ateliesumi.com.br', className = '', attrs = '', widths = true, tools = '' }) => `
  <div class="site-frame ${className}" data-frame>
    <div class="site-frame-bar">
      <span class="site-frame-dots" aria-hidden="true"><i></i><i></i><i></i></span>
      <span class="site-frame-url" aria-hidden="true">${url}</span>
      ${widths ? `<div class="doc-segmented site-frame-widths" role="radiogroup" aria-label="Largura da prévia">
        ${WIDTHS.map(([value, label], i) => `<button role="radio" aria-checked="${i === 0}" data-frame-width="${value}">${label}</button>`).join('')}
      </div>` : ''}
      ${tools}
    </div>
    <div class="site-frame-stage">
      <div class="site-frame-page" ${attrs}>${content}</div>
    </div>
  </div>`;

export function setFrameWidth(frameEl, value) {
  frameEl.querySelector('.site-frame-page').style.maxWidth = value === 'full' ? '' : `${value}px`;
  frameEl.querySelectorAll('[data-frame-width]').forEach((b) => b.setAttribute('aria-checked', String(b.dataset.frameWidth === value)));
}

// Comportamento comum das prévias: largura, alternância mensal/anual e links que não saem da página.
export function mountSiteDemos(el) {
  const onClick = (e) => {
    const widthOption = e.target.closest('[data-frame-width]');
    if (widthOption) setFrameWidth(widthOption.closest('[data-frame]'), widthOption.dataset.frameWidth);

    const billing = e.target.closest('[data-billing-option]');
    if (billing) {
      const section = billing.closest('.ds-section');
      section.querySelectorAll('[data-billing-option]').forEach((b) => b.setAttribute('aria-pressed', String(b === billing)));
      section.querySelectorAll('[data-monthly]').forEach((price) => {
        price.textContent = price.dataset[billing.dataset.billingOption];
      });
    }

    if (e.target.closest('.site-frame a, .ds-dialog a')) e.preventDefault();
  };
  el.addEventListener('click', onClick);
  return () => {
    el.removeEventListener('click', onClick);
    el.querySelectorAll('dialog[open]').forEach((d) => d.close());
  };
}
