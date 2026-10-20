const ITEMS = [
  { name: 'Fundações (cores, tipografia, espaço, elevação, movimento)', status: 'feito' },
  { name: 'Escolher a identidade da casa', status: 'agora' },
  { name: 'Ícones (set próprio em SVG)', status: 'próximo' },
  { name: 'Botões e botões de ícone', status: 'próximo' },
  { name: 'Badges e cards', status: 'depois' },
  { name: 'Campos de formulário', status: 'depois' },
  { name: 'Carrossel e slides', status: 'depois' },
  { name: 'Modal, gaveta, tooltip', status: 'depois' },
  { name: 'Seções de site: hero, navbar, rodapé, preços, depoimentos', status: 'depois' },
];

const LABEL = { feito: 'Feito', agora: 'Em andamento', 'próximo': 'Próximo', depois: 'Planejado' };

export default {
  id: 'roadmap',
  group: 'Projeto',
  title: 'Roadmap',
  keywords: 'planejamento próximos futuro',
  lead: 'Este sistema cresce aos poucos: cada peça nova entra com variantes, documentação e exemplos. O que já existe e o que vem por aí:',
  render: () => `
    <ol class="roadmap">
      ${ITEMS.map((i) => `
        <li class="roadmap-item is-${i.status === 'próximo' ? 'proximo' : i.status}">
          <span class="roadmap-dot" aria-hidden="true"></span>
          <span>${i.name}</span>
          <span class="roadmap-tag">${LABEL[i.status]}</span>
        </li>`).join('')}
    </ol>`,
};
