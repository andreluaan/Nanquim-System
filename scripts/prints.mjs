// Uso, com o servidor de desenvolvimento rodando: npm run prints -- <etapa>
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const BASE = process.env.DOCS_URL ?? 'http://localhost:5180/';
const etapa = (process.argv[2] ?? 'snapshot').toLowerCase().replace(/[^a-z0-9-]+/g, '-');
const date = new Date().toISOString().slice(0, 10);
const outDir = resolve('diario', 'prints', `${date}_${etapa}`);

const BROWSERS = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
];
const browser = process.env.BROWSER_PATH ?? BROWSERS.find(existsSync);
if (!browser) throw new Error('Nenhum Chrome/Edge encontrado. Defina BROWSER_PATH.');

const DESKTOP = [1440, 900];
const MOBILE = [390, 844];
const FULL_PAGE = [1440, 4200];

const SHOTS = [
  ['00-apresentacao', 'apresentacao', {}, DESKTOP],
  ['01-inicio', 'inicio', {}, DESKTOP],
  ['02-cores', 'cores', {}, DESKTOP],
  ['03-tipografia', 'tipografia', {}, DESKTOP],
  ['04-espaco-cantos', 'espacamento', {}, DESKTOP],
  ['05-elevacao', 'elevacao', {}, DESKTOP],
  ['06-movimento', 'movimento', {}, DESKTOP],
  ['07-roadmap', 'roadmap', {}, DESKTOP],
  ['08-botoes', 'botoes', {}, DESKTOP],
  ['09-icones', 'icones', {}, DESKTOP],
  ['09b-badges', 'badges', {}, DESKTOP],
  ['09c-cards', 'cards', {}, DESKTOP],
  ['09d-formularios', 'formularios', {}, DESKTOP],
  ['09e-carrossel', 'carrossel', {}, DESKTOP],
  ['09f-sobreposicoes', 'sobreposicoes', {}, DESKTOP],
  ['45-modal-aberto', 'sobreposicoes', { abrir: 'modal-newsletter' }, DESKTOP],
  ['46-gaveta-carrinho', 'sobreposicoes', { abrir: 'gaveta-carrinho' }, DESKTOP],
  ['47-gaveta-papel', 'sobreposicoes', { abrir: 'gaveta-menu', mode: 'light' }, DESKTOP],
  ['10-laboratorio', 'inicio', { lab: '' }, DESKTOP],
  ['11-paleta-grafite', 'cores', { theme: 'grafite' }, DESKTOP],
  ['12-paleta-ardosia', 'cores', { theme: 'ardosia', font: 'moderno' }, DESKTOP],
  ['13-paleta-terracota', 'cores', { theme: 'terracota', font: 'classico' }, DESKTOP],
  ['14-paleta-aco', 'cores', { theme: 'aco', font: 'tecnico' }, DESKTOP],
  ['17-paleta-neutro', 'botoes', { theme: 'neutro', font: 'moderno' }, DESKTOP],
  ['18-paleta-neutro-claro', 'botoes', { theme: 'neutro', font: 'moderno', mode: 'light' }, DESKTOP],
  ['15-marca-cliente', 'inicio', { theme: 'marca-exemplo' }, DESKTOP],
  ['16-botoes-terracota-claro', 'botoes', { theme: 'terracota', mode: 'light', radius: 'arredondado' }, DESKTOP],
  ['19-apresentacao-papel', 'apresentacao', { mode: 'light' }, DESKTOP],
  ['20-modo-claro', 'inicio', { mode: 'light' }, DESKTOP],
  ['21-modo-claro-elevacao', 'elevacao', { mode: 'light', theme: 'aco' }, DESKTOP],
  ['29-mobile-apresentacao', 'apresentacao', {}, MOBILE],
  ['30-mobile-inicio', 'inicio', {}, MOBILE],
  ['31-mobile-cores', 'cores', {}, MOBILE],
  ['32-mobile-botoes', 'botoes', {}, MOBILE],
  ['33-mobile-icones', 'icones', {}, MOBILE],
  ['34-mobile-cards', 'cards', {}, MOBILE],
  ['35-mobile-formularios', 'formularios', {}, MOBILE],
  ['36-mobile-carrossel', 'carrossel', {}, MOBILE],
  ['37-mobile-gaveta-filtros', 'sobreposicoes', { abrir: 'gaveta-filtros' }, MOBILE],
  ['40-apresentacao-completa', 'apresentacao', {}, FULL_PAGE],
  ['43-carrossel-completo', 'carrossel', {}, FULL_PAGE],
  ['44-carrossel-papel', 'carrossel', { mode: 'light' }, DESKTOP],
  ['48-sobreposicoes-completo', 'sobreposicoes', {}, FULL_PAGE],
];

try {
  await fetch(BASE);
} catch {
  console.error(`Servidor não encontrado em ${BASE}. Rode "npm run dev" antes.`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });

for (const [name, page, params, [w, h]] of SHOTS) {
  const qs = new URLSearchParams({ print: '', ...params }).toString();
  let url = `${BASE}?${qs}#${page}`;
  // O modo headless não abre janelas estreitas, então telas pequenas usam uma moldura.
  if (w < 600) url = `${BASE}scripts/frame.html?` + new URLSearchParams({ w, h, src: url });
  const file = join(outDir, `${name}.png`);
  execFileSync(browser, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    `--window-size=${w},${h}`,
    '--virtual-time-budget=4000',
    `--screenshot=${file}`,
    url,
  ], { stdio: 'ignore' });
  console.log(`✓ ${name}`);
}

console.log(`\n${SHOTS.length} prints em ${outDir}`);
