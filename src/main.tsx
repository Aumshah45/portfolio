import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

console.log(
  '%c Hey there! 👋 %c\nBuilt by Aum Shah with React + TypeScript.\nCurious about the code? Check out the source.\nPress Ctrl+K to navigate.',
  'font-size: 16px; font-weight: bold; color: #6366f1;',
  'font-size: 12px; color: #a1a1aa;'
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
