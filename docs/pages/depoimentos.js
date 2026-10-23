import { code, doDont } from '../utils.js';
import { frame, mountSiteDemos, testimonials } from '../site-kit.js';

export default {
  id: 'depoimentos',
  group: 'Seções de site',
  title: 'Depoimentos',
  keywords: 'depoimentos avaliações clientes prova social citação testemunho review',
  lead: 'Quem comprou falando por você, com nome e empresa.',
  render: () => `
    <section class="doc-section">
      <h2>Em grade</h2>
      <p>Três lado a lado.</p>
      ${frame({ content: testimonials() })}
    </section>

    <section class="doc-section">
      <h2>Em carrossel</h2>
      <p>Mais de três? <code>&lt;ds-carousel&gt;</code>, dois por vez.</p>
      ${frame({ content: testimonials({ carousel: true }) })}
      ${doDont(
        ['Nome e empresa', 'Frases curtas e concretas'],
        ['"Cliente satisfeito"', 'Textos longos'],
      )}
      ${code(`
<figure class="ds-testimonial">
  <blockquote class="ds-testimonial__quote">O site carrega rápido.</blockquote>
  <figcaption class="ds-testimonial__author">
    <span class="ds-testimonial__avatar"><img src="rafael.jpg" alt=""></span>
    <span>
      <span class="ds-testimonial__name">Rafael Lima</span>
      <span class="ds-testimonial__role">Papelaria Traço</span>
    </span>
  </figcaption>
</figure>`, 'html')}
    </section>`,
  mount: (el) => mountSiteDemos(el),
};
