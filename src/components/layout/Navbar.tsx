import type { ComponentType, SVGProps } from 'react';
import { useState, useEffect } from 'react';
import { TbBriefcase2, TbMessageQuestion, TbUserCircle, TbAward } from 'react-icons/tb';
import { siteConfig } from '../../data/siteConfig';
import { useTheme } from '../../hooks/useTheme';
import { useActiveSection } from '../../hooks/useActiveSection';

interface Props {
  onCommandPalette: () => void;
  onContact: () => void;
}

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

const navLinks: { href: string; id: string; label: string; Icon: IconType }[] = [
  { href: '#work', id: 'work', label: 'Work', Icon: TbBriefcase2 },
  { href: '#honest', id: 'honest', label: 'Q&A', Icon: TbMessageQuestion },
  { href: '#about', id: 'about', label: 'About', Icon: TbUserCircle },
  { href: '#recognition', id: 'recognition', label: 'Recognition', Icon: TbAward },
];

const sectionIds = navLinks.map((l) => l.id);

export function Navbar({ onCommandPalette, onContact }: Props) {
  const { theme, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-100 px-6 md:px-10 py-3 flex justify-between items-center transition-all duration-300 ${
        scrolled
          ? 'border-b border-[var(--color-border)] bg-[var(--color-bg)]/85 backdrop-blur-xl'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      {/* Wordmark — serif initial + name in mono */}
      <a href="#" className="flex items-baseline gap-2.5 no-underline text-inherit group">
        <span
          className="font-display text-[28px] font-medium leading-none italic"
          style={{ fontVariationSettings: "'SOFT' 100", color: 'var(--color-accent)' }}
        >
          A.
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors hidden sm:inline">
          {siteConfig.name}
        </span>
      </a>

      {/* Desktop nav — icon + label, with active indicator */}
      <div className="hidden md:flex items-center gap-1">
        {navLinks.map((link) => {
          const Icon = link.Icon;
          const isActive = activeSection === link.id;
          return (
            <a
              key={link.href}
              href={link.href}
              aria-current={isActive ? 'true' : undefined}
              className={`group relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors no-underline ${
                isActive
                  ? 'text-[var(--color-text-primary)]'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-alt)]/60'
              }`}
            >
              <Icon
                width={15}
                height={15}
                className={`transition-colors ${
                  isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)]'
                }`}
                aria-hidden="true"
              />
              <span>{link.label}</span>
              {/* Active dot indicator */}
              {isActive && (
                <span
                  className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--color-accent)]"
                  aria-hidden="true"
                />
              )}
            </a>
          );
        })}
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={onContact}
          className="hidden md:inline-flex items-center gap-1.5 text-[13px] font-semibold bg-[var(--color-text-primary)] text-[var(--color-bg)] px-4 py-1.5 rounded-lg hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-10px_rgba(0,0,0,0.4)] transition-all cursor-pointer"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-green)] pulse-ring" />
          Get in touch
        </button>

        <button
          onClick={toggle}
          className="w-[34px] h-[34px] rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)]/50 backdrop-blur flex items-center justify-center text-[14px] cursor-pointer hover:border-[var(--color-accent)] hover:rotate-[20deg] transition-all duration-300"
          aria-label="Toggle dark/light theme"
        >
          {theme === 'dark' ? '☀' : '☾'}
        </button>

        <button
          onClick={onCommandPalette}
          className="hidden md:inline-flex items-center gap-1.5 text-[10px] text-[var(--color-text-muted)] border border-[var(--color-border)] bg-[var(--color-bg-card)]/40 backdrop-blur px-2 py-1 rounded-md font-mono uppercase tracking-[0.12em] cursor-pointer hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
          aria-label="Open command palette"
        >
          Ctrl K
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-[34px] h-[34px] rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)]/50 backdrop-blur flex flex-col items-center justify-center gap-[5px] cursor-pointer hover:border-[var(--color-accent)] transition-colors"
          aria-label="Toggle navigation menu"
        >
          <span className={`block w-3.5 h-[1.5px] bg-[var(--color-text-primary)] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[3.25px]' : ''}`} />
          <span className={`block w-3.5 h-[1.5px] bg-[var(--color-text-primary)] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[3.25px]' : ''}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`absolute top-full left-0 right-0 bg-[var(--color-bg)]/95 backdrop-blur-xl border-b border-[var(--color-border)] md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col p-3 gap-0.5">
          {navLinks.map((link) => {
            const Icon = link.Icon;
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                aria-current={isActive ? 'true' : undefined}
                className={`flex items-center gap-3 text-[14px] font-medium px-4 py-3 rounded-lg transition-colors no-underline ${
                  isActive
                    ? 'text-[var(--color-text-primary)] bg-[var(--color-bg-alt)]/70'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-alt)]'
                }`}
              >
                <Icon
                  width={16}
                  height={16}
                  className={isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-muted)]'}
                  aria-hidden="true"
                />
                <span>{link.label}</span>
                {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />}
              </a>
            );
          })}
          <button
            onClick={() => { onContact(); setMenuOpen(false); }}
            className="inline-flex items-center justify-center gap-1.5 text-[14px] font-semibold bg-[var(--color-text-primary)] text-[var(--color-bg)] px-4 py-3 rounded-lg transition-colors cursor-pointer mt-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-green)]" />
            Get in touch
          </button>
        </div>
      </div>
    </nav>
  );
}
