import { motion } from 'framer-motion';

const bars = [
  { height: 38, label: 'Q1', muted: true },
  { height: 62, label: 'Q2', muted: true },
  { height: 100, label: 'Q3', muted: false },
  { height: 134, label: 'Q4', muted: false },
];

export function ChartVisual() {
  return (
    <div
      className="min-h-[320px] h-full flex flex-col items-center justify-end relative overflow-hidden"
      style={{ background: 'var(--color-bg-coral)' }}
    >
      {/* atmospheric coral glow */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          background: 'var(--color-coral)',
          width: 220,
          height: 220,
          top: -60,
          left: -60,
          opacity: 0.32,
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />

      {/* Top label strip */}
      <div className="relative w-full flex items-center justify-between px-6 pt-6 mb-auto">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-coral)]">
          Throughput &middot; quarterly
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          ↑ 85% accuracy
        </span>
      </div>

      <div className="relative flex items-end justify-center gap-4 px-8 pb-7 w-full">
        {bars.map((bar, i) => (
          <div key={bar.label} className="flex flex-col items-center gap-2 flex-1 max-w-[44px]">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: bar.height }}
              transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1], delay: i * 0.12 }}
              viewport={{ once: true, amount: 0.5 }}
              className="w-full rounded-t-md"
              style={{
                background: bar.muted ? 'var(--color-coral-soft)' : 'var(--color-coral)',
                border: `1px solid var(--color-coral)`,
                opacity: bar.muted ? 0.85 : 1,
              }}
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              {bar.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
