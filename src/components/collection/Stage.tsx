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

/** How long each edition stays on display while the collection rotates. */
const ROTATE_MS = 6000;

const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * The first screen: who I am and the pun on my name, the edition on display
 * with its notes, and the shelf to pull another. The collection rotates on its
 * own, pausing while the visitor hovers the edition, tabs into it or scrolls away, and
 * stopping once they pick an edition themselves. Swapping editions is a short
 * blurred crossfade, out fast and in a little slower.
 */
export function Stage({ selected, onSelect }: { selected: number; onSelect: (i: number) => void }) {
  const [target, setTarget] = useState(selected);
  const [shown, setShown] = useState(selected);
  const [phase, setPhase] = useState<'idle' | 'out' | 'in'>('idle');
  const [playing, setPlaying] = useState(() => !prefersReducedMotion());
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const [tabVisible, setTabVisible] = useState(() => !document.hidden);
  const [autoTarget, setAutoTarget] = useState(-1);
  const section = useRef<HTMLElement>(null);
  const slot = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);
  useTilt(slot, tilt);

  // A new pick starts the swap during render; the effect below finishes it.
  // A pick the rotation didn't make (a spine, a table row) stops the rotation.
  if (selected !== target) {
    setTarget(selected);
    if (selected !== autoTarget) setPlaying(false);
    if (prefersReducedMotion()) {
      setShown(selected);
      setPhase('idle');
    } else {
      setPhase('out');
    }
  }

  // The fade-out ending swaps the edition in; the timer only covers a fade that never runs.
  const swapIn = () => {
    setShown(target);
    setPhase('in');
  };
  useEffect(() => {
    if (phase !== 'out') return;
    const t = window.setTimeout(swapIn, 400);
    return () => window.clearTimeout(t);
  });

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    const onVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  const running = playing && !hovered && !focused && onScreen && tabVisible;
  const advance = () => {
    const next = (selected + 1) % editions.length;
    setAutoTarget(next);
    onSelect(next);
  };
  // Hovering the edition itself (cover, notes, shelf) holds it; the rest of the screen doesn't.
  const hold = { onPointerEnter: () => setHovered(true), onPointerLeave: () => setHovered(false) };
  const pick = (i: number) => {
    setPlaying(false);
    onSelect(i);
  };

  const e = editions[shown];
  const swap = phase === 'out' ? ' is-out' : phase === 'in' ? ' is-in' : '';

  return (
    <section
      id="top"
      className="stage-section"
      aria-labelledby="title"
      ref={section}
      onFocus={() => setFocused(true)}
      onBlur={(ev) => !ev.currentTarget.contains(ev.relatedTarget) && setFocused(false)}
    >
      <div className="stage__wash" style={{ '--wash': `var(--c-${e.variant})` } as CSSProperties} aria-hidden="true" />
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

        <div className="cover-slot enter" style={d(2)} ref={slot} {...hold}>
          <div className="cover-tilt" ref={tilt}>
            <div
              className={`cover-swap${swap}`}
              onAnimationEnd={(ev) => {
                if (ev.target !== ev.currentTarget) return;
                if (phase === 'out') swapIn();
                else if (phase === 'in') setPhase('idle');
              }}
            >
              <Cover edition={e} />
            </div>
          </div>
        </div>

        <aside className="edition enter" style={d(4)} aria-live={playing ? 'off' : 'polite'} {...hold}>
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
            <Link className="edition__open" to={`/projects/${e.slug}`}>
              Open the edition
            </Link>
          </div>

          <div className="rotate">
            <span className="rotate__track" aria-hidden="true">
              {playing && (
                <span
                  key={selected}
                  className="rotate__fill"
                  style={{ animationDuration: `${ROTATE_MS}ms`, animationPlayState: running ? 'running' : 'paused' }}
                  onAnimationEnd={advance}
                />
              )}
            </span>
            <span className="rotate__count num" aria-hidden="true">
              {e.no} / 00{editions.length}
            </span>
            <button type="button" className="rotate__toggle" aria-pressed={!playing} onClick={() => setPlaying((p) => !p)}>
              {playing ? 'Pause rotation' : 'Play rotation'}
            </button>
          </div>
        </aside>
      </div>

      <div className="wrap" {...hold}>
        <Shelf selected={selected} onSelect={pick} label="Six projects, numbered in the order they were made." hint="Click a spine, or use the arrow keys." />
      </div>
    </section>
  );
}
