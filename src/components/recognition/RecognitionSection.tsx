import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ScrollReveal } from '../effects/ScrollReveal';
import { SectionLabel } from '../ui/SectionLabel';
import { HandUnderline } from '../ui/HandUnderline';

const ExternalLinkIcon = ({ className = '' }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="18"
    height="18"
    aria-hidden="true"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const recognitions = [
  {
    type: 'award',
    icon: '\uD83C\uDFC6',
    title: 'Employee of the Quarter',
    source: 'Sun Life Global Solutions',
    description: 'Awarded for building the Copilot Productivity Metrics platform that became the standard measurement tool across 30+ engineering squads.',
    date: 'Q2 2025',
    documentUrl: '/recognitions/eoq-certificate.pdf',
    documentLabel: 'View Certificate',
  },
  {
    type: 'publication',
    icon: '\uD83D\uDCDA',
    title: 'Published Research Paper',
    source: 'Academic Publication',
    description: 'Peer-reviewed research published in an academic journal, demonstrating deep analytical and problem-solving capabilities.',
    date: '2024',
    documentUrl: null,
    documentLabel: null,
  },
  {
    type: 'certification',
    icon: '\u2601\uFE0F',
    title: 'AWS Cloud Operations',
    source: 'AWS Academy',
    description: 'Certified in cloud operations covering EC2, S3, Lambda, Step Functions, IAM, and production-grade AWS architectures.',
    documentUrl: null,
    documentLabel: null,
  },
  {
    type: 'certification',
    icon: '\uD83E\uDDE0',
    title: 'Machine Learning',
    source: 'Stanford University (Coursera)',
    description: 'Completed Andrew Ng\'s Machine Learning specialization covering supervised learning, neural networks, and ML best practices.',
    documentUrl: null,
    documentLabel: null,
  },
];

const appreciations = [
  {
    badge: 'Difference Makers',
    quote: 'Your lightning-fast delivery and unwavering dedication have set a new standard for excellence within our team. Your innovative approach to creating, supporting, and enhancing the application has been instrumental in its success.',
    from: 'Avijeet Hati',
    role: 'Sun Life Global Solutions',
    context: 'Copilot Value Measurement Platform',
    date: 'July 2025',
    documentUrl: '/recognitions/applause-difference-makers.pdf',
    screenshotUrl: '/recognitions/applause-screenshot-1.png',
  },
  {
    badge: 'Faster Together',
    quote: 'Aum has demonstrated exceptional initiative and technical prowess in single-handedly developing the entire GitHub Co-pilot application from its inception. His commitment to excellence is evident in both the frontend and backend components, showcasing his versatility and comprehensive understanding of full-stack development.',
    from: 'Dharmendra Kumar Rai',
    role: 'Sun Life Global Solutions',
    context: 'Copilot Value Measurement Platform',
    date: 'July 2025',
    documentUrl: '/recognitions/applause-faster-together.pdf',
    screenshotUrl: '/recognitions/applause-screenshot-2.png',
  },
];

export function RecognitionSection() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightbox]);

  const sectionStyle = {
    '--section-accent': 'var(--color-accent)',
    '--section-accent-soft': 'var(--color-accent-soft)',
  } as CSSProperties;

  return (
    <section className="relative py-16 overflow-hidden" id="recognition" style={sectionStyle}>
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid grid-cols-12 gap-6 mb-10">
          <div className="col-span-12 md:col-span-7">
            <ScrollReveal>
              <SectionLabel number="08" label="Recognition" />
              <h2 className="font-display text-[36px] sm:text-[48px] md:text-[56px] font-medium leading-[1.05] tracking-[-0.025em]">
                Words from people I&rsquo;ve{' '}
                <HandUnderline color="var(--color-accent)">
                  <span className="italic font-normal" style={{ fontVariationSettings: "'SOFT' 100" }}>
                    actually worked with.
                  </span>
                </HandUnderline>
              </h2>
            </ScrollReveal>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9 md:mt-3">
            <ScrollReveal delay={0.1}>
              <p className="text-[15px] text-[var(--color-text-secondary)] leading-[1.65]">
                Two senior-engineer recognitions in a single week, an Employee-of-the-Quarter award, and the certificates I&rsquo;ve earned along the way. Originals are linked &mdash; nothing here is a stock photo.
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Appreciation Quotes */}
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {appreciations.map((item) => (
              <div
                key={item.from}
                className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-7 relative overflow-hidden group hover:border-[var(--color-accent)] transition-colors duration-300 flex flex-col"
              >
                <div className="absolute top-4 right-6 text-[48px] leading-none text-[var(--color-accent)] opacity-10 font-serif pointer-events-none">&ldquo;</div>

                <div className="flex items-center justify-between gap-2 mb-4 relative">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--color-accent-soft)] text-[var(--color-accent)] text-[10px] font-bold uppercase tracking-wider">
                    <span>{'\u2605'}</span>
                    <span>{item.badge}</span>
                  </div>
                  <a
                    href={item.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-soft)] transition-colors"
                    aria-label={`Open ${item.badge} recognition (PDF)`}
                    title="Open PDF"
                  >
                    <ExternalLinkIcon className="w-3.5 h-3.5" />
                  </a>
                </div>

                <p className="text-[14px] text-[var(--color-text-secondary)] leading-relaxed mb-5 italic relative flex-1">
                  &ldquo;{item.quote}&rdquo;
                </p>

                {/* Screenshot thumbnail */}
                <button
                  type="button"
                  onClick={() => setLightbox({ src: item.screenshotUrl, alt: `${item.badge} recognition post for ${item.from}` })}
                  className="relative w-full mb-5 rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-alt)] hover:border-[var(--color-accent)] transition-all duration-300 group/img cursor-zoom-in"
                  aria-label={`Enlarge screenshot of ${item.badge} post`}
                >
                  <img
                    src={item.screenshotUrl}
                    alt={`${item.badge} recognition post from company portal`}
                    loading="lazy"
                    className="w-full h-[150px] object-cover object-top group-hover/img:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity" />
                  <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold opacity-0 group-hover/img:opacity-100 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="11" height="11" aria-hidden="true">
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                      <path d="M11 8v6" />
                      <path d="M8 11h6" />
                    </svg>
                    <span>View full post</span>
                  </div>
                </button>

                <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-border)]">
                  <div className="w-9 h-9 rounded-full bg-[var(--color-accent-soft)] flex items-center justify-center text-[var(--color-accent)] text-[12px] font-bold shrink-0">
                    {item.from.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-semibold truncate">{item.from}</div>
                    <div className="text-[11px] text-[var(--color-text-muted)] truncate">{item.role} &middot; {item.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Awards & Certifications — bento with one feature card + three companions */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-3.5">
          {recognitions.map((item, i) => {
            // Per-tile color theme matching the rest of the site
            const themes = [
              { bg: 'var(--color-bg-cream)', accent: 'var(--color-accent)' },     // EoQ — amber
              { bg: 'var(--color-bg-coral)', accent: 'var(--color-coral)' },      // Publication — coral
              { bg: 'var(--color-bg-blueprint)', accent: 'var(--color-ink)' },    // AWS — ink
              { bg: 'var(--color-bg-sage)', accent: 'var(--color-mint)' },        // ML — mint
            ];
            const theme = themes[i] ?? themes[0];
            // Bento spans: feature, then three smaller equal cards
            const span = i === 0 ? 'md:col-span-6 md:row-span-2' : 'md:col-span-6';
            const isFeature = i === 0;
            const num = String(i + 1).padStart(2, '0');

            return (
              <ScrollReveal key={item.title} delay={i * 0.06} className={span}>
                <div
                  className="paper-grain relative h-full overflow-hidden rounded-3xl border-2 p-6 md:p-7 flex flex-col group hover:-translate-y-1 transition-transform duration-400"
                  style={{ background: theme.bg, borderColor: theme.accent }}
                >
                  {/* Big watermark number */}
                  <span
                    aria-hidden="true"
                    className={`absolute -top-2 -right-3 font-display font-medium leading-none opacity-[0.10] select-none ${
                      isFeature ? 'text-[160px]' : 'text-[120px]'
                    }`}
                    style={{ color: theme.accent }}
                  >
                    {num}
                  </span>

                  {/* Header strip: emoji + verified pill + view button */}
                  <div className="relative flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div
                        className="rounded-xl flex items-center justify-center bg-[var(--color-bg-card)] border-2"
                        style={{
                          borderColor: theme.accent,
                          width: isFeature ? 56 : 44,
                          height: isFeature ? 56 : 44,
                          fontSize: isFeature ? 28 : 22,
                        }}
                      >
                        {item.icon}
                      </div>
                      {item.documentUrl && (
                        <span
                          className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] px-2 py-1 rounded-md"
                          style={{ color: theme.accent, background: 'var(--color-bg-card)', border: `1px solid ${theme.accent}` }}
                        >
                          ✓ verified
                        </span>
                      )}
                    </div>
                    {item.documentUrl && (
                      <a
                        href={item.documentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg border bg-[var(--color-bg-card)]/70 backdrop-blur transition-colors hover:scale-110"
                        style={{ borderColor: theme.accent, color: theme.accent }}
                        aria-label={`${item.documentLabel} for ${item.title}`}
                        title={item.documentLabel ?? 'View document'}
                      >
                        <ExternalLinkIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  {/* Type tag */}
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.22em] mb-2 inline-block"
                    style={{ color: theme.accent }}
                  >
                    {item.type}
                  </span>

                  <h3
                    className={`font-display font-medium leading-[1.1] tracking-[-0.015em] mb-2 ${
                      isFeature ? 'text-[28px] sm:text-[34px]' : 'text-[20px]'
                    }`}
                  >
                    {item.title}
                  </h3>
                  <div
                    className={`font-medium mb-3 ${isFeature ? 'text-[14px]' : 'text-[12px]'}`}
                    style={{ color: theme.accent }}
                  >
                    {item.source}
                  </div>
                  <p
                    className={`text-[var(--color-text-secondary)] leading-[1.6] flex-1 ${
                      isFeature ? 'text-[14px]' : 'text-[12.5px]'
                    }`}
                  >
                    {item.description}
                  </p>
                  {item.date && (
                    <div
                      className="font-mono text-[11px] uppercase tracking-[0.16em] mt-4 pt-3 border-t border-dashed"
                      style={{ color: theme.accent, borderColor: theme.accent, opacity: 0.85 }}
                    >
                      {item.date}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Recognition screenshot"
          >
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              src={lightbox.src}
              alt={lightbox.alt}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] max-w-[min(720px,95vw)] rounded-xl shadow-2xl cursor-default"
            />
            <button
              type="button"
              onClick={() => setLightbox(null)}
              aria-label="Close preview"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white transition-colors"
            >
              <CloseIcon />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
