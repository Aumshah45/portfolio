import type { CSSProperties } from 'react';
import { intermission } from '../../data/intermission';

/** Renders *starred* spans as serif italics inside the answer. */
function Annotated({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/).map((part, i) => (part.startsWith('*') && part.endsWith('*') ? <em key={i}>{part.slice(1, -1)}</em> : part))}
    </>
  );
}

/** A director's-commentary timestamp for each answer, a few minutes apart. */
const stamp = (i: number) => {
  const s = 41 + i * 157;
  return `00:${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
};

/** The questions a hiring manager asks on the first call. The first answer is open. */
export function Commentary() {
  return (
    <section id="questions" className="part" aria-labelledby="questions-title">
      <div className="wrap">
        <div className="part__head">
          <h2 id="questions-title" data-reveal>
            Commentary track
          </h2>
          <p data-reveal style={{ '--d': 1 } as CSSProperties}>
            The questions a hiring manager asks on the first call, answered the way I’d answer them.
          </p>
        </div>
        <div className="track" data-reveal>
          {intermission.map((item, i) => (
            <details key={item.q} open={i === 0}>
              <summary>
                <time aria-hidden="true">{stamp(i)}</time>
                <h3>{item.q}</h3>
              </summary>
              <p className="track__a">
                <Annotated text={item.a} />
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
