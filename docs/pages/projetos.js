import { code, doDont } from '../utils.js';
import { frame, mountSiteDemos, works } from '../site-kit.js';

export default {
  id: 'projetos',
  group: 'Seções de site',
  title: 'Projetos',
  keywords: 'projetos portfólio trabalhos galeria cases grade assimétrica editorial',
  lead: 'O portfólio em grade assimétrica: larguras alternadas e um degrau entre as colunas.',
  render: () => `
    <section class="doc-section">
      <h2>Na prática</h2>
      <p>Cada <code>ds-work</code> é um link. No celular, um por linha.</p>
      ${frame({ content: works() })}
      ${doDont(
        ['Imagens com a mesma luz e o mesmo tratamento', 'Número de itens par'],
        ['Mais de 8 projetos', 'Legendas longas'],
      )}
      ${code(`
<div class="ds-works">
  <a class="ds-work" href="/projetos/cafe-aguada">
    <div class="ds-work__media"><img src="cafe.jpg" alt="Embalagens do Café Aguada"></div>
    <div class="ds-work__meta">
      <span class="ds-work__number">01</span>
      <h3 class="ds-work__title">Café Aguada</h3>
      <span class="ds-work__tags">Identidade · 2026</span>
    </div>
  </a>
</div>`, 'html')}
    </section>`,
  mount: (el) => mountSiteDemos(el),
};
