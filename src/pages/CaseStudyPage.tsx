import { useParams, Link, Navigate } from 'react-router-dom';
import { projects } from '../data/projects';
import { caseMoves, casePipelines, numeraHolding, tickerSymbol } from '../data/holdings';
import { ScrollReveal } from '../components/effects/ScrollReveal';
import { SlateHeader } from '../components/ui/SlateHeader';
import { Movelist } from '../components/ui/Movelist';
import { ReplayButton } from '../components/ui/ReplayButton';
import { Tag } from '../components/ui/Tag';
import { RelayDiagram } from '../components/holdings/RelayDiagram';
import { HexCoreDiagram } from '../components/holdings/HexCoreDiagram';
import { BeforeAfterPanel } from '../components/holdings/BeforeAfterPanel';
import { BookStrip } from '../components/holdings/BookStrip';
import { DecodeNumber } from '../components/holdings/DecodeNumber';
import { h3, lede, monoLink, tapeline, wrap } from '../components/ui/styles';

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <Navigate to="/404" replace />;

  const { caseStudy: cs } = project;
  const symbol = tickerSymbol[project.slug] ?? 'CASE';
  const pipeline = casePipelines[project.slug];
  const moves = caseMoves[project.slug];
  const others = projects.filter((p) => p.slug !== project.slug);

  const meta = [
    { label: 'Role', value: cs.meta.role },
    { label: 'Company', value: cs.meta.company },
    { label: 'Timeline', value: cs.meta.timeline },
    { label: 'Status', value: project.statusLabel, live: project.status === 'live' },
  ];

  return (
    <article>
      {/* Header */}
      <header className="border-b border-line-2 pb-16 pt-12">
        <div className={wrap}>
          <nav aria-label="Breadcrumb" className={`${tapeline} mb-8 justify-start gap-x-2`}>
            <Link to="/" className="text-acc-dim no-underline hover:text-acc">
              Master tape
            </Link>
            <span aria-hidden="true">/</span>
            <Link to="/#work" className="text-acc-dim no-underline hover:text-acc">
              Holdings
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-acc">{symbol}</span>
          </nav>

          <ScrollReveal>
            <SlateHeader sc={`SC 02 · ${symbol} · ${project.title}`} take={`${cs.meta.role} · ${cs.meta.timeline}`} />
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <h1 className="m-0 mb-5 max-w-[24ch] text-balance text-[clamp(34px,5vw,64px)] font-extrabold leading-[1.02] tracking-[-0.03em] text-title stretch-110">
              {cs.heroTitle}
            </h1>
            <p className="m-0 max-w-[70ch] text-[17px] text-text-2">{cs.heroSubtitle}</p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <dl className="mt-9 grid overflow-hidden rounded-panel border border-line-2 sm:grid-cols-2 lg:grid-cols-4">
              {meta.map((m) => (
                <div key={m.label} className="border-line-2 bg-bg-2 px-5 py-4 max-lg:border-b lg:border-r lg:last:border-r-0">
                  <dt className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-acc-dim">{m.label}</dt>
                  <dd className="m-0 flex items-center gap-2 text-[15px] font-semibold text-title">
                    {m.live && <span aria-hidden="true" className="dot-pulse h-[7px] w-[7px] rounded-full bg-acc shadow-[var(--glow-dot)]" />}
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          </ScrollReveal>

          {(project.liveUrl || project.repoUrl) && (
            <ScrollReveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                {project.liveUrl && (
                  <ReplayButton href={project.liveUrl} external>
                    Try the live API ↗
                  </ReplayButton>
                )}
                {project.repoUrl && (
                  <ReplayButton variant="ghost" href={project.repoUrl} external>
                    View repository ↗
                  </ReplayButton>
                )}
              </div>
            </ScrollReveal>
          )}
        </div>
      </header>

      {/* Architecture */}
      <section className="border-b border-line-2 bg-bg-2 py-14" aria-label="Architecture">
        <div className={wrap}>
          <div className={`${tapeline} mb-2`}>
            <span>Architecture · data flow</span>
            <span>{symbol}</span>
          </div>
          <ScrollReveal>
            {project.slug === numeraHolding.slug ? (
              <HexCoreDiagram
                portA={numeraHolding.portA}
                core={numeraHolding.core}
                portB={numeraHolding.portB}
                seam={numeraHolding.seam}
              />
            ) : (
              pipeline && <RelayDiagram nodes={pipeline} className="mt-6" />
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* Body */}
      <div className="mx-auto max-w-[860px] px-7 py-[84px] max-[700px]:px-5">
        {cs.sections.map((section, i) => {
          const title = section.label.replace(/^\d+\s*[—-]\s*/, '').trim();
          const num = section.label.match(/\d+/)?.[0] ?? String(i + 1).padStart(2, '0');
          const isTech = title.toLowerCase().includes('tech');
          const isResult = title.toLowerCase().includes('result');

          return (
            <ScrollReveal key={section.label}>
              <section className="mb-[72px]">
                <div className={`${tapeline} mb-3.5`}>
                  <span>
                    {symbol}.{num} · {title}
                  </span>
                </div>
                <h2 className={h3}>{section.heading}</h2>
                {section.paragraphs.map((p) => (
                  <p key={p} className={`${lede} mb-4 max-w-[68ch] leading-[1.75]`}>
                    {p}
                  </p>
                ))}

                {i === 0 && cs.beforeAfter && (
                  <BeforeAfterPanel
                    className="mt-7"
                    before={{ value: cs.beforeAfter.before.value, caption: cs.beforeAfter.before.description }}
                    after={{ value: cs.beforeAfter.after.value, caption: cs.beforeAfter.after.description }}
                  />
                )}

                {i === 1 && moves && (
                  <>
                    <div className={`${tapeline} mb-0 mt-8`}>
                      <span>Key decisions, annotated</span>
                    </div>
                    <Movelist moves={moves} className="mt-3" />
                  </>
                )}

                {isTech && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {cs.techStack.map((tech) => (
                      <Tag key={tech.name}>{tech.name}</Tag>
                    ))}
                  </div>
                )}

                {isResult && (
                  <>
                    <div className="my-7 grid overflow-hidden rounded-panel border border-line-2 sm:grid-cols-3">
                      {cs.resultMetrics.map((m) => (
                        <div key={m.label} className="border-line-2 bg-bg-2 px-5 py-5 max-sm:border-b sm:border-r sm:last:border-r-0">
                          <DecodeNumber
                            value={m.value}
                            className="block font-mono text-[32px] font-medium leading-none text-acc [font-variant-numeric:tabular-nums]"
                          />
                          <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-text-2">{m.label}</div>
                        </div>
                      ))}
                    </div>
                    <p className="m-0 font-serif text-[19px] italic leading-[1.5] text-title">{cs.resultSummary}</p>
                  </>
                )}
              </section>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Other holdings */}
      <section className="border-t border-line-2 py-16" aria-label="Other case studies">
        <div className={wrap}>
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className={`${h3} mb-0`}>Rest of the book</h2>
            <Link to="/#work" className={monoLink}>
              All holdings →
            </Link>
          </div>
          <BookStrip
            className="mt-8"
            items={others.map((p) => ({
              kicker: `${tickerSymbol[p.slug] ?? 'CASE'} · ${p.statusLabel}`,
              title: p.title,
              body: p.outcome,
              href: `/projects/${p.slug}`,
            }))}
          />
        </div>
      </section>
    </article>
  );
}
