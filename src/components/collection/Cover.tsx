import type { CSSProperties } from 'react';
import type { Edition } from '../../data/editions';

/** One edition's cover, art-directed from the project itself. Decorative: the title is repeated in text beside it. */
export function Cover({ edition }: { edition: Edition }) {
  const { variant, title, band, tagline } = edition;
  return (
    <div className={`cover cover--${variant}`} aria-hidden="true">
      <div className="cover__band">
        <span>{band[0]}</span>
        <span>{band[1]}</span>
      </div>
      {variant === 'metrics' && (
        <>
          <div className="cover__big">30+</div>
          <div className="cover__rule" />
        </>
      )}
      {variant === 'agents' && (
        <div className="cover__rings">
          <i />
          <i />
          <i />
        </div>
      )}
      {variant === 'pages' && (
        <div className="cover__pages">
          {[2, 1, 0].map((k) => (
            <i key={k} style={{ '--k': k } as CSSProperties} />
          ))}
        </div>
      )}
      {variant === 'hex' && (
        <div className="cover__hex">
          <b>60</b>
        </div>
      )}
      {variant === 'orbit' && (
        <div className="cover__orbit">
          {[0, 1, 2, 3].map((k) => (
            <i key={k} style={{ '--k': k } as CSSProperties} />
          ))}
          <b />
        </div>
      )}
      {variant === 'sealed' && (
        <div className="cover__redact">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
      )}
      <div className="cover__title">{title}</div>
      <div className="cover__tag">{tagline}</div>
    </div>
  );
}
