import { getStroke } from 'perfect-freehand';
import fs from 'fs';
import sharp from 'sharp';

const strokesFile = process.argv[2] || 'strokes.json';
const out = process.argv[3] || 'sig';
const { strokes, slant = 0.26, size = 15, color = '#800F18' } = JSON.parse(fs.readFileSync(strokesFile, 'utf8'));

// centripetal catmull-rom
function crSample(pts, steps = 18) {
  const P = [pts[0], ...pts, pts[pts.length - 1]];
  const res = [];
  for (let i = 1; i < P.length - 2; i++) {
    const [p0, p1, p2, p3] = [P[i - 1], P[i], P[i + 1], P[i + 2]];
    for (let s = 0; s < steps; s++) {
      const t = s / steps, t2 = t * t, t3 = t2 * t;
      const f = (a, b, c, d) => 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
      res.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]);
    }
  }
  res.push(pts[pts.length - 1]);
  return res;
}

const skew = ([x, y]) => [x - y * slant, y];
function d(outline) {
  if (!outline.length) return '';
  const r = (n) => n.toFixed(1);
  let s = `M${r(outline[0][0])} ${r(outline[0][1])}`;
  for (let i = 1; i < outline.length; i++) {
    const [x0, y0] = outline[i - 1], [x1, y1] = outline[i];
    s += ` Q${r(x0)} ${r(y0)} ${r((x0 + x1) / 2)} ${r((y0 + y1) / 2)}`;
  }
  return s + 'Z';
}

const paths = [], centers = [];
let minX = 1e9, minY = 1e9, maxX = -1e9, maxY = -1e9;
for (const st of strokes) {
  const pts = crSample(st.p.map(skew));
  const n = pts.length;
  // pressure: heavier on downstrokes (dy>0), lighter on upstrokes, taper ends
  const pp = pts.map((p, i) => {
    const q = pts[Math.min(i + 1, n - 1)], o = pts[Math.max(i - 1, 0)];
    const dy = q[1] - o[1], len = Math.hypot(q[0] - o[0], dy) || 1;
    const down = dy / len; // +1 down
    let pr = 0.5 + 0.45 * down;
    return [p[0], p[1], Math.max(0.15, Math.min(1, pr * (st.w || 1)))];
  });
  const outline = getStroke(pp, {
    size: st.size || size, thinning: 0.72, smoothing: 0.6, streamline: 0.3, simulatePressure: false,
    start: { taper: st.t0 ?? 30, cap: true }, end: { taper: st.t1 ?? 60, cap: true }, last: true,
  });
  for (const [x, y] of outline) { minX = Math.min(minX, x); minY = Math.min(minY, y); maxX = Math.max(maxX, x); maxY = Math.max(maxY, y); }
  paths.push(d(outline));
  centers.push(pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' '));
}
const pad = 10;
const vb = `${(minX - pad).toFixed(0)} ${(minY - pad).toFixed(0)} ${(maxX - minX + 2 * pad).toFixed(0)} ${(maxY - minY + 2 * pad).toFixed(0)}`;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" role="img" aria-label="БIЛОKhA"><title>БIЛОKhA</title><g fill="${color}">${paths.map((p) => `<path d="${p}"/>`).join('')}</g></svg>`;
fs.writeFileSync(`${out}.svg`, svg);
fs.writeFileSync(`${out}.json`, JSON.stringify({ viewBox: vb, paths, centers }));
await sharp(Buffer.from(svg.replace('<svg ', '<svg width="1400" style="background:#F5F2EB" '))).flatten({ background: '#F5F2EB' }).png().toFile(`${out}.png`);
console.log('ok', vb);
