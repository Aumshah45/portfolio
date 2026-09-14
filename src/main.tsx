import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { resolveInitialTheme } from './hooks/useTheme';

// Set the showing before first paint. CSP forbids inline scripts, so this
// runs here, synchronously, ahead of the React render.
document.documentElement.setAttribute('data-theme', resolveInitialTheme());

// Defer Google Fonts via JS — keeps CSS off the critical render path
// without needing inline event handlers (which would force CSP 'unsafe-inline')
function loadFonts() {
  const href =
    'https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62.5..125,300..900&family=IBM+Plex+Mono:ital,wght@0,400;0,500;1,400&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap';
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
