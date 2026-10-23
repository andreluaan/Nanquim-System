import { code, doDont } from '../utils.js';
import { frame, mountSiteDemos, pricing } from '../site-kit.js';

const PARTS = [
  ['Plano', '<code>.ds-plan</code>: nome, descrição, preço, lista e botão.'],
  ['Destaque', '<code>--featured</code> com <code>__badge</code>: o recomendado.'],
  ['De fora', '<code>aria-disabled</code> no item: aparece riscado.'],
  ['Mensal / anual', 'Botões com <code>aria-pressed</code>.'],
];

export default {
  id: 'precos',
  group: 'Seções de site',
  title: 'Preços',
  keywords: 'preços planos tabela de preços assinatura mensal anual pricing valores',
  lead: 'Lado a lado, para escolher sem perguntar.',
  render: () => `
    <section class="doc-section">
      <h2>Na prática</h2>
      <p>Clique em <strong>Anual</strong>. Com <em>subgrid</em>, preços e listas ficam alinhados.</p>
      ${frame({ content: pricing() })}
      <ol class="card-anatomy-list estrutura-parts">
        ${PARTS.map(([name, text]) => `<li><strong>${name}</strong><span>${text}</span></li>`).join('')}
      </ol>
      ${doDont(
        ['Até 4 planos', 'Um recomendado, não dois'],
        ['Preço escondido', 'Planos quase iguais'],
      )}
      ${code(`
<article class="ds-plan ds-plan--featured">
  <span class="ds-plan__badge ds-badge ds-badge--accent ds-badge--solid ds-badge--pill">Mais escolhido</span>
  <h3 class="ds-plan__name">Profissional</h3>
  <p class="ds-plan__desc">Para pequenos negócios.</p>
  <p class="ds-plan__price">R$ <strong>189</strong> /mês</p>
  <ul class="ds-plan__features">
    <li><ds-icon name="check"></ds-icon> Blog e formulários</li>
    <li aria-disabled="true"><ds-icon name="minus"></ds-icon> Loja virtual</li>
  </ul>
  <a class="ds-btn ds-btn--primary ds-btn--block" href="/assinar">Escolher</a>
</article>`, 'html')}
    </section>`,
  mount: (el) => mountSiteDemos(el),
};
