import { code, doDont, copyModeSwitch, mountCopyModeSwitch } from '../utils.js';

const EASINGS = [
  { t: 'ease-out', name: 'Saída suave', use: 'O que entra. O padrão.' },
  { t: 'ease-in-out', name: 'Ida e volta', use: 'O que muda de lugar.' },
  { t: 'ease-spring', name: 'Mola', use: 'Feedback. Com moderação.' },
];
const DURATIONS = [
  { t: 'instant', ms: 80, use: 'Hover de cor' },
  { t: 'fast', ms: 140, use: 'Botões' },
  { t: 'base', ms: 220, use: 'Menus' },
  { t: 'slow', ms: 380, use: 'Modais' },
];

export default {
  id: 'movimento',
  group: 'Fundações',
  title: 'Movimento',
  keywords: 'animação animation transição easing duração motion',
  lead: 'Animação boa quase não se nota: só mostra de onde algo veio. Quem pede menos movimento recebe tudo instantâneo.',
  render: () => `
    ${copyModeSwitch()}

    <section class="doc-section">
      <h2>Curvas</h2>
      <p>Toque e compare.</p>
      <div class="motion-list">
        ${EASINGS.map((e) => `
          <div class="motion-row">
            <div class="motion-info">
              <strong>${e.name}</strong>
              <small>${e.use}</small>
              <code data-copy-token="--ds-${e.t}">${e.t}</code>
            </div>
            <div class="motion-track"><span class="motion-ball" style="transition-timing-function: var(--ds-${e.t})"></span></div>
          </div>`).join('')}
      </div>
      <button class="doc-btn doc-btn--primary" data-play>▶ Tocar</button>
    </section>

    <section class="doc-section">
      <h2>Durações</h2>
      <p>Passe o mouse em cada quadrado.</p>
      <div class="motion-durations">
        ${DURATIONS.map((d) => `
          <button class="motion-dur" style="transition-duration: var(--ds-duration-${d.t})" data-copy-token="--ds-duration-${d.t}">
            <span class="motion-dur-box"></span>
            <code>${d.t}</code><small>${d.ms}ms · ${d.use}</small>
          </button>`).join('')}
      </div>
      ${doDont(
        ['Animar opacidade e posição', 'Entrar mais devagar que sair'],
        ['Passar de ~400ms', 'Animar só por enfeite'],
      )}
      ${code(`
.dropdown {
  transition:
    opacity var(--ds-duration-base) var(--ds-ease-out),
    transform var(--ds-duration-base) var(--ds-ease-out);
}`)}
    </section>`,

  mount(el) {
    mountCopyModeSwitch(el, '--ds-duration-base');
    const btn = el.querySelector('[data-play]');
    btn.addEventListener('click', () => el.querySelectorAll('.motion-track').forEach((t) => t.classList.toggle('is-end')));
  },
};
