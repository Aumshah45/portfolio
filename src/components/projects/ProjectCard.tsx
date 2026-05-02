import { Link } from 'react-router-dom';
import type { Project } from '../../types';
import { FlowVisual } from './FlowVisual';
import { ChartVisual } from './ChartVisual';
import { DashboardVisual } from './DashboardVisual';
import { TechIcon } from '../ui/TechIcon';

const visuals = {
  flow: FlowVisual,
  chart: ChartVisual,
  dashboard: DashboardVisual,
};

export function ProjectCard({ project }: { project: Project }) {
  const Visual = visuals[project.visualType];

  return (
    <Link
      to={`/projects/${project.slug}`}
      className="block bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl overflow-hidden hover:border-[var(--color-border-hover)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-400 no-underline text-inherit"
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-8 md:p-9 flex flex-col justify-center">
          <div className={`inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider mb-3 px-2.5 py-1 rounded-md w-fit ${
            project.status === 'live'
              ? 'text-[var(--color-green)] bg-[var(--color-green-bg)]'
              : 'text-[var(--color-accent)] bg-[var(--color-accent-soft)]'
          }`}>
            {project.status === 'live' && <span className="text-[8px]">&#9679;</span>}
            {project.statusLabel}
          </div>

          <h3 className="text-[22px] font-bold tracking-tight mb-2.5">{project.title}</h3>
          <p className="text-[14px] text-[var(--color-text-secondary)] leading-relaxed mb-1.5">{project.problem}</p>
          <p className="text-[14px] font-semibold leading-relaxed mb-4">{project.outcome}</p>

          <div className="flex gap-5 mb-4">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <span className="block text-xl font-extrabold text-[var(--color-accent)] tracking-tight">{m.value}</span>
                <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">{m.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 mb-3.5">
            {project.techTags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-md bg-[var(--color-bg-alt)] text-[var(--color-text-secondary)] font-medium border border-[var(--color-border)]"
              >
                <TechIcon name={t} size={12} />
                {t}
              </span>
            ))}
          </div>

          <span className="inline-flex items-center gap-1.5 text-[var(--color-accent)] text-[13px] font-semibold group/link">
            Read full case study <span className="group-hover/link:translate-x-1 transition-transform">&rarr;</span>
          </span>
        </div>

        <Visual />
      </div>
    </Link>
  );
}
