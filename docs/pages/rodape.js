import { code, doDont } from '../utils.js';
import { footer, frame, mountSiteDemos } from '../site-kit.js';

const PARTS = [
  ['Marca', '<code>.ds-footer__brand</code>: logo, frase e contatos.'],
  ['Colunas', '<code>nav</code> com <code>__heading</code> e <code>__links</code>.'],
  ['Linha final', '<code>.ds-footer__bottom</code>: direitos e privacidade.'],
];

export default {
  id: 'rodape',
  group: 'Seções de site',
  title: 'Rodapé',
  keywords: 'rodapé footer final links contato redes sociais direitos privacidade',
  lead: 'Contato, links por assunto e o texto legal.',
  render: () => `
    <section class="doc-section">
      <h2>Na prática</h2>
      <p>No celular, os links ficam dois a dois.</p>
      ${frame({ content: footer() })}
      <ol class="card-anatomy-list estrutura-parts">
        ${PARTS.map(([name, text]) => `<li><strong>${name}</strong><span>${text}</span></li>`).join('')}
      </ol>
      ${doDont(
        ['Links por assunto', 'Contato com um toque'],
        ['Repetir o menu inteiro', 'Texto miúdo apagado'],
      )}
      ${code(`
<footer class="ds-footer">
  <div class="ds-container">
    <div class="ds-footer__inner">
      <div class="ds-footer__brand">…</div>
      <nav aria-label="Estúdio">
        <h2 class="ds-footer__heading">Estúdio</h2>
        <ul class="ds-footer__links">
          <li><a href="/sobre">Sobre</a></li>
          <li><a href="/projetos">Projetos</a></li>
        </ul>
      </nav>
    </div>
    <div class="ds-footer__bottom">
      <p>© 2026 Ateliê Sumi</p>
      <ul class="ds-footer__links"><li><a href="/privacidade">Privacidade</a></li></ul>
    </div>
  </div>
</footer>`, 'html')}
    </section>`,
  mount: (el) => mountSiteDemos(el),
};
