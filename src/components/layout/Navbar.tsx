import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { siteConfig } from '../../data/siteConfig';
import { useTheme } from '../../hooks/useTheme';
import { useActiveSection } from '../../hooks/useActiveSection';

interface Props {
  onCommandPalette: () => void;
  onContact: () => void;
}

const links = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'questions', label: 'Questions' },
];

const tracked = ['top', ...links.map((l) => l.id), 'risks', 'contact'];

/** The masthead: the name, the three places worth jumping to, and one way to write. */
export function Navbar({ onCommandPalette, onContact }: Props) {
  const { theme, toggle } = useTheme();
  const { pathname } = useLocation();
  const active = useActiveSection(tracked, pathname);
  const menu = useRef<HTMLDetailsElement>(null);
  const closeMenu = () => menu.current?.removeAttribute('open');
  const themeLabel = theme === 'dark' ? 'Switch to the light theme' : 'Switch to the dark theme';

  const items = links.map((l) => (
    <li key={l.id}>
      <Link to={`/#${l.id}`} aria-current={pathname === '/' && active === l.id ? 'location' : undefined} onClick={closeMenu}>
        {l.label}
      </Link>
    </li>
  ));

  return (
    <header className="top">
      <div className="wrap top__in">
        <Link to="/#top" className="mark" aria-label={`${siteConfig.name}, back to the top`}>
          <b>{siteConfig.name}</b>
          <span>Editions 001 to 006</span>
        </Link>

        <nav aria-label="Primary" className="top__nav">
          <ul>{items}</ul>
          <button type="button" className="top__theme" onClick={toggle} aria-label={themeLabel}>
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
          <button type="button" className="top__ask" onClick={onContact}>
            Write to me
          </button>
        </nav>

        <details className="top__menu" ref={menu}>
          <summary>Menu</summary>
          <ul>
            {items}
            <li>
              <a href={siteConfig.resumeUrl} download onClick={closeMenu}>
                Download résumé
              </a>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  toggle();
                  closeMenu();
                }}
              >
                {themeLabel}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  onContact();
                }}
              >
                Write to me
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  onCommandPalette();
                }}
              >
                Jump anywhere
              </button>
            </li>
          </ul>
        </details>
      </div>
    </header>
  );
}
