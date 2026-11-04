/**
 * БIЛОKhA — іконки сайту та зображення для соцмереж.
 *
 * Символ: монограма «БІ» з актуального логотипа — графітова «Б» і коротка бордова «І»
 * на теплому білому #F7F6F2. Для 16/32 px — менші поля й потовщені тонкі штрихи.
 *
 * Запуск: cd brand/tools && npm run build
 * Результат: public/favicon.ico, favicon.svg, favicon-16x16.png, favicon-32x32.png,
 *            apple-touch-icon.png, icon-192.png, icon-512.png, icon-maskable-512.png,
 *            app/opengraph-image.png, app/twitter-image.png, brand/*
 */
import opentype from 'opentype.js';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve('../..');
const NM = path.join(ROOT, 'node_modules/@fontsource');
const load = (pkg, sub, w) => opentype.loadSync(path.join(NM, pkg, 'files', `${pkg}-${sub}-${w}-normal.woff`));

const PAPER = '#F7F6F2';
const STONE = '#E9E8E2';
const INK = '#252525';
const GREY = '#92918B';
const BURG = '#861B24';

/* ---------- 1. Символ ----------
 * Монограма з актуального логотипа: «Б» (графіт) + коротка бордова «І» —
 * ті самі контури й пропорції, що в словесному знаку (lib/wordmark.ts).
 */
const WM = fs.readFileSync(path.join(ROOT, 'lib/wordmark.ts'), 'utf8');
const mono = JSON.parse(WM.match(/export const monogram = (\{.*?\}) as const;/s)[1]);

