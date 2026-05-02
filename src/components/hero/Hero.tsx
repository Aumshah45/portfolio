import type { CSSProperties } from 'react';
import { ScrollReveal } from '../effects/ScrollReveal';
import { HandUnderline } from '../ui/HandUnderline';
import { SectionLabel } from '../ui/SectionLabel';
import { ScrollNudge } from './ScrollNudge';

export function Hero() {
  const sectionStyle = {
    '--section-accent': 'var(--color-accent)',
    '--section-accent-soft': 'var(--color-accent-soft)',
  } as CSSProperties;

  return (
    <section className="relative pt-20 pb-14 overflow-hidden" style={sectionStyle}>
      {/* Soft background colour zones */}
      <div className="hero-dots absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="color-blob -z-10"
        style={{ background: 'var(--color-peach)', width: 520, height: 520, top: -150, right: -160 }}
        aria-hidden="true"
      />
      <div
        className="color-blob -z-10"
        style={{ background: 'var(--color-ink)', width: 380, height: 380, bottom: -120, left: -100, opacity: 0.30 }}
        aria-hidden="true"
      />

      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section marker + locator line */}
        <ScrollReveal>
          <SectionLabel number="01" label="Hello" />
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-text-muted)] mb-10">
            Bengaluru, IST &middot; I write my own copy, ship my own code, and reply to my own emails.
          </p>
        </ScrollReveal>

        {/* Two-column: long personal note on the left, "right now" panel on the right */}
        <div className="grid grid-cols-12 gap-8 lg:gap-14">
          <div className="col-span-12 lg:col-span-8">
            <ScrollReveal delay={0.05}>
              <h1 className="font-display text-[56px] sm:text-[80px] md:text-[96px] font-medium leading-[0.95] tracking-[-0.035em] mb-10">
                Hi, I&rsquo;m{' '}
                <span className="italic" style={{ fontVariationSettings: "'SOFT' 100", color: 'var(--color-accent)' }}>
                  Aum.
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <div className="space-y-5 text-[18px] sm:text-[20px] text-[var(--color-text-secondary)] leading-[1.55] max-w-[640px]">
                <p>
                  I&rsquo;m a software engineer at{' '}
                  <span className="text-[var(--color-text-primary)] font-medium">Sun Life Global Solutions</span>. Last July, two senior engineers sent me back-to-back recognitions in the same week &mdash; for a{' '}
                  <HandUnderline color="var(--color-accent)">
                    <span className="italic" style={{ fontVariationSettings: "'SOFT' 100" }}>Copilot productivity platform</span>
                  </HandUnderline>{' '}
                  I&rsquo;d built alone over six weeks. It&rsquo;s now used by 30+ engineering squads across the company, and it earned me{' '}
                  <span className="text-[var(--color-text-primary)] font-medium">Employee of the Quarter</span>.
                </p>
                <p>
                  That experience convinced me to start building things for people outside of work too. I&rsquo;m opening up evenings and weekends to take on freelance projects &mdash; mostly internal tools, dashboards, and the occasional AI feature that{' '}
                  <span className="italic" style={{ fontVariationSettings: "'SOFT' 100" }}>actually</span> earns its place.
                </p>
                <p className="text-[16px] sm:text-[17px] text-[var(--color-text-muted)]">
                  If you&rsquo;ve got a fuzzy idea, an internal process running on duct tape and goodwill, or a feature your team keeps deferring &mdash; <button onClick={() => document.dispatchEvent(new CustomEvent('open-contact'))} className="text-[var(--color-coral)] font-medium underline-offset-4 hover:underline cursor-pointer font-[inherit] bg-transparent border-0 p-0">tell me about it</button>.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.22}>
              <div className="flex gap-3.5 flex-wrap items-center mt-10">
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-[14px] font-semibold bg-[var(--color-text-primary)] text-[var(--color-bg)] hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] transition-all duration-300"
                >
                  Read about a project
                  <span aria-hidden="true">→</span>
                </a>
                <button
                  onClick={() => document.dispatchEvent(new CustomEvent('open-contact'))}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-[14px] font-medium bg-transparent text-[var(--color-text-primary)] border border-[var(--color-border-strong)] hover:bg-[var(--color-text-primary)] hover:text-[var(--color-bg)] transition-all duration-300 cursor-pointer font-[inherit]"
                >
                  Email me directly
                </button>
              </div>
            </ScrollReveal>
          </div>

          {/* Right column: a real "right now" panel — specific, dated, mundane */}
          <div className="col-span-12 lg:col-span-4">
            <ScrollReveal delay={0.18}>
              <aside className="paper-grain relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 lg:sticky lg:top-28">
                <div className="flex items-baseline justify-between mb-5 pb-3 border-b border-dashed border-[var(--color-border)]">
                  <h2 className="font-display text-[22px] font-medium tracking-tight">What I&rsquo;m up to</h2>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                    updated this week
                  </span>
                </div>

                <dl className="space-y-4 text-[13.5px] leading-[1.5]">
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink)] mb-1">Day-job project</dt>
                    <dd className="text-[var(--color-text-primary)]">
                      Owning the <span className="font-medium">Copilot Productivity Platform</span> end-to-end &mdash; now extending it with cohort analytics across 30+ engineering squads.
                    </dd>
                  </div>

                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-coral)] mb-1">Recently shipped</dt>
                    <dd className="text-[var(--color-text-primary)]">
                      An agentic absence-claim assistant. Cut HR turnaround from a few days to a few minutes for routine cases.
                    </dd>
                  </div>

                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-mint)] mb-1">Sharpening</dt>
                  <dd className="text-[var(--color-text-primary)]">
                      Multi-agent systems &mdash; how to make several models reason together without making a mess. Re-reading <em>Tidy First?</em> &mdash; turns out most of it isn&rsquo;t code.
                    </dd>
                  </div>

                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-lavender)] mb-1">Hot take of the week</dt>
                    <dd className="text-[var(--color-text-primary)]">
                      Most &ldquo;we need AI for this&rdquo; meetings should end with a clearer form and a five-line bug-fix.
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 pt-4 border-t border-dashed border-[var(--color-border)] flex items-center gap-2">
                  <span className="w-[7px] h-[7px] bg-[var(--color-green)] rounded-full pulse-ring" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-green)]">
                    one freelance slot open &mdash; mid-2026
                  </span>
                </div>
              </aside>
            </ScrollReveal>
          </div>
        </div>

        {/* Bottom: credentials as a written paragraph, not a card grid */}
        <ScrollReveal delay={0.35}>
          <div className="mt-16 max-w-[820px] flex items-end justify-between gap-6 border-t border-dashed border-[var(--color-border)] pt-7 flex-wrap">
            <p className="text-[14px] sm:text-[15px] text-[var(--color-text-muted)] leading-[1.7] flex-1 min-w-[260px]">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] mr-3">background</span>
            B.Tech in Computer Science from SRM Institute (CGPA{' '}
            <span className="text-[var(--color-text-primary)] font-medium">9.08/10</span>),{' '}
            published researcher on{' '}
            <span className="text-[var(--color-coral)]">IoT botnet detection</span> at the 15th ICCCNT,{' '}
            <span className="text-[var(--color-accent)]">AWS</span> and{' '}
            <span className="text-[var(--color-mint)]">Stanford ML</span> certified, currently{' '}
            <span className="text-[var(--color-ink)]">Associate Analyst Developer at Sun Life</span>{' '}
            after fifteen months as a Graduate Engineer Trainee.
            </p>
            <ScrollNudge />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
