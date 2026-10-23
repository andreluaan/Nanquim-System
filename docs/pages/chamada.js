import { code, doDont } from '../utils.js';
import { cta, frame, mountSiteDemos } from '../site-kit.js';

export default {
  id: 'chamada',
  group: 'Seções de site',
  title: 'Chamada para ação',
  keywords: 'chamada para ação cta call to action convite orçamento contato final',
  lead: 'O último empurrão antes do rodapé: uma frase que convida e um botão que leva até lá. Aparece depois que a pessoa já viu o suficiente para decidir.',
  render: () => `
    <section class="doc-section">
      <h2>Na prática</h2>
      <p>Um painel elevado com título, texto e ações. Em telas estreitas, os botões descem para baixo do texto.</p>
      ${frame({ content: cta() })}
      ${doDont(
        ['Uma frase que fala do resultado ("Vamos desenhar a sua marca?")', 'A mesma ação principal do hero', 'Um canal alternativo, como WhatsApp, como segunda opção'],
        ['Mais de uma chamada por página', 'Botão com texto genérico ("Clique aqui")', 'Pedir cadastro antes de mostrar o preço'],
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
