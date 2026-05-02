import { Link } from 'react-router-dom';
import { SectionLabel } from '../components/ui/SectionLabel';
import { HandUnderline } from '../components/ui/HandUnderline';

export function NotFoundPage() {
  return (
    <section
      className="relative min-h-[85vh] flex items-center justify-center px-6 overflow-hidden"
      style={{ ['--section-accent' as string]: 'var(--color-coral)' }}
    >
      <div
        className="color-blob -z-10"
        style={{ background: 'var(--color-coral)', width: 380, height: 380, top: '15%', right: -120, opacity: 0.22 }}
        aria-hidden="true"
      />
      <div
        className="color-blob -z-10"
        style={{ background: 'var(--color-ink)', width: 320, height: 320, bottom: '10%', left: -100, opacity: 0.20 }}
        aria-hidden="true"
      />

      <div className="max-w-[720px] w-full">
        <SectionLabel number="404" label="Off the map" />

        <h1 className="font-display text-[64px] sm:text-[88px] md:text-[112px] font-medium leading-[0.95] tracking-[-0.035em] mb-6">
          You&rsquo;ve found a{' '}
          <HandUnderline color="var(--color-coral)">
            <span className="italic font-normal" style={{ fontVariationSettings: "'SOFT' 100", color: 'var(--color-coral)' }}>
              dead end.
            </span>
          </HandUnderline>
        </h1>

        <p className="text-[17px] sm:text-[19px] text-[var(--color-text-secondary)] leading-[1.6] max-w-[560px] mb-8">
          That URL doesn&rsquo;t lead anywhere on this site. Maybe a stale link, a typo, or a project I haven&rsquo;t shipped yet. Either way &mdash; sorry about the detour.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-[14px] font-semibold bg-[var(--color-text-primary)] text-[var(--color-bg)] hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] transition-all duration-300 no-underline"
          >
            <span aria-hidden="true">←</span>
            Back to home
          </Link>
          <Link
            to="/#work"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-[14px] font-medium bg-transparent text-[var(--color-text-primary)] border border-[var(--color-border-strong)] hover:bg-[var(--color-text-primary)] hover:text-[var(--color-bg)] transition-all duration-300 no-underline"
          >
            Or look at the work
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] ml-1">
            error 404
          </span>
        </div>
      </div>
    </section>
  );
}
