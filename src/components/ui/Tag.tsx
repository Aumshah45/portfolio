import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** Gold is reserved for awards. */
  gold?: boolean;
}

export function Tag({ children, gold }: Props) {
  return (
    <span
      className={`inline-block rounded-panel border px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] ${
        gold ? 'border-gold-line text-gold' : 'border-line-2 text-text-2'
      }`}
    >
      {children}
    </span>
  );
}
