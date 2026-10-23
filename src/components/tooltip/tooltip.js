const OPPOSITE = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };
const HIDE_DELAY = 120;

let nextId = 0;

class DsTooltip extends HTMLElement {
  static observedAttributes = ['text'];

  connectedCallback() {
    this.trigger = this.firstElementChild;
    if (!this.trigger || this.bubble) return;

    this.bubble = document.createElement('span');
    this.bubble.className = 'ds-tooltip__bubble';
    this.bubble.id = `ds-tooltip-${++nextId}`;
    this.bubble.setAttribute('role', 'tooltip');
    this.append(this.bubble);
    this.dataset.side = this.placement;
    this.render();

    this.addEventListener('pointerenter', () => this.show());
    this.addEventListener('pointerleave', () => this.hide());
    this.addEventListener('focusin', (e) => e.target.matches(':focus-visible') && this.show());
    this.addEventListener('focusout', () => this.hide(0));
    this.onKeydown = (e) => e.key === 'Escape' && this.hide(0);
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this.onKeydown);
  }

  get placement() {
    return this.getAttribute('placement') ?? 'top';
  }

  attributeChangedCallback() {
    if (this.bubble) this.render();
  }

  render() {
    const text = this.getAttribute('text') ?? '';
    this.bubble.textContent = text;
    // Num botão de ícone, o aria-label já diz o mesmo texto; descrever de novo faria o leitor repetir.
    if (this.trigger.getAttribute('aria-label') === text) {
      this.trigger.removeAttribute('aria-describedby');
    } else {
      this.trigger.setAttribute('aria-describedby', this.bubble.id);
    }
  }

  show() {
    clearTimeout(this.hideTimer);
    if (this.hasAttribute('data-open')) return;
    this.dataset.side = this.placement;
    this.toggleAttribute('data-open', true);
    document.addEventListener('keydown', this.onKeydown);
    this.flipIfClipped();
  }

  // O pequeno atraso deixa o ponteiro atravessar do gatilho até o balão sem fechá-lo.
  hide(delay = HIDE_DELAY) {
    clearTimeout(this.hideTimer);
    this.hideTimer = setTimeout(() => {
      this.removeAttribute('data-open');
      document.removeEventListener('keydown', this.onKeydown);
    }, delay);
  }

  flipIfClipped() {
    const box = this.bubble.getBoundingClientRect();
    const clipped = {
      top: box.top < 0,
      bottom: box.bottom > innerHeight,
      left: box.left < 0,
      right: box.right > innerWidth,
    };
    if (clipped[this.dataset.side]) this.dataset.side = OPPOSITE[this.dataset.side];
  }
}

if (!customElements.get('ds-tooltip')) {
  customElements.define('ds-tooltip', DsTooltip);
}
