import { siteConfig } from '../../data/siteConfig';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[var(--color-border)] bg-[var(--color-bg)] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 py-12">
        {/* Top row: huge wordmark + meta */}
        <div className="grid grid-cols-12 gap-6 mb-10 items-end">
          <div className="col-span-12 md:col-span-7">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-muted)] mb-3">
              The end &middot; or really, the beginning
            </div>
            <div className="font-display text-[64px] sm:text-[88px] md:text-[120px] font-medium leading-[0.85] tracking-[-0.04em]">
              <span style={{ color: 'var(--color-text-primary)' }}>Aum</span>
              <span
                className="italic"
                style={{ fontVariationSettings: "'SOFT' 100", color: 'var(--color-accent)' }}
              >
                Shah.
              </span>
            </div>
          </div>

          <div className="col-span-12 md:col-span-5 md:text-right">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-muted)] mb-3">
              Where to find me
            </div>
            <ul className="flex md:justify-end flex-wrap gap-x-6 gap-y-2">
              <li>
                <button
                  onClick={() => document.dispatchEvent(new CustomEvent('open-contact'))}
                  className="font-display text-[20px] font-medium italic underline-offset-4 hover:underline cursor-pointer bg-transparent border-0 p-0"
                  style={{ fontVariationSettings: "'SOFT' 100", color: 'var(--color-coral)' }}
                >
                  Email
                </button>
              </li>
              <li>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-[20px] font-medium italic underline-offset-4 hover:underline no-underline"
                  style={{ fontVariationSettings: "'SOFT' 100", color: 'var(--color-ink)' }}
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-[20px] font-medium italic underline-offset-4 hover:underline no-underline"
                  style={{ fontVariationSettings: "'SOFT' 100", color: 'var(--color-mint)' }}
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.resumeUrl}
                  download
                  className="font-display text-[20px] font-medium italic underline-offset-4 hover:underline no-underline"
                  style={{ fontVariationSettings: "'SOFT' 100", color: 'var(--color-lavender)' }}
                >
                  Résumé
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider — dashed, like the letter sections */}
        <div className="border-t border-dashed border-[var(--color-border)] mb-5" />

        {/* Bottom row: colophon */}
        <div className="grid grid-cols-12 gap-4 font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
          <div className="col-span-12 md:col-span-5">
            <span className="text-[var(--color-text-secondary)]">&copy; {year} {siteConfig.name}.</span>{' '}
            Hand-built with React, TypeScript &amp; Tailwind.
          </div>
          <div className="col-span-12 md:col-span-3 md:text-center">
            Bengaluru, IST
          </div>
          <div className="col-span-12 md:col-span-4 md:text-right">
            Press{' '}
            <kbd className="not-italic bg-[var(--color-bg-alt)] px-1.5 py-0.5 rounded border border-[var(--color-border)] text-[10px] mx-0.5">
              Ctrl K
            </kbd>{' '}
            to navigate
          </div>
        </div>
      </div>
    </footer>
  );
}
