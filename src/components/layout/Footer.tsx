import { siteConfig } from '../../data/siteConfig';

const link = 'text-text-2 no-underline transition-colors hover:text-acc';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-7 pb-10 pt-11 font-mono text-[11px] text-acc-dim">
      <div className="mx-auto flex max-w-[1160px] flex-wrap items-center justify-center gap-x-6 gap-y-2">
        <span>
          &copy; {year} {siteConfig.name}
        </span>
        <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className={link}>
          GitHub
        </a>
        <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className={link}>
          LinkedIn
        </a>
        <button
          type="button"
          onClick={() => document.dispatchEvent(new CustomEvent('open-contact'))}
          className={`${link} cursor-pointer border-0 bg-transparent p-0 font-mono text-[11px]`}
        >
          {siteConfig.email}
        </button>
        <span className="max-md:hidden">
          press <kbd className="rounded border border-line-2 px-1.5 py-0.5 text-[10px]">Ctrl K</kbd> to navigate
        </span>
      </div>
    </footer>
  );
}
