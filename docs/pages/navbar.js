import { code, doDont } from '../utils.js';
import { frame, hero, mountSiteDemos, navbar } from '../site-kit.js';

const PARTS = [
  ['Marca', '<code>.ds-navbar__brand</code>: logo ou nome, sempre levando ao início.'],
  ['Links', '<code>.ds-navbar__links</code>: de 3 a 6 destinos; a página atual leva <code>aria-current="page"</code>.'],
  ['Ação', '<code>.ds-navbar__actions</code>: o botão mais importante do site, como "Pedir orçamento".'],
  ['Menu', '<code>.ds-navbar__toggle</code>: aparece sozinho em telas estreitas e abre a gaveta com os links.'],
];

export default {
  id: 'navbar',
  group: 'Seções de site',
  title: 'Barra de navegação',
  keywords: 'navbar menu navegação cabeçalho header topo links logo hambúrguer',
  lead: 'A barra do topo: diz de quem é o site, para onde dá para ir e qual é a ação principal. É a primeira coisa que a pessoa procura quando se perde.',
  render: () => `
    <section class="doc-section">
      <h2>Na prática</h2>
      <p>Mude a largura para <strong>Celular</strong>: os links viram um botão de menu, que abre uma gaveta. Role a prévia: com <code>ds-navbar--sticky</code>, a barra acompanha.</p>
      ${frame({ content: navbar({ menuId: 'navbar-menu' }) + hero({ id: 'ill-enso-navbar' }), className: 'site-frame--scroll site-frame--short' })}
      <ol class="card-anatomy-list estrutura-parts">
        ${PARTS.map(([name, text]) => `<li><strong>${name}</strong><span>${text}</span></li>`).join('')}
      </ol>
    </section>

    <section class="doc-section">
      <h2>Sem botão de ação</h2>
      <p>Em sites institucionais, a barra pode ter só links. O menu de celular continua funcionando igual.</p>
      ${frame({ content: navbar({ menuId: 'navbar-menu-simples', sticky: false, action: false }), widths: false })}
      ${doDont(
        ['Nomes curtos e conhecidos ("Preços", não "Investimento")', 'Uma única ação de destaque', 'Marcar a página atual'],
        ['Mais de 6 links', 'Menu de celular escondendo a ação principal', 'Links que mudam de lugar entre páginas'],
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
