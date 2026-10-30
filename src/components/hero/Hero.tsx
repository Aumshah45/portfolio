import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ReplayButton } from '../ui/ReplayButton';
import { tapeline, wrap } from '../ui/styles';
import { useColdOpen } from '../cinema/coldOpenContext';
import { DaySheet } from './DaySheet';
import { assetCase, assetPitch } from '../../data/asset';

function Enter({ opened, delay, children }: { opened: boolean; delay: number; children: ReactNode }) {
  return (
    <motion.div
      initial={false}
      animate={opened ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      transition={{ duration: 0.9, delay: opened ? delay : 0, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

const openContact = () => document.dispatchEvent(new CustomEvent('open-contact'));

export function Hero() {
  // False while the slate is up; the hero stages in once it lifts.
  const { opened } = useColdOpen();

  return (
    <section
      id="top"
      className="relative scroll-mt-[60px] overflow-hidden border-b border-line-2"
      style={{ background: 'radial-gradient(ellipse 120% 90% at 50% 0%, var(--hero-glow), transparent 55%), var(--color-bg)' }}
    >
      <div className={wrap}>
        <div className="grid grid-cols-[7fr_5fr] items-start gap-14 pb-[72px] pt-16 max-[900px]:grid-cols-1 max-[900px]:gap-9 max-[900px]:pb-14 max-[900px]:pt-11">
          <div>
            <Enter opened={opened} delay={0}>
              <div className={`${tapeline} mb-[26px]`}>
                <span>Master tape · Aum Shah</span>
                <span>SC 01 · Market open</span>
              </div>
            </Enter>
            <Enter opened={opened} delay={0.12}>
              <h1 className="m-0 mb-[22px] text-balance text-[clamp(42px,6.2vw,86px)] font-extrabold leading-[0.98] tracking-[-0.03em] text-title stretch-112">
                AUM, as in <span className="text-acc [text-shadow:var(--glow)]">Asset Under Management.</span>
              </h1>
            </Enter>
            <Enter opened={opened} delay={0.24}>
              <p className="m-0 mb-6 max-w-[58ch] text-[17px] text-text-2">{assetPitch}</p>
              <dl className="m-0 mb-[30px] grid max-w-[680px] gap-x-6 gap-y-4 sm:grid-cols-3">
                {assetCase.map((row) => (
                  <div key={row.label} className="border-t border-line pt-3">
                    <dt className="mb-1 font-mono text-[9.5px] uppercase tracking-[0.18em] text-acc">{row.label}</dt>
                    <dd className="m-0 text-[13.5px] leading-[1.5] text-text">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </Enter>
            <Enter opened={opened} delay={0.36}>
              <div className="flex flex-wrap gap-3">
                <ReplayButton onClick={openContact}>Get in touch</ReplayButton>
                <ReplayButton variant="ghost" to="/#work">
                  Open the holdings
                </ReplayButton>
              </div>
            </Enter>
          </div>
          <Enter opened={opened} delay={0.24}>
            <DaySheet />
          </Enter>
        </div>
      </div>
    </section>
  );
}
