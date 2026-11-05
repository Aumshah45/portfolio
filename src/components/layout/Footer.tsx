import { siteConfig } from '../../data/siteConfig';
import { offTheClock } from '../../data/daysheet';

/** The end card: off the clock, the links, and close of play. */
export function Footer({ onCommandPalette }: { onCommandPalette: () => void }) {
  const year = new Date().getFullYear();

  return (
    <footer className="foot">
      <div className="wrap foot__in">
        <p className="foot__clock">
          {siteConfig.name}, Bengaluru. {offTheClock}
        </p>
        <ul className="foot__links">
          <li>
            <a className="link" href={siteConfig.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a className="link" href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a className="link" href={siteConfig.resumeUrl} download>
              Résumé
            </a>
          </li>
          <li>
            <button type="button" className="link linkbutton" onClick={() => document.dispatchEvent(new CustomEvent('open-contact'))}>
              {siteConfig.email}
            </button>
          </li>
        </ul>
        <p className="foot__legal">
          © {year} {siteConfig.name}. Close of play.{' '}
          <button type="button" className="link linkbutton" onClick={onCommandPalette} aria-label="Open the command palette (Ctrl K)">
            Ctrl K jumps anywhere
          </button>
        </p>
      </div>
    </footer>
  );
}
