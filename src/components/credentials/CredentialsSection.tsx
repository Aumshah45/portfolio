import type { CSSProperties } from 'react';
import { ScrollReveal } from '../effects/ScrollReveal';
import { SectionLabel } from '../ui/SectionLabel';
import { TechIcon } from '../ui/TechIcon';
import { credentials } from '../../data/credentials';

export function CredentialsSection() {
  const sectionStyle = {
    '--section-accent': 'var(--color-ink)',
    '--section-accent-soft': 'var(--color-ink-soft)',
  } as CSSProperties;

  const work = credentials.find((c) => c.category === 'Experience')?.items ?? [];
  const eduAndCerts = credentials.find((c) => c.category.includes('Education'))?.items ?? [];

  // Split education from certs
  const degree = eduAndCerts.find((i) => /B\.?Tech|Bachelor|M\.?Tech|Master/i.test(i.title));
  const certs = eduAndCerts.filter((i) => i !== degree);

  const currentRole = work[0];
  const previousRole = work[1];

  return (
    <section
      id="credentials"
      className="relative py-16 overflow-hidden border-y border-[var(--color-border)]"
      style={{ ...sectionStyle, background: 'var(--color-bg-blueprint)' }}
    >
      <div className="bg-blueprint-grid absolute inset-0 -z-10" aria-hidden="true" />

      <div className="max-w-[1280px] mx-auto px-6">
        {/* Editorial header */}
        <div className="grid grid-cols-12 gap-6 mb-10">
          <div className="col-span-12 md:col-span-7">
            <ScrollReveal>
              <SectionLabel number="09" label="The transcript" />
              <h2 className="font-display text-[36px] sm:text-[48px] md:text-[56px] font-medium leading-[1.05] tracking-[-0.025em]">
                Where I&rsquo;ve worked, studied, and{' '}
                <span className="italic" style={{ fontVariationSettings: "'SOFT' 100", color: 'var(--color-ink)' }}>
                  what I&rsquo;ve earned along the way.
                </span>
              </h2>
            </ScrollReveal>
          </div>
        </div>

        {/* Bento — varied tile sizes */}
        <div className="grid grid-cols-12 gap-3.5">
          {/* CURRENT ROLE — hero tile, dark inverse, 7 cols */}
          {currentRole && (
            <ScrollReveal delay={0.05} className="col-span-12 md:col-span-7">
              <div
                className="paper-grain relative h-full overflow-hidden rounded-3xl p-7 md:p-9"
                style={{ background: 'var(--color-bg-deep)', color: 'var(--color-text-on-deep)' }}
              >
                <div
                  className="color-blob"
                  style={{ background: 'var(--color-ink)', width: 320, height: 320, top: -100, right: -80, opacity: 0.45 }}
                  aria-hidden="true"
                />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-7">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-70">
                      Currently
                    </span>
                    <span className="h-px w-10 bg-current opacity-30" aria-hidden="true" />
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-green)]">
                      <span className="w-[6px] h-[6px] bg-[var(--color-green)] rounded-full pulse-ring" />
                      live
                    </span>
                  </div>

                  <h3 className="font-display text-[34px] sm:text-[40px] font-medium leading-[1.05] tracking-[-0.02em] mb-3">
                    {currentRole.title}
                  </h3>
                  <div className="text-[16px] mb-4 opacity-90">{currentRole.subtitle}</div>

                  <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] opacity-70 pt-4 border-t border-current/20" style={{ borderColor: 'rgba(240,230,210,0.18)' }}>
                    <span>{currentRole.date}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span>India</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* DEGREE — amber-cream tile, 5 cols */}
          {degree && (
            <ScrollReveal delay={0.1} className="col-span-12 md:col-span-5">
              <div
                className="paper-grain relative h-full overflow-hidden rounded-3xl border-2 p-7"
                style={{ background: 'var(--color-bg-cream)', borderColor: 'var(--color-accent)' }}
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-2 -right-3 font-display text-[110px] leading-none font-medium opacity-[0.08] select-none"
                  style={{ color: 'var(--color-accent)' }}
                >
                  ★
                </span>
                <div className="relative">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)] mb-5 inline-block">
                    Academia
                  </span>
                  <h3 className="font-display text-[26px] font-medium leading-[1.1] tracking-tight mb-2">
                    {degree.title}
                  </h3>
                  <div className="text-[13.5px] text-[var(--color-text-secondary)] mb-5">
                    {degree.subtitle}
                  </div>
                  {degree.date && (
                    <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-text-muted)] pt-4 border-t border-dashed border-[var(--color-border)]">
                      {degree.date}
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* PREVIOUS ROLE — paper card, 7 cols */}
          {previousRole && (
            <ScrollReveal delay={0.15} className="col-span-12 md:col-span-7">
              <div className="paper-grain relative h-full overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-7 md:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-ink)]">
                    Previously
                  </span>
                  <span className="h-px w-10 bg-[var(--color-ink)] opacity-30" aria-hidden="true" />
                </div>
                <h3 className="font-display text-[26px] sm:text-[30px] font-medium leading-tight tracking-tight mb-2">
                  {previousRole.title}
                </h3>
                <div className="text-[14px] text-[var(--color-text-secondary)] mb-4">
                  {previousRole.subtitle}
                </div>
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-text-muted)] pt-4 border-t border-dashed border-[var(--color-border)]">
                  {previousRole.date}
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* CERTIFICATIONS — mint tile with both certs stacked, 5 cols */}
          {certs.length > 0 && (
            <ScrollReveal delay={0.2} className="col-span-12 md:col-span-5">
              <div
                className="paper-grain relative h-full overflow-hidden rounded-3xl border-2 p-6"
                style={{ background: 'var(--color-bg-sage)', borderColor: 'var(--color-mint)' }}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-mint)] mb-5 inline-block">
                  Certified in
                </span>
                <ul className="space-y-3">
                  {certs.map((cert) => {
                    // Pick the relevant tech icon based on cert title
                    const iconName = /AWS/i.test(cert.title) ? 'AWS' :
                                     /Machine Learning|ML/i.test(cert.title) ? 'AI' :
                                     cert.title;
                    return (
                      <li
                        key={cert.title}
                        className="flex items-start gap-3 p-3 rounded-xl bg-[var(--color-bg-card)]/70 backdrop-blur-sm border border-[var(--color-border)]"
                      >
                        <div className="w-10 h-10 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)] flex items-center justify-center shrink-0">
                          <TechIcon name={iconName} size={20} />
                        </div>
                        <div className="min-w-0">
                          <div className="font-display text-[16px] font-medium leading-tight tracking-tight mb-0.5">
                            {cert.title}
                          </div>
                          <div className="text-[11.5px] text-[var(--color-text-secondary)] leading-snug">
                            {cert.subtitle}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </ScrollReveal>
          )}
        </div>

        {/* Footer note */}
        <ScrollReveal delay={0.28}>
          <p className="mt-6 font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--color-text-muted)] text-center">
            originals on request &middot; references on request
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
