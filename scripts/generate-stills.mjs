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

/**
 * Claims agents: a relay of three lit agent blocks on one beam. Crumpled
 * claim documents drift in on the left, a single approved sheet leaves right.
 */
function claims() {
  const cy = 450;
  const agents = [520, 800, 1080];
  let docsIn = '';
  for (let i = 0; i < 16; i++) {
    const x = 40 + rand() * 260;
    const y = cy - 190 + rand() * 380;
    const r = (rand() - 0.5) * 40;
    docsIn += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="52" height="68" rx="3" transform="rotate(${r.toFixed(1)} ${(x + 26).toFixed(1)} ${(y + 34).toFixed(1)})" fill="#ffffff" fill-opacity="${(0.05 + rand() * 0.16).toFixed(2)}"/>`;
  }
  let sparks = '';
  for (let i = 0; i < 60; i++) {
    const x = 330 + rand() * 1000;
    sparks += `<circle cx="${x.toFixed(1)}" cy="${(cy + (rand() - 0.5) * 10).toFixed(1)}" r="${(0.8 + rand() * 2.2).toFixed(2)}" fill="#ffffff" fill-opacity="${(0.25 + rand() * 0.65).toFixed(2)}"/>`;
  }
  const blocks = agents
    .map(
      (x, i) => `
      <rect x="${x - 92}" y="${cy - 92}" width="184" height="184" rx="20" fill="#ffffff" fill-opacity="0.28" filter="url(#bloom)"/>
      <rect x="${x - 92}" y="${cy - 92}" width="184" height="184" rx="20" fill="url(#agentFill)" stroke="#ffffff" stroke-opacity="0.9" stroke-width="3"/>
      <circle cx="${x}" cy="${cy}" r="${24 + i * 6}" fill="none" stroke="#ffffff" stroke-opacity="0.85" stroke-width="4"/>
      <circle cx="${x}" cy="${cy}" r="6" fill="#ffffff"/>`,
    )
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs>
      ${grain}${vignette}
      <radialGradient id="haze" cx="50%" cy="50%" r="55%">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.12"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="agentFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#5a5a5a"/><stop offset="1" stop-color="#1b1b1b"/>
      </linearGradient>
      <linearGradient id="beam" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0"/><stop offset="0.25" stop-color="#ffffff" stop-opacity="0.9"/>
        <stop offset="0.8" stop-color="#ffffff" stop-opacity="0.9"/><stop offset="1" stop-color="#ffffff" stop-opacity="0.2"/>
      </linearGradient>
      <filter id="bloom" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="28"/></filter>
      <filter id="lineGlow" x="-10%" y="-400%" width="120%" height="900%"><feGaussianBlur stdDeviation="9"/></filter>
    </defs>
    <rect width="${W}" height="${H}" fill="#040404"/>
    <rect width="${W}" height="${H}" fill="url(#haze)"/>
    <g>${docsIn}</g>
    <rect x="300" y="${cy - 8}" width="1080" height="16" fill="url(#beam)" filter="url(#lineGlow)"/>
    <rect x="300" y="${cy - 2}" width="1080" height="4" fill="url(#beam)"/>
    <g>${sparks}</g>
    <g>${blocks}</g>
    <g transform="translate(1340 ${cy - 52})">
      <rect width="80" height="104" rx="5" fill="#ffffff" fill-opacity="0.3" filter="url(#bloom)"/>
      <rect width="80" height="104" rx="5" fill="#f2f2f2"/>
      <polyline points="20,54 36,70 62,36" fill="none" stroke="#111111" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <rect width="${W}" height="${H}" fill="url(#vig)"/>
    <rect width="${W}" height="${H}" filter="url(#grain)"/>
  </svg>`;
}

/**
 * Numera: a hexagonal lattice fading into the dark, one core hexagon lit,
 * with two beams leaving it: the HTTP and MCP surfaces.
 */
function numera() {
  const cx = 800;
  const cy = 450;
  const hex = (x, y, r) =>
    Array.from({ length: 6 }, (_, k) => {
      const a = (Math.PI / 180) * (60 * k - 30);
      return `${(x + r * Math.cos(a)).toFixed(1)},${(y + r * Math.sin(a)).toFixed(1)}`;
    }).join(' ');

  const r = 58;
  const colW = Math.sqrt(3) * r;
  const rowH = 1.5 * r;
  let lattice = '';
  for (let row = -1; row < H / rowH + 1; row++) {
    for (let col = -1; col < W / colW + 1; col++) {
      const x = col * colW + (row % 2 ? colW / 2 : 0);
      const y = row * rowH;
      const d = Math.hypot(x - cx, y - cy);
      if (d < 150) continue;
      const op = Math.max(0.03, 0.42 - d / 1500);
      lattice += `<polygon points="${hex(x, y, r - 4)}" fill="none" stroke="#ffffff" stroke-opacity="${op.toFixed(3)}" stroke-width="2"/>`;
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs>
      ${grain}${vignette}
      <linearGradient id="beamL" x1="1" y1="0" x2="0" y2="0">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.85"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="beamR" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.85"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
      </linearGradient>
      <radialGradient id="core" cx="50%" cy="40%" r="70%">
        <stop offset="0" stop-color="#f4f4f4"/><stop offset="1" stop-color="#6a6a6a"/>
      </radialGradient>
      <filter id="bloom" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="34"/></filter>
      <filter id="lineGlow" x="-10%" y="-500%" width="120%" height="1100%"><feGaussianBlur stdDeviation="10"/></filter>
    </defs>
    <rect width="${W}" height="${H}" fill="#040404"/>
    <g>${lattice}</g>
    <rect x="0" y="${cy - 10}" width="${cx - 130}" height="20" fill="url(#beamL)" filter="url(#lineGlow)"/>
    <rect x="0" y="${cy - 2}" width="${cx - 130}" height="4" fill="url(#beamL)"/>
    <rect x="${cx + 130}" y="${cy - 10}" width="${W - cx - 130}" height="20" fill="url(#beamR)" filter="url(#lineGlow)"/>
    <rect x="${cx + 130}" y="${cy - 2}" width="${W - cx - 130}" height="4" fill="url(#beamR)"/>
    <polygon points="${hex(cx, cy, 150)}" fill="#ffffff" fill-opacity="0.35" filter="url(#bloom)"/>
    <polygon points="${hex(cx, cy, 132)}" fill="url(#core)"/>
    <polygon points="${hex(cx, cy, 92)}" fill="none" stroke="#141414" stroke-opacity="0.7" stroke-width="5"/>
    <polygon points="${hex(cx, cy, 50)}" fill="#141414" fill-opacity="0.75"/>
    <rect width="${W}" height="${H}" fill="url(#vig)"/>
    <rect width="${W}" height="${H}" filter="url(#grain)"/>
  </svg>`;
}

/**
 * Document pipeline: scattered raw sheets on the left pass through a gate
 * of light and leave as an ordered, bright stack on the right.
 */
function docs() {
  const gateX = 780;
  let raw = '';
  for (let i = 0; i < 22; i++) {
    const w = 90;
    const h = 118;
    const x = 80 + rand() * 520;
    const y = 180 + rand() * 520;
    const rot = (rand() - 0.5) * 70;
    raw += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w}" height="${h}" rx="3" transform="rotate(${rot.toFixed(1)} ${(x + w / 2).toFixed(1)} ${(y + h / 2).toFixed(1)})" fill="#ffffff" fill-opacity="${(0.05 + rand() * 0.15).toFixed(2)}" stroke="#ffffff" stroke-opacity="0.12"/>`;
  }
  let stack = '';
  for (let i = 0; i < 9; i++) {
    const x = 980 + i * 42;
    const y = 318 - i * 7;
    const op = (0.12 + i * 0.09).toFixed(2);
    stack += `<rect x="${x}" y="${y}" width="170" height="226" rx="4" fill="#ffffff" fill-opacity="${op}" stroke="#ffffff" stroke-opacity="0.5"/>`;
  }
  const top = { x: 980 + 8 * 42, y: 318 - 8 * 7 };
  let lines = '';
  for (let l = 0; l < 7; l++) {
    const lw = l === 0 ? 90 : 110 - ((l * 17) % 40);
    lines += `<rect x="${top.x + 24}" y="${top.y + 34 + l * 24}" width="${lw}" height="${l === 0 ? 12 : 7}" rx="3" fill="#1a1a1a" fill-opacity="0.75"/>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs>
      ${grain}${vignette}
      <linearGradient id="gate" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0"/><stop offset="0.5" stop-color="#ffffff" stop-opacity="1"/>
        <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
      </linearGradient>
      <radialGradient id="haze" cx="${(gateX / W) * 100}%" cy="50%" r="45%">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.16"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
      </radialGradient>
      <filter id="bloom" x="-400%" y="-10%" width="900%" height="120%"><feGaussianBlur stdDeviation="26"/></filter>
    </defs>
    <rect width="${W}" height="${H}" fill="#040404"/>
    <rect width="${W}" height="${H}" fill="url(#haze)"/>
    <g>${raw}</g>
    <rect x="${gateX - 30}" y="60" width="60" height="780" fill="url(#gate)" opacity="0.8" filter="url(#bloom)"/>
    <rect x="${gateX - 3}" y="90" width="6" height="720" fill="url(#gate)"/>
    <g>${stack}</g>
    <g>${lines}</g>
    <rect width="${W}" height="${H}" fill="url(#vig)"/>
    <rect width="${W}" height="${H}" filter="url(#grain)"/>
  </svg>`;
}

/**
 * AgentWatch: a row of server racks under a heartbeat trace. Every rack
 * answers with a pulse except one, where the trace flatlines and alert rings
 * spread from the failing rack.
 */
function agentwatch() {
  const traceY = 360;
  const baseY = 600;
  const n = 9;
  const gap = 150;
  const x0 = 800 - ((n - 1) * gap) / 2;
  const failing = 6;
  let racks = '';
  let trace = `M 0 ${traceY}`;
  for (let i = 0; i < n; i++) {
    const x = x0 + i * gap;
    const fail = i === failing;
    racks += `<rect x="${x - 46}" y="${baseY - 80}" width="92" height="160" rx="10" fill="url(#rack)" fill-opacity="${fail ? 0.3 : 0.9}" stroke="#ffffff" stroke-opacity="${fail ? 0.35 : 0.7}" stroke-width="2"${fail ? ' stroke-dasharray="9 9"' : ''}/>`;
    for (let s = 0; s < 3; s++) {
      racks += `<rect x="${x - 30}" y="${baseY - 58 + s * 38}" width="60" height="16" rx="3" fill="#000000" fill-opacity="0.5"/>`;
    }
    racks += `<circle cx="${x + 24}" cy="${baseY + 56}" r="6" fill="#ffffff" fill-opacity="${fail ? 0.12 : 1}"/>`;
    racks += `<line x1="${x}" y1="${traceY + 30}" x2="${x}" y2="${baseY - 84}" stroke="#ffffff" stroke-opacity="${fail ? 0.08 : 0.18}" stroke-width="2" stroke-dasharray="4 8"/>`;
    const left = x - gap / 2;
    trace += fail
      ? ` L ${left} ${traceY} L ${x + gap / 2} ${traceY}`
      : ` L ${left} ${traceY} L ${x - 20} ${traceY} L ${x - 9} ${traceY - 110} L ${x + 5} ${traceY + 70} L ${x + 16} ${traceY - 35} L ${x + 26} ${traceY}`;
  }
  trace += ` L ${W} ${traceY}`;

  const fx = x0 + failing * gap;
  const rings = [120, 185, 250]
    .map((r, i) => `<circle cx="${fx}" cy="${baseY}" r="${r}" fill="none" stroke="#ffffff" stroke-opacity="${(0.4 - i * 0.12).toFixed(2)}" stroke-width="3"/>`)
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs>
      ${grain}${vignette}
      <linearGradient id="rack" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#7a7a7a"/><stop offset="1" stop-color="#1c1c1c"/>
      </linearGradient>
      <radialGradient id="haze" cx="50%" cy="40%" r="60%">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.1"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
      </radialGradient>
      <filter id="glow" x="-5%" y="-60%" width="110%" height="220%"><feGaussianBlur stdDeviation="10"/></filter>
      <filter id="ringBlur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3"/></filter>
    </defs>
    <rect width="${W}" height="${H}" fill="#040404"/>
    <rect width="${W}" height="${H}" fill="url(#haze)"/>
    <g filter="url(#ringBlur)">${rings}</g>
    <g>${racks}</g>
    <path d="${trace}" fill="none" stroke="#ffffff" stroke-opacity="0.6" stroke-width="10" filter="url(#glow)"/>
    <path d="${trace}" fill="none" stroke="#ffffff" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"/>
    <rect width="${W}" height="${H}" fill="url(#vig)"/>
    <rect width="${W}" height="${H}" filter="url(#grain)"/>
  </svg>`;
}

await mkdir(outDir, { recursive: true });
for (const [name, svg] of [
  ['copilot', copilot()],
  ['eoq', eoq()],
  ['claims', claims()],
  ['numera', numera()],
  ['agentwatch', agentwatch()],
  ['docs', docs()],
]) {
  const file = `${outDir}/${name}.jpg`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 84, mozjpeg: true }).toFile(file);
  console.log(`[stills] wrote ${file}`);
}
