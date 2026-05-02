import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// Defer Google Fonts via JS — keeps CSS off the critical render path
// without needing inline event handlers (which would force CSP 'unsafe-inline')
function loadFonts() {
  const href =
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Fraunces:opsz,wght,SOFT@9..144,400..900,0..100&family=JetBrains+Mono:wght@400;500;600&display=swap';
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
