import { code, doDont } from '../utils.js';

const EASINGS = [
  { t: 'ease-out', name: 'Saída suave', use: 'Coisas que entram na tela. O padrão.' },
  { t: 'ease-in-out', name: 'Ida e volta', use: 'Coisas que mudam de lugar.' },
  { t: 'ease-spring', name: 'Mola', use: 'Feedback divertido: toasts, curtidas. Com moderação.' },
];
const DURATIONS = [
  { t: 'instant', ms: 80, use: 'Hover de cor' },
  { t: 'fast', ms: 140, use: 'Botões, toggles' },
  { t: 'base', ms: 220, use: 'Dropdowns, abas' },
  { t: 'slow', ms: 380, use: 'Modais, gavetas' },
];

export default {
  id: 'movimento',
  group: 'Fundações',
  title: 'Movimento',
  keywords: 'animação animation transição easing duração motion',
  lead: 'Animação boa é a que você quase não percebe: ela só explica de onde algo veio e para onde foi. Quem prefere menos movimento no sistema operacional recebe tudo instantâneo.',
  render: () => `
    <section class="doc-section">
      <h2>Curvas</h2>
      <p>Clique em "Tocar" e compare como cada curva acelera e freia.</p>
      <div class="motion-list">
        ${EASINGS.map((e) => `
          <div class="motion-row">
            <div class="motion-info">
              <strong>${e.name}</strong>
              <small>${e.use}</small>
              <code data-copy="var(--ds-${e.t})" data-copy-label="Token copiado">${e.t}</code>
            </div>
            <div class="motion-track"><span class="motion-ball" style="transition-timing-function: var(--ds-${e.t})"></span></div>
          </div>`).join('')}
      </div>
      <button class="doc-btn doc-btn--primary" data-play>▶ Tocar</button>
    </section>

    <section class="doc-section">
      <h2>Durações</h2>
      <p>Passe o mouse em cada quadrado: a mudança acontece na velocidade indicada.</p>
      <div class="motion-durations">
        ${DURATIONS.map((d) => `
          <button class="motion-dur" style="transition-duration: var(--ds-duration-${d.t})" data-copy="var(--ds-duration-${d.t})" data-copy-label="Token copiado">
            <span class="motion-dur-box"></span>
            <code>${d.t}</code><small>${d.ms}ms · ${d.use}</small>
          </button>`).join('')}
      </div>
      ${doDont(
        ['Animar só opacidade e posição (é mais leve)', 'Entradas um pouco mais lentas que saídas'],
        ['Animações acima de ~400ms em interface', 'Animar algo só "porque fica bonito"'],
      )}
      ${code(`
.dropdown {
  transition:
    opacity var(--ds-duration-base) var(--ds-ease-out),
    transform var(--ds-duration-base) var(--ds-ease-out);
}`)}
    </section>`,

  mount(el) {
    const btn = el.querySelector('[data-play]');
    btn.addEventListener('click', () => el.querySelectorAll('.motion-track').forEach((t) => t.classList.toggle('is-end')));
  },
};
