import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ReplayButton } from '../ui/ReplayButton';
import { tapeline, wrap } from '../ui/styles';
import { DaySheet } from './DaySheet';

interface Props {
  /** False while the cold open is on screen; the hero stages in once it lifts. */
  opened: boolean;
}

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

export function Hero({ opened }: Props) {
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
                AUM, as in <span className="text-acc [text-shadow:var(--glow)]">assets under management.</span>
              </h1>
            </Enter>
            <Enter opened={opened} delay={0.24}>
              <p className="m-0 mb-[30px] max-w-[56ch] text-[17px] text-text-2">
                Full-stack and AI engineer at Sun Life. Every project here is a position: entered, annotated, and audited against a
                number.
              </p>
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
