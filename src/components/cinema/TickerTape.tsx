import { ticker } from '../../data/ticker';

function Lane() {
  return (
    <span className="inline-block">
      {ticker.map((entry) => (
        <span key={entry.symbol}>
          {entry.symbol}{' '}
          <b className={`font-normal ${entry.direction === 'down' ? 'text-[#ff6b4a]' : 'text-[#2ee787]'}`}>
            {entry.quote}
          </b>
          <span className="mx-5 text-[#2c4a38]">/</span>
        </span>
      ))}
    </span>
  );
}

/** The tape is always the tape: dark in both showings. */
export function TickerTape() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden whitespace-nowrap border-b border-[rgba(46,231,135,0.22)] bg-[#04180e] py-2 font-mono text-[11px] tracking-[0.05em] text-[#9fd8b6]"
    >
      <div className="marquee-track inline-flex">
        <Lane />
        <Lane />
      </div>
    </div>
  );
}
