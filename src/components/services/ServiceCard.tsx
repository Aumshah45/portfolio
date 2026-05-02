import { useRef } from 'react';
import type { Service } from '../../types';

interface ServiceCardProps extends Service {
  index?: number;
}

export function ServiceCard({ title, description, icon, iconBg, examples, index }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -3;
    const rotateY = ((x - centerX) / centerX) * 3;
    card.style.transform = `translateY(-3px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
  }

  function handleMouseLeave() {
    if (cardRef.current) {
      cardRef.current.style.transform = 'translateY(0) perspective(800px) rotateX(0) rotateY(0)';
    }
  }

  const indexLabel = index ? String(index).padStart(2, '0') : null;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="paper-grain relative overflow-hidden bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-7 transition-all duration-400 hover:border-[var(--section-accent)] hover:shadow-[0_18px_40px_-20px_rgba(30,58,138,0.18)] group"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Soft mouse-follow glow tinted by section accent */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),var(--section-accent-soft)_0%,transparent_55%)]" />

      {/* Index marker — top-right, monospace, like a notebook page number */}
      {indexLabel && (
        <span
          aria-hidden="true"
          className="absolute top-5 right-6 font-mono text-[11px] tracking-[0.2em] text-[var(--color-text-muted)] opacity-70"
        >
          {indexLabel}
        </span>
      )}

      <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-400 ${iconBg}`}>
        {icon}
      </div>
      <h3 className="font-display relative text-[22px] font-medium leading-snug tracking-[-0.01em] mb-2.5">
        {title}
      </h3>
      <p className="relative text-[14px] text-[var(--color-text-secondary)] leading-[1.6] mb-4">
        {description}
      </p>
      <div className="relative flex flex-wrap gap-1.5">
        {examples.map((ex) => (
          <span
            key={ex}
            className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-[var(--color-bg-alt)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
          >
            {ex}
          </span>
        ))}
      </div>
    </div>
  );
}
