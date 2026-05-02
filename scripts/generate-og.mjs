// Renders public/og-image.svg → public/og-image.png at 1200×630.
// Run via `npm run build` (wired as prebuild) or directly: node scripts/generate-og.mjs
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const src = resolve(root, 'public/og-image.svg');
const out = resolve(root, 'public/og-image.png');

if (!existsSync(src)) {
  console.error('[og] missing public/og-image.svg — skipping PNG generation');
  process.exit(0);
}

const svg = readFileSync(src);

try {
  const png = await sharp(svg, { density: 200 })
    .resize(1200, 630, { fit: 'cover' })
    .png({ quality: 95, compressionLevel: 9 })
    .toBuffer();
  writeFileSync(out, png);
  console.log(`[og] wrote ${out} (${(png.length / 1024).toFixed(1)} KB)`);
} catch (err) {
  console.error('[og] generation failed:', err);
  process.exit(1);
}
