import { code, doDont } from '../utils.js';
import { features, frame, mountSiteDemos } from '../site-kit.js';

export default {
  id: 'recursos',
  group: 'Seções de site',
  title: 'Recursos',
  keywords: 'recursos serviços benefícios features vantagens ícones grade o que fazemos',
  lead: 'O que você faz por mim: ícone, título e uma frase.',
  render: () => `
    <section class="doc-section">
      <h2>Na prática</h2>
      <p><code>ds-feature</code> numa <code>ds-grid</code>: 4, 2 ou 1 por linha.</p>
      ${frame({ content: features() })}
      ${doDont(
        ['De 3 a 6 itens', 'Títulos com o benefício'],
        ['Parágrafos longos', 'A mesma ideia duas vezes'],
      )}
      ${code(`
<div class="ds-grid" style="--grid-min: 12rem">
  <article class="ds-feature">
    <span class="ds-feature__icon"><ds-icon name="pen"></ds-icon></span>
    <h3 class="ds-feature__title">Identidade visual</h3>
    <p class="ds-feature__text">Logo, cores e tipografia prontas para usar.</p>
  </article>
</div>`, 'html')}
    </section>`,
  mount: (el) => mountSiteDemos(el),
};
