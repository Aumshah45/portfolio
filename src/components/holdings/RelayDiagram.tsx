import type { CSSProperties } from 'react';
import type { RelayNode } from '../../data/holdings';

interface Props {
  nodes: RelayNode[];
  className?: string;
}

/**
 * A hand-off pipeline: each stage owns one job and passes the result along.
 * Lays out by its own width (container query), so it reads as a row on a
 * full page and as a top-to-bottom chain inside a narrow panel.
 */
export function RelayDiagram({ nodes, className = 'my-8' }: Props) {
  return (
    <div className={`@container ${className}`}>
      <ol
        className="grid list-none gap-[18px] p-0 @2xl:grid-cols-[repeat(var(--cols),minmax(0,1fr))] @2xl:gap-3.5"
        style={{ '--cols': nodes.length } as CSSProperties}
      >
        {nodes.map((node) => (
          <li
            key={node.title}
            className="relative rounded-panel border border-line-2 bg-bg-2 px-4 py-3.5 after:absolute after:z-10 after:text-[16px] after:leading-none after:text-acc-dim last:after:hidden @max-2xl:after:-bottom-[17px] @max-2xl:after:left-1/2 @max-2xl:after:-translate-x-1/2 @max-2xl:after:content-['↓'] @2xl:p-5 @2xl:after:-right-[14px] @2xl:after:top-1/2 @2xl:after:-translate-y-1/2 @2xl:after:text-[18px] @2xl:after:content-['→']"
          >
            <div className="flex flex-wrap items-baseline gap-x-3 @2xl:block">
              <div className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-acc @2xl:mb-2">{node.label}</div>
              <b className="block text-[15px] font-[650] text-title @2xl:mb-1.5 @2xl:text-[15.5px]">{node.title}</b>
            </div>
            <p className="m-0 mt-1 text-[13px] text-text-2 @2xl:mt-0">{node.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
