import type { CSSProperties } from 'react';
import { featureClip } from '../../data/reel';
import { career, toolkit } from '../../data/toolkit';

/** About, as a short signed letter beside the career and recognition, then the colophon: what the work is built with. */
export function LinerNotes() {
  return (
    <section id="about" className="part" aria-labelledby="about-title">
      <div className="wrap notes">
        <div className="notes__side">
          <h2 id="about-title" data-reveal>
            Liner notes
          </h2>
          <ol className="career" aria-label="Career" data-reveal style={{ '--d': 1 } as CSSProperties}>
            {career.map((c) => (
              <li key={c.title}>
                <span className="career__dates">{c.dates}</span>
                <b>{c.title}</b>
                <span>
                  {c.org}
                  {c.note && `. ${c.note}.`}
                </span>
              </li>
            ))}
          </ol>
          <figure className="award" data-reveal style={{ '--d': 1 } as CSSProperties}>
            <b>
              {featureClip.headline}, {featureClip.timecode.replace(' · ', ' ')}
            </b>
            <blockquote>{featureClip.quote}</blockquote>
            <figcaption>
              {featureClip.role}, {featureClip.from}
            </figcaption>
            <a className="link" href={featureClip.documentUrl} target="_blank" rel="noopener noreferrer">
              View the certificate (PDF)
            </a>
          </figure>
          <dl className="specs creds" data-reveal style={{ '--d': 2 } as CSSProperties}>
            <div>
              <dt>Education</dt>
              <dd>B.Tech, Computer Science and Engineering, SRM Institute of Science and Technology, 2024. CGPA 9.08/10</dd>
            </div>
            <div>
              <dt>Research</dt>
              <dd>
                <a className="link" href="https://doi.org/10.1109/ICCCNT61001.2024.10724766" target="_blank" rel="noopener noreferrer">
                  Botnet Attack Detection Using Deep Learning in IoT Networks
                </a>
                , first author, 15th ICCCNT 2024 (IEEE)
              </dd>
            </div>
            <div>
              <dt>Certified</dt>
              <dd>Machine Learning (Stanford, Coursera); AWS Cloud Operations; Google Cloud Platform</dd>
            </div>
          </dl>
        </div>
        <div className="notes__body" data-reveal>
          <p>
            Most of my work happens at the messy intersection of full-stack engineering and applied AI: data pipelines, internal tools, agentic systems. I joined Sun Life Global
            Solutions as a graduate engineer trainee in 2024 and was promoted to Associate Analyst Development a year later.
          </p>
          <p>
            The first edition was a metrics platform I built alone in six weeks; it became the standard tool for more than thirty engineering squads. The biggest so far is absence
            claims, where three agents now work in sequence in production, and I mentored four trainees through the build.
          </p>
          <p>
            Outside the day job I ship in the open: Numera, an FX and hedging API for software agents, and AgentWatch, which checks whether the tools those agents rely on still answer
            correctly.
          </p>
          <p>I won’t pitch AI where a well-designed form would do. Every number on this page can be checked, and I’m happy to go line by line on any of it.</p>
          <div className="sign">
            <b>Aum Shah</b>
            <span>Bengaluru</span>
          </div>
        </div>
      </div>

      <div className="wrap colophon" data-reveal>
        <div className="colophon__head">
          <h3>Colophon</h3>
          <p>Set in Newsreader and Inter Tight. The toolkit behind the work, from the day job to the open-source builds.</p>
        </div>
        <dl className="colophon__list">
          {toolkit.map((t) => (
            <div key={t.group}>
              <dt>{t.group}</dt>
              <dd>{t.items.join(', ')}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
