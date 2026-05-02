interface SectionLabelProps {
  number: string;     // e.g. "01"
  label: string;      // e.g. "HELLO"
  align?: 'left' | 'center';
  className?: string;
}

/**
 * Editorial / engineering chapter marker. Looks like a code-comment pinned
 * to the top of each section. Inherits color from --section-accent.
 */
export function SectionLabel({ number, label, align = 'left', className = '' }: SectionLabelProps) {
  const alignment = align === 'center' ? 'justify-center' : 'justify-start';
  return (
    <div
      className={`flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--section-accent)] mb-5 ${alignment} ${className}`}
      style={{ color: 'var(--section-accent)' }}
    >
      <span className="font-semibold opacity-60">{number}</span>
      <span className="w-7 h-px bg-current opacity-40" aria-hidden="true" />
      <span className="font-semibold">{label}</span>
    </div>
  );
}
