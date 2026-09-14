import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { scoresheet, scoresheetRestingMove } from '../../data/scoresheet';

const last = scoresheet.length - 1;
const clamp = (i: number) => Math.max(0, Math.min(last, i));

const openContact = () => document.dispatchEvent(new CustomEvent('open-contact'));

const stepButton =
  'h-[38px] w-[38px] cursor-pointer rounded-panel border border-line bg-bg-3 text-[15px] text-acc transition-colors hover:bg-tint disabled:cursor-default disabled:opacity-40';

/**
 * Career scoresheet with an engine evaluation bar, chess as broadcast graphics.
 * Arrow keys step through moves while the panel is on screen.
 */
export function GameBox() {
  const [cur, setCur] = useState(scoresheetRestingMove);
  const boxRef = useRef<HTMLDivElement>(null);
  const inView = useInView(boxRef, { amount: 0.25 });

  useEffect(() => {
    if (!inView) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      if (document.querySelector('[aria-modal="true"]')) return;
      if ((e.target as HTMLElement | null)?.closest('input, textarea, select, [contenteditable="true"]')) return;
      e.preventDefault();
      setCur((c) => clamp(c + (e.key === 'ArrowRight' ? 1 : -1)));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [inView]);

  const move = scoresheet[cur];
  const pending = move.evaluation === null;
  const fill = pending ? 94 : Math.min(94, 42 + (move.evaluation ?? 0) * 15);
  const evalText = pending ? '+?' : `+${move.evaluation!.toFixed(1)}`;

  return (
    <div
      ref={boxRef}
      className="flex items-stretch gap-6 rounded-panel border border-line-2 bg-bg-2 p-[26px] max-[520px]:gap-4 max-[520px]:p-5"
    >
      <div className="flex w-16 flex-none flex-col items-center gap-2.5 max-[520px]:w-12" aria-hidden="true">
        <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-acc-dim">Eval</span>
        <span className="font-mono text-[16px] font-medium text-acc [font-variant-numeric:tabular-nums]">{evalText}</span>
        <div className="relative min-h-[220px] w-4 flex-1 overflow-hidden rounded border border-line-2 bg-bg-3">
          <div
            className={`absolute inset-x-0 bottom-0 bg-acc shadow-[var(--glow-dot)] transition-[height] duration-700 ease-[cubic-bezier(.3,.9,.3,1)] ${
              pending ? 'eval-wait' : ''
            }`}
            style={{ height: `${fill}%` }}
          />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="mb-4 flex items-center gap-3">
          <button type="button" className={stepButton} onClick={() => setCur((c) => clamp(c - 1))} disabled={cur === 0} aria-label="Previous move">
            ◀
          </button>
          <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-acc-dim max-[520px]:hidden">or use arrow keys</span>
          <button type="button" className={stepButton} onClick={() => setCur((c) => clamp(c + 1))} disabled={cur === last} aria-label="Next move">
            ▶
          </button>
        </div>

        <p className="sr-only" aria-live="polite">
          Move {move.no} {move.text}. {pending ? 'Your move.' : `Evaluation ${evalText}.`}
        </p>

        <ol className="m-0 grid list-none gap-0.5 p-0 font-mono text-[12.5px]">
          {scoresheet.map((m, i) => {
            const on = i === cur;
            const yours = m.evaluation === null;
            return (
              <li
                key={m.no}
                className={`flex flex-wrap items-baseline rounded-panel border transition-colors ${
                  on ? 'border-line bg-tint text-text' : yours ? 'border-dashed border-line text-title' : 'border-transparent text-text-2 hover:bg-tint'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setCur(i)}
                  aria-current={on ? 'step' : undefined}
                  className="flex flex-1 cursor-pointer flex-wrap items-baseline gap-x-2.5 gap-y-0.5 border-0 bg-transparent px-3 py-[9px] text-left font-mono text-[12.5px] text-inherit"
                >
                  <span className="w-5 flex-none text-acc-dim">{m.no}</span>
                  <span>{m.text}</span>
                  {m.glyph && <span className="font-semibold text-acc">{m.glyph}</span>}
                  <span className="font-serif text-[13.5px] italic text-note">{m.note}</span>
                </button>
                {yours && (
                  <button
                    type="button"
                    onClick={openContact}
                    className="mr-3 cursor-pointer border-0 bg-transparent p-0 font-serif text-[13.5px] font-medium italic text-acc underline underline-offset-2"
                  >
                    Get in touch
                  </button>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
