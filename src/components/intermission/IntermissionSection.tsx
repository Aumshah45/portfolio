import { ScrollReveal } from '../effects/ScrollReveal';
import { h2, scene } from '../ui/styles';
import { intermission, intermissionClose } from '../../data/intermission';

/** Renders *starred* spans as Garamond italic. */
function Annotated({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/).map((part, i) =>
        part.startsWith('*') && part.endsWith('*') ? (
          <em key={i} className="font-serif text-[1.06em] italic text-title">
            {part.slice(1, -1)}
          </em>
        ) : (
          part
        ),
      )}
    </>
  );
}

export function IntermissionSection() {
  return (
    <section id="honest" className={`${scene} bg-bg-2`}>
      <div className="mx-auto max-w-[1160px] px-7 max-[700px]:px-5">
        <ScrollReveal className="mb-16 text-center">
          <span className="inline-block rounded-panel border border-line px-[26px] py-2.5 font-mono text-[12px] uppercase tracking-[0.5em] text-title">
            Intermission
          </span>
          <h2 className={`${h2} mx-auto mt-[22px] max-w-[18ch]`}>Five questions you were going to ask anyway.</h2>
        </ScrollReveal>

        <div className="mx-auto grid max-w-[840px] gap-[52px]">
          {intermission.map((item, i) => (
            <ScrollReveal key={item.q} className={i % 2 === 1 ? 'min-[701px]:pl-14' : ''}>
              <article>
                <h3 className="m-0 mb-3 flex gap-2.5 font-mono text-[12px] font-normal uppercase tracking-[0.16em] text-acc">
                  <span className="text-acc-dim">Q{i + 1}</span>
                  {item.q}
                </h3>
                <p className="m-0 border-l-[3px] border-acc pl-[22px] text-[clamp(17px,2vw,21px)] font-[350] leading-[1.55] text-text">
                  <Annotated text={item.a} />
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-[72px] text-center">
          <p className="m-0 mb-2.5 font-serif text-[21px] italic text-text-2">&ldquo;{intermissionClose.line}&rdquo;</p>
          <p className="m-0 font-mono text-[10.5px] uppercase tracking-[0.22em] text-acc-dim">{intermissionClose.sig}</p>
        </ScrollReveal>
      </div>
    </section>
  );
}
