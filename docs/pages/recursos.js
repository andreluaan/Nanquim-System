import { code, doDont } from '../utils.js';
import { features, frame, mountSiteDemos } from '../site-kit.js';

export default {
  id: 'recursos',
  group: 'Seções de site',
  title: 'Recursos',
  keywords: 'recursos serviços benefícios features vantagens ícones grade o que fazemos',
  lead: 'A seção que responde "o que você faz por mim?": serviços, benefícios ou diferenciais, cada um com ícone, título e uma frase.',
  render: () => `
    <section class="doc-section">
      <h2>Na prática</h2>
      <p>Cada item é um <code>ds-feature</code> dentro de uma <code>ds-grid</code>. Com <code>--grid-min: 12rem</code>, cabem 4 por linha no computador, 2 no tablet e 1 no celular.</p>
      ${frame({ content: features() })}
      ${doDont(
        ['De 3 a 6 itens', 'Títulos curtos, com o benefício', 'Ícones do mesmo conjunto e do mesmo peso'],
        ['Parágrafos longos em cada item', 'Ícones de estilos misturados', 'Itens que repetem a mesma ideia com outras palavras'],
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
