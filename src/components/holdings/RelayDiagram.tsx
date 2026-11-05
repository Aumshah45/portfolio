import type { CSSProperties } from 'react';
import type { RelayNode } from '../../data/holdings';

interface Props {
  nodes: RelayNode[];
  className?: string;
}

/** A hand-off pipeline: each stage owns one job and passes the result along. */
export function RelayDiagram({ nodes, className = '' }: Props) {
  return (
    <ol className={`steps ${className}`} style={{ '--n': nodes.length } as CSSProperties} aria-label="How it works, in order">
      {nodes.map((node) => (
        <li key={node.title}>
          <b>{node.title}</b>
          <p>{node.body}</p>
        </li>
      ))}
    </ol>
  );
}
