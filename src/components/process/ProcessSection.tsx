import type { CSSProperties } from 'react';
import { ScrollReveal } from '../effects/ScrollReveal';
import { SectionLabel } from '../ui/SectionLabel';
import { HandUnderline } from '../ui/HandUnderline';

const steps = [
  {
    num: '01',
    title: 'Discovery',
    description: 'A 30-minute call. We talk through what you actually need (often different from what you first asked for). I leave you with a written summary of what I heard — free.',
    duration: '~30 min',
    icon: '☕',
    color: { bg: 'var(--color-bg-cream)', accent: 'var(--color-accent)' },
  },
  {
    num: '02',
    title: 'Scope & Quote',
    description: 'A clear scope document with deliverables, timeline, and fixed pricing. No surprise invoices, no scope creep without conversation.',
    duration: '2-3 days',
    icon: '✍️',
    color: { bg: 'var(--color-bg-blueprint)', accent: 'var(--color-ink)' },
  },
  {
    num: '03',
    title: 'Build & Iterate',
    description: 'I build in weekly sprints. You see real progress every Friday in a private staging link. Quick, in-the-moment feedback turns into the next sprint.',
    duration: 'project-dependent',
    icon: '🔧',
    color: { bg: 'var(--color-bg-coral)', accent: 'var(--color-coral)' },
  },
  {
    num: '04',
    title: 'Ship & Support',
    description: 'I deploy to production, hand over docs and a runbook, and stick around for 30 days of post-launch support — bugs fixed, questions answered.',
    duration: '+30 days',
    icon: '🚀',
    color: { bg: 'var(--color-bg-sage)', accent: 'var(--color-green)' },
  },
];

export function ProcessSection() {
  const sectionStyle = {
    '--section-accent': 'var(--color-coral)',
    '--section-accent-soft': 'var(--color-coral-soft)',
  } as CSSProperties;

  return (
    <section id="process" className="relative py-16 overflow-hidden" style={sectionStyle}>
      {/* Diagonal striped backdrop */}
      <div
        className="bg-paper-stripes absolute inset-x-0 top-0 h-40 -z-10 opacity-40"
        aria-hidden="true"
      />

      {/* === Header — left aligned, no centering === */}
      <div className="max-w-[1280px] mx-auto px-6 mb-12">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-7">
            <ScrollReveal>
              <SectionLabel number="03" label="How I work" />
              <h2 className="font-display text-[40px] sm:text-[56px] md:text-[64px] font-medium leading-[1.0] tracking-[-0.025em]">
                From{' '}
                <span className="italic" style={{ fontVariationSettings: "'SOFT' 100", color: 'var(--color-accent)' }}>
                  fuzzy idea
                </span>
                {' '}to{' '}
                <HandUnderline color="var(--color-coral)">
                  <span className="italic font-normal" style={{ fontVariationSettings: "'SOFT' 100", color: 'var(--color-coral)' }}>
                    shipped product.
                  </span>
                </HandUnderline>
              </h2>
            </ScrollReveal>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9 md:text-right md:mt-3">
            <ScrollReveal delay={0.1}>
              <p className="text-[15px] text-[var(--color-text-secondary)] leading-[1.65]">
                A four-step process that respects your time, your budget, and your ability to say <em>&ldquo;wait, what?&rdquo;</em> at any point.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* === Horizontal timeline — bleeds wide, scrolls on mobile === */}
      <div className="relative overflow-x-auto md:overflow-visible scroll-smooth snap-x snap-mandatory pb-6 -mx-6 md:mx-0">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-flow-col auto-cols-[85vw] sm:auto-cols-[60vw] md:grid-flow-row md:grid-cols-4 gap-4 md:gap-3">
            {steps.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 0.08}>
                <div
                  className="paper-grain relative h-full snap-start overflow-hidden rounded-3xl border-2 p-6 md:p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.15)] group"
                  style={{ background: step.color.bg, borderColor: step.color.accent }}
                >
                  {/* Big watermark number */}
                  <div
                    className="absolute -top-4 -right-2 font-display font-medium leading-none opacity-15 select-none text-[140px]"
                    style={{ color: step.color.accent }}
                    aria-hidden="true"
                  >
                    {step.num}
                  </div>

                  {/* Top icon + step pill */}
                  <div className="relative flex items-center justify-between mb-6">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-md group-hover:rotate-6 transition-transform duration-400"
                      style={{ background: 'var(--color-bg-card)', borderColor: step.color.accent }}
                    >
                      {step.icon}
                    </div>
                    <span
                      className="font-mono text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-md border"
                      style={{ color: step.color.accent, borderColor: step.color.accent }}
                    >
                      step {step.num}
                    </span>
                  </div>

                  <h3 className="relative font-display text-[26px] font-medium leading-tight tracking-[-0.015em] mb-3">
                    {step.title}
                  </h3>
                  <p className="relative text-[13.5px] text-[var(--color-text-secondary)] leading-[1.6] mb-5">
                    {step.description}
                  </p>

                  <div
                    className="relative inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] pt-3 border-t border-dashed"
                    style={{ color: step.color.accent, borderColor: step.color.accent }}
                  >
                    <span>⏱</span>
                    <span>{step.duration}</span>
                  </div>

                  {/* Connector arrow to next step (visible md+) */}
                  {i < steps.length - 1 && (
                    <div
                      className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 rounded-full items-center justify-center font-mono text-[10px] z-10"
                      style={{ background: step.color.accent, color: 'var(--color-bg)' }}
                      aria-hidden="true"
                    >
                      →
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* === Closing line === */}
      <div className="max-w-[1280px] mx-auto px-6 mt-12">
        <ScrollReveal delay={0.2}>
          <div className="flex items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
            <span className="h-px w-12 bg-[var(--color-border)]" />
            <span>weekly check-ins · transparent pricing · no scope creep</span>
            <span className="h-px w-12 bg-[var(--color-border)]" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
