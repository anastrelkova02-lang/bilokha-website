/**
 * БIЛОKhA — генератор словесного знака (wordmark).
 *
 * Літери Б Л О K h A — з Noto Serif Display Medium (контури, не шрифт: SVG не залежить від шрифтів).
 * «I» замінено на власний елемент — тонку бордову вертикаль, що виходить за межі рядка
 * (як закладка в книжці / цезура у вірші). Це головна впізнавана деталь знака.
 *
 * Запуск:  cd brand/tools && npm install && npm run build
 * Результат: brand/*.svg, brand/*.png, public/brand/*, lib/wordmark.ts
 * Іконки та OG-зображення — окремий скрипт icons.mjs
 */
import opentype from 'opentype.js';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve('../..');
const FS = path.join(ROOT, 'node_modules/@fontsource/noto-serif-display/files');
const cyr = opentype.loadSync(path.join(FS, 'noto-serif-display-cyrillic-500-normal.woff'));
const lat = opentype.loadSync(path.join(FS, 'noto-serif-display-latin-500-normal.woff'));

const INK = '#252525';
const ACCENT = '#861B24';
const PAPER = '#F7F6F2';
const SIZE = 1000; // одиниці = em

// Послідовність: [символ, шрифт, відступ після (в em-одиницях)]
// Трекінг підібрано вручну: щільний, але з повітрям навколо вертикалі.
const SEQ = [
  ['Б', cyr, -6],
  ['|', null, 0], // власна «I»
  ['Л', cyr, -18],
  ['О', cyr, -26],
  ['K', lat, 14],
  ['h', lat, 6],
  ['A', lat, 0],
];

const capH = (() => { const b = cyr.charToGlyph('Б').getBoundingBox(); return b.y2; })();
const stem = 76; // товщина власної «I»
const BAR = { up: 120, down: 150, padL: 64, padR: 70 };

function build({ withBar = true, letters = SEQ } = {}) {
  let x = 0;
  const parts = [];
  for (const [ch, font, after] of letters) {
    if (ch === '|') {
      x += BAR.padL;
      if (withBar) parts.push({ type: 'bar', x, y: -capH - BAR.up, w: stem, h: capH + BAR.up + BAR.down });
      x += stem + BAR.padR;
      continue;
    }
    const g = font.charToGlyph(ch);
    const p = g.getPath(x, 0, SIZE);
    parts.push({ type: 'glyph', d: p.toPathData(1) });
    x += g.advanceWidth * (SIZE / font.unitsPerEm) + after;
  }
  return { parts, width: x };
}

function svg({ parts, width }, { ink = INK, accent = ACCENT, bg = null, pad = 40, square = false } = {}) {
  let minY = -capH - BAR.up, maxY = BAR.down;
  let vx = -pad, vy = minY - pad, vw = width + pad * 2, vh = maxY - minY + pad * 2;
  if (square) {
    const s = Math.max(vw, vh) * 1.12;
    vx = width / 2 - s / 2; vy = (minY + maxY) / 2 - s / 2; vw = s; vh = s;
  }
  const r = (n) => Math.round(n * 10) / 10;
  const body = parts
    .map((p) => (p.type === 'bar'
      ? `<rect x="${r(p.x)}" y="${r(p.y)}" width="${p.w}" height="${r(p.h)}" fill="${accent}"/>`
      : `<path d="${p.d}" fill="${ink}"/>`))
    .join('');
  const bgRect = bg ? `<rect x="${r(vx)}" y="${r(vy)}" width="${r(vw)}" height="${r(vh)}" fill="${bg}"/>` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${r(vx)} ${r(vy)} ${r(vw)} ${r(vh)}" role="img" aria-label="БIЛОKhA"><title>БIЛОKhA</title>${bgRect}${body}</svg>`;
}

const out = (f, s) => { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, s); };
const png = async (s, f, w) => sharp(Buffer.from(s.replace('<svg ', `<svg width="${w}" `))).png().toFile(f);

const word = build();
const mono = build({ letters: [['Б', cyr, 0], ['|', null, 0]] });

const files = {
  'bilokha-wordmark.svg': svg(word),
  'bilokha-wordmark-mono.svg': svg(word, { accent: INK }),
  'bilokha-wordmark-light.svg': svg(word, { ink: PAPER, accent: PAPER }),
  'bilokha-monogram.svg': svg(mono, { pad: 30 }),
};
for (const [name, s] of Object.entries(files)) {
  out(path.join(ROOT, 'brand', name), s);
  out(path.join(ROOT, 'public/brand', name), s);
}

await png(svg(word, { bg: PAPER, pad: 80 }), path.join(ROOT, 'brand/bilokha-wordmark.png'), 2400);
// Дані для React-компонента
const toData = ({ parts, width }) => ({
  viewBox: `${-8} ${Math.round(-capH - BAR.up - 8)} ${Math.round(width + 16)} ${Math.round(capH + BAR.up + BAR.down + 16)}`,
  glyphs: parts.filter((p) => p.type === 'glyph').map((p) => p.d),
  bar: parts.filter((p) => p.type === 'bar').map((p) => ({ x: Math.round(p.x), y: Math.round(p.y), w: p.w, h: Math.round(p.h) }))[0],
});
out(
  path.join(ROOT, 'lib/wordmark.ts'),
  `// Згенеровано: brand/tools (npm run build). Не редагуйте вручну.\nexport const wordmark = ${JSON.stringify(toData(word))} as const;\nexport const monogram = ${JSON.stringify(toData(mono))} as const;\n`,
);
console.log('ok', { capH, width: Math.round(word.width) });
