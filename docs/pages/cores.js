import { contrast, contrastLabel, resolveVarColor, toHex, doDont, code } from '../utils.js';

const STEPS = Array.from({ length: 12 }, (_, i) => i + 1);

const STEP_USE = {
  1: 'Fundo do app', 2: 'Fundo de cards', 3: 'Elemento elevado', 4: 'Hover',
  5: 'Ativo / pressionado', 6: 'Borda sutil', 7: 'Borda', 8: 'Borda forte / foco',
  9: 'Cor sólida', 10: 'Sólido no hover', 11: 'Texto secundário', 12: 'Texto principal',
};

const SEMANTIC = [
  { name: '--ds-color-bg', title: 'Fundo', use: 'A "parede" da página. Tudo fica em cima dela.' },
  { name: '--ds-color-surface', title: 'Superfície', use: 'Cards, painéis, menus: um degrau acima do fundo.' },
  { name: '--ds-color-surface-raised', title: 'Superfície elevada', use: 'Coisas que flutuam: popovers, modais.' },
  { name: '--ds-color-border', title: 'Borda', use: 'Linhas que separam áreas sem chamar atenção.' },
  { name: '--ds-color-text', title: 'Texto', use: 'Títulos e textos importantes.', text: true },
  { name: '--ds-color-text-muted', title: 'Texto suave', use: 'Descrições e textos de apoio.', text: true },
  { name: '--ds-color-text-subtle', title: 'Texto discreto', use: 'Legendas, placeholders, metadados.', text: true },
  { name: '--ds-color-accent', title: 'Destaque', use: 'A cor da marca. Use com moderação: botão principal, link ativo.' },
  { name: '--ds-color-accent-soft', title: 'Destaque suave', use: 'Fundo de itens selecionados ou etiquetas.' },
  { name: '--ds-color-accent-text', title: 'Texto de destaque', use: 'Links e palavras que pedem atenção.', text: true },
];

const STATUS = [
  { key: 'success', title: 'Sucesso', msg: 'Pagamento confirmado.' },
  { key: 'warning', title: 'Atenção', msg: 'Seu plano vence em 3 dias.' },
  { key: 'danger', title: 'Erro', msg: 'Não foi possível salvar.' },
  { key: 'info', title: 'Informação', msg: 'Nova versão disponível.' },
];

function scale(name, label) {
  return `
    <div class="color-scale">
      <p class="color-scale-label">${label}</p>
      <div class="color-scale-row">
        ${STEPS.map((s) => `
          <button class="color-step" style="--c: var(--ds-${name}-${s})"
            data-copy="var(--ds-${name}-${s})" data-copy-label="Token copiado"
            title="${STEP_USE[s]}">
            <span class="color-step-chip"></span>
            <span class="color-step-num">${s}</span>
          </button>`).join('')}
      </div>
    </div>`;
}

export default {
  id: 'cores',
  group: 'Fundações',
  title: 'Cores',
  keywords: 'paleta cor color tokens contraste',
  rerenderOnThemeChange: true,
  lead:
    'Cor comunica antes da palavra. Aqui há poucas cores, cada uma com uma função clara. ' +
    'Clique em qualquer amostra para copiar o código dela.',
  render: () => `
    <section class="doc-section">
      <h2>As escalas</h2>
      <p>Cada cor tem 12 tons, do mais escuro ao mais claro (no modo claro, inverte). Passe o mouse para ver para que serve cada degrau.</p>
      ${scale('neutral', 'Neutros: a base de tudo')}
      ${scale('accent', 'Destaque: a cor da marca')}
      <div class="color-legend">
        <span><b>1–2</b> fundos</span><span><b>3–5</b> interação</span>
        <span><b>6–8</b> bordas</span><span><b>9–10</b> sólidos</span><span><b>11–12</b> texto</span>
      </div>
    </section>

    <section class="doc-section">
      <h2>Cores com significado</h2>
      <p>No dia a dia, use estes nomes em vez dos números. Assim, quando a marca muda, tudo continua fazendo sentido.
      O selo mostra se a cor é <strong>legível</strong> sobre o fundo.</p>
      <div class="color-semantic" data-semantic></div>
    </section>

    <section class="doc-section">
      <h2>Cores de status</h2>
      <p>Iguais em todas as marcas, porque significado não pode mudar: verde é sempre "deu certo", vermelho é sempre "deu errado".</p>
      <div class="color-status">
        ${STATUS.map((s) => `
          <div class="color-status-item" style="--soft: var(--ds-color-${s.key}-soft); --border: var(--ds-color-${s.key}-border); --solid: var(--ds-color-${s.key}); --txt: var(--ds-color-${s.key}-text)">
            <span class="color-status-dot"></span>
            <div><strong>${s.title}</strong><p>${s.msg}</p></div>
            <code data-copy="var(--ds-color-${s.key})" data-copy-label="Token copiado">${s.key}</code>
          </div>`).join('')}
      </div>
    </section>

    <section class="doc-section">
      <h2>Na prática</h2>
      ${doDont(
        ['Use a cor de destaque em <b>uma</b> ação principal por tela', 'Dê profundidade com superfícies em camadas', 'Acompanhe cores de status com ícone ou texto'],
        ['Pintar grandes áreas com a cor de destaque', 'Usar brilho/neon para separar elementos', 'Depender só da cor para passar uma mensagem'],
      )}
      ${code(`
.card {
  background: var(--ds-color-surface);
  border: 1px solid var(--ds-color-border-subtle);
  color: var(--ds-color-text);
}
.card a { color: var(--ds-color-accent-text); }`)}
    </section>`,

  mount(el) {
    const wrap = el.querySelector('[data-semantic]');
    wrap.innerHTML = SEMANTIC.map((t) => {
      const color = resolveVarColor(t.name);
      const bg = resolveVarColor('--ds-color-bg');
      const ratio = contrast(color, bg);
      const badge = contrastLabel(ratio);
      return `
        <button class="color-token" data-copy="var(${t.name})" data-copy-label="Token copiado">
          <span class="color-token-chip ${t.text ? 'is-text' : ''}" style="--c: var(${t.name})">${t.text ? 'Aa' : ''}</span>
          <span class="color-token-body">
            <strong>${t.title}</strong>
            <span>${t.use}</span>
            <code>${t.name}</code>
          </span>
          <span class="color-token-meta">
            ${t.text || t.name === '--ds-color-accent'
              ? `<span class="doc-contrast ${badge.cls}" title="Contraste sobre o fundo: ${ratio.toFixed(2)}:1">${ratio.toFixed(1)} · ${badge.text}</span>`
              : ''}
            <small>${toHex(color)}</small>
          </span>
        </button>`;
    }).join('');
  },
};
