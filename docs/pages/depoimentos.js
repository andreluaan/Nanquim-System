import { code, doDont } from '../utils.js';
import { frame, mountSiteDemos, testimonials } from '../site-kit.js';

export default {
  id: 'depoimentos',
  group: 'Seções de site',
  title: 'Depoimentos',
  keywords: 'depoimentos avaliações clientes prova social citação testemunho review',
  lead: 'Quem já comprou falando por você. Depoimentos com nome e empresa passam mais confiança que qualquer frase de venda.',
  render: () => `
    <section class="doc-section">
      <h2>Em grade</h2>
      <p>Três depoimentos lado a lado, cada um num <code>ds-testimonial</code>.</p>
      ${frame({ content: testimonials() })}
    </section>

    <section class="doc-section">
      <h2>Em carrossel</h2>
      <p>Com mais de três, coloque-os num <code>&lt;ds-carousel&gt;</code>: dois por vez, com loop, e quem lê decide o ritmo.</p>
      ${frame({ content: testimonials({ carousel: true }) })}
      ${doDont(
        ['Nome, empresa e, se possível, foto', 'Frases curtas e específicas ("o dobro de pedidos")', 'Depoimentos reais, com autorização'],
        ['Depoimentos sem nome ("Cliente satisfeito")', 'Textos longos que ninguém termina', 'Carrossel girando sozinho em depoimentos'],
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
