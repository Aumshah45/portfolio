import type { ReactNode } from 'react';

interface HandUnderlineProps {
  children: ReactNode;
  /** Color override; defaults to current --section-accent */
  color?: string;
  className?: string;
}

/**
 * Wraps text with a hand-drawn SVG squiggle underline that animates in.
 * Replaces the flat color-span trick with something that feels like ink on paper.
 */
export function HandUnderline({ children, color, className = '' }: HandUnderlineProps) {
  const stroke = color ?? 'var(--section-accent)';
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <svg
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute left-0 right-0 -bottom-1 w-full h-[10px] pointer-events-none"
      >
        <path
          d="M2 7 C 30 2, 60 11, 95 6 S 165 2, 198 7"
          fill="none"
          stroke={stroke}
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.85"
          className="hand-underline-path"
        />
      </svg>
    </span>
  );
}
