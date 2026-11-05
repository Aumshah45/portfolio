import { useCallback, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import { ColdOpen } from './ColdOpen';
import { ColdOpenContext } from './coldOpenContext';
import { projects } from '../../data/projects';

function sceneFor(pathname: string): string {
  if (pathname === '/') return 'Market open';
  const slug = pathname.match(/^\/projects\/([^/]+)/)?.[1];
  const project = slug ? projects.find((p) => p.slug === slug) : undefined;
  if (project) return project.title;
  return 'Missing reel';
}

/**
 * Slates every page load and every route change; hash links within a page
 * don't count. The first take of a visit plays in full, later takes are quick.
 */
export function ColdOpenProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const reduceMotion = useReducedMotion();
  const [slated, setSlated] = useState({ pathname: '', takes: 0 });

  const playing = !reduceMotion && slated.pathname !== pathname;
  const take = slated.takes + 1;

  const finish = useCallback(() => setSlated((s) => ({ pathname, takes: s.takes + 1 })), [pathname]);
  const value = useMemo(() => ({ opened: !playing }), [playing]);

  return (
    <ColdOpenContext.Provider value={value}>
      {playing && <ColdOpen key={pathname} scene={sceneFor(pathname)} take={take} quick={take > 1} onDone={finish} />}
      {children}
    </ColdOpenContext.Provider>
  );
}
