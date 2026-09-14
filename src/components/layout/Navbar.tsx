import { Link } from 'react-router-dom';
import { siteConfig } from '../../data/siteConfig';
import { useTheme } from '../../hooks/useTheme';
import { ReplayButton } from '../ui/ReplayButton';

interface Props {
  onCommandPalette: () => void;
  onContact: () => void;
}

const chip =
  'cursor-pointer rounded-panel border border-line-2 bg-transparent px-3.5 py-[11px] font-mono text-[9.5px] uppercase tracking-[0.18em] text-acc-dim transition-colors hover:border-line hover:text-acc max-[700px]:px-2.5 max-[700px]:py-2.5';

export function Navbar({ onCommandPalette, onContact }: Props) {
  const { theme, toggle } = useTheme();
  const nextShowing = theme === 'dark' ? 'Matinée' : 'Late show';

  return (
    <header className="sticky top-0 z-[60] border-b border-line-2 bg-[var(--bar-bg)] backdrop-blur-[10px]">
      <div className="mx-auto flex h-[60px] max-w-[1160px] items-center justify-between gap-4 px-7 max-[700px]:h-[54px] max-[700px]:px-5">
        <Link to="/#top" className="font-mono text-[13px] font-medium tracking-[0.24em] text-title no-underline">
          AUM<span className="text-acc">/</span>SHAH
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-2.5">
          <button type="button" onClick={onCommandPalette} className={`${chip} max-md:hidden`} aria-label="Open command palette">
            Ctrl K
          </button>
          <button
            type="button"
            onClick={toggle}
            className={chip}
            aria-label={`Switch to the ${nextShowing} showing (${theme === 'dark' ? 'light' : 'dark'} theme)`}
          >
            {nextShowing}
          </button>
          <ReplayButton variant="ghost" href={siteConfig.resumeUrl} download className="max-[700px]:hidden">
            Download prospectus
          </ReplayButton>
          <ReplayButton variant="solid" onClick={onContact}>
            Get in touch
          </ReplayButton>
        </nav>
      </div>
    </header>
  );
}
