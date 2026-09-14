import { useRef } from 'react';
import type { PointerEvent, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  variant?: 'solid' | 'ghost';
  children: ReactNode;
  className?: string;
  /** In-app route (react-router). */
  to?: string;
  /** Plain link: files, mailto, external pages. */
  href?: string;
  external?: boolean;
  download?: boolean;
  onClick?: () => void;
}

const base =
  'group relative isolate inline-flex items-center gap-2 overflow-hidden whitespace-nowrap rounded-panel border px-5 py-[11px] text-[13.5px] font-semibold no-underline cursor-pointer transition-[translate,scale,background-color,color] duration-200 active:translate-y-px active:scale-[0.98] max-[700px]:px-4 max-[700px]:py-2.5 max-[700px]:text-[13px]';

const variants = {
  solid: 'border-transparent bg-acc text-acc-contrast hover:bg-acc-hover',
  ghost: 'border-line bg-transparent text-acc hover:text-acc-contrast',
};

export function ReplayButton({ variant = 'solid', children, className = '', to, href, external, download, onClick }: Props) {
  const fillRef = useRef<HTMLSpanElement>(null);

  // Ghost fill grows from the exact point the pointer entered.
  function handlePointerEnter(e: PointerEvent<HTMLElement>) {
    if (variant !== 'ghost' || !fillRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    fillRef.current.style.left = `${e.clientX - rect.left}px`;
    fillRef.current.style.top = `${e.clientY - rect.top}px`;
  }

  const classes = `${base} ${variants[variant]} ${className}`;
  const inner = (
    <>
      {variant === 'ghost' && (
        <span
          ref={fillRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 aspect-square w-[230%] -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-acc transition-[scale] duration-[450ms] ease-[cubic-bezier(.3,.7,.3,1)] group-hover:scale-100"
        />
      )}
      {children}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} onPointerEnter={handlePointerEnter}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onPointerEnter={handlePointerEnter}
        download={download || undefined}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {inner}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={classes} onPointerEnter={handlePointerEnter}>
      {inner}
    </button>
  );
}
