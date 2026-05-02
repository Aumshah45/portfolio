import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '../effects/ScrollReveal';
import { SectionLabel } from '../ui/SectionLabel';
import { HandUnderline } from '../ui/HandUnderline';
import { TechIcon } from '../ui/TechIcon';
import { FlowVisual } from './FlowVisual';
import { ChartVisual } from './ChartVisual';
import { DashboardVisual } from './DashboardVisual';
import { projects } from '../../data/projects';

const visuals = {
  flow: FlowVisual,
  chart: ChartVisual,
  dashboard: DashboardVisual,
};

const marquee = [
  { value: '30+', label: 'engineering squads served' },
  { value: '6 wks', label: 'solo build, copilot platform' },
  { value: 'EoQ', label: 'employee of the quarter, Q2 2025' },
  { value: '80%', label: 'TAT cut on absence claims' },
  { value: '85%', label: 'AI accuracy, document pipeline' },
  { value: '4', label: 'graduate engineers mentored' },
  { value: '2', label: 'senior-engineer recognitions, one week' },
];

export function ProjectsSection() {
  const sectionStyle = {
    '--section-accent': 'var(--color-accent)',
    '--section-accent-soft': 'var(--color-accent-soft)',
  } as CSSProperties;

  return (
    <section id="work" className="relative py-16 overflow-hidden" style={sectionStyle}>
      {/* Soft amber blob */}
      <div
        className="color-blob -z-10"
        style={{ background: 'var(--color-accent)', width: 380, height: 380, top: '5%', right: -160, opacity: 0.18 }}
        aria-hidden="true"
      />

      <div className="max-w-[1280px] mx-auto px-6">
        {/* === Editorial header — asymmetric === */}
        <div className="grid grid-cols-12 gap-6 mb-10">
          <div className="col-span-12 md:col-span-7">
            <ScrollReveal>
              <SectionLabel number="05" label="Selected work" />
              <h2 className="font-display text-[40px] sm:text-[56px] md:text-[68px] font-medium leading-[1.0] tracking-[-0.025em]">
                Three projects,{' '}
                <HandUnderline color="var(--color-accent)">
                  <span className="italic font-normal" style={{ fontVariationSettings: "'SOFT' 100" }}>
                    one through-line.
                  </span>
                </HandUnderline>
              </h2>
            </ScrollReveal>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9 md:mt-3">
            <ScrollReveal delay={0.1}>
              <p className="text-[15px] text-[var(--color-text-secondary)] leading-[1.65]">
                Each one started as a fuzzy ask from someone who needed something working by next quarter. Picked because they show range &mdash; full-stack, cloud, agentic AI &mdash; and ownership end-to-end.
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* === Marquee numbers band === */}
        <ScrollReveal delay={0.15}>
          <div className="relative overflow-hidden mb-12 py-5 border-y border-[var(--color-border)] bg-[var(--color-bg-card)]/40">
            <div className="marquee-track flex gap-10 whitespace-nowrap" style={{ width: 'max-content' }}>
              {[...marquee, ...marquee].map((item, idx) => (
                <div key={idx} className="flex items-baseline gap-2.5 shrink-0">
                  <span
                    className="font-display text-[28px] font-medium leading-none tracking-tight"
                    style={{ color: idx % 2 === 0 ? 'var(--color-accent)' : 'var(--color-coral)' }}
                  >
                    {item.value}
                  </span>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                    {item.label}
                  </span>
                  <span className="text-[var(--color-border)] mx-3 select-none" aria-hidden="true">
                    /
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* === Projects: each distinct === */}
        <div className="space-y-12">
          {/* PROJECT 01 — feature treatment: dark-ink full-bleed magazine cover */}
          {projects[0] && (() => {
            const project = projects[0];
            const Visual = visuals[project.visualType];
            return (
              <ScrollReveal>
                <Link
                  to={`/projects/${project.slug}`}
                  className="block relative overflow-hidden rounded-3xl no-underline text-inherit group"
                  style={{ background: 'var(--color-bg-deep)', color: 'var(--color-text-on-deep)' }}
                >
                  {/* Atmospheric blobs */}
                  <div
                    className="color-blob"
                    style={{ background: 'var(--color-accent)', width: 380, height: 380, top: -100, left: -80, opacity: 0.45 }}
                    aria-hidden="true"
                  />
                  <div
                    className="color-blob"
                    style={{ background: 'var(--color-coral)', width: 280, height: 280, bottom: -80, right: '20%', opacity: 0.30 }}
                    aria-hidden="true"
                  />

                  <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 p-8 md:p-12">
                    <div className="md:col-span-7 flex flex-col">
                      {/* Cover-page header */}
                      <div className="flex items-center gap-3 mb-8 opacity-80">
                        <span className="font-mono text-[11px] uppercase tracking-[0.25em]">
                          Project &mdash; 01 / Featured
                        </span>
                        <span className="h-px w-10 bg-current opacity-40" aria-hidden="true" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-accent)]">
                          ★ EoQ
                        </span>
                      </div>

                      <h3 className="font-display text-[36px] sm:text-[48px] md:text-[56px] font-medium leading-[1.0] tracking-[-0.025em] mb-6">
                        Measuring{' '}
                        <span className="italic" style={{ fontVariationSettings: "'SOFT' 100", color: 'var(--color-accent)' }}>
                          Copilot ROI
                        </span>
                        {' '}across 30+ engineering squads.
                      </h3>

                      <p className="text-[15px] leading-[1.65] mb-6 opacity-80 max-w-[560px]">
                        {project.outcome} I built it solo over six weeks. It became the standard productivity tool inside Sun Life and earned me Employee of the Quarter.
                      </p>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.techTags.map((t) => (
                          <span
                            key={t}
                            className="inline-flex items-center gap-1.5 font-mono text-[11px] px-2.5 py-1 rounded-md border border-current/30"
                            style={{ borderColor: 'rgba(240,230,210,0.25)' }}
                          >
                            <TechIcon name={t} size={12} color="currentColor" />
                            {t}
                          </span>
                        ))}
                      </div>

                      <span className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em] mt-auto group-hover:gap-3 transition-all" style={{ color: 'var(--color-accent)' }}>
                        Read the case study <span aria-hidden="true">→</span>
                      </span>
                    </div>

                    <div className="md:col-span-5 rounded-2xl overflow-hidden border border-current/15" style={{ borderColor: 'rgba(240,230,210,0.15)' }}>
                      <Visual />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })()}

          {/* PROJECT 02 — coral magazine spread, visual on the LEFT */}
          {projects[1] && (() => {
            const project = projects[1];
            const Visual = visuals[project.visualType];
            return (
              <ScrollReveal>
                <Link
                  to={`/projects/${project.slug}`}
                  className="block relative overflow-hidden rounded-3xl no-underline text-inherit group border border-[var(--color-border)]"
                  style={{ background: 'var(--color-bg-coral)' }}
                >
                  <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 p-8 md:p-12">
                    <div className="md:col-span-5 md:order-1 order-2 rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-card)]/40">
                      <Visual />
                    </div>

                    <div className="md:col-span-7 md:order-2 order-1 flex flex-col">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--color-coral)]">
                          Project &mdash; 02 / Cloud-native
                        </span>
                        <span className="h-px w-10 bg-[var(--color-coral)] opacity-40" aria-hidden="true" />
                      </div>

                      <h3 className="font-display text-[32px] sm:text-[40px] md:text-[44px] font-medium leading-[1.05] tracking-[-0.02em] mb-5">
                        An enterprise document pipeline,{' '}
                        <span className="italic text-[var(--color-coral)]" style={{ fontVariationSettings: "'SOFT' 100" }}>
                          orchestrated end-to-end.
                        </span>
                      </h3>

                      <p className="text-[14.5px] leading-[1.65] mb-5 text-[var(--color-text-secondary)] max-w-[560px]">
                        {project.outcome} Step Functions and Lambda for orchestration, S3 for storage, an AI layer that reached <strong className="text-[var(--color-text-primary)]">85% accuracy</strong> on conversion edge cases.
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.techTags.map((t) => (
                          <span
                            key={t}
                            className="inline-flex items-center gap-1.5 font-mono text-[11px] px-2.5 py-1 rounded-md bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-secondary)]"
                          >
                            <TechIcon name={t} size={12} />
                            {t}
                          </span>
                        ))}
                      </div>

                      <span className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em] text-[var(--color-coral)] mt-auto group-hover:gap-3 transition-all">
                        Read the case study <span aria-hidden="true">→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })()}

          {/* PROJECT 03 — sage spread, visual on the RIGHT, with annotated stats */}
          {projects[2] && (() => {
            const project = projects[2];
            const Visual = visuals[project.visualType];
            return (
              <ScrollReveal>
                <Link
                  to={`/projects/${project.slug}`}
                  className="block relative overflow-hidden rounded-3xl no-underline text-inherit group border border-[var(--color-border)]"
                  style={{ background: 'var(--color-bg-sage)' }}
                >
                  <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 p-8 md:p-12">
                    <div className="md:col-span-7 flex flex-col">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--color-green)]">
                          Project &mdash; 03 / Live in prod
                        </span>
                        <span className="h-px w-10 bg-[var(--color-green)] opacity-40" aria-hidden="true" />
                        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-green)]">
                          <span className="w-[6px] h-[6px] bg-[var(--color-green)] rounded-full pulse-ring" />
                          live
                        </span>
                      </div>

                      <h3 className="font-display text-[32px] sm:text-[40px] md:text-[44px] font-medium leading-[1.05] tracking-[-0.02em] mb-5">
                        Three AI agents that{' '}
                        <span className="italic text-[var(--color-green)]" style={{ fontVariationSettings: "'SOFT' 100" }}>
                          settle absence claims
                        </span>
                        {' '}in hours, not weeks.
                      </h3>

                      <p className="text-[14.5px] leading-[1.65] mb-6 text-[var(--color-text-secondary)] max-w-[560px]">
                        {project.outcome}
                      </p>

                      {/* Annotated before/after */}
                      <div className="grid grid-cols-2 gap-3 mb-6 max-w-[480px]">
                        <div className="border border-[var(--color-border)] bg-[var(--color-bg-card)]/60 rounded-xl p-4">
                          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-muted)] mb-1.5 line-through opacity-60">
                            before
                          </div>
                          <div className="font-display text-[24px] font-medium leading-none tracking-tight text-[var(--color-text-muted)] line-through opacity-50">
                            15 days
                          </div>
                        </div>
                        <div className="border-2 border-[var(--color-green)] bg-[var(--color-bg-card)] rounded-xl p-4 relative">
                          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-green)] mb-1.5 font-semibold">
                            after
                          </div>
                          <div className="font-display text-[24px] font-medium leading-none tracking-tight text-[var(--color-text-primary)]">
                            3&ndash;4 days
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.techTags.map((t) => (
                          <span
                            key={t}
                            className="inline-flex items-center gap-1.5 font-mono text-[11px] px-2.5 py-1 rounded-md bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-secondary)]"
                          >
                            <TechIcon name={t} size={12} />
                            {t}
                          </span>
                        ))}
                      </div>

                      <span className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em] text-[var(--color-green)] mt-auto group-hover:gap-3 transition-all">
                        Read the case study <span aria-hidden="true">→</span>
                      </span>
                    </div>

                    <div className="md:col-span-5 rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-card)]/40">
                      <Visual />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })()}
        </div>
      </div>
    </section>
  );
}
