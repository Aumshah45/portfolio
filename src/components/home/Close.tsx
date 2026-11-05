import type { CSSProperties } from 'react';
import { siteConfig } from '../../data/siteConfig';

const openContact = () => document.dispatchEvent(new CustomEvent('open-contact'));

/** The close: the next edition is the visitor's. */
export function Close() {
  return (
    <section id="contact" className="close" aria-labelledby="contact-title">
      <div className="wrap close__in">
        <h2 id="contact-title" data-reveal>
          Edition 007 <em>could be yours.</em>
        </h2>
        <div data-reveal style={{ '--d': 1 } as CSSProperties}>
          <p>Tell me what your team is building and what you’d want me to own in the first six months. I reply within a day.</p>
          <div className="actions">
            <button type="button" className="btn btn--ink" onClick={openContact}>
              Write to me
            </button>
            <a className="btn" href={siteConfig.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a className="btn" href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
