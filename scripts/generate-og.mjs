// Renders the link-preview image and the home-screen icon with a local Chrome:
//   scripts/og/og.html  → public/og-image.png        (1200×630)
//   public/favicon.svg  → public/apple-touch-icon.png (180×180)
// Run by hand after changing either source: npm run og
// Needs Google Chrome installed, or CHROME_PATH pointing at a Chrome or Chromium binary.
import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import puppeteer from 'puppeteer-core';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const chrome = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
].find((p) => p && existsSync(p));

if (!chrome) {
  console.error('[og] no Chrome found; set CHROME_PATH');
  process.exit(1);
}

const browser = await puppeteer.launch({ executablePath: chrome, headless: true });
try {
  const page = await browser.newPage();

  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(resolve(root, 'scripts/og/og.html')).href, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: resolve(root, 'public/og-image.png'), type: 'png' });
  console.log('[og] wrote public/og-image.png');

  await page.setViewport({ width: 180, height: 180, deviceScaleFactor: 1 });
  await page.setContent(
    `<style>html,body{margin:0;background:#f5b33b}img{display:block;width:180px;height:180px}</style><img src="${pathToFileURL(resolve(root, 'public/favicon.svg')).href}">`,
    { waitUntil: 'load' },
  );
  await page.screenshot({ path: resolve(root, 'public/apple-touch-icon.png'), type: 'png' });
  console.log('[og] wrote public/apple-touch-icon.png');
} finally {
  await browser.close();
}
