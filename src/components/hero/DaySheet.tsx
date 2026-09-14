import { daySheet, daySheetStatus } from '../../data/daysheet';

export function DaySheet() {
  return (
    <aside
      aria-label="Current status"
      className="rounded-panel border border-line-2 bg-bg-2 p-6 min-[901px]:sticky min-[901px]:top-20"
    >
      <div className="mb-4 flex items-baseline justify-between gap-2.5 border-b border-dashed border-line-2 pb-3">
        <b className="text-[16px] font-[650] text-title">Day sheet</b>
        <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-acc-dim">updated this week</span>
      </div>
      <dl className="m-0 grid gap-3.5">
        {daySheet.map((row) => (
          <div key={row.label}>
            <dt className="mb-0.5 font-mono text-[9.5px] uppercase tracking-[0.18em] text-acc">{row.label}</dt>
            <dd className="m-0 text-[13.5px] text-text">{row.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-[18px] flex items-center gap-2 border-t border-dashed border-line-2 pt-3.5 font-mono text-[10px] uppercase tracking-[0.18em] text-acc">
        <span aria-hidden="true" className="dot-pulse h-[7px] w-[7px] flex-none rounded-full bg-acc shadow-[var(--glow-dot)]" />
        {daySheetStatus}
      </div>
    </aside>
  );
}
