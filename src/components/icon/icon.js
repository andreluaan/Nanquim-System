import { iconSvg } from '../../icons/icons.js';

class DsIcon extends HTMLElement {
  static observedAttributes = ['name', 'label'];

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = iconSvg(this.getAttribute('name'));
    const label = this.getAttribute('label');

    // Com label, o ícone carrega significado sozinho; sem label, é decorativo e some para leitores de tela.
    if (label) {
      this.setAttribute('role', 'img');
      this.setAttribute('aria-label', label);
      this.removeAttribute('aria-hidden');
    } else {
      this.setAttribute('aria-hidden', 'true');
      this.removeAttribute('role');
      this.removeAttribute('aria-label');
    }
  }
}

if (!customElements.get('ds-icon')) {
  customElements.define('ds-icon', DsIcon);
}
