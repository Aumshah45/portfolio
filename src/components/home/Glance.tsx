import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { editions, highlights } from '../../data/editions';

const d = (n: number) => ({ '--d': n }) as CSSProperties;

/** Counts once to its real value when it first comes into view. */
function Count({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const step = (t: number) => {
          const p = Math.min(1, (t - start) / 1000);
          el.textContent = String(Math.round(to * (1 - Math.pow(1 - p, 4))));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);
  return <span ref={ref}>{to}</span>;
}

/** The professional signal in one screen: four figures, then every edition in one table. */
export function Glance({ onPick }: { onPick: (i: number) => void }) {
  const pick = (i: number) => {
    onPick(i);
    document.getElementById('top')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  return (
    <section id="work" className="part" aria-labelledby="work-title">
      <div className="wrap">
        <div className="part__head">
          <h2 id="work-title" data-reveal>
            At a glance
          </h2>
          <p data-reveal style={d(1)}>
            Every figure here is measured or counted, never projected. Choose a row to pull that edition from the shelf.
          </p>
        </div>

        <dl className="highlights" aria-label="Highlights">
          {highlights.map((h, i) => (
            <div key={h.label} data-reveal style={d(i)}>
              <dt>{h.label}</dt>
              <dd className="num">
                {h.count !== null && <Count to={h.count} />}
                {h.after}
                {h.small && <small>{h.small}</small>}
              </dd>
            </div>
          ))}
        </dl>

        <table className="index" data-reveal>
          <caption className="visually-hidden">Every edition in the collection</caption>
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Edition</th>
              <th scope="col" className="index__what">
                What it is
              </th>
              <th scope="col">Key figure</th>
              <th scope="col" className="index__since">
                Since
              </th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {editions.map((e, i) => (
              <tr
                key={e.no}
                tabIndex={0}
                onClick={() => pick(i)}
                onKeyDown={(ev) => {
                  if (ev.key === 'Enter' || ev.key === ' ') {
                    ev.preventDefault();
                    pick(i);
                  }
                }}
                aria-label={`Pull No. ${e.no}, ${e.title}, from the shelf`}
              >
                <td className="index__no num">{e.no}</td>
                <th scope="row">
                  <span className={`index__swatch spine--${e.variant}`} aria-hidden="true" />
                  {e.title}
                </th>
                <td className="index__what">{e.what}</td>
                <td className="index__kpi num">
                  {e.kpi.value}
                  <small>{e.kpi.unit}</small>
                </td>
                <td className="index__since num">{e.since}</td>
                <td>
                  <span className={`pill${e.status.live ? ' pill--live' : ''}`}>{e.status.label}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
