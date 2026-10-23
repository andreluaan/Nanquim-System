import { inkDrop, brushStroke, inkWash, enso } from '../illustrations.js';

const GALLERY = [
  { art: inkDrop, title: 'A gota', text: 'Fuligem e cola. Uma gota faz um traço inteiro.' },
  { art: brushStroke, title: 'O traço', text: 'Firme e sem volta: a tinta da arte-final.' },
  { art: inkWash, title: 'A aguada', text: 'Com água, uma cor vira todos os cinzas.' },
  { art: () => enso({ id: 'ill-enso-card' }), title: 'O ensō', text: 'Um círculo, uma pincelada.' },
];

const PRINCIPLES = [
  { name: 'Precisão', ink: 'Linha fina, sem borrão.', system: 'Tudo em escala: espaços de 4 em 4px.' },
  { name: 'Contraste', ink: 'Preto no papel se lê de longe.', system: 'Todo texto passa de 4.5:1, em toda paleta.' },
  { name: 'Aguada', ink: 'Uma tinta, muitos tons.', system: 'Uma cor vira 12 tons equilibrados.' },
  { name: 'Permanência', ink: 'Seco, não sai mais.', system: 'Cada peça é feita uma vez e reaproveitada.' },
];

const STEP_NAMES = {
  1: 'Fundo', 2: 'Superfície', 3: 'Elevado', 4: 'Hover', 5: 'Pressionado', 6: 'Borda sutil',
  7: 'Borda', 8: 'Borda forte', 9: 'Texto discreto', 10: 'Ícones', 11: 'Texto suave', 12: 'Texto',
};

function modePreview(mode, label, description) {
  return `
    <div class="pres-mode" data-theme="nanquim" data-mode="${mode}">
      <p class="pres-mode-label">${label}</p>
      <h3>Arte-final em uma pincelada</h3>
      <p>${description}</p>
      <div class="pres-mode-actions">
        <button class="ds-btn ds-btn--primary">Começar</button>
        <button class="ds-btn ds-btn--ghost">Saiba mais</button>
      </div>
    </div>`;
}

export default {
  id: 'apresentacao',
  group: 'Começo',
  title: 'Nanquim',
  keywords: 'conceito marca identidade tinta apresentação sobre',
  lead: 'A tinta com que desenho meus sites: escura, precisa e sóbria.',
  render: () => `
    <div class="pres-hero">
      <div class="pres-hero-art">${enso({ id: 'ill-enso-hero', color: 'currentColor', withPaper: false, animated: true })}</div>
      <div class="pres-hero-text">
        <p class="doc-eyebrow">Nanquim System · v0.11</p>
        <p class="pres-quote">"Desenhar uma vez, usar em tudo."</p>
      </div>
    </div>

    <section class="doc-section">
      <h2>O que é nanquim</h2>
      <p>A tinta preta de calígrafos e quadrinistas. O nome vem de Nanjing, na China, de onde ela chegava aos portugueses.</p>
      <div class="pres-gallery">
        ${GALLERY.map((item) => `
          <figure class="pres-figure">
            <div class="pres-figure-art">${item.art()}</div>
            <figcaption><strong>${item.title}</strong><span>${item.text}</span></figcaption>
          </figure>`).join('')}
      </div>
    </section>

    <section class="doc-section">
      <h2>Por que esse nome</h2>
      <p>Cada qualidade da tinta virou uma regra.</p>
      <div class="pres-principles">
        ${PRINCIPLES.map((p, i) => `
          <article class="pres-principle">
            <span class="pres-principle-num">0${i + 1}</span>
            <h3>${p.name}</h3>
            <dl>
              <dt>Na tinta</dt><dd>${p.ink}</dd>
              <dt>No sistema</dt><dd>${p.system}</dd>
            </dl>
          </article>`).join('')}
      </div>
    </section>

    <section class="doc-section">
      <h2>Tinta e papel</h2>
      <p>No escuro, a tela é tinta e o destaque é papel. No claro, o inverso.</p>
      <div class="pres-modes">
        ${modePreview('dark', 'Escuro · tinta', 'Preto-azulado com destaque marfim.')}
        ${modePreview('light', 'Claro · papel', 'Marfim quente com destaque em tinta.')}
      </div>
    </section>

    <section class="doc-section">
      <h2>Aguada: uma tinta, doze tons</h2>
      <p>Arraste para diluir. Cada tom tem uma função, do fundo ao texto.</p>
      <div class="pres-wash">
        <div class="pres-wash-strip">
          ${Array.from({ length: 12 }, (_, i) => `<span style="background: var(--ds-neutral-${i + 1})" data-step="${i + 1}"></span>`).join('')}
        </div>
        <label class="pres-wash-control">
          <span>Diluição</span>
          <input type="range" min="1" max="12" value="12" data-wash />
        </label>
        <div class="pres-wash-result">
          <span class="pres-wash-swatch" data-wash-swatch></span>
          <div>
            <strong data-wash-name></strong>
            <code data-wash-token></code>
          </div>
        </div>
      </div>
    </section>

    <section class="doc-section">
      <h2>Do conceito ao código</h2>
      <p>Por baixo da metáfora, tokens que trocam de marca em poucas linhas.</p>
      <div class="pres-cta">
        <a class="ds-btn ds-btn--primary ds-btn--lg" href="#inicio">Como o sistema funciona</a>
        <a class="ds-btn ds-btn--outline ds-btn--lg" href="#botoes">Ver os componentes</a>
      </div>
      <p class="pres-note">Ilustrações feitas em código (SVG).</p>
    </section>`,

  mount(el) {
    const range = el.querySelector('[data-wash]');
    const swatch = el.querySelector('[data-wash-swatch]');
    const name = el.querySelector('[data-wash-name]');
    const token = el.querySelector('[data-wash-token]');
    const steps = el.querySelectorAll('[data-step]');

    const update = () => {
      const step = Number(range.value);
      swatch.style.background = `var(--ds-neutral-${step})`;
      name.textContent = `${step} · ${STEP_NAMES[step]}`;
      token.textContent = `--ds-neutral-${step}`;
      steps.forEach((s) => s.classList.toggle('is-active', Number(s.dataset.step) === step));
    };

    range.addEventListener('input', update);
    update();
  },
};
