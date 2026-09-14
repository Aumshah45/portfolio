export interface Move {
  no: string;
  text: string;
  glyph?: string;
  note?: string;
}

interface Props {
  moves: Move[];
  className?: string;
}

/** Decisions annotated in chess notation: move, glyph judgement, italic side note. */
export function Movelist({ moves, className = 'mt-6' }: Props) {
  return (
    <ol className={`grid list-none gap-2.5 p-0 ${className}`}>
      {moves.map((m) => (
        <li
          key={`${m.no}-${m.text}`}
          className="flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-panel border border-l-[3px] border-line border-l-acc bg-tint px-4 py-3 font-mono text-[12.5px] text-text"
        >
          <span className="text-acc-dim">{m.no}</span>
          <span>{m.text}</span>
          {m.glyph && <span className="font-semibold text-acc">{m.glyph}</span>}
          {m.note && <span className="font-serif text-[14.5px] italic text-note">{m.note}</span>}
        </li>
      ))}
    </ol>
  );
}
