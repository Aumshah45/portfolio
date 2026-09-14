interface Side {
  value: string;
  caption: string;
}

interface Props {
  before: Side;
  after: Side;
  className?: string;
}

const num = 'font-mono text-[38px] leading-none [font-variant-numeric:tabular-nums] max-[520px]:text-[30px]';
const cap = 'mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-text-2';

export function BeforeAfterPanel({ before, after, className = '' }: Props) {
  return (
    <div className={`flex flex-wrap overflow-hidden rounded-panel border border-line-2 ${className}`}>
      <div className="min-w-[220px] flex-1 border-line-2 bg-red-tint px-[26px] py-6 [@media(min-width:490px)]:border-r">
        <span className="sr-only">Before: </span>
        <div className={`${num} text-red line-through decoration-2`}>{before.value}</div>
        <div className={cap}>{before.caption}</div>
      </div>
      <div className="min-w-[220px] flex-1 px-[26px] py-6">
        <span className="sr-only">After: </span>
        <div className={`${num} text-acc`}>{after.value}</div>
        <div className={cap}>{after.caption}</div>
      </div>
    </div>
  );
}
