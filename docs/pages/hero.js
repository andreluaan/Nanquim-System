import { code, doDont } from '../utils.js';
import { frame, hero, mountSiteDemos } from '../site-kit.js';

const PARTS = [
  ['Sobretítulo', '<code>.ds-hero__eyebrow</code>: o que é.'],
  ['Título', '<code>.ds-hero__title</code>: a promessa.'],
  ['Texto', '<code>.ds-hero__lead</code>: como, em uma linha.'],
  ['Ações', '<code>.ds-hero__actions</code>: um principal, no máximo um secundário.'],
  ['Nota', '<code>.ds-hero__note</code>: uma prova rápida.'],
  ['Mídia', '<code>.ds-hero__media</code>: desce no celular.'],
];

export default {
  id: 'hero',
  group: 'Seções de site',
  title: 'Hero',
  keywords: 'hero banner destaque primeira dobra topo chamada principal título capa',
  lead: 'Em segundos: o que você faz, para quem e qual o próximo passo.',
  render: () => `
    <section class="doc-section">
      <h2>Com imagem</h2>
      <p>No celular, a imagem desce.</p>
      ${frame({ content: hero({ id: 'ill-enso-hero-page' }) })}
      <ol class="card-anatomy-list estrutura-parts">
        ${PARTS.map(([name, text]) => `<li><strong>${name}</strong><span>${text}</span></li>`).join('')}
      </ol>
    </section>

    <section class="doc-section">
      <h2>Centralizado</h2>
      <p><code>ds-hero--center</code>, quando a frase é a estrela.</p>
      ${frame({ content: hero({ center: true }) })}
      ${doDont(
        ['A promessa no título', 'Um botão principal visível'],
        ['Carrossel no lugar do hero', 'Texto sobre foto sem contraste'],
      )}
      ${code(`
<section class="ds-section ds-hero">
  <div class="ds-container ds-hero__inner">
    <div class="ds-hero__content">
      <p class="ds-hero__eyebrow">Estúdio de identidade e sites</p>
      <h1 class="ds-hero__title">Marcas desenhadas à mão</h1>
      <p class="ds-hero__lead">Identidade e site num processo só.</p>
      <div class="ds-hero__actions">
        <a class="ds-btn ds-btn--primary ds-btn--lg" href="/orcamento">Pedir orçamento</a>
        <a class="ds-btn ds-btn--ghost ds-btn--lg" href="/projetos">Ver projetos</a>
      </div>
      <p class="ds-hero__note">4,9 de média em 120 avaliações</p>
    </div>
    <div class="ds-hero__media"><img src="capa.jpg" alt=""></div>
  </div>
</section>`, 'html')}
    </section>`,
  mount: (el) => mountSiteDemos(el),
};
