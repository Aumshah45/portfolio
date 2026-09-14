import { Link } from 'react-router-dom';
import { ScrollReveal } from '../effects/ScrollReveal';
import { SlateHeader } from '../ui/SlateHeader';
import { Movelist } from '../ui/Movelist';
import { h3, lede, monoLink, scene, tapeline, wrap } from '../ui/styles';
import { PosterPanel } from './PosterPanel';
import { RelayDiagram } from './RelayDiagram';
import { BeforeAfterPanel } from './BeforeAfterPanel';
import { HexCoreDiagram } from './HexCoreDiagram';
import { BookStrip } from './BookStrip';
import { book, claimsHolding, copilotHolding, numeraHolding } from '../../data/holdings';
import { projects } from '../../data/projects';

const numera = projects.find((p) => p.slug === numeraHolding.slug);

function CaseLink({ slug }: { slug: string }) {
  return (
    <Link to={`/projects/${slug}`} className={`${monoLink} mt-6 inline-block`}>
      Read the full annotation →
    </Link>
  );
}

export function HoldingsSection() {
  return (
    <section id="work" className={scene}>
      <div className={wrap}>
        <ScrollReveal>
          <SlateHeader sc="SC 02 · Holdings" take="three features · full book below" />
        </ScrollReveal>

        {/* 02.1 · Copilot */}
        <div className="mb-24 grid grid-cols-[7fr_5fr] items-start gap-14 max-[900px]:mb-[72px] max-[900px]:grid-cols-1 max-[900px]:gap-8">
          <ScrollReveal>
            <div className={`${tapeline} mb-3.5`}>
              <span>{copilotHolding.code}</span>
              <span>{copilotHolding.take}</span>
            </div>
            <h3 className={h3}>{copilotHolding.title}</h3>
            {copilotHolding.ledes.map((p) => (
              <p key={p} className={lede}>
                {p}
              </p>
            ))}
            <Movelist moves={copilotHolding.moves} />
            <CaseLink slug={copilotHolding.slug} />
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <PosterPanel
              image="/stills/copilot.jpg"
              imageAlt=""
              bignum={copilotHolding.bignum}
              bignumLabel={copilotHolding.bignumLabel}
              award={copilotHolding.award}
              tags={copilotHolding.tags}
            />
          </ScrollReveal>
        </div>

        {/* 02.2 · Claims agents */}
        <div className="mb-24 max-[900px]:mb-[72px]">
          <ScrollReveal>
            <div className={`${tapeline} mb-3.5`}>
              <span>{claimsHolding.code}</span>
              <span>{claimsHolding.take}</span>
            </div>
            <h3 className={h3}>{claimsHolding.title}</h3>
            <p className={`${lede} max-w-[70ch]`}>{claimsHolding.lede}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <RelayDiagram nodes={claimsHolding.relay} />
          </ScrollReveal>
          <ScrollReveal delay={0.16}>
            <BeforeAfterPanel before={claimsHolding.before} after={claimsHolding.after} />
            <Movelist moves={claimsHolding.moves} />
            <CaseLink slug={claimsHolding.slug} />
          </ScrollReveal>
        </div>

        {/* 02.3 · Numera */}
        <div>
          <ScrollReveal>
            <div className={`${tapeline} mb-3.5`}>
              <span>{numeraHolding.code}</span>
              <span>{numeraHolding.take}</span>
            </div>
            <h3 className={h3}>{numeraHolding.title}</h3>
            <p className={`${lede} max-w-[70ch]`}>{numeraHolding.lede}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <HexCoreDiagram
              portA={numeraHolding.portA}
              core={numeraHolding.core}
              portB={numeraHolding.portB}
              seam={numeraHolding.seam}
            />
          </ScrollReveal>
          <ScrollReveal delay={0.16}>
            <Movelist moves={numeraHolding.moves} />
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              <Link to={`/projects/${numeraHolding.slug}`} className={monoLink}>
                Read the full annotation →
              </Link>
              {numera?.repoUrl && (
                <a href={numera.repoUrl} target="_blank" rel="noopener noreferrer" className={monoLink}>
                  Repository ↗
                </a>
              )}
              {numera?.liveUrl && (
                <a href={numera.liveUrl} target="_blank" rel="noopener noreferrer" className={monoLink}>
                  Live API docs ↗
                </a>
              )}
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <BookStrip items={book} />
        </ScrollReveal>
      </div>
    </section>
  );
}
