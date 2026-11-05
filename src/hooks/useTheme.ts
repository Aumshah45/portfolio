import { useCallback, useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'replay-theme';

/** Stored choice wins; otherwise the light theme, which is the primary one. Not persisted until the visitor picks. */
export function resolveInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    // storage blocked (private mode, sandbox), so fall back to light
  }
  return 'light';
}

function readTheme(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

// The <html> attribute is the single source of truth, so every component
// calling useTheme stays in sync without a context provider.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, readTheme, () => 'light' as Theme);

  const toggle = useCallback(() => {
    const next: Theme = readTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // storage blocked — the switch still applies for this visit
    }
  }, []);

  return { theme, toggle };
}
