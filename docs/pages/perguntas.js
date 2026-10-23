import { code, doDont } from '../utils.js';
import { faq, frame, mountSiteDemos } from '../site-kit.js';

export default {
  id: 'perguntas',
  group: 'Seções de site',
  title: 'Perguntas frequentes',
  keywords: 'perguntas frequentes faq dúvidas acordeão sanfona details summary',
  lead: 'As dúvidas que todo cliente faz antes de comprar, respondidas na própria página. Cada pergunta abre e fecha, então a lista não ocupa a tela toda.',
  render: () => `
    <section class="doc-section">
      <h2>Na prática</h2>
      <p>Feito com <code>&lt;details&gt;</code> e <code>&lt;summary&gt;</code>, elementos do próprio HTML: abre com clique, toque ou <kbd>Enter</kbd>, e o leitor de tela anuncia se está aberto ou fechado. Sem JavaScript.</p>
      ${frame({ content: faq() })}
      ${doDont(
        ['Perguntas reais, do jeito que os clientes perguntam', 'Respostas curtas, com o próximo passo', 'A primeira pergunta já aberta'],
        ['Mais de 8 perguntas na mesma lista', 'Esconder informação importante (preço, prazo) só aqui', 'Respostas que mandam "entrar em contato" para tudo'],
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
