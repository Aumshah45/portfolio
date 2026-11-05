import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { editions } from '../../data/editions';
import { siteConfig } from '../../data/siteConfig';
import { daySheetStatus } from '../../data/daysheet';
import { useTilt } from '../../hooks/useTilt';
import { Cover } from './Cover';
import { Shelf } from './Shelf';

const d = (n: number) => ({ '--d': n }) as CSSProperties;

/**
 * The first screen: who I am and the pun on my name, the edition on display
 * with its notes, and the shelf to pull another. Swapping editions is a short
 * blurred crossfade, out fast and in a little slower.
 */
export function Stage({ selected, onSelect }: { selected: number; onSelect: (i: number) => void }) {
  const [target, setTarget] = useState(selected);
  const [shown, setShown] = useState(selected);
  const [phase, setPhase] = useState<'idle' | 'out' | 'in'>('idle');
  const slot = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);
  useTilt(slot, tilt);

  // A new pick starts the swap during render; the effect below finishes it.
  if (selected !== target) {
    setTarget(selected);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(selected);
      setPhase('idle');
    } else {
      setPhase('out');
    }
  }

  useEffect(() => {
    if (phase !== 'out') return;
    const t = window.setTimeout(() => {
      setShown(target);
      setPhase('in');
    }, 140);
    return () => window.clearTimeout(t);
  }, [phase, target]);

  const e = editions[shown];
  const swap = phase === 'out' ? ' is-out' : phase === 'in' ? ' is-in' : '';

  return (
    <section id="top" className="stage-section" aria-labelledby="title">
      <div className="wrap stage">
        <div className="intro">
          <p className="intro__kicker enter" style={d(0)}>
            Full-stack and AI engineer, Bengaluru
          </p>
          <h1 id="title" className="enter" style={d(1)}>
            AUM, <em>as in Asset Under Management.</em>
          </h1>
          <p className="intro__lead enter" style={d(2)}>
            Yes, my name is a finance acronym. The day job is less ironic: <b>I build production AI and full-stack systems at Sun Life</b>, and report what they return in numbers.
          </p>
          <div className="actions enter" style={d(3)}>
            <a className="btn btn--ink" href="#work">
              See the work
            </a>
            <a className="btn" href={siteConfig.resumeUrl} download>
              Download résumé
            </a>
          </div>
          <p className="status enter" style={d(4)}>
            {daySheetStatus.charAt(0).toUpperCase() + daySheetStatus.slice(1)}
          </p>
        </div>

        <div className="cover-slot enter" style={d(2)} ref={slot}>
          <div className="cover-tilt" ref={tilt}>
            <div className={`cover-swap${swap}`} onAnimationEnd={() => phase === 'in' && setPhase('idle')}>
              <Cover edition={e} />
            </div>
          </div>
        </div>

        <aside className="edition enter" style={d(4)} aria-live="polite">
          <div className={`edition__swap${swap}`}>
          <p className="edition__no">
            No. {e.no}, {e.year}
          </p>
          <h2>{e.title}</h2>
          <p className="edition__line">{e.line}</p>
          <dl className="specs">
            {e.specs.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          {e.slug ? (
            <Link className="edition__open" to={`/projects/${e.slug}`}>
              Open the edition
            </Link>
          ) : (
            <p className="edition__sealed">Private screening. No edition notes.</p>
          )}
          </div>
        </aside>
      </div>

      <div className="wrap">
        <Shelf selected={selected} onSelect={onSelect} label="Six projects, numbered in the order they were made." hint="Click a spine, or use the arrow keys." />
      </div>
    </section>
  );
}
