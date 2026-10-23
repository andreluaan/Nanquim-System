import { code, doDont } from '../utils.js';
import { frame, mountSiteDemos, statement } from '../site-kit.js';

export default {
  id: 'manifesto',
  group: 'Seções de site',
  title: 'Manifesto',
  keywords: 'manifesto frase declaração statement sobre missão editorial texto grande',
  lead: 'Uma frase grande que diz o que a marca pensa.',
  render: () => `
    <section class="doc-section">
      <h2>Na prática</h2>
      <p>O que vai em <code>&lt;span&gt;</code> fica em segundo plano; <code>&lt;em&gt;</code> ganha a cor de destaque.</p>
      ${frame({ content: statement() })}
      ${doDont(
        ['Uma ou duas frases', 'Logo depois do hero'],
        ['Parágrafo inteiro', 'Destaque em tudo'],
      )}
      ${code(`
<p class="ds-statement__label">(Manifesto)</p>
<p class="ds-statement">
  Desenhamos marcas com <em>uma tinta só</em>.
  <span>O resto é ritmo, silêncio e um traço que não volta atrás.</span>
</p>`, 'html')}
    </section>`,
  mount: (el) => mountSiteDemos(el),
};
