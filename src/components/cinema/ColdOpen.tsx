import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  scene: string;
  take: number;
  /** Route-change takes run shorter than the first take of a visit. */
  quick: boolean;
  onDone: () => void;
}

const timing = {
  full: { clapAt: 0.9, fadeAt: 1.9, fadeFor: 0.6, doneAt: 2600 },
  quick: { clapAt: 0.35, fadeAt: 0.95, fadeFor: 0.45, doneAt: 1450 },
};

/**
 * Clapperboard slate on every page load and route change. Portalled to <body>
 * because the route wrapper animates transform, which would otherwise pin this
 * fixed overlay to the page instead of the viewport.
 */
export function ColdOpen({ scene, take, quick, onDone }: Props) {
  const finishRef = useRef<() => void>(() => {});
  const t = quick ? timing.quick : timing.full;

  useEffect(() => {
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      onDone();
    };
    finishRef.current = finish;
    const timer = window.setTimeout(finish, t.doneAt);
    window.addEventListener('keydown', finish);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', finish);
    };
  }, [onDone, t.doneAt]);

  const rows = [
    ['Production', 'Aum Shah, portfolio'],
    ['Scene', scene],
    ['Take', String(take)],
  ];

  return createPortal(
    <div
      aria-hidden="true"
      onClick={() => finishRef.current()}
      className="slate-overlay"
      style={{ '--clap-at': `${t.clapAt}s`, '--fade-at': `${t.fadeAt}s`, '--fade-for': `${t.fadeFor}s` } as CSSProperties}
    >
      <div className="slate">
        <div className="slate__arm" />
        <div className="slate__body">
          {rows.map(([label, value]) => (
            <div key={label} className="slate__row">
              <span>{label}</span>
              <b>{value}</b>
            </div>
          ))}
        </div>
      </div>
      <p className="slate__skip">Click anywhere, or press any key, to skip</p>
    </div>,
    document.body,
  );
}
