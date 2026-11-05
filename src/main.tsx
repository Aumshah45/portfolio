import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { resolveInitialTheme } from './hooks/useTheme';

// Set the showing before first paint. CSP forbids inline scripts, so this
// runs here, synchronously, ahead of the React render.
document.documentElement.setAttribute('data-theme', resolveInitialTheme());
// Reveals and the hero's staging hide content only once this is set, so a page without scripts shows everything.
document.documentElement.classList.add('js');

// Defer Google Fonts via JS — keeps CSS off the critical render path
// without needing inline event handlers (which would force CSP 'unsafe-inline')
function loadFonts() {
  const href =
    'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;1,6..72,300;1,6..72,400&family=Archivo+Black&family=Bodoni+Moda:opsz,wght@6..96,500&display=swap';
  if (document.querySelector(`link[href="${href}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}

if (document.readyState === 'complete') {
  loadFonts();
} else {
  window.addEventListener('load', loadFonts, { once: true });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
