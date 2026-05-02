import { motion } from 'framer-motion';

const steps = [
  { num: '01', title: 'Document Extraction', sub: 'AI parses incoming claims' },
  { num: '02', title: 'Policy Validation', sub: 'Checks against FMLA rules' },
  { num: '03', title: 'Decision Engine', sub: 'Generates recommendations' },
  { num: '04', title: 'Dashboard Output', sub: 'Surfaced to reviewers' },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const item = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

export function FlowVisual() {
  return (
    <div
      className="min-h-[320px] h-full flex items-center justify-center relative overflow-hidden"
      style={{ background: 'var(--color-bg-sage)' }}
    >
      {/* sage atmospheric glow */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          background: 'var(--color-mint)',
          width: 220,
          height: 220,
          top: -60,
          right: -60,
          opacity: 0.3,
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative flex flex-col gap-2 p-7 w-full max-w-[280px]"
      >
        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            variants={item}
            className="flex items-center gap-3 bg-[var(--color-bg-card)] px-3.5 py-3 rounded-xl border border-[var(--color-border)] hover:translate-x-1 transition-transform duration-300 relative"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-mono text-[10px] font-semibold shrink-0"
              style={{ background: 'var(--color-green)', color: 'var(--color-bg)' }}
            >
              {step.num}
            </div>
            <div className="min-w-0">
              <div className="text-[12.5px] font-semibold leading-tight">{step.title}</div>
              <div className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-[var(--color-text-muted)] mt-0.5">
                {step.sub}
              </div>
            </div>
            {/* connecting tick */}
            {i < steps.length - 1 && (
              <span
                className="absolute left-[15px] -bottom-1 w-px h-2"
                style={{ background: 'var(--color-green)', opacity: 0.4 }}
                aria-hidden="true"
              />
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
