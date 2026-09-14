interface Props {
  sc: string;
  take: string;
  className?: string;
}

/** Scene slate: clapper stripe + scene code + take. Heads every scene and case study. */
export function SlateHeader({ sc, take, className = 'mb-10' }: Props) {
  return (
    <div className={`flex items-stretch overflow-hidden rounded-panel border border-line-2 bg-bg-2 ${className}`}>
      <div
        aria-hidden="true"
        className="w-[34px] flex-none opacity-85"
        style={{ background: 'repeating-linear-gradient(-45deg, var(--color-title) 0 10px, var(--color-bg-2) 10px 20px)' }}
      />
      <div className="flex flex-1 flex-wrap items-baseline justify-between gap-x-3.5 gap-y-1 px-5 py-3.5">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-acc">{sc}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-acc-dim">{take}</span>
      </div>
    </div>
  );
}
