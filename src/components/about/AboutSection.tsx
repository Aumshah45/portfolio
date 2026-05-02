import type { CSSProperties } from 'react';
import { ScrollReveal } from '../effects/ScrollReveal';
import { SectionLabel } from '../ui/SectionLabel';
import { HandUnderline } from '../ui/HandUnderline';
import { Signature } from '../ui/Signature';

const facts = [
  { label: 'College', value: 'SRM Institute', sub: 'CGPA 9.08 / 10', color: 'var(--color-ink)' },
  { label: 'Years building', value: '~2', sub: 'at Sun Life Global Solutions', color: 'var(--color-accent)' },
  { label: 'Mentored', value: '4', sub: 'graduate engineers, on the job', color: 'var(--color-mint)' },
  { label: 'Published', value: '1 paper', sub: 'IEEE 15th ICCCNT, IoT botnet detection', color: 'var(--color-coral)' },
];

export function AboutSection() {
  const sectionStyle = {
    '--section-accent': 'var(--color-mint)',
    '--section-accent-soft': 'var(--color-mint-soft)',
  } as CSSProperties;

  return (
    <section
      id="about"
      className="relative py-16 overflow-hidden border-y border-[var(--color-border)]"
      style={{ ...sectionStyle, background: 'var(--color-bg-cream)' }}
    >
      {/* Soft mint blob */}
      <div
        className="color-blob -z-10"
        style={{ background: 'var(--color-mint)', width: 360, height: 360, bottom: -120, left: -120, opacity: 0.18 }}
        aria-hidden="true"
      />

      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT — the letter */}
          <div className="col-span-12 lg:col-span-8">
            <ScrollReveal>
              <SectionLabel number="06" label="A short letter" />
            </ScrollReveal>

            {/* Letterhead */}
            <ScrollReveal delay={0.05}>
              <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-dashed border-[var(--color-border)]">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                  From the desk of A. Shah
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                  Bengaluru, IST
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="font-display text-[28px] sm:text-[34px] md:text-[40px] font-medium leading-[1.2] tracking-[-0.02em] mb-7">
                Hi again. If you&rsquo;ve made it this far, you probably want to know{' '}
                <HandUnderline color="var(--color-mint)">
                  <span className="italic font-normal" style={{ fontVariationSettings: "'SOFT' 100" }}>
                    who you&rsquo;d actually be working with.
                  </span>
                </HandUnderline>
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.18}>
              <div className="space-y-4 text-[16px] sm:text-[17px] text-[var(--color-text-secondary)] leading-[1.7] max-w-[640px]">
                <p>
                  I&rsquo;m a CS graduate from SRM Institute (CGPA <strong className="text-[var(--color-text-primary)]">9.08/10</strong>), now an Associate Analyst Developer at Sun Life Global Solutions after fifteen months as a Graduate Engineer Trainee. Most of my actual work happens at the messy intersection of full-stack engineering and applied AI &mdash; data pipelines, internal tools, agentic systems.
                </p>
                <p>
                  I don&rsquo;t believe great developers are defined by their stack. They&rsquo;re defined by{' '}
                  <span className="italic text-[var(--color-text-primary)]" style={{ fontVariationSettings: "'SOFT' 100" }}>
                    how fast they understand a problem
                  </span>
                  , how seriously they take ownership of it, and whether the thing they ship is still working three months later.
                </p>
                <p className="text-[var(--color-text-muted)] italic" style={{ fontVariationSettings: "'SOFT' 100" }}>
                  &mdash; that&rsquo;s the bar I hold myself to. It&rsquo;s also the one I&rsquo;d hold any project for you to.
                </p>
              </div>
            </ScrollReveal>

            {/* Signature */}
            <ScrollReveal delay={0.3}>
              <div className="mt-10 flex items-end gap-4 flex-wrap">
                <Signature color="var(--color-mint)" width={140} height={56} />
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-text-muted)] mb-2">
                  &mdash; written this week
                </span>
              </div>
            </ScrollReveal>
          </div>

          {/* RIGHT — fact tiles, asymmetric stack */}
          <div className="col-span-12 lg:col-span-4 lg:pt-12">
            <ScrollReveal delay={0.15}>
              <div className="space-y-3">
                {facts.map((fact, i) => (
                  <div
                    key={fact.label}
                    className={`paper-grain relative rounded-2xl border border-[var(--color-border)] p-5 bg-[var(--color-bg-card)] transition-transform duration-300 hover:-translate-y-1 ${
                      i % 2 === 1 ? 'lg:ml-6' : 'lg:mr-6'
                    }`}
                    style={{ borderLeftWidth: '3px', borderLeftColor: fact.color }}
                  >
                    <div
                      className="font-mono text-[10px] uppercase tracking-[0.2em] mb-2"
                      style={{ color: fact.color }}
                    >
                      {fact.label}
                    </div>
                    <div className="font-display text-[26px] font-medium leading-none tracking-tight mb-1.5">
                      {fact.value}
                    </div>
                    <div className="text-[12px] text-[var(--color-text-secondary)] leading-snug">
                      {fact.sub}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
