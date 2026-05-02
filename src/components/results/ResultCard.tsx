import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCountUp } from '../../hooks/useCountUp';

interface Props {
  value: string;
  label: string;
  context: string;
}

export function ResultCard({ value, label, context }: Props) {
  const [inView, setInView] = useState(false);
  const numericTarget = parseInt(value);
  const isNumeric = !isNaN(numericTarget);
  const suffix = value.replace(/\d+/, '');
  const count = useCountUp(isNumeric ? numericTarget : 0, 1200, inView);

  return (
    <motion.div
      onViewportEnter={() => setInView(true)}
      viewport={{ once: true, amount: 0.5 }}
      className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-7 text-center hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-[0_8px_24px_rgba(79,70,229,0.08)] transition-all duration-400"
    >
      <div className="text-[40px] font-black text-[var(--color-accent)] tracking-[-2px] mb-1">
        {isNumeric ? `${count}${suffix}` : value}
      </div>
      <div className="text-[13px] text-[var(--color-text-secondary)] font-medium">{label}</div>
      <div className="text-[11px] text-[var(--color-text-muted)] mt-1">{context}</div>
    </motion.div>
  );
}
