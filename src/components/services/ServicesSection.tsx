import type { CSSProperties } from 'react';
import { ScrollReveal } from '../effects/ScrollReveal';
import { SectionLabel } from '../ui/SectionLabel';
import { HandUnderline } from '../ui/HandUnderline';
import { TechIcon } from '../ui/TechIcon';
import { services } from '../../data/services';

// Per-service color theme — each card picks one
const colorThemes = [
  { bg: 'var(--color-bg-blueprint)', accent: 'var(--color-ink)', border: 'var(--color-ink-light)' },
  { bg: 'var(--color-bg-cream)', accent: 'var(--color-accent)', border: 'var(--color-accent-light)' },
  { bg: 'var(--color-bg-lavender)', accent: 'var(--color-lavender)', border: 'var(--color-lavender-soft)' },
  { bg: 'var(--color-bg-sage)', accent: 'var(--color-green)', border: 'var(--color-green-border)' },
];

// Bento spans: each service gets a different shape
const spans = [
  'md:col-span-7 md:row-span-2',  // primary — large
  'md:col-span-5',                // top-right — small wide
  'md:col-span-5',                // mid-right — small
  'md:col-span-12',               // bottom — full-width banner card
];

export function ServicesSection() {
  const sectionStyle = {
    '--section-accent': 'var(--color-ink)',
    '--section-accent-soft': 'var(--color-ink-soft)',
  } as CSSProperties;

  return (
    <section
      id="services"
      className="relative py-16 overflow-hidden border-y border-[var(--color-border)]"
      style={{ ...sectionStyle, background: 'var(--color-bg-alt)' }}
    >
      {/* Soft blueprint grid in the background */}
      <div className="bg-blueprint-grid absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="color-blob -z-10"
        style={{ background: 'var(--color-lavender)', width: 380, height: 380, top: '20%', left: -150, opacity: 0.18 }}
        aria-hidden="true"
      />

      <div className="max-w-[1280px] mx-auto px-6">
        {/* === Asymmetric header === */}
        <div className="grid grid-cols-12 gap-6 mb-12">
          <div className="col-span-12 md:col-span-7">
            <ScrollReveal>
              <SectionLabel number="02" label="What I build" />
              <h2 className="font-display text-[40px] sm:text-[56px] md:text-[68px] font-medium leading-[1.0] tracking-[-0.025em]">
                The kind of work I take on,{' '}
                <HandUnderline color="var(--color-coral)">
                  <span className="italic font-normal" style={{ fontVariationSettings: "'SOFT' 100", color: 'var(--color-coral)' }}>
                    in plain English.
                  </span>
                </HandUnderline>
              </h2>
            </ScrollReveal>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9 flex md:items-end">
            <ScrollReveal delay={0.1}>
              <div className="border-l-2 border-[var(--color-coral)] pl-5">
                <p className="text-[15px] text-[var(--color-text-secondary)] leading-[1.65] mb-3">
                  Four shapes of project I keep getting hired for. The categories matter less than the underlying skill: I take a fuzzy problem, ask the right questions, and ship something that works on Monday morning.
                </p>
                <p className="text-[13px] text-[var(--color-text-muted)] italic">
                  If your project doesn&rsquo;t fit cleanly into one of these, that&rsquo;s usually a good sign.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* === Bento grid === */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 auto-rows-fr">
          {services.map((service, i) => {
            const theme = colorThemes[i % colorThemes.length];
            const span = spans[i % spans.length];
            const isFeature = i === 0;
            const isBanner = i === 3;
            const num = String(i + 1).padStart(2, '0');

            return (
              <ScrollReveal key={service.title} delay={0.08 * (i + 1)} className={span}>
                <div
                  className="paper-grain relative h-full overflow-hidden rounded-3xl border p-7 hover:-translate-y-1 transition-all duration-400 group"
                  style={{ background: theme.bg, borderColor: theme.border }}
                >
                  {/* Big number watermark in the corner */}
                  <span
                    aria-hidden="true"
                    className="absolute -top-2 -right-3 font-display text-[110px] leading-none font-medium opacity-[0.08] select-none"
                    style={{ color: theme.accent }}
                  >
                    {num}
                  </span>

                  {/* Tag stripe */}
                  <div
                    className="absolute top-0 left-7 right-7 h-1 rounded-b-md"
                    style={{ background: theme.accent, opacity: 0.4 }}
                  />

                  <div className="relative flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 group-hover:rotate-6 transition-transform duration-300"
                        style={{ background: theme.accent, color: 'var(--color-bg)' }}
                      >
                        {service.icon}
                      </div>
                      <span
                        className="font-mono text-[10px] uppercase tracking-[0.22em]"
                        style={{ color: theme.accent }}
                      >
                        Service / {num}
                      </span>
                    </div>

                    <h3
                      className={`font-display font-medium leading-[1.1] tracking-[-0.015em] mb-3 ${
                        isFeature ? 'text-[32px]' : isBanner ? 'text-[28px]' : 'text-[22px]'
                      }`}
                    >
                      {service.title}
                    </h3>

                    <p
                      className={`text-[var(--color-text-secondary)] leading-[1.6] mb-5 ${
                        isFeature ? 'text-[15.5px]' : 'text-[13.5px] flex-1'
                      }`}
                    >
                      {isFeature
                        ? 'Custom dashboards, internal tools, and full-stack web apps. The kind of software your team uses every day — fast, responsive, production-ready, and boring in the best possible way.'
                        : service.description}
                    </p>

                    {/* Featured-only: a real example + a "what you get" list to earn the larger card */}
                    {isFeature && (
                      <>
                        <div
                          className="rounded-2xl p-4 mb-5 bg-[var(--color-bg-card)]/70 backdrop-blur-sm border"
                          style={{ borderColor: theme.border }}
                        >
                          <div
                            className="font-mono text-[10px] uppercase tracking-[0.18em] mb-2"
                            style={{ color: theme.accent }}
                          >
                            Recent build &middot; Sun Life
                          </div>
                          <p className="font-display text-[18px] font-medium leading-tight tracking-tight mb-1.5 text-[var(--color-text-primary)]">
                            Copilot Productivity Platform
                          </p>
                          <p className="text-[12.5px] text-[var(--color-text-secondary)] leading-snug">
                            Built solo over six weeks. Used by 30+ engineering squads weekly. Earned Employee of the Quarter and two senior-engineer recognitions.
                          </p>
                        </div>

                        <ul className="space-y-2 mb-5">
                          {[
                            'A working staging link by the end of week one',
                            'Friday demo + written changelog every sprint',
                            'Docs and a runbook so I&rsquo;m not a single point of failure',
                          ].map((line) => (
                            <li key={line} className="flex items-start gap-2.5 text-[13px] text-[var(--color-text-secondary)] leading-snug">
                              <span
                                className="font-mono text-[11px] mt-[2px] shrink-0"
                                style={{ color: theme.accent }}
                                aria-hidden="true"
                              >
                                ✓
                              </span>
                              <span dangerouslySetInnerHTML={{ __html: line }} />
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {service.examples.map((ex) => (
                        <span
                          key={ex}
                          className="inline-flex items-center gap-1.5 font-mono text-[11px] px-2.5 py-1 rounded-md border bg-[var(--color-bg-card)]/60 backdrop-blur-sm"
                          style={{ color: theme.accent, borderColor: theme.border }}
                        >
                          <TechIcon name={ex} size={12} />
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}

          {/* === Manifesto cell — replaces a card slot in the bento === */}
          <ScrollReveal delay={0.4} className="md:col-span-12">
            <div
              className="relative overflow-hidden rounded-3xl p-8 md:p-12 border-2 border-dashed"
              style={{ background: 'var(--color-bg-deep)', color: 'var(--color-text-on-deep)', borderColor: 'var(--color-accent)' }}
            >
              <div
                className="color-blob"
                style={{ background: 'var(--color-accent)', width: 320, height: 320, top: -100, right: -80, opacity: 0.4 }}
                aria-hidden="true"
              />
              <div
                className="color-blob"
                style={{ background: 'var(--color-coral)', width: 240, height: 240, bottom: -80, left: '40%', opacity: 0.3 }}
                aria-hidden="true"
              />

              <div className="relative grid grid-cols-12 gap-6 items-start">
                <div className="col-span-12 md:col-span-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] opacity-60">
                    note to self <span className="opacity-60">/ pinned</span>
                  </span>
                </div>
                <div className="col-span-12 md:col-span-8">
                  <p className="font-display text-[22px] sm:text-[28px] md:text-[32px] font-medium leading-[1.3] tracking-[-0.015em] mb-5">
                    Three questions I answer before writing a line of code:{' '}
                    <span className="italic" style={{ fontVariationSettings: "'SOFT' 100", color: 'var(--color-accent)' }}>
                      who screams when it breaks,
                    </span>
                    {' '}
                    <span className="italic" style={{ fontVariationSettings: "'SOFT' 100", color: 'var(--color-mint)' }}>
                      who notices when it works,
                    </span>
                    {' '}and{' '}
                    <span className="italic" style={{ fontVariationSettings: "'SOFT' 100", color: 'var(--color-coral)' }}>
                      what manual ritual this is rescuing.
                    </span>
                  </p>
                  <p className="text-[14px] leading-[1.65] italic max-w-[640px] opacity-70">
                    Half the work of a useful tool lives in those answers. The code is the easy part &mdash; it&rsquo;s deciding what <em>not</em> to build that&rsquo;s hard.
                  </p>
                </div>
                <div className="col-span-12 md:col-span-2 md:text-right">
                  <a
                    href="#process"
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] underline-offset-4 hover:underline"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    how I work <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
