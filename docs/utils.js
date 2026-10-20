const toastEl = () => document.getElementById('toast');
let toastTimer;

export function toast(message) {
  const el = toastEl();
  el.textContent = message;
  el.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('is-visible'), 1800);
}

export async function copy(text, label = 'Copiado') {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = Object.assign(document.createElement('textarea'), { value: text });
    document.body.append(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
  }
  toast(`${label}: ${text.length > 40 ? text.slice(0, 40) + '…' : text}`);
}

export const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export function code(source, lang = 'css') {
  const trimmed = source.replace(/^\n/, '').replace(/\s+$/, '');
  return `
    <div class="doc-code">
      <div class="doc-code-head"><span>${lang}</span>
        <button class="doc-code-copy" data-copy="${escapeHtml(trimmed)}">Copiar</button>
      </div>
      <pre><code>${escapeHtml(trimmed)}</code></pre>
    </div>`;
}

export function doDont(dos, donts) {
  const li = (arr) => arr.map((t) => `<li>${t}</li>`).join('');
  return `
    <div class="doc-dodont">
      <div class="doc-do"><h4>✓ Faça</h4><ul>${li(dos)}</ul></div>
      <div class="doc-dont"><h4>✕ Evite</h4><ul>${li(donts)}</ul></div>
    </div>`;
}

// Um canvas 1x1 converte qualquer cor CSS (inclusive oklch) em RGB.
const ctx = document.createElement('canvas').getContext('2d', { willReadFrequently: true });

export function resolveRgb(cssColor) {
  ctx.clearRect(0, 0, 1, 1);
  ctx.fillStyle = '#000';
  ctx.fillStyle = cssColor;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return [r, g, b];
}

export function resolveVarColor(name, scope = document.body) {
  const probe = document.createElement('span');
  probe.style.color = `var(${name})`;
  probe.style.display = 'none';
  scope.append(probe);
  const value = getComputedStyle(probe).color;
  probe.remove();
  return value;
}

const lum = ([r, g, b]) => {
  const f = (v) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};

export function contrast(a, b) {
  const [l1, l2] = [lum(resolveRgb(a)), lum(resolveRgb(b))].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

export function contrastLabel(ratio) {
  if (ratio >= 7) return { text: 'Ótimo', cls: 'is-great' };
  if (ratio >= 4.5) return { text: 'Legível', cls: 'is-ok' };
  if (ratio >= 3) return { text: 'Só textos grandes', cls: 'is-warn' };
  return { text: 'Decorativo', cls: 'is-bad' };
}

export function toHex(cssColor) {
  return '#' + resolveRgb(cssColor).map((v) => v.toString(16).padStart(2, '0')).join('');
}
