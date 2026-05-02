import type { CSSProperties } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { ScrollReveal } from '../components/effects/ScrollReveal';
import { SectionLabel } from '../components/ui/SectionLabel';
import { HandUnderline } from '../components/ui/HandUnderline';
import { TechIcon } from '../components/ui/TechIcon';

// Per-project accent so each case study reads as its own chapter, matching home
const projectAccent: Record<string, { accent: string; soft: string; bg: string }> = {
  'copilot-metrics': {
    accent: 'var(--color-accent)',
    soft: 'var(--color-accent-soft)',
    bg: 'var(--color-bg-cream)',
  },
  'document-converter': {
    accent: 'var(--color-coral)',
    soft: 'var(--color-coral-soft)',
    bg: 'var(--color-bg-coral)',
  },
  'absence-claim-automation': {
    accent: 'var(--color-green)',
    soft: 'var(--color-green-bg)',
    bg: 'var(--color-bg-sage)',
  },
};

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <Navigate to="/404" replace />;

  const { caseStudy: cs } = project;
  const otherProjects = projects.filter((p) => p.slug !== slug);
  const palette = projectAccent[project.slug] ?? projectAccent['copilot-metrics'];

  const sectionStyle = {
    '--section-accent': palette.accent,
    '--section-accent-soft': palette.soft,
  } as CSSProperties;

  // Project index for the chapter marker
  const projectIndex = projects.findIndex((p) => p.slug === slug) + 1;
  const num = String(projectIndex).padStart(2, '0');

  return (
    <div style={sectionStyle}>
      {/* === HERO — full bleed cover === */}
      <section className="relative pt-28 pb-16 px-6 overflow-hidden">
        {/* Atmospheric blob */}
        <div
          className="color-blob -z-10"
          style={{ background: palette.accent, width: 480, height: 480, top: -150, right: -160, opacity: 0.22 }}
          aria-hidden="true"
        />

        <div className="max-w-[1200px] mx-auto">
          {/* Breadcrumb */}
          <ScrollReveal>
            <nav className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-text-muted)] mb-10 flex items-center gap-2 flex-wrap" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-[var(--section-accent)] transition-colors no-underline">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <Link to="/#work" className="hover:text-[var(--section-accent)] transition-colors no-underline">
                Selected work
              </Link>
              <span aria-hidden="true">/</span>
              <span style={{ color: 'var(--section-accent)' }}>case &mdash; {num}</span>
            </nav>
          </ScrollReveal>

          {/* Asymmetric headline */}
          <div className="grid grid-cols-12 gap-6 mb-12">
            <div className="col-span-12 md:col-span-9">
              <ScrollReveal delay={0.05}>
                <SectionLabel number={num} label={`Case ${num} · ${project.statusLabel}`} />
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h1 className="font-display text-[40px] sm:text-[58px] md:text-[72px] font-medium leading-[1.0] tracking-[-0.03em] mb-6">
                  <HandUnderline color={palette.accent}>
                    <span className="italic font-normal" style={{ fontVariationSettings: "'SOFT' 100" }}>
                      {project.title}
                    </span>
                  </HandUnderline>
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={0.15}>
                <p className="font-display text-[20px] sm:text-[26px] md:text-[30px] font-normal italic leading-[1.35] text-[var(--color-text-secondary)] max-w-[820px]" style={{ fontVariationSettings: "'SOFT' 100" }}>
                  {cs.heroSubtitle}
                </p>
              </ScrollReveal>
            </div>
          </div>

          {/* Meta strip — color-coded tiles, not a centered row */}
          <ScrollReveal delay={0.22}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
              {[
                { label: 'Role', value: cs.meta.role, color: palette.accent },
                { label: 'Company', value: cs.meta.company, color: 'var(--color-ink)' },
                { label: 'Timeline', value: cs.meta.timeline, color: 'var(--color-coral)' },
                { label: 'Status', value: project.statusLabel, color: project.status === 'live' ? 'var(--color-green)' : palette.accent, isLive: project.status === 'live' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4"
                >
                  <div
                    className="font-mono text-[10px] uppercase tracking-[0.2em] mb-2"
                    style={{ color: item.color }}
                  >
                    {item.label}
                  </div>
                  <div className="font-display text-[16px] font-medium leading-tight tracking-tight inline-flex items-center gap-1.5">
                    {item.isLive && (
                      <span className="w-[7px] h-[7px] bg-[var(--color-green)] rounded-full pulse-ring" />
                    )}
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* === ARCHITECTURE BANNER — full-bleed dark === */}
      <ScrollReveal>
        <div className="px-6 mb-16">
          <div
            className="max-w-[1200px] mx-auto rounded-3xl relative overflow-hidden"
            style={{ background: 'var(--color-bg-deep)', color: 'var(--color-text-on-deep)' }}
          >
            <div
              className="color-blob"
              style={{ background: palette.accent, width: 360, height: 360, top: -100, left: -80, opacity: 0.45 }}
              aria-hidden="true"
            />
            <div
              className="color-blob"
              style={{ background: 'var(--color-coral)', width: 280, height: 280, bottom: -80, right: '15%', opacity: 0.3 }}
              aria-hidden="true"
            />

            <div className="relative px-6 py-12 md:py-16">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-70 text-center mb-6">
                Architecture &middot; data flow
              </div>
              <div className="flex items-center gap-3 md:gap-4 flex-wrap justify-center">
                {project.slug === 'absence-claim-automation' ? (
                  <>
                    <ArchNode icon="📄" label="Document" sub="Input claims" accent={palette.accent} />
                    <ArchArrow label="extract" accent={palette.accent} />
                    <ArchNode icon="🤖" label="Extraction Agent" sub="LangChain" accent={palette.accent} />
                    <ArchArrow label="validate" accent={palette.accent} />
                    <ArchNode icon="✅" label="Validation Agent" sub="Rules engine" accent={palette.accent} />
                    <ArchArrow label="decide" accent={palette.accent} />
                    <ArchNode icon="📊" label="Decision Engine" sub="Dashboard" accent={palette.accent} />
                  </>
                ) : project.slug === 'copilot-metrics' ? (
                  <>
                    <ArchNode icon="📝" label="Excel Upload" sub="Raw data" accent={palette.accent} />
                    <ArchArrow label="ingest" accent={palette.accent} />
                    <ArchNode icon="⚙️" label="Flask Backend" sub="Pandas + NumPy" accent={palette.accent} />
                    <ArchArrow label="compute" accent={palette.accent} />
                    <ArchNode icon="📊" label="React Dashboard" sub="Visualize" accent={palette.accent} />
                    <ArchArrow label="export" accent={palette.accent} />
                    <ArchNode icon="📈" label="Reports" sub="30+ squads" accent={palette.accent} />
                  </>
                ) : (
                  <>
                    <ArchNode icon="📄" label="JSON / XML" sub="Input" accent={palette.accent} />
                    <ArchArrow label="process" accent={palette.accent} />
                    <ArchNode icon="⚙️" label="Step Functions" sub="Orchestrate" accent={palette.accent} />
                    <ArchArrow label="convert" accent={palette.accent} />
                    <ArchNode icon="📃" label="PrinceXML" sub="PDF gen" accent={palette.accent} />
                    <ArchArrow label="store" accent={palette.accent} />
                    <ArchNode icon="☁️" label="S3 Bucket" sub="Output" accent={palette.accent} />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* === BODY — magazine column with hanging chapter labels === */}
      <div className="max-w-[820px] mx-auto px-6">
        {cs.sections.map((section, i) => {
          const sectionNum = section.label.match(/(\d+)/)?.[0] ?? String(i + 1).padStart(2, '0');
          const sectionTitle = section.label.replace(/^\d+\s*[—\-]\s*/, '').trim();

          return (
            <ScrollReveal key={section.label}>
              <article className="mb-16 grid grid-cols-12 gap-4 md:gap-6">
                {/* Hanging chapter number */}
                <div className="col-span-2 md:col-span-1">
                  <div
                    className="font-display text-[44px] md:text-[56px] font-medium leading-none italic"
                    style={{ fontVariationSettings: "'SOFT' 100", color: palette.accent }}
                  >
                    {sectionNum}
                  </div>
                </div>

                <div className="col-span-10 md:col-span-11">
                  <div
                    className="font-mono text-[10px] uppercase tracking-[0.2em] mb-3"
                    style={{ color: palette.accent }}
                  >
                    {sectionTitle}
                  </div>
                  <h2 className="font-display text-[26px] md:text-[34px] font-medium leading-[1.15] tracking-[-0.015em] mb-5">
                    {section.heading}
                  </h2>

                  {section.paragraphs.map((p, j) => (
                    <p key={j} className="text-[15.5px] text-[var(--color-text-secondary)] leading-[1.75] mb-4">
                      {p}
                    </p>
                  ))}

                  {/* Before/After after first section */}
                  {i === 0 && cs.beforeAfter && (
                    <div className="grid grid-cols-2 gap-3 mt-7 max-w-[520px]">
                      <div className="border border-[var(--color-border)] bg-[var(--color-bg-card)] rounded-2xl p-5">
                        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] mb-2 line-through opacity-60">
                          before
                        </div>
                        <div className="font-display text-[32px] font-medium leading-none tracking-tight text-[var(--color-text-muted)] line-through opacity-60 mb-1.5">
                          {cs.beforeAfter.before.value}
                        </div>
                        <div className="text-[12px] text-[var(--color-text-muted)]">
                          {cs.beforeAfter.before.description}
                        </div>
                      </div>
                      <div
                        className="border-2 rounded-2xl p-5"
                        style={{ borderColor: palette.accent, background: palette.soft }}
                      >
                        <div
                          className="font-mono text-[10px] uppercase tracking-[0.2em] mb-2 font-semibold"
                          style={{ color: palette.accent }}
                        >
                          after
                        </div>
                        <div className="font-display text-[32px] font-medium leading-none tracking-tight mb-1.5">
                          {cs.beforeAfter.after.value}
                        </div>
                        <div className="text-[12px] text-[var(--color-text-secondary)]">
                          {cs.beforeAfter.after.description}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tech stack chips for "Tech Stack" section */}
                  {sectionTitle.toLowerCase().includes('tech') && (
                    <div className="flex flex-wrap gap-2 mt-6">
                      {cs.techStack.map((tech) => (
                        <div
                          key={tech.name}
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[13px] font-medium"
                        >
                          <TechIcon name={tech.name} size={14} />
                          {tech.name}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Result metrics for last section */}
                  {sectionTitle.toLowerCase().includes('result') && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-7 mb-6">
                        {cs.resultMetrics.map((m, mi) => (
                          <motion.div
                            key={m.label}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: mi * 0.08 }}
                            viewport={{ once: true }}
                            className="rounded-2xl border-2 p-5"
                            style={{ borderColor: palette.accent, background: palette.soft }}
                          >
                            <div
                              className="font-display text-[36px] font-medium leading-none tracking-tight mb-2"
                              style={{ color: palette.accent }}
                            >
                              {m.value}
                            </div>
                            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
                              {m.label}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      <p className="text-[15px] text-[var(--color-text-secondary)] leading-[1.75] italic">
                        {cs.resultSummary}
                      </p>
                    </>
                  )}
                </div>
              </article>
            </ScrollReveal>
          );
        })}
      </div>

      {/* === OTHER PROJECTS === */}
      <section className="max-w-[1200px] mx-auto px-6 py-16 border-t border-dashed border-[var(--color-border)]">
        <ScrollReveal>
          <div className="flex items-baseline justify-between mb-8 flex-wrap gap-3">
            <h3 className="font-display text-[28px] sm:text-[36px] font-medium leading-tight tracking-tight">
              Other case studies
            </h3>
            <Link
              to="/#work"
              className="font-mono text-[11px] uppercase tracking-[0.18em] hover:underline underline-offset-4 no-underline"
              style={{ color: palette.accent }}
            >
              all projects →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {otherProjects.map((p) => {
              const otherPalette = projectAccent[p.slug] ?? projectAccent['copilot-metrics'];
              return (
                <Link
                  key={p.slug}
                  to={`/projects/${p.slug}`}
                  className="paper-grain block p-7 rounded-2xl border border-[var(--color-border)] hover:-translate-y-1 hover:shadow-[0_15px_40px_-25px_rgba(0,0,0,0.2)] transition-all duration-300 no-underline text-inherit relative overflow-hidden"
                  style={{ background: otherPalette.bg }}
                >
                  <div
                    className="font-mono text-[10px] uppercase tracking-[0.22em] mb-3"
                    style={{ color: otherPalette.accent }}
                  >
                    {p.statusLabel}
                  </div>
                  <h4 className="font-display text-[22px] font-medium leading-tight tracking-tight mb-2">
                    {p.title}
                  </h4>
                  <p className="text-[13.5px] text-[var(--color-text-secondary)] leading-relaxed mb-4">
                    {p.outcome}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.techTags.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1.5 font-mono text-[11px] px-2 py-1 rounded-md bg-[var(--color-bg-card)]/70 border border-[var(--color-border)]"
                      >
                        <TechIcon name={t} size={11} />
                        {t}
                      </span>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

function ArchNode({ icon, label, sub, accent }: { icon: string; label: string; sub: string; accent: string }) {
  return (
    <div
      className="bg-white/[0.06] backdrop-blur-xl border px-4 py-3 rounded-xl text-center min-w-[110px]"
      style={{ borderColor: 'rgba(240,230,210,0.15)' }}
    >
      <div className="text-[22px] mb-1.5">{icon}</div>
      <div className="text-[12px] font-semibold leading-tight">{label}</div>
      <div className="font-mono text-[9px] uppercase tracking-[0.14em] mt-1 opacity-70" style={{ color: accent }}>
        {sub}
      </div>
    </div>
  );
}

function ArchArrow({ label, accent }: { label: string; accent: string }) {
  return (
    <div className="hidden md:flex flex-col items-center gap-1.5">
      <div className="w-10 h-px" style={{ background: accent, opacity: 0.5 }} />
      <span className="font-mono text-[9px] uppercase tracking-[0.14em]" style={{ color: accent }}>
        {label}
      </span>
    </div>
  );
}
