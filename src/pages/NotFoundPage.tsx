import { SlateHeader } from '../components/ui/SlateHeader';
import { ReplayButton } from '../components/ui/ReplayButton';
import { Movelist } from '../components/ui/Movelist';
import { wrap } from '../components/ui/styles';

export function NotFoundPage() {
  return (
    <section className="flex min-h-[78vh] items-center py-20">
      <div className={`${wrap} w-full`}>
        <div className="max-w-[720px]">
          <SlateHeader sc="SC ?? · Missing reel" take="error 404" />
          <h1 className="m-0 mb-6 text-balance text-[clamp(44px,8vw,96px)] font-extrabold leading-[0.98] tracking-[-0.03em] text-title stretch-112">
            This reel <span className="text-acc [text-shadow:var(--glow)]">isn&rsquo;t in the can.</span>
          </h1>
          <p className="m-0 mb-2 max-w-[56ch] text-[17px] text-text-2">
            That URL doesn&rsquo;t lead anywhere on this site. Maybe a stale link, a typo, or a project I haven&rsquo;t shipped yet.
          </p>
          <Movelist moves={[{ no: '?', text: 'Wrong turn', glyph: '??', note: 'recoverable; the position is fine' }]} className="mb-8 mt-6" />
          <div className="flex flex-wrap gap-3">
            <ReplayButton to="/">Back to the top</ReplayButton>
            <ReplayButton variant="ghost" to="/#work">
              Open the holdings
            </ReplayButton>
          </div>
        </div>
      </div>
    </section>
  );
}
