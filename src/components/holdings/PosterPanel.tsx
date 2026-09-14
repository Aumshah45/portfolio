import { DecodeNumber } from './DecodeNumber';
import { Sparkline } from './Sparkline';
import { Tag } from '../ui/Tag';

interface Props {
  image: string;
  imageAlt: string;
  bignum: string;
  bignumLabel: string;
  award?: string;
  tags?: string[];
}

export function PosterPanel({ image, imageAlt, bignum, bignumLabel, award, tags = [] }: Props) {
  return (
    <div className="overflow-hidden rounded-panel border border-line-2 bg-bg-2">
      <div className="relative aspect-video overflow-hidden bg-[#04120b]">
        <img src={image} alt={imageAlt} loading="lazy" className="still-grade block h-full w-full object-cover" />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, transparent 30%, var(--img-fade))' }}
        />
      </div>
      <div className="grid gap-3.5 px-[22px] pb-[22px] pt-5">
        <div>
          <DecodeNumber
            value={bignum}
            className="block font-mono text-[46px] font-medium leading-none text-acc [font-variant-numeric:tabular-nums]"
          />
          <span className="mt-1.5 block font-mono text-[14px] uppercase tracking-[0.14em] text-acc-dim">{bignumLabel}</span>
        </div>
        <Sparkline />
        <div className="flex flex-wrap gap-2.5">
          {award && <Tag gold>{award}</Tag>}
          {tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </div>
    </div>
  );
}
