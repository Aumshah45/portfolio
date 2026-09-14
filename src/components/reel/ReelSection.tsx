import { useCallback, useState } from 'react';
import { ScrollReveal } from '../effects/ScrollReveal';
import { SlateHeader } from '../ui/SlateHeader';
import { monoLink, scene, wrap } from '../ui/styles';
import { Lightbox } from './Lightbox';
import type { LightboxImage } from './Lightbox';
import { appreciationClips, featureClip } from '../../data/reel';
import type { ReelClip } from '../../data/reel';

const frameBase = 'group relative block w-full overflow-hidden bg-[#04120b]';
const frameShade = 'linear-gradient(180deg, rgba(6,12,9,0.15), rgba(6,12,9,0.75))';

function FrameChrome({ timecode, label }: { timecode: string; label: string }) {
  return (
    <>
      <div aria-hidden="true" className="absolute inset-0" style={{ background: frameShade }} />
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 z-[1] flex h-[52px] w-[52px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(242,234,216,0.5)] bg-[rgba(6,12,9,0.4)] text-[16px] text-[#f2ead8] backdrop-blur-[4px] transition-transform duration-300 group-hover:scale-110"
      >
        ▶
      </span>
      <span className="absolute right-3.5 top-3 z-[1] font-mono text-[10px] tracking-[0.16em] text-[rgba(242,234,216,0.75)]">
        {timecode}
      </span>
      <span className="sr-only">{label}</span>
    </>
  );
}

function Caption({ clip }: { clip: ReelClip }) {
  return (
    <div className="grid gap-2 px-[18px] pb-[18px] pt-4">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-acc">★ {clip.headline}</span>
      {clip.quote && <p className="m-0 font-serif text-[16px] italic leading-[1.45] text-title">&ldquo;{clip.quote}&rdquo;</p>}
      <p className="m-0 font-mono text-[10px] uppercase tracking-[0.16em] text-acc-dim">
        {clip.from} · {clip.role}
        {clip.context ? ` · ${clip.context}` : ''}
      </p>
      <a href={clip.documentUrl} target="_blank" rel="noopener noreferrer" className={`${monoLink} text-[10px]`}>
        {clip.documentLabel} ↗
      </a>
    </div>
  );
}

export function ReelSection() {
  const [lightbox, setLightbox] = useState<LightboxImage | null>(null);
  const close = useCallback(() => setLightbox(null), []);

  return (
    <section id="recognition" className={scene}>
      <div className={wrap}>
        <ScrollReveal>
          <SlateHeader sc="SC 05 · The reel" take="recognitions, replayed · originals linked" />
        </ScrollReveal>

        <div className="grid grid-cols-[7fr_5fr] items-start gap-[18px] max-[860px]:grid-cols-1">
          <ScrollReveal>
            <article className="overflow-hidden rounded-panel border border-line-2 bg-bg-2">
              <a
                href={featureClip.documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${frameBase} aspect-video`}
              >
                <img src="/stills/eoq.jpg" alt="" loading="lazy" className="still-grade block h-full w-full object-cover" />
                <FrameChrome timecode={featureClip.timecode} label={`Open the ${featureClip.headline} certificate (PDF)`} />
              </a>
              <Caption clip={featureClip} />
            </article>
          </ScrollReveal>

          <div className="grid gap-[18px]">
            {appreciationClips.map((clip, i) => (
              <ScrollReveal key={clip.id} delay={i * 0.08}>
                <article className="overflow-hidden rounded-panel border border-line-2 bg-bg-2">
                  <button
                    type="button"
                    onClick={() =>
                      clip.screenshotUrl &&
                      setLightbox({ src: clip.screenshotUrl, alt: `${clip.headline} recognition post from ${clip.from}` })
                    }
                    className={`${frameBase} aspect-[21/9] cursor-zoom-in border-0 p-0`}
                  >
                    <img
                      src={clip.screenshotUrl}
                      alt=""
                      loading="lazy"
                      className="still-grade block h-full w-full object-cover object-top"
                    />
                    <FrameChrome timecode={clip.timecode} label={`View the full ${clip.headline} post`} />
                  </button>
                  <Caption clip={clip} />
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
      <Lightbox image={lightbox} onClose={close} />
    </section>
  );
}
