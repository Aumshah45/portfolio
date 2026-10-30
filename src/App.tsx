import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Playhead } from './components/layout/Playhead';
import { TickerTape } from './components/cinema/TickerTape';
import { Scanlines } from './components/cinema/Scanlines';
import { ColdOpenProvider } from './components/cinema/ColdOpenProvider';
import { CommandPalette } from './components/command-palette/CommandPalette';
import { ContactModal } from './components/contact/ContactModal';
import { useCommandPalette } from './hooks/useCommandPalette';
import { useConsoleGreeting } from './hooks/useConsoleGreeting';
import { HomePage } from './pages/HomePage';

// Code-split heavier routes — only loaded when visited
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage').then((m) => ({ default: m.CaseStudyPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <span className="animate-pulse font-mono text-[11px] uppercase tracking-[0.22em] text-acc-dim">loading reel…</span>
    </div>
  );
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    // Hash arrivals are scrolled to their scene by the page itself.
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <Suspense fallback={<RouteFallback />}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects/:slug" element={<CaseStudyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const { isOpen, open, close } = useCommandPalette();
  const [contactOpen, setContactOpen] = useState(false);
  const openContact = useCallback(() => setContactOpen(true), []);
  const closeContact = useCallback(() => setContactOpen(false), []);
  useConsoleGreeting();

  useEffect(() => {
    const handler = () => setContactOpen(true);
    document.addEventListener('open-contact', handler);
    return () => document.removeEventListener('open-contact', handler);
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <a
        href="#main"
        className="sr-only no-underline focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[200] focus:rounded-panel focus:bg-acc focus:px-4 focus:py-2 focus:font-mono focus:text-[12px] focus:uppercase focus:tracking-[0.18em] focus:text-acc-contrast"
      >
        Skip to content
      </a>
      <ColdOpenProvider>
        <Scanlines />
        <Navbar onCommandPalette={open} onContact={openContact} />
        <TickerTape />
        <main id="main">
          <AnimatedRoutes />
        </main>
        <Footer />
        <Playhead />
        <CommandPalette isOpen={isOpen} onClose={close} />
        <ContactModal isOpen={contactOpen} onClose={closeContact} />
      </ColdOpenProvider>
    </BrowserRouter>
  );
}
