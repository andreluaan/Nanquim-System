import { code, doDont } from '../utils.js';
import { frame, hero, heroEditorial, mountSiteDemos, navbar } from '../site-kit.js';

const PARTS = [
  ['Marca', '<code>.ds-navbar__brand</code>: leva ao início.'],
  ['Links', '<code>.ds-navbar__links</code>: de 3 a 6, com <code>aria-current</code> na atual.'],
  ['Ação', '<code>.ds-navbar__actions</code>: o botão principal.'],
  ['Menu', '<code>.ds-navbar__toggle</code>: surge no celular e abre a gaveta.'],
];

export default {
  id: 'navbar',
  group: 'Seções de site',
  title: 'Barra de navegação',
  keywords: 'navbar menu navegação cabeçalho header topo links logo hambúrguer',
  lead: 'De quem é, para onde ir e o que fazer. O que se procura ao se perder.',
  render: () => `
    <section class="doc-section">
      <h2>Na prática</h2>
      <p>No <strong>Celular</strong>, os links viram menu. Role: com <code>--sticky</code>, a barra acompanha.</p>
      ${frame({ content: navbar({ menuId: 'navbar-menu' }) + hero({ id: 'ill-enso-navbar' }), className: 'site-frame--scroll site-frame--short' })}
      <ol class="card-anatomy-list estrutura-parts">
        ${PARTS.map(([name, text]) => `<li><strong>${name}</strong><span>${text}</span></li>`).join('')}
      </ol>
    </section>

    <section class="doc-section">
      <h2>Editorial</h2>
      <p><code>ds-navbar--editorial</code>: sem borda, links miúdos em caixa alta.</p>
      ${frame({ content: navbar({ menuId: 'navbar-menu-editorial', sticky: false, editorial: true }) + heroEditorial({ id: 'ill-landscape-navbar' }), className: 'site-frame--short' })}
    </section>

    <section class="doc-section">
      <h2>Sem botão de ação</h2>
      <p>Só links, para sites institucionais.</p>
      ${frame({ content: navbar({ menuId: 'navbar-menu-simples', sticky: false, action: false }), widths: false })}
      ${doDont(
        ['Nomes curtos ("Preços")', 'Marcar a página atual'],
        ['Mais de 6 links', 'Esconder a ação no celular'],
      )}
      ${code(`
<header class="ds-navbar ds-navbar--sticky">
  <div class="ds-container ds-navbar__inner">
    <a class="ds-navbar__brand" href="/">Ateliê Sumi</a>
    <nav class="ds-navbar__links" aria-label="Principal">
      <a href="/" aria-current="page">Início</a>
      <a href="/projetos">Projetos</a>
      <a href="/precos">Preços</a>
    </nav>
    <div class="ds-navbar__actions">
      <a class="ds-btn ds-btn--primary ds-btn--sm" href="/orcamento">Pedir orçamento</a>
    </div>
    <button class="ds-btn ds-btn--ghost ds-btn--icon ds-navbar__toggle"
      data-dialog-open="menu" aria-haspopup="dialog" aria-label="Abrir menu">…</button>
  </div>
</header>

<dialog class="ds-dialog ds-dialog--drawer ds-dialog--start" id="menu">…</dialog>`, 'html')}
    </section>`,
  mount: (el) => mountSiteDemos(el),
};
