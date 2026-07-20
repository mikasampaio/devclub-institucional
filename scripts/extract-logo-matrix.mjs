// Regenera a matriz LOGO_GRID de src/components/Galaxy.tsx a partir do PNG
// da marca. Uso: node scripts/extract-logo-matrix.mjs [caminho-do-png]
//
// Decodifica o PNG (RGBA 8-bit, non-interlaced) só com node:zlib, amostra a
// imagem numa grade fina, detecta o tamanho de módulo com menos células
// ambíguas e imprime a matriz pronta para colar no componente.
import { readFileSync } from "node:fs";
import { inflateSync } from "node:zlib";

const path = process.argv[2] ?? "public/logo-devclub.png";
const buf = readFileSync(path);

let pos = 8; // pula a assinatura PNG
let width = 0;
let height = 0;
const idat = [];
while (pos < buf.length) {
  const len = buf.readUInt32BE(pos);
  const type = buf.toString("ascii", pos + 4, pos + 8);
  const data = buf.subarray(pos + 8, pos + 8 + len);
  if (type === "IHDR") {
    width = data.readUInt32BE(0);
    height = data.readUInt32BE(4);
    const [bitDepth, colorType] = [data[8], data[9]];
    const interlace = data[12];
    if (bitDepth !== 8 || colorType !== 6 || interlace !== 0) {
      throw new Error(
        `formato não suportado: depth=${bitDepth} color=${colorType} interlace=${interlace} (exporte como RGBA 8-bit sem interlace)`,
      );
    }
  } else if (type === "IDAT") {
    idat.push(data);
  } else if (type === "IEND") {
    break;
  }
  pos += 12 + len;
}

const raw = inflateSync(Buffer.concat(idat));
const bpp = 4;
const stride = width * bpp;
const px = Buffer.alloc(height * stride);

const paeth = (a, b, c) => {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  return pb <= pc ? b : c;
};

for (let y = 0; y < height; y++) {
  const filter = raw[y * (stride + 1)];
  const row = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
  for (let x = 0; x < stride; x++) {
    const left = x >= bpp ? px[y * stride + x - bpp] : 0;
    const up = y > 0 ? px[(y - 1) * stride + x] : 0;
    const upLeft = y > 0 && x >= bpp ? px[(y - 1) * stride + x - bpp] : 0;
    let value = row[x];
    if (filter === 1) value += left;
    else if (filter === 2) value += up;
    else if (filter === 3) value += (left + up) >> 1;
    else if (filter === 4) value += paeth(left, up, upLeft);
    px[y * stride + x] = value & 0xff;
  }
}

// "Escuro" = módulo da marca (o fundo da arte é verde claro).
const isDark = (x, y) => {
  const i = y * stride + x * bpp;
  if (px[i + 3] < 128) return false;
  return 0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2] < 100;
};

// Fração de preenchimento de uma célula da grade N, amostrada em 5x5 pontos.
const cellFill = (n, gx, gy) => {
  const cell = width / n;
  let dark = 0;
  let total = 0;
  for (let sy = 0.15; sy <= 0.85; sy += 0.175) {
    for (let sx = 0.15; sx <= 0.85; sx += 0.175) {
      const x = Math.min(width - 1, Math.round((gx + sx) * cell));
      const y = Math.min(height - 1, Math.round((gy + sy) * cell));
      total++;
      if (isDark(x, y)) dark++;
    }
  }
  return dark / total;
};

// Escolhe a grade com menos células ambíguas (nem vazias nem cheias).
let best = { n: 0, mixed: Infinity };
for (let n = 8; n <= 64; n++) {
  let mixed = 0;
  for (let gy = 0; gy < n; gy++) {
    for (let gx = 0; gx < n; gx++) {
      const fill = cellFill(n, gx, gy);
      if (fill > 0.2 && fill < 0.8) mixed++;
    }
  }
  const pct = mixed / (n * n);
  if (pct < best.mixed - 1e-9) best = { n, mixed: pct };
}

const { n } = best;
const grid = [];
for (let gy = 0; gy < n; gy++) {
  let row = "";
  for (let gx = 0; gx < n; gx++) row += cellFill(n, gx, gy) >= 0.5 ? "#" : ".";
  grid.push(row);
}

// Recorta a margem vazia (linhas/colunas vazias INTERNAS são preservadas) e
// colapsa repetições k× (módulos que ocupam k×k células viram 1×1).
const nonEmpty = grid
  .map((r, i) => (r.includes("#") ? i : -1))
  .filter((i) => i >= 0);
const top = nonEmpty[0];
const bottom = nonEmpty[nonEmpty.length - 1];
let left = n;
let right = 0;
for (const r of grid) {
  if (!r.includes("#")) continue;
  left = Math.min(left, r.indexOf("#"));
  right = Math.max(right, r.lastIndexOf("#"));
}
let trimmed = grid.slice(top, bottom + 1).map((r) => r.slice(left, right + 1));

const transpose = (m) =>
  m[0].split("").map((_, c) => m.map((r) => r[c]).join(""));
const collapse = (view) => {
  for (let k = Math.min(8, view.length); k >= 2; k--) {
    if (view.length % k !== 0) continue;
    const grouped = view.every((r, i) => r === view[i - (i % k)]);
    if (grouped) return view.filter((_, i) => i % k === 0);
  }
  return view;
};
trimmed = collapse(trimmed);
trimmed = transpose(collapse(transpose(trimmed)));

console.log(
  `grade detectada: ${n}×${n} (${(best.mixed * 100).toFixed(1)}% ambíguo)`,
);
console.log(`matriz final ${trimmed.length}×${trimmed[0].length}:\n`);
console.log(trimmed.map((r) => `  "${r}",`).join("\n"));
