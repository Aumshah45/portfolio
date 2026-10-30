import type { HTMLAttributes, ReactNode } from 'react';
import type { Holding } from '../../data/holdings';
import { numeraCore } from '../../data/holdings';
import type { Project } from '../../types';
import { ReplayButton } from '../ui/ReplayButton';
import { Tag } from '../ui/Tag';
import { h3, monoLink } from '../ui/styles';
import { BeforeAfterPanel } from './BeforeAfterPanel';
import { DecodeNumber } from './DecodeNumber';
import { HexCoreDiagram } from './HexCoreDiagram';
import { RelayDiagram } from './RelayDiagram';

interface Props extends HTMLAttributes<HTMLElement> {
  holding: Holding;
  project: Project;
}

function Block({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-acc">{label}</div>
      {children}
    </div>
  );
}

/** One project, read like a term sheet: problem, what was built, return, mechanics. */
export function TermSheet({ holding, project, ...panelProps }: Props) {
  const cs = project.caseStudy;

  return (
    <article {...panelProps} className="overflow-hidden rounded-panel border border-line-2 bg-bg-2">
      <div className="relative aspect-[3/1] overflow-hidden bg-[#04120b]">
        <img src={holding.still} alt="" className="still-grade block h-full w-full object-cover" />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, transparent 30%, var(--img-fade))' }}
        />
      </div>

      <div className="grid gap-8 px-7 pb-7 pt-2 max-[520px]:gap-7 max-[520px]:px-5 max-[520px]:pb-6">
        <header>
          <div className="mb-2.5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-[0.16em] text-acc-dim">
            <span className="text-acc">{project.statusLabel}</span>
            <span>{cs.meta.role}</span>
            <span>
              {cs.meta.company} · {cs.meta.timeline}
            </span>
          </div>
          <h3 className={`${h3} mb-2.5`}>{project.title}</h3>
          <p className="m-0 max-w-[62ch] text-[15px] text-text-2">{project.outcome}</p>
        </header>

        <div className="grid gap-7 sm:grid-cols-2">
          <Block label="The problem">
            <p className="m-0 text-[14.5px] leading-[1.6] text-text">{project.problem}</p>
          </Block>
          <Block label="What I built">
            <p className="m-0 text-[14.5px] leading-[1.6] text-text">{holding.built}</p>
          </Block>
        </div>

        <Block label="The return">
          <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
            <DecodeNumber
              value={holding.headline.value}
              className="font-mono text-[52px] font-medium leading-[0.9] text-acc [font-variant-numeric:tabular-nums]"
            />
            <span className="max-w-[36ch] pb-1 text-[14px] text-text-2">{holding.headline.label}</span>
            {holding.award && <Tag gold>{holding.award}</Tag>}
          </div>
          {cs.beforeAfter && (
            <BeforeAfterPanel
              className="mt-5"
              before={{ value: cs.beforeAfter.before.value, caption: cs.beforeAfter.before.description }}
              after={{ value: cs.beforeAfter.after.value, caption: cs.beforeAfter.after.description }}
            />
          )}
        </Block>

        <Block label="How it works">
          {holding.diagram.kind === 'hex' ? (
            <HexCoreDiagram {...numeraCore} className="mt-4" />
          ) : (
            <RelayDiagram nodes={holding.diagram.nodes} className="mt-3" />
          )}
        </Block>

        <Block label="Key decision">
          <p className="m-0 max-w-[62ch] border-l-[3px] border-acc pl-4 font-serif text-[17px] italic leading-[1.5] text-title">
            {holding.keyDecision}
          </p>
        </Block>

        <div className="flex flex-wrap gap-2">
          {project.techTags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line-2 pt-6">
          <ReplayButton to={`/projects/${project.slug}`}>Read the full case study</ReplayButton>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={monoLink}>
              Live API docs ↗
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={monoLink}>
              Repository ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
