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

/** Decisions annotated in chess notation: the move, its glyph, the side note. */
export function Movelist({ moves, className = '' }: Props) {
  return (
    <ol className={`moves ${className}`}>
      {moves.map((m) => (
        <li key={`${m.no}-${m.text}`}>
          <span className="moves__no">{m.no.replace('.', '')}</span>
          <span className="moves__text">
            {m.text}
            {m.glyph && <b aria-label={`annotated ${m.glyph}`}>{m.glyph}</b>}
          </span>
          {m.note && <span className="moves__note">{m.note.charAt(0).toUpperCase() + m.note.slice(1)}</span>}
        </li>
      ))}
    </ol>
  );
}
