import type { CSSProperties } from 'react';
import { appreciationClips, featureClip } from '../../data/reel';

/**
 * The press line, the way a poster carries it: two colleagues' words, quoted
 * exactly, either side of the award. Each excerpt is a verbatim run from the
 * original post; the full posts live on the Copilot edition page.
 */
const quotes = [
  { id: 'difference-makers', excerpt: 'lightning-fast delivery and unwavering dedication', variant: 'agents' },
  { id: 'faster-together', excerpt: 'exceptional initiative and technical prowess', variant: 'pages' },
];

export function Press() {
  const pulled = quotes
    .map((q) => ({ ...q, clip: appreciationClips.find((c) => c.id === q.id) }))
    .filter((q) => q.clip?.quote?.toLowerCase().includes(q.excerpt));

  return (
    <section className="press" aria-label="What colleagues said">
      <div className="wrap press__in">
        {pulled[0] && (
          <figure className="press__quote" data-reveal style={{ '--q': `var(--c-${pulled[0].variant})` } as CSSProperties}>
            <blockquote>“…{pulled[0].excerpt}…”</blockquote>
            <figcaption>
              {pulled[0].clip!.from}, {pulled[0].clip!.headline}
            </figcaption>
          </figure>
        )}
        <div className="press__award" data-reveal style={{ '--d': 1 } as CSSProperties}>
          <span className="press__rule" aria-hidden="true" />
          <p className="press__kind">{featureClip.role}</p>
          <p className="press__title">{featureClip.headline}</p>
          <p className="press__when">
            {featureClip.timecode.replace(' · ', ' ')}, {featureClip.from}
          </p>
          <span className="press__rule" aria-hidden="true" />
        </div>
        {pulled[1] && (
          <figure className="press__quote" data-reveal style={{ '--d': 2, '--q': `var(--c-${pulled[1].variant})` } as CSSProperties}>
            <blockquote>“…{pulled[1].excerpt}…”</blockquote>
            <figcaption>
              {pulled[1].clip!.from}, {pulled[1].clip!.headline}
            </figcaption>
          </figure>
        )}
      </div>
    </section>
  );
}
