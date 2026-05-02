import type { CSSProperties } from 'react';
import { ScrollReveal } from '../effects/ScrollReveal';
import { SectionLabel } from '../ui/SectionLabel';
import { TechIcon, techColor } from '../ui/TechIcon';
import { skills } from '../../data/skills';

// Emphasis lookup — 1 = primary (large), 2 = secondary (medium), 3 = tertiary (small).
// Captures what Aum is best known for vs. things he's used.
const emphasis: Record<string, 1 | 2 | 3> = {
  Python: 1, TypeScript: 1, React: 1, AWS: 1, LangChain: 1,
  FastAPI: 2, PostgreSQL: 2, Pandas: 2, NumPy: 2, JavaScript: 2, SQL: 2,
  Flask: 3, 'Material-UI': 3, Storybook: 3, 'REST APIs': 3, Jenkins: 3, 'C++': 3, 'HTML/CSS': 3,
};

const sizeClasses: Record<1 | 2 | 3, string> = {
  1: 'text-[18px] py-2.5 px-4 gap-2.5',
  2: 'text-[14px] py-1.5 px-3 gap-2',
  3: 'text-[12px] py-1 px-2.5 gap-1.5',
};

const iconSizes: Record<1 | 2 | 3, number> = { 1: 22, 2: 16, 3: 12 };

export function SkillsSection() {
  const sectionStyle = {
    '--section-accent': 'var(--color-lavender)',
    '--section-accent-soft': 'var(--color-lavender-soft)',
  } as CSSProperties;

  // Flatten all skills with their category (for the wall)
  const allSkills = skills.flatMap((g) => g.items.map((item) => ({ item, category: g.category })));

  return (
    <section id="skills" className="relative py-16 overflow-hidden" style={sectionStyle}>
      <div
        className="color-blob -z-10"
        style={{ background: 'var(--color-lavender)', width: 360, height: 360, top: '20%', right: -120, opacity: 0.16 }}
        aria-hidden="true"
      />

      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-12 gap-6 mb-10">
          <div className="col-span-12 md:col-span-6">
            <ScrollReveal>
              <SectionLabel number="07" label="The toolbox" />
              <h2 className="font-display text-[36px] sm:text-[48px] md:text-[56px] font-medium leading-[1.05] tracking-[-0.025em]">
                Bigger means I&rsquo;ve actually{' '}
                <span className="italic" style={{ fontVariationSettings: "'SOFT' 100", color: 'var(--color-lavender)' }}>
                  shipped with it.
                </span>
              </h2>
            </ScrollReveal>
          </div>
          <div className="col-span-12 md:col-span-5 md:col-start-8 md:mt-3">
            <ScrollReveal delay={0.1}>
              <p className="text-[15px] text-[var(--color-text-secondary)] leading-[1.65]">
                Stack-shaming usually misses the point: tools come and go. Still, here&rsquo;s the honest current state. I&rsquo;m happy to learn yours.
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Stamp wall — varied sizes, no grid */}
        <ScrollReveal delay={0.15}>
          <div className="paper-grain relative rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-card)]/60 p-6 sm:p-8 md:p-10">
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              {allSkills.map(({ item }) => {
                const e = emphasis[item] ?? 3;
                const c = techColor(item);
                return (
                  <span
                    key={item}
                    className={`inline-flex items-center font-medium rounded-xl border bg-[var(--color-bg-card)] hover:-translate-y-0.5 transition-all duration-300 cursor-default ${sizeClasses[e]}`}
                    style={{ borderColor: c, color: c }}
                  >
                    <TechIcon name={item} size={iconSizes[e]} />
                    <span className="text-[var(--color-text-primary)]">{item}</span>
                  </span>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Category caption strip below — small, mono, muted */}
        <ScrollReveal delay={0.25}>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
            {skills.map((g) => (
              <span key={g.category} className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-sm bg-[var(--color-lavender)] opacity-70" />
                {g.category} &nbsp;<span className="opacity-50">&middot; {g.items.length}</span>
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
