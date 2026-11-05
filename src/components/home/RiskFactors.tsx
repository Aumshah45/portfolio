import type { CSSProperties } from 'react';

const risks = [
  {
    title: 'Concentration risk',
    body: 'Two years, one employer. The work spans AI agents, analytics, serverless backends and open source, but the badge on the door hasn’t changed.',
    mitigation: 'Two public projects, live and inspectable.',
  },
  {
    title: 'Key-person risk',
    body: 'Several of these systems were built by one engineer. Good for ownership, less so if you want to see collaboration at scale.',
    mitigation: 'Four trainees mentored through a production build.',
  },
  {
    title: 'Overstatement risk',
    body: 'AI is easy to claim. Every figure on this page is measured or counted, and nothing is projected.',
    mitigation: 'Ask to go line by line.',
  },
  {
    title: 'Location risk',
    body: 'Based in Bengaluru. Open to relocating within India, or to remote work.',
    mitigation: 'Remote roles welcome.',
  },
];

/** The honest version, before anyone has to ask; the name made disclosure feel right. */
export function RiskFactors() {
  return (
    <section id="risks" className="part" aria-labelledby="risks-title">
      <div className="wrap">
        <div className="part__head">
          <h2 id="risks-title" data-reveal>
            Risk factors
          </h2>
          <p data-reveal style={{ '--d': 1 } as CSSProperties}>
            The honest version, before you have to ask. With a name like mine, disclosure felt right.
          </p>
        </div>
        <div className="risks">
          {risks.map((r, i) => (
            <article key={r.title} data-reveal style={{ '--d': i } as CSSProperties}>
              <h3>{r.title}</h3>
              <p>{r.body}</p>
              <p className="risks__m">Mitigation: {r.mitigation.charAt(0).toLowerCase() + r.mitigation.slice(1)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
