const PAPER = 'oklch(0.94 0.02 85)';
const INK = 'oklch(0.17 0.02 265)';

const roughEdge = (id, scale, frequency = '0.035') => `
  <filter id="${id}-rough" x="-20%" y="-20%" width="140%" height="140%">
    <feTurbulence type="fractalNoise" baseFrequency="${frequency}" numOctaves="3" seed="4" />
    <feDisplacementMap in="SourceGraphic" scale="${scale}" />
  </filter>`;

const paperGrain = (id) => `
  <filter id="${id}-grain">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
    <feColorMatrix values="0 0 0 0 0.35  0 0 0 0 0.3  0 0 0 0 0.2  0 0 0 0.09 0" />
  </filter>`;

const paper = (id) => `
  <rect width="400" height="300" fill="${PAPER}" />
  <rect width="400" height="300" filter="url(#${id}-grain)" />`;

export function inkDrop() {
  const id = 'ill-drop';
  return `
    <svg viewBox="0 0 400 300" role="img" aria-label="Gota de nanquim sobre papel">
      <defs>${roughEdge(id, 10)}${paperGrain(id)}</defs>
      ${paper(id)}
      <g fill="${INK}" filter="url(#${id}-rough)">
        <path d="M200 52 C200 52 146 138 146 178 a54 54 0 0 0 108 0 C254 138 200 52 200 52Z" />
        <circle cx="286" cy="214" r="7" />
        <circle cx="304" cy="190" r="3.5" />
        <circle cx="118" cy="222" r="5" />
        <circle cx="101" cy="200" r="2.5" />
      </g>
      <ellipse cx="183" cy="168" rx="9" ry="16" fill="${PAPER}" opacity="0.18" />
    </svg>`;
}

export function brushStroke() {
  const id = 'ill-brush';
  return `
    <svg viewBox="0 0 400 300" role="img" aria-label="Pincelada de nanquim">
      <defs>${roughEdge(id, 7, '0.015 0.2')}${paperGrain(id)}</defs>
      ${paper(id)}
      <g fill="none" stroke="${INK}" stroke-linecap="round" filter="url(#${id}-rough)">
        <path d="M52 206 C128 118 214 250 352 104" stroke-width="30" />
        <path d="M70 226 C150 150 228 262 336 136" stroke-width="5" opacity="0.5" />
      </g>
    </svg>`;
}

export function inkWash() {
  const id = 'ill-wash';
  const dilutions = [0.08, 0.16, 0.28, 0.42, 0.6, 0.8, 1];
  const bandWidth = 400 / dilutions.length;
  return `
    <svg viewBox="0 0 400 300" role="img" aria-label="Aguada: a mesma tinta em diluições diferentes">
      <defs>${roughEdge(id, 12)}${paperGrain(id)}</defs>
      ${paper(id)}
      <g fill="${INK}" filter="url(#${id}-rough)">
        ${dilutions
          .map((opacity, i) => `<rect x="${i * bandWidth + 6}" y="46" width="${bandWidth - 4}" height="208" opacity="${opacity}" />`)
          .join('')}
      </g>
    </svg>`;
}

export function enso({ id = 'ill-enso', color = INK, withPaper = true, animated = false } = {}) {
  return `
    <svg viewBox="0 0 400 300" role="img" aria-label="Ensō, o círculo desenhado em uma única pincelada">
      <defs>${roughEdge(id, 9)}${paperGrain(id)}</defs>
      ${withPaper ? paper(id) : ''}
      <circle class="${animated ? 'ill-enso-draw' : ''}" cx="200" cy="150" r="96" fill="none"
        stroke="${color}" stroke-width="20" stroke-linecap="round" pathLength="624"
        stroke-dasharray="560 64" transform="rotate(-70 200 150)" filter="url(#${id}-rough)" />
    </svg>`;
}
