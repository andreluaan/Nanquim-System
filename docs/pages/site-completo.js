import { OPTIONS } from '../lab.js';
import { contrast, contrastLabel, resolveVarColor, toast, copy } from '../utils.js';
import { frame, fullSite, mountSiteDemos, setFrameWidth, TEMPLATES } from '../site-kit.js';

const MENU_ID = 'sumi-menu-completo';
const DEFAULTS = { template: 'editorial', theme: 'nanquim', font: 'editorial', mode: 'dark', radius: 1, text: 1, space: 1 };

// Cada controle deslizante escreve uma variável no site de exemplo; os tokens recalculam o resto.
const SLIDERS = {
  accentHue: { label: 'Matiz', variable: '--ds-accent-hue', min: 0, max: 360, step: 1, custom: true },
  accentChroma: { label: 'Intensidade', variable: '--ds-accent-chroma', min: 0, max: 0.2, step: 0.005, custom: true },
  accentLightness: { label: 'Luminosidade', variable: '--ds-accent-lightness', min: 0.3, max: 0.92, step: 0.01, custom: true },
  neutralHue: { label: 'Tom dos cinzas', variable: '--ds-neutral-hue', min: 0, max: 360, step: 1, custom: true },
  neutralChroma: { label: 'Cor nos cinzas', variable: '--ds-neutral-chroma', min: 0, max: 0.04, step: 0.001, custom: true },
  radius: { label: 'Cantos', variable: '--ds-radius-factor', min: 0, max: 2.5, step: 0.05, format: (v) => `${Math.round(v * 8)}px` },
  text: { label: 'Texto', variable: '--ds-text-scale', min: 0.85, max: 1.25, step: 0.05, format: (v) => `${Math.round(v * 100)}%` },
  space: { label: 'Espaço', variable: '--ds-space-scale', min: 0.75, max: 1.3, step: 0.05, format: (v) => `${Math.round(v * 100)}%` },
};

const CONTRASTS = [
  ['Texto', '--ds-color-text', '--ds-color-bg'],
  ['Texto suave', '--ds-color-text-muted', '--ds-color-bg'],
  ['Botão principal', '--ds-color-on-accent', '--ds-color-accent'],
  ['Destaque no texto', '--ds-color-accent-text', '--ds-color-bg'],
];

const slider = (key) => {
  const s = SLIDERS[key];
  return `
    <label class="viz-range">
      <span><span>${s.label}</span><output data-output="${key}"></output></span>
      <input type="range" min="${s.min}" max="${s.max}" step="${s.step}" data-slider="${key}">
    </label>`;
};

const segmented = (key, items, label) => `
  <div class="doc-segmented" role="radiogroup" aria-label="${label}">
    ${items.map(([id, name]) => `<button role="radio" aria-checked="false" data-choice="${key}" data-value="${id}">${name}</button>`).join('')}
  </div>`;

const swatches = () => `
  <div class="viz-swatches">
    ${OPTIONS.theme.items.map((item) => `
      <button class="viz-swatch" data-choice="theme" data-value="${item.id}" aria-pressed="false" aria-label="${item.name}" title="${item.name}"
        style="--a: ${item.swatch[0]}; --b: ${item.swatch[2]}"></button>`).join('')}
  </div>`;

const fonts = () => `
  <div class="viz-fonts">
    ${OPTIONS.font.items.map((item) => `
      <button class="viz-font" data-choice="font" data-value="${item.id}" aria-pressed="false" aria-label="${item.name}" title="${item.name}"
        style="font-family: ${item.family}">Aa</button>`).join('')}
  </div>`;

const tool = (action, icon, label) => `
  <button class="ds-btn ds-btn--ghost ds-btn--sm viz-tool" data-action="${action}"><ds-icon name="${icon}"></ds-icon> <span>${label}</span></button>`;

