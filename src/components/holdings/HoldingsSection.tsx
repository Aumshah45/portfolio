import { Fragment, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ScrollReveal } from '../effects/ScrollReveal';
import { SlateHeader } from '../ui/SlateHeader';
import { Tag } from '../ui/Tag';
import { h2, lede, scene, wrap } from '../ui/styles';
import { Sparkline } from './Sparkline';
import { TermSheet } from './TermSheet';
import { holdings, offBook } from '../../data/holdings';
import type { Holding } from '../../data/holdings';
import { projects } from '../../data/projects';
import type { Project } from '../../types';
import { useMediaQuery } from '../../hooks/useMediaQuery';

interface Position {
  holding: Holding;
  project: Project;
}

const positions: Position[] = holdings.flatMap((holding) => {
  const project = projects.find((p) => p.slug === holding.slug);
  return project ? [{ holding, project }] : [];
});

const keyStep: Record<string, (i: number, n: number) => number> = {
  ArrowDown: (i, n) => (i + 1) % n,
  ArrowRight: (i, n) => (i + 1) % n,
  ArrowUp: (i, n) => (i - 1 + n) % n,
  ArrowLeft: (i, n) => (i - 1 + n) % n,
  Home: () => 0,
  End: (_, n) => n - 1,
};

/**
 * The book: a ledger of projects on the left, the selected one's term sheet
 * on the right. Below 900px the ledger becomes an accordion that opens in place.
 */
export function HoldingsSection() {
  const [active, setActive] = useState(0);
  const wide = useMediaQuery('(min-width: 900px)');
  const reduceMotion = useReducedMotion();
  const rowRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function select(i: number, { focus = false, reveal = false } = {}) {
    setActive(i);
    if (focus) rowRefs.current[i]?.focus();
    if (reveal && !wide) {
      requestAnimationFrame(() =>
        rowRefs.current[i]?.scrollIntoView({ block: 'start', behavior: reduceMotion ? 'auto' : 'smooth' }),
      );
    }
  }

  function onRowKey(e: KeyboardEvent, i: number) {
    const step = keyStep[e.key];
    if (!step) return;
    e.preventDefault();
    select(step(i, positions.length), { focus: true });
  }

  const current = positions[active];

  return (
    <section id="work" className={scene}>
      <div className={wrap}>
        <ScrollReveal>
          <SlateHeader sc="SC 02 · Holdings" take={`${positions.length} positions · select one to open it`} />
        </ScrollReveal>

        <ScrollReveal className="mb-12 max-md:mb-9">
          <h2 className={h2}>Every project on the book, audited against what it returned.</h2>
          <p className={lede}>
            Each project is a position: the problem it answered, what I built, and the result it returned. Select one to open
            its term sheet.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid items-start gap-8 min-[900px]:grid-cols-[5fr_7fr]">
            <div className="min-[900px]:sticky min-[900px]:top-[84px]">
              <div
                aria-hidden="true"
                className="flex justify-between border-b border-line-2 px-4 pb-2.5 font-mono text-[9.5px] uppercase tracking-[0.2em] text-acc-dim"
              >
                <span>Position</span>
                <span>Return</span>
              </div>

              <div role={wide ? 'tablist' : undefined} aria-orientation={wide ? 'vertical' : undefined} aria-label="Projects">
                {positions.map(({ holding, project }, i) => {
                  const on = i === active;
                  return (
                    <Fragment key={project.slug}>
                      <button
                        ref={(el) => {
                          rowRefs.current[i] = el;
                        }}
                        type="button"
                        id={`holding-tab-${project.slug}`}
                        role={wide ? 'tab' : undefined}
                        aria-selected={wide ? on : undefined}
                        aria-expanded={wide ? undefined : on}
                        aria-controls={`holding-panel-${project.slug}`}
                        tabIndex={wide && !on ? -1 : 0}
                        onClick={() => select(i, { reveal: true })}
                        onKeyDown={wide ? (e) => onRowKey(e, i) : undefined}
                        className={`grid w-full scroll-mt-[72px] cursor-pointer grid-cols-[minmax(0,1fr)_auto] items-center gap-5 border-0 border-b border-l-[3px] border-b-line-2 px-4 py-[18px] text-left transition-colors ${
                          on ? 'border-l-acc bg-tint' : 'border-l-transparent bg-transparent hover:bg-tint'
                        }`}
                      >
                        <span className="min-w-0">
                          <span className={`block text-[16px] font-[650] leading-tight ${on ? 'text-title' : 'text-text'}`}>
                            {project.title}
                          </span>
                          <span className="mt-1.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-acc-dim">
                            {holding.category}
                          </span>
                        </span>
                        <span className="w-[112px] text-right">
                          <span className="block font-mono text-[22px] leading-none text-acc [font-variant-numeric:tabular-nums]">
                            {holding.headline.value}
                            <span className="ml-1.5 text-[10px] uppercase tracking-[0.12em] text-acc-dim">
                              {holding.headline.unit}
                            </span>
                          </span>
                          <Sparkline points={holding.spark} className="mt-2 h-5" />
                        </span>
                      </button>

                      {!wide && on && (
                        <motion.div
                          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="py-4"
                        >
                          <TermSheet
                            holding={holding}
                            project={project}
                            id={`holding-panel-${project.slug}`}
                            role="region"
                            aria-labelledby={`holding-tab-${project.slug}`}
                          />
                        </motion.div>
                      )}
                    </Fragment>
                  );
                })}
              </div>
            </div>

            {wide && current && (
              <div className="min-w-0">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={current.project.slug}
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <TermSheet
                      holding={current.holding}
                      project={current.project}
                      id={`holding-panel-${current.project.slug}`}
                      role="tabpanel"
                      aria-labelledby={`holding-tab-${current.project.slug}`}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <aside
            aria-label={`${offBook.title}, a private project`}
            className="mt-12 grid gap-x-8 gap-y-4 rounded-panel border border-dashed border-line p-6 min-[900px]:grid-cols-[5fr_7fr] max-[520px]:p-5"
          >
            <div>
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-acc-dim">{offBook.label}</div>
              <h3 className="m-0 mb-3 text-[20px] font-bold tracking-[-0.01em] text-title stretch-106">{offBook.title}</h3>
              <div className="flex flex-wrap gap-2">
                {offBook.stack.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
            </div>
            <div>
              <p className="m-0 mb-3.5 max-w-[68ch] text-[14.5px] leading-[1.6] text-text-2">{offBook.body}</p>
              <ul className="m-0 flex list-none flex-wrap gap-x-5 gap-y-1.5 p-0 font-mono text-[10.5px] uppercase tracking-[0.12em] text-acc">
                {offBook.engineering.map((e) => (
                  <li key={e}>
                    <span aria-hidden="true" className="mr-1.5 text-acc-dim">
                      +
                    </span>
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </ScrollReveal>
      </div>
    </section>
  );
}
