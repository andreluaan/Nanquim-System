import { iconSvg } from '../../icons/icons.js';

const DEFAULT_INTERVAL = 6000;
const DRAG_THRESHOLD = 6;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

let nextId = 0;

class DsCarousel extends HTMLElement {
  static observedAttributes = ['per-view'];

  connectedCallback() {
    this.track = this.querySelector('.ds-carousel__track');
    if (!this.track || this.controls) return;

    this.slides = [...this.track.children];
    this.index = 0;
    this.track.id ||= `ds-carousel-${++nextId}`;
    this.track.tabIndex = 0;

    this.setAttribute('role', 'region');
    this.setAttribute('aria-roledescription', 'carrossel');
    this.setAttribute('aria-label', this.getAttribute('label') ?? 'Carrossel');
    this.slides.forEach((slide, i) => {
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', `${i + 1} de ${this.slides.length}`);
    });

    this.renderControls();
    this.bindEvents();
    this.applyPerView();
    this.measure();

    // Movimento reduzido: o autoplay começa pausado, e só roda se a pessoa pedir.
    this.userPaused = reducedMotion.matches;
    this.hovering = false;
    this.focused = false;
    this.updatePlayback();
  }

  disconnectedCallback() {
    this.resizeObserver?.disconnect();
  }

  attributeChangedCallback() {
    this.applyPerView();
  }

  get loop() {
    return this.hasAttribute('loop') || this.hasAttribute('autoplay');
  }

  get interval() {
    return Number(this.getAttribute('autoplay')) || DEFAULT_INTERVAL;
  }

  applyPerView() {
    const perView = Number(this.getAttribute('per-view'));
    if (perView > 0) this.style.setProperty('--carousel-per-view', perView);
  }

  renderControls() {
    const button = (role, icon, label) =>
      `<button class="ds-btn ds-btn--icon ds-btn--sm ds-carousel__${role}" type="button" aria-controls="${this.track.id}" aria-label="${label}">${iconSvg(icon)}</button>`;

    this.controls = document.createElement('div');
    this.controls.className = 'ds-carousel__controls';
    this.controls.innerHTML = `
      ${this.hasAttribute('autoplay') ? button('play', 'pause', 'Pausar') : ''}
      <div class="ds-carousel__dots"></div>
      ${button('prev', 'chevron-left', 'Slide anterior')}
      ${button('next', 'chevron-right', 'Próximo slide')}`;
    this.append(this.controls);

    this.dots = this.controls.querySelector('.ds-carousel__dots');
    this.prevButton = this.controls.querySelector('.ds-carousel__prev');
    this.nextButton = this.controls.querySelector('.ds-carousel__next');
    this.playButton = this.controls.querySelector('.ds-carousel__play');
    this.style.setProperty('--carousel-interval', `${this.interval}ms`);
  }

  bindEvents() {
    this.prevButton.addEventListener('click', () => this.step(-1));
    this.nextButton.addEventListener('click', () => this.step(1));
    this.dots.addEventListener('click', (e) => {
      const dot = e.target.closest('[data-index]');
      if (dot) this.goTo(Number(dot.dataset.index));
    });
    // O fim da barra de progresso do indicador ativo é o relógio do autoplay: pausar a animação pausa a troca.
    this.dots.addEventListener('animationend', () => this.step(1));

    this.playButton?.addEventListener('click', () => {
      this.userPaused = !this.userPaused;
      this.updatePlayback();
    });

    this.track.addEventListener('keydown', (e) => this.onKeydown(e));
    this.track.addEventListener('scroll', () => this.onScroll(), { passive: true });
    this.track.addEventListener('scrollend', () => this.releaseScroll());
    ['pointerdown', 'wheel', 'touchstart'].forEach((type) =>
      this.track.addEventListener(type, () => this.releaseScroll(), { passive: true }));
    this.bindDrag();

    this.addEventListener('pointerenter', (e) => e.pointerType === 'mouse' && this.setHover(true));
    this.addEventListener('pointerleave', () => this.setHover(false));
    this.addEventListener('focusin', (e) => e.target.matches(':focus-visible') && this.setFocus(true));
    this.addEventListener('focusout', (e) => !this.contains(e.relatedTarget) && this.setFocus(false));

    this.resizeObserver = new ResizeObserver(() => this.measure());
    this.resizeObserver.observe(this.track);
  }

