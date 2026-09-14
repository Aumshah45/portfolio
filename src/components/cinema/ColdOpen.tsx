import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { markColdOpenSeen } from './coldOpenSession';

interface Props {
  onDone: () => void;
}

const rows = [
  ['Prod', 'Aum Shah · Portfolio'],
  ['Scene', '01 · Market open'],
  ['Take', '2'],
];

/**
 * Clapperboard cold open. Always dark (it is film, not page). Portalled to
 * <body> because the route wrapper animates transform, which would otherwise
 * turn this fixed overlay into one positioned against the page.
 */
export function ColdOpen({ onDone }: Props) {
  const finishRef = useRef<() => void>(() => {});

  useEffect(() => {
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      markColdOpenSeen();
      onDone();
    };
    finishRef.current = finish;
    const timer = window.setTimeout(finish, 2600);
    window.addEventListener('keydown', finish);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', finish);
    };
  }, [onDone]);

  return createPortal(
    <div
      aria-hidden="true"
      onClick={() => finishRef.current()}
      className="slate-overlay fixed inset-0 z-[100] flex cursor-pointer items-center justify-center bg-[#050507]"
    >
      <div className="relative w-[min(400px,84vw)] rounded-panel border border-[#2a2830] bg-[#131117] px-[30px] pb-[18px] pt-[26px] shadow-[0_40px_90px_rgba(0,0,0,0.7)]">
        <div
          className="clap-arm absolute -left-px -right-px -top-[22px] h-[22px] rounded-t"
          style={{ background: 'repeating-linear-gradient(-45deg, #e8e2d6 0 18px, #131117 18px 36px)' }}
        />
        {rows.map(([label, value], i) => (
          <div
            key={label}
            className={`flex justify-between gap-[18px] py-2.5 font-mono text-[11.5px] uppercase tracking-[0.18em] text-[#8f8a80] ${
              i < rows.length - 1 ? 'border-b border-[#2a2830]' : ''
            }`}
          >
            <span>{label}</span>
            <b className="text-right font-medium text-[#f2ead8]">{value}</b>
          </div>
        ))}
      </div>
      <p className="absolute inset-x-0 bottom-6 m-0 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-[#4c4a52]">
        click anywhere to skip
      </p>
    </div>,
    document.body,
  );
}
