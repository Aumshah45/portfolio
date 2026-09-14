import { ScrollReveal } from '../effects/ScrollReveal';
import { SlateHeader } from '../ui/SlateHeader';
import { h2, scene, wrap } from '../ui/styles';
import { MaterialTable } from './MaterialTable';
import { GameBox } from './GameBox';

export function PlayerSection() {
  return (
    <section id="about" className={scene}>
      <div className={wrap}>
        <ScrollReveal>
          <SlateHeader sc="SC 04 · The player" take="white to move" />
        </ScrollReveal>
        <div className="grid grid-cols-2 items-start gap-[60px] max-[900px]:grid-cols-1 max-[900px]:gap-10">
          <ScrollReveal>
            <h2 className={h2}>Judge the moves, not the stack.</h2>
            <div className="[&_p]:m-0 [&_p]:mb-4 [&_p]:max-w-[58ch] [&_p]:text-text-2">
              <p>
                If you&rsquo;ve read this far, you want to know who you&rsquo;d be working with. I&rsquo;m a CS graduate from SRM,
                now at Sun Life Global Solutions, where most of my work happens at the messy intersection of full-stack engineering
                and applied AI: data pipelines, internal tools, agentic systems.
              </p>
              <p>
                I don&rsquo;t think developers are defined by their stack. They&rsquo;re defined by{' '}
                <strong className="font-semibold text-title">how fast they understand a problem</strong>, how seriously they take
                ownership of it, and whether the thing they shipped still works three months later.
              </p>
              <p className="font-serif text-[19px] italic !text-title">
                That&rsquo;s the bar I hold myself to. Step through the game so far; the engine&rsquo;s evaluation is alongside.
              </p>
            </div>
            <MaterialTable />
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <GameBox />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
