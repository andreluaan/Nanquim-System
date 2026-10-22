import { inkDrop, brushStroke, inkWash, enso } from '../illustrations.js';

const GALLERY = [
  { art: inkDrop, title: 'A gota', text: 'Nanquim é pigmento de carbono, a fuligem, preso num aglutinante. Uma gota basta para um traço inteiro.' },
  { art: brushStroke, title: 'O traço', text: 'Feito com pena ou pincel, o traço é firme e não volta atrás. Por isso o nanquim é a tinta da arte-final.' },
  { art: inkWash, title: 'A aguada', text: 'Com água, a mesma tinta vira uma escala de cinzas. Uma única cor gera todos os tons do desenho.' },
  { art: () => enso({ id: 'ill-enso-card' }), title: 'O ensō', text: 'O círculo zen pintado numa única pincelada: o máximo de expressão com o mínimo de gestos.' },
];

const PRINCIPLES = [
  {
    name: 'Precisão',
    ink: 'A pena de nanquim desenha linhas finas e exatas, sem borrão.',
    system: 'Tudo segue uma escala: espaços múltiplos de 4px e tamanhos de texto fixos. Nada é "mais ou menos".',
  },
  {
    name: 'Contraste',
    ink: 'Preto sobre papel é a combinação mais legível que existe.',
    system: 'Todo texto passa no teste de contraste (mínimo de 4.5:1), medido automaticamente em todas as paletas.',
  },
  {
    name: 'Aguada',
    ink: 'Uma tinta, várias diluições, toda uma gama de tons.',
    system: 'Cada paleta nasce de poucos números: o sistema "dilui" uma cor em 12 tons equilibrados.',
  },
  {
    name: 'Permanência',
    ink: 'Depois de seco, o nanquim não sai. Por isso é usado em documentos e arte-final.',
    system: 'Cada peça é desenhada uma vez, documentada e reaproveitada em todos os projetos.',
  },
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
  lead: 'A tinta com que desenho meus sites. Um design system escuro, preciso e sóbrio, inspirado na tinta mais antiga da arte-final.',
  render: () => `
    <div class="pres-hero">
      <div class="pres-hero-art">${enso({ id: 'ill-enso-hero', color: 'currentColor', withPaper: false, animated: true })}</div>
      <div class="pres-hero-text">
        <p class="doc-eyebrow">Nanquim System · v0.4</p>
        <p class="pres-quote">"Desenhar cada peça uma vez, com precisão, e usar em tudo."</p>
      </div>
    </div>

    <section class="doc-section">
      <h2>O que é nanquim</h2>
      <p>É a tinta preta de desenhistas, calígrafos e quadrinistas. O nome vem de <strong>Nanquim</strong>, como os portugueses chamavam
      a cidade chinesa de Nanjing, porque a tinta chegava de lá. Ela é usada há mais de dois mil anos, da caligrafia oriental
      às plantas de arquitetura e aos gibis.</p>
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
      <p>Cada qualidade da tinta virou uma regra do sistema.</p>
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
      <p>O tema tem dois lados. No modo escuro, a tela é a tinta e o destaque tem cor de papel. No modo claro, inverte:
      a tela é o papel e o destaque é a tinta.</p>
      <div class="pres-modes">
        ${modePreview('dark', 'Modo escuro · tinta', 'Fundo preto-azulado, como o nanquim de verdade, com destaques em marfim.')}
        ${modePreview('light', 'Modo claro · papel', 'Fundo marfim quente, como papel de desenho, com destaques em tinta.')}
      </div>
    </section>

    <section class="doc-section">
      <h2>Aguada: uma tinta, doze tons</h2>
      <p>Arraste para "diluir" a tinta. Cada tom tem uma função na interface, do fundo da página ao texto principal.</p>
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
      <p>Por baixo da metáfora, é um sistema de tokens que funciona em qualquer projeto e troca de marca com poucas linhas.</p>
      <div class="pres-cta">
        <a class="ds-btn ds-btn--primary ds-btn--lg" href="#inicio">Como o sistema funciona</a>
        <a class="ds-btn ds-btn--outline ds-btn--lg" href="#botoes">Ver os componentes</a>
      </div>
      <p class="pres-note">As imagens desta página são ilustrações geradas em código (SVG), com textura de papel e borda de tinta simuladas.</p>
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
