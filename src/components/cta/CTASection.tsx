import type { CSSProperties } from 'react';
import { ScrollReveal } from '../effects/ScrollReveal';
import { HandUnderline } from '../ui/HandUnderline';
import { SectionLabel } from '../ui/SectionLabel';
import { Signature } from '../ui/Signature';
import { siteConfig } from '../../data/siteConfig';

function openContact() {
  document.dispatchEvent(new CustomEvent('open-contact'));
}

export function CTASection() {
  const sectionStyle = {
    '--section-accent': 'var(--color-accent)',
    '--section-accent-soft': 'var(--color-accent-soft)',
  } as CSSProperties;

  return (
    <section
      id="contact"
      className="relative py-20 px-6 overflow-hidden"
      style={{ ...sectionStyle, background: 'var(--color-bg-cream)' }}
    >
      {/* Soft amber + coral blobs */}
      <div
        className="color-blob -z-10"
        style={{ background: 'var(--color-accent)', width: 420, height: 420, top: -100, left: '20%', opacity: 0.22 }}
        aria-hidden="true"
      />
      <div
        className="color-blob -z-10"
        style={{ background: 'var(--color-coral)', width: 320, height: 320, bottom: -80, right: '15%', opacity: 0.18 }}
        aria-hidden="true"
      />

      <div className="max-w-[920px] mx-auto">
        <ScrollReveal>
          <SectionLabel number="10" label="The closing note" align="center" />
        </ScrollReveal>

        {/* Letter-style card */}
        <ScrollReveal delay={0.05}>
          <div className="paper-grain relative rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-8 sm:p-12 md:p-14">
            {/* Letter header strip */}
            <div className="flex items-baseline justify-between mb-8 pb-5 border-b border-dashed border-[var(--color-border)] flex-wrap gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                Re: working together
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                Direct &middot; un-templated
              </span>
            </div>

            <h2 className="font-display text-[40px] sm:text-[56px] md:text-[68px] font-medium leading-[1.0] tracking-[-0.03em] mb-7">
              If you got here,{' '}
              <HandUnderline color="var(--color-accent)">
                <span className="italic font-normal" style={{ fontVariationSettings: "'SOFT' 100", color: 'var(--color-accent)' }}>
                  we should talk.
                </span>
              </HandUnderline>
            </h2>

            <div className="space-y-4 text-[16px] sm:text-[17px] text-[var(--color-text-secondary)] leading-[1.65] max-w-[640px] mb-10">
              <p>
                You read the field notes, the bento, and probably the awkward Q&amp;A. That&rsquo;s already further than most people get on a portfolio site.
              </p>
              <p>
                The next move is yours. Send me one paragraph &mdash; the problem, who it&rsquo;s for, and a rough timeline. I&rsquo;ll reply within a day with whether I think I&rsquo;m the right person, and if not, who is.
              </p>
            </div>

            {/* Contact options as inline pills, not buttons-on-a-row template */}
            <div className="flex flex-wrap gap-3 items-center mb-10">
              <button
                onClick={openContact}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-[14px] font-semibold bg-[var(--color-text-primary)] text-[var(--color-bg)] hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] transition-all duration-300 cursor-pointer font-[inherit]"
              >
                Send me a message
                <span aria-hidden="true">→</span>
              </button>
              <a
                href={siteConfig.resumeUrl}
                download
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-[14px] font-medium bg-transparent text-[var(--color-text-primary)] border border-[var(--color-border-strong)] hover:bg-[var(--color-text-primary)] hover:text-[var(--color-bg)] transition-all duration-300 no-underline"
              >
                Download résumé
              </a>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] underline-offset-4 hover:underline transition-colors no-underline ml-2"
              >
                or peek at github
                <span aria-hidden="true">↗</span>
              </a>
            </div>

            {/* Signature block */}
            <div className="flex items-end justify-between gap-6 pt-6 border-t border-dashed border-[var(--color-border)] flex-wrap">
              <div>
                <Signature color="var(--color-accent)" width={170} height={68} />
              </div>
              <div className="text-right">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-muted)] mb-1">
                  Sent from
                </div>
                <div className="font-mono text-[11px] text-[var(--color-text-secondary)]">
                  Bengaluru, IST
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