function iconSVG({ size = 512, pad = 0.16, bg = PAPER, boost = 0 } = {}) {
  // межі символу: від верху «Б» до базової лінії, по ширині — від «Б» до «І»
  const f = load('noto-serif-display', 'cyrillic', 500);
  const bb = f.charToGlyph('Б').getPath(0, 0, 1000).getBoundingBox();
  const x0 = bb.x1, y0 = bb.y1, w = mono.bar.x + mono.bar.w - bb.x1, h = -bb.y1;
  const scale = (size * (1 - pad * 2)) / Math.max(w, h);
  const tx = (size - w * scale) / 2 - x0 * scale;
  const ty = (size - h * scale) / 2 - y0 * scale;
  const stroke = boost ? ` stroke="${INK}" stroke-width="${boost}" stroke-linejoin="round"` : '';
  const b = mono.bar;
  const bw = boost ? b.w + boost * 0.6 : b.w;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}"><rect width="${size}" height="${size}" fill="${bg}"/><g transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${scale.toFixed(5)})">${mono.glyphs.map((d) => `<path d="${d}" fill="${INK}"${stroke}/>`).join('')}<rect x="${b.x}" y="${b.y}" width="${bw}" height="${b.h}" fill="${BURG}"/></g></svg>`;
}

const write = (rel, data) => { const f = path.join(ROOT, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, data); };
const png = (svg, size) => sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();

const svgMain = iconSVG({ size: 512, pad: 0.17 });
const svgSmall = iconSVG({ size: 512, pad: 0.08, boost: 40 }); // тонкі штрихи потовщено для 16–32 px
const svgMaskable = iconSVG({ size: 512, pad: 0.27 });

write('public/favicon.svg', svgSmall);
write('brand/bilokha-symbol.svg', svgMain);
write('public/brand/bilokha-symbol.svg', svgMain);
write('public/favicon-16x16.png', await png(svgSmall, 16));
write('public/favicon-32x32.png', await png(svgSmall, 32));
write('public/apple-touch-icon.png', await png(svgMain, 180));
write('public/icon-192.png', await png(svgMain, 192));
write('public/icon-512.png', await png(svgMain, 512));
write('public/icon-maskable-512.png', await png(svgMaskable, 512));
write('brand/bilokha-symbol-1080.png', await png(svgMain, 1080));

// favicon.ico (PNG-вміст: 16, 32, 48)
const icoSizes = [16, 32, 48];
const bufs = await Promise.all(icoSizes.map((s) => png(s <= 32 ? svgSmall : svgMain, s)));
const header = Buffer.alloc(6); header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(icoSizes.length, 4);
let offset = 6 + 16 * icoSizes.length;
const dir = icoSizes.map((s, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(s, 0); e.writeUInt8(s, 1); e.writeUInt8(0, 2); e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6); e.writeUInt32LE(bufs[i].length, 8); e.writeUInt32LE(offset, 12);
  offset += bufs[i].length; return e;
});
write('public/favicon.ico', Buffer.concat([header, ...dir, ...bufs]));

/* ---------- 2. Open Graph 1200×630 ---------- */
const fonts = {
  display: [load('noto-serif-display', 'cyrillic', 400), load('noto-serif-display', 'latin', 400)],
  sans: [load('onest', 'cyrillic', 500), load('onest', 'latin', 500)],
  mono: [load('ibm-plex-mono', 'cyrillic', 400), load('ibm-plex-mono', 'latin', 400)],
};
// текст → контури (символ береться з того підмножини шрифту, де він є)
function text(str, x, y, size, set, { fill = INK, tracking = 0 } = {}) {
  let cx = x; const out = [];
  for (const ch of str) {
    const f = set.find((ff) => ff.charToGlyph(ch).index !== 0) || set[0];
    const g = f.charToGlyph(ch);
    out.push(g.getPath(cx, y, size).toPathData(1));
    cx += g.advanceWidth * (size / f.unitsPerEm) + tracking * size;
  }
  return { svg: `<path fill="${fill}" d="${out.join('')}"/>`, width: cx - x };
}

const W = 1200, H = 630, M = 64;
const PHOTO_X = 676;
const wm = JSON.parse(fs.readFileSync(path.join(ROOT, 'lib/wordmark.ts'), 'utf8').match(/export const wordmark = (\{.*?\}) as const;/s)[1]);
const [vx, vy, vw, vh] = wm.viewBox.split(' ').map(Number);
const wmW = 470, wmScale = wmW / vw, wmH = vh * wmScale;
const wmY = 196;

const parts = [];
parts.push(`<rect width="${W}" height="${H}" fill="${PAPER}"/>`);
// верхня смуга
parts.push(`<rect x="${M}" y="${M}" width="${PHOTO_X - M * 2}" height="1.5" fill="${INK}"/>`);
parts.push(text('№ 001 — ПОЕТИЧНИЙ АРХІВ', M, M + 30, 15, fonts.mono, { fill: GREY, tracking: 0.04 }).svg);
// логотип
parts.push(`<g transform="translate(${M - vx * wmScale} ${wmY - vy * wmScale}) scale(${wmScale})"><g fill="${INK}">${wm.glyphs.map((d) => `<path d="${d}"/>`).join('')}</g><rect x="${wm.bar.x}" y="${wm.bar.y}" width="${wm.bar.w}" height="${wm.bar.h}" fill="${BURG}"/></g>`);
// цитата — точний рядок із «ПІСЛЯСМАК»
const qY = wmY + wmH + 70;
parts.push(text('«це літо було', M, qY, 40, fonts.display).svg);
parts.push(text('невиразно красивим.»', M, qY + 48, 40, fonts.display).svg);
parts.push(text('04', M, qY + 92, 15, fonts.mono, { fill: BURG, tracking: 0.04 }).svg);
parts.push(text('ПІСЛЯСМАК', M + 34, qY + 92, 15, fonts.mono, { fill: INK, tracking: 0.04 }).svg);
// нижня смуга
parts.push(`<rect x="${M}" y="${H - M - 30}" width="${PHOTO_X - M * 2}" height="1" fill="${INK}" fill-opacity="0.2"/>`);
parts.push(text('Сучасна українська поезія', M, H - M, 17, fonts.sans, { fill: INK }).svg);
const url = text('BILOKHA-WEBSITE.VERCEL.APP', 0, 0, 12, fonts.mono, { tracking: 0.04 });
parts.push(text('BILOKHA-WEBSITE.VERCEL.APP', PHOTO_X - M - url.width, H - M, 12, fonts.mono, { fill: GREY, tracking: 0.04 }).svg);

const ogBase = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${parts.join('')}</svg>`;
const photo = await sharp(path.join(ROOT, 'public/photos/field.jpg'))
  .resize(W - PHOTO_X, H, { fit: 'cover', position: 'attention' })
  .grayscale().modulate({ brightness: 1.02 }).toBuffer();
const capSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${W - PHOTO_X}" height="${H}">${text('ФОТО 01 — ПОЛЕ', 20, H - 22, 12, fonts.mono, { fill: PAPER, tracking: 0.05 }).svg}</svg>`;
const og = await sharp(Buffer.from(ogBase)).composite([
  { input: photo, left: PHOTO_X, top: 0 },
  { input: Buffer.from(capSVG), left: PHOTO_X, top: 0 },
]).png().toBuffer();
write('app/opengraph-image.png', og);
write('app/twitter-image.png', og);
write('brand/bilokha-og.png', og);
console.log('icons + og ok');
