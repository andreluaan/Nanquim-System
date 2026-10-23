import { code, doDont } from '../utils.js';
import { footer, frame, mountSiteDemos } from '../site-kit.js';

const PARTS = [
  ['Marca', '<code>.ds-footer__brand</code>: logo, uma frase sobre o negócio e os contatos.'],
  ['Colunas', 'Cada coluna é um <code>nav</code> com <code>.ds-footer__heading</code> e uma lista <code>.ds-footer__links</code>.'],
  ['Linha final', '<code>.ds-footer__bottom</code>: direitos, privacidade e termos.'],
];

export default {
  id: 'rodape',
  group: 'Seções de site',
  title: 'Rodapé',
  keywords: 'rodapé footer final links contato redes sociais direitos privacidade',
  lead: 'Onde quem chegou ao fim procura o resto: contato, links organizados por assunto e os textos legais.',
  render: () => `
    <section class="doc-section">
      <h2>Na prática</h2>
      <p>Quatro colunas no computador; no celular, a marca ocupa a linha toda e as colunas de links ficam duas a duas.</p>
      ${frame({ content: footer() })}
      <ol class="card-anatomy-list estrutura-parts">
        ${PARTS.map(([name, text]) => `<li><strong>${name}</strong><span>${text}</span></li>`).join('')}
      </ol>
      ${doDont(
        ['Links agrupados por assunto', 'Contatos que funcionam com um toque (telefone, e-mail)', 'Link para a política de privacidade (LGPD)'],
        ['Repetir o menu inteiro sem organizar', 'Texto miúdo com pouco contraste', 'Ícones de rede social sem nome acessível'],
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