  // Arrastar com o mouse; no toque, a rolagem nativa com scroll-snap já faz o trabalho.
  bindDrag() {
    let startX = 0;
    let startScroll = 0;
    let moved = false;

    this.track.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      startX = e.clientX;
      startScroll = this.track.scrollLeft;
      moved = false;
      this.track.setPointerCapture(e.pointerId);
    });

    this.track.addEventListener('pointermove', (e) => {
      if (!this.track.hasPointerCapture(e.pointerId)) return;
      const delta = e.clientX - startX;
      if (!moved && Math.abs(delta) < DRAG_THRESHOLD) return;
      moved = true;
      this.track.dataset.dragging = '';
      this.track.scrollLeft = startScroll - delta;
    });

    this.track.addEventListener('pointerup', (e) => {
      if (!moved) return;
      delete this.track.dataset.dragging;
      const direction = Math.sign(startX - e.clientX);
      const nearest = this.nearestIndex();
      this.goTo(nearest === this.index ? this.index + direction : nearest);
    });

    // Um arraste que termina em cima de um link não pode virar clique.
    this.track.addEventListener('click', (e) => {
      if (moved) e.preventDefault();
      moved = false;
    }, true);
    this.track.addEventListener('dragstart', (e) => e.preventDefault());
  }

  onKeydown(e) {
    if (e.target !== this.track) return;
    const actions = {
      ArrowLeft: () => this.step(-1),
      ArrowRight: () => this.step(1),
      Home: () => this.goTo(0),
      End: () => this.goTo(this.positions.length - 1),
    };
    if (!actions[e.key]) return;
    e.preventDefault();
    actions[e.key]();
  }

  // Durante uma rolagem iniciada por botão, os slides do meio do caminho não podem virar o slide atual.
  onScroll() {
    if (this.scrollFrame) return;
    this.scrollFrame = requestAnimationFrame(() => {
      this.scrollFrame = null;
      if (this.scrollTarget !== undefined) {
        if (Math.abs(this.track.scrollLeft - this.positions[this.scrollTarget]) < 2) this.scrollTarget = undefined;
        return;
      }
      const nearest = this.nearestIndex();
      if (nearest !== this.index) this.setIndex(nearest);
    });
  }

  releaseScroll() {
    if (this.scrollTarget === undefined) return;
    this.scrollTarget = undefined;
    this.onScroll();
  }

  // Com vários cards por vez, o último "passo" é o fim da rolagem, então os passos não são um por slide.
  measure() {
    const maxScroll = this.track.scrollWidth - this.track.clientWidth;
    const offsets = this.slides.map((slide) => Math.min(slide.offsetLeft - this.slides[0].offsetLeft, maxScroll));
    this.positions = offsets.filter((offset, i) => i === 0 || offset - offsets[i - 1] > 1);

    if (this.dots.children.length !== this.positions.length) {
      this.dots.innerHTML = this.positions
        .map((_, i) => `<button class="ds-carousel__dot" type="button" data-index="${i}" aria-controls="${this.track.id}" aria-label="Ir para o slide ${i + 1}"></button>`)
        .join('');
    }
    this.controls.hidden = this.positions.length < 2;
    this.setIndex(Math.min(this.index, this.positions.length - 1));
  }

  nearestIndex() {
    const scroll = this.track.scrollLeft;
    return this.positions.reduce((best, offset, i) =>
      Math.abs(offset - scroll) < Math.abs(this.positions[best] - scroll) ? i : best, 0);
  }

  step(direction) {
    const last = this.positions.length - 1;
    let target = this.index + direction;
    if (this.loop && target > last) target = 0;
    if (this.loop && target < 0) target = last;
    this.goTo(target);
  }

  goTo(target) {
    const index = Math.max(0, Math.min(target, this.positions.length - 1));
    if (Math.abs(this.track.scrollLeft - this.positions[index]) > 1) this.scrollTarget = index;
    this.track.scrollTo({
      left: this.positions[index],
      behavior: reducedMotion.matches ? 'auto' : 'smooth',
    });
    this.setIndex(index);
  }

  setIndex(index) {
    const changed = index !== this.index;
    this.index = index;

    [...this.dots.children].forEach((dot, i) => {
      dot.toggleAttribute('aria-current', i === index);
    });
    this.prevButton.disabled = !this.loop && index === 0;
    this.nextButton.disabled = !this.loop && index === this.positions.length - 1;

    // Slides fora da área visível saem da ordem de foco e do leitor de tela.
    const start = this.positions[index];
    const end = start + this.track.clientWidth;
    const origin = this.slides[0].offsetLeft;
    this.slides.forEach((slide) => {
      const left = slide.offsetLeft - origin;
      slide.inert = left + slide.offsetWidth <= start + 1 || left >= end - 1;
    });

    if (changed) {
      this.dispatchEvent(new CustomEvent('ds-slide-change', { detail: { index }, bubbles: true }));
    }
  }

  setHover(value) {
    this.hovering = value;
    this.updatePlayback();
  }

  setFocus(value) {
    this.focused = value;
    this.updatePlayback();
  }

  updatePlayback() {
    if (!this.playButton) return;
    const paused = this.userPaused || this.hovering || this.focused;
    this.toggleAttribute('data-paused', paused);
    // Enquanto troca sozinho, anunciar cada slide atrapalharia o leitor de tela.
    this.track.setAttribute('aria-live', paused ? 'polite' : 'off');

    this.playButton.innerHTML = iconSvg(this.userPaused ? 'play' : 'pause');
    this.playButton.setAttribute('aria-label', this.userPaused ? 'Reproduzir' : 'Pausar');
  }
}

if (!customElements.get('ds-carousel')) {
  customElements.define('ds-carousel', DsCarousel);
}
