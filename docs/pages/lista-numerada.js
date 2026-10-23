import { code, doDont } from '../utils.js';
import { frame, mountSiteDemos, services } from '../site-kit.js';

const PARTS = [
  ['Número', '<code>.ds-index__number</code>: a ordem, em letra miúda.'],
  ['Título', '<code>.ds-index__title</code>: grande, como num índice de revista.'],
  ['Texto', '<code>.ds-index__text</code>: uma frase. Desce no celular.'],
  ['Seta', '<code>.ds-index__icon</code>: anda ao passar o mouse.'],
];

export default {
  id: 'lista-numerada',
  group: 'Seções de site',
  title: 'Lista numerada',
  keywords: 'lista numerada índice serviços etapas processo editorial 01 02 03',
  lead: 'Serviços ou etapas como um índice de revista, separados por fios.',
  render: () => `
    <section class="doc-section">
      <h2>Na prática</h2>
      <p>Uma alternativa mais sóbria aos <a href="#recursos">Recursos</a> com ícones.</p>
      ${frame({ content: services() })}
      <ol class="card-anatomy-list estrutura-parts">
        ${PARTS.map(([name, text]) => `<li><strong>${name}</strong><span>${text}</span></li>`).join('')}
      </ol>
      ${doDont(
        ['De 3 a 6 itens', 'Títulos de duas palavras'],
        ['Numerar o que não tem ordem nem peso', 'Textos longos'],
      )}
      ${code(`
<ol class="ds-index">
  <li class="ds-index__item">
    <span class="ds-index__number">01</span>
    <h3 class="ds-index__title">Identidade visual</h3>
    <p class="ds-index__text">Logo, cores e letras que contam quem você é.</p>
    <ds-icon class="ds-index__icon" name="arrow-right"></ds-icon>
  </li>
</ol>`, 'html')}
    </section>`,
  mount: (el) => mountSiteDemos(el),
};
