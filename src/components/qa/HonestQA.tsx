import type { CSSProperties } from 'react';
import { ScrollReveal } from '../effects/ScrollReveal';
import { HandUnderline } from '../ui/HandUnderline';
import { SectionLabel } from '../ui/SectionLabel';

const qa = [
  {
    q: 'What kind of project makes you say yes immediately?',
    a: (
      <>
        An internal tool that started as a clever hack and nobody wants to touch anymore. A dashboard a small team keeps wishing existed. An AI workflow where the actual problem is{' '}
        <em>messy data</em>, not the model. If there&rsquo;s a real user with a real complaint at the other end, I&rsquo;m in.
      </>
    ),
    accent: 'var(--color-accent)',
    bg: 'var(--color-bg-cream)',
  },
  {
    q: 'Can you actually do AI/ML, or are you just adding it because it&rsquo;s trendy?',
    a: (
      <>
        I built a production agentic AI pipeline for absence-claim processing at Sun Life, and I published research on{' '}
        <span className="font-medium text-[var(--color-text-primary)]">IoT botnet detection</span> at the 15th ICCCNT conference. So &mdash; yes. But I won&rsquo;t pitch you AI if your problem is actually a button in the wrong place. Most &ldquo;AI features&rdquo; should just be a well-designed form.
      </>
    ),
    accent: 'var(--color-coral)',
    bg: 'var(--color-bg-coral)',
  },
  {
    q: 'What&rsquo;s the smallest project you&rsquo;d take on?',
    a: (
      <>
        If you can describe what you need in two sentences and ship it in two weekends, I&rsquo;m in. My favourite size is{' '}
        <span className="font-medium text-[var(--color-text-primary)]">4&ndash;8 weeks</span> &mdash; long enough to build something real, short enough that we both stay focused.
      </>
    ),
    accent: 'var(--color-ink)',
    bg: 'var(--color-bg-blueprint)',
  },
  {
    q: 'What if the day job blows up and you go missing?',
    a: (
      <>
        I work on freelance evenings and weekends only &mdash; never during day-job hours. If something at Sun Life suddenly needs all of me, I&rsquo;ll tell you the day it happens, not the week after. So far that&rsquo;s never cost a milestone.
      </>
    ),
    accent: 'var(--color-mint)',
    bg: 'var(--color-bg-sage)',
  },
  {
    q: 'Why hire you and not an agency?',
    a: (
      <>
        An agency routes your project through three project managers and two timezones. You&rsquo;ll get me, directly, replying within hours. The trade-off is I take fewer projects &mdash; usually one or two at a time. If we&rsquo;re a fit, you&rsquo;re not waiting in a queue.
      </>
    ),
    accent: 'var(--color-lavender)',
    bg: 'var(--color-bg-lavender)',
  },
];

export function HonestQA() {
  const sectionStyle = {
    '--section-accent': 'var(--color-coral)',
    '--section-accent-soft': 'var(--color-coral-soft)',
  } as CSSProperties;

  return (
    <section id="honest" className="relative py-16 overflow-hidden" style={sectionStyle}>
      <div
        className="color-blob -z-10"
        style={{ background: 'var(--color-coral)', width: 360, height: 360, top: '20%', right: -120, opacity: 0.18 }}
        aria-hidden="true"
      />

      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header — written like a magazine kicker, not a "section header" */}
        <div className="grid grid-cols-12 gap-6 mb-14">
          <div className="col-span-12 md:col-span-7">
            <ScrollReveal>
              <SectionLabel number="04" label="Honest answers" />
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-coral)] mb-4">
                A page I wish other portfolios had
              </p>
              <h2 className="font-display text-[44px] sm:text-[64px] md:text-[76px] font-medium leading-[0.98] tracking-[-0.03em]">
                Five questions you&rsquo;re about to ask me,{' '}
                <HandUnderline color="var(--color-coral)">
                  <span className="italic font-normal" style={{ fontVariationSettings: "'SOFT' 100", color: 'var(--color-coral)' }}>
                    answered honestly.
                  </span>
                </HandUnderline>
              </h2>
            </ScrollReveal>
          </div>
          <div className="hidden md:flex col-span-4 col-start-9 items-end">
            <ScrollReveal delay={0.1}>
              <p className="text-[14px] text-[var(--color-text-secondary)] leading-[1.6] border-l-2 border-[var(--color-coral)] pl-4 italic">
                I wrote these the way I&rsquo;d answer them on a discovery call. If yours isn&rsquo;t here, it&rsquo;s usually a one-line email away.
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Q&A laid out as a long-form column with hanging numbers and accent bars — not cards */}
        <div className="space-y-12 md:space-y-16 max-w-[920px] mx-auto">
          {qa.map((item, i) => {
            const num = String(i + 1).padStart(2, '0');
            const isOdd = i % 2 === 1;
            return (
              <ScrollReveal key={num} delay={i * 0.05}>
                <article
                  className={`relative grid grid-cols-12 gap-4 md:gap-8 items-start ${isOdd ? 'md:pl-16' : ''}`}
                >
                  {/* Hanging number */}
                  <div className="col-span-2 md:col-span-1">
                    <div
                      className="font-display text-[44px] md:text-[60px] font-medium leading-none"
                      style={{ color: item.accent, fontVariationSettings: "'SOFT' 100" }}
                    >
                      {num}
                    </div>
                  </div>

                  <div className="col-span-10 md:col-span-11">
                    {/* Question — monospace voice, like a transcript */}
                    <p
                      className="font-mono text-[12px] uppercase tracking-[0.18em] mb-3 flex items-start gap-2"
                      style={{ color: item.accent }}
                    >
                      <span className="opacity-60 shrink-0">Q.</span>
                      <span dangerouslySetInnerHTML={{ __html: item.q }} />
                    </p>

                    {/* Answer — generous serif paragraph, with a bar in the section colour */}
                    <div
                      className="border-l-[3px] pl-5 md:pl-6 py-1"
                      style={{ borderColor: item.accent }}
                    >
                      <p className="font-display text-[20px] sm:text-[24px] md:text-[28px] font-normal leading-[1.4] tracking-[-0.01em] text-[var(--color-text-primary)]">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Closing — handwritten note vibe, not a "section CTA" */}
        <ScrollReveal delay={0.15}>
          <div className="mt-20 max-w-[720px] mx-auto text-center">
            <p className="font-display italic text-[20px] sm:text-[24px] text-[var(--color-text-secondary)] leading-[1.5] mb-3" style={{ fontVariationSettings: "'SOFT' 100" }}>
              &ldquo;Anything else? Just ask. The worst that happens is I say no, or send you to someone better.&rdquo;
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
              &mdash; aum, by email, usually within a day
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
