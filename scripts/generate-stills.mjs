// Renders the film stills in public/stills/. The site grades them to a green
// duotone in CSS (.still-grade), so these are composed for luminance only:
// deep blacks, one lit subject, soft falloff, grain.
// Usage: node scripts/generate-stills.mjs
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const outDir = resolve(dirname(fileURLToPath(import.meta.url)), '../public/stills');
const W = 1600;
const H = 900;

let seed = 7;
const rand = () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296;

const grain = `
  <filter id="grain" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="3" stitchTiles="stitch"/>
    <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.09 0"/>
  </filter>`;

const vignette = `
  <radialGradient id="vig" cx="50%" cy="48%" r="75%">
    <stop offset="0.55" stop-color="#000" stop-opacity="0"/>
    <stop offset="1" stop-color="#000" stop-opacity="0.85"/>
  </radialGradient>`;

/**
 * CPLT: a night-shift wall of squads. A perspective field of 32 columns, one
 * per squad, each rising through twelve months of effort saved; the lit
 * front rows glow and the far rows sink into fog.
 */
function copilot() {
  const horizon = 330;
  const cols = 32;
  const months = 12;
  let bars = '';
  for (let m = months - 1; m >= 0; m--) {
    const depth = m / (months - 1); // 0 near, 1 far
    const scale = 1 - depth * 0.78;
    const rowY = horizon + (H - horizon) * Math.pow(1 - depth, 1.6) * 0.92;
    const rowW = W * (0.35 + 1.25 * scale);
    const x0 = (W - rowW) / 2;
    const cell = rowW / cols;
    for (let c = 0; c < cols; c++) {
      const trend = 0.25 + (1 - depth) * 0.75;
      const h = (40 + rand() * 120) * trend * scale * 1.9;
      const x = x0 + c * cell + cell * 0.18;
      const w = cell * 0.64;
      const centerBoost = 1 - Math.abs(c - cols / 2) / (cols / 2);
      const lum = (0.1 + (1 - depth) * 0.75 * (0.45 + 0.55 * centerBoost)).toFixed(3);
      bars += `<rect x="${x.toFixed(1)}" y="${(rowY - h).toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" fill="url(#barFill)" fill-opacity="${lum}"/>`;
      bars += `<rect x="${x.toFixed(1)}" y="${(rowY - h).toFixed(1)}" width="${w.toFixed(1)}" height="${Math.max(1.5, 3 * scale).toFixed(1)}" fill="#ffffff" fill-opacity="${Math.min(1, +lum * 1.3).toFixed(3)}"/>`;
    }
  }

  let floor = '';
  for (let i = -20; i <= 20; i++) {
    floor += `<line x1="${W / 2 + i * 14}" y1="${horizon}" x2="${W / 2 + i * 170}" y2="${H}" stroke="#ffffff" stroke-opacity="0.05"/>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs>
      ${grain}${vignette}
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#050505"/><stop offset="0.36" stop-color="#1d1d1d"/><stop offset="1" stop-color="#030303"/>
      </linearGradient>
      <linearGradient id="barFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#ffffff" stop-opacity="0.15"/>
      </linearGradient>
      <radialGradient id="haze" cx="50%" cy="37%" r="45%">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
      </radialGradient>
      <filter id="soft"><feGaussianBlur stdDeviation="0.6"/></filter>
      <filter id="bloom"><feGaussianBlur stdDeviation="18"/></filter>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#sky)"/>
    <rect width="${W}" height="${H}" fill="url(#haze)"/>
    <g>${floor}</g>
    <g filter="url(#bloom)" opacity="0.55">${bars}</g>
    <g filter="url(#soft)">${bars}</g>
    <rect width="${W}" height="${H}" fill="url(#vig)"/>
    <rect width="${W}" height="${H}" filter="url(#grain)"/>
  </svg>`;
}

/**
 * EoQ: the quarter's top position. An empty stage, one hard spotlight cone
 * landing on a single tall plinth among shorter ones, dust in the beam.
 */
function eoq() {
  const cx = 800;
  const floorY = 700;
  let plinths = '';
  const layout = [
    [-520, 70], [-400, 96], [-285, 58], [-170, 120], [0, 300], [170, 104], [285, 66], [400, 88], [520, 52],
  ];
  for (const [dx, h] of layout) {
    const hero = dx === 0;
    const w = hero ? 92 : 70;
    const x = cx + dx - w / 2;
    const lum = hero ? 1 : Math.max(0.12, 0.5 - Math.abs(dx) / 1400);
    plinths += `<rect x="${x}" y="${floorY - h}" width="${w}" height="${h}" fill="url(#plinth)" fill-opacity="${lum}"/>`;
    plinths += `<rect x="${x}" y="${floorY - h}" width="${w}" height="4" fill="#ffffff" fill-opacity="${hero ? 1 : lum * 0.8}"/>`;
  }

  let dust = '';
  for (let i = 0; i < 140; i++) {
    const t = rand();
    const y = 40 + t * (floorY - 60);
    const spread = 40 + t * 230;
    const x = cx + (rand() - 0.5) * 2 * spread;
    dust += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(0.8 + rand() * 1.8).toFixed(2)}" fill="#ffffff" fill-opacity="${(0.15 + rand() * 0.5).toFixed(2)}"/>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs>
      ${grain}${vignette}
      <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.55"/><stop offset="1" stop-color="#ffffff" stop-opacity="0.12"/>
      </linearGradient>
      <radialGradient id="pool" cx="50%" cy="50%" r="50%">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.75"/><stop offset="0.6" stop-color="#ffffff" stop-opacity="0.18"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="plinth" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#e6e6e6"/><stop offset="1" stop-color="#2a2a2a"/>
      </linearGradient>
      <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#161616"/><stop offset="1" stop-color="#020202"/>
      </linearGradient>
      <filter id="blur"><feGaussianBlur stdDeviation="22"/></filter>
      <filter id="blurSmall"><feGaussianBlur stdDeviation="2"/></filter>
    </defs>
    <rect width="${W}" height="${H}" fill="#040404"/>
    <rect y="${floorY}" width="${W}" height="${H - floorY}" fill="url(#floor)"/>
    <polygon points="${cx - 26},0 ${cx + 26},0 ${cx + 280},${floorY + 40} ${cx - 280},${floorY + 40}" fill="url(#beam)" filter="url(#blur)"/>
    <polygon points="${cx - 12},0 ${cx + 12},0 ${cx + 170},${floorY} ${cx - 170},${floorY}" fill="#ffffff" fill-opacity="0.08" filter="url(#blurSmall)"/>
    <ellipse cx="${cx}" cy="${floorY + 18}" rx="330" ry="46" fill="url(#pool)"/>
    <g>${plinths}</g>
    <ellipse cx="${cx}" cy="${floorY + 4}" rx="70" ry="9" fill="#000000" fill-opacity="0.55" filter="url(#blurSmall)"/>
    <g>${dust}</g>
    <rect width="${W}" height="${H}" fill="url(#vig)"/>
    <rect width="${W}" height="${H}" filter="url(#grain)"/>
  </svg>`;
}

await mkdir(outDir, { recursive: true });
for (const [name, svg] of [['copilot', copilot()], ['eoq', eoq()]]) {
  const file = `${outDir}/${name}.jpg`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 84, mozjpeg: true }).toFile(file);
  console.log(`[stills] wrote ${file}`);
}
