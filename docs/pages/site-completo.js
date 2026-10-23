import { OPTIONS } from '../lab.js';
import { contrast, contrastLabel, resolveVarColor, toast, copy } from '../utils.js';
import { frame, fullSite, mountSiteDemos, setFrameWidth, WIDTHS } from '../site-kit.js';

const DEFAULTS = { theme: 'nanquim', font: 'editorial', mode: 'dark', radius: 1, text: 1, space: 1, width: 'full' };

// Cada controle deslizante escreve uma variável no site de exemplo; os tokens recalculam o resto.
const SLIDERS = {
  accentHue: { label: 'Matiz', variable: '--ds-accent-hue', min: 0, max: 360, step: 1, custom: true },
  accentChroma: { label: 'Intensidade', variable: '--ds-accent-chroma', min: 0, max: 0.2, step: 0.005, custom: true },
  accentLightness: { label: 'Luminosidade', variable: '--ds-accent-lightness', min: 0.3, max: 0.92, step: 0.01, custom: true },
  neutralHue: { label: 'Matiz', variable: '--ds-neutral-hue', min: 0, max: 360, step: 1, custom: true },
  neutralChroma: { label: 'Cor nos cinzas', variable: '--ds-neutral-chroma', min: 0, max: 0.04, step: 0.001, custom: true },
  radius: { label: 'Cantos', variable: '--ds-radius-factor', min: 0, max: 2.5, step: 0.05, format: (v) => `${Math.round(v * 8)}px` },
  text: { label: 'Tamanho do texto', variable: '--ds-text-scale', min: 0.85, max: 1.25, step: 0.05, format: (v) => `${Math.round(v * 100)}%` },
  space: { label: 'Espaçamento', variable: '--ds-space-scale', min: 0.75, max: 1.3, step: 0.05, format: (v) => `${Math.round(v * 100)}%` },
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

const choices = (key, items, render) => `
  <div class="viz-choices viz-choices--${key}">
    ${items.map((item) => `<button class="viz-option" data-choice="${key}" data-value="${item.id}" aria-pressed="false">${render(item)}</button>`).join('')}
  </div>`;

const segmented = (key, items, label) => `
  <div class="doc-segmented" role="radiogroup" aria-label="${label}">
    ${items.map(([id, name]) => `<button role="radio" aria-checked="false" data-choice="${key}" data-value="${id}">${name}</button>`).join('')}
  </div>`;

export default {
  id: 'site-completo',
  group: 'Seções de site',
  title: 'Site completo',
  wide: true,
  keywords: 'site completo landing page exemplo visualizador marca tema cores fonte cantos tamanho gerar tema',
  lead: 'Todas as seções num site. Vista-o com outra marca e copie o tema.',
  render: () => `
    <div class="viz" data-viz>
      <aside class="viz-panel" aria-label="Ajustes da marca">
        <section class="viz-group">
          <h2>Paleta</h2>
          ${choices('theme', OPTIONS.theme.items, (item) => `<span class="lab-swatch">${item.swatch.map((c) => `<i style="background:${c}"></i>`).join('')}</span><span>${item.name}</span>`)}
        </section>
        <section class="viz-group">
          <h2>Cor de destaque <small data-custom-flag hidden>personalizada</small></h2>
          ${slider('accentHue')}${slider('accentChroma')}${slider('accentLightness')}
        </section>
        <section class="viz-group">
          <h2>Neutros</h2>
          ${slider('neutralHue')}${slider('neutralChroma')}
        </section>
        <section class="viz-group">
          <h2>Tipografia</h2>
          ${choices('font', OPTIONS.font.items, (item) => `<span class="lab-aa" style="font-family:${item.family}">Aa</span><span>${item.name}</span>`)}
          ${slider('text')}
        </section>
        <section class="viz-group">
          <h2>Forma</h2>
          ${slider('radius')}${slider('space')}
        </section>
        <section class="viz-group">
          <h2>Modo e largura</h2>
          ${segmented('mode', OPTIONS.mode.items.map((item) => [item.id, item.name]), 'Modo')}
          ${segmented('width', WIDTHS, 'Largura da prévia')}
        </section>
        <section class="viz-group">
          <h2>Contraste</h2>
          <dl class="viz-contrast" data-contrast></dl>
        </section>
        <div class="viz-actions">
          <button class="ds-btn ds-btn--primary ds-btn--sm" data-action="copy"><ds-icon name="copy"></ds-icon> Copiar tema</button>
          <button class="ds-btn ds-btn--sm" data-action="fullscreen" aria-pressed="false"><ds-icon name="external-link"></ds-icon> Tela cheia</button>
          <button class="ds-btn ds-btn--ghost ds-btn--sm" data-action="reset"><ds-icon name="refresh"></ds-icon> Restaurar</button>
        </div>
      </aside>
      <div class="viz-stage">
        ${frame({ content: fullSite('sumi-menu-completo'), className: 'site-frame--scroll', widths: false, attrs: 'data-site data-scale' })}
      </div>
    </div>`,

  mount(el) {
    const viz = el.querySelector('[data-viz]');
    const page = viz.querySelector('[data-site]');
    const state = { ...DEFAULTS };

    const readVar = (name) => Number.parseFloat(getComputedStyle(page).getPropertyValue(name));

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
      viz.querySelector('[data-custom-flag]').hidden = !state.custom;
    }

    function measureContrast() {
      viz.querySelector('[data-contrast]').innerHTML = CONTRASTS.map(([label, fg, bg]) => {
        const ratio = contrast(resolveVarColor(fg, page), resolveVarColor(bg, page));
        const rating = contrastLabel(ratio);
        return `<div><dt>${label}</dt><dd class="${rating.cls}">${ratio.toFixed(1)} · ${rating.text}</dd></div>`;
      }).join('');
    }

    function apply() {
      Object.assign(page.dataset, { theme: state.theme, font: state.font, mode: state.mode });
      ['radius', 'text', 'space'].forEach((key) => page.style.setProperty(SLIDERS[key].variable, state[key]));
      setFrameWidth(viz.querySelector('[data-frame]'), state.width);
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
        apply();
        toast('Site de exemplo restaurado');
      }
      if (action === 'fullscreen') setFullscreen(!viz.hasAttribute('data-fullscreen'));
    });

    viz.addEventListener('input', (e) => {
      const key = e.target.dataset.slider;
      if (!key) return;
      const value = Number(e.target.value);
      if (SLIDERS[key].custom) setCustomColor(key, value);
      else state[key] = value;
      apply();
    });

    const fullscreenButton = viz.querySelector('[data-action="fullscreen"]');
    function setFullscreen(on) {
      viz.toggleAttribute('data-fullscreen', on);
      fullscreenButton.setAttribute('aria-pressed', String(on));
      fullscreenButton.lastChild.textContent = on ? ' Sair da tela cheia' : ' Tela cheia';
    }
    const onKeydown = (e) => {
      if (e.key === 'Escape' && viz.hasAttribute('data-fullscreen') && !document.querySelector('dialog[open]')) setFullscreen(false);
    };
    document.addEventListener('keydown', onKeydown);

    // ?marca=terracota&modo=light já abre o exemplo assim: serve para links diretos e para os prints do diário.
    const params = new URLSearchParams(location.search);
    if (OPTIONS.theme.items.some((item) => item.id === params.get('marca'))) state.theme = params.get('marca');
    if (OPTIONS.mode.items.some((item) => item.id === params.get('modo'))) state.mode = params.get('modo');
    const presets = { terracota: { font: 'classico', radius: 1.75 }, ardosia: { font: 'moderno' }, aco: { font: 'tecnico', radius: 0.25 } };
    Object.assign(state, presets[state.theme] ?? {});
    apply();

    const cleanupDemos = mountSiteDemos(el);
    return () => {
      cleanupDemos();
      document.removeEventListener('keydown', onKeydown);
    };
  },
};
