import { code, doDont } from '../utils.js';
import { faq, frame, mountSiteDemos } from '../site-kit.js';

export default {
  id: 'perguntas',
  group: 'Seções de site',
  title: 'Perguntas frequentes',
  keywords: 'perguntas frequentes faq dúvidas acordeão sanfona details summary',
  lead: 'As dúvidas de antes da compra, que abrem e fecham.',
  render: () => `
    <section class="doc-section">
      <h2>Na prática</h2>
      <p><code>&lt;details&gt;</code> do HTML: teclado e leitor de tela sem JavaScript.</p>
      ${frame({ content: faq() })}
      ${doDont(
        ['Perguntas reais', 'Respostas curtas'],
        ['Mais de 8 perguntas', 'Preço só escondido aqui'],
      )}
      ${code(`
<div class="ds-faq">
  <details class="ds-faq__item" open>
    <summary class="ds-faq__question">Quanto tempo leva um projeto?</summary>
    <div class="ds-faq__answer"><p>De 4 a 6 semanas para um site.</p></div>
  </details>
  <details class="ds-faq__item">
    <summary class="ds-faq__question">Eu mesmo consigo editar o site?</summary>
    <div class="ds-faq__answer"><p>Sim, por um painel simples.</p></div>
  </details>
</div>`, 'html')}
    </section>`,
  mount: (el) => mountSiteDemos(el),
};
