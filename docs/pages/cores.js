import { contrast, contrastLabel, resolveVarColor, toHex, doDont, code, copyModeSwitch, mountCopyModeSwitch } from '../utils.js';

const STEPS = Array.from({ length: 12 }, (_, i) => i + 1);

const STEP_USE = {
  1: 'Fundo do app', 2: 'Fundo de cards', 3: 'Elemento elevado', 4: 'Hover',
  5: 'Ativo / pressionado', 6: 'Borda sutil', 7: 'Borda', 8: 'Borda forte / foco',
  9: 'Cor sólida', 10: 'Sólido no hover', 11: 'Texto secundário', 12: 'Texto principal',
};

const SEMANTIC = [
  { name: '--ds-color-bg', title: 'Fundo', use: 'A parede da página.' },
  { name: '--ds-color-surface', title: 'Superfície', use: 'Cards e painéis.' },
  { name: '--ds-color-surface-raised', title: 'Superfície elevada', use: 'O que flutua: modais, menus.' },
  { name: '--ds-color-border', title: 'Borda', use: 'Separa sem chamar atenção.' },
  { name: '--ds-color-text', title: 'Texto', use: 'Títulos e texto principal.', text: true },
  { name: '--ds-color-text-muted', title: 'Texto suave', use: 'Descrições.', text: true },
  { name: '--ds-color-text-subtle', title: 'Texto discreto', use: 'Legendas e placeholders.', text: true },
  { name: '--ds-color-accent', title: 'Destaque', use: 'A marca. Uma ação por tela.' },
  { name: '--ds-color-accent-soft', title: 'Destaque suave', use: 'Fundo de selecionados.' },
  { name: '--ds-color-accent-text', title: 'Texto de destaque', use: 'Links.', text: true },
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
            data-copy-token="--ds-${name}-${s}"
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
  lead: 'Poucas cores, cada uma com uma função. Clique numa amostra para copiar.',
  render: () => `
    ${copyModeSwitch()}

    <section class="doc-section">
      <h2>As escalas</h2>
      <p>12 tons por cor. Passe o mouse para ver a função de cada um.</p>
      ${scale('neutral', 'Neutros')}
      ${scale('accent', 'Destaque')}
      <div class="color-legend">
        <span><b>1–2</b> fundos</span><span><b>3–5</b> interação</span>
        <span><b>6–8</b> bordas</span><span><b>9–10</b> sólidos</span><span><b>11–12</b> texto</span>
      </div>
    </section>

    <section class="doc-section">
      <h2>Cores com significado</h2>
      <p>Use estes nomes, não os números: a marca muda e tudo continua certo. O selo mede a leitura sobre o fundo.</p>
      <div class="color-semantic" data-semantic></div>
    </section>

    <section class="doc-section">
      <h2>Cores de status</h2>
      <p>Iguais em toda marca: verde é sempre "deu certo".</p>
      <div class="color-status">
        ${STATUS.map((s) => `
          <div class="color-status-item" style="--soft: var(--ds-color-${s.key}-soft); --border: var(--ds-color-${s.key}-border); --solid: var(--ds-color-${s.key}); --txt: var(--ds-color-${s.key}-text)">
            <span class="color-status-dot"></span>
            <div><strong>${s.title}</strong><p>${s.msg}</p></div>
            <code data-copy-token="--ds-color-${s.key}">${s.key}</code>
          </div>`).join('')}
      </div>
    </section>

    <section class="doc-section">
      <h2>Na prática</h2>
      ${doDont(
        ['Destaque em <b>uma</b> ação por tela', 'Profundidade com camadas', 'Status com ícone ou texto'],
        ['Grandes áreas de destaque', 'Brilho ou neon', 'Só a cor para dar o recado'],
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
    mountCopyModeSwitch(el, '--ds-color-accent');
    const wrap = el.querySelector('[data-semantic]');
    wrap.innerHTML = SEMANTIC.map((t) => {
      const color = resolveVarColor(t.name);
      const bg = resolveVarColor('--ds-color-bg');
      const ratio = contrast(color, bg);
      const badge = contrastLabel(ratio);
      return `
        <button class="color-token" data-copy-token="${t.name}">
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