export default {
  id: 'site-completo',
  group: 'Seções de site',
  title: 'Site completo',
  wide: true,
  keywords: 'site completo landing page exemplo modelo template editorial visualizador marca tema cores fonte cantos tela cheia',
  lead: 'Todas as seções num site. Escolha o modelo, vista-o com outra marca e copie o tema.',
  render: () => `
    <div class="viz" data-viz>
      <aside class="viz-panel" id="viz-panel" aria-label="Ajustes da marca">
        <header class="viz-panel-head">
          <strong>Editar marca</strong>
          <button class="ds-btn ds-btn--ghost ds-btn--icon ds-btn--sm" data-action="panel" aria-label="Fechar painel"><ds-icon name="x"></ds-icon></button>
        </header>
        <section class="viz-group">
          <h2>Modelo</h2>
          ${segmented('template', TEMPLATES, 'Modelo do site')}
        </section>
        <section class="viz-group">
          <h2>Marca <small data-name="theme"></small></h2>
          ${swatches()}
          <details class="viz-more" data-custom>
            <summary>Cor própria</summary>
            ${slider('accentHue')}${slider('accentChroma')}${slider('accentLightness')}${slider('neutralHue')}${slider('neutralChroma')}
          </details>
        </section>
        <section class="viz-group">
          <h2>Fonte <small data-name="font"></small></h2>
          ${fonts()}
        </section>
        <section class="viz-group">
          <h2>Forma</h2>
          ${slider('radius')}${slider('text')}${slider('space')}
        </section>
        <section class="viz-group">
          <h2>Modo</h2>
          ${segmented('mode', OPTIONS.mode.items.map((item) => [item.id, item.name]), 'Modo')}
        </section>
        <details class="viz-more viz-contrast-box">
          <summary>Contraste <span data-contrast-summary></span></summary>
          <dl class="viz-contrast" data-contrast></dl>
        </details>
        <div class="viz-actions">
          <button class="ds-btn ds-btn--primary ds-btn--sm" data-action="copy"><ds-icon name="copy"></ds-icon> Copiar tema</button>
          <button class="ds-btn ds-btn--ghost ds-btn--sm" data-action="reset"><ds-icon name="refresh"></ds-icon> Restaurar</button>
        </div>
      </aside>
      <div class="viz-stage">
        ${frame({
          content: fullSite(MENU_ID, DEFAULTS.template),
          className: 'site-frame--scroll',
          attrs: 'data-site data-scale',
          tools: `<span class="viz-tools">${tool('panel', 'sliders', 'Editar')}${tool('fullscreen', 'external-link', 'Tela cheia')}</span>`,
        })}
      </div>
    </div>`,

  mount(el) {
    const viz = el.querySelector('[data-viz]');
    const page = viz.querySelector('[data-site]');
    const frameEl = viz.querySelector('[data-frame]');
    const state = { ...DEFAULTS };
    let renderedTemplate = state.template;

    const readVar = (name) => Number.parseFloat(getComputedStyle(page).getPropertyValue(name));
    const nameOf = (key) => OPTIONS[key].items.find((item) => item.id === state[key])?.name ?? '';

    function syncControls() {
      viz.querySelectorAll('[data-choice]').forEach((button) => {
        const selected = String(state[button.dataset.choice]) === button.dataset.value;
        button.setAttribute(button.getAttribute('role') === 'radio' ? 'aria-checked' : 'aria-pressed', String(selected));
      });
      Object.entries(SLIDERS).forEach(([key, s]) => {
        const value = state[key] ?? readVar(s.variable);
        viz.querySelector(`[data-slider="${key}"]`).value = value;
        viz.querySelector(`[data-output="${key}"]`).textContent = s.format ? s.format(value) : Number(value.toFixed(3));
      });
      viz.querySelector('[data-name="theme"]').textContent = state.custom ? 'Cor própria' : nameOf('theme');
      viz.querySelector('[data-name="font"]').textContent = nameOf('font');
    }

    function measureContrast() {
      const ratios = CONTRASTS.map(([label, fg, bg]) => [label, contrast(resolveVarColor(fg, page), resolveVarColor(bg, page))]);
      viz.querySelector('[data-contrast]').innerHTML = ratios.map(([label, ratio]) => {
        const rating = contrastLabel(ratio);
        return `<div><dt>${label}</dt><dd class="${rating.cls}">${ratio.toFixed(1)} · ${rating.text}</dd></div>`;
      }).join('');
      const worst = contrastLabel(Math.min(...ratios.map(([, ratio]) => ratio)));
      const summary = viz.querySelector('[data-contrast-summary]');
      summary.className = worst.cls;
      summary.textContent = worst.text;
    }

    function renderTemplate() {
      if (state.template === renderedTemplate) return;
      page.querySelectorAll('dialog[open]').forEach((d) => d.close());
      page.innerHTML = fullSite(MENU_ID, state.template);
      page.scrollTop = 0;
      renderedTemplate = state.template;
    }

    function apply() {
      renderTemplate();
      Object.assign(page.dataset, { theme: state.theme, font: state.font, mode: state.mode });
      ['radius', 'text', 'space'].forEach((key) => page.style.setProperty(SLIDERS[key].variable, state[key]));
      syncControls();
      measureContrast();
    }

    // Mexer em uma cor cria uma paleta própria: todas as cores passam a vir do painel, não do tema.
    function setCustomColor(key, value) {
      if (!state.custom) {
        Object.entries(SLIDERS).filter(([, s]) => s.custom).forEach(([k, s]) => { state[k] = readVar(s.variable); });
        state.custom = true;
      }
      state[key] = value;
      Object.entries(SLIDERS).filter(([, s]) => s.custom).forEach(([k, s]) => page.style.setProperty(s.variable, state[k]));
      const onAccent = state.accentLightness > 0.62 ? `oklch(0.2 0.02 ${state.accentHue})` : `oklch(0.98 0.01 ${state.accentHue})`;
      page.style.setProperty('--ds-on-accent', onAccent);
      state.onAccent = onAccent;
    }

    function clearCustomColor() {
      Object.entries(SLIDERS).filter(([, s]) => s.custom).forEach(([k, s]) => {
        page.style.removeProperty(s.variable);
        delete state[k];
      });
      page.style.removeProperty('--ds-on-accent');
      delete state.onAccent;
      state.custom = false;
    }

    function themeCss() {
      const value = (key) => Number((state[key] ?? readVar(SLIDERS[key].variable)).toFixed(3));
      const onAccent = state.onAccent ?? getComputedStyle(page).getPropertyValue('--ds-on-accent').trim();
      return `/* Marca gerada no visualizador do Nanquim System.
   Salve como src/themes/minha-marca.css, importe em src/index.css e use:
   <html data-theme="minha-marca" data-font="${state.font}" data-mode="${state.mode}"> */
[data-theme="minha-marca"] {
  --ds-neutral-hue: ${value('neutralHue')};
  --ds-neutral-chroma: ${value('neutralChroma')};
  --ds-accent-hue: ${value('accentHue')};
  --ds-accent-chroma: ${value('accentChroma')};
  --ds-accent-lightness: ${value('accentLightness')};
  --ds-on-accent: ${onAccent};
  --ds-radius-factor: ${state.radius};
  --ds-text-scale: ${state.text};
  --ds-space-scale: ${state.space};
}`;
    }

    // Fora da tela cheia o painel fica sempre ao lado; na tela cheia ele vira uma gaveta que abre e fecha.
    const fullscreenButton = viz.querySelector('[data-action="fullscreen"]');
    const panelButton = viz.querySelector('.viz-tools [data-action="panel"]');
    panelButton.setAttribute('aria-controls', 'viz-panel');

    function setPanel(open) {
      viz.toggleAttribute('data-panel-open', open);
      panelButton.setAttribute('aria-expanded', String(open));
    }

    function setFullscreen(on) {
      viz.toggleAttribute('data-fullscreen', on);
      fullscreenButton.querySelector('ds-icon').setAttribute('name', on ? 'x' : 'external-link');
      fullscreenButton.querySelector('span').textContent = on ? 'Sair' : 'Tela cheia';
      setPanel(on);
    }

    viz.addEventListener('click', (e) => {
      const choice = e.target.closest('[data-choice]');
      if (choice) {
        if (choice.dataset.choice === 'theme') clearCustomColor();
        state[choice.dataset.choice] = choice.dataset.value;
        apply();
      }

      const action = e.target.closest('[data-action]')?.dataset.action;
      if (action === 'copy') copy(themeCss(), 'Tema copiado');
      if (action === 'reset') {
        clearCustomColor();
        Object.assign(state, DEFAULTS);
        setFrameWidth(frameEl, 'full');
        apply();
        toast('Site de exemplo restaurado');
      }
      if (action === 'fullscreen') setFullscreen(!viz.hasAttribute('data-fullscreen'));
      if (action === 'panel') setPanel(!viz.hasAttribute('data-panel-open'));
    });

    viz.addEventListener('input', (e) => {
      const key = e.target.dataset.slider;
      if (!key) return;
      const value = Number(e.target.value);
      if (SLIDERS[key].custom) setCustomColor(key, value);
      else state[key] = value;
      apply();
    });

    // Esc fecha primeiro a gaveta e, depois, a tela cheia.
    const onKeydown = (e) => {
      if (e.key !== 'Escape' || !viz.hasAttribute('data-fullscreen') || document.querySelector('dialog[open]')) return;
      if (viz.hasAttribute('data-panel-open')) setPanel(false);
      else setFullscreen(false);
    };
    document.addEventListener('keydown', onKeydown);

    // ?marca=terracota&modo=light&modelo=classico já abre o exemplo assim: serve para links diretos e para os prints do diário.
    const params = new URLSearchParams(location.search);
    if (OPTIONS.theme.items.some((item) => item.id === params.get('marca'))) state.theme = params.get('marca');
    if (OPTIONS.mode.items.some((item) => item.id === params.get('modo'))) state.mode = params.get('modo');
    if (TEMPLATES.some(([id]) => id === params.get('modelo'))) state.template = params.get('modelo');
    const presets = { terracota: { font: 'classico', radius: 1.75 }, ardosia: { font: 'moderno' }, aco: { font: 'tecnico', radius: 0.25 } };
    Object.assign(state, presets[state.theme] ?? {});
    apply();
    if (params.has('tela-cheia')) setFullscreen(true);

    const cleanupDemos = mountSiteDemos(el);
    return () => {
      cleanupDemos();
      document.removeEventListener('keydown', onKeydown);
    };
  },
};
