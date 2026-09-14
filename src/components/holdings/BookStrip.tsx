import { Link } from 'react-router-dom';
import type { BookItem } from '../../data/holdings';

interface Props {
  items: BookItem[];
  className?: string;
}

export function BookStrip({ items, className = 'mt-[72px]' }: Props) {
  return (
    <div className={`grid gap-3.5 md:grid-cols-3 ${className}`}>
      {items.map((item) => {
        const body = (
          <>
            <div className="mb-1.5 font-mono text-[9.5px] uppercase tracking-[0.2em] text-acc-dim">{item.kicker}</div>
            <b className="mb-1 block text-[14.5px] font-[650] text-title">
              {item.title}
              {item.href && <span className="ml-1.5 text-acc transition-[margin] group-hover:ml-2.5" aria-hidden="true">→</span>}
            </b>
            <p className="m-0 text-[12.5px] text-text-2">{item.body}</p>
          </>
        );
        return item.href ? (
          <Link
            key={item.title}
            to={item.href}
            className="group block border-t-2 border-line px-1 pt-4 text-inherit no-underline transition-colors hover:border-acc"
          >
            {body}
          </Link>
        ) : (
          <div key={item.title} className="border-t-2 border-line px-1 pt-4">
            {body}
          </div>
        );
      })}
    </div>
  );
}
