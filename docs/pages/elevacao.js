import { code, doDont, copyModeSwitch, mountCopyModeSwitch } from '../utils.js';

export default {
  id: 'elevacao',
  group: 'Fundações',
  title: 'Elevação',
  keywords: 'sombra shadow camada profundidade elevation',
  lead: 'Profundidade sem brilho: quanto mais perto, mais clara a superfície.',
  render: () => `
    ${copyModeSwitch()}

    <section class="doc-section">
      <h2>Camadas</h2>
      <p>Passe o mouse para levantar.</p>
      <div class="elev-stack">
        <div class="elev-layer elev-0"><span>Fundo</span><code>color-bg</code></div>
        <div class="elev-layer elev-1"><span>Superfície</span><code>color-surface · shadow-sm</code></div>
        <div class="elev-layer elev-2"><span>Elevada</span><code>surface-raised · shadow-md</code></div>
        <div class="elev-layer elev-3"><span>Flutuante</span><code>surface-raised · shadow-lg</code></div>
      </div>
    </section>

    <section class="doc-section">
      <h2>Sombras</h2>
      <p>Um fio de luz no topo separa as peças no escuro.</p>
      <div class="elev-shadows">
        ${['sm', 'md', 'lg'].map((s) => `
          <button class="elev-shadow" style="box-shadow: var(--ds-shadow-${s})" data-copy-token="--ds-shadow-${s}">
            <code>shadow-${s}</code>
            <small>${{ sm: 'Cards', md: 'Menus', lg: 'Modais' }[s]}</small>
          </button>`).join('')}
      </div>
      ${doDont(
        ['Mais alto, mais claro', 'shadow-lg só no que cobre a página'],
        ['Brilho colorido (glow)', 'Várias sombras fortes juntas'],
      )}
      ${code(`
.dropdown {
  background: var(--ds-color-surface-raised);
  box-shadow: var(--ds-shadow-md);
  z-index: var(--ds-z-dropdown);
}`)}
    </section>`,
  mount: (el) => mountCopyModeSwitch(el, '--ds-shadow-sm'),
};
