import { code, doDont } from '../utils.js';
import { cta, frame, mountSiteDemos } from '../site-kit.js';

export default {
  id: 'chamada',
  group: 'Seções de site',
  title: 'Chamada para ação',
  keywords: 'chamada para ação cta call to action convite orçamento contato final',
  lead: 'O último convite antes do rodapé.',
  render: () => `
    <section class="doc-section">
      <h2>Na prática</h2>
      <p>No celular, os botões descem.</p>
      ${frame({ content: cta() })}
      ${doDont(
        ['Falar do resultado', 'A mesma ação do hero'],
        ['Duas chamadas', '"Clique aqui"'],
      )}
      ${code(`
<div class="ds-cta">
  <div>
    <h2 class="ds-cta__title">Vamos desenhar a sua marca?</h2>
    <p class="ds-cta__text">Proposta em até 2 dias úteis.</p>
  </div>
  <div class="ds-cta__actions">
    <a class="ds-btn ds-btn--primary ds-btn--lg" href="/orcamento">Pedir orçamento</a>
  </div>
</div>`, 'html')}
    </section>`,
  mount: (el) => mountSiteDemos(el),
};
