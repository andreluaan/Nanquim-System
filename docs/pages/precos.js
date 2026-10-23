import { code, doDont } from '../utils.js';
import { frame, mountSiteDemos, pricing } from '../site-kit.js';

const PARTS = [
  ['Plano', '<code>.ds-plan</code>: nome, descrição, preço, lista e botão, sempre nessa ordem.'],
  ['Destaque', '<code>.ds-plan--featured</code> com <code>.ds-plan__badge</code>: o plano que você recomenda.'],
  ['Itens de fora', '<code>aria-disabled="true"</code> no item: aparece riscado e o leitor de tela sabe que não está incluso.'],
  ['Mensal / anual', 'Botões com <code>aria-pressed</code> num <code>ds-btn-group</code>; a troca dos valores fica com o site.'],
];

export default {
  id: 'precos',
  group: 'Seções de site',
  title: 'Preços',
  keywords: 'preços planos tabela de preços assinatura mensal anual pricing valores',
  lead: 'Lado a lado, os planos ajudam a pessoa a escolher sem precisar perguntar. O recomendado se destaca, e o que cada um não inclui fica claro.',
  render: () => `
    <section class="doc-section">
      <h2>Na prática</h2>
      <p>Clique em <strong>Anual</strong> para ver os preços mudarem. Os planos dividem as mesmas linhas da grade (<em>subgrid</em>): preços e listas ficam alinhados mesmo quando uma descrição é maior.</p>
      ${frame({ content: pricing() })}
      <ol class="card-anatomy-list estrutura-parts">
        ${PARTS.map(([name, text]) => `<li><strong>${name}</strong><span>${text}</span></li>`).join('')}
      </ol>
      ${doDont(
        ['Até 3 ou 4 planos', 'Um plano recomendado, não dois', 'Mesma lista de itens em todos, para comparar'],
        ['Letras miúdas escondendo o preço real', 'Planos sem diferença clara entre si', 'Destaque no plano mais caro só por ser caro'],
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
