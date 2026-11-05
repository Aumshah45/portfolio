interface Side {
  value: string;
  caption: string;
}

interface Props {
  before: Side;
  after: Side;
  className?: string;
}

export function BeforeAfterPanel({ before, after, className = '' }: Props) {
  return (
    <div className={`beforeafter ${className}`}>
      <div className="before">
        <span className="label">Before</span>
        <span className="figure">{before.value}</span>
        <span>{before.caption}</span>
      </div>
      <div className="after">
        <span className="label">After</span>
        <span className="figure">{after.value}</span>
        <span>{after.caption.replace(/\s*→\s*/g, ', then ')}</span>
      </div>
    </div>
  );
}
