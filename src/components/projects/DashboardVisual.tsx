import { motion } from 'framer-motion';

const miniBars = [12, 20, 16, 28, 24, 32, 28, 36, 32, 38];

export function DashboardVisual() {
  return (
    <div
      className="min-h-[320px] h-full flex items-center justify-center relative overflow-hidden p-6"
      style={{ background: 'var(--color-bg-deep)' }}
    >
      {/* atmospheric amber glow */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          background: 'var(--color-accent)',
          width: 240,
          height: 240,
          top: -70,
          right: -70,
          opacity: 0.4,
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          background: 'var(--color-coral)',
          width: 180,
          height: 180,
          bottom: -50,
          left: -40,
          opacity: 0.25,
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />

      <div
        className="relative bg-[var(--color-bg-card)] rounded-xl border border-[var(--color-border)] overflow-hidden shadow-2xl hover:scale-[1.02] transition-transform duration-400 w-full max-w-[300px]"
      >
        {/* Window chrome */}
        <div className="px-3.5 py-2.5 border-b border-[var(--color-border)] flex items-center justify-between bg-[var(--color-bg-alt)]/50">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: 'var(--color-coral)' }} />
            <div className="w-2 h-2 rounded-full" style={{ background: 'var(--color-accent)' }} />
            <div className="w-2 h-2 rounded-full" style={{ background: 'var(--color-green)' }} />
          </div>
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
            copilot.metrics
          </span>
        </div>

        <div className="p-3.5">
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div
              className="p-3 rounded-lg border"
              style={{ background: 'var(--color-accent-soft)', borderColor: 'var(--color-accent)' }}
            >
              <div className="font-display text-[20px] font-medium leading-none mb-1" style={{ color: 'var(--color-accent)' }}>
                324h
              </div>
              <div className="font-mono text-[8px] uppercase tracking-[0.15em] text-[var(--color-text-secondary)]">
                Hours saved
              </div>
            </div>
            <div
              className="p-3 rounded-lg border"
              style={{ background: 'var(--color-coral-soft)', borderColor: 'var(--color-coral)' }}
            >
              <div className="font-display text-[20px] font-medium leading-none mb-1" style={{ color: 'var(--color-coral)' }}>
                $48k
              </div>
              <div className="font-mono text-[8px] uppercase tracking-[0.15em] text-[var(--color-text-secondary)]">
                Cost savings
              </div>
            </div>
          </div>
          <div className="bg-[var(--color-bg-alt)] rounded-lg p-2.5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                weekly trend
              </span>
              <span className="font-mono text-[8px] uppercase tracking-[0.15em]" style={{ color: 'var(--color-green)' }}>
                ↑ 28%
              </span>
            </div>
            <div className="h-12 flex items-end gap-1">
              {miniBars.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: h }}
                  transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1], delay: i * 0.06 }}
                  viewport={{ once: true }}
                  className="flex-1 rounded-t"
                  style={{ background: 'var(--color-accent)' }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
