import { code, doDont } from '../utils.js';

export default {
  id: 'elevacao',
  group: 'Fundações',
  title: 'Elevação',
  keywords: 'sombra shadow camada profundidade elevation',
  lead: "No escuro, sombras quase não aparecem: a profundidade vem de camadas, e quanto mais \"perto\" de você, mais clara a superfície. No claro, superfícies brancas com sombras suaves. Sem brilho, sem neon.",
  render: () => `
    <section class="doc-section">
      <h2>Camadas</h2>
      <p>Passe o mouse nas camadas para ver como cada uma "levanta".</p>
      <div class="elev-stack">
        <div class="elev-layer elev-0"><span>Fundo</span><code>color-bg</code></div>
        <div class="elev-layer elev-1"><span>Superfície</span><code>color-surface · shadow-sm</code></div>
        <div class="elev-layer elev-2"><span>Elevada</span><code>surface-raised · shadow-md</code></div>
        <div class="elev-layer elev-3"><span>Flutuante</span><code>surface-raised · shadow-lg</code></div>
      </div>
    </section>

    <section class="doc-section">
      <h2>Sombras</h2>
      <p>Cada sombra tem uma linha de luz quase invisível no topo, como luz vinda de cima. É ela que separa os elementos no escuro.</p>
      <div class="elev-shadows">
        ${['sm', 'md', 'lg'].map((s) => `
          <button class="elev-shadow" style="box-shadow: var(--ds-shadow-${s})" data-copy="var(--ds-shadow-${s})" data-copy-label="Token copiado">
            <code>shadow-${s}</code>
            <small>${{ sm: 'Cards, botões', md: 'Dropdowns, popovers', lg: 'Modais, gavetas' }[s]}</small>
          </button>`).join('')}
      </div>
      ${doDont(
        ['Elementos mais altos = superfície mais clara', 'Usar sombra-lg só no que sobrepõe a página'],
        ['Brilhos coloridos (glow) ao redor de cards', 'Empilhar várias sombras fortes na mesma tela'],
      )}
      ${code(`
.dropdown {
  background: var(--ds-color-surface-raised);
  box-shadow: var(--ds-shadow-md);
  z-index: var(--ds-z-dropdown);
}`)}
    </section>`,
};
