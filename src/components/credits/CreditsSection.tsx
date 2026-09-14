import { ScrollReveal } from '../effects/ScrollReveal';
import { ReplayButton } from '../ui/ReplayButton';
import { h2, scene, wrap } from '../ui/styles';
import { cast, specialAppearance } from '../../data/cast';
import { siteConfig } from '../../data/siteConfig';

const role = 'font-mono text-[10px] uppercase tracking-[0.3em] text-acc-dim';

function CastRow({ name, part }: { name: string; part: string }) {
  return (
    <div className="flex justify-between gap-3.5 border-b border-line-2 px-0.5 py-2 font-mono text-[11.5px]">
      <b className="font-medium uppercase tracking-[0.1em] text-title">{name}</b>
      <span className="font-serif text-[13px] italic text-acc-dim">{part}</span>
    </div>
  );
}

export function CreditsSection() {
  return (
    <section id="contact" className={`${scene} border-b-0 text-center`}>
      <div className={wrap}>
        <ScrollReveal className="mx-auto mb-[72px] grid max-w-[520px] gap-[26px]">
          <div>
            <div className={role}>Written, shipped and debugged by</div>
            <div className="mt-1 text-[19px] font-[650] text-title">{siteConfig.name}</div>
          </div>
          <div>
            <div className={role}>On location at</div>
            <div className="mt-1 text-[19px] font-[650] text-title">Sun Life Global Solutions, Bengaluru</div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mx-auto grid max-w-[900px] gap-x-10 gap-y-9 text-left md:grid-cols-3">
          {cast.map((group) => (
            <div key={group.department}>
              <div className={`${role} mb-2 tracking-[0.22em]`}>{group.department}</div>
              {group.members.map((m) => (
                <CastRow key={m.name} name={m.name} part={m.role} />
              ))}
            </div>
          ))}
        </ScrollReveal>

        <ScrollReveal className="mx-auto mt-6 max-w-[300px] text-left">
          <div className={`${role} mb-2 text-center tracking-[0.22em]`}>And introducing</div>
          <CastRow name={specialAppearance.name} part={specialAppearance.role} />
        </ScrollReveal>

        <ScrollReveal className="mt-[88px]">
          <h2 className={`${h2} mx-auto max-w-none`}>The post-credits scene is an email.</h2>
          <p className="mx-auto mb-[26px] mt-0 max-w-[58ch] text-text-2">
            If you&rsquo;re hiring for a full-stack or AI engineering role, tell me what the team is building and what you&rsquo;d
            want me owning in the first six months. I reply within a day.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <ReplayButton onClick={() => document.dispatchEvent(new CustomEvent('open-contact'))}>Get in touch</ReplayButton>
            <ReplayButton variant="ghost" href={siteConfig.resumeUrl} download>
              Download prospectus
            </ReplayButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
