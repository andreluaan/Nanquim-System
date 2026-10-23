import { code, doDont } from '../utils.js';
import { frame, mountSiteDemos, stats } from '../site-kit.js';

export default {
  id: 'numeros',
  group: 'Seções de site',
  title: 'Números',
  keywords: 'números estatísticas stats métricas provas resultados dados',
  lead: 'Provas em poucos algarismos: valor grande, rótulo pequeno.',
  render: () => `
    <section class="doc-section">
      <h2>Na prática</h2>
      <p>Uma lista de definições (<code>dl</code>): o leitor de tela lê o rótulo e depois o valor.</p>
      ${frame({ content: stats() })}
      ${doDont(
        ['De 3 a 4 números', 'Unidade em <code>&lt;small&gt;</code>'],
        ['Números que não dá para provar', 'Casas decimais demais'],
      )}
      ${code(`
<dl class="ds-stats">
  <div class="ds-stats__item">
    <dt class="ds-stats__label">Marcas desenhadas</dt>
    <dd class="ds-stats__value">340</dd>
  </div>
  <div class="ds-stats__item">
    <dt class="ds-stats__label">Média de avaliação</dt>
    <dd class="ds-stats__value">4,9<small>/5</small></dd>
  </div>
</dl>`, 'html')}
    </section>`,
  mount: (el) => mountSiteDemos(el),
};
