import type { CSSProperties } from 'react';
import type { RelayNode } from '../../data/holdings';

interface Props {
  nodes: RelayNode[];
  className?: string;
}

/** A hand-off pipeline: each stage owns one job and passes the result along. */
export function RelayDiagram({ nodes, className = 'my-8' }: Props) {
  return (
    <ol
      className={`grid list-none gap-3.5 p-0 md:grid-cols-[repeat(var(--cols),minmax(0,1fr))] ${className}`}
      style={{ '--cols': nodes.length } as CSSProperties}
    >
      {nodes.map((node) => (
        <li
          key={node.title}
          className="relative rounded-panel border border-line-2 bg-bg-2 p-5 after:absolute after:-right-[15px] after:top-1/2 after:z-10 after:-translate-y-1/2 after:text-[18px] after:text-acc-dim after:content-['→'] last:after:hidden max-md:after:hidden"
        >
          <div className="mb-2 font-mono text-[9.5px] uppercase tracking-[0.2em] text-acc">{node.label}</div>
          <b className="mb-1.5 block text-[15.5px] font-[650] text-title">{node.title}</b>
          <p className="m-0 text-[13px] text-text-2">{node.body}</p>
        </li>
      ))}
    </ol>
  );
}
