import { useCallback, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { projects } from '../data/projects';
import { caseMoves, holdings, numeraCore } from '../data/holdings';
import { editionBySlug } from '../data/editions';
import { appreciationClips } from '../data/reel';
import { span } from '../data/format';
import { useTilt } from '../hooks/useTilt';
import { Cover } from '../components/collection/Cover';
import { Shelf } from '../components/collection/Shelf';
import { Movelist } from '../components/ui/Movelist';
import { Tag } from '../components/ui/Tag';
import { RelayDiagram } from '../components/holdings/RelayDiagram';
import { HexCoreDiagram } from '../components/holdings/HexCoreDiagram';
import { BeforeAfterPanel } from '../components/holdings/BeforeAfterPanel';
import { Lightbox } from '../components/reel/Lightbox';
import type { LightboxImage } from '../components/reel/Lightbox';

/** Dashes read as commas on this site. */
const plain = (s: string) => s.replace(/\s*[—–]\s*/g, ', ');

/** Proper nouns that keep their capital when a Title Case string is set in sentence case. */
const proper = new Set(['GitHub', 'Copilot', 'Sun', 'Life', 'AWS']);

/** Sentence case: the first word, acronyms and proper nouns keep their capitals; middle dots become commas. */
const sentence = (s: string) =>
  plain(s)
    .replace(/\s+·\s+/g, ', ')
    .split(' ')
    .map((w, i) => (i === 0 || proper.has(w) || /[A-Z].*[A-Z]/.test(w) ? w : w.toLowerCase()))
    .join(' ');

/** Live captures of the two open-source builds, taken from the running products. */
const screens: Record<string, { src: string; width: number; height: number; alt: string; caption: string }> = {
  numera: {
    src: '/shots/numera-docs.png',
    width: 2000,
    height: 3000,
    alt: 'Numera’s live API docs: fourteen endpoints for exposures, quotes, orders, policies, positions, audit and reports, then the schemas',
    caption: 'The live API docs, captured from the running service.',
  },
  agentwatch: {
    src: '/shots/agentwatch.png',
    width: 1650,
    height: 2132,
    alt: 'The AgentWatch dashboard ranking thirteen public MCP servers by reliability score, uptime and tool-call success',
    caption: 'The reliability dashboard, ranking thirteen public MCP servers.',
  },
};

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);
  const edition = slug ? editionBySlug(slug) : undefined;
  const slot = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<LightboxImage | null>(null);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  useTilt(slot, tilt, 8);

  if (!project || !edition) return <Navigate to="/404" replace />;

  const { caseStudy: cs } = project;
  const holding = holdings.find((h) => h.slug === project.slug);
  const moves = caseMoves[project.slug];
  const screen = screens[project.slug];
  const reviews = project.slug === 'copilot-metrics' ? appreciationClips : [];
  const titleId = `ed-${project.slug}`;
  const isTech = (label: string) => label.toLowerCase().includes('tech');
  const chapters = cs.sections.filter((section) => !isTech(section.label));
  const techParagraphs = cs.sections.find((section) => isTech(section.label))?.paragraphs ?? [];
  const figures = cs.resultMetrics.filter((m) => m.value !== holding?.headline.value);

  return (
    <article aria-labelledby={titleId} className="ed" style={{ '--edc': `var(--c-${edition.variant})` } as CSSProperties}>
      <header className="wrap ed-head">
        <nav aria-label="Breadcrumb">
          <ol className="crumbs">
            <li>
              <Link to="/#top" className="link">
                The collection
              </Link>
            </li>
            <li aria-current="page">No. {edition.no}</li>
          </ol>
        </nav>

        <div className="ed-head__grid">
          <div className="cover-slot cover-slot--edition enter" ref={slot}>
            <div className="cover-tilt" ref={tilt}>
              <Cover edition={edition} />
            </div>
          </div>
          <div className="ed-head__text">
            <p className="edition__no enter" style={{ '--d': 0 } as CSSProperties}>
              No. {edition.no}, {span(cs.meta.timeline)}
            </p>
            <h1 id={titleId} className="enter" style={{ '--d': 1 } as CSSProperties}>
              {project.title}
            </h1>
            <p className="ed-head__lede enter" style={{ '--d': 2 } as CSSProperties}>
              {sentence(cs.heroTitle)}. {plain(cs.heroSubtitle)}
            </p>
            <dl className="specs enter" style={{ '--d': 3 } as CSSProperties}>
              <div>
                <dt>Role</dt>
                <dd>{sentence(cs.meta.role)}</dd>
              </div>
              <div>
                <dt>Company</dt>
                <dd>{cs.meta.company}</dd>
              </div>
              {edition.specs.slice(0, 3).map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <div className="actions enter" style={{ '--d': 4 } as CSSProperties}>
              {project.liveUrl && (
                <a className="btn btn--ink" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  Try the live API
                </a>
              )}
              {project.repoUrl && (
                <a className={`btn${project.liveUrl ? '' : ' btn--ink'}`} href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  View the repository
                </a>
              )}
              <Link className="btn" to="/#top">
                Back to the collection
              </Link>
            </div>
          </div>
        </div>
      </header>

      {holding && (
        <section className="ed-return" aria-label="What it returned">
          <div className="wrap ed-return__grid">
            <div className="ed-return__figure" data-reveal>
              <b className="num">{holding.headline.value}</b>
              <p>{holding.headline.label.charAt(0).toUpperCase() + holding.headline.label.slice(1)}.</p>
            </div>
            {cs.beforeAfter ? (
              <div data-reveal style={{ '--d': 1 } as CSSProperties}>
                <BeforeAfterPanel
                  before={{ value: cs.beforeAfter.before.value, caption: cs.beforeAfter.before.description }}
                  after={{ value: cs.beforeAfter.after.value, caption: cs.beforeAfter.after.description }}
                />
              </div>
            ) : (
              <dl className="ed-return__more" data-reveal style={{ '--d': 1 } as CSSProperties}>
                {figures.map((m) => (
                  <div key={m.label}>
                    <dt>{sentence(m.label)}</dt>
                    <dd className="num">{m.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </section>
      )}

      <div className="wrap ed-body">
        <div className="ed-chapters">
          {chapters.map((section, i) => {
            const isResult = section.label.toLowerCase().includes('result');
            return (
              <section key={section.label} className="ed-chapter" aria-labelledby={`${titleId}-s${i}`} data-reveal>
                <h2 id={`${titleId}-s${i}`}>{plain(section.heading)}</h2>
                {section.paragraphs.map((p) => (
                  <p key={p}>{plain(p)}</p>
                ))}
                {i === 1 && (
                  <>
                    {techParagraphs.map((p) => (
                      <p key={p}>{plain(p)}</p>
                    ))}
                    {holding && (
                      <p className="ed-decision">
                        <b>The key decision.</b> {holding.keyDecision}
                      </p>
                    )}
                    <Tag label="Stack" items={cs.techStack.map((t) => t.name)} />
                  </>
                )}
                {isResult && <p className="ed-summary">{plain(cs.resultSummary)}</p>}
              </section>
            );
          })}
        </div>

        {holding && (
          <section className="ed-how" aria-labelledby={`${titleId}-how`} data-reveal>
            <h2 id={`${titleId}-how`}>How it works</h2>
            {holding.diagram.kind === 'hex' ? <HexCoreDiagram {...numeraCore} /> : <RelayDiagram nodes={holding.diagram.nodes} />}
          </section>
        )}

        {moves && (
          <section className="ed-notes" aria-labelledby={`${titleId}-notes`} data-reveal>
            <h2 id={`${titleId}-notes`}>Director’s notes</h2>
            <p className="ed-notes__lede">The calls that shaped it, annotated the way a chess game is.</p>
            <Movelist moves={moves} />
          </section>
        )}

        {screen && (
          <figure className="ed-screen" data-reveal>
            <div className="ed-screen__frame">
              <img src={screen.src} alt={screen.alt} width={screen.width} height={screen.height} loading="lazy" />
            </div>
            <figcaption>{screen.caption}</figcaption>
          </figure>
        )}

        {reviews.length > 0 && (
          <section className="ed-reviews" aria-labelledby={`${titleId}-reviews`}>
            <h2 id={`${titleId}-reviews`} data-reveal>
              Reviews
            </h2>
            <div className="ed-reviews__grid">
              {reviews.map((clip) => (
                <figure key={clip.id} data-reveal>
                  <blockquote>“{clip.quote}”</blockquote>
                  <figcaption>
                    <b>{clip.from}</b>, {clip.headline}, {clip.timecode.replace(' · ', ' ')}
                  </figcaption>
                  {clip.screenshotUrl && (
                    <button
                      type="button"
                      className="link linkbutton"
                      onClick={() => setLightbox({ src: clip.screenshotUrl!, alt: `${clip.headline} recognition post from ${clip.from}` })}
                    >
                      See the original post
                    </button>
                  )}
                </figure>
              ))}
            </div>
          </section>
        )}
      </div>

      <section className="ed-more" aria-labelledby={`${titleId}-more`}>
        <div className="wrap">
          <h2 id={`${titleId}-more`}>More from the collection</h2>
          <Shelf exclude={project.slug} />
        </div>
      </section>
      <Lightbox image={lightbox} onClose={closeLightbox} />
    </article>
  );
}
